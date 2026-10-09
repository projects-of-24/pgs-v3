/**
 * Uni Tie-up intro lead — UT1 (top-down first body block).
 * Desk text `17067:11098` · Mob `524:6649`.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob 14px
 * ISSUE: below PGS type floor
 * PGS IMPLEMENTATION: mob ≥16px; layout/width stay Figma
 */
import { UNI_TIEUP_INTRO } from "./content";
import "./uni-tieup-intro.css";

export function UniTieupIntro() {
  return (
    <section
      className="uni-tieup-intro"
      data-pgs-module="uni-tieup-intro"
      data-block-gate="ut1"
      data-figma-desktop="17067:11098"
      data-figma-mobile="524:6649"
      aria-label="University partnerships introduction"
    >
      <p className="uni-tieup-intro__lead">{UNI_TIEUP_INTRO.lead}</p>
    </section>
  );
}
