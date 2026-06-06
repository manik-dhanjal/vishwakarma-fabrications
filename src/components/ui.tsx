import * as React from "react";
import { Link } from "gatsby";
import site from "../data/site";
import type { Product, Review, Stat } from "../types";
import { Phone } from "./icons";
import { trackPhoneCall } from "../utils/analytics";

/** Shared button utility strings (kept here so the look stays consistent). */
export const btnAmber =
  "inline-flex items-center justify-center gap-2 font-display font-extrabold text-[15px] px-5 py-[11px] rounded-sm border-2 border-transparent no-underline cursor-pointer transition-colors duration-200 bg-forge text-[#1b1b1b] hover:bg-molten hover:text-white";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 font-display font-bold text-[15px] px-5 py-[11px] rounded-sm border-2 border-line no-underline cursor-pointer transition-colors duration-200 bg-transparent text-graphite hover:border-forge hover:text-molten";

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
  const stripes = shutter
    ? "repeating-linear-gradient(180deg, #dfdbd1 0 9px, #cfcabf 9px 12px)"
    : "repeating-linear-gradient(45deg, #e8e4da, #e8e4da 11px, #f3f0e8 11px, #f3f0e8 22px)";
  return (
    <div
      className="relative flex items-center justify-center border border-line rounded-sm text-[#7a756b] min-h-[80px]"
      style={{ height, background: stripes, ...style }}
    >
      {label && !shutter && (
        <span className="font-mono text-[11px] bg-white border border-line px-[9px] py-[3px] rounded-[5px] text-[#6b665d]">
          {label}
        </span>
      )}
    </div>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div
      className="text-forge tracking-[2px] text-[16px]"
      aria-label={`${count} star rating`}
    >
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
      {kicker && (
        <div className="flex items-center gap-3 mb-2 font-mono text-[12px] uppercase tracking-[0.24em] text-steel before:content-[''] before:w-[26px] before:h-[2px] before:bg-forge">
          {kicker}
        </div>
      )}
      {title && (
        <h2 className="text-[clamp(24px,3vw,30px)] font-extrabold mt-0 mb-6 tracking-[-0.3px]">
          {title}
        </h2>
      )}
    </>
  );
}

export function StatBar({ stats = site.stats }: { stats?: Stat[] }) {
  return (
    <div className="grid grid-cols-4 gap-3 max-[860px]:grid-cols-2">
      {stats.map((s) => (
        <div
          className="bg-card border border-line rounded-md p-4 text-center shadow-soft"
          key={s.label}
        >
          <span className="block text-[30px] font-black tracking-[-0.5px]">
            {s.value}
          </span>
          <span className="text-[13px] text-steel">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}/`}
      className="flex flex-col bg-card border border-line rounded-md overflow-hidden no-underline text-inherit shadow-card transition-[transform,box-shadow] duration-150 hover:-translate-y-[3px] hover:shadow-[0_12px_26px_rgba(30,34,39,0.1)]"
    >
      <Placeholder label={product.category.toLowerCase()} height={120} />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="text-[18px] font-bold">{product.name}</div>
        <div className="text-[14px] text-steel">{product.summary}</div>
        <span className="mt-auto text-molten font-bold text-[14px]">
          View details →
        </span>
      </div>
    </Link>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-card border border-line rounded-md p-5 shadow-soft">
      <Stars count={review.stars} />
      <p className="my-3 text-[15px]">{review.quote}</p>
      <div className="font-mono text-[12px] text-steel"> {review.area}</div>
    </div>
  );
}

export function CtaBand({
  title,
  cta = (
    <>
      {" "}
      <Phone /> {site.phoneDisplay}
    </>
  ),
}: {
  title: string;
  cta?: string | React.ReactNode;
}) {
  return (
    <div className="bg-graphite text-bone rounded-lg px-6 py-10 text-center flex flex-col items-center gap-4">
      <h2 className="text-[clamp(24px,3.4vw,32px)] font-extrabold tracking-[-0.4px] text-white">
        {title}
      </h2>
      <a
        className={btnAmber}
        href={site.phoneHref}
        onClick={() => trackPhoneCall("cta_band")}
      >
        {cta}
      </a>
    </div>
  );
}
