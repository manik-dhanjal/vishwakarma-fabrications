# Vishwakarma Fabrications Website (Gatsby + React)

Marketing website for **Vishwakarma Fabrications**, a rolling-shutter & steel-fabrication workshop in Amroha, U.P. Built with **Gatsby 5 + React 18**, styled with plain CSS design tokens, deployed to **Netlify**.

## Quick start

```bash
npm install
npm run develop      # http://localhost:8000
npm run build        # production build → ./public
npm run serve        # preview the production build
```

Requires Node 18+.

## What’s built

- **Pages:** Home (`/`), Products (`/products/`), Product detail (`/products/{slug}/`, generated from data), About (`/about/`), Contact (`/contact/`), 404.
- **Full-screen mobile menu** (dark “Forge & Steel” overlay) `src/components/header.js`.
- **Data-driven products** edit `src/data/products.json`; detail pages are created automatically in `gatsby-node.js`.
- **Contact form** wired for **Netlify Forms** (no backend).
- **SEO** with per-page meta + `LocalBusiness` JSON-LD (`src/components/seo.js`), sitemap, robots.txt.

## Project structure

```
src/
  data/        site.js (contact/nav/stats) · products.json · reviews.json
  styles/      tokens.css (design tokens) · global.css (all component styles)
  components/  brand.js (logo) · header.js (+ mobile menu) · footer.js
               icons.js · ui.js (cards/stats/cta/placeholder) · seo.js · layout.js
  pages/       index · products · about · contact · 404
  templates/   product.js  (product detail)
static/        __forms.html (Netlify form detection) · robots.txt
gatsby-config.js · gatsby-node.js · gatsby-browser.js · gatsby-ssr.js · netlify.toml
```

## Before you launch replace placeholders

1. **`src/data/site.js`** real phone, WhatsApp, email, social URLs, Google Maps embed src, and the stat figures (5000+/1000+ are placeholders).
2. **`src/data/products.json`** confirm specs/options per product.
3. **`src/data/reviews.json`** swap in real Google reviews.
4. **Photos** every image is a striped `<Placeholder>` for now. Replace with real photos: add files under `src/images/`, install `gatsby-plugin-image` + `gatsby-plugin-sharp`, and swap `<Placeholder>` for `<StaticImage>`/`<GatsbyImage>`. Needed: hero, 6 product shots, workshop + 3 machines, founder/team.
5. **Favicon / PWA icon** export the Shutter Mark (see `src/components/brand.js`) to a 512px PNG, add `gatsby-plugin-manifest`.

## Design system (quick reference)

- **Colors:** Forge `#E07A2F` · Molten `#BE4D17` · Graphite `#1E2227` · Steel `#5E6770` · Iron `#9AA1A8` · Bone `#F4F1EA`. All in `tokens.css`.
- **Type:** Archivo (display/body) + JetBrains Mono (specs/labels), loaded in `gatsby-ssr.js`.
- **Logo:** `ShutterMark` SVG component recolors for dark backgrounds.

## Netlify deploy

1. Push to GitHub.
2. New Netlify site → pick the repo. Build command `gatsby build`, publish dir `public` (already in `netlify.toml`).
3. **Forms:** the hidden `static/__forms.html` lets Netlify detect the enquiry form at build; submissions appear in the Netlify dashboard. Add an email notification there.
4. Add your custom domain + SSL.

## Design references

See `design-reference/` for the original HTML prototypes (brand board, responsive wireframes, mobile menu) and the detailed `DESIGN_HANDOFF.md`. These define the intended look & behavior the code above implements them.
