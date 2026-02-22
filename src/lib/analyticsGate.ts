function parseAllowedHosts(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

function isLocalhost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "0.0.0.0" ||
    h.endsWith(".local")
  );
}

import { hasConsent } from "../hooks/useConsent";

/**
 * Returns true if we should track analytics on this hostname.
 * - Never track localhost / local network dev.
 * - Track only allowed hosts (production domains).
 * - Requires explicit user consent via Cookie Banner.
 */
export function shouldEnableAnalytics(
  hostname = window.location.hostname,
): boolean {
  if (!hasConsent()) return false;
  if (isLocalhost(hostname)) return false;

  const allowed = parseAllowedHosts(
    import.meta.env.VITE_ANALYTICS_ALLOWED_HOSTS,
  );
  if (allowed.size === 0) return false; // safest default
  return allowed.has(hostname.toLowerCase());
}
