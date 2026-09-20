/**
 * Guide quote under the black card.
 * Desktop and phone together. Copy stays band-specific.
 * Desktop `17055:14529` · phone `433:4551`.
 */
import { PREMIUM_USMLE_GUIDE } from "./content";
import "./premium-usmle-guide.css";

export function PremiumUsmleGuide() {
  const c = PREMIUM_USMLE_GUIDE;

  return (
    <section className="premium-usmle-guide" data-pgs-module="premium-usmle-guide" data-block-gate="u23">
      <blockquote className="premium-usmle-guide__card">
        <p className="premium-usmle-guide__desk">
          <span className="premium-usmle-guide__mark" aria-hidden="true">
            “
          </span>
          <span className="premium-usmle-guide__words">
            {c.deskLines[0]}
            <br />
            {c.deskLines[1]}
          </span>
          <span className="premium-usmle-guide__mark premium-usmle-guide__mark--end" aria-hidden="true">
            ”
          </span>
        </p>
        <p className="premium-usmle-guide__phone">{c.phoneLine}</p>
      </blockquote>
      <p className="premium-usmle-guide__badge">{c.badge}</p>
    </section>
  );
}
