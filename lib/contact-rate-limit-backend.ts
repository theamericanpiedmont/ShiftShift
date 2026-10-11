export type ContactRateLimitBackend = "development-bypass" | "upstash" | "vercel-waf" | "invalid";

type ContactRateLimitEnvironment = {
  nodeEnv?: string;
  backend?: string;
  upstashUrl?: string;
  upstashToken?: string;
  vercel?: string;
  vercelEnv?: string;
};

export function resolveContactRateLimitBackend(env: ContactRateLimitEnvironment): ContactRateLimitBackend {
  const hasUpstashUrl = Boolean(env.upstashUrl);
  const hasUpstashToken = Boolean(env.upstashToken);

  if (env.backend === "vercel-waf") {
    return env.vercel === "1" && env.vercelEnv === "production" && !hasUpstashUrl && !hasUpstashToken
      ? "vercel-waf"
      : "invalid";
  }

  if (env.backend !== undefined && env.backend !== "upstash") return "invalid";

  if (env.backend === undefined && env.nodeEnv === "development" && !hasUpstashUrl && !hasUpstashToken) {
    return "development-bypass";
  }

  return hasUpstashUrl && hasUpstashToken ? "upstash" : "invalid";
}
