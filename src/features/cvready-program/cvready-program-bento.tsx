/**
 * CV Ready photo bento — CR7.
 * Desk `19050:12204` · Mob `1312:7916`.
 * Row1: stat tile + photo · Row2: photo + stat tile. No faces.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob body copy 12px / line 12.8
 * ISSUE: below readable floor
 * PGS: mob body ≥16px; layout stays Figma
 */
import { CVREADY_PROGRAM_BENTO } from "./content";
import "./cvready-program-bento.css";

export function CvreadyProgramBento() {
  const c = CVREADY_PROGRAM_BENTO;

  return (
    <section
      className="cvready-program-bento"
      data-pgs-module="cvready-program-bento"
      data-block-gate="cr7"
      data-figma-desktop="19050:12204"
      data-figma-mobile="1312:7916"
      aria-label="Program impact highlights"
    >
      <ul className="cvready-program-bento__rows">
        {c.rows.map((row) => (
          <li
            key={row.id}
            className="cvready-program-bento__row"
            data-layout={row.layout}
          >
            <div className="cvready-program-bento__stat">
              <p className="cvready-program-bento__stat-value">{row.stat}</p>
              <p className="cvready-program-bento__stat-copy">
                {row.lines.map((line) => (
                  <span key={line} className="cvready-program-bento__stat-line">
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div className="cvready-program-bento__photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="cvready-program-bento__photo-img"
                src={row.photoSrc}
                alt={row.photoAlt}
                width={800}
                height={600}
                decoding="async"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
