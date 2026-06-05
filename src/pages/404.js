import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

export default function NotFound() {
  return (
    <Layout>
      <Seo title="Page not found" />
      <section className="section">
        <div className="container center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "60px 0" }}>
          <div className="eyebrow">404</div>
          <h1 className="h1">This page rolled away.</h1>
          <p className="lead">The page you’re looking for doesn’t exist or has moved.</p>
          <Link className="btn btn--amber" to="/">Back to home</Link>
        </div>
      </section>
    </Layout>
  );
}
