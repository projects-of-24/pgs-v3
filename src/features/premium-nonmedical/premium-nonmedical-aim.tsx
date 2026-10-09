/**
 * #premiumNonMedical aim — N11.
 * Desktop `17055:10910` (Group 267). Phone `379:4719` stacked panel.
 * Visual CTA only — no evaluate destination yet.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk Roboto 28.8 / 22.4 / 19.2 / CTA 14.08 · phone Roboto 14 / CTA 14
 * ISSUE: outside this page’s Roboto band
 * PGS IMPLEMENTATION: headline 22 · body + closer 20 · CTA 20. Bebas stays Figma.
 */
import { PREMIUM_NONMEDICAL_AIM } from "./content";
import "./premium-nonmedical-aim.css";

export function PremiumNonmedicalAim() {
  const c = PREMIUM_NONMEDICAL_AIM;

  return (
    <section
      className="premium-nonmedical-aim"
      data-pgs-module="premium-nonmedical-aim"
      data-block-gate="n11"
      data-figma-desktop="17055:10910"
      data-figma-mobile="379:4719"
      aria-labelledby="premium-nonmedical-aim-headline"
    >
      <div className="premium-nonmedical-aim__panel">
        <div className="premium-nonmedical-aim__copy">
          <h2 id="premium-nonmedical-aim-headline" className="premium-nonmedical-aim__headline">
            {c.headline}
          </h2>
          <p className="premium-nonmedical-aim__body">{c.body}</p>
          <p className="premium-nonmedical-aim__closer">{c.closer}</p>
        </div>

        <aside className="premium-nonmedical-aim__seats" aria-label={c.seatsLabel}>
          <div className="premium-nonmedical-aim__seats-row">
            <img className="premium-nonmedical-aim__clock" src={c.clockSrc} alt="" width={32} height={32} />
            <p className="premium-nonmedical-aim__seats-label">
              <span>We open</span>
              <span>limited slots</span>
              <span>each month</span>
            </p>
          </div>
        </aside>

        <div className="premium-nonmedical-aim__cta">
          <p className="premium-nonmedical-aim__cta-lead">{c.ctaLead}</p>
          <button type="button" className="premium-nonmedical-aim__cta-btn">
            {c.ctaLabel}
          </button>
        </div>

        <div className="premium-nonmedical-aim__visual" aria-hidden="true">
          <div className="premium-nonmedical-aim__green" />
          <div
            className="premium-nonmedical-aim__photo"
            style={{
              WebkitMaskImage: `url("${c.maskSrc}")`,
              maskImage: `url("${c.maskSrc}")`
            }}
          >
            <img src={c.photoSrc} alt="" />
          </div>
          <img className="premium-nonmedical-aim__arches" src={c.archesSrc} alt="" width={58} height={64} />
        </div>
      </div>
    </section>
  );
}
