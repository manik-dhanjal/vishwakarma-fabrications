/**
 * Gatsby configuration  Vishwakarma Rolling Shutters
 * Site-wide metadata lives here AND in src/data/site.ts (single source for
 * contact details used by components). Keep the two phone/address values in sync.
 */
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Vishwakarma Rolling Shutters",
    titleTemplate: "%s | Vishwakarma Rolling Shutters",
    description:
      "Rolling shutter manufacturers in Amroha, U.P. Manual, motorised, perforated & grill shutters, collapsible gates and repair. 35+ years of experience.",
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
    // When you add a brand icon, install gatsby-plugin-manifest and point it at
    // a 512px PNG export of the Shutter Mark (see design-reference/).
  ],
};

export default config;
