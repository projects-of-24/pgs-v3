/**
 * #premiumUSMLE lab-2 shell.
 * Gates: … · FAQ (U29) · Outro (U30) · Hub (U31) · Picks (U32)
 * Figma onwards: cas-v6 mobile frame 1352-8063. Next block only after owner GO AHEAD.
 * Bands: desk >1366 + phone ≤600 gap rhythm from lab-1; iPad 601–1366 = lab-2 QC.
 * Single cutover QC surface: /preview/purpleusmle-2
 */
import { PremiumUsmleHero } from "../premium-usmle/premium-usmle-hero";
import { PremiumUsmleWhy } from "../premium-usmle/premium-usmle-why";
import { PremiumUsmleComes } from "../premium-usmle/premium-usmle-comes";
import { PremiumUsmlePath } from "../premium-usmle/premium-usmle-path";
import { PremiumUsmleTrack } from "../premium-usmle/premium-usmle-track";
import { PremiumUsmleNeeds } from "../premium-usmle/premium-usmle-needs";
import { PremiumUsmleCompete } from "../premium-usmle/premium-usmle-compete";
import { PremiumUsmleStudent } from "../premium-usmle/premium-usmle-student";
import { PremiumUsmleKick } from "../premium-usmle/premium-usmle-kick";
import { PremiumUsmleKnow } from "../premium-usmle/premium-usmle-know";
import { PremiumUsmleGuide } from "../premium-usmle/premium-usmle-guide";
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import { PremiumExpense } from "../shared/premium-expense/premium-expense";
import { PremiumUsmleDashboard } from "../premium-usmle/premium-usmle-dashboard";
import { PremiumEnroll } from "../shared/premium-enroll/premium-enroll";
import { PREMIUM_ENROLL_CARD } from "../shared/premium-enroll/content";
import { PremiumQuestions } from "../shared/premium-questions/premium-questions";
import { PremiumFaq } from "../shared/premium-faq/premium-faq";
import { OutroCta } from "../shared/outro-cta/outro-cta";
import { SupportHub } from "../shared/support-hub/support-hub";
import { PgsPicks, type PgsPicksCard } from "../shared/pgs-picks/pgs-picks";
import "./premium-usmle-2-shell.css";

type PremiumUsmle2ShellProps = {
  picks?: PgsPicksCard[];
};

export function PremiumUsmle2Shell({ picks = [] }: PremiumUsmle2ShellProps) {
  return (
    <div
      className="premium-usmle-2-shell"
      data-pgs-module="premium-usmle-2"
      data-premium-family="medical"
      data-premium-track="usmle"
      data-figma-desktop="17055:12362"
      data-figma-mobile="433:4374"
      data-figma-ipad-frame="1352:8063"
      data-shell-gate="g30"
      data-block-gate="u32"
      data-cutover="preview"
    >
      <div className="premium-usmle-2-shell__body">
        <div className="premium-usmle-2-shell__univ-gap" aria-hidden="true" />
        <PremiumUsmleHero />
        <PremiumUsmleWhy />
        <PremiumUsmleComes />
        <PremiumUsmlePath />
        <div className="premium-usmle-pathway">
          <div className="premium-usmle-pathway__sheet">
            <PremiumUsmleTrack />
            <PremiumUsmleNeeds />
          </div>
          <PremiumUsmleCompete />
        </div>
        <PremiumUsmleStudent />
        <PremiumUsmleKick />
        <PremiumUsmleKnow />
        <PremiumUsmleGuide />
        <PremiumHighlights />
        <PremiumExpense />
        <PremiumUsmleDashboard />
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
