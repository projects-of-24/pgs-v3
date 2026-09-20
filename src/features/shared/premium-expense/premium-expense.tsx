/**
 * Shared expense request. One component. Pages import this. Do not rebuild it.
 * Desktop: grey card left, student photo right, doctor photo overlapping the card.
 * Phone: card, then doctor photo, then student photo. Figma `17055:14537` / `433:5205`.
 */
import { PREMIUM_EXPENSE } from "./content";
import "./premium-expense.css";

export function PremiumExpense() {
  const c = PREMIUM_EXPENSE;

  return (
    <section className="premium-expense" data-pgs-module="premium-expense" data-block-gate="u25">
      <div className="premium-expense__stage">
        <div className="premium-expense__card">
          <h2 className="premium-expense__title">
            {c.title[0]}
            <br />
            {c.title[1]}
            <br />
            {c.title[2]}
          </h2>
          <button type="button" className="premium-expense__cta">
            {c.cta}
          </button>
          <p className="premium-expense__note">{c.note}</p>
          <p className="premium-expense__body">{c.body}</p>
        </div>
        <figure className="premium-expense__doctor">
          <img src={c.doctorSrc} alt={c.doctorAlt} />
        </figure>
        <figure className="premium-expense__student">
          <img src={c.studentSrc} alt={c.studentAlt} />
        </figure>
      </div>
    </section>
  );
}
