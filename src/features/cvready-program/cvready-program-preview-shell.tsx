/**
 * CV Ready Program (#cvREADy programs) shell — chrome + CR1–CR12 + CR-OPEN.
 * Desktop Figma `19050:11977` · Mobile `19055:12530` (was `1312:7698`).
 * NEVER black side-test banner — pull-up to closed #toggleBtn.
 * **LOCKED** + **CUTOVER DONE** 2026-09-24 — live `/cvreadyprogram` purified.
 * Hostinger `cvReadyProgramHtml` archive kept, not served.
 * Video frame: no stroke. Filter/Sort card: 25% black stroke.
 * Owner order: Discover (CR6d) above #purpleSelected (CR5).
 * Free #studyJam (CR9) removed from shell — owner delete 2026-09-24.
 * Ignore Figma-embedded course faces; use locked face bank.
 */
import { CvreadyProgramBento } from "./cvready-program-bento";
import { CvreadyProgramByTarget } from "./cvready-program-by-target";
import { CvreadyProgramDiscover } from "./cvready-program-discover";
import { CvreadyProgramFeatured } from "./cvready-program-featured";
import { CvreadyProgramFilter } from "./cvready-program-filter";
import { CvreadyProgramHero } from "./cvready-program-hero";
import { CvreadyProgramHowto } from "./cvready-program-howto";
import { CvreadyProgramOutro } from "./cvready-program-outro";
import { CvreadyProgramPartners } from "./cvready-program-partners";
import { CvreadyProgramPresets } from "./cvready-program-presets";
import { CvreadyProgramSupportHub } from "./cvready-program-support-hub";
import { CvreadyProgramVideo } from "./cvready-program-video";
import "./cvready-program-preview-shell.css";

type CvreadyProgramPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. */
  live?: boolean;
};

export function CvreadyProgramPreviewShell({
  live = false
}: CvreadyProgramPreviewShellProps) {
  return (
    <div
      className="cvready-program-preview-shell"
      data-pgs-module="cvready-program-preview"
      data-cvready-program-family="public"
      data-figma-desktop="19050:11977"
      data-figma-mobile="19055:12530"
      data-shell-gate="p0"
      data-block-gate="cr-open"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="cvready-program-preview-shell__body">
        <div
          className="cvready-program-preview-shell__univ-gap"
          aria-hidden="true"
        />
        <CvreadyProgramVideo />
        <CvreadyProgramHero />
        <CvreadyProgramFilter variant="standalone" />
        <CvreadyProgramPresets />
        <CvreadyProgramPartners />
        <CvreadyProgramDiscover />
        <CvreadyProgramFeatured />
        <CvreadyProgramBento />
        <CvreadyProgramByTarget />
        <CvreadyProgramHowto />
        <CvreadyProgramOutro />
        <CvreadyProgramSupportHub />
      </div>
    </div>
  );
}
