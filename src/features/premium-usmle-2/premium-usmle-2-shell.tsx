/**
 * #premiumUSMLE lab-2 shell.
 * Gates: … · sessions · forms · prep · conference (U18–U20)
 * Figma onwards: cas-v6 mobile frame 1352-8063. Next block only after owner GO AHEAD.
 * Lab-2 spacing overrides = iPad only; do not touch desk >1366 or phone ≤600.
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
import "./premium-usmle-2-shell.css";

export function PremiumUsmle2Shell() {
  return (
    <div
      className="premium-usmle-2-shell"
      data-pgs-module="premium-usmle-2"
      data-premium-family="medical"
      data-premium-track="usmle"
      data-figma-desktop="17055:12362"
      data-figma-mobile="433:4374"
      data-figma-ipad-frame="1352:8063"
      data-shell-gate="g18"
      data-block-gate="u20"
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
      </div>
    </div>
  );
}
