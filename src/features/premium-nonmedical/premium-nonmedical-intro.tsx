/**
 * #premiumNonMedical intro — N5.
 * Grey tab shape matches the medical pathway sheet. Copy, sizes, and gaps are this Figma.
 * Desktop `17055:10738` + intro of `17055:10741`. Phone `379:4169`.
 * Button is visual only. Bento mosaic sits in the same grey panel.
 */
import { PREMIUM_NONMEDICAL_INTRO } from "./content";
import { PremiumNonmedicalNeeds } from "./premium-nonmedical-needs";
import "./premium-nonmedical-intro.css";

export function PremiumNonmedicalIntro() {
  const c = PREMIUM_NONMEDICAL_INTRO;

  return (
    <section
      className="premium-nonmedical-intro"
      data-pgs-module="premium-nonmedical-intro"
      data-block-gate="n5"
      aria-labelledby="premium-nonmedical-intro-title"
    >
      <div className="premium-nonmedical-intro__panel">
        <p className="premium-nonmedical-intro__brand">
          <span className="premium-nonmedical-intro__brand-name">{c.brand}</span>
          <span className="premium-nonmedical-intro__brand-family">{c.family}</span>
        </p>
        <div className="premium-nonmedical-intro__copy">
          <h2 id="premium-nonmedical-intro-title" className="premium-nonmedical-intro__headline">
            {c.headline}
          </h2>
          <p className="premium-nonmedical-intro__ticking">{c.ticking}</p>
          <p className="premium-nonmedical-intro__move">{c.move}</p>
          <p className="premium-nonmedical-intro__news">{c.goodNews}</p>
        </div>
        <button type="button" className="premium-nonmedical-intro__cta">
          {c.ctaLabel}
        </button>
        <PremiumNonmedicalNeeds />
      </div>
    </section>
  );
}
