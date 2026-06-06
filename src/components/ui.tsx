import * as React from "react";
import { Link } from "gatsby";
import site from "../data/site";
import type { Product, Review, Stat } from "../types";

interface PlaceholderProps {
  label?: string;
  height?: number;
  shutter?: boolean;
  style?: React.CSSProperties;
}

/* Striped placeholder standing in for a real photo. Swap for <img>/GatsbyImage
   once real photos exist. `label` describes what belongs here. */
export function Placeholder({
  label,
  height = 120,
  shutter = false,
  style,
}: PlaceholderProps) {
  return (
    <div
      className={`ph${shutter ? " ph--shutter" : ""}`}
      style={{ height, ...style }}
    >
      {label && !shutter && <span className="ph__tag">{label}</span>}
    </div>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="review__stars" aria-label={`${count} star rating`}>
      {"★".repeat(count)}
    </div>
  );
}

export function SectionTitle({
  kicker,
  title,
}: {
  kicker?: string;
  title?: string;
}) {
  return (
    <>
      {kicker && <div className="sec-kicker">{kicker}</div>}
      {title && <h2 className="sec-title">{title}</h2>}
    </>
  );
}

export function StatBar({ stats = site.stats }: { stats?: Stat[] }) {
  return (
    <div className="statbar">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <span className="stat__value">{s.value}</span>
          <span className="stat__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.slug}/`} className="pcard">
      <Placeholder label={product.category.toLowerCase()} height={120} />
      <div className="pcard__body">
        <div className="pcard__title">{product.name}</div>
        <div className="pcard__summary">{product.summary}</div>
        <span className="pcard__link">View details →</span>
      </div>
    </Link>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="review">
      <Stars count={review.stars} />
      <p className="review__quote">{review.quote}</p>
      <div className="review__name"> {review.area}</div>
    </div>
  );
}

export function CtaBand({
  title,
  cta = "☎ " + site.phoneDisplay,
}: {
  title: string;
  cta?: string;
}) {
  return (
    <div className="ctaband">
      <h2 className="h2">{title}</h2>
      <a className="btn btn--amber" href={site.phoneHref}>
        {cta}
      </a>
    </div>
  );
}
