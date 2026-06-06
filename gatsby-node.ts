/**
 * Programmatically create a detail page for every product in src/data/products.json
 * using the src/templates/product.tsx template. Route: /products/{slug}/
 */
import path from "path";
import type { GatsbyNode } from "gatsby";
import products from "./src/data/products";

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions;
  const template = path.resolve("src/templates/product.tsx");

  products.forEach((product) => {
    createPage({
      path: `/products/${product.slug}/`,
      component: template,
      context: { slug: product.slug, product },
    });
  });
};
