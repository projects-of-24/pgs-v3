/**
 * #premiumNonMedical why — N2.
 * Desktop `17055:10590` · phone `375:4118`.
 * Owned CSS. iPad keeps the desktop column.
 */
import { PREMIUM_NONMEDICAL_WHY } from "./content";
import "./premium-nonmedical-why.css";

export function PremiumNonmedicalWhy() {
  const c = PREMIUM_NONMEDICAL_WHY;

  return (
    <section
      className="premium-nonmedical-why"
      data-pgs-module="premium-nonmedical-why"
      data-block-gate="n2"
      aria-labelledby="premium-nonmedical-why-title"
    >
      <div className="premium-nonmedical-why__inner">
        <h2 id="premium-nonmedical-why-title" className="premium-nonmedical-why__title">
          <span className="premium-nonmedical-why__title-line">{c.titleLine1}</span>
          <span className="premium-nonmedical-why__title-line">{c.titleLine2}</span>
        </h2>
        <div className="premium-nonmedical-why__copy">
          <p className="premium-nonmedical-why__lead">{c.lead}</p>
          <p className="premium-nonmedical-why__para">
            <span className="premium-nonmedical-why__light">{c.loops}</span>
            {c.confusing}
          </p>
          <p className="premium-nonmedical-why__para premium-nonmedical-why__light">{c.miss}</p>
          <p className="premium-nonmedical-why__para">
            {c.stepsIn}
            <span className="premium-nonmedical-why__light">{c.details}</span>
            {c.standOut}
          </p>
        </div>
      </div>
    </section>
  );
}
