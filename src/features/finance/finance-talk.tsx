/**
 * Finance Talk CTA — F4.
 * Desktop Figma `17041:17765` · Mobile `323:2780`.
 * Desktop: two-line title with link on line 2. Mobile: stacked + centered.
 * Link visual only for now (Hostinger used href="#"; wire later).
 */
import { FINANCE_TALK } from "./content";
import "./finance-talk.css";

export function FinanceTalk() {
  const c = FINANCE_TALK;

  return (
    <section
      className="finance-talk"
      data-pgs-module="finance-talk"
      data-block-gate="f4"
      aria-labelledby="finance-talk-title"
    >
      <div className="finance-talk__inner">
        <h2 id="finance-talk-title" className="finance-talk__title">
          <span className="finance-talk__title-line">{c.titleLine1}</span>
          <span className="finance-talk__title-line finance-talk__title-line--with-cta">
            <span className="finance-talk__title-end">{c.titleLine2}</span>
            <button type="button" className="finance-talk__cta">
              {c.ctaLabel}
            </button>
          </span>
        </h2>
      </div>
    </section>
  );
}
