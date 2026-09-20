/**
 * #premiumUSMLE competition quote — U7.
 * Two body layouts. Desktop: ticket, right-side notch, photo.
 * Phone: quote inside the turned ticket, notch at the bottom.
 * iPad reuses the desktop row.
 */
import { PREMIUM_PLAB_COMPETE } from "./content";
import "./premium-plab-compete.css";

export function PremiumPlabCompete() {
  const c = PREMIUM_PLAB_COMPETE;

  return (
    <section
      className="premium-plab-compete"
      data-pgs-module="premium-plab-compete"
      data-block-gate="u7"
      aria-labelledby="premium-plab-compete-title"
    >
      <div className="premium-plab-compete__stage">
        <div className="premium-plab-compete__copy">
          <div className="premium-plab-compete__shape" aria-hidden="true">
            <div className="premium-plab-compete__dial">
              <img className="premium-plab-compete__ticket" src={c.ticketSrc} alt="" />
              <img className="premium-plab-compete__ticket-phone" src={c.ticketPhoneSrc} alt="" />
            </div>
            <p className="premium-plab-compete__mark">
              <span>{c.mark}</span>
            </p>
          </div>
          <div className="premium-plab-compete__words">
            <h2 id="premium-plab-compete-title" className="premium-plab-compete__title">
              {c.titleLine1}{" "}
              <br className="premium-plab-compete__break" />
              {c.titleLine2}
            </h2>
            <p className="premium-plab-compete__body">{c.body}</p>
          </div>
        </div>
        <div className="premium-plab-compete__photo-frame">
          <img className="premium-plab-compete__photo" src={c.photoSrc} alt={c.photoAlt} />
        </div>
      </div>
    </section>
  );
}
