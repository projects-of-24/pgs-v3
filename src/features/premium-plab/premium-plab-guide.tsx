/**
 * Guide quote under the black card.
 * Desktop and phone together. Copy stays band-specific.
 * Desktop `17055:14529` · phone `433:4551`.
 */
import { PREMIUM_PLAB_GUIDE } from "./content";
import "./premium-plab-guide.css";

export function PremiumPlabGuide() {
  const c = PREMIUM_PLAB_GUIDE;

  return (
    <section className="premium-plab-guide" data-pgs-module="premium-plab-guide" data-block-gate="u23">
      <blockquote className="premium-plab-guide__card">
        <p className="premium-plab-guide__desk">
          <span className="premium-plab-guide__mark" aria-hidden="true">
            “
          </span>
          <span className="premium-plab-guide__words">
            {c.deskLines[0]}
            <br />
            {c.deskLines[1]}
          </span>
          <span className="premium-plab-guide__mark premium-plab-guide__mark--end" aria-hidden="true">
            ”
          </span>
        </p>
        <p className="premium-plab-guide__phone">{c.phoneLine}</p>
      </blockquote>
      <p className="premium-plab-guide__badge">{c.badge}</p>
    </section>
  );
}
