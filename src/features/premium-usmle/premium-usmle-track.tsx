/**
 * #premiumUSMLE track intro — U5.
 * Desktop `17055:14145` + `17055:14151` · mobile `433:4480`.
 * Phone inset is the Figma frame, not 85%. Bentos are the next block.
 * Mobile Figma repeats the intro sentence. Shown once.
 */
import { PREMIUM_USMLE_TRACK } from "./content";
import "./premium-usmle-track.css";

export function PremiumUsmleTrack() {
  const c = PREMIUM_USMLE_TRACK;

  return (
    <section
      className="premium-usmle-track"
      data-pgs-module="premium-usmle-track"
      data-block-gate="u5"
      aria-labelledby="premium-usmle-track-title"
    >
      <div className="premium-usmle-track__inner">
        <p className="premium-usmle-track__section">
          <span className="premium-usmle-track__section-label">{c.sectionLabel}</span>
          <span className="premium-usmle-track__section-lead">{c.sectionLead}</span>
        </p>
        <p className="premium-usmle-track__brand">
          <span className="premium-usmle-track__brand-name">{c.brand}</span>
          <span className="premium-usmle-track__brand-family">{c.family}</span>
        </p>
        <h2 id="premium-usmle-track-title" className="premium-usmle-track__title">
          <span className="premium-usmle-track__title-prefix">{c.trackPrefix}</span>
          <span>{c.trackName}</span>
        </h2>
        <p className="premium-usmle-track__intro">{c.intro}</p>
      </div>
    </section>
  );
}
