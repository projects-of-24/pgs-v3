/**
 * Shared questions and meet pair. One component. Pages import this.
 * Desktop Figma `17055:12872`. Phone `433:4660` + `433:4685`.
 * Schedule Now stays a visual button. No destination.
 */
import { PREMIUM_QUESTIONS } from "./content";
import "./premium-questions.css";

export function PremiumQuestions() {
  const c = PREMIUM_QUESTIONS;

  return (
    <section
      className="premium-questions"
      data-pgs-module="premium-questions"
      data-block-gate="u28"
      aria-labelledby="premium-questions-title"
    >
      <div className="premium-questions__row">
        <div className="premium-questions__copy">
          <div className="premium-questions__header">
            <h2 className="premium-questions__title" id="premium-questions-title">
              {c.title[0]}
              <br />
              <span className="premium-questions__title-keep">{c.title[1]}</span>
            </h2>
            <p className="premium-questions__lead">{c.lead}</p>
          </div>
          <ul className="premium-questions__list">
            {c.items.map((lines) => (
              <li key={lines[0]} className="premium-questions__item">
                <img className="premium-questions__check" src={c.checkSrc} alt="" width={30} height={30} />
                <span className="premium-questions__item-copy">
                  {lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="premium-questions__meet">
          <div className="premium-questions__card">
            <p className="premium-questions__kicker">
              {c.kicker.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </p>
            <h3 className="premium-questions__card-title">{c.cardTitle}</h3>
            <p className="premium-questions__slot">{c.slot}</p>
            <button type="button" className="premium-questions__cta">
              {c.cta}
            </button>
          </div>
          <div className="premium-questions__photo">
            <img src={c.photoSrc} alt={c.photoAlt} width={643} height={429} />
          </div>
        </div>
      </div>
    </section>
  );
}
