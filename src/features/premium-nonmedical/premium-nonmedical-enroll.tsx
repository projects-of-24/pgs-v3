/**
 * #premiumNonMedical enroll — N13.
 * Desktop `17055:11338` · phone `379:4920` + price + included.
 * Page-owned. Do not import shared premium-enroll.
 * Figma copy kept as drawn (including USMLE wording and ₹ 65,0000).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: lead/included/items ~11–13px · phone body ~14
 * ISSUE: below this page’s Roboto band
 * PGS IMPLEMENTATION: body/list 16 desk · 16 phone; Bebas stays Figma.
 */
import { PREMIUM_NONMEDICAL_ENROLL } from "./content";
import "./premium-nonmedical-enroll.css";

export function PremiumNonmedicalEnroll() {
  const c = PREMIUM_NONMEDICAL_ENROLL;
  const items = c.columns.flat();

  return (
    <section
      className="premium-nonmedical-enroll"
      data-pgs-module="premium-nonmedical-enroll"
      data-block-gate="n13"
      data-figma-desktop="17055:11338"
      data-figma-mobile="379:4920"
      aria-labelledby="premium-nonmedical-enroll-title"
    >
      <div className="premium-nonmedical-enroll__panel">
        <div className="premium-nonmedical-enroll__intro">
          <h2 id="premium-nonmedical-enroll-title" className="premium-nonmedical-enroll__title">
            {c.title[0]}
            <br />
            {c.title[1]}
          </h2>
          <p className="premium-nonmedical-enroll__lead">{c.lead}</p>
        </div>

        <div className="premium-nonmedical-enroll__price">
          <p className="premium-nonmedical-enroll__offer">
            <span className="premium-nonmedical-enroll__offer-label">{c.offerLabel}</span>
            <span className="premium-nonmedical-enroll__badge">{c.badge}</span>
            <span className="premium-nonmedical-enroll__was">{c.was}</span>
          </p>
          <p className="premium-nonmedical-enroll__amount">{c.price}</p>
          <button type="button" className="premium-nonmedical-enroll__cta">
            {c.enroll}
          </button>
        </div>

        <div className="premium-nonmedical-enroll__included">
          <h3 className="premium-nonmedical-enroll__included-title">{c.includedTitle}</h3>
          <p className="premium-nonmedical-enroll__included-lead">{c.includedLead}</p>
          <div className="premium-nonmedical-enroll__columns">
            {c.columns.map((column, columnIndex) => (
              <ul key={columnIndex} className="premium-nonmedical-enroll__list">
                {column.map((item) => (
                  <li key={item.label} className="premium-nonmedical-enroll__item">
                    <img
                      className="premium-nonmedical-enroll__check"
                      src={c.checkSrc}
                      alt=""
                      width={29}
                      height={29}
                    />
                    <span className="premium-nonmedical-enroll__item-copy">
                      <span className="premium-nonmedical-enroll__item-label">{item.label}</span>
                      {item.details ? (
                        <span className="premium-nonmedical-enroll__details">
                          {item.details.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </span>
                      ) : null}
                      {item.note ? (
                        <span className="premium-nonmedical-enroll__item-note">{item.note}</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <ul className="premium-nonmedical-enroll__list premium-nonmedical-enroll__list--phone">
            {items.map((item) => (
              <li key={item.label} className="premium-nonmedical-enroll__item">
                <img
                  className="premium-nonmedical-enroll__check"
                  src={c.checkSrc}
                  alt=""
                  width={29}
                  height={29}
                />
                <span className="premium-nonmedical-enroll__item-copy">
                  <span className="premium-nonmedical-enroll__item-label">{item.label}</span>
                  {item.details ? (
                    <span className="premium-nonmedical-enroll__details">
                      {item.details.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  ) : null}
                  {item.note ? (
                    <span className="premium-nonmedical-enroll__item-note">{item.note}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="premium-nonmedical-enroll__access">
          <img
            className="premium-nonmedical-enroll__access-icon"
            src={c.accessIconSrc}
            alt=""
            width={40}
            height={40}
          />
          <span className="premium-nonmedical-enroll__access-copy premium-nonmedical-enroll__access-copy--desk">
            {c.accessDesktop[0]}
            <br />
            {c.accessDesktop[1]}
          </span>
          <span className="premium-nonmedical-enroll__access-copy premium-nonmedical-enroll__access-copy--phone">
            {c.accessPhone}
          </span>
        </p>
      </div>
    </section>
  );
}
