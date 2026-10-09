/**
 * Registry of owned-CSS conversion blocks for /preview/owned-css.
 * Add a row when a new block CSS file is created and @imported in pgs-owned-css.css.
 */

export const OWNED_CSS_BLOCKS = [
  {
    id: "header",
    label: "Header + drawer",
    cssNote: "shell/public-header.css",
  },
  {
    id: "strip",
    label: "Toggle + strip + univMeet",
    cssNote: "shell/pgs-owned-strip.css",
  },
  {
    id: "footer",
    label: "Shared footer",
    cssNote: "shell/pgs-owned-footer.css",
  },
] as const;

export type OwnedCssBlockId = (typeof OWNED_CSS_BLOCKS)[number]["id"];

export function isOwnedCssBlockId(value: string): value is OwnedCssBlockId {
  return OWNED_CSS_BLOCKS.some((b) => b.id === value);
}
