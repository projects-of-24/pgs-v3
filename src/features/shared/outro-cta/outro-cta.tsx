/**
 * Shared outro. Desktop Figma `17120:10437`. Phone is the next pass.
 * Visual button only. No destination.
 */
import { OUTRO_CTA } from "./content";
import "./outro-cta.css";

export function OutroCta() {
  const c = OUTRO_CTA;

  return (
    <section className="outro-cta" data-pgs-module="outro-cta" data-block-gate="u30" aria-labelledby="outro-cta-title">
      <p className="outro-cta__eyebrow">{c.eyebrow}</p>
      <h2 className="outro-cta__title" id="outro-cta-title">
        {c.title}
      </h2>
      <p className="outro-cta__body">
        {c.bodyBefore}
        <strong>{c.bodyBold}</strong>
      </p>
      <button type="button" className="outro-cta__cta">
        {c.cta}
      </button>
    </section>
  );
}
