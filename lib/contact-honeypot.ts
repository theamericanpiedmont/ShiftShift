export const CONTACT_HONEYPOT_FIELD = "contact_check" as const;

export function hasFilledContactHoneypot(payload: unknown): boolean {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return false;
  const value = (payload as Record<string, unknown>)[CONTACT_HONEYPOT_FIELD];
  return value !== undefined && value !== "";
}
