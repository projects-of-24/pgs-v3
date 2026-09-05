/**
 * PGS breakpoint authority — single place to change the numbers.
 *
 * CSS media queries cannot reliably use `var()` for widths, so:
 * 1. Change numbers HERE first.
 * 2. Mirror the same px in overlay CSS (`legacy-header-breakpoints.css`, `legacy-hello-aspirant.css`, `countries.css`)
 *    and in shared HTML `<style>` when needed.
 * 3. `:root` vars in `pgs-breakpoints.css` are for non-media use (calc, docs, JS).
 *
 * Owner-measured (UK / countries pilot + Figma header 18724:10893 QC).
 * Do not invent new widths without updating this file.
 */
export const PGS_BREAKPOINTS = {
  /**
   * Full desktop header only above this width.
   * ≤ this → Figma tablet header (logo + #feed + bell + login + menu).
   * Owner QC 2026-09-03: raised from 1205 → 1366 (desktop row wraps ~1356).
   */
  headerMobileMax: 1366,
  /** Above this + at/under headerMobileMax → larger logo sizing band (tablet). */
  headerDesktopLogoMin: 981,
  /** Country hero Hostinger-mobile rules through tablet; mobile logo sizing. */
  mobileHandoverMax: 980,
  /**
   * Compact mobile header (no #feed; smaller logo / bell / login / menu).
   * Owner QC 2026-09-03: 600 — tablet+#feed was overlapping below this.
   * Do not reuse for country hero (that stays on hostingerPhoneMax / mobileHandoverMax).
   */
  headerCompactMax: 600,
  /** Country/page phone floor (UK pilot 2026-09-05) — not modular chrome. */
  hostingerPhoneMax: 600
} as const;

export type PgsBreakpointName = keyof typeof PGS_BREAKPOINTS;

/** Media-query helpers for TS / tests / docs (not for CSS-in-JS unless needed). */
export const PGS_MEDIA = {
  headerMobile: `(max-width: ${PGS_BREAKPOINTS.headerMobileMax}px)`,
  headerDesktopLogoOnMobileHeader: `(min-width: ${PGS_BREAKPOINTS.headerDesktopLogoMin}px) and (max-width: ${PGS_BREAKPOINTS.headerMobileMax}px)`,
  headerCompact: `(max-width: ${PGS_BREAKPOINTS.headerCompactMax}px)`,
  mobileHandover: `(max-width: ${PGS_BREAKPOINTS.mobileHandoverMax}px)`,
  hostingerPhone: `(max-width: ${PGS_BREAKPOINTS.hostingerPhoneMax}px)`
} as const;
