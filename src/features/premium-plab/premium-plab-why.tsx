/**
 * #premiumUSMLE why — U2.
 * Desktop `17055:14136` · mobile `433:4415`.
 * Owned CSS. iPad keeps this desktop column at a 16px floor.
 */
import { PREMIUM_PLAB_WHY } from "./content";
import "./premium-plab-why.css";

export function PremiumPlabWhy() {
  const c = PREMIUM_PLAB_WHY;

  return (
    <section
      className="premium-plab-why"
      data-pgs-module="premium-plab-why"
      data-block-gate="u2"
      aria-labelledby="premium-plab-why-title"
    >
      <div className="premium-plab-why__inner">
        <h2 id="premium-plab-why-title" className="premium-plab-why__title">
          <span className="premium-plab-why__title-line">{c.titleLine1}</span>
          <span className="premium-plab-why__title-line">{c.titleLine2}</span>
        </h2>
        <div className="premium-plab-why__copy">
          <p className="premium-plab-why__kicker">{c.kicker}</p>
          <p className="premium-plab-why__story">{c.story}</p>
          <p className="premium-plab-why__outside">{c.outside}</p>
          <p className="premium-plab-why__warning">
            {c.warningLead}
            <br />
            {c.warningBody}
          </p>
        </div>
      </div>
    </section>
  );
}
