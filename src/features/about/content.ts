/** About Us fixtures — A1+. Desktop `17057:13203` · mobile `508:8361`. */

export const ABOUT_HERO = {
  /** Mobile opening column (Figma `508:8370`). Desktop intro lands in A2. */
  opening:
    "PurpleGuide.study was built to be your go-to admission guidance hub. At our core, we're admission counselors, but we go way beyond that, we're the education portal you've been waiting for.",
  panelBrandLine1: "about",
  panelBrandLine2: "purpleguide.study",
  panelTag: "#PGS",
  trustLine:
    "Backed by experience. Trusted by students since 2006 (formerly CEG).",
  pgsNote: "our quick way of referring to purpleguide.study.",
  heroImageSrc: "/assets/img/about/hero-about.jpg",
  heroImageAlt:
    "Student with headphones eating at a sunlit cafe counter",
  arrowSrc: "/assets/img/about/arrow-pgs.svg"
} as const;

/** A2 — desktop intro `17057:13540` (mobile opening already in A1). */
export const ABOUT_INTRO = {
  lead: "PurpleGuide.study was built to be your go-to admission guidance hub. At our core, we're admission counselors, but we go way beyond that, ",
  emphasis: "we're the education portal you've been waiting for."
} as const;

type AboutLiveItem = {
  name: string;
  achievement: string;
  meta: string;
};

/** A2 — Live Activity. Desk `17057:13584` · mob `508:8768`. Figma repeats same card ×3. */
export const ABOUT_LIVE_ACTIVITY = {
  heading: "Live Activity",
  checkIconSrc: "/assets/img/about/live-check.svg",
  dotIconSrc: "/assets/img/about/live-dot.svg",
  items: [
    {
      name: "Priya M.",
      achievement: "Got accepted to Johns Hopkins",
      meta: "#PGS | Batch 3, Class of 2025"
    },
    {
      name: "Priya M.",
      achievement: "Got accepted to Johns Hopkins",
      meta: "#PGS | Batch 3, Class of 2025"
    },
    {
      name: "Priya M.",
      achievement: "Got accepted to Johns Hopkins",
      meta: "#PGS | Batch 3, Class of 2025"
    }
  ] satisfies AboutLiveItem[]
} as const;

type AboutWhyStat = {
  num: string;
  lines: readonly string[];
};

/** A3 — Why 98%. Desk `17057:13585` · mob `508:7678`. */
export const ABOUT_WHY = {
  title: "Why 98% of Our Students Get Accepted",
  iconSrc: "/assets/img/about/stat-icon.svg",
  iconInnerSrc: "/assets/img/about/stat-icon-inner.svg",
  stats: [
    { num: "01", lines: ["Custom Strategy ", "from Day One"] },
    { num: "02", lines: ["University Shortlisting That Makes Sense"] },
    { num: "03", lines: ["Separate medical or non-medical paths"] },
    { num: "04", lines: ["From deadlines to drafts, we track it all"] },
    {
      num: "05",
      lines: ["We guide you to build", "your profile"]
    }
  ] satisfies AboutWhyStat[]
} as const;

type AboutAudiencePart = {
  text: string;
  emphasis?: "bold" | "boldItalic";
};

type AboutAudienceRow = {
  who: readonly AboutAudiencePart[];
  what: readonly AboutAudiencePart[];
};

/** A4 — Who / What comparison. Desk `17084:12024` · mob `508:9095`/`511:5515`. */
export const ABOUT_AUDIENCE = {
  whoTitle: "Who is #PGS for?",
  whatTitle: "What we do for you",
  whatTitleMobileLines: ["What we do ", "for you "] as const,
  mobileNote: "in no particular order",
  mobileNoteArrowSrc: "/assets/img/about/arrow-order.png",
  switchTickSrc: "/assets/img/about/switch-tick.svg",
  rows: [
    {
      who: [
        {
          text: "Doctors planning their postgraduate pathway through USMLE (USA), AMC (Australia), or PLAB (UK)"
        }
      ],
      what: [
        { text: "Guidance and step-by-step planning for your medical path - " },
        { text: "USMLE, AMC, or PLAB", emphasis: "bold" }
      ]
    },
    {
      who: [
        {
          text: "Final-year students or recent grads exploring master’s abroad"
        }
      ],
      what: [
        {
          text: "The right approach to applying to top-ranked universities starts with checking your profile—"
        },
        {
          text: "profile review is one of our key steps",
          emphasis: "boldItalic"
        }
      ]
    },
    {
      who: [
        {
          text: "Students aiming for top-ranked global universities (UG or PG)"
        }
      ],
      what: [
        {
          text: "We make sure all forms are filled, deadlines met, and no last-minute mess-ups"
        }
      ]
    },
    {
      who: [
        {
          text: "Those figuring out their study abroad journey—have an aim, but stuck in the thought phase"
        }
      ],
      what: [
        {
          text: "We’ve partnered with universities for master’s programs too",
          emphasis: "boldItalic"
        },
        { text: "—we filter them out for you" }
      ]
    },
    {
      who: [
        {
          text: "Working professionals planning a master’s abroad to upgrade skills and boost career opportunities"
        }
      ],
      what: [
        {
          text: "To get into top-ranked universities, secure a medical residency/training spot, or win a scholarship, you need to build your CV - we make that happen"
        }
      ]
    }
  ] satisfies AboutAudienceRow[]
} as const;

/** A5 — USP strip. Desk `17057:13777`+`17057:13783` · mob `511:5549`. */
export const ABOUT_USP = {
  badge: "USP",
  copy: "Our unique dashboard and mentor approach allows you to keep tabs on your entire journey. (Note: Some features require #PurplePremium.)",
  arrowSrc: "/assets/img/about/subway-arrow.svg"
} as const;

/** A5 — Online-first. Desk `17057:13791` · mob `512:5595`.
 * OFF copy from Hostinger `#offlineContent` (legacy about). */
export const ABOUT_ONLINE = {
  switchKnobSrc: "/assets/img/about/online-switch-knob.svg",
  on: {
    headline: "with #pgs you get Fully Online first Approach - ",
    support: "Supported by Information Centers & Offline Events*",
    footnoteLead:
      "*All our offline events and visits be pre-notified. Or mentors will update you about them to you or if we are coming to your university get updates from your HOD or notice board, and also we’re setting up info centers for in-person support.",
    footnoteClose:
      "That said, our mentors and team stay accessible throughout your journey - that’s exactly why we’re fully online first in today’s digital-first world."
  },
  /** Hostinger `#offlineContent` — switch closed / unchecked. */
  off: {
    headline: "WITHOUT #PGS — EVERYTHING TAKES MORE EFFORT - ",
    support:
      "Deadlines aren’t always obvious. Steps aren’t always structured. And decisions feel heavier than they should.",
    footnote:
      "Deadlines aren’t always obvious. Steps aren’t always structured. And decisions feel heavier than they should."
  }
} as const;

/** A6 — Since 2006 note + history intro. Desk `17057:13800` · mob `517:5785`. */
export const ABOUT_HISTORY = {
  noteLabel: "note",
  year: "Since 2006",
  lead: "Let's talk about #PGS history - ",
  story:
    "This is our story, and it's exactly why we know how to get you where you want to go.",
  dotCloseSrc: "/assets/img/about/note-dot-close.svg",
  dotHideSrc: "/assets/img/about/note-dot-hide.svg",
  docIconSrc: "/assets/img/about/note-doc-icon.svg"
} as const;

type AboutTimelineChip = {
  text: string;
  emphasis?: "bold" | "black" | "mixed";
  /** Optional rich parts for mixed emphasis (Hostinger/Figma). */
  parts?: readonly { text: string; bold?: boolean }[];
};

type AboutTimelinePhase = {
  phase: string;
  title: string;
  titleLines?: readonly string[];
  titleHtml?: "pgs-aka";
  year: "2006" | "2011" | "2017" | "2020" | "2024" | "present";
  tagline?: string;
  chips: readonly AboutTimelineChip[];
  liveBadge?: string;
};

/** A7 — Evolution Timeline. Desk `17084:12025` · mob `517:5786`. */
export const ABOUT_TIMELINE = {
  title: "PurpleGuide.Study Evolution Timeline",
  subtitle: "Nearly Two Decades of Growth: From CEG to #PGS (2006–Present)",
  phaseCol: "Phase/Milestone",
  years: ["2006", "2011", "2017", "2020", "2024", "Present"] as const,
  footers: [
    "#CEG was the freelance, backend and networking phase",
    "#PGS is the organised journey phase for students"
  ] as const,
  phases: [
    {
      phase: "Phase 1",
      title: "CEG (Chennai Edu Guiydance)",
      titleLines: ["CEG (Chennai Edu ", "Guiydance)"],
      year: "2006",
      chips: [
        { text: "Foundation + Start of Journey" },
        {
          text: "Establishing as freelancer for multiple top 10 private UNIs based in Chennai"
        }
      ]
    },
    {
      phase: "Phase 2",
      title: "Domestic Expansion",
      titleLines: ["Domestic ", "Expansion"],
      year: "2011",
      chips: [
        { text: "Multi - City Counseling" },
        { text: "Partnerships" },
        { text: "Establishing Networks" }
      ]
    },
    {
      phase: "Phase 3",
      title: "Global reach",
      year: "2017",
      chips: [
        {
          text: "Visiting international universities and figuring out their teaching methodologies"
        },
        { text: "International Partnerships" },
        { text: "UG" },
        { text: "Masters" },
        { text: "Ranked Uni", emphasis: "black" },
        { text: "Medical Focus" },
        { text: "Post Graduation Medical Pathway", emphasis: "bold" },
        { text: "Study Abroad Focus" },
        { text: "Specialization" },
        { text: "Research" }
      ]
    },
    {
      phase: "Phase 4",
      title: "#PGS",
      year: "2020",
      chips: [
        {
          text: "Worked with Universities and freelance clients in EdTech, digging deep into student pain points. Guided many students at once — and loved watching them reach their dream institutes."
        },
        { text: "@purpleguide IG" },
        { text: "more research & connections" },
        {
          text: "We were helping students through our network even before the portal existed. #PGS Hub = smarter, organized approach to student support with expert guidance & strategic connections.",
          emphasis: "mixed",
          parts: [
            {
              text: "We were helping students through our network even before the portal existed. ",
              bold: true
            },
            {
              text: "#PGS Hub = smarter, organized approach to student support with expert guidance & strategic connections."
            }
          ]
        }
      ]
    },
    {
      phase: "Phase 4",
      title: "#PGS aka Purpleguide.study",
      titleHtml: "pgs-aka",
      year: "present",
      tagline: "the education portal you've been waiting for",
      chips: [
        {
          text: "purpleguide.study + counseling + connections + student insights + networking +mentor roadmap = your complete admission journey partner."
        }
      ],
      liveBadge: "We are live for students"
    }
  ] satisfies AboutTimelinePhase[]
} as const;

/** A8 — Meet The Founder. Desk `17057:14045` · mob `517:5787`. */
export const ABOUT_FOUNDER = {
  headingLead: "Meet The ",
  headingEm: "Founder",
  name: "Anjay Nilmek",
  title: "Counsellor & student strategist",
  connectLabel: "Connect with me at:",
  email: "anjay@purpleguide.study",
  imageSrc: "/assets/img/about/founder.png",
  imageAlt: "Anjay Nilmek, founder of PurpleGuide.Study",
  bio: [
    "Here's what I learned after nearly 20 years: Most students are flying blind on study abroad decisions that eventually cost them years, money and their aim+hunger to achieve. While you're figuring things out, deadlines are passing and seats are filling up.",
    "After working with universities, seeing education systems across different pathways and medical field, we've figured out what students want and what universities are looking for, or recruiters if they're on medical pathway.",
    "This led us to counsel hundreds of students and build real networks with partnered universities worldwide*.",
    "With #PGS - we've made this the only admission counseling hub and expert network for your study abroad journey. Every day you wait, another opportunity slips away.",
    "You don't have to figure this out alone. The study abroad journey needs proper planning, honest advice, and individual attention that actually cares about your goals.",
    "Our uniqueness is our expertise and individual attention to students across study paths - be it USMLE, PLAB or AMC or paths involving masters, STEM, MBA and more."
  ]
} as const;

/** A9 — our advisory team. Desk `17057:14056` · mob `517:5803`. */
export const ABOUT_ADVISORY = {
  title: "our advisory team",
  tabSrc: "/assets/img/about/advisory-tab.svg",
  members: [
    {
      name: "Mr Prabhakar",
      role: "Ex Dean (INTERNATIONAL ADMISISONS) srm SRMC",
      imageSrc: "/assets/img/about/advisory-photo.png"
    },
    {
      name: "Mr Prabhakar",
      role: "Ex Dean (INTERNATIONAL ADMISISONS) srm SRMC",
      imageSrc: "/assets/img/about/advisory-photo.png"
    },
    {
      name: "Mr Prabhakar",
      role: "Ex Dean (INTERNATIONAL ADMISISONS) srm SRMC",
      imageSrc: "/assets/img/about/advisory-photo.png"
    }
  ]
} as const;

/** A10 — #PGS in the news. Desk `17057:14089` · mob `517:5942`. */
export const ABOUT_NEWS = {
  title: "#PGS in the news",
  items: [
    {
      id: "livemint",
      outlet: "Livemint",
      logoSrc: "/assets/img/about/news-livemint.png",
      logoWidth: 138,
      logoHeight: 34,
      headerTone: "cream",
      quote:
        '"Sequoia India joins 126 crores round in overseas education startup Leap"'
    },
    {
      id: "techcrunch",
      outlet: "TechCrunch",
      logoSrc: "/assets/img/about/news-techcrunch.png",
      logoWidth: 186,
      logoHeight: 28,
      headerTone: "mint",
      quote:
        '"Leap raises $55 million to help Indian students study abroad"'
    },
    {
      id: "et",
      outlet: "Economic Times",
      logoSrc: "/assets/img/about/news-et.png",
      logoWidth: 54,
      logoHeight: 40,
      headerTone: "rose",
      quote: '"Leap raises 40 crores led by Sequoia India"'
    }
  ]
} as const;

/** A11 — The #PGS Ecosystem. Desk `17057:14392` · mob `517:5964`. */
export const ABOUT_ECOSYSTEM = {
  title: "The #PGS Ecosystem",
  subtitle: "10-Point Checklist of What You Actually get with us",
  tickSrc: "/assets/img/about/check-green.svg",
  left: [
    {
      title: "Personal Dashboard That Actually Works",
      body: "Track your applications, deadlines, and progress in one place"
    },
    {
      title: "Real Mentor Support",
      body: "Actual guidance when you're stuck on picking universities, profile building or medical pathway and all major hurdles related to your study abroad journey."
    },
    {
      title: "Custom Journey Roadmap",
      body: 'Your personalized path from "I want to study abroad" to "I got accepted" with clear next steps'
    },
    {
      title: "Medical Pathway Expertise",
      body: "USMLE, PLAB, AMC guidance that actually makes sense"
    },
    {
      title: "University Filtering That Fits You",
      body: "Figure out and apply to unis that match your profile, budget, and goals"
    },
    {
      title: "Document Prep Support",
      body: "Help with CVs and all major university applications or document verification 7 form fill up for medical pathway."
    }
  ],
  right: [
    {
      title: "Scholarship Guidance",
      body: "Find and apply for scholarships the right way (most students miss out just because they don't know how)"
    },
    {
      title: "Deadline Management",
      body: "Never miss another application deadline with automatic tracking and reminders"
    },
    {
      title: "Profile Building Strategy",
      body: "Upskill and strengthen your CV for better chances at top universities and residencies"
    },
    {
      title: "Visa & Documentation Checklist",
      body: "Step-by-step guidance so you don't mess up forms or miss requirements"
    }
  ]
} as const;

/** A12 — Outro CTA. Desk `17120:10437` · mob `517:6093`. Visual-only until popup pass. */
export const ABOUT_OUTRO = {
  eyebrow: "Let's Go",
  title: "Ready to get started?",
  bodyBefore: "Let’s chart your study abroad path, together with ",
  bodyBold: "Team #PGS.",
  cta: "Start Your Journey"
} as const;

type AboutFaqItem = { question: string; answer: string };
type AboutFaqTab = { id: string; label: string; items: AboutFaqItem[] };

/**
 * A13 — FAQ. Desk `17057:14559` · mob `517:6340`.
 * Programme Details = Figma desk rows. Learning / Refund empty (no invent).
 * Q2 answer empty (closed in Figma). Desk Q2 kept; mob scholarship paste ignored.
 */
export const ABOUT_FAQ: {
  heading: string;
  plusIconSrc: string;
  minusIconSrc: string;
  defaultTabId: string;
  defaultOpenIndex: number;
  tabs: AboutFaqTab[];
} = {
  heading: "Frequently Asked Questions",
  plusIconSrc: "/assets/img/about/faq-plus.png",
  minusIconSrc: "/assets/img/about/faq-minus.png",
  defaultTabId: "programme-details",
  defaultOpenIndex: 0,
  tabs: [
    {
      id: "programme-details",
      label: "Programme Details",
      items: [
        {
          question: "1. Who is this program for?",
          answer:
            "This program is aimed at medical professionals and students, who wish to get a global exposure and also can use as a valuable addition to your CV."
        },
        {
          question:
            "2. What kind of certification will I get after completion of this course?",
          answer: ""
        }
      ]
    },
    {
      id: "learning",
      label: "Programme Learning Experience",
      items: []
    },
    {
      id: "refund",
      label: "Refund Policy/Financials",
      items: []
    }
  ]
};
