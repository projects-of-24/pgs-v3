/**
 * Non-medical original. Photoshop file for this page only.
 * Desktop Figma `17055:9820`. Mobile hero `371:6442`.
 * Medical folders must not import this folder. Shared blocks are still imported.
 */
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import { PgsPicks, type PgsPicksCard } from "../shared/pgs-picks/pgs-picks";
import { PremiumNonmedicalAim } from "./premium-nonmedical-aim";
import { PremiumNonmedicalDashboard } from "./premium-nonmedical-dashboard";
import { PremiumNonmedicalEnroll } from "./premium-nonmedical-enroll";
import { PremiumNonmedicalFaq } from "./premium-nonmedical-faq";
import { PremiumNonmedicalGuide } from "./premium-nonmedical-guide";
import { PremiumNonmedicalExplain } from "./premium-nonmedical-explain";
import { PremiumNonmedicalComes } from "./premium-nonmedical-comes";
import { PremiumNonmedicalPath } from "./premium-nonmedical-path";
import { PremiumNonmedicalIntro } from "./premium-nonmedical-intro";
import { PremiumNonmedicalHero } from "./premium-nonmedical-hero";
import { PremiumNonmedicalOutro } from "./premium-nonmedical-outro";
import { PremiumNonmedicalQuestions } from "./premium-nonmedical-questions";
import { PremiumNonmedicalSupportHub } from "./premium-nonmedical-support-hub";
import { PremiumNonmedicalWhy } from "./premium-nonmedical-why";
import "./premium-nonmedical-preview-shell.css";

type PremiumNonmedicalPreviewShellProps = {
  /** Live `/purplenonmedical` passes `true`. Preview omits or passes `false`. */
  live?: boolean;
  /** Published courses already opted into CMS surface `pgs_picks`. */
  picks?: PgsPicksCard[];
};

export function PremiumNonmedicalPreviewShell({
  live = false,
  picks = []
}: PremiumNonmedicalPreviewShellProps) {
  return (
    <div
      className="premium-nonmedical-preview-shell"
      data-pgs-module="premium-nonmedical-preview"
      data-premium-family="nonmedical"
      data-figma-desktop="17055:9820"
      data-figma-mobile="371:6442"
      data-shell-gate="n0"
      data-block-gate="n18"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="premium-nonmedical-preview-shell__body">
        <div className="premium-nonmedical-preview-shell__univ-gap" aria-hidden="true" />
        <PremiumNonmedicalHero />
        <PremiumNonmedicalWhy />
        <PremiumNonmedicalComes />
        <PremiumNonmedicalPath />
        <PremiumNonmedicalIntro />
        <PremiumNonmedicalExplain />
        <PremiumNonmedicalGuide />
        <PremiumNonmedicalDashboard />
        <PremiumNonmedicalAim />
        <PremiumHighlights />
        <PremiumNonmedicalEnroll />
        <PremiumNonmedicalQuestions />
        <PremiumNonmedicalFaq />
        <PremiumNonmedicalOutro />
        <PremiumNonmedicalSupportHub />
        <PgsPicks courses={picks} />
      </div>
    </div>
  );
}
