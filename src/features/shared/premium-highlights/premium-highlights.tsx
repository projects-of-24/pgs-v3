/**
 * Shared highlights block. One component. Pages import this. Do not rebuild it.
 * Desktop: copy left, photo row 20% smaller than Figma. Phone uses the same photo list.
 * Optional `data` lets Courses CMS override copy/photos (COURSE2d-D3); default = PREMIUM_HIGHLIGHTS.
 */
import { PREMIUM_HIGHLIGHTS, type PremiumHighlightsData } from "./content";
import "./premium-highlights.css";

type PremiumHighlightsProps = {
  data?: PremiumHighlightsData;
};

export function PremiumHighlights({ data }: PremiumHighlightsProps = {}) {
  const c = data ?? PREMIUM_HIGHLIGHTS;
  const photos = c.photos.filter((photo) => photo.src.trim());
  const lead = c.lead.filter((line) => line.trim());

  return (
    <section className="premium-highlights" data-pgs-module="premium-highlights" data-block-gate="u24">
      <div className="premium-highlights__row">
        <div className="premium-highlights__copy">
          <h2 className="premium-highlights__title">{c.title}</h2>
          {lead.length ? (
            <p className="premium-highlights__lead">
              {lead.map((line, index) => (
                <span key={`${index}-${line.slice(0, 12)}`}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
          ) : null}
          {c.place.trim() ? (
            <p className="premium-highlights__place">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="premium-highlights__pin" src={c.pinSrc} alt="" width={12} height={16} />
              {c.place}
            </p>
          ) : null}
          {c.note.trim() ? <p className="premium-highlights__note">{c.note}</p> : null}
        </div>
        {photos.length ? (
          <ul className="premium-highlights__photos premium-highlights__photos--desk" tabIndex={0} aria-label="Conference photos">
            {photos.map((photo, index) => (
              <li key={`desk-${index}`} className={`premium-highlights__photo premium-highlights__photo--${photo.crop}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {photos.length ? (
        <div className="premium-highlights__scroller" tabIndex={0} aria-label="Conference photos">
          <ul className="premium-highlights__photos premium-highlights__photos--phone">
            {photos.map((photo, index) => (
              <li key={`phone-${index}`} className={`premium-highlights__photo premium-highlights__photo--${photo.crop}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.alt} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
