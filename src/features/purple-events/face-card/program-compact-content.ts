/**
 * Face layout `program_compact` — Pair 6 (pgs-facecards courses).
 * Desk pair `1:2148` · open `1:2150` · closed `1:2151` · ~304×461 · LOCKED.
 * Mob pair `1:2731` · open `1:3032` · closed `1:2992` · ~171×260 · LOCKED.
 * Heart = filled (save deferred). No Start Free cursor (owner).
 */

export type ProgramCompactFaceStatus = "open" | "closed";

export type ProgramCompactFaceCard = {
  id: string;
  status: ProgramCompactFaceStatus;
  titleLines: readonly string[];
  blurb: string;
  tags: readonly string[];
  spotsBadge: string;
  startBadge: string;
  closesLabel: string;
  closesValue: string;
  href: string;
  cta: string;
  photo: string;
  photoAlt: string;
  spotsIcon: string;
  heartIcon: string;
  closedLabel?: string;
};

export const PROGRAM_COMPACT_HEART_FILLED =
  "/assets/img/purple-events/face/cvready/heart-filled.svg";

const PROGRAM_COMPACT_BASE = {
  titleLines: ["SOP GUIDANCE ", "PROGRAM", "FOR APPLCIANTS"] as const,
  blurb: "Build a top-tier SOP in 3 days with our guided writing challenge.",
  tags: ["#TEAMPGS", "#all"] as const,
  spotsBadge: "Last 10 Spots",
  startBadge: "Start Free",
  closesLabel: "Closes On",
  closesValue: "June 30",
  href: "/preview/programs-courses",
  cta: "Learn More",
  photo: "/assets/img/purple-events/face/program-compact/photo.jpg",
  photoAlt: "",
  spotsIcon: "/assets/img/purple-events/face/program-compact/last-spots-star.png",
  heartIcon: PROGRAM_COMPACT_HEART_FILLED
} as const;

/** Open — desk `1:2150` */
export const PROGRAM_COMPACT_FACE_OPEN: ProgramCompactFaceCard = {
  id: "program-compact-open-1",
  status: "open",
  ...PROGRAM_COMPACT_BASE
};

/** Closed — desk `1:2151` · wash + plate on pair `1:2148` */
export const PROGRAM_COMPACT_FACE_CLOSED: ProgramCompactFaceCard = {
  id: "program-compact-closed-1",
  status: "closed",
  ...PROGRAM_COMPACT_BASE,
  closedLabel: "Closed on June 15 – 46 students registered"
};
