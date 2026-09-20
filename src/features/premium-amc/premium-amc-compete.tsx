/**
 * #premiumUSMLE competition quote — U7.
 * Two body layouts. Desktop: ticket, right-side notch, photo.
 * Phone: quote inside the turned ticket, notch at the bottom.
 * iPad reuses the desktop row.
 */
import { PREMIUM_AMC_COMPETE } from "./content";
import "./premium-amc-compete.css";

export function PremiumAmcCompete() {
  const c = PREMIUM_AMC_COMPETE;

  return (
    <section
      className="premium-amc-compete"
      data-pgs-module="premium-amc-compete"
      data-block-gate="u7"
      aria-labelledby="premium-amc-compete-title"
    >
      <div className="premium-amc-compete__stage">
        <div className="premium-amc-compete__copy">
          <div className="premium-amc-compete__shape" aria-hidden="true">
            <div className="premium-amc-compete__dial">
              <img className="premium-amc-compete__ticket" src={c.ticketSrc} alt="" />
              <img className="premium-amc-compete__ticket-phone" src={c.ticketPhoneSrc} alt="" />
            </div>
            <p className="premium-amc-compete__mark">
              <span>{c.mark}</span>
            </p>
          </div>
          <div className="premium-amc-compete__words">
            <h2 id="premium-amc-compete-title" className="premium-amc-compete__title">
              {c.titleLine1}{" "}
              <br className="premium-amc-compete__break" />
              {c.titleLine2}
            </h2>
            <p className="premium-amc-compete__body">{c.body}</p>
          </div>
        </div>
        <div className="premium-amc-compete__photo-frame">
          <img className="premium-amc-compete__photo" src={c.photoSrc} alt={c.photoAlt} />
        </div>
      </div>
    </section>
  );
}
