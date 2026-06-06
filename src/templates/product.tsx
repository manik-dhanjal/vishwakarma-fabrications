import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "gatsby";
import type { PageProps } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Placeholder, btnAmber } from "../components/ui";
import { Phone } from "../components/icons";
import {
  trackPhoneCall,
  trackViewItem,
  trackProductCardClick,
} from "../utils/analytics";
import products from "../data/products";
import site from "../data/site";
import type { Product } from "../types";

interface ProductPageContext {
  slug: string;
  product?: Product;
}

const kicker =
  "flex items-center gap-3 mb-2 font-mono text-[12px] uppercase tracking-[0.24em] text-steel before:content-[''] before:w-[26px] before:h-[2px] before:bg-forge";
const cardLink =
  "flex flex-col bg-card border border-line rounded-md overflow-hidden no-underline text-inherit shadow-card transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] hover:shadow-[0_12px_26px_rgba(30,34,39,0.1)]";

/**
 * Product detail template. Page data comes from gatsby-node.ts pageContext,
 * with a runtime fallback so the file is resilient.
 */
export default function ProductTemplate({
  pageContext,
}: PageProps<object, ProductPageContext>) {
  const product =
    pageContext.product ||
    products.find((p) => p.slug === pageContext.slug);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (product) {
      trackViewItem({ name: product.name, category: product.category });
    }
  }, [product]);

  if (!product) return null;

  const related = (product.related || [])
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <Layout>
      <Seo
        title={product.name}
        description={product.summary}
        pathname={`/products/${product.slug}/`}
      />
      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6">
          <div className="font-mono text-[12px] text-steel mb-[18px]">
            <Link to="/">Home</Link> › <Link to="/products/">Products</Link> ›{" "}
            <b className="text-graphite">{product.name}</b>
          </div>

          <div className="grid grid-cols-[1.05fr_1fr] gap-10 items-start max-[860px]:grid-cols-1">
            {/* Gallery */}
            <div className="flex flex-col gap-3">
              <Placeholder
                label={`${product.category.toLowerCase()} · photo ${active + 1}`}
                height={300}
              />
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="p-0 border-0 bg-transparent cursor-pointer"
                    aria-label={`View photo ${i + 1}`}
                  >
                    <Placeholder label={`${i + 1}`} height={64} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 sticky top-[90px] max-[860px]:static">
              <h1 className="text-[clamp(26px,3.4vw,34px)] font-black leading-[1.06] tracking-[-0.8px]">
                {product.name}
              </h1>
              <p className="text-steel text-[17px] max-w-[56ch] mb-0">
                {product.description}
              </p>

              <div>
                <div className={kicker}>Key specs</div>
                <div className="font-mono text-[13px] text-steel leading-[1.9]">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k}>
                      <b className="text-graphite">{k}</b> {v}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className={kicker}>Options</div>
                <div className="flex gap-2 flex-wrap">
                  {product.options.map((o) => (
                    <span
                      className="text-[13px] font-semibold px-[14px] py-[6px] rounded-pill border border-line bg-card text-steel whitespace-nowrap"
                      key={o}
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>

              <a
                className={`${btnAmber} mt-[6px]`}
                href={site.phoneHref}
                onClick={() => trackPhoneCall("product_detail")}
              >
                <Phone size={16} /> Call to order / enquire
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-[56px]">
              <div className={kicker}>Related products</div>
              <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold mt-0 mb-6 tracking-[-0.3px]">
                You might also need
              </h2>
              <div className="grid gap-4 grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}/`}
                    onClick={() => trackProductCardClick(p.name)}
                    className={cardLink}
                  >
                    <Placeholder label={p.category.toLowerCase()} height={110} />
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <div className="text-[18px] font-bold">{p.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
