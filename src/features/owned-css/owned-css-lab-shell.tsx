/**
 * Generic owned-CSS lab — empty shell; ?block= shows one fixture.
 * Main CSS (all blocks): pgs-owned-css.css — imported by the preview page only.
 * Not UK-specific. Live pages do not import the barrel until OWN-LINK.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import {
  OWNED_CSS_BLOCKS,
  type OwnedCssBlockId,
} from "./owned-css-blocks";
import "./owned-css-lab.css";

type Props = {
  block?: OwnedCssBlockId | null;
  children?: ReactNode;
};

export function OwnedCssLabShell({ block = null, children = null }: Props) {
  const meta = block
    ? OWNED_CSS_BLOCKS.find((b) => b.id === block)
    : null;

  return (
    <div
      className="owned-css-lab"
      data-pgs-module="owned-css-lab"
      data-cutover="preview"
      data-owned-css-block={block ?? "none"}
    >
      <p className="owned-css-lab__banner">
        <strong>Owned CSS lab</strong> — empty by default.{" "}
        <code>pgs-owned-css.css</code> is the <em>main</em> barrel (all blocks).
        Choosing a block mounts that fixture only for QC. Live pages stay on
        Hostinger until OWN-LINK.
      </p>

      <nav className="owned-css-lab__nav" aria-label="Owned CSS blocks">
        <Link
          href="/preview/owned-css"
          aria-current={block === null ? "page" : undefined}
        >
          empty
        </Link>
        {OWNED_CSS_BLOCKS.map((b) => (
          <Link
            key={b.id}
            href={`/preview/owned-css?block=${b.id}`}
            aria-current={block === b.id ? "page" : undefined}
          >
            {b.id}
          </Link>
        ))}
      </nav>

      <div className="owned-css-lab__stage">
        {children ?? (
          <p className="owned-css-lab__empty">
            Empty stage. Pick a block above (or <code>?block=header</code>).
            New blocks appear here when added to{" "}
            <code>owned-css-blocks.ts</code> + <code>pgs-owned-css.css</code>.
          </p>
        )}
        {meta ? (
          <p className="owned-css-lab__fixture" style={{ marginTop: 12 }}>
            CSS: <code>{meta.cssNote}</code>
          </p>
        ) : null}
      </div>
    </div>
  );
}
