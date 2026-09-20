/**
 * Shared #Pgs picks. One component. Pages import this.
 * Courses come from the existing CMS surface `pgs_picks`. Not a second table.
 * Later switch replaces About and any other page that draws this row.
 * Do not switch those pages until that gate.
 * Desktop `17055:12930`. Phone `433:4740`.
 */
export const PGS_PICKS = {
  heading: "#Pgs picks",
  emptyMessage:
    "No picks yet. Enable “#Pgs picks” on a published course in CMS to show it here.",
  prevLabel: "Previous pick",
  nextLabel: "Next pick",
  prevIconSrc: "/assets/img/pgs-picks/arrow-left.svg",
  nextIconSrc: "/assets/img/pgs-picks/arrow-right.svg"
} as const;

export type PgsPicksCard = {
  id: string;
  href: string;
  cta: string;
  blurb: string;
  blurbMobile?: string;
  imageSrc: string;
  imageAlt: string;
};

/** Drawn card from the shared pre-footer. Shown only until CMS has a real pick. */
const FIXTURE_BLURB =
  "Reach out to us on our helpline for quick bookings with our experts, fast answers to your doubts, and anything else you need on your study abroad journey.We’ve also got separate mentor groups just for medical and non-medical courses—so you’re always connected with the right people.";

export const PGS_PICKS_FIXTURE: PgsPicksCard[] = [1, 2, 3, 4].map((n) => ({
  id: `fixture-${n}`,
  href: "",
  cta: "For Clinical Rotation Click Here",
  blurb: FIXTURE_BLURB,
  blurbMobile: "Reach out to us.",
  imageSrc: "/assets/img/pgs-picks/card.jpg",
  imageAlt: ""
}));
