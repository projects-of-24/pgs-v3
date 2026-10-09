/**
 * Face layout `promo` — Pair 5 desk+mob (pgs-facecards cvready + QR).
 * Desk pair `1:1589` · open `1:1067` · closed `1:1206` · ~996×300.
 * Mob pair `1:2371` · open `1:2372` · closed `1:3119` · ~177×530.
 * Heart = filled (save deferred).
 */

export type PromoFaceStatus = "open" | "closed";

export type PromoFaceCard = {
  id: string;
  status: PromoFaceStatus;
  titleLines: readonly string[];
  durationLabel: string;
  durationValue: string;
  perksLabel: string;
  perkTitle: string;
  perkValue: string;
  tags: readonly string[];
  fillingBadge: string;
  /** Desk deadline label (e.g. "Deadline In ") */
  deadlineLabel: string;
  deadlineDays: string;
  deadlineUnit: string;
  /** Mob deadline title lines (Figma: Dates / Extended) */
  mobDeadlineLabelLines: readonly string[];
  /** Mob deadline black box lines (Figma: Check / With US) */
  mobDeadlineBoxLines: readonly string[];
  deadlineNote: string;
  datesRail: string;
  href: string;
  cta: string;
  photo: string;
  photoAlt: string;
  logo: string;
  logoAlt: string;
  fillingIcon: string;
  qr: string;
  heartIcon: string;
  closedLabel?: string;
};

export const PROMO_HEART_FILLED =
  "/assets/img/purple-events/face/cvready/heart-filled.svg";

const PROMO_BASE = {
  titleLines: ["MSc Automotive ", "Engineering Practise"] as const,
  durationLabel: "Duration:",
  durationValue: "2 years",
  perksLabel: "Perks",
  perkTitle: "Scholarship",
  perkValue: "up to GBP 3000",
  tags: ["#UK", "#Engineering", "#Scholarship"] as const,
  fillingBadge: "Filling Fast",
  deadlineLabel: "Deadline In ",
  deadlineDays: "24",
  deadlineUnit: "days",
  mobDeadlineLabelLines: ["Dates", "Extended"] as const,
  mobDeadlineBoxLines: ["Check", "With US"] as const,
  deadlineNote: "*28th June 2025",
  datesRail: "Dates You Should Be Aware off.",
  href: "/preview/programs-courses",
  cta: "Learn More",
  photo: "/assets/img/purple-events/face/promo/photo.jpg",
  photoAlt: "",
  logo: "/assets/img/purple-events/face/promo/logo.jpg",
  logoAlt: "The Royal College of Surgeons of Edinburgh",
  fillingIcon: "/assets/img/purple-events/face/promo/filling-fast.gif",
  qr: "/assets/img/purple-events/face/promo/qr.png",
  heartIcon: PROMO_HEART_FILLED
} as const;

/** Open — desk `1:1067` · mob `1:2372` */
export const PROMO_FACE_OPEN: PromoFaceCard = {
  id: "promo-open-1",
  status: "open",
  ...PROMO_BASE
};

/** Closed — desk `1:1206` · mob `1:3119` */
export const PROMO_FACE_CLOSED: PromoFaceCard = {
  id: "promo-closed-1",
  status: "closed",
  ...PROMO_BASE,
  closedLabel: "Closed on June 15 – 46 students registered"
};
