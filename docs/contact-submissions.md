# Contact form configuration

The Contact and Got a Problem forms submit to the server-only `/api/contact` route. The route sends plain-text notifications through Resend to `consulting@shiftshift.co`. It returns a success response only after Resend returns an accepted email ID.

## Required server environment variables

Configure these Resend variables in local development and in every Vercel environment that should accept submissions (Preview and Production as applicable):

- `RESEND_API_KEY`: a Resend API key with permission to send email.
- `RESEND_FROM`: set to `Shift Shift <website@shiftshift.co>`. This sender uses the verified `shiftshift.co` domain. Do not use the visitor's address as the sender.

For local testing, put the Resend values in the ignored `.env.local` file:

```dotenv
RESEND_API_KEY=re_YOUR_RESEND_API_KEY
RESEND_FROM="Shift Shift <website@shiftshift.co>"
```

Replace `re_YOUR_RESEND_API_KEY` with the actual key from Resend. Do not commit the key. Do not set either value with a `NEXT_PUBLIC_` prefix.

### Vercel Production configuration

For the production contact forms using Vercel Firewall, configure these server-side variables in the Vercel project under **Settings → Environment Variables**, scoped to **Production**:

- `RESEND_API_KEY`: a Resend API key with permission to send email.
- `RESEND_FROM`: `Shift Shift <website@shiftshift.co>`.
- `CONTACT_RATE_LIMIT_BACKEND`: exactly `vercel-waf`.

Do not add a `NEXT_PUBLIC_` prefix. `CONTACT_RATE_LIMIT_BACKEND=vercel-waf` is an explicit application selection, not a firewall configuration. The app accepts this mode only when Vercel supplies `VERCEL=1` and `VERCEL_ENV=production`, and it rejects the mode if either Upstash credential is also configured. It skips only the in-app Upstash check; validation, honeypot, body/field limits, Resend delivery, and error handling remain enabled. All other backend values fail closed. Without a selected backend and working Upstash credentials, production submissions return a generic 503.

**Publish and verify the Firewall rule before setting `CONTACT_RATE_LIMIT_BACKEND=vercel-waf`.** If the environment variable is deployed first, requests may reach the handler without an active Firewall rate limit. The environment variable does not create or activate a Vercel rule.

To create the rule:

1. In the Vercel dashboard, open the Shift Shift project, then **Firewall → Configure → New Rule**.
2. Add conditions matching the request method `POST` and path `/api/contact` (use the dashboard's exact method/path match controls).
3. Choose the **Rate Limit** action, **Fixed Window**, and source **IP** as the counting key.
4. Start conservatively at **5 requests per 10 minutes per IP** for this low-traffic site. This is a temporary burst limiter, not equivalent to the existing five-per-hour Upstash policy. Consider a stricter sustained policy if traffic warrants it.
5. Save, review, and **Publish** the firewall changes. Review any rate-limit pricing prompt and the project's plan/usage before publishing; the feature is available on Vercel plans, but allowed-request usage may be metered beyond included amounts.
6. Verify the rule appears as published in the Firewall rules list. Exercise the endpoint from a controlled test client: requests below the threshold should reach the application, and a request above the threshold should be blocked with HTTP 429 before it reaches Resend. Do not use real customer submissions for this test.
7. In Firewall **Observability/Logs**, filter by this custom rule and inspect matched/limited requests. Confirm the method/path and rate-limit action; do not log or expose form contents or credentials.
8. Only after these checks, set `CONTACT_RATE_LIMIT_BACKEND=vercel-waf` for Production and deploy the application change. Confirm both forms can submit and that repeated requests are still limited.

Vercel documents WAF rate limiting as available on all plans. Hobby and Pro use fixed windows from 10 seconds to 10 minutes; check the current dashboard pricing and project rule limits before enabling it. See [Vercel WAF rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting) and [Vercel WAF usage and pricing](https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing).

### Upstash Production alternative

To use the existing Upstash implementation instead, set `CONTACT_RATE_LIMIT_BACKEND=upstash` in Production and configure all of:

- `UPSTASH_REDIS_REST_URL`: the HTTPS REST URL for a shared Upstash Redis database.
- `UPSTASH_REDIS_REST_TOKEN`: that database's REST token.
- `RATE_LIMIT_HASH_SECRET`: a private random secret of at least 32 characters, used to HMAC the trusted client IP before using it as a Redis key. Generate one with `openssl rand -hex 32` and store it only as a server environment variable.

To revert from Vercel Firewall, first configure these Upstash variables and the hash secret, set the Production backend to `upstash`, deploy, and verify the existing five-per-hour behavior. Only then remove or disable the Vercel Firewall rule if desired. Do not leave the backend unset as a way to disable limiting.

### Local-only rate-limit bypass

When `NODE_ENV` is exactly `development`, the route permits local form submissions without Upstash only when both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are absent. Next.js sets `NODE_ENV=development` for `npm run dev`; do not set it manually. For this local test, omit both Upstash variables from `.env.local`. The bypass applies only to rate limiting; request validation, the honeypot, payload-size limits, and Resend delivery remain active. Local submissions made this way are not rate-limited, so use the forms carefully.

If only one Upstash value is configured, or Upstash is configured but unavailable, the request fails closed. Outside development, missing or unavailable Upstash always fails closed unless the explicitly selected and Vercel-Production-only `vercel-waf` mode is used with a separately published Firewall rule.

Never prefix these variables with `NEXT_PUBLIC_`, commit their values, or expose them to the browser. For local testing, put the Resend values in the ignored `.env.local` file. Do not add Upstash variables locally if you intend to use the development-only bypass.

## Resend setup

Create or select a Resend account, verify `shiftshift.co`, and create an API key with permission to send. Store the API key in `RESEND_API_KEY`; use the exact sender value above for `RESEND_FROM`.

The API uses `POST https://api.resend.com/emails`, with `consulting@shiftshift.co` as recipient and the visitor's address as `reply_to`. Subjects are prefixed `[Shift Shift Contact]` or `[Shift Shift New Problem]`.

## Shared rate limiting

When the Upstash backend is selected, create an Upstash Redis database and configure its HTTPS REST URL and token in each deployed environment, along with `RATE_LIMIT_HASH_SECRET`. The server uses one atomic Redis Lua `INCR`/`EXPIRE` operation per request to allow at most five submissions per trusted client IP per hour. Only an HMAC digest of the IP is used as the Redis key; the raw IP and form content are not logged.

When rate limiting is active, the endpoint requires a valid `x-real-ip` or `cf-connecting-ip` request header to identify the client. Vercel documents `x-real-ip` as its client-IP header and overwrites `x-forwarded-for` to prevent IP spoofing. If another proxy is placed in front of Vercel, confirm which client-IP header reaches the function and that it cannot be visitor-overridden. If no trusted address is available, Redis is unavailable, or any required environment variable is missing, the endpoint fails closed with a generic response and the UI offers the direct email address. It does not fall back to an in-memory limiter.

## Before accepting real submissions

1. Configure `RESEND_API_KEY` and `RESEND_FROM` locally and in each intended Vercel environment.
2. In Production, choose either the verified Firewall setup (`CONTACT_RATE_LIMIT_BACKEND=vercel-waf`) or the existing Upstash setup (`CONTACT_RATE_LIMIT_BACKEND=upstash` plus both Upstash credentials and `RATE_LIMIT_HASH_SECRET`). Local development may omit the backend and both Upstash variables to use the development-only bypass.
3. Verify the Resend sender domain and confirm the configured sender is accepted by Resend.
4. Confirm the deployed host supplies a trusted client-IP header.
5. Submit one test from each form and confirm the notification reaches `consulting@shiftshift.co` and replies go to the submitted address.
6. Verify the request above the configured Firewall threshold returns 429, or, with Upstash selected, the sixth request from the same test IP is rate-limited within the one-hour window.

In development, forms can send without rate limiting only when the backend is unset and both Upstash values are omitted. In production, submissions remain unavailable if backend configuration is invalid or the selected limiter is unavailable. Users are given `consulting@shiftshift.co` as a direct alternative.
