/**
 * #premiumUSMLE why — U2.
 * Desktop `17055:14136` · mobile `433:4415`.
 * Owned CSS. iPad keeps this desktop column at a 16px floor.
 */
import { PREMIUM_USMLE_WHY } from "./content";
import "./premium-usmle-why.css";

export function PremiumUsmleWhy() {
  const c = PREMIUM_USMLE_WHY;

  return (
    <section
      className="premium-usmle-why"
      data-pgs-module="premium-usmle-why"
      data-block-gate="u2"
      aria-labelledby="premium-usmle-why-title"
    >
      <div className="premium-usmle-why__inner">
        <h2 id="premium-usmle-why-title" className="premium-usmle-why__title">
          <span className="premium-usmle-why__title-line">{c.titleLine1}</span>
          <span className="premium-usmle-why__title-line">{c.titleLine2}</span>
        </h2>
        <div className="premium-usmle-why__copy">
          <p className="premium-usmle-why__kicker">{c.kicker}</p>
          <p className="premium-usmle-why__story">{c.story}</p>
          <p className="premium-usmle-why__outside">{c.outside}</p>
          <p className="premium-usmle-why__warning">
            {c.warningLead}
            <br />
            {c.warningBody}
          </p>
        </div>
      </div>
    </section>
  );
}
