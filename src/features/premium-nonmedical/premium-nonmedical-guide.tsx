/**
 * #premiumNonMedical guide — N9.
 * Under the explanation panel. Desktop `17055:10952` · phone `379:4471`.
 * Copy is band-specific. Same shape as medical guide; this page owns the CSS.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: phone badge 12px
 * ISSUE: below the readable floor
 * PGS IMPLEMENTATION: badge sits at 16px.
 */
import { PREMIUM_NONMEDICAL_GUIDE } from "./content";
import "./premium-nonmedical-guide.css";

export function PremiumNonmedicalGuide() {
  const c = PREMIUM_NONMEDICAL_GUIDE;

  return (
    <section className="premium-nonmedical-guide" data-pgs-module="premium-nonmedical-guide" data-block-gate="n9">
      <blockquote className="premium-nonmedical-guide__card">
        <p className="premium-nonmedical-guide__desk">
          <span className="premium-nonmedical-guide__mark" aria-hidden="true">
            “
          </span>
          <span className="premium-nonmedical-guide__words">
            {c.deskLines[0]}
            <br />
            {c.deskLines[1]}
          </span>
          <span className="premium-nonmedical-guide__mark premium-nonmedical-guide__mark--end" aria-hidden="true">
            ”
          </span>
        </p>
        <p className="premium-nonmedical-guide__phone">{c.phoneLine}</p>
      </blockquote>
      <p className="premium-nonmedical-guide__badge">{c.badge}</p>
    </section>
  );
}
