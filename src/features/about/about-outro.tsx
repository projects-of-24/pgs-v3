/**
 * About Us — Outro CTA — A12.
 * Desktop `17120:10437` · Mobile `517:6093`.
 * CTA visual-only until popup pass.
 */
import { ABOUT_OUTRO } from "./content";
import "./about-outro.css";

export function AboutOutro() {
  const c = ABOUT_OUTRO;

  return (
    <section
      className="about-outro"
      data-pgs-module="about-outro"
      data-block-gate="a12"
      data-figma-desktop="17120:10437"
      data-figma-mobile="517:6093"
      aria-labelledby="about-outro-heading"
    >
      <p className="about-outro__eyebrow">{c.eyebrow}</p>
      <h2 id="about-outro-heading" className="about-outro__title">
        {c.title}
      </h2>
      <p className="about-outro__body">
        {c.bodyBefore}
        <strong>{c.bodyBold}</strong>
      </p>
      <button type="button" className="about-outro__cta">
        {c.cta}
      </button>
    </section>
  );
}
