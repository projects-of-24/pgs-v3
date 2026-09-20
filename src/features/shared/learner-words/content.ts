/**
 * Shared “A word from Our learners” — H6 / multi-page.
 * Desktop Figma premium-home `17052:8738` · Mobile `366:4375`.
 * Quote lengths differ on desk; phone Figma uses the full quote on every card.
 * Photo / body / quote / bio heights stay fixed (owner lock).
 */
export const LEARNER_WORDS = {
  lead: "A word from",
  badge: "Our learners",
  bodyBefore: "Also at ",
  bodyBoldPgs: "#PGS",
  bodyMid:
    ", we believe that with the right prep, skills, and a solid game plan, most students ",
  bodyBold3x: "3x their portfolio ",
  bodyAnd: "and",
  bodyBoldSkills: " gain real-world skills",
  bodyAfter: " along the way.",
  photoSrc: "/assets/img/learner-words/raina.jpg",
  photoAlt: "Learner portrait",
  quoteSrc: "/assets/img/learner-words/quote.svg",
  /** Phone Figma — same full quote on each card. */
  quoteMob:
    "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere—you can actually focus on improving your current application, make it stronger and more efficient, and seriously boost your chances of getting selected.",
  cards: [
    {
      quoteDesk:
        "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere—you can actually focus on improving your current application, make it stronger and more efficient, and seriously boost your chances of getting selected."
    },
    {
      quoteDesk: "I’ve picked up a really valuable skill set that makes my CV stand out."
    },
    {
      quoteDesk:
        "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere."
    }
  ] as const,
  /** Bio is fixed — same on every card; not driven by quote length. */
  bio: {
    name: "Raina Venkatesh",
    role: "Research Fellow",
    location: "Maryland, USA"
  }
} as const;
