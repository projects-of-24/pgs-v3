/**
 * CV Ready Program page fixtures — CR1+.
 * Desk Figma `19050:11977` · Mob `19055:12530`.
 */

export const CVREADY_PROGRAM_HERO = {
  title: "Courses That Actually Count",
  body: "This section covers everything from short-term courses, internships, and clinical visit programs to English language classes, confidence-building sessions, and more. We made this page to help you find things that not only look good on your CV but also actually help you grow, explore new things, and feel more ready for what’s next."
} as const;

/**
 * CR-OPEN — Hero video. Desk frame `19054:15075` 1322×533.
 * Owner clip in `hero/desk.mp4` (Website_desktop · 1520×840) for desk + mob.
 * Backend later: separate desk/mob URLs.
 */
export const CVREADY_PROGRAM_VIDEO = {
  /** Desk + mob — owner asset `public/assets/img/cvready-program/hero/desk.mp4`. */
  videoDeskSrc: "/assets/img/cvready-program/hero/desk.mp4?v=owner-20260924b",
  /** Same clip until CMS separate mob upload. */
  videoMobSrc: "/assets/img/cvready-program/hero/desk.mp4?v=owner-20260924b",
  posterDeskSrc: "/assets/img/cvready-program/hero/poster-desk.png?v=owner-20260924b",
  posterAlt: "",
  titleLines: ["push", "your", "goals"] as const,
  frameDeskW: 1322,
  frameDeskH: 533,
  /** Mob plate `19055:13342`. */
  frameMobW: 270,
  frameMobH: 418
} as const;

/** CR2 — Filter / Sort chips + hint. Visual select only (no catalog filter yet). */
export const CVREADY_PROGRAM_FILTER = {
  filterLabel: "Filter:",
  sortLabel: "Sort:",
  filterChips: [
    "#all",
    "#mba",
    "#USMLE",
    "#engg",
    "#nursing",
    "#science",
    "#UGMedical",
    "#rest"
  ] as const,
  sortChips: ["#all", "#events", "#madeForPathway", "#cvReadyPrograms"] as const,
  defaultFilter: "#all",
  defaultSort: "#all",
  /** Opening rebase `19050:12043` desk · `19055:12562` mob — no “Filter out above”. */
  hintText: "select a pre selected group below.",
  arrowSrc: "/assets/img/cvready-program/filter-arrow.svg",
  arrowAlt: ""
} as const;

/**
 * CR3 — Pre-selected tag groups. Figma sample labels only; real groups come
 * from catalog `tags[]` in the backend pass (more will be added).
 */
export const CVREADY_PROGRAM_PRESETS = {
  label: "Pre-selected groups",
  hashIconSrc: "/assets/img/cvready-program/preset-hash.svg",
  groups: [
    "Nursing",
    "Engineering",
    "MBA",
    "Confidence Building",
    "Physiotherapy",
    "All Medical",
    "Masters",
    "English",
    "USMLE",
    "PLAB",
    "AMC",
    "STEM"
  ] as const
} as const;

/**
 * CR4 — Our Top PARTNERS logo strip.
 * Fixture logos until CMS partner table (mirror finance / premium-home).
 */
export const CVREADY_PROGRAM_PARTNERS = {
  titleLead: "Our Top",
  titleBadge: "Partners",
  logos: [
    {
      name: "ESGCI",
      src: "/assets/img/cvready-program/partners/esgci.png",
      width: 94,
      height: 29
    },
    {
      name: "Paris School of Business",
      src: "/assets/img/cvready-program/partners/psb.png",
      width: 77,
      height: 29
    },
    {
      name: "Golden Gate University",
      src: "/assets/img/cvready-program/partners/ggu.png",
      width: 188,
      height: 29
    },
    {
      name: "Liverpool Business School",
      src: "/assets/img/cvready-program/partners/lbs.png",
      width: 43,
      height: 29
    },
    {
      name: "Liverpool John Moores University",
      src: "/assets/img/cvready-program/partners/ljmu.png",
      width: 98,
      height: 29
    },
    {
      name: "Edgewood College",
      src: "/assets/img/cvready-program/partners/edgewood.png",
      width: 105,
      height: 29
    }
  ] as const
} as const;

/**
 * CR5 — #purpleSelected featured rail.
 * Face: Pair 4 `internship` (owner). Fixtures until catalog `cvready_featured`.
 */
export const CVREADY_PROGRAM_FEATURED = {
  heading: "'#purpleSelected' Explore Our Most Wanted Courses",
  cardCount: 3,
  faceLayout: "internship" as const
} as const;

/**
 * CR6d — Discover Our Programs.
 * Pair 10 `program_compact_sm_desk` only (desk Pair 9 · mob Pair 6).
 * UT-style pager: Mob 2×3 (6) · Desk 4×2 (8) · arrows.
 * Client search on tags + title (catalog DB later).
 */
export const CVREADY_PROGRAM_DISCOVER = {
  titleLead: "Discover",
  titleBadge: "Our Programs",
  searchLabel: "Search programs",
  searchPlaceholderDesk: "Hinted search text",
  searchPlaceholderMob: "Search Programs Here",
  searchIconSrc: "/assets/img/cvready-program/search.svg",
  menuIconSrc: "/assets/img/cvready-program/menu.svg",
  /** Pair 10 fixtures (course then event) so desk/mob have >1 page. */
  cardCountCourse: 5,
  cardCountEvent: 5,
  /** Mob / interim: 2 cols × 3 rows. */
  pageSizeMob: 6,
  /** Desk >1366: 4 cols × 2 rows. */
  pageSizeDesk: 8,
  prevLabel: "Previous programs",
  nextLabel: "Next programs",
  arrowLeftSrc: "/assets/img/purple-events/arrow-left-circle.svg",
  arrowRightSrc: "/assets/img/purple-events/arrow-right-circle.svg"
} as const;

/**
 * CR7 — Photo bento (stats + photos).
 * Desk `19050:12204` · Mob `1312:7916`. No faces.
 */
export const CVREADY_PROGRAM_BENTO = {
  rows: [
    {
      id: "cv-boost",
      layout: "stat-photo" as const,
      stat: "4/5",
      lines: ["Of our students got", "a cv boost with our courses"] as const,
      photoSrc: "/assets/img/cvready-program/bento/speaker.jpg",
      photoAlt: ""
    },
    {
      id: "profile-fit",
      layout: "photo-stat" as const,
      stat: "100%",
      lines: [
        "Of our programs are created towards student’s profile"
      ] as const,
      photoSrc: "/assets/img/cvready-program/bento/student.jpg",
      photoAlt: ""
    }
  ] as const
} as const;

/**
 * CR8 — #by target + Pair 11 rail.
 * Desk `19053:14303` · intro `19053:14304` · arrows `19054:15100`.
 * Mob `1312:8500` · arrows `1318:8862`.
 * Face: Pair 11 `calendar_session_photo`. Chips visual only.
 * Rail: one horizontal row + pager arrows (not 2×2 wrap).
 */
export const CVREADY_PROGRAM_BY_TARGET = {
  title: "#by target",
  bodyLines: [
    "Choose your field. Learn the",
    "workflows, judgment and tools",
    "reshaping it."
  ] as const,
  chips: [
    "USMLE",
    "AMC",
    "Data Analyst",
    "Ai",
    "Business Leader",
    "Digital Marketer"
  ] as const,
  defaultChip: "USMLE",
  /** Enough for >1 page on desk (4) and mob (2). */
  cardCountOpen: 7,
  cardCountClosed: 1,
  /** Mob / interim: ~2 Pair 11 in view. */
  pageSizeMob: 2,
  /** Desk >1366: 4 Pair 11 in view. */
  pageSizeDesk: 4,
  sectionLabel: "Section 1",
  prevLabel: "Previous section",
  nextLabel: "Next section",
  arrowLeftSrc: "/assets/img/purple-events/arrow-left-circle.svg",
  arrowRightSrc: "/assets/img/purple-events/arrow-right-circle.svg",
  faceLayout: "calendar_session_photo" as const
} as const;

/**
 * CR9 — Free #studyJam yellow panel.
 * Face: Pair 4 `internship` (owner). Fixtures until catalog `cvready_studyjam`.
 * Desk `19050:12137` · Mob `1312:7937` — ignore Figma courses short.
 */
export const CVREADY_PROGRAM_STUDYJAM = {
  heading: "Begin Your Journey: Explore with a Free #studyJam",
  cardCount: 3,
  faceLayout: "internship" as const
} as const;

/**
 * CR10 — How to make best use of #PGS programs.
 * Desk `19050:12221` · Mob `1312:8007`.
 * 4 bar slides: each swaps tip title + bullets + image.
 * Slide 1 = Figma. Slides 2–4 = lorem fixtures until owner supplies copy/art.
 */
export const CVREADY_PROGRAM_HOWTO = {
  eyebrowLead: "How to make best use of ",
  eyebrowHash: "#PGS",
  eyebrowTail: " programs",
  title: "We are mapped for your Education Goals",
  slides: [
    {
      id: "path",
      tabLabel: "Slide 1",
      tipTitle: "Discover Your Path",
      tips: [
        {
          lead: "Explore handpicked CV-ready programs (internships, research, projects) matched to your future goal; whether it’s ",
          bold: "med school, MBA, a top STEM course & more."
        },
        {
          lead: "Get real feedback from our counsellors.",
          bold: null
        }
      ],
      imageSrc: "/assets/img/cvready-program/howto/slide-1.jpg",
      imageAlt: "Student walking outdoors with location overlay"
    },
    {
      id: "lorem-2",
      tabLabel: "Slide 2",
      tipTitle: "Lorem Ipsum Dolor",
      tips: [
        {
          lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          bold: null
        },
        {
          lead: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          bold: null
        }
      ],
      imageSrc: "/assets/img/cvready-program/howto/slide-2.jpg",
      imageAlt: ""
    },
    {
      id: "lorem-3",
      tabLabel: "Slide 3",
      tipTitle: "Consectetur Adipiscing",
      tips: [
        {
          lead: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          bold: null
        },
        {
          lead: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          bold: null
        }
      ],
      imageSrc: "/assets/img/cvready-program/howto/slide-3.jpg",
      imageAlt: ""
    },
    {
      id: "lorem-4",
      tabLabel: "Slide 4",
      tipTitle: "Sed Ut Perspiciatis",
      tips: [
        {
          lead: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          bold: null
        },
        {
          lead: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
          bold: null
        }
      ],
      imageSrc: "/assets/img/cvready-program/howto/slide-4.jpg",
      imageAlt: ""
    }
  ]
} as const;
