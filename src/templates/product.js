import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Placeholder } from "../components/ui";
import { Phone } from "../components/icons";
import productsData from "../data/products.json";
import site from "../data/site";

/**
 * Product detail template. Page data comes from gatsby-node.js pageContext,
 * with a runtime fallback so the file is resilient.
 */
export default function ProductTemplate({ pageContext }) {
  const product =
    pageContext.product ||
    productsData.find((p) => p.slug === pageContext.slug);
  const [active, setActive] = useState(0);
  if (!product) return null;

  const related = (product.related || [])
    .map((slug) => productsData.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <Layout>
      <Seo
        title={product.name}
        description={product.summary}
        pathname={`/products/${product.slug}/`}
      />
      <section className="section">
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: 18 }}>
            <Link to="/">Home</Link> › <Link to="/products/">Products</Link> ›{" "}
            <b>{product.name}</b>
          </div>

          <div className="pdp">
            {/* Gallery */}
            <div className="pdp__gallery">
              <Placeholder
                label={`${product.category.toLowerCase()} · photo ${active + 1}`}
                height={300}
              />
              <div className="pdp__thumbs">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      padding: 0,
                      border: 0,
                      background: "none",
                      cursor: "pointer",
                    }}
                    aria-label={`View photo ${i + 1}`}
                  >
                    <Placeholder label={`${i + 1}`} height={64} />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="pdp__info">
              <h1 className="h1" style={{ fontSize: "clamp(26px,3.4vw,34px)" }}>
                {product.name}
              </h1>
              <p className="lead">{product.description}</p>

              <div>
                <div className="sec-kicker">Key specs</div>
                <div className="specs">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k}>
                      <b>{k}</b> {v}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="sec-kicker">Options</div>
                <div className="chips">
                  {product.options.map((o) => (
                    <span className="chip" key={o}>
                      {o}
                    </span>
                  ))}
                </div>
              </div>

              <a
                className="btn btn--amber"
                href={site.phoneHref}
                style={{ marginTop: 6 }}
              >
                <Phone size={16} /> Call to order / enquire
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <div className="sec-kicker">Related products</div>
              <h2 className="sec-title">You might also need</h2>
              <div className="grid grid--3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}/`}
                    className="pcard"
                  >
                    <Placeholder
                      label={p.category.toLowerCase()}
                      height={110}
                    />
                    <div className="pcard__body">
                      <div className="pcard__title">{p.name}</div>
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
