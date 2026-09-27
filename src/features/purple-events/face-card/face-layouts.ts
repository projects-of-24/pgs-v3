/**
 * V1 face layout inventory (T6) — owner-confirmed 2026-09-20 + pgs-facecards Figma.
 * Staff pick ONE layout per event/course; desk+mob are the same layout (one pair).
 * Canonical Figma: https://www.figma.com/design/reEbIrfkffyoIzXQyVm09z/pgs-facecards
 */

export const PGS_FACECARDS_FIGMA = {
  fileKey: "reEbIrfkffyoIzXQyVm09z",
  fileUrl:
    "https://www.figma.com/design/reEbIrfkffyoIzXQyVm09z/pgs-facecards?node-id=0-1",
  deskPage: "1:168",
  mobPage: "1:1590"
} as const;

export const FACE_LAYOUT_IDS = [
  "event_session",
  "cvready",
  "program_full",
  "program_compact",
  "program_compact_sm",
  "program_compact_sm_desk",
  "promo",
  "internship",
  "calendar_session",
  "calendar_session_photo"
] as const;

export type FaceLayoutId = (typeof FACE_LAYOUT_IDS)[number];

export type FaceLayoutStatus = "locked" | "in_progress" | "awaiting_figma";

/** Where this chrome is allowed to render (product surface). */
export type FaceLayoutSurface = "listing" | "calendar";

export type FaceLayoutMeta = {
  id: FaceLayoutId;
  label: string;
  status: FaceLayoutStatus;
  /** Figma pair number. 9 = Pair 6 @ 80%. */
  figmaPair?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | 10 | 11;
  /**
   * listing = grids / rails / saved.
   * calendar = feed-beside-calendar + calendar course/event lists only.
   */
  surface: FaceLayoutSurface;
  /** Typical listing / saved surfaces (product note — not DB placement keys). */
  typicalUse: string;
  /** Junior vocabulary source (read-only ADAPT). */
  juniorSource: string;
  /** Preview Learn More target while B* live URLs are parked. */
  fixtureLearnMoreHref: string;
  /** Desk / mob Figma node ids (pgs-facecards unless noted). */
  figmaDesk?: string;
  figmaMob?: string;
  figmaDeskOpen?: string;
  figmaDeskClosed?: string;
  figmaMobOpen?: string;
  figmaMobClosed?: string;
  /** When desk layout reuses another layout's mob (owner lock). */
  mobSharedWith?: FaceLayoutId;
  artboardDesk?: string;
  artboardMob?: string;
};

/**
 * Catalog of faces staff may choose. Locked rows have shipped components;
 * in_progress = current pair gate; awaiting_figma = honest placeholders.
 */
export const FACE_LAYOUT_CATALOG: readonly FaceLayoutMeta[] = [
  {
    id: "event_session",
    label: "Event session",
    status: "locked",
    figmaPair: 2,
    surface: "listing",
    typicalUse: "Upcoming rail, event listings",
    juniorSource: "n/a — PGS Figma event face v1",
    fixtureLearnMoreHref: "/preview/purpleevents-lite",
    figmaDesk: "1:1587",
    figmaDeskOpen: "1:349",
    figmaDeskClosed: "1:322",
    figmaMob: "1:1682",
    artboardDesk: "383×592",
    artboardMob: "176×761"
  },
  {
    id: "cvready",
    label: "CV Ready / clinical wide",
    status: "locked",
    figmaPair: 1,
    surface: "listing",
    typicalUse: "CV Ready · clinical / experience listings",
    juniorSource: "cvready frame in pgs-facecards",
    fixtureLearnMoreHref: "/preview/programs-courses",
    figmaDesk: "1:1586",
    figmaDeskOpen: "1:169",
    figmaDeskClosed: "1:1532",
    figmaMob: "1:3403",
    figmaMobOpen: "1:3184",
    figmaMobClosed: "1:3246",
    artboardDesk: "996×300",
    artboardMob: "177×530"
  },
  {
    id: "program_full",
    label: "Program (full)",
    status: "locked",
    figmaPair: 3,
    surface: "listing",
    typicalUse: "Purple Board, rich saved · Figma invite tall",
    juniorSource: "ProgramCard variant:full · invite frame",
    fixtureLearnMoreHref: "/preview/programs-courses",
    figmaDesk: "1:530",
    figmaDeskOpen: "1:1830",
    figmaDeskClosed: "1:1882",
    /** Own mob — cas-v6 mobile (not Pair 2). Closed mob deferred. */
    figmaMob: "91:2908",
    figmaMobOpen: "91:2908",
    artboardDesk: "366×727",
    artboardMob: "283×389"
  },
  {
    id: "program_compact",
    label: "Program (compact)",
    status: "locked",
    figmaPair: 6,
    surface: "listing",
    typicalUse: "Dense saved / grids · Figma courses Pair 6",
    juniorSource: "ProgramCard variant:compact · pair 6",
    fixtureLearnMoreHref: "/preview/programs-courses",
    figmaDesk: "1:2148",
    figmaDeskOpen: "1:2150",
    figmaDeskClosed: "1:2151",
    figmaMob: "1:2731",
    figmaMobOpen: "1:3032",
    figmaMobClosed: "1:2992",
    artboardDesk: "304×461",
    artboardMob: "171×260"
  },
  {
    id: "program_compact_sm",
    label: "Program (compact sm)",
    status: "locked",
    figmaPair: 9,
    surface: "listing",
    typicalUse:
      "Dense grids needing smaller shell · Pair 6 chrome @ 80%, type full size",
    juniorSource: "Pair 6 @ 80% shell · owner lock UT3 2026-09-22",
    fixtureLearnMoreHref: "/preview/programs-courses",
    /** Derived from Pair 6 nodes (no separate Figma pair yet). */
    figmaDesk: "1:2148",
    figmaDeskOpen: "1:2150",
    figmaDeskClosed: "1:2151",
    figmaMob: "1:2731",
    figmaMobOpen: "1:3032",
    figmaMobClosed: "1:2992",
    artboardDesk: "243×369",
    artboardMob: "164×250"
  },
  {
    id: "program_compact_sm_desk",
    label: "Program (compact sm desk)",
    status: "locked",
    figmaPair: 10,
    surface: "listing",
    typicalUse:
      "Desk Pair 9 (80% shell) · default min-height 474 · grows with content · mob Pair 6 full",
    juniorSource: "Pair 9 desk + Pair 6 mob · owner lock 2026-09-24",
    fixtureLearnMoreHref: "/preview/programs-courses",
    /** Derived from Pair 6/9 (no separate Figma pair). */
    figmaDesk: "1:2148",
    figmaDeskOpen: "1:2150",
    figmaDeskClosed: "1:2151",
    figmaMob: "1:2731",
    figmaMobOpen: "1:3032",
    figmaMobClosed: "1:2992",
    artboardDesk: "243×474",
    artboardMob: "171×260"
  },
  {
    id: "promo",
    label: "Promo",
    status: "locked",
    figmaPair: 5,
    surface: "listing",
    typicalUse: "Urgency / seats / closes-on · Figma cvready + QR",
    juniorSource: "PromoCard · pair 5",
    fixtureLearnMoreHref: "/preview/programs-courses",
    figmaDesk: "1:1589",
    figmaDeskOpen: "1:1067",
    figmaDeskClosed: "1:1206",
    figmaMob: "1:2371",
    figmaMobOpen: "1:2372",
    figmaMobClosed: "1:3119",
    artboardDesk: "996×300",
    artboardMob: "177×530"
  },
  {
    id: "internship",
    label: "Internship",
    status: "locked",
    figmaPair: 4,
    surface: "listing",
    typicalUse: "Featured / batch listing · Figma courses short",
    juniorSource: "InternshipCard · courses short",
    fixtureLearnMoreHref: "/preview/programs-courses",
    figmaDesk: "18:319",
    figmaDeskOpen: "18:320",
    figmaDeskClosed: "18:342",
    figmaMob: "1:3183",
    figmaMobOpen: "1:3068",
    figmaMobClosed: "1:3094",
    artboardDesk: "224×371",
    artboardMob: "175×290"
  },
  {
    id: "calendar_session",
    label: "Calendar session",
    status: "locked",
    figmaPair: 7,
    surface: "calendar",
    typicalUse:
      "Feed beside calendar · calendar course/event lists — not listing grids",
    juniorSource: "Pair 7 dashboard & calendar chip · pgs-facecards",
    fixtureLearnMoreHref: "/preview/student-feed",
    figmaDesk: "4:376",
    figmaDeskOpen: "4:377",
    figmaDeskClosed: "4:387",
    figmaMob: "4:375",
    figmaMobOpen: "4:305",
    figmaMobClosed: "4:364",
    artboardDesk: "309×240",
    artboardMob: "206×160"
  },
  {
    id: "calendar_session_photo",
    label: "Calendar session + photo",
    status: "locked",
    figmaPair: 11,
    surface: "calendar",
    typicalUse:
      "Feed / calendar lists with thumb — Pair 7 + fixed photo · no Mode row",
    juniorSource: "Pair 11 · pgs-facecards 42:326 / 42:327",
    fixtureLearnMoreHref: "/preview/student-feed",
    figmaDesk: "42:326",
    figmaDeskOpen: "42:290",
    figmaDeskClosed: "42:311",
    figmaMob: "42:327",
    figmaMobOpen: "42:328",
    figmaMobClosed: "42:340",
    artboardDesk: "309×344",
    artboardMob: "198×220"
  }
] as const;

export function getFaceLayout(id: FaceLayoutId): FaceLayoutMeta {
  const row = FACE_LAYOUT_CATALOG.find((entry) => entry.id === id);
  if (!row) {
    throw new Error(`Unknown face layout: ${id}`);
  }
  return row;
}

export const PENDING_FACE_LAYOUTS: readonly FaceLayoutMeta[] =
  FACE_LAYOUT_CATALOG.filter((entry) => entry.status === "awaiting_figma");

export const IN_PROGRESS_FACE_LAYOUTS: readonly FaceLayoutMeta[] =
  FACE_LAYOUT_CATALOG.filter((entry) => entry.status === "in_progress");
