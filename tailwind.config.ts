/**
 * Tailwind theme mirrors the design tokens in src/styles/tokens.css.
 * Values point at the CSS variables so tokens.css stays the single source of
 * truth (it's also referenced by inline `style={{ color: "var(--steel)" }}`).
 * The spacing scale (--s-1..--s-14: 4/8/12/16/20/24/32/40/56px) lines up 1:1
 * with Tailwind's default numeric spacing, so p-6, gap-4, etc. are used directly.
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./gatsby-ssr.tsx"],
  theme: {
    extend: {
      colors: {
        forge: "var(--forge)",
        molten: "var(--molten)",
        graphite: "var(--graphite)",
        steel: "var(--steel)",
        iron: "var(--iron)",
        bone: "var(--bone)",
        card: "var(--card)",
        line: "var(--line)",
      },
      fontFamily: {
        display: "var(--font-display)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        soft: "var(--shadow-soft)",
      },
      maxWidth: {
        site: "var(--maxw)",
      },
    },
  },
  plugins: [],
};

export default config;
