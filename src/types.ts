/**
 * Shared domain types for the site data, products and reviews.
 */

export interface Product {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  specs: Record<string, string>;
  options: string[];
  related?: string[];
  /** Photo paths served from /static (e.g. "/products/manual-1.jpg"). First is the lead image. */
  images?: string[];
}

export interface Review {
  stars: number;
  quote: string;
  name: string;
  area: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Owner {
  name: string;
  role: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  founded: number;
  owners: Owner[];
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  address: {
    line1: string;
    line2: string;
    full: string;
    mapHref: string;
    mapEmbedSrc: string;
  };
  hours: string;
  social: {
    instagram: string;
    facebook: string;
  };
  stats: Stat[];
  nav: NavItem[];
}
