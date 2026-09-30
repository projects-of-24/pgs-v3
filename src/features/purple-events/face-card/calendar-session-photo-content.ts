/**
 * Face layout `calendar_session_photo` — Pair 11 (pgs-facecards).
 * Desk pair `42:326` · open `42:290` · closed `42:311` · ~309×344.
 * Mob pair `42:327` · open `42:328` · closed `42:340` · ~198×220 (next gate).
 * Like Pair 7 + fixed photo frame · no Mode row · calendar surface.
 * Photo holder size is FIXED — backend only swaps `photo` src (object-fit cover).
 */

export type CalendarSessionPhotoFaceStatus = "open" | "closed";

export type CalendarSessionPhotoFaceCard = {
  id: string;
  status: CalendarSessionPhotoFaceStatus;
  titleLines: readonly string[];
  dateChip: string;
  timeChip: string;
  blurbLines: readonly string[];
  /** Fixed frame; only src changes in backend later. */
  photo: string;
  photoAlt: string;
  closedLabel?: string;
};

const CALENDAR_SESSION_PHOTO_BASE = {
  titleLines: ["Visa 101", "Webinar"] as const,
  dateChip: "SEP 17-18",
  timeChip: "7 PM IST",
  blurbLines: [
    "Meet our Visa Counselor ",
    "(5+ years experience)"
  ] as const,
  photo: "/assets/img/purple-events/face/calendar-session-photo/photo.jpg",
  photoAlt: ""
} as const;

/** Desk open — Figma `42:290` */
export const CALENDAR_SESSION_PHOTO_FACE_OPEN: CalendarSessionPhotoFaceCard = {
  id: "calendar-session-photo-open-1",
  status: "open",
  ...CALENDAR_SESSION_PHOTO_BASE
};

/** Desk closed — Figma `42:311` (next gate) */
export const CALENDAR_SESSION_PHOTO_FACE_CLOSED: CalendarSessionPhotoFaceCard =
  {
    id: "calendar-session-photo-closed-1",
    status: "closed",
    ...CALENDAR_SESSION_PHOTO_BASE,
    closedLabel: "Closed"
  };
