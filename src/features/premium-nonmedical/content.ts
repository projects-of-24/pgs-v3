/**
 * #premiumNonMedical fixtures.
 * Desktop page `17055:9820`. Phone page `371:6442`.
 */

export const PREMIUM_NONMEDICAL_HERO = {
  titleLine1: "Get Into Your Dream University",
  titleLine2: "Abroad with a Structured Workflow",
  lead: "Boost Your Chances of Selection 3X with Smart, Informed University Picks",
  subtitle: "For Medical, STEM, and More—We’ve Got You Covered",
  ctaLabel: "Set Up a Quick Call",
  ctaHint: "Clear All Your Doubts in 30 Minutes—Get Your Admission Workflow Sorted.",
  panelBrandLine1: "Step into",
  panelBrandLine2: "#purplepremium",
  panelTagLine1: "For Masters, STEM",
  panelTagLine2: "UG, MBA & Others",
  panelTagPhone: "For UG, Masters, STEM, MBA & Others",
  trustLine: "Backed by experience. Trusted by students since 2006 (formerly CEG).",
  heroImageSrc: "/assets/img/premium-nonmedical/hero.png",
  heroImageAlt: "Student with headphones eating at a sunlit cafe counter"
} as const;

/** N2 — Why we built. Desktop `17055:10590` · phone `375:4118`. Figma copy, not rewritten. */
export const PREMIUM_NONMEDICAL_WHY = {
  titleLine1: "Why We Built #PurplePremium",
  titleLine2: "(And Why It Matters)",
  lead: "Let’s be real, figuring out your study abroad plans can totally drain you.",
  loops:
    "And while yes, technically you can do it yourself, but we’ve also seen too many students get stuck trying to figure everything out alone and end up stuck in endless loops. ",
  confusing: "It can feel confusing, full of forms, deadlines, and random advice from all sides.",
  miss: "They miss key steps, apply late, or pick a university just because someone said it was “good” without checking if it’s actually the right fit. Or worse, you finally reach the institution you aimed for, only to realize… this isn’t what you actually wanted in the first place.",
  stepsIn:
    "That’s exactly where this section steps in. Whether you’re going for a Master’s program, a competitive STEM undergrad, MBA, or any other path, we help you break it all down. We take time to understand your profile, goals, strengths (and gaps!), and guide you to build a solid application strategy. ",
  details:
    "From CV building and research projects to crafting a compelling story, we make sure you stay ahead of the game, because when it comes to top universities, every detail matters. ",
  standOut: "You don’t just want to apply, you want to stand out."
} as const;

/** N3 — comes-in. Same block shape as medical. Desktop `17055:10599` + `17055:10602` · phone `375:4180` + `375:4183`. */
export const PREMIUM_NONMEDICAL_COMES = {
  title: "This is where #purplePremium comes in.",
  lead: "Because not every journey needs the same map. Explore them below.",
  chipDeskLine1: "For all from — STEM,",
  chipDeskLine2: "Management, Design & More.",
  chipPhoneLine1: "For all from — UnderGraduation, Masters,",
  chipPhoneLine2: "STEM, Management, Design & More.",
  posterSrc: "/assets/img/premium-nonmedical/comes-poster.png",
  posterAlt: "Student with glasses reading a book",
  playLabel: "Play join #purplePremium",
  arrowSrc: "/assets/img/premium-nonmedical/comes-arrow.svg"
} as const;

/** N4 — path. Same block as medical U4. Headline is this page's Figma. Desktop `17055:10618` · phone `375:4198`. */
export const PREMIUM_NONMEDICAL_PATH = {
  pathLine1: "Your path.",
  pathLine2: "Let’s get started.",
  headline: "Getting into a ranked university or submitting a well-supported application. Matters. A lot.",
  body: "Let’s be real studying abroad isn’t just “another phase.” And it’s not just about taking classes. You’re chasing that high-paying job, aiming to build a global network, and picking up real skills that actually make you stand out.",
  recruiter: "You need to start thinking like a recruiter.",
  recruiterQuestion: "What are they going to see when they open your CV post-graduation?",
  stackLead: "You guessed it, it’s not just about the degree, it all stacks up.",
  points: [
    { label: "Where you studied.", color: "#0abf8c" },
    { label: "What you built.", color: "#eb0801" },
    { label: "Your experience level.", color: "#fbc55b" },
    { label: "Real-world projects.", color: "#cddc49" },
    { label: "Internships. Research papers.", color: "#3929a6" },
    { label: "Peer-reviewed publications.", color: "#8d66ff" }
  ],
  cardTitle: ["Study", "Abroad", "Pathway"],
  crossed: "un-planned",
  chosen: "well-researched",
  note: "It’s about launching your future. You owe it to yourself to do it right. And we’re here to make sure you do.",
  mark: "#pgs",
  arrowSrc: "/assets/img/premium-nonmedical/path-arrow.png"
} as const;

/** N5 — Fall 2025 intro. Desktop `17055:10738` + `17055:10741` through the button. Bentos are the next block. */
export const PREMIUM_NONMEDICAL_INTRO = {
  brand: "#purplePremium",
  family: "for non medical",
  headline: "Study Abroad Deadlines Sneak Up Fast",
  ticking: "Fall 2025 Is Already Ticking",
  move: "If you haven’t sorted your profile, picked your countries and unis, or planned your SOP yet… hey, no stress—but it’s definitely time to move!",
  goodNews: "Good News: #purplePremium Will Guide You the Rest of the Way.",
  ctaLabel: "Start Your #purplePremium Journey"
} as const;

/** N6 — bento mosaic. Desktop cards in `17055:10741`. Phone cards in `379:4363`. Quote and photo are the next block. */
export const PREMIUM_NONMEDICAL_NEEDS = {
  noteTitle: "Simple, clear, useful",
  noteBody:
    "Using our experience, feedback from students who made it, and insights from thousands of real applications we’ve built an approach that puts you, the student, at the center ❤️",
  sessionsTitle: "Book feedback sessions",
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  activeDay: 19,
  icons: {
    shortlist: "/assets/img/premium-nonmedical/bento/shortlist.svg",
    registration: "/assets/img/premium-nonmedical/bento/registration.svg",
    sessions: "/assets/img/premium-nonmedical/bento/sessions.svg",
    scholarship: "/assets/img/premium-nonmedical/bento/scholarship.svg",
    visa: "/assets/img/premium-nonmedical/bento/visa.svg"
  }
} as const;

export const PREMIUM_NONMEDICAL_CALENDAR = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31]
] as const;
