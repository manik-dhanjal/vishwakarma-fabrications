import * as React from "react";
import { useState, useMemo } from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { ProductCard, CtaBand } from "../components/ui";
import products from "../data/products";

const CATEGORIES = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];

export default function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const shown = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <Layout>
      <Seo
        title="Products  Rolling Shutters & Gates"
        pathname="/products/"
      />
      <section className="section">
        <div className="container">
          <h1 className="h1" style={{ fontSize: "clamp(28px,4vw,40px)" }}>
            Our Products
          </h1>
          <p className="lead" style={{ marginTop: 12 }}>
            All types of rolling shutters and gates every job custom-built to
            your opening. Can't see what you need? We build custom.
          </p>

          <div
            className="chips chips--scroll"
            style={{ margin: "20px 0 28px" }}
            role="tablist"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`chip${filter === c ? " active" : ""}`}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid--3">
            {shown.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaBand title="Can't find it? We build custom." cta="☎ Call us" />
        </div>
      </section>
    </Layout>
  );
}
