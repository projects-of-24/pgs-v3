/**
 * #premiumNonMedical support hub — N17.
 * Desktop `17056:21438` · phone `371:5378`.
 * Page-owned. Do not import shared support-hub.
 * Call and email are real links. Email spelling locked (not Figma typo).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: phone blurb / hub label ~14–15
 * ISSUE: below this page’s Roboto band
 * PGS IMPLEMENTATION: those sit at 16.
 */
import { PREMIUM_NONMEDICAL_SUPPORT_HUB } from "./content";
import "./premium-nonmedical-support-hub.css";

export function PremiumNonmedicalSupportHub() {
  const c = PREMIUM_NONMEDICAL_SUPPORT_HUB;

  return (
    <section
      className="premium-nonmedical-support-hub"
      data-pgs-module="premium-nonmedical-support-hub"
      data-block-gate="n17"
      data-figma-desktop="17056:21438"
      data-figma-mobile="371:5378"
      aria-labelledby="premium-nonmedical-support-hub-title"
    >
      <div className="premium-nonmedical-support-hub__row">
        <div className="premium-nonmedical-support-hub__brand-col">
          <h2 className="premium-nonmedical-support-hub__brand" id="premium-nonmedical-support-hub-title">
            {c.brand}
          </h2>
          <p className="premium-nonmedical-support-hub__label">{c.hubLabel}</p>
        </div>
        <div className="premium-nonmedical-support-hub__channels">
          <div className="premium-nonmedical-support-hub__line">
            <p className="premium-nonmedical-support-hub__badge">{c.callLabel}</p>
            <a className="premium-nonmedical-support-hub__link" href={c.phoneHref}>
              <img src={c.phoneIconSrc} alt="" width={34} height={34} />
              <span>{c.phoneDisplay}</span>
            </a>
          </div>
          <div className="premium-nonmedical-support-hub__line">
            <p className="premium-nonmedical-support-hub__badge">{c.emailLabel}</p>
            <a className="premium-nonmedical-support-hub__link" href={c.emailHref}>
              <img src={c.phoneIconSrc} alt="" width={34} height={34} />
              <span>{c.emailDisplay}</span>
            </a>
          </div>
        </div>
        <p className="premium-nonmedical-support-hub__blurb">{c.blurb}</p>
      </div>
    </section>
  );
}
