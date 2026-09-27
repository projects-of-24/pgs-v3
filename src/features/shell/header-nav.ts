/**
 * Public header nav map — Figma IA (HEADER-CHROME-PHASE.md).
 * Starters + stubs; CMS-managed lists filled later.
 * H1 = labels only; dropdown panels = H2+.
 */
export type HeaderNavLink = {
  label: string;
  href: string;
  /** Placeholder until owner page / CMS row exists */
  stub?: boolean;
};

export const HEADER_NAV = {
  brandHref: "/",
  feed: { label: "#feed", href: "/student/dashboard" },
  premium: {
    label: "#purplePremium",
    /** Primary overview — menu items in H2 */
    overviewHref: "/purplepremiumhome",
    items: [
      { label: "OVERVIEW", href: "/purplepremiumhome" },
      {
        label: "Short Term Abroad",
        href: "/short-term-abroad",
        stub: true,
      },
      { label: "STEM, MBA & Other Paths", href: "/purplenonmedical" },
      { label: "USMLE", href: "/purpleusmle" },
      { label: "AMC", href: "/purpleamc" },
    ] satisfies HeaderNavLink[],
  },
  cvReady: {
    label: "#cvReadyPrograms",
    /** Starter — CMS may change later */
    items: [
      { label: "explorePrograms", href: "/cvreadyprogram" },
      { label: "freeMasterClass", href: "/free-masterclass", stub: true },
      {
        label: "Semester Abroad for students",
        href: "/semester-abroad",
        stub: true,
      },
      {
        label: "HARVARD- Internship",
        href: "/harvard-internship",
        stub: true,
      },
    ] satisfies HeaderNavLink[],
  },
  cvMedical: {
    label: "#cvForMedical",
    items: [
      {
        label: "Surgery Week Scotland - Jan 27",
        href: "/surgery-week-scotland",
        stub: true,
      },
      { label: "USMLERotation", href: "/usmlerotation" },
    ] satisfies HeaderNavLink[],
  },
  me: {
    label: "#me",
    /** CMS courses/events — not a page link. Fixtures = Figma 19070:15287 */
    title: "Upcoming",
    fixtures: [
      {
        badge: "Join Free",
        badgeTone: "join-free",
        index: 1,
        title: "study abroad live with ANJAY",
        href: "/study-abroad-live",
        stub: true,
      },
      {
        badge: "Few Seats left",
        badgeTone: "few-seats",
        index: 2,
        title: "How to get PhD approved? Lets discuss",
        href: "/phd-approved",
        stub: true,
      },
      {
        badge: "Few Seats left",
        badgeTone: "few-seats",
        index: 3,
        title: "How to get PhD approved? 2 Lets discuss",
        href: "/phd-approved-2",
        stub: true,
      },
      {
        badge: "Few Seats left",
        badgeTone: "few-seats",
        index: 4,
        title: "Surgery Week Scotland for MBBS students",
        href: "/surgery-week-scotland",
        stub: true,
      },
    ] as const,
  },
  studyAbroad: {
    label: "#studyAbroad",
    items: [
      {
        label: "contactCounsellor",
        href: "/contact-counsellor",
        stub: true,
      },
      {
        label: "admissionToolKit",
        href: "/admission-toolkit",
        stub: true,
      },
    ] satisfies HeaderNavLink[],
  },
  joinPgs: {
    label: "join #PGS",
    /** New page — stub until owner Figma page; expect 404 for now */
    href: "/join-pgs",
    stub: true,
    heartSrc: "/assets/img/heart.gif",
  },
  login: { label: "login", href: "/login" },
  logout: { label: "Logout" },
  /** Preview lab fake avatar (owner-supplied) */
  labAvatarSrc: "/assets/img/figma-header/lab-avatar.jpg",
  notifications: {
    href: "/notifications",
    ariaLabel: "Notifications",
    clearAllLabel: "Clear All",
    /** Figma 19070:15287 fixtures — full notifications domain later */
    fixtures: [
      { title: "mentor commented in feed", time: "1 hour ago" },
      { title: "you got an offer letter!", time: "1 day ago" },
      { title: "#PGS loop-board moved", time: "27th Aug 2026" },
      { title: "doc is requested by your mentor", time: "1st Aug 2026" },
    ] as const,
  },
} as const;
