/** Scholarship (#purpleScholarships) fixtures — S1–S7. Desktop `17041:18349` · mobile `323:3396`. */

export const SCHOLARSHIP_HERO = {
  title: "#PGS Scholarship Guide",
  lead: "Personalized help to get the scholarships that actually fit you. We help you zero in on the ones that make sense for you, based on your profile and the path you’re aiming for.",
  /** Desktop subtitle (Figma `17041:18732`). */
  subtitleDesktop: "For Medical, STEM, and More, We’ll Guide You Through It",
  /** Mobile footnote (Figma `323:3417`). */
  subtitleMobile: "*For Medical, STEM, and More, We offer guidance.",
  ctaLabel: "Book Your Free Scholarship Call",
  ctaHint: "Clear All Your Doubts in 30 Minutes, Figure out your scholarship path.",
  panelBrandLine1: "Step into",
  panelBrandLine2: "#purplepremium",
  panelTag: "For Scholarships",
  trustLine: "Backed by experience. Trusted by students since 2006 (formerly CEG).",
  heroImageSrc: "/assets/img/scholarship/hero-premium.jpg",
  heroImageAlt: "Student wearing headphones studying at a cafe table"
} as const;

/** S2 — intro + examples + Myth/Truth. Desktop `17041:18758`/`18761`/`18770` · mobile `325:3468`/`3471`/`3501`. */
export const SCHOLARSHIP_INTRO = {
  checkIconSrc: "/assets/img/scholarship/check-green.svg",
  paragraphs: [
    {
      parts: [
        {
          text: "Scholarships are one of the best ways to reduce the cost of studying abroad. ",
          emphasis: false
        },
        {
          text: "And when you land a well-known one, it doesn’t just save money, it makes your profile stand out!",
          emphasis: true
        }
      ]
    },
    {
      parts: [
        {
          text: "There are all kinds of scholarships available : merit-based, need-based, university-specific, and even ones offered through government tie-ups between countries.",
          emphasis: false
        }
      ]
    }
  ],
  examplesHeading: "For example -",
  examples: [
    { label: "India–USA:", detail: " Fulbright-Nehru Master's Fellowship" },
    { label: "India–UK:", detail: " Chevening Scholarship" },
    { label: "India–Japan:", detail: " MEXT (Monbukagakusho) Scholarship" }
  ],
  mythTruthHeading: "What Most Students Get Wrong",
  myth: {
    badge: "Myth",
    mark: "❌",
    markLabel: "Incorrect",
    text: "Scholarships are only for top students."
  },
  truth: {
    badge: "Truth",
    mark: "✅",
    markLabel: "Correct",
    text: "There are scholarships for all types of profiles, from academics to financial need, leadership to volunteering, and even creative or sports backgrounds."
  }
} as const;

/** S3 — scenario cards. Desktop `17041:18767`/`19044` · mobile `328:3149`. */
export const SCHOLARSHIP_SCENARIOS = {
  heading: "We’ve added a few common student scenarios below",
  lead: "These are about 90% of the scholarship requests we typically receive.We’ve added a few notes below to help guide you on how to move forward with each one.",
  note: "The top 6 above are the most common topics and we're pretty sure you've been thinking about them too.",
  gradingIconSrc: "/assets/img/scholarship/icon-grading.svg",
  checkIconSrc: "/assets/img/scholarship/check-green.svg",
  arrowSrc: "/assets/img/scholarship/arrow-scenarios.svg",
  cards: [
    {
      n: 1,
      question:
        "I have top grades and extracurriculars, is there a way to cover full tuition?",
      tip: "Let’s check merit-based and academic excellence scholarships."
    },
    {
      n: 2,
      question: "I scored well, but can’t afford full tuition.",
      tip: "You might qualify for a need-based or partial fee waiver scholarship."
    },
    {
      n: 3,
      question:
        "I’ve done community service and volunteering, does that count?",
      tip: "You might qualify for a need-based or partial fee waiver scholarship."
    },
    {
      n: 4,
      question:
        "I’m applying to a specific university. Do they have their own scholarships?",
      tip: "Most universities do. We help you apply for in-house scholarships too!"
    },
    {
      n: 5,
      question: "I have a sports/art background. Can I apply for that?",
      tip: "Yes, some schools offer sports, cultural, or talent-based scholarships."
    },
    {
      n: 6,
      question: "I already got an admit. Is it too late to apply for scholarships?",
      tip: "Not always, we’ll check post-admit and rolling deadlines for you."
    }
  ]
} as const;

/** S4 — plan strip + process copy + checklist. Desktop `17041:18785`/`18793` · mobile `328:3150`/`3166`. Find CTA → S5 (Figma order). */
export const SCHOLARSHIP_PLAN = {
  planTitle: "get Your Personalized Scholarship Plan",
  applyLine: "apply with #PGS",
  heartSrc: "/assets/img/scholarship/plan-heart.gif",
  heartAlt: "",
  checkIconSrc: "/assets/img/scholarship/check-green.svg",
  paragraphs: [
    "At #PGS, we don't believe in giving you a list of scholarships to apply and hope for the best.",
    "We've built our own proven process through real student cases.",
    "First, we understand your profile and get a rough idea of where you stand. Then we shortlist the scholarships that actually might work for you. From there, we work backwards (we call it reverse engineering), shaping your documents, profile and fitting scholarship eligibility requirements."
  ],
  checklistLead:
    "It's a system that works. And it's what makes our students stand out. We have listed few key steps below.",
  checklist: [
    "Analyze your academic background, work experience (if any), and achievements",
    "Create a target list of scholarships",
    "Create a timeline for each scholarship deadline",
    "Help tailor each application to specific scholarship requirements",
    "Connect you with previous scholarship recipients",
    "Track application progress and deadlines",
    "Address any concerns or roadblocks",
    "& More"
  ]
} as const;

/** S5 — steps cards + testimonial + Find CTA. Desk `17041:18807`/`18835`/`18804` · mob `328:3201`/`331:3250`/`331:3262`. */
export const SCHOLARSHIP_STEPS = {
  heading: "steps involved in your scholarship application",
  tickIconSrc: "/assets/img/scholarship/tick-in-box.svg",
  steps: [
    {
      label: "Step 1",
      title: "Get Onboard and get to know your scholarship options",
      bullets: ["Profile evaluation"]
    },
    {
      label: "Step 2",
      title: "Shortlist & Mentor Discussion",
      bullets: [
        "Shortlist top 5 scholarships options.",
        "Add more across different scholarship types,  not just struck on above 5."
      ]
    },
    {
      label: "Step 3",
      title: "Apply, track & Wait",
      bullets: [
        "Prepare application & docs",
        "Make sure you are covering all the eligible points.",
        "Prep for the results!"
      ]
    }
  ],
  testimonial: {
    photoSrc: "/assets/img/scholarship/testimonial-raina.jpg",
    photoAlt: "Scholarship student outdoors",
    quote:
      "I’ve picked up a really valuable skill set that makes my CV stand out. I realized you don’t always have to keep applying everywhere—you can actually focus on improving your current application, make it stronger and more efficient, and seriously boost your chances of getting selected.",
    name: "Raina Venkatesh",
    role: "Research Fellow",
    location: "Maryland, USA",
    quoteIconSrc: "/assets/img/scholarship/quote-mark.svg",
    arrowLeftSrc: "/assets/img/scholarship/arrow-left-circle.svg",
    arrowRightSrc: "/assets/img/scholarship/arrow-right-circle.svg",
    pageLabel: "Page 1"
  },
  find: {
    support:
      "Don’t worry if it feels overwhelming. We’ve helped 100s of students apply.",
    ctaLabel: "Let’s Find Your Scholarships",
    /** Desk `17041:18780` · mob `331:3272` — beside Find CTA with arrow. */
    disclaimer:
      "Because of the lengthy timeline and time commitment involved, we're currently providing full scholarship application support only for our existing students and #PurplePremium members. However, we do offer introductions and profile checks for all applicants so they don't miss out on opportunities.",
    arrowSrc: "/assets/img/scholarship/arrow-scenarios.svg"
  }
} as const;

/**
 * S6 — FAQ tabs + accordion. Desk `17041:18838` · mob `331:3296`/`331:3329`.
 * Figma only ships Basics Q&A #1 fully. Q2 answer + Process/Timeline panels: empty until owner copy (no invent).
 */
export type ScholarshipFaqItem = {
  question: string;
  answer: string;
};

export type ScholarshipFaqTab = {
  id: string;
  label: string;
  items: ScholarshipFaqItem[];
};

export const SCHOLARSHIP_FAQ: {
  heading: string;
  plusIconSrc: string;
  minusIconSrc: string;
  defaultTabId: string;
  defaultOpenIndex: number;
  tabs: ScholarshipFaqTab[];
} = {
  heading: "Things you should know",
  plusIconSrc: "/assets/img/scholarship/faq-plus.png",
  minusIconSrc: "/assets/img/scholarship/faq-minus.png",
  defaultTabId: "basics",
  defaultOpenIndex: 0,
  tabs: [
    {
      id: "basics",
      label: "The Basics",
      items: [
        {
          question: "Who can apply for scholarships?",
          answer:
            "Scholarships are available for students and professionals looking to study abroad, whether you're pursuing undergraduate, graduate, or professional development programs. Each scholarship has specific eligibility criteria based on academic background, field of study, and career goals."
        },
        {
          question: "Are scholarships 100% guaranteed?",
          // Figma closed row only — answer deferred (legacy Hostinger text was placeholder junk).
          answer: ""
        }
      ]
    },
    {
      id: "process",
      label: "Application Process",
      items: []
    },
    {
      id: "timeline",
      label: "Application timeline",
      items: []
    }
  ]
};

/**
 * S7 + SM — batch tips carousel. Desk `17041:18860` · mob `331:3275`.
 * Figma only ships one slide; slides[1]/[2] repeat that copy until owner replaces (no invent).
 */
export const SCHOLARSHIP_BATCH = {
  headingMobile: "Useful Tips for Your Journey",
  arrowLeftSrc: "/assets/img/scholarship/batch-arrow-left.svg",
  arrowRightSrc: "/assets/img/scholarship/batch-arrow-right.svg",
  slides: [
    {
      badge: "2025 Batch",
      text: "We’ve already seen students get $2000-$6000 covered from their tuition fee in current batch."
    },
    {
      badge: "2025 Batch",
      text: "We’ve already seen students get $2000-$6000 covered from their tuition fee in current batch."
    },
    {
      badge: "2025 Batch",
      text: "We’ve already seen students get $2000-$6000 covered from their tuition fee in current batch."
    }
  ]
} as const;
