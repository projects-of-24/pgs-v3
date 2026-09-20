/**
 * #premiumUSMLE comes-in — U3.
 * Desktop `17055:12436` + `17055:12439` · mobile `433:4422` + `433:4425`.
 * Poster only. Play is visual until the motion pass. Pathway diagram is the next block.
 */
import { PREMIUM_USMLE_COMES } from "./content";
import "./premium-usmle-comes.css";

export function PremiumUsmleComes() {
  const c = PREMIUM_USMLE_COMES;

  return (
    <section
      className="premium-usmle-comes"
      data-pgs-module="premium-usmle-comes"
      data-block-gate="u3"
      aria-labelledby="premium-usmle-comes-title"
    >
      <div className="premium-usmle-comes__inner">
        <h2 id="premium-usmle-comes-title" className="premium-usmle-comes__title">
          {c.title}
        </h2>
        <p className="premium-usmle-comes__lead">{c.lead}</p>
        <div className="premium-usmle-comes__stage">
          <div className="premium-usmle-comes__poster">
            <img src={c.posterSrc} alt={c.posterAlt} />
            <button
              type="button"
              className="premium-usmle-comes__play"
              data-motion-deferred="premium-usmle-track"
              aria-label={c.playLabel}
            />
          </div>
          <div className="premium-usmle-comes__chip-row">
            <img className="premium-usmle-comes__arrow" src={c.arrowSrc} alt="" />
            <p className="premium-usmle-comes__chip">{c.chip}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
