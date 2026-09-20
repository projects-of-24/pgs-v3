/**
 * #premiumUSMLE comes-in — U3.
 * Desktop `17055:12436` + `17055:12439` · mobile `433:4422` + `433:4425`.
 * Poster only. Play is visual until the motion pass. Pathway diagram is the next block.
 */
import { PREMIUM_AMC_COMES } from "./content";
import "./premium-amc-comes.css";

export function PremiumAmcComes() {
  const c = PREMIUM_AMC_COMES;

  return (
    <section
      className="premium-amc-comes"
      data-pgs-module="premium-amc-comes"
      data-block-gate="u3"
      aria-labelledby="premium-amc-comes-title"
    >
      <div className="premium-amc-comes__inner">
        <h2 id="premium-amc-comes-title" className="premium-amc-comes__title">
          {c.title}
        </h2>
        <p className="premium-amc-comes__lead">{c.lead}</p>
        <div className="premium-amc-comes__stage">
          <div className="premium-amc-comes__poster">
            <img src={c.posterSrc} alt={c.posterAlt} />
            <button
              type="button"
              className="premium-amc-comes__play"
              data-motion-deferred="premium-amc-track"
              aria-label={c.playLabel}
            />
          </div>
          <div className="premium-amc-comes__chip-row">
            <img className="premium-amc-comes__arrow" src={c.arrowSrc} alt="" />
            <p className="premium-amc-comes__chip">{c.chip}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
