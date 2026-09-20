/**
 * #premiumUSMLE kick line — U9.
 * Under the student quote, on white, before the purple panel.
 * Desktop `17055:14241` · phone `433:5179`.
 * iPad reuses the desktop pair. Purple panel is not this gate.
 */
import { PREMIUM_AMC_KICK } from "./content";
import "./premium-amc-kick.css";

export function PremiumAmcKick() {
  const c = PREMIUM_AMC_KICK;

  return (
    <section
      className="premium-amc-kick"
      data-pgs-module="premium-amc-kick"
      data-block-gate="u9"
      aria-labelledby="premium-amc-kick-label"
    >
      <div className="premium-amc-kick__inner">
        <h2 id="premium-amc-kick-label" className="premium-amc-kick__label">
          {c.label}
        </h2>
        <p className="premium-amc-kick__body">{c.body}</p>
      </div>
    </section>
  );
}
