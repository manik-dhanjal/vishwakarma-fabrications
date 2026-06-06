// Ambient declaration so TypeScript accepts side-effect CSS imports
// (e.g. import "./styles/global.css") handled by Gatsby's webpack loaders.
declare module "*.css";

// autoprefixer ships no type declarations; it's used as a PostCSS plugin in
// gatsby-config.ts. Declaring it keeps `tsc` happy without pulling in @types.
declare module "autoprefixer";
