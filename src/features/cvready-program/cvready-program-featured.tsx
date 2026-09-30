/**
 * CV Ready #purpleSelected featured rail — CR5.
 * Desk yellow panel `17046:10569` · Mob title `357:4168` + cards.
 * Cards = Pair 4 `internship` FACE-FIXTURES (owner: ignore Figma courses short).
 * Hide lab band-note. Catalog surface later: `cvready_featured`.
 */
import { listFaceFixtures } from "@/features/purple-events/face-card/face-fixtures";
import { InternshipFaceCard } from "@/features/purple-events/face-card/internship-face-card";
import type { InternshipFaceCard as InternshipCard } from "@/features/purple-events/face-card/internship-content";
import { CVREADY_PROGRAM_FEATURED } from "./content";
import "./cvready-program-featured.css";

function featuredCards(): InternshipCard[] {
  const rows = listFaceFixtures({
    face_layout: "internship",
    kind: "course"
  }).slice(0, CVREADY_PROGRAM_FEATURED.cardCount);

  return rows.flatMap((row) =>
    row.face_layout === "internship" ? [row.card] : []
  );
}

export function CvreadyProgramFeatured() {
  const c = CVREADY_PROGRAM_FEATURED;
  const cards = featuredCards();

  return (
    <section
      className="cvready-program-featured"
      data-pgs-module="cvready-program-featured"
      data-block-gate="cr5"
      data-face-layout="internship"
      data-figma-desktop="17046:10569"
      data-figma-mobile="357:4168"
      aria-labelledby="cvready-program-featured-heading"
    >
      <div className="cvready-program-featured__panel">
        <h2
          id="cvready-program-featured-heading"
          className="cvready-program-featured__heading"
        >
          {c.heading}
        </h2>
        <ul className="cvready-program-featured__grid">
          {cards.map((card) => (
            <li key={card.id} className="cvready-program-featured__cell">
              <InternshipFaceCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
