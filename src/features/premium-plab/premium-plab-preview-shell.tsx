/**
 * PLAB file. Duplicated from the USMLE original. Edits here do not change USMLE.
 * Desktop Figma `17055:15451` · Mobile `466:4741`.
 * Shared blocks are still imported. Image files stay in the USMLE asset folder until CMS.
 */
import { PremiumEnroll } from "../shared/premium-enroll/premium-enroll";
import { OutroCta } from "../shared/outro-cta/outro-cta";
import { PgsPicks, type PgsPicksCard } from "../shared/pgs-picks/pgs-picks";
import { SupportHub } from "../shared/support-hub/support-hub";
import { PremiumFaq } from "../shared/premium-faq/premium-faq";
import { PremiumQuestions } from "../shared/premium-questions/premium-questions";
import { PremiumExpense } from "../shared/premium-expense/premium-expense";
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import { PremiumPlabDashboard } from "./premium-plab-dashboard";
import { PremiumPlabCompete } from "./premium-plab-compete";
import { PremiumPlabGuide } from "./premium-plab-guide";
import { PremiumPlabKick } from "./premium-plab-kick";
import { PremiumPlabKnow } from "./premium-plab-know";
import { PremiumPlabStudent } from "./premium-plab-student";
import { PremiumPlabHero } from "./premium-plab-hero";
import { PremiumPlabComes } from "./premium-plab-comes";
import { PremiumPlabPath } from "./premium-plab-path";
import { PremiumPlabNeeds } from "./premium-plab-needs";
import { PremiumPlabTrack } from "./premium-plab-track";
import { PremiumPlabWhy } from "./premium-plab-why";
import "./premium-plab-preview-shell.css";

type PremiumPlabPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. Not used on P0. */
  live?: boolean;
  /** Published courses already opted into CMS surface `pgs_picks`. */
  picks?: PgsPicksCard[];
};

export function PremiumPlabPreviewShell({
  live = false,
  picks = []
}: PremiumPlabPreviewShellProps) {
  return (
    <div
      className="premium-plab-preview-shell"
      data-pgs-module="premium-plab-preview"
      data-premium-family="medical"
      data-premium-track="plab"
      data-figma-desktop="17055:15451"
      data-figma-mobile="466:4741"
      data-shell-gate="p0"
      data-block-gate="u32"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="premium-plab-preview-shell__body">
        <div className="premium-plab-preview-shell__univ-gap" aria-hidden="true" />
        <PremiumPlabHero />
        <PremiumPlabWhy />
        <PremiumPlabComes />
        <PremiumPlabPath />
        <div className="premium-plab-pathway">
          <div className="premium-plab-pathway__sheet">
            <PremiumPlabTrack />
            <PremiumPlabNeeds />
          </div>
          <PremiumPlabCompete />
        </div>
        <PremiumPlabStudent />
        <PremiumPlabKick />
        <PremiumPlabKnow />
        <PremiumPlabGuide />
        <PremiumHighlights />
        <PremiumExpense />
        <PremiumPlabDashboard />
        <PremiumEnroll />
        <PremiumQuestions />
        <PremiumFaq />
        <OutroCta />
        <SupportHub />
        <PgsPicks courses={picks} />
      </div>
    </div>
  );
}
