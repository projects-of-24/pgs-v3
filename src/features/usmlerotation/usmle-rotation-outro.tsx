/**
 * Outro CTA — Ready to get started?
 * Desktop Figma 18760:12971 · mobile 18760:11855.
 */
import { USMLE_ROTATION_OUTRO } from "./content";
import "./usmle-rotation-outro.css";

export function UsmleRotationOutro() {
  const c = USMLE_ROTATION_OUTRO;

  return (
    <section
      className="usmle-outro"
      data-pgs-module="usmle-rotation-outro"
      aria-labelledby="usmle-outro-heading"
    >
      <p className="usmle-outro__eyebrow">{c.eyebrow}</p>
      <h2 id="usmle-outro-heading" className="usmle-outro__title">
        {c.title}
      </h2>
      <p className="usmle-outro__body">
        {c.bodyBefore}
        <strong>{c.bodyBold}</strong>
      </p>
      <a className="usmle-outro__cta" href={c.ctaHref}>
        {c.cta}
      </a>
    </section>
  );
}
