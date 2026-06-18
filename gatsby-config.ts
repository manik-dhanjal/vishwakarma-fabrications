/**
 * Gatsby configuration  Vishwakarma Rolling Shutters
 * Site-wide metadata lives here AND in src/data/site.ts (single source for
 * contact details used by components). Keep the two phone/address values in sync.
 */
import type { GatsbyConfig } from "gatsby";

// GA4 measurement id (e.g. G-XXXXXXXXXX). Set GATSBY_GA_MEASUREMENT_ID in the
// environment (Netlify env vars / .env). When unset, analytics is simply off.
const gaId = process.env.GATSBY_GA_MEASUREMENT_ID;

const gaPlugin = gaId
  ? [
      {
        resolve: "gatsby-plugin-google-gtag",
        options: {
          trackingIds: [gaId],
          gtagConfig: { anonymize_ip: true },
          // head:true loads gtag in <head>; respectDNT honours Do-Not-Track.
          pluginConfig: { head: true, respectDNT: true },
        },
      },
    ]
  : [];

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Vishwakarma Rolling Shutters",
    titleTemplate: "%s | Vishwakarma Rolling Shutters",
    description:
      "Rolling shutter manufacturers in Amroha, U.P. Manual, motorised, perforated & grill shutters, collapsible gates and repair. 50+ years of experience.",
    siteUrl: "https://vishwakarmafabrications.in",
    locale: "en_IN",
  },
  plugins: [
    // PostCSS plugins (Tailwind + autoprefixer) are configured in
    // postcss.config.js. They must NOT be imported here: any third-party value
    // import in gatsby-config.ts breaks Gatsby's config compilation in the
    // build worker on Netlify ("failed to compile to gatsby-config.js").
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: { output: "/sitemap" },
    },
    ...gaPlugin,
    // When you add a brand icon, install gatsby-plugin-manifest and point it at
    // a 512px PNG export of the Shutter Mark (see design-reference/).
  ],
};

export default config;
