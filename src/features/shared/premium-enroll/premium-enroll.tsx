/**
 * Shared enroll card. One component. Pages import this and pass their fixture.
 * USMLE uses the default fixture. Do not rebuild the markup per page.
 */
import { PREMIUM_ENROLL, type PremiumEnrollContent } from "./content";
import "./premium-enroll.css";

type PremiumEnrollProps = {
  content?: PremiumEnrollContent;
};

export function PremiumEnroll({ content = PREMIUM_ENROLL }: PremiumEnrollProps) {
  const c = content;
  const items = c.columns.flat();

  return (
    <section className="premium-enroll" data-pgs-module="premium-enroll" data-block-gate="u27">
      <div className="premium-enroll__panel">
        <div className="premium-enroll__intro">
          <h2 className="premium-enroll__title">
            {c.title[0]}
            <br />
            {c.title[1]}
          </h2>
          <p className="premium-enroll__lead">{c.lead}</p>
        </div>
        <div className="premium-enroll__price">
          <p className="premium-enroll__offer">
            <span className="premium-enroll__offer-label">{c.offerLabel}</span>
            <span className="premium-enroll__badge">{c.badge}</span>
            <span className="premium-enroll__was">{c.was}</span>
          </p>
          <p className="premium-enroll__amount">{c.price}</p>
          <button type="button" className="premium-enroll__cta">
            {c.enroll}
          </button>
        </div>
        <div className="premium-enroll__included">
          <h3 className="premium-enroll__included-title">{c.includedTitle}</h3>
          <p className="premium-enroll__included-lead">{c.includedLead}</p>
          <div className="premium-enroll__columns">
            {c.columns.map((column, columnIndex) => (
              <ul key={columnIndex} className="premium-enroll__list">
                {column.map((item) => (
                  <li key={item.label} className="premium-enroll__item">
                    <img className="premium-enroll__check" src={c.checkSrc} alt="" width={29} height={29} />
                    <span className="premium-enroll__item-copy">
                      <span className="premium-enroll__item-label">{item.label}</span>
                      {item.details ? (
                        <span className="premium-enroll__details">
                          {item.details.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </span>
                      ) : null}
                      {item.note ? <span className="premium-enroll__item-note">{item.note}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <ul className="premium-enroll__list premium-enroll__list--phone">
            {items.map((item) => (
              <li key={item.label} className="premium-enroll__item">
                <img className="premium-enroll__check" src={c.checkSrc} alt="" width={29} height={29} />
                <span className="premium-enroll__item-copy">
                  <span className="premium-enroll__item-label">{item.label}</span>
                  {item.details ? (
                    <span className="premium-enroll__details">
                      {item.details.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  ) : null}
                  {item.note ? <span className="premium-enroll__item-note">{item.note}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="premium-enroll__access">
          <img className="premium-enroll__access-icon" src={c.accessIconSrc} alt="" width={40} height={40} />
          <span className="premium-enroll__access-copy premium-enroll__access-copy--desk">
            {c.accessDesktop[0]}
            <br />
            {c.accessDesktop[1]}
          </span>
          <span className="premium-enroll__access-copy premium-enroll__access-copy--phone">{c.accessPhone}</span>
        </p>
      </div>
    </section>
  );
}
