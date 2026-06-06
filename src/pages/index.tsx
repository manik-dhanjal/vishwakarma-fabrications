import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import {
  Placeholder,
  StatBar,
  ProductCard,
  ReviewCard,
  SectionTitle,
  CtaBand,
} from "../components/ui";
import { Phone } from "../components/icons";
import products from "../data/products";
import reviews from "../data/reviews";
import site from "../data/site";

export default function HomePage() {
  return (
    <Layout>
      <Seo title="Rolling Shutter Manufacturers in Amroha" pathname="/" />

      {/* Hero */}
      <section className="section">
        <div className="container hero">
          <div className="hero__copy">
            <div className="eyebrow">{site.tagline} · U.P.</div>
            <h1 className="h1">
              All types of rolling shutters, built to last.
            </h1>
            <p className="lead">
              Manual, motorised, perforated &amp; grill shutters custom-built to
              your exact opening and fitted by our own team in Amroha.
            </p>
            <div className="hero__cta">
              <a className="btn btn--amber" href={site.phoneHref}>
                <Phone size={16} /> Call for a quote
              </a>
              <Link className="btn btn--outline" to="/products/">
                See products
              </Link>
            </div>
          </div>
          <Placeholder
            label="hero · finished shutter / shopfront"
            height={300}
            shutter
          />
        </div>
      </section>

      {/* Stats */}
      <section className="section--tight">
        <div className="container">
          <StatBar />
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container">
          <SectionTitle kicker="What we make" title="Our products" />
          <div className="grid grid--3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section--tight">
        <div className="container">
          <SectionTitle
            kicker="Customer reviews"
            title="Trusted by shops & factories"
          />
          <div className="grid grid--3">
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <CtaBand title="Get a free measurement & quote" />
        </div>
      </section>
    </Layout>
  );
}
