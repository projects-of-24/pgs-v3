/**
 * #premiumPLAB lab-2 shell — copy of USMLE lab-2 with PLAB identity modules.
 * Gate 2a (2026-10-03): preview QC before live cutover.
 * QC lab: /preview/purpleplab-2 · Live: /purpleplab (Gate 2b cutover 2026-10-03).
 */
import { PremiumPlabHero } from "../premium-plab/premium-plab-hero";
import { PremiumPlabWhy } from "../premium-plab/premium-plab-why";
import { PremiumPlabComes } from "../premium-plab/premium-plab-comes";
import { PremiumPlabPath } from "../premium-plab/premium-plab-path";
import { PremiumPlabTrack } from "../premium-plab/premium-plab-track";
import { PremiumPlabNeeds } from "../premium-plab/premium-plab-needs";
import { PremiumPlabCompete } from "../premium-plab/premium-plab-compete";
import { PremiumPlabStudent } from "../premium-plab/premium-plab-student";
import { PremiumPlabKick } from "../premium-plab/premium-plab-kick";
import { PremiumPlabKnow } from "../premium-plab/premium-plab-know";
import { PremiumPlabGuide } from "../premium-plab/premium-plab-guide";
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import { PremiumExpense } from "../shared/premium-expense/premium-expense";
import { PremiumPlabDashboard } from "../premium-plab/premium-plab-dashboard";
import { PremiumEnroll } from "../shared/premium-enroll/premium-enroll";
import { PREMIUM_ENROLL_CARD } from "../shared/premium-enroll/content";
import { PremiumQuestions } from "../shared/premium-questions/premium-questions";
import { PremiumFaq } from "../shared/premium-faq/premium-faq";
import { OutroCta } from "../shared/outro-cta/outro-cta";
import { SupportHub } from "../shared/support-hub/support-hub";
import { PgsPicks, type PgsPicksCard } from "../shared/pgs-picks/pgs-picks";
import "./premium-plab-2-shell.css";

type PremiumPlab2ShellProps = {
  /** Live route — same body as lab-2; marks `data-cutover=LIVE`. */
  live?: boolean;
  picks?: PgsPicksCard[];
};

export function PremiumPlab2Shell({ live = false, picks = [] }: PremiumPlab2ShellProps) {
  return (
    <div
      className="premium-plab-2-shell"
      data-pgs-module="premium-plab-2"
      data-premium-family="medical"
      data-premium-track="plab"
      data-figma-desktop="17055:15451"
      data-figma-mobile="466:4741"
      data-figma-ipad-frame="1352:8063"
      data-shell-gate="g30"
      data-block-gate="u32"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="premium-plab-2-shell__body">
        <div className="premium-plab-2-shell__univ-gap" aria-hidden="true" />
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
        <PremiumEnroll content={PREMIUM_ENROLL_CARD} />
        <PremiumQuestions />
        <PremiumFaq />
        <OutroCta />
        <SupportHub />
        <PgsPicks courses={picks} />
      </div>
    </div>
  );
}
