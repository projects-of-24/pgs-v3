/**
 * Empty preview shell for UK owned-CSS conversion.
 * Default: empty stage. ?block= mounts ONE block (that block’s CSS only).
 *
 * Lab: /preview/countriesuk-owned-css
 * Live /countriesuk unchanged.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import "./countries-uk-owned-preview-shell.css";

export const UK_OWNED_CSS_BLOCKS = [
  "hero",
  "intro",
  "tabs",
  "study101",
  "cards",
  "rest",
] as const;

export type UkOwnedCssBlock = (typeof UK_OWNED_CSS_BLOCKS)[number];

type Props = {
  block?: UkOwnedCssBlock | null;
  /** Pre-resolved block UI from the page (dynamic import so CSS stays block-scoped). */
  children?: ReactNode;
};

export function isUkOwnedCssBlock(value: string): value is UkOwnedCssBlock {
  return (UK_OWNED_CSS_BLOCKS as readonly string[]).includes(value);
}

export function CountriesUkOwnedPreviewShell({
  block = null,
  children = null,
}: Props) {
  const active = block && isUkOwnedCssBlock(block) ? block : null;

  return (
    <div
      className="uk-owned-css-lab"
      data-pgs-module="countriesuk-owned-css"
      data-cutover="preview"
      data-uk-owned-block={active ?? "none"}
    >
      <p className="uk-owned-css-lab__banner">
        <strong>UK owned CSS lab</strong> — empty shell by default. Choosing a
        block mounts <em>only that block</em> (fixture + its CSS). Fill{" "}
        <code>owned-css/uk-owned-*.css</code> per pass. Live{" "}
        <code>/countriesuk</code> unchanged.
      </p>

      <nav className="uk-owned-css-lab__nav" aria-label="UK owned CSS blocks">
        <Link
          href="/preview/countriesuk-owned-css"
          aria-current={active === null ? "page" : undefined}
        >
          empty
        </Link>
        {UK_OWNED_CSS_BLOCKS.map((id) => (
          <Link
            key={id}
            href={`/preview/countriesuk-owned-css?block=${id}`}
            aria-current={active === id ? "page" : undefined}
          >
            {id}
          </Link>
        ))}
      </nav>

      <div className="uk-owned-css-lab__stage">
        {children ?? (
          <p className="uk-owned-css-lab__empty">
            Empty stage. Choose a block above (or{" "}
            <code>?block=hero</code>) to pull that block in for QC.
          </p>
        )}
      </div>
    </div>
  );
}
