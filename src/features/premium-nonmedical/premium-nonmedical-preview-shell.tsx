/**
 * Non-medical original. Photoshop file for this page only.
 * Desktop Figma `17055:9820`. Mobile hero `371:6442`.
 * Medical folders must not import this folder.
 */
import { PremiumNonmedicalComes } from "./premium-nonmedical-comes";
import { PremiumNonmedicalPath } from "./premium-nonmedical-path";
import { PremiumNonmedicalIntro } from "./premium-nonmedical-intro";
import { PremiumNonmedicalHero } from "./premium-nonmedical-hero";
import { PremiumNonmedicalWhy } from "./premium-nonmedical-why";
import "./premium-nonmedical-preview-shell.css";

type PremiumNonmedicalPreviewShellProps = {
  /** Live route is not wired. Preview only until the owner names a cutover. */
  live?: boolean;
};

export function PremiumNonmedicalPreviewShell({
  live = false
}: PremiumNonmedicalPreviewShellProps) {
  return (
    <div
      className="premium-nonmedical-preview-shell"
      data-pgs-module="premium-nonmedical-preview"
      data-premium-family="nonmedical"
      data-figma-desktop="17055:9820"
      data-figma-mobile="371:6442"
      data-shell-gate="n0"
      data-block-gate="n6"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="premium-nonmedical-preview-shell__body">
        <div className="premium-nonmedical-preview-shell__univ-gap" aria-hidden="true" />
        <PremiumNonmedicalHero />
        <PremiumNonmedicalWhy />
        <PremiumNonmedicalComes />
        <PremiumNonmedicalPath />
        <PremiumNonmedicalIntro />
      </div>
    </div>
  );
}
