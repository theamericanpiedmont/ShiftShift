import assert from "node:assert/strict";
import { test } from "node:test";
import { CONTACT_HONEYPOT_FIELD, hasFilledContactHoneypot } from "../lib/contact-honeypot.ts";
import { resolveContactRateLimitBackend } from "../lib/contact-rate-limit-backend.ts";

test("an empty honeypot allows a normal contact submission", () => {
  assert.equal(CONTACT_HONEYPOT_FIELD, "contact_check");
  assert.equal(hasFilledContactHoneypot({ type: "contact", [CONTACT_HONEYPOT_FIELD]: "" }), false);
});

test("a populated honeypot is rejected", () => {
  assert.equal(hasFilledContactHoneypot({ [CONTACT_HONEYPOT_FIELD]: "https://example.invalid" }), true);
});

test("omitted optional fields do not count as a populated honeypot", () => {
  assert.equal(hasFilledContactHoneypot({ type: "problem", [CONTACT_HONEYPOT_FIELD]: "" }), false);
});

test("rate-limit backend allows only the existing local development bypass without credentials", () => {
  assert.equal(resolveContactRateLimitBackend({ nodeEnv: "development" }), "development-bypass");
  assert.equal(resolveContactRateLimitBackend({ nodeEnv: "production" }), "invalid");
});

test("rate-limit backend preserves Upstash when both credentials are configured", () => {
  assert.equal(resolveContactRateLimitBackend({
    nodeEnv: "production",
    backend: "upstash",
    upstashUrl: "https://redis.example",
    upstashToken: "configured",
  }), "upstash");
  assert.equal(resolveContactRateLimitBackend({
    nodeEnv: "production",
    backend: "upstash",
    upstashUrl: "https://redis.example",
  }), "invalid");
});

test("Vercel Firewall mode is restricted to Vercel production without Upstash credentials", () => {
  const production = { backend: "vercel-waf", vercel: "1", vercelEnv: "production" };
  assert.equal(resolveContactRateLimitBackend(production), "vercel-waf");
  assert.equal(resolveContactRateLimitBackend({ ...production, vercelEnv: "preview" }), "invalid");
  assert.equal(resolveContactRateLimitBackend({ ...production, vercel: undefined }), "invalid");
  assert.equal(resolveContactRateLimitBackend({ ...production, upstashToken: "configured" }), "invalid");
  assert.equal(resolveContactRateLimitBackend({ ...production, backend: "unknown" }), "invalid");
});
