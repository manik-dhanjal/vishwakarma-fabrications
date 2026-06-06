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

/* ---- Diagnostic events (not conversions, just funnel insight) ---- */

/** mailto: link clicked. */
export const trackEmail = (source: string): void =>
  trackEvent("email_click", { source });

/** Map / location link clicked (intent to visit the workshop). */
export const trackDirections = (source: string): void =>
  trackEvent("get_directions", { source });

/** Product detail page viewed. */
export const trackViewItem = (item: {
  name: string;
  category: string;
}): void =>
  trackEvent("view_item", {
    item_name: item.name,
    item_category: item.category,
  });

/** Product category filter selected on the products page. */
export const trackProductFilter = (filter: string): void =>
  trackEvent("select_product_filter", { filter });

/** A product card was clicked through to its detail page. */
export const trackProductCardClick = (name: string): void =>
  trackEvent("product_card_click", { item_name: name });

/** Mobile menu opened. */
export const trackMobileMenuOpen = (): void =>
  trackEvent("mobile_menu_open");

/** Instagram / Facebook (or other social) link clicked. */
export const trackSocialClick = (network: string, source: string): void =>
  trackEvent("social_click", { network, source });
