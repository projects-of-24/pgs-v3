/**
 * #premiumAMC lab-2 shell — copy of USMLE lab-2 with AMC identity modules.
 * Gate 3a (2026-10-03): preview QC before live cutover.
 * QC lab: /preview/purpleamc-2 · Live: /purpleamc (Gate 3b cutover 2026-10-03).
 */
import { PremiumAmcHero } from "../premium-amc/premium-amc-hero";
import { PremiumAmcWhy } from "../premium-amc/premium-amc-why";
import { PremiumAmcComes } from "../premium-amc/premium-amc-comes";
import { PremiumAmcPath } from "../premium-amc/premium-amc-path";
import { PremiumAmcTrack } from "../premium-amc/premium-amc-track";
import { PremiumAmcNeeds } from "../premium-amc/premium-amc-needs";
import { PremiumAmcCompete } from "../premium-amc/premium-amc-compete";
import { PremiumAmcStudent } from "../premium-amc/premium-amc-student";
import { PremiumAmcKick } from "../premium-amc/premium-amc-kick";
import { PremiumAmcKnow } from "../premium-amc/premium-amc-know";
import { PremiumAmcGuide } from "../premium-amc/premium-amc-guide";
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import { PremiumExpense } from "../shared/premium-expense/premium-expense";
import { PremiumAmcDashboard } from "../premium-amc/premium-amc-dashboard";
import { PremiumEnroll } from "../shared/premium-enroll/premium-enroll";
import { PREMIUM_ENROLL_CARD } from "../shared/premium-enroll/content";
import { PremiumQuestions } from "../shared/premium-questions/premium-questions";
import { PremiumFaq } from "../shared/premium-faq/premium-faq";
import { OutroCta } from "../shared/outro-cta/outro-cta";
import { SupportHub } from "../shared/support-hub/support-hub";
import { PgsPicks, type PgsPicksCard } from "../shared/pgs-picks/pgs-picks";
import "./premium-amc-2-shell.css";

type PremiumAmc2ShellProps = {
  /** Live route — same body as lab-2; marks `data-cutover=LIVE`. */
  live?: boolean;
  picks?: PgsPicksCard[];
};

export function PremiumAmc2Shell({ live = false, picks = [] }: PremiumAmc2ShellProps) {
  return (
    <div
      className="premium-amc-2-shell"
      data-pgs-module="premium-amc-2"
      data-premium-family="medical"
      data-premium-track="amc"
      data-figma-desktop="17055:16290"
      data-figma-mobile="466:6494"
      data-figma-ipad-frame="1352:8063"
      data-shell-gate="g30"
      data-block-gate="u32"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="premium-amc-2-shell__body">
        <div className="premium-amc-2-shell__univ-gap" aria-hidden="true" />
        <PremiumAmcHero />
        <PremiumAmcWhy />
        <PremiumAmcComes />
        <PremiumAmcPath />
        <div className="premium-amc-pathway">
          <div className="premium-amc-pathway__sheet">
            <PremiumAmcTrack />
            <PremiumAmcNeeds />
          </div>
          <PremiumAmcCompete />
        </div>
        <PremiumAmcStudent />
        <PremiumAmcKick />
        <PremiumAmcKnow />
        <PremiumAmcGuide />
        <PremiumHighlights />
        <PremiumExpense />
        <PremiumAmcDashboard />
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
