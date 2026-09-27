/**
 * PGS inline icons — V-1 step 2 (2026-09-27).
 *
 * Outlines extracted 1:1 from the Bootstrap Icons font the site loaded via
 * Hostinger's icon.min.css (public/assets/fonts/bootstrap-icons.woff, MIT),
 * so the React chrome no longer needs the icon font or its stylesheet.
 *
 * Renders the same box the icon font did: an <i> wrapper (existing CSS still
 * targets `#toggleBtn.arrow-box i` etc.) holding a 1em × 1em SVG at
 * vertical-align -0.125em, filled with currentColor — identical to `.bi::before`.
 */
import type { CSSProperties } from "react";
import "./pgs-icon.css";

export const PGS_ICON_PATHS = {
  "search": "M11.733 10.347Q12.747 9.013 12.96 7.387Q13.173 5.76 12.587 4.213Q12 2.667 10.72 1.573Q9.44 0.48 7.84 0.133Q6.24 -0.213 4.667 0.267Q3.093 0.747 1.893 1.92Q0.693 3.093 0.24 4.667Q-0.213 6.24 0.133 7.84Q0.48 9.44 1.573 10.72Q2.667 12 4.213 12.587Q5.76 13.173 7.387 12.96Q9.013 12.747 10.347 11.733L14.293 15.733Q14.56 16 14.987 16Q15.413 16 15.707 15.707Q16 15.413 16 14.987Q16 14.56 15.733 14.293ZM12 6.507Q12 8 11.253 9.253Q10.507 10.507 9.253 11.253Q8 12 6.507 12Q5.013 12 3.733 11.253Q2.453 10.507 1.733 9.253Q1.013 8 1.013 6.507Q1.013 5.013 1.733 3.733Q2.453 2.453 3.733 1.733Q5.013 1.013 6.507 1.013Q8 1.013 9.253 1.733Q10.507 2.453 11.253 3.733Q12 5.013 12 6.507Z",
  "arrow-right-circle-fill": "M8 0Q10.187 0 12.027 1.067Q13.867 2.133 14.933 3.973Q16 5.813 16 8Q16 10.187 14.933 12.027Q13.867 13.867 12.027 14.933Q10.187 16 8 16Q5.813 16 3.973 14.933Q2.133 13.867 1.067 12.027Q0 10.187 0 8Q0 5.813 1.067 3.973Q2.133 2.133 3.973 1.067Q5.813 0 8 0ZM4.48 7.52Q4.267 7.52 4.133 7.653Q4 7.787 4 8Q4 8.213 4.133 8.347Q4.267 8.48 4.48 8.48H10.293L8.16 10.667Q8 10.773 8 10.987Q8 11.2 8.133 11.36Q8.267 11.52 8.48 11.52Q8.693 11.52 8.853 11.36L11.84 8.373Q12 8.213 12 8Q12 7.787 11.84 7.627L8.853 4.64Q8.64 4.427 8.373 4.507Q8.107 4.587 8.027 4.88Q7.947 5.173 8.16 5.333L10.293 7.52Z",
  "lock-fill": "M8 1.013Q8.853 1.013 9.44 1.6Q10.027 2.187 10.027 2.987V6.987H6.027V2.987Q6.027 2.187 6.587 1.6Q7.147 1.013 8 1.013ZM10.987 6.987V2.987Q10.987 1.76 10.107 0.88Q9.227 0 8 0Q6.773 0 5.893 0.88Q5.013 1.76 5.013 2.987V6.987Q4.16 6.987 3.573 7.573Q2.987 8.16 2.987 9.013V13.973Q2.987 14.827 3.573 15.413Q4.16 16 5.013 16H10.987Q11.84 16 12.427 15.413Q13.013 14.827 13.013 13.973V9.013Q13.013 8.16 12.427 7.573Q11.84 6.987 10.987 6.987Z",
  "arrow-right-square-fill": "M0 13.973Q0 14.827 0.587 15.413Q1.173 16 1.973 16H14.027Q14.827 16 15.413 15.413Q16 14.827 16 13.973V1.973Q16 1.173 15.413 0.587Q14.827 0 13.973 0H2.027Q1.173 0 0.587 0.587Q0 1.173 0 2.027ZM4.48 7.52H10.293L8.16 5.333Q7.947 5.173 8.027 4.88Q8.107 4.587 8.373 4.507Q8.64 4.427 8.853 4.64L11.84 7.627Q12 7.787 12 8Q12 8.213 11.84 8.373L8.853 11.36Q8.693 11.52 8.48 11.52Q8.267 11.52 8.133 11.36Q8 11.2 8 10.987Q8 10.773 8.16 10.667L10.293 8.48H4.48Q4.267 8.48 4.133 8.347Q4 8.213 4 8Q4 7.787 4.133 7.653Q4.267 7.52 4.48 7.52Z",
} as const;

export type PgsIconName = keyof typeof PGS_ICON_PATHS;

const svgStyle: CSSProperties = { width: "1em", height: "1em", verticalAlign: "-0.125em", display: "inline-block" };

export function PgsIcon({ name, className }: { name: PgsIconName; className?: string }) {
  return (
    <i className={["pgs-icon", `pgs-icon--${name}`, className].filter(Boolean).join(" ")} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" style={svgStyle} focusable="false">
        <path d={PGS_ICON_PATHS[name]} />
      </svg>
    </i>
  );
}
