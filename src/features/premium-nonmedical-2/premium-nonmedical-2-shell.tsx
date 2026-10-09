/**
 * #premiumNonMedical lab-2 shell.
 * Formula: empty chrome → one block at a time.
 * Exists → import React · iPad layout from Figma `1390:9172`.
 * Missing → build from Figma.
 * Live `/purplenonmedical` untouched.
 * B8 Dashboard = import QC’d USMLE dashboard (`1393:10773` twin).
 * B11 Enroll = shared card · Figma `1395:10868` desk.
 * B12 Questions = shared USMLE U28 module.
 * B13–B16 = import existing FAQ / Outro / Hub / Picks (N15–N18).
 */
import { PremiumNonmedicalHero } from "../premium-nonmedical/premium-nonmedical-hero";
import { PremiumNonmedicalWhy } from "../premium-nonmedical/premium-nonmedical-why";
import { PremiumNonmedicalComes } from "../premium-nonmedical/premium-nonmedical-comes";
import { PremiumNonmedicalPath } from "../premium-nonmedical/premium-nonmedical-path";
import { PremiumNonmedicalIntro } from "../premium-nonmedical/premium-nonmedical-intro";
import { PremiumNonmedicalExplain } from "../premium-nonmedical/premium-nonmedical-explain";
import { PremiumNonmedicalGuide } from "../premium-nonmedical/premium-nonmedical-guide";
import { PremiumUsmleDashboard } from "../premium-usmle/premium-usmle-dashboard";
import { PremiumNonmedicalAim } from "../premium-nonmedical/premium-nonmedical-aim";
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import { PremiumEnroll } from "../shared/premium-enroll/premium-enroll";
import { PREMIUM_ENROLL_CARD } from "../shared/premium-enroll/content";
import { PremiumQuestions } from "../shared/premium-questions/premium-questions";
import { PremiumNonmedicalFaq } from "../premium-nonmedical/premium-nonmedical-faq";
import { PremiumNonmedicalOutro } from "../premium-nonmedical/premium-nonmedical-outro";
import { PremiumNonmedicalSupportHub } from "../premium-nonmedical/premium-nonmedical-support-hub";
import { PgsPicks, type PgsPicksCard } from "../shared/pgs-picks/pgs-picks";
import "./premium-nonmedical-2-shell.css";

type PremiumNonmedical2ShellProps = {
  picks?: PgsPicksCard[];
};

export function PremiumNonmedical2Shell({ picks = [] }: PremiumNonmedical2ShellProps) {
  return (
    <div
      className="premium-nonmedical-2-shell"
      data-pgs-module="premium-nonmedical-2"
      data-premium-family="nonmedical"
      data-figma-ipad-frame="1390:9172"
      data-shell-gate="b16"
      data-block-gate="picks"
      data-figma-dashboard="1393:10773"
      data-figma-enroll="1395:10868"
      data-figma-questions="usmle-u28"
      data-cutover="preview"
    >
      <div className="premium-nonmedical-2-shell__body">
        <div className="premium-nonmedical-2-shell__univ-gap" aria-hidden="true" />
        {/* B1–B12 frozen. B13–B16 FAQ → Outro → Hub → Picks */}
        <PremiumNonmedicalHero />
        <PremiumNonmedicalWhy />
        <PremiumNonmedicalComes />
        <PremiumNonmedicalPath />
        <PremiumNonmedicalIntro />
        <PremiumNonmedicalExplain />
        <PremiumNonmedicalGuide />
        <PremiumUsmleDashboard />
        <PremiumNonmedicalAim />
        <PremiumHighlights />
        <PremiumEnroll content={PREMIUM_ENROLL_CARD} />
        <PremiumQuestions />
        <PremiumNonmedicalFaq />
        <PremiumNonmedicalOutro />
        <PremiumNonmedicalSupportHub />
        <PgsPicks courses={picks} />
      </div>
    </div>
  );
}
