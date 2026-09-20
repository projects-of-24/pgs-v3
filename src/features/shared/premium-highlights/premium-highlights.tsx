/**
 * Shared highlights block. One component. Pages import this. Do not rebuild it.
 * Desktop: copy left, photo row 20% smaller than Figma. Phone uses the same photo list.
 */
import { PREMIUM_HIGHLIGHTS } from "./content";
import "./premium-highlights.css";

export function PremiumHighlights() {
  const c = PREMIUM_HIGHLIGHTS;

  return (
    <section className="premium-highlights" data-pgs-module="premium-highlights" data-block-gate="u24">
      <div className="premium-highlights__row">
        <div className="premium-highlights__copy">
          <h2 className="premium-highlights__title">{c.title}</h2>
          <p className="premium-highlights__lead">
            {c.lead[0]}
            <br />
            {c.lead[1]}
            <br />
            {c.lead[2]}
            <br />
            {c.lead[3]}
          </p>
          <p className="premium-highlights__place">
            <img className="premium-highlights__pin" src={c.pinSrc} alt="" width={12} height={16} />
            {c.place}
          </p>
          <p className="premium-highlights__note">{c.note}</p>
        </div>
        <ul className="premium-highlights__photos premium-highlights__photos--desk" tabIndex={0} aria-label="Conference photos">
          {c.photos.map((photo, index) => (
            <li key={`desk-${index}`} className={`premium-highlights__photo premium-highlights__photo--${photo.crop}`}>
              <img src={photo.src} alt={photo.alt} />
            </li>
          ))}
        </ul>
      </div>
      <div className="premium-highlights__scroller" tabIndex={0} aria-label="Conference photos">
        <ul className="premium-highlights__photos premium-highlights__photos--phone">
          {c.photos.map((photo, index) => (
            <li key={`phone-${index}`} className={`premium-highlights__photo premium-highlights__photo--${photo.crop}`}>
              <img src={photo.src} alt={photo.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
