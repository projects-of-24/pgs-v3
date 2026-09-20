/**
 * #premiumUSMLE track intro — U5.
 * Desktop `17055:14145` + `17055:14151` · mobile `433:4480`.
 * Phone inset is the Figma frame, not 85%. Bentos are the next block.
 * Mobile Figma repeats the intro sentence. Shown once.
 */
import { PREMIUM_AMC_TRACK } from "./content";
import "./premium-amc-track.css";

export function PremiumAmcTrack() {
  const c = PREMIUM_AMC_TRACK;

  return (
    <section
      className="premium-amc-track"
      data-pgs-module="premium-amc-track"
      data-block-gate="u5"
      aria-labelledby="premium-amc-track-title"
    >
      <div className="premium-amc-track__inner">
        <p className="premium-amc-track__section">
          <span className="premium-amc-track__section-label">{c.sectionLabel}</span>
          <span className="premium-amc-track__section-lead">{c.sectionLead}</span>
        </p>
        <p className="premium-amc-track__brand">
          <span className="premium-amc-track__brand-name">{c.brand}</span>
          <span className="premium-amc-track__brand-family">{c.family}</span>
        </p>
        <h2 id="premium-amc-track-title" className="premium-amc-track__title">
          <span className="premium-amc-track__title-prefix">{c.trackPrefix}</span>
          <span>{c.trackName}</span>
        </h2>
        <p className="premium-amc-track__intro">{c.intro}</p>
      </div>
    </section>
  );
}
