/**
 * #premiumNonMedical questions + meet — N14.
 * Desktop `17055:11221` · phone `430:4214`.
 * Page-owned. Do not import shared premium-questions.
 * Figma copy kept as drawn. Schedule Now is visual-only.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: lead green #009c70 · slot 12.8 · phone body 14–15
 * ISSUE: green fails 4.5:1; slot/phone below Roboto band
 * PGS IMPLEMENTATION: lead #008660 · slot 16 · phone body 16. Bebas stays.
 */
import { PREMIUM_NONMEDICAL_QUESTIONS } from "./content";
import "./premium-nonmedical-questions.css";

export function PremiumNonmedicalQuestions() {
  const c = PREMIUM_NONMEDICAL_QUESTIONS;

  return (
    <section
      className="premium-nonmedical-questions"
      data-pgs-module="premium-nonmedical-questions"
      data-block-gate="n14"
      data-figma-desktop="17055:11221"
      data-figma-mobile="430:4214"
      aria-labelledby="premium-nonmedical-questions-title"
    >
      <div className="premium-nonmedical-questions__row">
        <div className="premium-nonmedical-questions__copy">
          <div className="premium-nonmedical-questions__header">
            <h2 className="premium-nonmedical-questions__title" id="premium-nonmedical-questions-title">
              {c.title[0]}
              <br />
              {c.title[1]}
            </h2>
            <p className="premium-nonmedical-questions__lead">{c.lead}</p>
          </div>
          <ul className="premium-nonmedical-questions__list">
            {c.items.map((lines) => (
              <li key={lines[0]} className="premium-nonmedical-questions__item">
                <img
                  className="premium-nonmedical-questions__check"
                  src={c.checkSrc}
                  alt=""
                  width={30}
                  height={30}
                />
                <span className="premium-nonmedical-questions__item-copy">
                  {lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="premium-nonmedical-questions__meet">
          <div className="premium-nonmedical-questions__card">
            <p className="premium-nonmedical-questions__kicker">
              {c.kicker.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </p>
            <h3 className="premium-nonmedical-questions__card-title">{c.cardTitle}</h3>
            <p className="premium-nonmedical-questions__slot">{c.slot}</p>
            <button type="button" className="premium-nonmedical-questions__cta">
              {c.cta}
            </button>
          </div>
          <div className="premium-nonmedical-questions__photo">
            <img src={c.photoSrc} alt={c.photoAlt} width={643} height={429} />
          </div>
        </div>
      </div>
    </section>
  );
}
