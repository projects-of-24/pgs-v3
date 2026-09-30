/**
 * CV Ready Free #studyJam — CR9.
 * Desk yellow panel `19050:12137` · Mob `1312:7937` (title `1312:8006`).
 * Cards = Pair 4 `internship` FACE-FIXTURES (owner: ignore Figma courses short).
 * Hide lab band-note. Catalog surface later: `cvready_studyjam`.
 */
import { listFaceFixtures } from "@/features/purple-events/face-card/face-fixtures";
import { InternshipFaceCard } from "@/features/purple-events/face-card/internship-face-card";
import type { InternshipFaceCard as InternshipCard } from "@/features/purple-events/face-card/internship-content";
import { CVREADY_PROGRAM_STUDYJAM } from "./content";
import "./cvready-program-studyjam.css";

function studyJamCards(): InternshipCard[] {
  const rows = listFaceFixtures({
    face_layout: "internship",
    kind: "course"
  }).slice(0, CVREADY_PROGRAM_STUDYJAM.cardCount);

  return rows.flatMap((row) =>
    row.face_layout === "internship" ? [row.card] : []
  );
}

export function CvreadyProgramStudyjam() {
  const c = CVREADY_PROGRAM_STUDYJAM;
  const cards = studyJamCards();

  return (
    <section
      className="cvready-program-studyjam"
      data-pgs-module="cvready-program-studyjam"
      data-block-gate="cr9"
      data-face-layout="internship"
      data-figma-desktop="19050:12137"
      data-figma-mobile="1312:7937"
      aria-labelledby="cvready-program-studyjam-heading"
    >
      <div className="cvready-program-studyjam__panel">
        <h2
          id="cvready-program-studyjam-heading"
          className="cvready-program-studyjam__heading"
        >
          {c.heading}
        </h2>
        <ul className="cvready-program-studyjam__grid">
          {cards.map((card) => (
            <li key={card.id} className="cvready-program-studyjam__cell">
              <InternshipFaceCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
