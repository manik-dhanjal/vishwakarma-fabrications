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
  btnAmber,
  btnOutline,
} from "../components/ui";
import { Phone } from "../components/icons";
import { trackPhoneCall } from "../utils/analytics";
import products from "../data/products";
import reviews from "../data/reviews";
import site from "../data/site";
import landingPhoto from "../../static/landing-photo.png";

const grid3 =
  "grid gap-4 grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1";

export default function HomePage() {
  return (
    <Layout>
      <Seo title="Rolling Shutter Manufacturers in Amroha" pathname="/" />

      {/* Hero */}
      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6 grid grid-cols-[1.1fr_1fr] gap-10 items-center max-[860px]:grid-cols-1">
          <div className="flex flex-col gap-4">
            <div className="font-mono text-[12px] font-medium uppercase tracking-[0.24em] text-molten">
              {site.tagline} · U.P.
            </div>
            <h1 className="text-[clamp(30px,5vw,52px)] font-black leading-[1.06] tracking-[-0.8px]">
              All types of rolling shutters, built to last.
            </h1>
            <p className="text-steel text-[17px] max-w-[56ch] mb-0">
              Manual, motorised, perforated &amp; grill shutters custom-built to
              your exact opening and fitted by our own team in Amroha.
            </p>
            <div className="flex gap-3 flex-wrap mt-2">
              <a
                className={btnAmber}
                href={site.phoneHref}
                onClick={() => trackPhoneCall("hero")}
              >
                <Phone size={16} /> Call for a quote
              </a>
              <Link className={btnOutline} to="/products/">
                See products
              </Link>
            </div>
          </div>
          <img
            src={landingPhoto}
            alt="hero · finished shutter / shopfront"
            height={300}
            className="rounded-md"
          />
          {/* <Placeholder
            label="hero · finished shutter / shopfront"
            height={300}
            shutter
          /> */}
        </div>
      </section>

      {/* Stats */}
      <section className="py-10">
        <div className="max-w-site mx-auto px-6">
          <StatBar />
        </div>
      </section>

      {/* Products */}
      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6">
          <SectionTitle kicker="What we make" title="Our products" />
          <div className={grid3}>
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-10">
        <div className="max-w-site mx-auto px-6">
          <SectionTitle
            kicker="Customer reviews"
            title="Trusted by shops & factories"
          />
          <div className={grid3}>
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6">
          <CtaBand title="Get a free measurement & quote" />
        </div>
      </section>
    </Layout>
  );
}
