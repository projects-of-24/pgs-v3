/**
 * Family — public explore Countries hub body.
 * Desktop Figma `17056:19508` · Mobile `466:7315`.
 * No black side-test banner — body starts at closed toggle (shell margin-top clamp).
 * Blocks land gate-by-gate top-down (E1 → … → E4 → E5–E7 shared modules).
 */
import {
  ExploreCountriesBento,
  ExploreCountriesBentoSecondary
} from "./explore-countries-bento";
import { ExploreCountriesHero } from "./explore-countries-hero";
import { ExploreCountriesSwitcher } from "./explore-countries-switcher";
import { ExploreCountriesSwitcherSecondary } from "./explore-countries-switcher-secondary";
import { ExploreCountriesUniv } from "./explore-countries-univ";
import { PgsPicks, type PgsPicksCard } from "@/features/shared/pgs-picks/pgs-picks";
import { PremiumExpense } from "@/features/shared/premium-expense/premium-expense";
import { SupportHub } from "@/features/shared/support-hub/support-hub";
import "./explore-countries-preview-shell.css";
import "./explore-countries-motion.css";
import "./explore-countries-spacing.css";

type ExploreCountriesPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. */
  live?: boolean;
  /** Published courses opted into CMS surface `pgs_picks` (fixture until wired). */
  picks?: PgsPicksCard[];
};

export function ExploreCountriesPreviewShell({
  live = false,
  picks = []
}: ExploreCountriesPreviewShellProps) {
  return (
    <div
      className="explore-countries-preview-shell"
      data-pgs-module="explore-countries-preview"
      data-explore-countries-family="public"
      data-figma-desktop="17056:19508"
      data-figma-mobile="466:7315"
      data-shell-gate="p0"
      data-block-gate="e7"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="explore-countries-preview-shell__body">
        <div
          className="explore-countries-preview-shell__univ-gap"
          aria-hidden="true"
        />
        <ExploreCountriesHero />
        <ExploreCountriesSwitcher />
        <ExploreCountriesBento />
        <ExploreCountriesSwitcherSecondary />
        <ExploreCountriesBentoSecondary />
        <ExploreCountriesUniv />
        <PremiumExpense />
        <SupportHub />
        <PgsPicks courses={picks} />
      </div>
    </div>
  );
}
