/**
 * #premiumUSMLE competition quote — U7.
 * Two body layouts. Desktop: ticket, right-side notch, photo.
 * Phone: quote inside the turned ticket, notch at the bottom.
 * iPad reuses the desktop row.
 */
import { PREMIUM_USMLE_COMPETE } from "./content";
import "./premium-usmle-compete.css";

export function PremiumUsmleCompete() {
  const c = PREMIUM_USMLE_COMPETE;

  return (
    <section
      className="premium-usmle-compete"
      data-pgs-module="premium-usmle-compete"
      data-block-gate="u7"
      aria-labelledby="premium-usmle-compete-title"
    >
      <div className="premium-usmle-compete__stage">
        <div className="premium-usmle-compete__copy">
          <div className="premium-usmle-compete__shape" aria-hidden="true">
            <div className="premium-usmle-compete__dial">
              <img className="premium-usmle-compete__ticket" src={c.ticketSrc} alt="" />
              <img className="premium-usmle-compete__ticket-phone" src={c.ticketPhoneSrc} alt="" />
            </div>
            <p className="premium-usmle-compete__mark">
              <span>{c.mark}</span>
            </p>
          </div>
          <div className="premium-usmle-compete__words">
            <h2 id="premium-usmle-compete-title" className="premium-usmle-compete__title">
              {c.titleLine1}{" "}
              <br className="premium-usmle-compete__break" />
              {c.titleLine2}
            </h2>
            <p className="premium-usmle-compete__body">{c.body}</p>
          </div>
        </div>
        <div className="premium-usmle-compete__photo-frame">
          <img className="premium-usmle-compete__photo" src={c.photoSrc} alt={c.photoAlt} />
        </div>
      </div>
    </section>
  );
}
