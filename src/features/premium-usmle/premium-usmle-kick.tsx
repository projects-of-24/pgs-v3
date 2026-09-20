/**
 * #premiumUSMLE kick line — U9.
 * Under the student quote, on white, before the purple panel.
 * Desktop `17055:14241` · phone `433:5179`.
 * iPad reuses the desktop pair. Purple panel is not this gate.
 */
import { PREMIUM_USMLE_KICK } from "./content";
import "./premium-usmle-kick.css";

export function PremiumUsmleKick() {
  const c = PREMIUM_USMLE_KICK;

  return (
    <section
      className="premium-usmle-kick"
      data-pgs-module="premium-usmle-kick"
      data-block-gate="u9"
      aria-labelledby="premium-usmle-kick-label"
    >
      <div className="premium-usmle-kick__inner">
        <h2 id="premium-usmle-kick-label" className="premium-usmle-kick__label">
          {c.label}
        </h2>
        <p className="premium-usmle-kick__body">{c.body}</p>
      </div>
    </section>
  );
}
