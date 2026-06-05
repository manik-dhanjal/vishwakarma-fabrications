/**
 * Programmatically create a detail page for every product in src/data/products.json
 * using the src/templates/product.js template. Route: /products/{slug}/
 */
const path = require("path");
const products = require("./src/data/products.json");

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const template = path.resolve("src/templates/product.js");

  products.forEach((product) => {
    createPage({
      path: `/products/${product.slug}/`,
      component: template,
      context: { slug: product.slug, product },
    });
  });
};
