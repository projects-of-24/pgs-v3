/**
 * #premiumUSMLE why — U2.
 * Desktop `17055:14136` · mobile `433:4415`.
 * Owned CSS. iPad keeps this desktop column at a 16px floor.
 */
import { PREMIUM_AMC_WHY } from "./content";
import "./premium-amc-why.css";

export function PremiumAmcWhy() {
  const c = PREMIUM_AMC_WHY;

  return (
    <section
      className="premium-amc-why"
      data-pgs-module="premium-amc-why"
      data-block-gate="u2"
      aria-labelledby="premium-amc-why-title"
    >
      <div className="premium-amc-why__inner">
        <h2 id="premium-amc-why-title" className="premium-amc-why__title">
          <span className="premium-amc-why__title-line">{c.titleLine1}</span>
          <span className="premium-amc-why__title-line">{c.titleLine2}</span>
        </h2>
        <div className="premium-amc-why__copy">
          <p className="premium-amc-why__kicker">{c.kicker}</p>
          <p className="premium-amc-why__story">{c.story}</p>
          <p className="premium-amc-why__outside">{c.outside}</p>
          <p className="premium-amc-why__warning">
            {c.warningLead}
            <br />
            {c.warningBody}
          </p>
        </div>
      </div>
    </section>
  );
}
