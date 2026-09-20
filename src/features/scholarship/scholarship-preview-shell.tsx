/**
 * Family — public Scholarship body (#purpleScholarships).
 * Desktop Figma `17041:18349` · Mobile `323:3396`.
 * No black side-test banner — body starts at closed toggle (shell margin-top clamp).
 */
import { ScholarshipBatch } from "./scholarship-batch";
import { ScholarshipFaq } from "./scholarship-faq";
import { ScholarshipHero } from "./scholarship-hero";
import { ScholarshipIntro } from "./scholarship-intro";
import { ScholarshipPlan } from "./scholarship-plan";
import { ScholarshipScenarios } from "./scholarship-scenarios";
import { ScholarshipSteps } from "./scholarship-steps";
import "./scholarship-preview-shell.css";

type ScholarshipPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. */
  live?: boolean;
};

export function ScholarshipPreviewShell({
  live = false
}: ScholarshipPreviewShellProps) {
  return (
    <div
      className="scholarship-preview-shell"
      data-pgs-module="scholarship-preview"
      data-scholarship-family="public"
      data-figma-desktop="17041:18349"
      data-figma-mobile="323:3396"
      data-shell-gate="p0"
      data-block-gate="sm"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="scholarship-preview-shell__body">
        <div
          className="scholarship-preview-shell__univ-gap"
          aria-hidden="true"
        />
        <ScholarshipHero />
        <ScholarshipIntro />
        <ScholarshipScenarios />
        <ScholarshipPlan />
        <ScholarshipSteps />
        <ScholarshipFaq />
        <ScholarshipBatch />
      </div>
    </div>
  );
}
