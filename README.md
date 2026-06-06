# Vishwakarma Rolling Shutters Website (Gatsby + React + TypeScript)

Marketing website for **Vishwakarma Rolling Shutters**, a rolling-shutter workshop in Amroha, U.P. Built with **Gatsby 5 + React 18 + TypeScript**, styled with **Tailwind CSS** (utilities inline in the `.tsx`, design tokens in `tokens.css`), deployed to **Netlify**.

## Quick start

```bash
npm install
npm run develop      # http://localhost:8000
npm run build        # production build → ./public
npm run serve        # preview the production build
npm run typecheck    # tsc --noEmit (no compile, types only)
```

Requires Node 18+.

## What’s built

- **Pages:** Home (`/`), Products (`/products/`), Product detail (`/products/{slug}/`, generated from data), About (`/about/`), Contact (`/contact/`), 404.
- **Full-screen mobile menu** (dark “Forge & Steel” overlay) `src/components/header.tsx`.
- **Data-driven products** edit `src/data/products.json`; detail pages are created automatically in `gatsby-node.ts`.
- **Contact form** wired for **Netlify Forms** (no backend).
- **SEO** with per-page meta + `LocalBusiness` JSON-LD (`src/components/seo.tsx`), sitemap, robots.txt.
- **TypeScript** throughout. Shared domain types live in `src/types.ts`; JSON data is re-exported with types via `src/data/products.ts` and `src/data/reviews.ts`.

## Project structure

```
src/
  types.ts     shared Product / Review / SiteData interfaces
  data/        site.ts (contact/nav/stats) · products.ts + products.json
               · reviews.ts + reviews.json
  styles/      tokens.css (design tokens / CSS vars) · global.css (Tailwind entry + base resets)
  components/  brand.tsx (logo) · header.tsx (+ mobile menu) · footer.tsx
               icons.tsx · ui.tsx (cards/stats/cta/placeholder + shared button classes) · seo.tsx · layout.tsx
  pages/       index · products · about · contact · 404   (all .tsx)
  templates/   product.tsx  (product detail)
static/        favicon.svg · __forms.html (Netlify form detection) · robots.txt
tsconfig.json · tailwind.config.ts
gatsby-config.ts · gatsby-node.ts · gatsby-browser.ts · gatsby-ssr.tsx · netlify.toml
```

> **JSX runtime:** `tsconfig.json` uses `"jsx": "react"` (classic) to match Gatsby's
> SSR compiler, so every `.tsx` file imports `React`.

## Styling (Tailwind)

- Component styling is **Tailwind utilities inline** in the `.tsx` files. `global.css` only holds the `@tailwind base/components/utilities` directives plus a tiny base layer (body font/colors).
- Design tokens stay in `src/styles/tokens.css` as CSS variables and are mapped into the Tailwind theme in `tailwind.config.ts` (`bg-forge`, `text-steel`, `rounded-md`, `shadow-card`, `max-w-site`, `font-mono`, …). The spacing scale lines up 1:1 with Tailwind's defaults (`p-6` = 24px, etc.).
- The few repeated patterns (buttons) are exported as class-string constants from `ui.tsx` (`btnAmber`, `btnOutline`). Responsive rules use arbitrary variants like `max-[860px]:hidden`.
- PostCSS (Tailwind + autoprefixer) is wired via `gatsby-plugin-postcss` in `gatsby-config.ts` — there is no separate `postcss.config` file.

## Before you launch replace placeholders

1. **`src/data/site.ts`** real phone, WhatsApp, email, social URLs, Google Maps embed src, and the stat figures (5000+/1000+ are placeholders).
2. **`src/data/products.json`** confirm specs/options per product.
3. **`src/data/reviews.json`** swap in real Google reviews.
4. **Photos** every image is a striped `<Placeholder>` for now. Replace with real photos: add files under `src/images/`, install `gatsby-plugin-image` + `gatsby-plugin-sharp`, and swap `<Placeholder>` for `<StaticImage>`/`<GatsbyImage>`. Needed: hero, 6 product shots, workshop + 3 machines, founder/team.
5. **Favicon / PWA icon** `static/favicon.svg` (derived from the Shutter Mark) is wired up in `gatsby-ssr.tsx`. For a full PWA icon set, export the mark to a 512px PNG and add `gatsby-plugin-manifest`.

## Design system (quick reference)

- **Colors:** Forge `#E07A2F` · Molten `#BE4D17` · Graphite `#1E2227` · Steel `#5E6770` · Iron `#9AA1A8` · Bone `#F4F1EA`. All in `tokens.css`.
- **Type:** Archivo (display/body) + JetBrains Mono (specs/labels), loaded in `gatsby-ssr.tsx`.
- **Logo:** `ShutterMark` SVG component recolors for dark backgrounds.

## Analytics (GA4)

- **Setup:** create a GA4 property, then set `GATSBY_GA_MEASUREMENT_ID=G-XXXXXXXXXX` in the environment (Netlify → Site settings → Environment variables, and/or a local `.env` file). When the variable is **unset, analytics is disabled** — `gatsby-plugin-google-gtag` is only added in `gatsby-config.ts` when an id is present, so dev builds stay clean.
- **Helper:** `src/utils/analytics.ts` exposes `trackEvent(name, params)` (a safe no-op when gtag isn't loaded) plus three lead helpers.
- **Lead conversions (mark these as Key events in GA4):**
  - `phone_call_click` — every `tel:` link (header, hero, CTA band, product page, contact, mobile menu, footer); a `source` param says where.
  - `whatsapp_click` — every `wa.me` link.
  - `generate_lead` — enquiry form submitted (`contact.tsx`); sends the chosen `product` only, never name/phone/message.
- **Diagnostic events (funnel insight, not conversions):** `view_item` (product detail viewed), `select_product_filter` (category chip), `product_card_click`, `get_directions` (map/location link), `email_click` (`mailto:`), `mobile_menu_open`, `social_click` (Instagram/Facebook).
- GA4 also gives page views, geography, acquisition/source and device data automatically. Keep event params **PII-free**.

## Netlify deploy

1. Push to GitHub.
2. New Netlify site → pick the repo. Build command `gatsby build`, publish dir `public` (already in `netlify.toml`).
3. **Forms:** the hidden `static/__forms.html` lets Netlify detect the enquiry form at build; submissions appear in the Netlify dashboard. Add an email notification there.
4. Add your custom domain + SSL.

## Design references

See `design-reference/` for the original HTML prototypes (brand board, responsive wireframes, mobile menu) and the detailed `DESIGN_HANDOFF.md`. These define the intended look & behavior the code above implements them.
