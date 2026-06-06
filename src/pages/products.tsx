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

const chipBase =
  "text-[13px] font-semibold px-[14px] py-[6px] rounded-pill border cursor-pointer whitespace-nowrap";

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
      <Seo title="Products  Rolling Shutters & Gates" pathname="/products/" />
      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6">
          <h1 className="text-[clamp(28px,4vw,40px)] font-black leading-[1.06] tracking-[-0.8px]">
            Our Products
          </h1>
          <p className="text-steel text-[17px] max-w-[56ch] mb-0 mt-3">
            All types of rolling shutters and gates every job custom-built to
            your opening. Can't see what you need? We build custom.
          </p>

          <div
            className="flex gap-2 flex-nowrap overflow-x-auto pb-1 mt-[20px] mb-[28px]"
            role="tablist"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`${chipBase} ${
                  filter === c
                    ? "bg-forge text-[#1b1b1b] border-forge"
                    : "bg-card text-steel border-line"
                }`}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid gap-4 grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
            {shown.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6">
          <CtaBand title="Can't find it? We build custom." />
        </div>
      </section>
    </Layout>
  );
}
