/**
 * FACE-FIXTURES — shared catalog-shaped rows for listing UI fit.
 * Gate: GO AHEAD FACE-FIXTURES (owner 2026-09-22).
 * 5 events + 5 courses per locked `face_layout`. Fixtures ≠ production truth.
 * Later: real catalog rows + flush seeds (CATALOG-B-STAR).
 */

import type { FaceLayoutId } from "./face-layouts";
import { FACE_LAYOUT_IDS, getFaceLayout } from "./face-layouts";
import type { PurpleEventFaceCard } from "./content";
import { FACE_CARD_OPEN } from "./content";
import type { CvreadyFaceCard } from "./cvready-content";
import { CVREADY_FACE_OPEN, CVREADY_HEART_FILLED } from "./cvready-content";
import type { ProgramFullFaceCard } from "./program-full-content";
import { PROGRAM_FULL_FACE_OPEN } from "./program-full-content";
import type { ProgramCompactFaceCard } from "./program-compact-content";
import {
  PROGRAM_COMPACT_FACE_OPEN,
  PROGRAM_COMPACT_HEART_FILLED
} from "./program-compact-content";
import type { PromoFaceCard } from "./promo-content";
import { PROMO_FACE_OPEN, PROMO_HEART_FILLED } from "./promo-content";
import type { InternshipFaceCard } from "./internship-content";
import { INTERNSHIP_FACE_OPEN } from "./internship-content";
import type { CalendarSessionFaceCard } from "./calendar-session-content";
import { CALENDAR_SESSION_FACE_OPEN } from "./calendar-session-content";
import type { CalendarSessionPhotoFaceCard } from "./calendar-session-photo-content";
import { CALENDAR_SESSION_PHOTO_FACE_OPEN } from "./calendar-session-photo-content";

export type CatalogFixtureKind = "event" | "course";

export type FaceFixtureStatus = "open" | "closed";

export type FaceFixtureMeta = {
  id: string;
  kind: CatalogFixtureKind;
  face_layout: FaceLayoutId;
  title: string;
  status: FaceFixtureStatus;
};

type EventSessionFixture = FaceFixtureMeta & {
  face_layout: "event_session";
  card: PurpleEventFaceCard;
};

type CvreadyFixture = FaceFixtureMeta & {
  face_layout: "cvready";
  card: CvreadyFaceCard;
};

type ProgramFullFixture = FaceFixtureMeta & {
  face_layout: "program_full";
  card: ProgramFullFaceCard;
};

type ProgramCompactFixture = FaceFixtureMeta & {
  face_layout: "program_compact";
  card: ProgramCompactFaceCard;
};

type ProgramCompactSmFixture = FaceFixtureMeta & {
  face_layout: "program_compact_sm";
  card: ProgramCompactFaceCard;
};

type ProgramCompactSmDeskFixture = FaceFixtureMeta & {
  face_layout: "program_compact_sm_desk";
  card: ProgramCompactFaceCard;
};

type PromoFixture = FaceFixtureMeta & {
  face_layout: "promo";
  card: PromoFaceCard;
};

type InternshipFixture = FaceFixtureMeta & {
  face_layout: "internship";
  card: InternshipFaceCard;
};

type CalendarSessionFixture = FaceFixtureMeta & {
  face_layout: "calendar_session";
  card: CalendarSessionFaceCard;
};

type CalendarSessionPhotoFixture = FaceFixtureMeta & {
  face_layout: "calendar_session_photo";
  card: CalendarSessionPhotoFaceCard;
};

export type FaceFixture =
  | EventSessionFixture
  | CvreadyFixture
  | ProgramFullFixture
  | ProgramCompactFixture
  | ProgramCompactSmFixture
  | ProgramCompactSmDeskFixture
  | PromoFixture
  | InternshipFixture
  | CalendarSessionFixture
  | CalendarSessionPhotoFixture;

/** Per layout: 5 events + 5 courses (owner lock FACE-FIXTURES). */
export const FACE_FIXTURES_PER_KIND = 5 as const;

const EVENT_TITLES = [
  "Online study abroad plan meetup",
  "Visa 101 evening webinar",
  "UK masters funding clinic",
  "STEM pathway open house",
  "Medical aspirants Q&A night"
] as const;

const COURSE_TITLES = [
  "SOP guidance intensive",
  "CV Ready clinical psychiatry",
  "MSc Automotive Engineering path",
  "Internship masterclass batch",
  "Scholarship prep bootcamp"
] as const;

const TAG_SETS: readonly (readonly string[])[] = [
  ["#UK", "#AUS"],
  ["#USA", "#USMLE"],
  ["#UK", "#Engineering", "#Scholarship"],
  ["#STEM", "#TEAMPGS"],
  ["#all", "#MBA"]
];

const LOCATIONS = [
  "Atlanta, USA",
  "London, UK",
  "Sydney, AUS",
  "Berlin, DE",
  "Toronto, CA"
] as const;

const SPECIALTIES = [
  "Psychiatry",
  "Internal Medicine",
  "Surgery",
  "Pediatrics",
  "Radiology"
] as const;

function closedLabel(kind: CatalogFixtureKind, index: number): string {
  const day = 10 + index;
  const count = 20 + index * 7;
  return `Closed on June ${day} – ${count} ${kind === "event" ? "students" : "applicants"} registered`;
}

function kindLabel(kind: CatalogFixtureKind): string {
  return kind === "event" ? "Event" : "Course";
}

function titleFor(kind: CatalogFixtureKind, index: number): string {
  const list = kind === "event" ? EVENT_TITLES : COURSE_TITLES;
  return list[index] ?? `${kindLabel(kind)} fixture ${index + 1}`;
}

function statusFor(index: number): FaceFixtureStatus {
  /* Explore mix: last of each kind closed */
  return index === FACE_FIXTURES_PER_KIND - 1 ? "closed" : "open";
}

function splitTitleLines(title: string, max = 2): readonly string[] {
  const words = title.trim().split(/\s+/);
  if (words.length <= 3) return [title];
  const mid = Math.ceil(words.length / 2);
  const lines = [
    words.slice(0, mid).join(" "),
    words.slice(mid).join(" ")
  ];
  return lines.slice(0, max);
}

function buildEventSession(
  kind: CatalogFixtureKind,
  index: number
): EventSessionFixture {
  const title = titleFor(kind, index);
  const status = statusFor(index);
  const tags = TAG_SETS[index] ?? TAG_SETS[0];
  const id = `fx-event_session-${kind}-${index + 1}`;
  const lines = splitTitleLines(title) as [string, string];
  const card: PurpleEventFaceCard = {
    ...FACE_CARD_OPEN,
    id,
    status,
    headlineLines: [lines[0] ?? title, lines[1] ?? kindLabel(kind)],
    href: getFaceLayout("event_session").fixtureLearnMoreHref,
    tags,
    modeLabel: kind === "event" ? "#inCampus" : "#online",
    closedLabel: status === "closed" ? closedLabel(kind, index) : ""
  };
  return {
    id,
    kind,
    face_layout: "event_session",
    title,
    status,
    card
  };
}

function buildCvready(kind: CatalogFixtureKind, index: number): CvreadyFixture {
  const title = titleFor(kind, index);
  const status = statusFor(index);
  const tags = TAG_SETS[index] ?? TAG_SETS[0];
  const id = `fx-cvready-${kind}-${index + 1}`;
  const card: CvreadyFaceCard = {
    ...CVREADY_FACE_OPEN,
    id,
    status,
    titleLines: splitTitleLines(title),
    locationValue: LOCATIONS[index] ?? LOCATIONS[0],
    specialtyValue: SPECIALTIES[index] ?? SPECIALTIES[0],
    photoTag: kind === "event" ? "#Session" : "#HandsOn",
    tags,
    href: getFaceLayout("cvready").fixtureLearnMoreHref,
    heartIcon: CVREADY_HEART_FILLED,
    closedLabel: status === "closed" ? closedLabel(kind, index) : undefined
  };
  return {
    id,
    kind,
    face_layout: "cvready",
    title,
    status,
    card
  };
}

function buildProgramFull(
  kind: CatalogFixtureKind,
  index: number
): ProgramFullFixture {
  const title = titleFor(kind, index);
  const status = statusFor(index);
  const tags = TAG_SETS[index] ?? TAG_SETS[0];
  const id = `fx-program_full-${kind}-${index + 1}`;
  const lines = splitTitleLines(title) as [string, string];
  const card: ProgramFullFaceCard = {
    ...PROGRAM_FULL_FACE_OPEN,
    id,
    status,
    headlineLines: [lines[0] ?? title, lines[1] ?? kindLabel(kind)],
    tags,
    modeLabel: kind === "event" ? "#inCampus" : "#program",
    href: getFaceLayout("program_full").fixtureLearnMoreHref,
    closedLabel: status === "closed" ? closedLabel(kind, index) : undefined
  };
  return {
    id,
    kind,
    face_layout: "program_full",
    title,
    status,
    card
  };
}

function buildProgramCompact(
  kind: CatalogFixtureKind,
  index: number
): ProgramCompactFixture {
  const title = titleFor(kind, index);
  const status = statusFor(index);
  const tags = TAG_SETS[index] ?? TAG_SETS[0];
  const id = `fx-program_compact-${kind}-${index + 1}`;
  const lines = splitTitleLines(title, 3);
  const card: ProgramCompactFaceCard = {
    ...PROGRAM_COMPACT_FACE_OPEN,
    id,
    status,
    titleLines:
      lines.length >= 3
        ? [lines[0]!, lines[1]!, lines[2]!]
        : [lines[0] ?? title, kindLabel(kind).toUpperCase(), "FIXTURE"],
    blurb: `${kindLabel(kind)} fixture ${index + 1} — UI fit only. Replace with catalog later.`,
    tags,
    spotsBadge: `Last ${8 + index} Spots`,
    closesValue: `June ${20 + index}`,
    href: getFaceLayout("program_compact").fixtureLearnMoreHref,
    heartIcon: PROGRAM_COMPACT_HEART_FILLED,
    closedLabel: status === "closed" ? closedLabel(kind, index) : undefined
  };
  return {
    id,
    kind,
    face_layout: "program_compact",
    title,
    status,
    card
  };
}

function buildProgramCompactSm(
  kind: CatalogFixtureKind,
  index: number
): ProgramCompactSmFixture {
  const base = buildProgramCompact(kind, index);
  const id = `fx-program_compact_sm-${kind}-${index + 1}`;
  return {
    id,
    kind,
    face_layout: "program_compact_sm",
    title: base.title,
    status: base.status,
    card: {
      ...base.card,
      id
    }
  };
}

function buildProgramCompactSmDesk(
  kind: CatalogFixtureKind,
  index: number
): ProgramCompactSmDeskFixture {
  const base = buildProgramCompact(kind, index);
  const id = `fx-program_compact_sm_desk-${kind}-${index + 1}`;
  return {
    id,
    kind,
    face_layout: "program_compact_sm_desk",
    title: base.title,
    status: base.status,
    card: {
      ...base.card,
      id
    }
  };
}

function buildPromo(kind: CatalogFixtureKind, index: number): PromoFixture {
  const title = titleFor(kind, index);
  const status = statusFor(index);
  const tags = TAG_SETS[index] ?? TAG_SETS[0];
  const id = `fx-promo-${kind}-${index + 1}`;
  const card: PromoFaceCard = {
    ...PROMO_FACE_OPEN,
    id,
    status,
    titleLines: splitTitleLines(title) as readonly string[],
    durationValue: `${1 + (index % 3)} years`,
    perkValue: `up to GBP ${2000 + index * 500}`,
    tags,
    deadlineDays: String(12 + index * 3),
    deadlineNote: `*${20 + index}th June 2025`,
    href: getFaceLayout("promo").fixtureLearnMoreHref,
    heartIcon: PROMO_HEART_FILLED,
    closedLabel: status === "closed" ? closedLabel(kind, index) : undefined
  };
  return {
    id,
    kind,
    face_layout: "promo",
    title,
    status,
    card
  };
}

function buildInternship(
  kind: CatalogFixtureKind,
  index: number
): InternshipFixture {
  const title = titleFor(kind, index);
  const status = statusFor(index);
  const id = `fx-internship-${kind}-${index + 1}`;
  const card: InternshipFaceCard = {
    ...INTERNSHIP_FACE_OPEN,
    id,
    status,
    title: title.length > 28 ? `${title.slice(0, 26)}…` : title,
    blurb: `${kindLabel(kind)} fixture ${index + 1}. Plan your path with #PGS — UI fit only.`,
    photoTag: kind === "event" ? "#inCampus" : "#batch",
    tag: (TAG_SETS[index] ?? TAG_SETS[0])[0] ?? "#STEM",
    ratingLabel: `our ${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} batch`,
    href: getFaceLayout("internship").fixtureLearnMoreHref,
    closedLabel: status === "closed" ? closedLabel(kind, index) : undefined
  };
  return {
    id,
    kind,
    face_layout: "internship",
    title,
    status,
    card
  };
}

function buildCalendarSession(
  kind: CatalogFixtureKind,
  index: number
): CalendarSessionFixture {
  const title = titleFor(kind, index);
  const status = statusFor(index);
  const id = `fx-calendar_session-${kind}-${index + 1}`;
  const lines = splitTitleLines(title);
  const month = ["SEP", "OCT", "NOV", "DEC", "JAN"][index] ?? "SEP";
  const day = 10 + index * 2;
  const card: CalendarSessionFaceCard = {
    ...CALENDAR_SESSION_FACE_OPEN,
    id,
    status,
    titleLines: [lines[0] ?? title, lines[1] ?? kindLabel(kind)],
    dateChip: `${month} ${day}-${day + 1}`,
    timeChip: `${5 + index} PM IST`,
    blurbLines: [
      `${kindLabel(kind)} fixture ${index + 1}`,
      "(UI fit · calendar surface)"
    ],
    modeValue: kind === "event" ? "Google Meet" : "Campus",
    closedLabel: status === "closed" ? "Closed" : undefined
  };
  return {
    id,
    kind,
    face_layout: "calendar_session",
    title,
    status,
    card
  };
}

function buildCalendarSessionPhoto(
  kind: CatalogFixtureKind,
  index: number
): CalendarSessionPhotoFixture {
  const title = titleFor(kind, index);
  const status = statusFor(index);
  const id = `fx-calendar_session_photo-${kind}-${index + 1}`;
  const lines = splitTitleLines(title);
  const month = ["SEP", "OCT", "NOV", "DEC", "JAN"][index] ?? "SEP";
  const day = 10 + index * 2;
  const card: CalendarSessionPhotoFaceCard = {
    ...CALENDAR_SESSION_PHOTO_FACE_OPEN,
    id,
    status,
    titleLines: [lines[0] ?? title, lines[1] ?? kindLabel(kind)],
    dateChip: `${month} ${day}-${day + 1}`,
    timeChip: `${5 + index} PM IST`,
    blurbLines: [
      `${kindLabel(kind)} fixture ${index + 1}`,
      "(UI fit · calendar + photo)"
    ],
    closedLabel: status === "closed" ? "Closed" : undefined
  };
  return {
    id,
    kind,
    face_layout: "calendar_session_photo",
    title,
    status,
    card
  };
}

function buildForLayout(
  layout: FaceLayoutId,
  kind: CatalogFixtureKind,
  index: number
): FaceFixture {
  switch (layout) {
    case "event_session":
      return buildEventSession(kind, index);
    case "cvready":
      return buildCvready(kind, index);
    case "program_full":
      return buildProgramFull(kind, index);
    case "program_compact":
      return buildProgramCompact(kind, index);
    case "program_compact_sm":
      return buildProgramCompactSm(kind, index);
    case "program_compact_sm_desk":
      return buildProgramCompactSmDesk(kind, index);
    case "promo":
      return buildPromo(kind, index);
    case "internship":
      return buildInternship(kind, index);
    case "calendar_session":
      return buildCalendarSession(kind, index);
    case "calendar_session_photo":
      return buildCalendarSessionPhoto(kind, index);
    default: {
      const _exhaustive: never = layout;
      throw new Error(`Unknown face layout: ${_exhaustive}`);
    }
  }
}

function buildBank(): FaceFixture[] {
  const rows: FaceFixture[] = [];
  for (const layout of FACE_LAYOUT_IDS) {
    for (const kind of ["event", "course"] as const) {
      for (let i = 0; i < FACE_FIXTURES_PER_KIND; i += 1) {
        rows.push(buildForLayout(layout, kind, i));
      }
    }
  }
  return rows;
}

/** Full bank — layouts × (5 events + 5 courses). */
export const FACE_FIXTURES: readonly FaceFixture[] = buildBank();

export type ListFaceFixturesOptions = {
  face_layout?: FaceLayoutId;
  kind?: CatalogFixtureKind;
  status?: FaceFixtureStatus;
};

export function listFaceFixtures(
  options: ListFaceFixturesOptions = {}
): FaceFixture[] {
  return FACE_FIXTURES.filter((row) => {
    if (options.face_layout && row.face_layout !== options.face_layout) {
      return false;
    }
    if (options.kind && row.kind !== options.kind) return false;
    if (options.status && row.status !== options.status) return false;
    return true;
  });
}

export function countFaceFixturesByLayout(layout: FaceLayoutId): {
  events: number;
  courses: number;
  total: number;
} {
  const events = listFaceFixtures({ face_layout: layout, kind: "event" }).length;
  const courses = listFaceFixtures({
    face_layout: layout,
    kind: "course"
  }).length;
  return { events, courses, total: events + courses };
}
