import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { btnAmber } from "../components/ui";

export default function NotFound() {
  return (
    <Layout>
      <Seo title="Page not found" />
      <section className="py-14 max-[560px]:py-10">
        <div className="max-w-site mx-auto px-6 text-center flex flex-col items-center gap-4 py-[60px]">
          <div className="font-mono text-[12px] font-medium uppercase tracking-[0.24em] text-molten">
            404
          </div>
          <h1 className="text-[clamp(30px,5vw,52px)] font-black leading-[1.06] tracking-[-0.8px]">
            This page rolled away.
          </h1>
          <p className="text-steel text-[17px] max-w-[56ch] mb-0">
            The page you’re looking for doesn’t exist or has moved.
          </p>
          <Link className={btnAmber} to="/">
            Back to home
          </Link>
        </div>
      </section>
    </Layout>
  );
}
