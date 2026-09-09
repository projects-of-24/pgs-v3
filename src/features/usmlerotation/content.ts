/**
 * USMLE Rotation preview content — Figma V6 + legacy copy (no invented marketing).
 * Nodes: hero 18760:12302 · live 18760:12380/11390 · pitch 18760:12388/11398 · what-is 18760:12397 + 12399
 */

export type UsmleSuccessStory = {
  name: string;
  specialty: string;
  institution: string;
};

export type UsmleLiveItem = {
  name: string;
  achievement: string;
  meta: string;
};

export const USMLE_ROTATION_HERO = {
  title: "usa Clinical Rotations",
  withPgs: "with #PGS",
  subtitle:
    "Real-World U.S. Clinical Experiences That Prepare You for the Match",
  joinHeading: "Join Successful IMGs",
  stats: [
    { value: "98%", label: "Match Success" },
    { value: "70+", label: "Medical Specialities" },
  ] as const,
  ctaLabel: "Secure Your Spot Now",
  guarantees: [
    "Free Consultation",
    "48hr Acceptance",
    "Money Back Guarantee*",
  ] as const,
  storiesHeading: "Recent Success Stories",
  stories: [
    {
      name: "Dr. Karthik Talukdar",
      specialty: "Internal Medicine",
      institution: "John Hopkins University",
    },
    {
      name: "Dr. Raghav Singh",
      specialty: "Internal Medicine",
      institution: "John Hopkins University",
    },
    {
      name: "Dr. Raghav Singh",
      specialty: "Internal Medicine",
      institution: "John Hopkins University",
    },
    {
      name: "Dr. Vigneshwara Neel",
      specialty: "Internal Medicine",
      institution: "John Hopkins University",
    },
    {
      name: "Dr. Abhinav Sastri",
      specialty: "Internal Medicine",
      institution: "John Hopkins University",
    },
  ] satisfies UsmleSuccessStory[],
  tickerLine1: "Last 24 hours: 23 students enrolled,",
  tickerLine2: "8 got matched!",
  /** Single-line ticker for mobile density */
  tickerCombined:
    "Last 24 hours: 23 students enrolled, 8 got matched!",
} as const;

export const USMLE_ROTATION_LIVE_ACTIVITY = {
  heading: "Live Activity",
  items: [
    {
      name: "Priya M.",
      achievement: "Got Clinical at Johns Hopkins",
      meta: "#PGS | Batch 3, Class of 2025",
    },
    {
      name: "Priya M.",
      achievement: "Got observership approved",
      meta: "#PGS | Batch 3, Class of 2025",
    },
    {
      name: "Priya M.",
      achievement: "Got accepted to Johns Hopkins",
      meta: "#PGS | Batch 3, Class of 2025",
    },
  ] satisfies UsmleLiveItem[],
} as const;

/** Figma desktop 18760:12388 · mobile 18760:11398 */
export const USMLE_ROTATION_IMG_PITCH = {
  headingLine1: "For International Medical Graduates (IMGs) going to the USA,",
  headingLine2: "clinical rotations are your chance to",
  /** Mobile: single paragraph (Figma 18760:11399) */
  headingCombined:
    "For International Medical Graduates (IMGs) going to the USA, clinical rotations are your chance to",
  points: [
    {
      num: "01",
      text: "See how real medicine is practiced across U.S. hospitals",
    },
    {
      num: "02",
      text: "Work hands-on with real patients and supervising doctors",
    },
    {
      num: "03",
      text: "Understand hospital systems, EMRs, and clinical protocols",
    },
    {
      num: "04",
      text: "Show residency programs you're skilled, focused, and ready",
    },
    {
      num: "05",
      text: "Get U.S. LoRs that truly support your residency journey",
    },
  ] as const,
} as const;

/**
 * explore Rotations — course catalog cards from CMS.
 * Desktop 18760:12476 · mobile 18760:11461.
 */
export const USMLE_ROTATION_EXPLORE = {
  heading: "explore Rotations",
  listCtaLead: "Click Here",
  listCtaSub: "for entire list",
  /** Legacy anchor — full catalog later may point at /programsfull. */
  listHref: "#rotations-list",
  emptyMessage:
    "No courses available yet. Courses added in admin will appear here.",
} as const;

/** Figma What is 18760:12397/12398 · Benefits visual 18760:12399 */
export const USMLE_ROTATION_WHAT_IS = {
  title: "What is a Clinical Rotation or Clinical Experience?",
  body: "A clinical rotation is when a medical student or graduate works in a real hospital or clinic as part of their medical training. You rotate through different specialties like internal medicine, surgery, pediatrics, psychiatry, etc., to get hands-on experience with real patients under the guidance of licensed doctors.",
  benefitsHeading: "IMG Benefits",
  benefits: [
    "Experience with US medical protocols",
    "Understanding of US healthcare delivery system",
    "Networking with attending physicians and residents",
    "Letters of Recommendation from US physicians",
    "Preparation and teamwork skills",
    "Improved medical terminology and skills",
  ] as const,
  ctaLines: ["Be part", "of the successful Match", "stories"] as const,
  collageAlt: "Doctors in clinical training",
} as const;

/**
 * Grey student hero + Why Pick Us.
 * Desktop 18760:12434 · mobile 18766:11912 (owner-added).
 */
export const USMLE_ROTATION_PICK_US = {
  titleLines: [
    "start your usa",
    "clinical experience",
    "the right way.",
  ] as const,
  photoAlt: "Student preparing for USA clinical experience",
  whyHeading: "Why Medical Students & Doctors Pick Us",
  cards: [
    {
      title: "Trusted Support",
      body: "With over 15 years of prior clinical placement experience you can trust in our guidance.",
    },
    {
      title: "LoR",
      body: "Earn LORs on hospital based letterhead from hands-on experiences & academically affiliated physicians.*",
    },
    {
      title: "Visa Guidance",
      body: "Request a Program Acceptance Letter that can support your visa application and get a full refund if denied.",
    },
    {
      title: "Plan Your Visit",
      body: "We'll align with your school's curriculum so you won't have to worry about class schedules clashing with your US rotation.",
    },
    {
      title: "Lower Pricing",
      body: "Smart paperwork, and strong connections, help us lock in your clinical rotations, faster and at a lower cost.",
    },
  ] as const,
} as const;

/** Figma Book Your USCE: desktop 18760:12557 · mobile 18760:11574 */
export const USMLE_ROTATION_STEPS = {
  title: "Book Your USCE in 3 Easy Steps – with #PGS",
  ctaLabel: "Secure Your Spot Now",
  items: [
    {
      label: "Step 1",
      titleLines: [
        "Get Onboard and get",
        "to know your rotation",
        "options",
      ] as const,
      bullets: [
        "Click the “Secure Your Spot” button on this page to fill out and submit our application form.",
        "After reviewing & verifying your application, we will send you a link to book a free introductory meeting.",
        "Or if you are part of #purple premium or counselor will chart a plan and connect with you.",
      ] as const,
    },
    {
      label: "Step 2",
      titleLines: ["Schedule", "&", "Get Approved"] as const,
      bullets: [
        "This is the part we know your goals and give you rotation suggestions based on it.",
        "After our initial meeting, our team will dive deep into your specific situation to craft a personalized rotation plan.",
        "You’ll receive a clear, detailed list with all the deadlines, available options, and exactly what’s included.",
      ] as const,
    },
    {
      label: "Step 3",
      /** Figma typo “Expereince” preserved until owner asks to fix. */
      titleLines: ["Lock in your", "U.S Clinical", "Expereince"] as const,
      bullets: [
        "Once you've reviewed your rotation plan and it feels right for your goals, we'll guide you through securing those spots.",
        "Make sure to review with your mentor or connect with our help team if any doubts come up—we're here for you.",
        "Prep for your journey!",
      ] as const,
    },
  ] as const,
} as const;

/**
 * Elevate / #PurplePremium.
 * Desktop Figma 18760:12771 · mobile 18760:11600+.
 * Owner: fix Figma typos (guidance / dashboard); chart = fresh Figma export.
 */
export const USMLE_ROTATION_PREMIUM = {
  eyebrow: "Elevate Your Rotation with",
  title: "#PurplePremium",
  optional: "optional but recommended",
  introHeading: "Our full mentorship suite built for serious USMLE aspirants.",
  introBody:
    "Want the full toolkit? Combine your USCE with #PurplePremium — From form support and study planning to LORs and mentorship—we help you stay on track, stress less, and prep for the Match.",
  slogan: "Your rotations + our roadmap = match-ready confidence.",
  callout:
    "IMGs face tougher odds, #PurplePremium helps level that playing field.",
  checks: [
    "Get guidance with ECFMG, and other journey related forms, step by step.",
    "Build your CV, plan your journey, and stay organized with our purple #loopboard",
    "Full access to your personal dashboard",
    "Detailed journey roadmap customized for you.",
    "Plus, unlock exclusive access to top-tier clinical rotations",
    "& More",
  ] as const,
  onlineLead: "with #pgs you get Fully Online Approach -",
  onlineSupport: "Supported by Information Centers & Offline Events*",
  libertyAlt: "Statue of Liberty",
  journeyAlt: "Built Around Your USMLE Journey — Scalable roadmap chart",
} as const;

/**
 * Pricing for US clinical rotations.
 * Desktop Figma 18760:12618 + blocks 1–4 (18760:12654 / 12670 / 12680 / 12721).
 * Mobile type cards: horizontal snap-scroll (same pattern as 3 Easy Steps).
 */
export const USMLE_ROTATION_PRICING = {
  title: "pricing for us clinical rotations",
  body: "Every student’s journey takes time, attention, and real mentorship. That’s why we limit the number of students each batch —so our experts can actually guide, not just supervise.",
  fee: {
    amount: "$200",
    star: "*",
    inr: "(or equivalent in INR)",
    badge: "Rotation Application Fee",
    notes: [
      "* Our rates for USCE depend on the institution and the type of rotation you're doing: whether it's hands-on, inpatient, tele-rotation, externships, or Multiple Planned Rotations. After your introductory meeting, we'll send you a customized pricing and hospital list.",
      "It typically ranges from $1,800 to $3,800 per rotation.",
    ] as const,
  },
  block1: {
    n: "1",
    rows: [
      { label: "Program Fee Starts From", value: "$1800" },
      { label: "Full In-Patient", value: "$2200 - $3800*" },
      {
        label: "Multiple Planned Rotations.",
        value: "$800+ off",
        strike: "800+",
      },
    ] as const,
    body: "For USMLE aspirants, we typically recommend three USCE experiences to boost your profile. You can do them across multiple timelines or back-to-back as a stretch. Connect with your mentor or help section to guide you better—and when you do all three, you get a price discount.",
    footnote: "*this is the typical max fee for our participating institutions.",
  },
  block2: {
    n: "2",
    lines: [
      "All rotations are 4 weeks long unless otherwise mentioned.",
      "Slots usually fill up in advance, so plan ahead to lock in your preferred dates.",
    ] as const,
  },
  block3: {
    n: "3",
    checks: [
      { text: "Clinical placement with verified US preceptors" },
      { text: "Weekly progress check-ins" },
      { text: "Letter of Recommendation (on request)" },
      { text: "Visa Support Letter (on request)" },
      { text: "Admin & documentation support ", bold: "(by #PGS)" },
      { text: "VISA application guidance ", bold: "(by #PGS)" },
      {
        text: "Exclusive access to alumni community & future sessions ",
        bold: "(by #PGS)",
      },
      { text: "Be added to a prep group* ", bold: "(by #PGS)" },
      { text: "& More" },
    ] as const,
  },
  block4: {
    n: "4",
    headers: {
      type: "Type of Rotation",
      price: "Price Range*",
      involves: "What It Involves",
    },
    rows: [
      {
        type: "In-Patient Rotation",
        price: "$3000 – $3800",
        involves: "Full-time at a hospital, includes care exposure.",
      },
      {
        type: "Hands-On Rotation",
        price: "$2200 – $3200",
        involves: "Direct patient interaction—clinic or hospital based.",
      },
      {
        type: "Externship",
        price: "$2400 – $3400",
        involves: "Post-graduation USCE.",
      },
      {
        type: "Visa Cost",
        price: "$1800 – $2800",
        involves: "Observe and learn via online hospital interactions.",
      },
    ] as const,
  },
  approxNote:
    "* Prices listed are approximate: we make sure our students get the best possible rates.",
} as const;

/**
 * A word from Our learners — Figma desktop 18760:12855 · mobile 18760:11795.
 * Desktop cards use Figma quote lengths; mobile uses full quote on each card.
 */
export const USMLE_ROTATION_TESTIMONIALS = {
  lead: "A word from",
  badge: "Our learners",
  bodyBefore: "Also at ",
  bodyBoldPgs: "#PGS",
  bodyMid: ", we believe that with the right prep, skills, and a solid game plan, most students ",
  bodyBold3x: "3x their portfolio ",
  bodyAnd: "and",
  bodyBoldSkills: " gain real-world skills",
  bodyAfter: " along the way.",
  quoteIconAlt: "",
  photoAlt: "Learner portrait",
  cards: [
    {
      quote:
        "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere—you can actually focus on improving your current application, make it stronger and more efficient, and seriously boost your chances of getting selected.",
      quoteDesktop:
        "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere—you can actually focus on improving your current application, make it stronger and more efficient, and seriously boost your chances of getting selected.",
      name: "Raina Venkatesh",
      role: "Research Fellow",
      location: "Maryland, USA",
    },
    {
      quote:
        "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere—you can actually focus on improving your current application, make it stronger and more efficient, and seriously boost your chances of getting selected.",
      quoteDesktop:
        "I’ve picked up a really valuable skill set that makes my CV stand out.",
      name: "Raina Venkatesh",
      role: "Research Fellow",
      location: "Maryland, USA",
    },
    {
      quote:
        "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere—you can actually focus on improving your current application, make it stronger and more efficient, and seriously boost your chances of getting selected.",
      quoteDesktop:
        "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere.",
      name: "Raina Venkatesh",
      role: "Research Fellow",
      location: "Maryland, USA",
    },
  ] as const,
} as const;

/**
 * Docs / expense request — owner C band-split.
 * Desktop Figma 18760:12899 (DOCUMENTATION REQUIREMENTS…).
 * Mobile Figma 18760:11839 (Need a detailed expense…).
 */
export const USMLE_ROTATION_DOCS_REQUEST = {
  desktop: {
    title: "DOCUMENTATION REQUIREMENTS FOR USCE",
    cta: "Request it here",
    inbox: "— we’ll send it straight to your inbox.",
    body: "Getting ready for your clinicals takes more than just applying. From health checks and background checks to BLS, HIPAA, insurance, and ID badges — the paperwork’s real. Add in housing, travel, and fees, and it takes a couple of months to line it all up. Plan ahead. We’ll send you the full checklist — just ask.",
  },
  mobile: {
    titleLines: [
      "Need a detailed expense",
      "breakdown for your ",
      "journey?",
    ] as const,
    cta: "Request it here",
    inbox: "— we’ll send it straight to your inbox.",
    body: "Whether you're just getting started or planning ahead for all three steps, knowing the costs involved can help you make better decisions. From registration fees and travel expenses to prep materials and clinical rotations — we’ve mapped out the full journey. Just drop a request and get a clear picture of what to expect, without surprises.",
  },
  doctorAlt: "Doctor reviewing documentation",
  portraitAlt: "Student with phone",
  ctaHref: "#",
} as const;

/**
 * Outro CTA — desktop Figma 18760:12971 · mobile 18760:11855.
 */
export const USMLE_ROTATION_OUTRO = {
  eyebrow: "Let's Go",
  title: "Ready to get started?",
  bodyBefore: "Let’s chart your study abroad path, together with ",
  bodyBold: "Team #PGS.",
  cta: "Start Your Journey",
  ctaHref: "#",
} as const;

/**
 * #StudentSupportHub — Call Us / Email Us.
 * Desktop Figma 18760:12913 · mobile 18760:11862.
 * Email: owner A — connect@purpleguide.study (not Figma desktop typo).
 */
export const USMLE_ROTATION_SUPPORT_HUB = {
  brand: "#PGS",
  hubLabel: "#StudentSupportHub",
  callLabel: "Call Us",
  emailLabel: "Email Us",
  phoneDisplay: "91 95665 66298",
  phoneHref: "tel:+919566566298",
  emailDisplay: "connect@purpleguide.study",
  emailHref: "mailto:connect@purpleguide.study",
  blurb:
    "Reach out on our helpline for fast bookings, expert advice, and answers to all your study abroad questions. We’ve also got dedicated mentor groups for medical and non-medical courses—so you’re always connected to the right people.",
} as const;

/**
 * #Pgs picks — CMS surface `pgs_picks` → /programsfull/program/{id}.
 * Desktop 18760:12936 · mobile 18760:11885.
 */
export const USMLE_ROTATION_PICKS = {
  heading: "#Pgs picks",
  emptyMessage:
    "No picks yet. Enable “#Pgs picks” on a published course in CMS to show it here.",
} as const;
