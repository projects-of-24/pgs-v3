/**
 * Shared enroll card. One component. Pages pass their own fixture at the copy gate.
 * Do not invent PLAB / AMC copy here. USMLE uses this fixture.
 * Desktop `17055:12822` + `17055:12823` + access `17055:12810`.
 * Phone card `551:10708` / `433:4614`. Spelling stays, including ₹ 65,0000.
 */
export const PREMIUM_ENROLL = {
  title: ["Start Your USMLE journey", "With #purplePremium"],
  lead: "Every student’s journey takes time, attention, and real mentorship. That’s why we limit the number of students each batch —so our experts can actually guide, not just supervise.",
  offerLabel: "Get Started at discounted price",
  badge: "35% off",
  price: "₹ 65,0000",
  was: "was ₹99,998",
  enroll: "Enroll Now",
  includedTitle: "What’s Included when you sign up:",
  includedLead:
    "A 10-point journey built by seeing what USMLE aspirants really go through—and what kind of support actually makes a difference.",
  checkSrc: "/assets/img/premium-enroll/check.svg",
  accessIconSrc: "/assets/img/premium-enroll/access-icon.svg",
  accessDesktop: [
    "You get full access for a year—and even after that, we’re still here when you need us.",
    "From Step 1 to Step 2, we’ve got the tools, tips, and real guidance to back you up."
  ],
  accessPhone:
    "You get full access for a year and even after that, we’re still here when you need us. From Step 1 to Step 2, we’ve got the tools, tips, and real guidance to back you up.",
  columns: [
    [
      {
        label: "A well-researched journey checklist with:",
        details: ["Recommended books & Qbanks", "Miro planning board (aka your prep roadmap)"]
      },
      { label: "We guide you through all the important forms" },
      { label: "Monthly 1:1 feedback sessions" },
      { label: "Conference invites in the USA (yep, poster chances too)" },
      { label: "Help building a CV that stands out" }
    ],
    [
      { label: "VISA application guidance" },
      { label: "Help in preparing your clinical rotation journey" },
      { label: "Be added to a prep group*" },
      {
        label: "Plan & publish your research",
        note: "as a team, we will guide you for it.*"
      },
      { label: "& More" }
    ]
  ]
} as const;

export type PremiumEnrollContent = {
  variant?: "price" | "card";
  learnMore?: string;
  title: readonly [string, string];
  lead: string;
  offerLabel: string;
  badge: string;
  price: string;
  was: string;
  enroll: string;
  includedTitle: string;
  includedLead: string;
  checkSrc: string;
  accessIconSrc: string;
  accessDesktop: readonly [string, string];
  accessPhone: string;
  columns: readonly (readonly {
    label: string;
    details?: readonly string[];
    note?: string;
    phoneLabel?: string;
  }[])[];
};

/**
 * USMLE alternative (owner Figma 2026-10-02): desktop `19157:13859`, phone `19153:13827`.
 * One black card (title + lead + Learn More) replaces the white intro + price card. No price on this variant.
 * PLAB / AMC keep the default fixture until their own pass. Learn More is visual only (backend pass wires it).
 */
export const PREMIUM_ENROLL_CARD: PremiumEnrollContent = {
  ...PREMIUM_ENROLL,
  variant: "card",
  learnMore: "Learn More",
  columns: [
    [
      PREMIUM_ENROLL.columns[0][0],
      PREMIUM_ENROLL.columns[0][1],
      PREMIUM_ENROLL.columns[0][2],
      { ...PREMIUM_ENROLL.columns[0][3], phoneLabel: "Conference invites (yep, poster chances too)" },
      PREMIUM_ENROLL.columns[0][4]
    ],
    PREMIUM_ENROLL.columns[1]
  ]
};
