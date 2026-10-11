import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { NextRequest, NextResponse } from "next/server";
import { hasFilledContactHoneypot } from "@/lib/contact-honeypot";
import { resolveContactRateLimitBackend } from "@/lib/contact-rate-limit-backend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_SECONDS = 60 * 60;
const RATE_LIMIT_SCRIPT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], tonumber(ARGV[1])) end
return count
`;

type SubmissionType = "contact" | "problem";
type Submission = {
  type: SubmissionType;
  name: string;
  email: string;
  company: string;
  message: string;
  success: string;
};

function response(message: string, status: number) {
  return NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

function diagnostic(category: string, status?: number) {
  if (process.env.NODE_ENV !== "development") return;
  console.info(`[contact-api] ${category}${status === undefined ? "" : ` http=${status}`}`);
}

function clean(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
  if (normalized.length > maxLength) return null;
  return normalized;
}

function cleanSingleLine(value: unknown, maxLength: number): string | null {
  const normalized = clean(value, maxLength);
  return normalized === null ? null : normalized.replace(/\s+/g, " ").trim();
}

async function readBoundedBody(request: NextRequest): Promise<string | null> {
  const lengthHeader = request.headers.get("content-length");
  if (lengthHeader && Number(lengthHeader) > MAX_BODY_BYTES) return null;
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

function parseSubmission(payload: unknown): Submission | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const record = payload as Record<string, unknown>;
  if (record.type !== "contact" && record.type !== "problem") return null;
  const type = record.type;
  const name = cleanSingleLine(record.name, 120);
  const email = cleanSingleLine(record.email, 254);
  const company = record.company === "" || record.company === undefined ? "" : cleanSingleLine(record.company, 160);
  const message = clean(record.message, type === "contact" ? 4000 : 5000);
  const success = type === "problem" && record.success !== "" && record.success !== undefined ? clean(record.success, 2000) : "";
  if (name === null || email === null || company === null || message === null || success === null) return null;
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  if (type === "contact" && success) return null;
  return { type, name, email, company, message, success };
}

function clientAddress(request: NextRequest): string | null {
  const candidate = request.headers.get("x-real-ip")?.trim() || request.headers.get("cf-connecting-ip")?.trim();
  return candidate && isIP(candidate) ? candidate : null;
}

async function checkRateLimit(ip: string, secret: string): Promise<boolean> {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!baseUrl || !token || !baseUrl.startsWith("https://")) throw new Error("rate_limit_not_configured");
  const digest = createHmac("sha256", secret).update(ip).digest("hex");
  const result = await fetch(`${baseUrl}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([["EVAL", RATE_LIMIT_SCRIPT, "1", `contact:rate:${digest}`, String(RATE_WINDOW_SECONDS)]]),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!result.ok) throw new Error("rate_limit_unavailable");
  const data: unknown = await result.json();
  if (!Array.isArray(data) || !data[0] || typeof data[0] !== "object" || !("result" in data[0])) throw new Error("rate_limit_invalid_response");
  const count = Number((data[0] as { result: unknown }).result);
  if (!Number.isSafeInteger(count) || count < 1) throw new Error("rate_limit_invalid_count");
  return count <= RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    diagnostic("unsupported_content_type", 415);
    return response("Please check the form and try again.", 415);
  }
  let rawBody: string | null;
  try {
    rawBody = await readBoundedBody(request);
  } catch {
    diagnostic("request_body_read_failed", 400);
    return response("Please check the form and try again.", 400);
  }
  if (rawBody === null) {
    diagnostic("request_body_missing_or_too_large", 413);
    return response("This submission is too large or could not be read. Please shorten it and try again.", 413);
  }
  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    diagnostic("invalid_json", 400);
    return response("Please check the form and try again.", 400);
  }
  if (hasFilledContactHoneypot(payload)) {
    diagnostic("honeypot_rejected", 400);
    return response("Please check the form and try again.", 400);
  }
  const submission = parseSubmission(payload);
  if (!submission) {
    diagnostic("submission_validation_failed", 400);
    return response("Please check the required fields and try again.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    diagnostic("resend_server_configuration_missing", 503);
    return response("We're unable to accept messages right now. Please email consulting@shiftshift.co directly.", 503);
  }

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const rateLimitBackend = resolveContactRateLimitBackend({
    nodeEnv: process.env.NODE_ENV,
    backend: process.env.CONTACT_RATE_LIMIT_BACKEND,
    upstashUrl,
    upstashToken,
    vercel: process.env.VERCEL,
    vercelEnv: process.env.VERCEL_ENV,
  });

  if (rateLimitBackend === "development-bypass") {
    diagnostic("development_rate_limit_bypass_active");
  } else if (rateLimitBackend === "vercel-waf") {
    diagnostic("vercel_waf_rate_limit_selected");
  } else if (rateLimitBackend === "invalid") {
    diagnostic("rate_limit_backend_configuration_invalid", 503);
    return response("We're unable to accept messages right now. Please email consulting@shiftshift.co directly.", 503);
  } else {
    const rateSecret = process.env.RATE_LIMIT_HASH_SECRET;
    const ip = clientAddress(request);
    if (!rateSecret || rateSecret.length < 32 || !ip) {
      diagnostic("rate_limit_configuration_or_client_ip_missing", 503);
      return response("We're unable to accept messages right now. Please email consulting@shiftshift.co directly.", 503);
    }

    try {
      const allowed = await checkRateLimit(ip, rateSecret);
      if (!allowed) {
        diagnostic("rate_limit_exceeded", 429);
        return response("Too many submissions. Please try again in about an hour.", 429);
      }
    } catch {
      diagnostic("rate_limiter_unavailable", 503);
      console.error("Contact submission rate limiter unavailable.");
      return response("We're unable to accept messages right now. Please email consulting@shiftshift.co directly.", 503);
    }
  }

  const problem = submission.type === "problem";
  const timestamp = new Date().toISOString();
  const text = [
    `Submission type: ${problem ? "Got a Problem" : "General Contact"}`,
    `Submitted: ${timestamp}`,
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company or organization: ${submission.company || "Not provided"}`,
    ...(problem ? [`\nWhat's the challenge?\n${submission.message}`, `\nWhat would success look like?\n${submission.success || "Not provided"}`] : [`\nMessage\n${submission.message}`]),
  ].join("\n");

  try {
    diagnostic("resend_request_started");
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: ["consulting@shiftshift.co"],
        reply_to: submission.email,
        subject: `${problem ? "[Shift Shift New Problem]" : "[Shift Shift Contact]"} ${submission.name}`,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!providerResponse.ok) {
      diagnostic("resend_rejected", providerResponse.status);
      console.error("Contact submission email provider rejected request.", providerResponse.status);
      return response("We couldn't send your message just now. Please try again or email consulting@shiftshift.co.", 502);
    }
    const providerData: unknown = await providerResponse.json();
    if (!providerData || typeof providerData !== "object" || !("id" in providerData) || typeof providerData.id !== "string") {
      diagnostic("resend_acceptance_response_invalid", 502);
      console.error("Contact submission email provider returned an invalid acceptance response.");
      return response("We couldn't confirm your message was sent. Please try again or email consulting@shiftshift.co.", 502);
    }
    diagnostic("resend_accepted", providerResponse.status);
    return NextResponse.json({ accepted: true }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch {
    diagnostic("resend_request_failed", 502);
    console.error("Contact submission email provider unavailable.");
    return response("We couldn't send your message just now. Please try again or email consulting@shiftshift.co.", 502);
  }
}
