/** Ambient types for relative imports of `scripts/lib/css-fork-scope.mjs`. */

declare module "*css-fork-scope.mjs" {
  export type CssForkFamily = {
    family: string;
    dirPattern: string;
    attr: string;
    slugs: string[];
    rootClass: string;
  };

  export type CssForkAudit = {
    unscoped: string[];
    foreign: { selector: string; slugs: string[] }[];
    globalEl: string[];
  };

  export const MARK: string;
  export const COUNTRIES_DESTINATION_FAMILY: CssForkFamily;
  export const FAMILIES: CssForkFamily[];
  export const repoRoot: string;

  export function loadPostcss(): typeof import("postcss");
  export function isScopedSelector(
    selector: string,
    family: CssForkFamily,
    slug: string
  ): boolean;
  export function isGlobalElSelector(selector: string): boolean;
  export function foreignSlugsInSelector(
    selector: string,
    family: CssForkFamily,
    slug: string
  ): string[];
  export function scopeSelector(
    selector: string,
    family: CssForkFamily,
    slug: string
  ): string;
  export function auditCss(
    css: string,
    family: CssForkFamily,
    slug: string
  ): CssForkAudit;
  export function scopeCssIncremental(
    css: string,
    family: CssForkFamily,
    slug: string
  ): { css: string; changed: boolean };
  export function walkCssFiles(dir: string, out?: string[]): string[];
  export function familyForkDir(family: CssForkFamily, slug: string): string;
}
