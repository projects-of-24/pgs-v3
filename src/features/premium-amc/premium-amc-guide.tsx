/**
 * Guide quote under the black card.
 * Desktop and phone together. Copy stays band-specific.
 * Desktop `17055:14529` · phone `433:4551`.
 */
import { PREMIUM_AMC_GUIDE } from "./content";
import "./premium-amc-guide.css";

export function PremiumAmcGuide() {
  const c = PREMIUM_AMC_GUIDE;

  return (
    <section className="premium-amc-guide" data-pgs-module="premium-amc-guide" data-block-gate="u23">
      <blockquote className="premium-amc-guide__card">
        <p className="premium-amc-guide__desk">
          <span className="premium-amc-guide__mark" aria-hidden="true">
            “
          </span>
          <span className="premium-amc-guide__words">
            {c.deskLines[0]}
            <br />
            {c.deskLines[1]}
          </span>
          <span className="premium-amc-guide__mark premium-amc-guide__mark--end" aria-hidden="true">
            ”
          </span>
        </p>
        <p className="premium-amc-guide__phone">{c.phoneLine}</p>
      </blockquote>
      <p className="premium-amc-guide__badge">{c.badge}</p>
    </section>
  );
}
