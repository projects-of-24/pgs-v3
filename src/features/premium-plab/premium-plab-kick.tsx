/**
 * #premiumUSMLE kick line — U9.
 * Under the student quote, on white, before the purple panel.
 * Desktop `17055:14241` · phone `433:5179`.
 * iPad reuses the desktop pair. Purple panel is not this gate.
 */
import { PREMIUM_PLAB_KICK } from "./content";
import "./premium-plab-kick.css";

export function PremiumPlabKick() {
  const c = PREMIUM_PLAB_KICK;

  return (
    <section
      className="premium-plab-kick"
      data-pgs-module="premium-plab-kick"
      data-block-gate="u9"
      aria-labelledby="premium-plab-kick-label"
    >
      <div className="premium-plab-kick__inner">
        <h2 id="premium-plab-kick-label" className="premium-plab-kick__label">
          {c.label}
        </h2>
        <p className="premium-plab-kick__body">{c.body}</p>
      </div>
    </section>
  );
}
