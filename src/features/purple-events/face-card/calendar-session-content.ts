/**
 * Face layout `calendar_session` — Pair 7 (pgs-facecards).
 * Desk pair `4:376` · open `4:377` · closed `4:387` · ~309×240.
 * Mob pair `4:375` · open `4:305` · closed `4:364` · ~206×160.
 * NOT a listing grid face — feed / dashboard calendar lists only.
 */

export type CalendarSessionFaceStatus = "open" | "closed";

export type CalendarSessionFaceCard = {
  id: string;
  status: CalendarSessionFaceStatus;
  titleLines: readonly string[];
  dateChip: string;
  timeChip: string;
  blurbLines: readonly string[];
  modeLabel: string;
  modeValue: string;
  closedLabel?: string;
};

const CALENDAR_SESSION_BASE = {
  titleLines: ["Visa 101", "Webinar"] as const,
  dateChip: "SEP 17-18",
  timeChip: "7 PM IST",
  blurbLines: [
    "Meet our Visa Counselor ",
    "(5+ years experience)"
  ] as const,
  modeLabel: "Mode: ",
  modeValue: "Google Meet"
} as const;

/** Open — desk `4:377` */
export const CALENDAR_SESSION_FACE_OPEN: CalendarSessionFaceCard = {
  id: "calendar-session-open-1",
  status: "open",
  ...CALENDAR_SESSION_BASE
};

/** Closed — desk `4:387` */
export const CALENDAR_SESSION_FACE_CLOSED: CalendarSessionFaceCard = {
  id: "calendar-session-closed-1",
  status: "closed",
  ...CALENDAR_SESSION_BASE,
  closedLabel: "Closed"
};
