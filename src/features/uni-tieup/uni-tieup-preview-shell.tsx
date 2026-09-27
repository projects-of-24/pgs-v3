/**
 * Uni Tie-up (#uni tie up) shell — chrome + UT1–UT4.
 * Desktop Figma `17067:11021` · Mobile `524:6634`.
 * NEVER black side-test banner — pull-up to closed #toggleBtn.
 * Blocks top-down: UT1 → UT2 → UT3 → UT4 #higlights.
 * Partner CTA removed from Figma (no mob) — not in this page.
 */
import { UniTieupHero } from "./uni-tieup-hero";
import { UniTieupHighlights } from "./uni-tieup-highlights";
import { UniTieupInitiatives } from "./uni-tieup-initiatives";
import { UniTieupIntro } from "./uni-tieup-intro";
import "./uni-tieup-preview-shell.css";

type UniTieupPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. */
  live?: boolean;
};

export function UniTieupPreviewShell({ live = false }: UniTieupPreviewShellProps) {
  return (
    <div
      className="uni-tieup-preview-shell"
      data-pgs-module="uni-tieup-preview"
      data-uni-tieup-family="public"
      data-figma-desktop="17067:11021"
      data-figma-mobile="524:6634"
      data-shell-gate="p0"
      data-block-gate="ut4"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="uni-tieup-preview-shell__body">
        <div
          className="uni-tieup-preview-shell__univ-gap"
          aria-hidden="true"
        />
        <UniTieupIntro />
        <UniTieupHero />
        <UniTieupInitiatives />
        <UniTieupHighlights />
      </div>
    </div>
  );
}
