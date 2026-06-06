import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import site from "../data/site";

interface SeoProps {
  title?: string;
  description?: string;
  pathname?: string;
}

interface SeoQuery {
  site: {
    siteMetadata: {
      title: string;
      titleTemplate: string;
      description: string;
      siteUrl: string;
      locale: string;
    };
  };
}

/**
 * SEO  page meta + LocalBusiness JSON-LD (critical for local search).
 */
export default function Seo({ title, description, pathname }: SeoProps) {
  const { site: data } = useStaticQuery<SeoQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          locale
        }
      }
    }
  `);
  const meta = data.siteMetadata;
  const metaDescription = description || meta.description;
  const url = meta.siteUrl + (pathname || "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    image: meta.siteUrl + "/og-image.jpg",
    "@id": meta.siteUrl,
    url: meta.siteUrl,
    telephone: site.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Amroha",
      addressRegion: "Uttar Pradesh",
      postalCode: "244221",
      addressCountry: "IN",
    },
    openingHours: "Mo-Sa 09:00-19:00",
    priceRange: "₹₹",
    description: metaDescription,
  };

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={title}
      titleTemplate={title ? meta.titleTemplate : meta.title}
      defaultTitle={meta.title}
    >
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || meta.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={meta.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
