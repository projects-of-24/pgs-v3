/**
 * #premiumUSMLE comes-in — U3.
 * Desktop `17055:12436` + `17055:12439` · mobile `433:4422` + `433:4425`.
 * Poster only. Play is visual until the motion pass. Pathway diagram is the next block.
 */
import { PREMIUM_PLAB_COMES } from "./content";
import "./premium-plab-comes.css";

export function PremiumPlabComes() {
  const c = PREMIUM_PLAB_COMES;

  return (
    <section
      className="premium-plab-comes"
      data-pgs-module="premium-plab-comes"
      data-block-gate="u3"
      aria-labelledby="premium-plab-comes-title"
    >
      <div className="premium-plab-comes__inner">
        <h2 id="premium-plab-comes-title" className="premium-plab-comes__title">
          {c.title}
        </h2>
        <p className="premium-plab-comes__lead">{c.lead}</p>
        <div className="premium-plab-comes__stage">
          <div className="premium-plab-comes__poster">
            <img src={c.posterSrc} alt={c.posterAlt} />
            <button
              type="button"
              className="premium-plab-comes__play"
              data-motion-deferred="premium-plab-track"
              aria-label={c.playLabel}
            />
          </div>
          <div className="premium-plab-comes__chip-row">
            <img className="premium-plab-comes__arrow" src={c.arrowSrc} alt="" />
            <p className="premium-plab-comes__chip">{c.chip}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
