/** Finance (#purpleFinance) fixtures — F1–F5. Figma desktop `17041:17378` · mobile `217:5249`. */

export const FINANCE_HERO = {
  cardLead: "Get matched with student loan offers that work for you.",
  ctaLabel: "Check Your Eligibility",
  titleLine1: "Secure Your Abroad Education",
  titleLine2: "Loan starting at 8.33%*",
  heroImageSrc: "/assets/img/finance/hero-library.jpg",
  heroImageAlt: "Student studying in a library",
  checkIconSrc: "/assets/img/finance/check-green.svg",
  bullets: [
    "Check your eligibility on your own terms.",
    "Explore & compare top banks and NBFCs in one go",
    "We've got funding tie-ups based on your requirement and destination",
    "We cover 50+ countries including UK, USA, Australia, Germany & more",
    "& More"
  ]
} as const;

/** Figma logos instance `17041:17714` — fixture fallback until CMS `image_asset_id` is set.
 * Suggested CMS upload: 280×80 px PNG/WebP (140×40 @2x), transparent, under ~100 KB.
 */
export const FINANCE_PARTNER_LOGOS = [
  { name: "Spotify", src: "/assets/img/Spotify.png" },
  { name: "Google", src: "/assets/img/Google-2.png" },
  { name: "Pinterest", src: "/assets/img/Pinterest.png" },
  { name: "Stripe", src: "/assets/img/Stripe.png" },
  { name: "Reddit", src: "/assets/img/Reddit.png" }
] as const;

/** Suggested logo asset size for CMS uploads (display ~140×40). */
export const FINANCE_PARTNER_LOGO_IMAGE_HINT =
  "280×80 px PNG/WebP (or 140×40 @2x), transparent background, under ~100 KB.";

/** Figma funding story `17041:17738` · mobile `217:5315`. Title = two lines (desktop + mobile). */
export const FINANCE_FUNDING = {
  titleLine1: "Your study plan’s ready.",
  titleLine2: "Is your funding too ?",
  paragraphs: [
    "Sorting out your finances for studying abroad isn’t always simple.",
    "Whether you’ve got some funds ready or plan to repay after landing a job, it’s still a big step.",
    "With rising conversion rates and high overseas tuition, even students who’ve saved up find themselves needing a little extra support. And for those relying on loans, blindly applying without a game plan usually leads to delays, rejections, or poor interest terms."
  ],
  checklistLead: "That’s why we at #PGS built a dedicated funding support team to",
  checklist: [
    "Understand your eligibility",
    "Plan your finances smartly (not just apply randomly)",
    "Get access to both secured and unsecured loans",
    "Whether you're partially funded, fully funded, or exploring loan options"
  ],
  statsHeading: "Join Thousands Who Secured Their Study Abroad Loan",
  stats: [
    { value: "₹50L+", label: "Loans Sanctioned", sub: "This Month" },
    { value: "9.85%", label: "Avg Interest Rate", sub: "Secured + Unsecured" }
  ]
} as const;

/** Figma Talk CTA `17041:17765` · mobile `323:2780`. Desktop: link sits on line 2. */
export const FINANCE_TALK = {
  titleLine1: "Not sure where to",
  titleLine2: "begin?",
  ctaLabel: "Talk to our funding team today!"
} as const;

/**
 * Figma FAQ `17041:17716` · mobile `323:2781`.
 * Questions match Figma; answers from Hostinger live copy (Figma body was placeholder repeat).
 */
export const FINANCE_FAQ = {
  heading: "FAQ’s",
  defaultOpenIndex: 4,
  items: [
    {
      question: "How should I plan my study abroad journey for a smooth experience?",
      answer:
        "More sessions coming up for Medical & STEM aspirants — reach out to our counsellors. More sessions coming up for Medical & STEM aspirants — reach out to our counsellors."
    },
    {
      question: "How should I plan my study abroad journey for a smooth experience?",
      answer:
        "We deliver customized marketing campaign to use your audience to make a positive move."
    },
    {
      question: "How should I plan my study abroad journey for a smooth experience?",
      answer:
        "We deliver customized marketing campaign to use your audience to make a positive move."
    },
    {
      question: "How should I plan my study abroad journey for a smooth experience?",
      answer:
        "We deliver customized marketing campaign to use your audience to make a positive move."
    },
    {
      question: "How should I plan my study abroad journey for a smooth experience?",
      answer:
        "How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience How should I plan my study abroad journey for a smooth experience"
    }
  ]
} as const;
