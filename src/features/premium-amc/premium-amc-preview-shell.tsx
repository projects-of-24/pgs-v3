/**
 * AMC file. Duplicated from the USMLE original. Edits here do not change USMLE or PLAB.
 * Desktop Figma `17055:16290` · Mobile `466:6494`.
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
import { PremiumAmcDashboard } from "./premium-amc-dashboard";
import { PremiumAmcCompete } from "./premium-amc-compete";
import { PremiumAmcGuide } from "./premium-amc-guide";
import { PremiumAmcKick } from "./premium-amc-kick";
import { PremiumAmcKnow } from "./premium-amc-know";
import { PremiumAmcStudent } from "./premium-amc-student";
import { PremiumAmcHero } from "./premium-amc-hero";
import { PremiumAmcComes } from "./premium-amc-comes";
import { PremiumAmcPath } from "./premium-amc-path";
import { PremiumAmcNeeds } from "./premium-amc-needs";
import { PremiumAmcTrack } from "./premium-amc-track";
import { PremiumAmcWhy } from "./premium-amc-why";
import "./premium-amc-preview-shell.css";

type PremiumAmcPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. Not used on P0. */
  live?: boolean;
  /** Published courses already opted into CMS surface `pgs_picks`. */
  picks?: PgsPicksCard[];
};

export function PremiumAmcPreviewShell({
  live = false,
  picks = []
}: PremiumAmcPreviewShellProps) {
  return (
    <div
      className="premium-amc-preview-shell"
      data-pgs-module="premium-amc-preview"
      data-premium-family="medical"
      data-premium-track="amc"
      data-figma-desktop="17055:16290"
      data-figma-mobile="466:6494"
      data-shell-gate="p0"
      data-block-gate="u32"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="premium-amc-preview-shell__body">
        <div className="premium-amc-preview-shell__univ-gap" aria-hidden="true" />
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
