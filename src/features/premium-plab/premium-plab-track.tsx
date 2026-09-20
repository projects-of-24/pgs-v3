/**
 * #premiumUSMLE track intro — U5.
 * Desktop `17055:14145` + `17055:14151` · mobile `433:4480`.
 * Phone inset is the Figma frame, not 85%. Bentos are the next block.
 * Mobile Figma repeats the intro sentence. Shown once.
 */
import { PREMIUM_PLAB_TRACK } from "./content";
import "./premium-plab-track.css";

export function PremiumPlabTrack() {
  const c = PREMIUM_PLAB_TRACK;

  return (
    <section
      className="premium-plab-track"
      data-pgs-module="premium-plab-track"
      data-block-gate="u5"
      aria-labelledby="premium-plab-track-title"
    >
      <div className="premium-plab-track__inner">
        <p className="premium-plab-track__section">
          <span className="premium-plab-track__section-label">{c.sectionLabel}</span>
          <span className="premium-plab-track__section-lead">{c.sectionLead}</span>
        </p>
        <p className="premium-plab-track__brand">
          <span className="premium-plab-track__brand-name">{c.brand}</span>
          <span className="premium-plab-track__brand-family">{c.family}</span>
        </p>
        <h2 id="premium-plab-track-title" className="premium-plab-track__title">
          <span className="premium-plab-track__title-prefix">{c.trackPrefix}</span>
          <span>{c.trackName}</span>
        </h2>
        <p className="premium-plab-track__intro">{c.intro}</p>
      </div>
    </section>
  );
}
