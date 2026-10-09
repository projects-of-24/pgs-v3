/**
 * Face layout `internship` — Pair 4 desk+mob (pgs-facecards).
 * Desk pair `18:319` · open `18:320` · closed `18:342` · ~224×371.
 * Mob pair `1:3183` · open `1:3068` · closed `1:3094` · ~175×290.
 * No drop shadow (owner). Fixture matches Figma. Desk batch 22px (owner).
 */

export type InternshipFaceStatus = "open" | "closed";

export type InternshipFaceCard = {
  id: string;
  status: InternshipFaceStatus;
  title: string;
  blurb: string;
  photoTag: string;
  tag: string;
  ratingLabel: string;
  href: string;
  cta: string;
  photo: string;
  photoAlt: string;
  ratedIcon: string;
  heartIcon: string;
  closedLabel?: string;
};

const INTERNSHIP_BASE = {
  title: "Masterclass",
  blurb:
    "How to plan your study abroad journey with team #PGS and how to use your dashboard.",
  photoTag: "#inCampus",
  tag: "#STEM",
  ratingLabel: "our 3rd batch",
  href: "/preview/programs-courses",
  cta: "Learn More",
  photo: "/assets/img/purple-events/face/internship/photo.jpg",
  photoAlt: "",
  ratedIcon: "/assets/img/purple-events/face/internship/rated-check.svg",
  /** Same filled heart as other faces (`cvready` / Figma `heart mobile` 12:310). */
  heartIcon: "/assets/img/purple-events/face/cvready/heart-filled.svg"
} as const;

/** Open — desk `18:320` */
export const INTERNSHIP_FACE_OPEN: InternshipFaceCard = {
  id: "internship-open-1",
  status: "open",
  ...INTERNSHIP_BASE
};

/** Closed — desk `18:342` (deferred until desk-open QC) */
export const INTERNSHIP_FACE_CLOSED: InternshipFaceCard = {
  id: "internship-closed-1",
  status: "closed",
  ...INTERNSHIP_BASE,
  closedLabel: "Closed on June 15 – 46 students registered"
};
