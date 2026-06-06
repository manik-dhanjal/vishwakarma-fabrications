/**
 * Analytics consent (DPDP / GDPR friendly). We use Google Consent Mode v2:
 * `analytics_storage` defaults to "denied" (set in gatsby-ssr.tsx before gtag
 * loads), and is only flipped to "granted" once the visitor accepts here.
 * The choice is remembered in localStorage so the banner shows only once.
 */
export const CONSENT_KEY = "va_consent";

export type ConsentValue = "granted" | "denied";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // ignore (private mode / storage disabled)
  }
  // Update Google Consent Mode live so the current page reacts immediately.
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: value === "granted" ? "granted" : "denied",
    });
  }
}
