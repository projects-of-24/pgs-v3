/** explore Countries fixtures — E1 hero + E2 country switcher + E3 bento. */

export const EXPLORE_COUNTRIES_HERO = {
  title: "Get Into Your Dream University Abroad with a Structured Workflow",
  lead: "Boost Your Chances of Selection 3X with Smart, Informed University Picks",
  subtitle: "For Medical, STEM, and More—We’ve Got You Covered",
  ctaLabel: "Set Up a Quick Call",
  ctaHint:
    "Clear All Your Doubts in 30 Minutes—Get Your Admission Workflow Sorted."
} as const;

/** E2 — primary country switcher. Desktop `17056:19694` · mobile card `466:7966` + chips `466:8007`. */
export type ExploreCountryOption = {
  id: string;
  /** Chip label as drawn in Figma (casing preserved). */
  label: string;
  /** “study in …” title lines (lowercase or Figma casing). */
  countryLines: readonly string[];
  href: string;
  /**
   * CTA badge code (desk authority). Secondary stack swaps
   * `{ctaCode} 101: What to Know` on chip click. Primary stack ignores this.
   */
  ctaCode?: string;
};

/** Desk chip order: USA → UK → nz → aus → CAN. Default = nz (Figma selected). */
export const EXPLORE_COUNTRIES_PRIMARY_DESK: readonly ExploreCountryOption[] = [
  {
    id: "usa",
    label: "USA",
    countryLines: ["united", "states"],
    href: "/countriesusa"
  },
  {
    id: "uk",
    label: "UK",
    countryLines: ["united", "kingdom"],
    href: "/countriesuk"
  },
  {
    id: "nz",
    label: "nz",
    countryLines: ["new", "zealand"],
    href: "/countriesnz"
  },
  {
    id: "aus",
    label: "aus",
    countryLines: ["australia"],
    href: "/countriesaus"
  },
  {
    id: "can",
    label: "CAN",
    countryLines: ["canada"],
    href: "/countriescanada"
  }
] as const;

/** Mob chip order differs: USA → NZ → UK → aus → CAN. */
export const EXPLORE_COUNTRIES_PRIMARY_MOB: readonly ExploreCountryOption[] = [
  EXPLORE_COUNTRIES_PRIMARY_DESK[0],
  EXPLORE_COUNTRIES_PRIMARY_DESK[2],
  EXPLORE_COUNTRIES_PRIMARY_DESK[1],
  EXPLORE_COUNTRIES_PRIMARY_DESK[3],
  EXPLORE_COUNTRIES_PRIMARY_DESK[4]
] as const;

export const EXPLORE_COUNTRIES_SWITCHER = {
  defaultId: "nz",
  studyIn: "study in",
  /** Legacy + Figma label stay “UK 101…”; only href swaps with chip (Hostinger parity). */
  ctaLabel: "UK 101: What to Know",
  photoSrc: "/assets/img/explore-countries/card-photo.png",
  photoAlt: "Student studying with headphones at a sunlit table",
  swipeSrc: "/assets/img/explore-countries/swipe-hint.gif",
  selectedBg: "#8d66ff"
} as const;

/**
 * E3 — bento. Desktop `17056:19564` · mobile `470:4751`.
 * Owner lock E3 mob A: bottom card keeps desk Fast-tracked copy (Figma mob was paste-dupe).
 * Mob tip joiner `&` · desk `+`. Mob check order differs from desk.
 */
export const EXPLORE_COUNTRIES_BENTO = {
  shortlist: {
    line1: "Smart\nshortlisting",
    plusDesk: "+",
    plusMob: "&",
    line2: "Profile deep-dive",
    iconSrc: "/assets/img/explore-countries/bento-shortlist.svg",
    iconAlt: ""
  },
  applications: {
    line1: "Fast-tracked\napplications",
    plusDesk: "+",
    plusMob: "&",
    line2: "Result-driven SOP",
    iconSrc: "/assets/img/explore-countries/bento-registration.svg",
    iconAlt: ""
  },
  title: "Simple, clear, useful",
  body: "Using our experience, feedback from students who made it, and insights from thousands of real applications we’ve built an approach that puts you, the student, at the center ❤️",
  checksDesk: [
    "Recommended QBanks, review books.",
    "Suggested mocks for your stage.",
    "Clinical Rotation Package"
  ] as const,
  checksMob: [
    "Clinical Rotation Package",
    "Suggested mocks for your stage.",
    "Recommended QBanks, review books."
  ] as const,
  exploreLines: ["explore", "more", "below"] as const,
  arrowSrc: "/assets/img/explore-countries/bento-arrow.svg",
  gradSrc: "/assets/img/explore-countries/bento-grad.png",
  gradAlt: "Graduate in cap and gown holding a diploma"
} as const;

/**
 * E4 — university discovery. Desktop `17056:19761` · Mobile intro `473:4836` + logos/collage under `466:7315`.
 * Page-local fork of Premium Home H7 DNA; reuses `premium-home/univ` assets.
 */
export const EXPLORE_COUNTRIES_UNIV = {
  title:
    "Discover Top Universities in Every Country — With Scholarships & Fee Waivers",
  lead: "Explore our global university tie-ups and map out your perfect path — we’re here to guide you.",
  journey: "Your College Journey Starts Here",
  bullets: [
    "500+ University Tie-ups",
    "20+ years experienced Mentors",
    "Current Student as Mentors"
  ] as const,
  logos: [
    { src: "/assets/img/premium-home/univ/dorset.png", alt: "Dorset College" },
    {
      src: "/assets/img/premium-home/univ/dundalk.png",
      alt: "Dundalk Institute of Technology"
    },
    { src: "/assets/img/premium-home/univ/edc.png", alt: "EDC" },
    {
      src: "/assets/img/premium-home/univ/eidm.png",
      alt: "EIDM Fashion & Luxury School"
    },
    {
      src: "/assets/img/premium-home/univ/em-normandie.png",
      alt: "EM Normandie"
    },
    { src: "/assets/img/premium-home/univ/esaip.png", alt: "ESAIP" },
    {
      src: "/assets/img/premium-home/univ/esce.png",
      alt: "ESCE Business School"
    },
    { src: "/assets/img/premium-home/univ/esigelec.png", alt: "ESIGELEC" },
    { src: "/assets/img/premium-home/univ/esilv.png", alt: "ESILV" }
  ] as const,
  logoRowCount: 4,
  bulletCheckSrc: "/assets/img/premium-home/univ/bullet-check.svg",
  paths: "Medicine. engineering. Allied Health. masters.management",
  connectLines: [
    "Connect with our",
    "expert today and",
    "kickstart your",
    "study abroad journey!"
  ] as const,
  connectMob:
    "Connect with our expert today and kickstart your study abroad journey!",
  collageSrc: "/assets/img/premium-home/univ/collage.png",
  collageMobSrc: "/assets/img/premium-home/univ/collage-mob.png",
  collageAlt:
    "Program highlights: MBA, Engineering, Scholarship and Fee Waiver, 95% offer letters in under four weeks, 98% visa success, USMLE PLAB AMC paths"
} as const;

/**
 * E2b — secondary country switcher (Mauritius stack).
 * Desktop `17056:19615` · Mobile `471:4755` (card + chips only; second bento = next gate).
 * Default mur. CTA follows desk: `{CODE} 101: What to Know` swaps with chip.
 * Chip order desk = mob: ger → fra → mur → europe → others.
 */
export const EXPLORE_COUNTRIES_SECONDARY: readonly ExploreCountryOption[] = [
  {
    id: "ger",
    label: "ger",
    countryLines: ["germany"],
    href: "/countriesgermany",
    ctaCode: "GER"
  },
  {
    id: "fra",
    label: "fra",
    countryLines: ["france"],
    href: "/countriesfrance",
    ctaCode: "FRA"
  },
  {
    id: "mur",
    label: "mur",
    /** Desk Figma title casing */
    countryLines: ["Mauritius"],
    href: "/countriesmauritius",
    ctaCode: "MUR"
  },
  {
    id: "europe",
    label: "europe",
    countryLines: ["europe"],
    href: "/countrieseurope",
    ctaCode: "EUROPE"
  },
  {
    id: "others",
    label: "others",
    countryLines: ["others"],
    href: "/countriesothers",
    ctaCode: "OTHERS"
  }
] as const;

export const EXPLORE_COUNTRIES_SWITCHER_SECONDARY = {
  defaultId: "mur",
  studyIn: "study in",
  photoSrc: "/assets/img/explore-countries/card-photo.png",
  photoAlt: "Student studying with headphones at a sunlit table",
  swipeSrc: "/assets/img/explore-countries/swipe-hint.gif",
  selectedBg: "#8d66ff",
  ctaSuffix: "101: What to Know"
} as const;
