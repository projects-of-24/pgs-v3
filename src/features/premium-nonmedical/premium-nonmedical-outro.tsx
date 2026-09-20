/**
 * #premiumNonMedical outro — N16.
 * Phone Figma `371:5371`. Desktop follows shared About/medical rhythm
 * (`17120:10437`) — this page’s desk frame does not draw it.
 * Page-owned. Do not import shared outro-cta. Visual button only.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk eyebrow 11.2 / CTA 14 · phone body/CTA ~14–15
 * ISSUE: below this page’s Roboto band
 * PGS IMPLEMENTATION: eyebrow, body, CTA sit at 16. Title stays Figma.
 */
import { PREMIUM_NONMEDICAL_OUTRO } from "./content";
import "./premium-nonmedical-outro.css";

export function PremiumNonmedicalOutro() {
  const c = PREMIUM_NONMEDICAL_OUTRO;

  return (
    <section
      className="premium-nonmedical-outro"
      data-pgs-module="premium-nonmedical-outro"
      data-block-gate="n16"
      data-figma-desktop="17120:10437"
      data-figma-mobile="371:5371"
      aria-labelledby="premium-nonmedical-outro-title"
    >
      <p className="premium-nonmedical-outro__eyebrow">{c.eyebrow}</p>
      <h2 className="premium-nonmedical-outro__title" id="premium-nonmedical-outro-title">
        {c.title}
      </h2>
      <p className="premium-nonmedical-outro__body">
        {c.bodyBefore}
        <strong>{c.bodyBold}</strong>
      </p>
      <button type="button" className="premium-nonmedical-outro__cta">
        {c.cta}
      </button>
    </section>
  );
}
