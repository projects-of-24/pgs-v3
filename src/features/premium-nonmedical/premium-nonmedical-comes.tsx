/**
 * #premiumNonMedical comes-in — N3.
 * Same block shape as medical comes-in. This page's copy and assets.
 * Desktop `17055:10599` + `17055:10602` · phone `375:4180` + `375:4183`.
 * Play is visual until the motion pass. Path card is the next block.
 */
import { PREMIUM_NONMEDICAL_COMES } from "./content";
import "./premium-nonmedical-comes.css";

export function PremiumNonmedicalComes() {
  const c = PREMIUM_NONMEDICAL_COMES;

  return (
    <section
      className="premium-nonmedical-comes"
      data-pgs-module="premium-nonmedical-comes"
      data-block-gate="n3"
      aria-labelledby="premium-nonmedical-comes-title"
    >
      <div className="premium-nonmedical-comes__inner">
        <h2 id="premium-nonmedical-comes-title" className="premium-nonmedical-comes__title">
          {c.title}
        </h2>
        <p className="premium-nonmedical-comes__lead">{c.lead}</p>
        <div className="premium-nonmedical-comes__stage">
          <div className="premium-nonmedical-comes__poster">
            <img src={c.posterSrc} alt={c.posterAlt} />
            <button
              type="button"
              className="premium-nonmedical-comes__play"
              data-motion-deferred="premium-nonmedical-track"
              aria-label={c.playLabel}
            />
          </div>
          <div className="premium-nonmedical-comes__chip-row">
            <img className="premium-nonmedical-comes__arrow" src={c.arrowSrc} alt="" />
            <p className="premium-nonmedical-comes__chip">
              <span className="premium-nonmedical-comes__chip-line premium-nonmedical-comes__chip-line--desk">
                {c.chipDeskLine1}
              </span>
              <span className="premium-nonmedical-comes__chip-line premium-nonmedical-comes__chip-line--desk">
                {c.chipDeskLine2}
              </span>
              <span className="premium-nonmedical-comes__chip-line premium-nonmedical-comes__chip-line--phone">
                {c.chipPhoneLine1}
              </span>
              <span className="premium-nonmedical-comes__chip-line premium-nonmedical-comes__chip-line--phone">
                {c.chipPhoneLine2}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
