/**
 * Face layout `program_full` — Pair 3.
 * Desk open `1:1830` · closed `1:1882` · ~366×727 (pgs-facecards).
 * Mob open cas-v6 `91:2908` · ~354×486 · ≤600 only (own chrome — not Pair 2).
 */

export type ProgramFullFaceStatus = "open" | "closed";

export type ProgramFullDateParts = {
  day: string;
  month: string;
  year: string;
  time: string;
};

export type ProgramFullFaceCard = {
  id: string;
  status: ProgramFullFaceStatus;
  headlineLines: readonly [string, string];
  speakerName: string;
  speakerBioLines: readonly string[];
  fillingBadge: string;
  fillingIcon: string;
  modeLabel: string;
  tags: readonly string[];
  designedForLines: readonly string[];
  designedNote: string;
  /** Mob side-photo copy (cas-v6 `91:2908`) */
  whoHeading: string;
  whoLines: readonly string[];
  topicsHeading: string;
  topics: readonly string[];
  start: ProgramFullDateParts;
  end: ProgramFullDateParts;
  href: string;
  cta: string;
  photo: string;
  photoAlt: string;
  shareIcon: string;
  shareLabel: string;
  /** Filled heart — visual only (save deferred B*). */
  heartIcon: string;
  closedLabel?: string;
};

const PROGRAM_FULL_BASE = {
  headlineLines: ["Online study abroad", "plan meetup."] as const,
  speakerName: "Anjay Nilmek",
  speakerBioLines: [
    "20+ Years as mentor,",
    "Helped students across",
    "various paths"
  ] as const,
  fillingBadge: "Filling Fast",
  fillingIcon: "/assets/img/purple-events/fire-filling.gif",
  modeLabel: "#inCampus",
  tags: ["#UK", "#AUS"] as const,
  designedForLines: [
    "This Session Is Designed",
    "for MBA, Master’s &",
    "Engineering Applicants"
  ] as const,
  designedNote:
    "More sessions coming up for Medical & STEM aspirants — reach out to our counsellors.",
  whoHeading: "Who’s It For?",
  whoLines: [
    "Final-year student? Recent grad? Researching for masters?",
    "This session’s made for you."
  ] as const,
  topicsHeading: "Topics Covered",
  topics: [
    "Masters in USA",
    "UK for graduates",
    "How to prepare your finances"
  ] as const,
  start: { day: "31", month: "Dec", year: "25", time: "12pm to 2 pm" },
  end: { day: "01", month: "Jan", year: "26", time: "12pm to 2 pm" },
  href: "/preview/programs-courses",
  cta: "Learn More",
  photo: "/assets/img/purple-events/face/photo.jpg",
  photoAlt: "",
  shareIcon: "/assets/img/purple-events/share.svg",
  shareLabel: "Share this event",
  /** Same filled heart as other faces (`cvready` / Figma `heart mobile` 12:310). */
  heartIcon: "/assets/img/purple-events/face/cvready/heart-filled.svg"
} as const;

/** Desk open — Figma `1:1830` · Mob open — cas-v6 `91:2908` */
export const PROGRAM_FULL_FACE_OPEN: ProgramFullFaceCard = {
  id: "program-full-open-1",
  status: "open",
  ...PROGRAM_FULL_BASE
};

/** Desk closed — Figma `1:1882` · Mob closed deferred (no closed node yet) */
export const PROGRAM_FULL_FACE_CLOSED: ProgramFullFaceCard = {
  id: "program-full-closed-1",
  status: "closed",
  ...PROGRAM_FULL_BASE,
  closedLabel: "Closed on June 15 – 46 students registered"
};
