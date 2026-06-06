# Handoff: Vishwakarma Fabrications Marketing Website

## Overview

A marketing/brochure website for **Vishwakarma Fabrications**, a rolling-shutter and steel-fabrication workshop in Amroha, Uttar Pradesh, India (30+ years in business). The site's #1 job is **lead generation by phone** make it dead simple for shop owners, factories, homeowners and institutions to see the product range and call/WhatsApp for a quote.

**Target stack:** React + **Gatsby**, deployed on **Netlify**. (If you prefer, Astro is an equally good fit for a static content site and deploys to Netlify identically but the client asked for Gatsby, so default to that.)

**Locked design decisions:**

- **Landing direction:** "Product-led" a clean product grid is the centerpiece (chosen over Trust-led, Use-case, and Craft-led alternatives).
- **Logo:** "Shutter Mark" an abstracted rolling shutter (amber slats on a graphite block).

---

## About the Design Files

The HTML files in this bundle are **design references** prototypes that communicate layout, hierarchy, responsive behavior, brand, and copy. **They are not production code to copy.** Your task is to **recreate these designs in Gatsby**, using idiomatic React components, the project's chosen styling approach (CSS Modules, styled-components, vanilla-extract, or plain CSS + tokens your call), and Gatsby's image/SEO plugins.

Two fidelity levels are bundled read the next section carefully, because they're used differently.

## Fidelity

- **`Brand & Logo - Vishwakarma Fabrications.html` → HIGH FIDELITY.** This is the source of truth for **all visual styling**: exact colors, fonts, the logo, button styles, spacing feel. Match it pixel-faithfully.
- **`Wireframes - A Product-led Responsive.html` → LOW FIDELITY (layout/structure).** This defines **page structure, responsive reflow, components present on each page, and copy**. It is intentionally sketchy (hand-drawn look, grey placeholder bars). **Do not reproduce the sketchy wireframe aesthetic** instead, lay out each page as the wireframe shows, then **style it with the hi-fi brand system** above.
- `Wireframes - Vishwakarma Fabrications.html` is included for context only (it shows the 4 explored directions; we picked "A · Product-led"). You can ignore it for implementation.

Net: **wireframe = what goes where + how it reflows; brand board = what it looks like.**

---

## Design Tokens

### Colors ("Forge & Steel")

| Token                    | Hex       | Usage                                                       |
| ------------------------ | --------- | ----------------------------------------------------------- |
| `--forge` (Forge Orange) | `#E07A2F` | Primary accent: CTAs, the logo slats, key highlights, links |
| `--molten` (Molten)      | `#BE4D17` | Hover/pressed states, deeper accent                         |
| `--graphite` (Graphite)  | `#1E2227` | Headlines, nav bar, footer, logo block, primary dark        |
| `--steel` (Steel)        | `#5E6770` | Body text, secondary UI, captions                           |
| `--iron` (Iron)          | `#9AA1A8` | Borders, dividers, disabled states                          |
| `--bone` (Bone)          | `#F4F1EA` | Page background (warm off-white, NOT pure white)            |
| `--card`                 | `#FBFAF6` | Card / panel surfaces                                       |
| `--line`                 | `#E2DDD2` | Hairline borders on light surfaces                          |

One warm accent only keep everything else neutral steel/bone. CTA buttons: `--forge` background, near-black (`#1b1b1b`) text, weight 800.

### Typography

- **Display / headings:** **Archivo** (Google Fonts), weights 800–900, heavy. Used wide/bold for H1/hero and section titles. (Letter-spacing slightly negative on large sizes, ~ -0.5px.)
- **Body / UI:** **Archivo**, weights 400–600.
- **Technical / specs / labels / phone numbers:** **JetBrains Mono** (Google Fonts), 400–500. Used for measurements, gauge, motor HP, breadcrumbs, eyebrows, kicker labels (uppercase, letter-spacing ~0.24em).
- Load via `gatsby-plugin-google-fonts` or self-host with `fontsource`. Families: `Archivo:400,500,600,700,800,900` and `JetBrains Mono:400,500,700`. Optional: `Noto Serif Devanagari` if a Hindi (विश्वकर्मा) lockup is used.

### Type scale (desktop → mobile)

| Role                 | Desktop                             | Mobile  | Font / weight      |
| -------------------- | ----------------------------------- | ------- | ------------------ |
| Hero H1              | 40–52px                             | 26–28px | Archivo 900        |
| Section title        | 26–30px                             | 22px    | Archivo 800        |
| Card / product title | 17–18px                             | 16px    | Archivo 700        |
| Body                 | 16px                                | 15px    | Archivo 400/500    |
| Eyebrow / mono label | 11–12px, uppercase, 0.24em tracking | same    | JetBrains Mono 500 |

### Spacing, radius, shadow

- Spacing scale (px): 4, 8, 12, 16, 20, 24, 32, 40, 56. Section vertical padding ~56px desktop / ~32px mobile.
- Border radius: buttons 8–9px; cards 12–14px; the logo block 10px (≈20% of its size). Pills/chips ~20px.
- Borders: 1px `--line` on light cards. Nav/footer use solid `--graphite` fills.
- Shadows: keep subtle. Cards: `0 1px 2px rgba(0,0,0,0.06)` or a soft `0 6px 18px rgba(30,34,39,0.06)`. Don't over-shadow this is an industrial brand.

---

## The Logo (Shutter Mark) build spec

An abstracted rolling shutter: a rounded **graphite square** containing **4 horizontal amber slats** and a **light "bottom rail"**. Implement as an inline SVG React component so it scales crisply and recolors for dark backgrounds.

```jsx
// Logo mark  viewBox 48x48, scales to any size via width/height
export function ShutterMark({
  size = 48,
  block = "#1E2227",
  slat = "#E07A2F",
  rail = "#F4F1EA",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Vishwakarma Fabrications"
    >
      <rect x="0" y="0" width="48" height="48" rx="10" fill={block} />
      <g fill={slat}>
        <rect x="9" y="13" width="30" height="3.2" rx="1.6" />
        <rect x="9" y="18.5" width="30" height="3.2" rx="1.6" />
        <rect x="9" y="24" width="30" height="3.2" rx="1.6" />
        <rect x="9" y="29.5" width="30" height="3.2" rx="1.6" />
      </g>
      <rect x="9" y="35.5" width="30" height="3.4" rx="1.7" fill={rail} />
    </svg>
  );
}
```

**Lockup:** mark + wordmark. Wordmark = "VISHWA" in `--graphite` + "KARMA" in `--forge` (one word, two colors), Archivo 900, with a small JetBrains Mono subline "Fabrications · Amroha" (`--steel`). Provide three lockups: horizontal (mark left of wordmark), stacked (mark above), and mark-only (favicon / app icon / nav on mobile). On dark backgrounds use `block` = bone or keep graphite with bone slats (reversed) see the brand board's "Logo system" section.
**Favicon / manifest icon:** export the mark-only SVG → PNG at 32/180/512. Generate `विश्वकर्मा` (Noto Serif Devanagari) only if a bilingual lockup is wanted; optional.

---

## Site Map / Routes

```
/                      Home (product-led landing)
/products              Product catalog (filterable grid)
/products/{slug}       Product detail (template, 6 instances)
/about                 Story, workshop, machines, stats
/contact               Call / WhatsApp / enquiry form / map
```

The 6 product slugs: `manual-rolling-shutters`, `motorised-remote-shutters`, `perforated-grill-shutters`, `collapsible-sliding-gates`, `steel-fabrication`, `repair-maintenance`.

---

## Screens / Views

> Each page shares a **Header** (sticky) and **Footer**. The phone CTA must be reachable on every screen and at every breakpoint.

### Global Header

- **Desktop (≥1024px):** Graphite bar. Left: logo lockup (mark + "VISHWAKARMA" wordmark + small subline). Center/right: nav links `Home · Products · About · Contact` (active link underlined in `--forge`). Far right: amber phone button `☎ +91 XXXXX XXXXX`.
- **Tablet (~768px):** Same inline nav, condensed gaps; phone button collapses to an **icon-only** amber button.
- **Mobile (≤640px):** Left: **hamburger** (☰) opening a drawer with the nav links. Center: compact logo (mark + wordmark, no subline). Right: icon phone button. Plus a **sticky bottom bar** with full-width `☎ Call now` + `WhatsApp` buttons, pinned to viewport bottom on all pages.

### Global Footer

Graphite background, `--forge` top border (3px). Columns: logo + one-line blurb · Products list · Contact (address, phone, hours). Single column stacked on mobile.

### 1) Home (`/`)

**Purpose:** Communicate "we build all types of rolling shutters" and drive a call.
**Sections (top→bottom):**

1. **Hero** eyebrow (mono) "Rolling shutter manufacturers · Amroha, U.P."; H1 "All types of rolling shutters, built to last."; one supporting line; two buttons: `☎ Call for a quote` (amber) + `See products` (outline/scroll). Right side: hero image (finished shutter / shopfront). _Desktop:_ text left / image right. _Tablet & mobile:_ stacked, image below text; primary call button full-width on mobile.
2. **Stat strip** 4 stats: **30+ years experience · 5000+ shutters built · 1000+ happy customers · CNC cutting + moulding**. (Numbers are placeholders see "Open content items".) Row of 4 desktop → row/wrap tablet → 2-up mobile.
3. **"What we make"** product grid of 6 cards (image, title, short line, "View →" link to detail). **3 columns desktop → 2 columns tablet → 1 column mobile** (mobile shows 3 cards + a "See all products →" button).
4. **Customer reviews** 3 review cards (5 amber stars, quote, name/area). 3-up desktop → 1–2 up smaller. Pull from Google reviews.
5. **CTA band** graphite block, centered: "Get a free measurement & quote" + amber phone button.

### 2) Products (`/products`)

**Purpose:** Browse the full catalog.

- Page H1 "Our Products" + one supporting line.
- **Filter chips** by type: `All · Manual · Motorised · Perforated · Gates · Fabrication · Repair` (active chip = amber). Client-side filter of the grid. _Tablet:_ chips wrap. _Mobile:_ chips horizontal-scroll.
- **Card grid:** all 6 products (image, title, 1–2 line desc, "View details →"). 3 → 2 → 1 columns.
- Closing CTA band: "Can't find it? We build custom." + call button.

### 3) Product detail (`/products/{slug}`) template ×6

**Purpose:** Depth on one product + drive an order call.

- Breadcrumb (mono): `Home › Products › {Name}`.
- **Desktop:** two columns left: image gallery (main + 3 thumbs); right: H1 name, description, **Key specs** (mono list: WIDTH, GAUGE, MOTOR, FINISH values vary per product), **Options** chips (e.g. Remote / Wall switch / Manual override), and a `☎ Call to order / enquire` amber button that is **sticky on scroll**.
- **Tablet/Mobile:** single column gallery on top (swipeable on mobile), then name, description, specs, options; **sticky bottom "Call to order" bar** on mobile.
- **Related products:** 3 cards at the bottom.

### 4) About (`/about`)

**Purpose:** Credibility.

- Centered intro: eyebrow "Our story"; H1 "Building shutters in Amroha for 30+ years."; **subtitle "a family business, run across three generations."** (NOTE: the "three generations" line appears **only here**, as a subtitle do not scatter it elsewhere.)
- Story block: workshop/founder photo + paragraph text (2-col desktop, stacked on tablet/mobile).
- **Stat band:** 30+ years · 5000+ built · 1000+ customers · CNC machinery.
- **"Our machines":** 3 cards (Slat moulding, CNC cutting, Fabrication) with photos. Emphasize state-of-the-art moulding + CNC (a real differentiator).
- CTA band: "Visit our workshop in Amroha" + call button.

### 5) Contact (`/contact`)

**Purpose:** Remove all friction to reach the shop.

- H1 "Get in touch".
- **Primary actions first:** big `☎ +91 XXXXX XXXXX` (tap-to-call) and `WhatsApp us` buttons.
- Address: **T.P. Nagar Chowk, Joya Road, Amroha, Uttar Pradesh 244221**. Hours: **Daily, 9am–7pm**.
- **Google Map** embed.
- **Enquiry form** (Netlify Forms): Name, Phone, Product/service (select), Message, Send. _Desktop:_ details left / form right. _Tablet/mobile:_ stacked, call+WhatsApp above the fold.

---

## Interactions & Behavior

- **Header nav:** active route underlined `--forge`. Mobile hamburger toggles a drawer (slide/fade, ~200ms ease).
- **Sticky mobile call bar:** `position: sticky/fixed` bottom; always visible; `tel:` and `https://wa.me/` links.
- **Product filter chips:** client-side filter (React state). No page reload.
- **Product gallery:** click thumb → swaps main image (desktop); horizontal swipe carousel (mobile).
- **Sticky "Call to order"** on product detail (desktop: sticky sidebar button; mobile: sticky bottom bar).
- **Buttons:** hover → background shifts `--forge` → `--molten`; subtle press state. Respect `prefers-reduced-motion`.
- **Form validation:** Name required; Phone required (basic 10-digit/intl check); Message optional. Show inline errors; success state after submit.
- **Responsive breakpoints:** mobile ≤640px, tablet 641–1024px, desktop ≥1024px. Grid: 3 / 2 / 1 columns for product cards.

## Contact form Netlify Forms (Gatsby gotcha)

Netlify detects forms from **static HTML at build**, but Gatsby renders via React. Standard fix:

- Add `data-netlify="true"` and a hidden `<input name="form-name" value="enquiry" />` to the React form, **and** include a matching plain-HTML form (hidden) so Netlify's build-time bot can find it (either a static `static/__forms.html` with the same fields, or the documented hidden-form approach). Handle submit with a `fetch` POST to `/` encoded as `application/x-www-form-urlencoded`, then show a success message.
- No backend needed; submissions appear in the Netlify dashboard. Optionally add an email notification.

## State Management

Local React state only no global store needed:

- `mobileNavOpen` (header drawer)
- `activeFilter` (products page chip)
- `activeImage` (product gallery)
- `formState` (`{ values, errors, status: idle|submitting|success|error }`)

## Data Model

Keep products as data, not hard-coded JSX, so specs are editable without touching layout. Use Markdown/MDX (`gatsby-source-filesystem` + `gatsby-transformer-remark` / `gatsby-plugin-mdx`) or a JSON file consumed at build. Suggested product shape:

```json
{
  "slug": "motorised-remote-shutters",
  "name": "Motorised & Remote Shutters",
  "category": "Motorised",
  "summary": "One-line description for cards.",
  "description": "Full paragraph for the detail page.",
  "specs": {
    "width": "up to 14'-0\"",
    "gauge": "18 / 20 / 22",
    "motor": "0.5 – 2.0 HP",
    "finish": "powder-coat, any colour"
  },
  "options": ["Remote", "Wall switch", "Manual override"],
  "images": ["main.jpg", "alt-1.jpg", "alt-2.jpg"],
  "related": [
    "manual-rolling-shutters",
    "perforated-grill-shutters",
    "collapsible-sliding-gates"
  ]
}
```

Reviews can be a small JSON array too: `{ stars, quote, name, area }`.

## SEO (high priority this is a LOCAL business)

- Per-page `<title>` / meta description via `react-helmet` (e.g. "Rolling Shutter Manufacturers in Amroha | Vishwakarma Fabrications").
- **`LocalBusiness` JSON-LD** structured data with name, address (T.P. Nagar Chowk, Joya Road, Amroha, UP 244221), phone, geo, opening hours, and product/service list. This drives local "rolling shutter near me" results.
- `gatsby-plugin-sitemap`, `gatsby-plugin-manifest` (PWA icon from the Shutter Mark), `gatsby-plugin-image` + `gatsby-plugin-sharp` for fast images, robots.txt.
- Semantic headings, descriptive `alt` text, `tel:` links.
- After launch: set up a **Google Business Profile** and link the site (not a code task, but note it for the client).

## Assets

- **Logo:** build from the SVG spec above no external file needed.
- **Photos:** the client currently has **few/no photos**. Every image in the wireframes is a placeholder. Needed (phone photos are fine): hero finished-shutter/shopfront, 6 product shots, workshop + 3 machine shots (moulding, CNC, welding), optional founder/team. Use `gatsby-plugin-image` and ship tasteful striped placeholders until real photos arrive.
- **Fonts:** Archivo + JetBrains Mono (Google Fonts / fontsource). Optional Noto Serif Devanagari.
- **Icons:** phone, whatsapp, hamburger use a lightweight set (e.g. lucide-react) tinted to brand colors.

## Deployment (Netlify)

- Connect the GitHub repo; Netlify auto-detects Gatsby.
- `netlify.toml`:
  ```toml
  [build]
    command = "gatsby build"
    publish = "public"
  ```
- Add custom domain + free SSL. Enable **Netlify Forms** (automatic once the form is detected). Every push to `main` auto-deploys.

## Open content items (placeholders to confirm with client)

- Real phone number(s) and WhatsApp number.
- Real metrics: years (30+ confirmed), **total shutters built**, **customers served** (5000+/1000+ are placeholders).
- Real product specs per type (width/gauge/motor/finish).
- Real customer reviews (Google).
- Photos (see Assets).

## Files in this bundle

- `Brand & Logo - Vishwakarma Fabrications.html` **HI-FI** brand system: colors, type, logo concepts + system, in-context header. Source of truth for styling.
- `Wireframes - A Product-led Responsive.html` **LO-FI** layout + responsive behavior for all 5 pages across mobile/tablet/desktop, using the chosen Shutter Mark logo. Source of truth for structure & copy.
- `Wireframes - Vishwakarma Fabrications.html` context only (the 4 explored directions; "A · Product-led" was chosen).

Open each HTML file in a browser to inspect layouts and exact copy. Implement in Gatsby; match the hi-fi brand styling onto the lo-fi layouts.
