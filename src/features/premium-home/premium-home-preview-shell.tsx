/**
 * purplePREMIUM HOME modular body.
 * Desktop Figma `17052:7386` · Mobile `366:4060`.
 * No black side-test banner — body starts at closed toggle (shell margin-top clamp).
 */
import { LearnerWords } from "@/features/shared/learner-words/learner-words";
import { OutroCta } from "@/features/shared/outro-cta/outro-cta";
import { PgsPicks, type PgsPicksCard } from "@/features/shared/pgs-picks/pgs-picks";
import { PremiumExpense } from "@/features/shared/premium-expense/premium-expense";
import { SupportHub } from "@/features/shared/support-hub/support-hub";
import { PremiumHomeAim } from "./premium-home-aim";
import { PremiumHomeDashboard } from "./premium-home-dashboard";
import { PremiumHomeHero } from "./premium-home-hero";
import { PremiumHomePaths } from "./premium-home-paths";
import type { PremiumHomeUnivLogo } from "./get-premium-home-univ-logos";
import { PremiumHomeUniv } from "./premium-home-univ";
import { PremiumHomeVideo } from "./premium-home-video";
import { PremiumHomeWhy } from "./premium-home-why";
import "./premium-home-preview-shell.css";

type PremiumHomePreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. Not used yet. */
  live?: boolean;
  /** H7 partner logos — CMS-ready (fixture until W1 table). */
  univLogos?: readonly PremiumHomeUnivLogo[];
  /** Published courses already opted into CMS surface `pgs_picks`. */
  picks?: PgsPicksCard[];
};

export function PremiumHomePreviewShell({
  live = false,
  univLogos,
  picks = []
}: PremiumHomePreviewShellProps) {
  return (
    <div
      className="premium-home-preview-shell"
      data-pgs-module="premium-home-preview"
      data-premium-family="home"
      data-figma-desktop="17052:7386"
      data-figma-mobile="366:4060"
      data-shell-gate="p0"
      data-block-gate="h12"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="premium-home-preview-shell__body">
        <div className="premium-home-preview-shell__univ-gap" aria-hidden="true" />
        <PremiumHomeHero />
        <PremiumHomeVideo />
        <PremiumHomePaths />
        <PremiumHomeAim />
        <PremiumHomeDashboard />
        <LearnerWords />
        <PremiumHomeUniv logos={univLogos} />
        <PremiumExpense />
        <PremiumHomeWhy />
        <OutroCta />
        <SupportHub />
        <PgsPicks courses={picks} />
      </div>
    </div>
  );
}
