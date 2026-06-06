// PostCSS config for Tailwind. This stays as .js on purpose: it's loaded by
// postcss-loader (via gatsby-plugin-postcss) at CSS-processing time, outside
// Gatsby's TypeScript config compilation. Tailwind auto-loads tailwind.config.ts.
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
