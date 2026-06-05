/**
 * Gatsby configuration  Vishwakarma Fabrications
 * Site-wide metadata lives here AND in src/data/site.js (single source for
 * contact details used by components). Keep the two phone/address values in sync.
 */
module.exports = {
  siteMetadata: {
    title: "Vishwakarma Fabrications",
    titleTemplate: "%s | Vishwakarma Fabrications",
    description:
      "Rolling shutter manufacturers in Amroha, U.P. Manual, motorised, perforated & grill shutters, collapsible gates, steel fabrication and repair. 30+ years of experience.",
    siteUrl: "https://vishwakarmafabrications.in",
    locale: "en_IN",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: { output: "/sitemap" },
    },
    // When you add a brand icon, install gatsby-plugin-manifest and point it at
    // a 512px PNG export of the Shutter Mark (see design-reference/).
  ],
};
