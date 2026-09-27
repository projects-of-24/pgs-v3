/**
 * Error 404 body copy — Figma desk `18153:10870` · mob `1285:7640`.
 * Live CMS slots later; fixtures match Figma for preview QC.
 */

export const error404Content = {
  heading: "That didn’t load!",
  lineBroken: "Link’s broken.",
  lineMissing: "Can’t seem to find that page.",
  /** Visible CTA label inside [brackets] */
  homeCta: "Back to #PGS home",
  homeHref: "/" as const,
  dinoSrc: "/assets/img/error-404/dino.svg",
  dinoAlt: "" as const
} as const;

export type Error404Content = typeof error404Content;
