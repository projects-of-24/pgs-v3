/**
 * Face layout `cvready` — Pair 1 desk + mob open+closed (pgs-facecards).
 * Desk open `1:169` · closed `1:1532` · 996×300.
 * Mob open `1:3184` · closed `1:3246` · ~177×530 (pair `1:3403`).
 * Heart: Figma `heart mobile` (`12:310`) — filled = default UI now;
 * outline + saved boolean later (backend).
 */

export type CvreadyFaceStatus = "open" | "closed";

export type CvreadyFaceCard = {
  id: string;
  status: CvreadyFaceStatus;
  titleLines: readonly string[];
  locationLabel: string;
  locationValue: string;
  specialtyLabel: string;
  specialtyValue: string;
  photoTag: string;
  tags: readonly string[];
  fillingBadge: string;
  href: string;
  cta: string;
  photo: string;
  photoAlt: string;
  fillingIcon: string;
  /** Figma filled red for now; outline when saved-list backend lands. */
  heartIcon: string;
  closedLabel?: string;
};

/** Figma `12:311` Property 1=Variant2 — filled red (saved=true later). */
export const CVREADY_HEART_FILLED =
  "/assets/img/purple-events/face/cvready/heart-filled.svg";

/** Figma `12:307` Property 1=Default — outline (saved=false later). */
export const CVREADY_HEART_OUTLINE =
  "/assets/img/purple-events/face/cvready/heart-outline.svg";

const CVREADY_FACE_BASE = {
  titleLines: ["Outpatient US Clinical", "Experience in Psychiatry"],
  locationLabel: "Location",
  locationValue: "Atlanta, USA",
  specialtyLabel: "Speciality",
  specialtyValue: "Psychiatry",
  photoTag: "#HandsOn",
  tags: ["#USA", "#USMLE"],
  fillingBadge: "Filling Fast",
  href: "/preview/programs-courses",
  cta: "Learn More",
  photo: "/assets/img/purple-events/face/cvready/photo.jpg",
  photoAlt: "",
  fillingIcon: "/assets/img/purple-events/face/cvready/filling-fast.gif",
  heartIcon: CVREADY_HEART_FILLED
} as const;

export const CVREADY_FACE_OPEN: CvreadyFaceCard = {
  id: "cvready-open-1",
  status: "open",
  ...CVREADY_FACE_BASE
};

/** Closed — desk `1:1532` · mob `1:3246` · wash + green plate */
export const CVREADY_FACE_CLOSED: CvreadyFaceCard = {
  id: "cvready-closed-1",
  status: "closed",
  ...CVREADY_FACE_BASE,
  closedLabel: "Closed on June 15 – 46 students registered"
};
