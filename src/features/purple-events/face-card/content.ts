/**
 * Purple Events face card fixtures (FACE / T6).
 * Importable into E8 Upcoming rail and later listing surfaces.
 * No DB reads — B* plugs live rows later.
 */

import type { PurpleEventDateParts } from "../content";

export type PurpleEventFaceStatus = "open" | "closed";

export type PurpleEventFaceCard = {
  id: string;
  status: PurpleEventFaceStatus;
  headlineLines: [string, string];
  href: string;
  cta: string;
  photo: string;
  photoAlt: string;
  start: PurpleEventDateParts;
  end: PurpleEventDateParts;
  /** Desk copy */
  whoHeading: string;
  whoLines: readonly string[];
  topicsHeading: string;
  topics: readonly string[];
  /** Mob copy */
  speakerName: string;
  speakerBioLines: readonly string[];
  fillingBadge: string;
  fillingIcon: string;
  modeLabel: string;
  tags: readonly string[];
  designedForLines: readonly string[];
  designedNote: string;
  shareIcon: string;
  shareLabel: string;
  /** Closed overlay — Bebas red copy */
  closedLabel: string;
};

const FACE_SHARED = {
  headlineLines: ["Online study abroad", "plan meetup."] as [string, string],
  href: "/preview/purpleevents-lite",
  cta: "Learn More",
  photo: "/assets/img/purple-events/face/photo.jpg",
  photoAlt: "",
  start: { day: "31", month: "Dec", year: "25", time: "12pm to 2 pm" },
  end: { day: "01", month: "Jan", year: "26", time: "12pm to 2 pm" },
  whoHeading: "Who’s It For?",
  whoLines: [
    "Final-year student? Recent grad? Researching for masters?",
    "This session’s made for you."
  ],
  topicsHeading: "Topics Covered",
  topics: ["Masters in USA", "UK for graduates", "How to prepare your finances"],
  speakerName: "Anjay Nilmek",
  speakerBioLines: [
    "20+ Years as mentor,",
    "Helped students across various paths"
  ],
  fillingBadge: "Filling Fast",
  fillingIcon: "/assets/img/purple-events/fire-filling.gif",
  modeLabel: "#inCampus",
  tags: ["#UK", "#AUS"],
  designedForLines: [
    "This Session Is Designed",
    "for MBA, Master’s &",
    "Engineering Applicants"
  ],
  designedNote:
    "More sessions coming up for Medical & STEM aspirants — reach out to our counsellors.",
  shareIcon: "/assets/img/purple-events/share.svg",
  shareLabel: "Share this event"
} as const;

/** Open face — Figma desk 18961:13084 open · mob 1242:7585 open */
export const FACE_CARD_OPEN: PurpleEventFaceCard = {
  id: "face-open",
  status: "open",
  ...FACE_SHARED,
  closedLabel: ""
};

/** Closed face — grey wash + red closed plate */
export const FACE_CARD_CLOSED: PurpleEventFaceCard = {
  id: "face-closed",
  status: "closed",
  ...FACE_SHARED,
  closedLabel: "Closed on June 15 – 46 students registered"
};

/** Lab row — open then closed (same order as Figma pairs) */
export const FACE_CARD_LAB: PurpleEventFaceCard[] = [
  FACE_CARD_OPEN,
  FACE_CARD_CLOSED
];
