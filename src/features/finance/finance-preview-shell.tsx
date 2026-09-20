/**
 * Family — public Finance body (#purpleFinance).
 * Desktop Figma `17041:17378` · Mobile `217:5249`.
 * No black side-test banner — body starts at closed toggle (shell margin-top clamp).
 */
import { FinanceFaq } from "./finance-faq";
import { FinanceFunding } from "./finance-funding";
import { FinanceHero } from "./finance-hero";
import { FinanceLogos } from "./finance-logos";
import { FinanceTalk } from "./finance-talk";
import type { FinancePartnerLogo } from "./get-finance-partner-logos";
import "./finance-preview-shell.css";
import "./finance-motion.css";

type FinancePreviewShellProps = {
  /** Live route — same body, no lab chrome. */
  live?: boolean;
  /** Published CMS logos (fixture fallback inside FinanceLogos if empty). */
  partnerLogos?: readonly FinancePartnerLogo[];
};

export function FinancePreviewShell({
  live = false,
  partnerLogos
}: FinancePreviewShellProps) {
  return (
    <div
      className="finance-preview-shell"
      data-pgs-module="finance-preview"
      data-finance-family="public"
      data-figma-desktop="17041:17378"
      data-figma-mobile="217:5249"
      data-shell-gate="p0"
      data-block-gate="f5"
      data-motion-gate="fm"
      data-backend-gate="w1"
      data-visual-lock="locked"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="finance-preview-shell__body">
        <FinanceHero />
        <FinanceLogos logos={partnerLogos} />
        <FinanceFunding />
        <FinanceTalk />
        <FinanceFaq />
      </div>
    </div>
  );
}
