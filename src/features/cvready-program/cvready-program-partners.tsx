/**
 * CV Ready Program partners logos — CR4.
 * Desk `17046:10473` · Mob `357:4039`.
 * “Our Top” + purple PARTNERS badge · 6 uni logos.
 * Fixture images until CMS partner wire. No face cards. No click URLs.
 */
import { CVREADY_PROGRAM_PARTNERS } from "./content";
import "./cvready-program-partners.css";

export function CvreadyProgramPartners() {
  const c = CVREADY_PROGRAM_PARTNERS;

  return (
    <section
      className="cvready-program-partners"
      data-pgs-module="cvready-program-partners"
      data-block-gate="cr4"
      data-figma-desktop="17046:10473"
      data-figma-mobile="357:4039"
      aria-labelledby="cvready-program-partners-title"
    >
      <h2
        id="cvready-program-partners-title"
        className="cvready-program-partners__title"
      >
        <span className="cvready-program-partners__title-lead">
          {c.titleLead}
        </span>
        <span className="cvready-program-partners__title-badge">
          {c.titleBadge}
        </span>
      </h2>

      <ul className="cvready-program-partners__logos" aria-label="Partner universities">
        {c.logos.map((logo) => (
          <li key={logo.name} className="cvready-program-partners__item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cvready-program-partners__img"
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
