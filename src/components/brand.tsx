import * as React from "react";
import { Link } from "gatsby";

interface ShutterMarkProps {
  size?: number;
  block?: string;
  slat?: string;
  rail?: string;
}

/**
 * ShutterMark  the logo mark (abstracted rolling shutter).
 * Recolor for dark backgrounds via the `block`, `slat`, `rail` props.
 */
export function ShutterMark({
  size = 40,
  block = "#1E2227",
  slat = "#E07A2F",
  rail = "#F4F1EA",
}: ShutterMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Vishwakarma Rolling Shutters"
    >
      <rect x="0" y="0" width="48" height="48" rx="10" fill={block} />
      <g fill={slat}>
        <rect x="9" y="13" width="30" height="3.2" rx="1.6" />
        <rect x="9" y="18.5" width="30" height="3.2" rx="1.6" />
        <rect x="9" y="24" width="30" height="3.2" rx="1.6" />
        <rect x="9" y="29.5" width="30" height="3.2" rx="1.6" />
      </g>
      <rect x="9" y="35.5" width="30" height="3.4" rx="1.7" fill={rail} />
    </svg>
  );
}

interface LogoProps {
  variant?: "dark" | "light";
  showSub?: boolean;
  size?: number;
  to?: string;
}

/**
 * Logo lockup  mark + wordmark. `variant="dark"` for dark backgrounds.
 * `showSub` toggles the "Rolling Shutters · Amroha" subline.
 */
export function Logo({
  variant = "dark",
  showSub = true,
  size = 36,
  to = "/",
}: LogoProps) {
  const onDark = variant === "dark";
  const markBlock = onDark ? "#272c32" : "#1e2227";
  return (
    <Link to={to} className="logo" aria-label="Vishwakarma Rolling Shutters  home">
      <ShutterMark
        size={size}
        block={markBlock}
        slat="#E07A2F"
        rail="#F4F1EA"
      />
      <span className="logo__word">
        <span
          className="logo__name"
          style={onDark ? { color: "#F4F1EA" } : undefined}
        >
          VISHWA<b>KARMA</b>
        </span>
        {showSub && <span className="logo__sub">Rolling Shutters · Amroha</span>}
      </span>
    </Link>
  );
}
