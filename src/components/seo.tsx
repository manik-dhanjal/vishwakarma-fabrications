import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import site from "../data/site";

interface SeoProps {
  title?: string;
  description?: string;
  pathname?: string;
  /** Path (relative to siteUrl) or absolute URL of the share/preview image. */
  image?: string;
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

// Default link-preview image. 1844×853 PNG that lives in /static, served from
// the site root. Used by Facebook, WhatsApp, LinkedIn, TikTok, Slack, Discord,
// Telegram, iMessage (all read Open Graph) and the Twitter/X card.
const DEFAULT_OG_IMAGE = "/landing-photo.png";
const OG_IMAGE_WIDTH = "1844";
const OG_IMAGE_HEIGHT = "853";
const OG_IMAGE_TYPE = "image/png";

/**
 * SEO  page meta, full social-share tags (Open Graph + Twitter Card) and
 * LocalBusiness JSON-LD (critical for local search).
 *
 * Open Graph is the de-facto standard consumed by Facebook, WhatsApp, LinkedIn,
 * TikTok, Slack, Discord, Telegram and iMessage when a link is shared, so a
 * complete og:* block covers "shared link metadata" everywhere. Twitter/X reads
 * the twitter:* tags below.
 */
export default function Seo({ title, description, pathname, image }: SeoProps) {
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
  const pageTitle = title ? `${title} | ${meta.title}` : meta.title;

  // Resolve the image to an absolute URL  social scrapers require it.
  const imagePath = image || DEFAULT_OG_IMAGE;
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : meta.siteUrl + imagePath;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    image: imageUrl,
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

      {/* Open Graph  Facebook, WhatsApp, LinkedIn, TikTok, Slack, Discord,
          Telegram, iMessage and most other link-preview scrapers. */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={meta.title} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={meta.locale} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content={OG_IMAGE_TYPE} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={pageTitle} />

      {/* Twitter / X card. */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={pageTitle} />

      <link rel="canonical" href={url} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
