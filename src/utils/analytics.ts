/**
 * Thin wrapper around GA4's gtag (injected by gatsby-plugin-google-gtag).
 * No-ops safely when gtag isn't present (SSR, dev, ad-blockers, no GA id set),
 * so callers never need to guard.
 *
 * Lead helpers below fire the three "key events" we mark as conversions in GA4:
 *   - phone_call_click   (tel: links)
 *   - whatsapp_click     (wa.me links)
 *   - generate_lead      (enquiry form submitted)
 * Keep event params PII-free — never send a visitor's name/phone/message.
 */
type GtagParams = Record<string, string | number | boolean | undefined>;

type GtagFn = (command: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** tel: link clicked. `source` = where on the site (header, hero, footer…). */
export const trackPhoneCall = (source: string): void =>
  trackEvent("phone_call_click", { source });

/** wa.me link clicked. */
export const trackWhatsApp = (source: string): void =>
  trackEvent("whatsapp_click", { source });

/** Enquiry form submitted successfully — the one hard conversion. */
export const trackLead = (params: GtagParams = {}): void =>
  trackEvent("generate_lead", { method: "enquiry_form", ...params });
