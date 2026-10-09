/**
 * USMLE original. Photoshop file for this page only.
 * Desktop Figma `17055:12362` · Mobile `433:4374`.
 * PLAB and AMC must not import this folder. Shared blocks are still imported.
 * iPad hero is a saved copy of the phone card, not a live ×1.4.
 */
import { PremiumEnroll } from "../shared/premium-enroll/premium-enroll";
import { PREMIUM_ENROLL_CARD } from "../shared/premium-enroll/content";
import { OutroCta } from "../shared/outro-cta/outro-cta";
import { PgsPicks, type PgsPicksCard } from "../shared/pgs-picks/pgs-picks";
import { SupportHub } from "../shared/support-hub/support-hub";
import { PremiumFaq } from "../shared/premium-faq/premium-faq";
import { PremiumQuestions } from "../shared/premium-questions/premium-questions";
import { PremiumExpense } from "../shared/premium-expense/premium-expense";
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import { PremiumUsmleDashboard } from "./premium-usmle-dashboard";
import { PremiumUsmleCompete } from "./premium-usmle-compete";
import { PremiumUsmleGuide } from "./premium-usmle-guide";
import { PremiumUsmleKick } from "./premium-usmle-kick";
import { PremiumUsmleKnow } from "./premium-usmle-know";
import { PremiumUsmleStudent } from "./premium-usmle-student";
import { PremiumUsmleHero } from "./premium-usmle-hero";
import { PremiumUsmleComes } from "./premium-usmle-comes";
import { PremiumUsmlePath } from "./premium-usmle-path";
import { PremiumUsmleNeeds } from "./premium-usmle-needs";
import { PremiumUsmleTrack } from "./premium-usmle-track";
import { PremiumUsmleWhy } from "./premium-usmle-why";
import "./premium-usmle-preview-shell.css";

type PremiumUsmlePreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. Not used on P0. */
  live?: boolean;
  /** Published courses already opted into CMS surface `pgs_picks`. */
  picks?: PgsPicksCard[];
};

export function PremiumUsmlePreviewShell({
  live = false,
  picks = []
}: PremiumUsmlePreviewShellProps) {
  return (
    <div
      className="premium-usmle-preview-shell"
      data-pgs-module="premium-usmle-preview"
      data-premium-family="medical"
      data-premium-track="usmle"
      data-figma-desktop="17055:12362"
      data-figma-mobile="433:4374"
      data-shell-gate="p0"
      data-block-gate="u32"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="premium-usmle-preview-shell__body">
        <div className="premium-usmle-preview-shell__univ-gap" aria-hidden="true" />
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
