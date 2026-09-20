/**
 * Courses template (`detail_template = courses`) — fixtures.
 * Desk Figma `# programs full` `17071:15293` · Mob `#programs full` `551:9015`.
 * C1 fills hero. Later gates add fields. No DB.
 */
export type ProgramsCoursesDateParts = {
  day: string;
  month: string;
  year: string;
  time: string;
};

/** C2 green-chip columns — desk Figma `17072:10641` */
export type ProgramsCoursesDescColumn = {
  title: string;
  /** One or more highlighter body chips (paragraph strings) */
  bodies: string[];
};

export type ProgramsCoursesFixture = {
  id: string;
  /** Bebas plate lines */
  titleLines: string[];
  /** Subhead next to dates */
  whoIsItFor: string;
  whoForNote: string;
  partnership: string;
  typeLabel: string;
  typeValue: string;
  durationLabel: string;
  durationValue: string;
  fillingBadge: string;
  fillingIcon: string;
  modeLabel: string;
  tags: string[];
  locationNote: string;
  bookingCta: string;
  bookingUrl: string;
  heroImage: string;
  heroImageAlt: string;
  partnerLogo: string;
  shareIcon: string;
  start: ProgramsCoursesDateParts;
  end: ProgramsCoursesDateParts;
  /** C2 — Who's It For? | Topics (desk + mob chips; mob copy may differ) */
  description: {
    left: ProgramsCoursesDescColumn;
    right: ProgramsCoursesDescColumn;
  };
  /** C2 mob-only title/body overrides when Figma wording differs from desk */
  descriptionMobile?: {
    left: ProgramsCoursesDescColumn;
    right: ProgramsCoursesDescColumn;
  };
  /** C3 — Program Description card · desk `17072:10678` */
  programDescription: {
    titleLines: string[];
    body: string;
    icon: string;
  };
  /** C4 — explore Program Highlights · desk `17072:10698` */
  highlights: {
    title: string;
    icon: string;
    items: { num: string; body: string }[];
  };
  /** C5 — green chip + checks · desk `17072:10893` */
  checks: {
    chip: string;
    items: string[];
    icon: string;
  };
  /** C5 mob overrides · `551:9103` */
  checksMobile?: {
    chip: string;
    items: string[];
    icon: string;
  };
  /** C6 — brochure plate · desk `17072:11029` */
  brochure: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    /** Empty = visual CTA only until real PDF URL */
    downloadUrl: string;
    badgeLabel: string;
    translateIcon: string;
  };
  /** C7 — awarding body · frame `17072:11083` (C7a–e) */
  awarding: {
    title: string;
    body: string;
    logo: string;
    logoAlt: string;
    photo: string;
    photoAlt: string;
    /** Mob photo crop · `551:10304` */
    photoMobile?: string;
    /** C7c fact stack · `17072:11052` */
    facts: { title: string; body?: string }[];
    /** C7d rankings card · `17072:11068` */
    rankings: {
      titleLines: string[];
      bodies: string[];
    };
    /** C7e accreditation · `17072:11074` */
    accreditation: {
      titleLines: string[];
      logos: { src: string; alt: string; width: number; height: number }[];
    };
  };
  /** C8 — How to Apply · desk `17072:11084` */
  apply: {
    title: string;
    subtitle: string;
    eligibilityLabel: string;
    eligibilityChips: string[];
    /** C8b · `17072:11096` */
    optionLabel: string;
    arrowIcon: string;
    option1Steps: {
      title: string;
      /** Plain body, or use link fields for purple underline */
      body?: string;
      bodyBefore?: string;
      linkText?: string;
      linkHref?: string;
      bodyAfter?: string;
    }[];
    option2: {
      title: string;
      bodyBefore: string;
      linkText: string;
      linkHref: string;
      bodyAfter: string;
    };
  };
  /** C9 — Certificate plate · frame `17072:11503` · C9a `17072:11504` · C9b `17072:11523` */
  certificate: {
    headline: string;
    whyTitle: string;
    checkIcon: string;
    checks: string[];
    /** C9b mock card */
    mock: {
      ticket: string;
      programTitle: string;
      nameLabel: string;
      nameValue: string;
      dateLabel: string;
      dateValue: string;
      awardingLabel: string;
      awardingValue: string;
      seal: string;
    };
  };
  /** C11 — Enrollment Fee · frame `17072:11555` · C11a `17072:11558` · C11b `17072:11577` */
  enroll: {
    title: string;
    subtitle: string;
    price: string;
    ctaLabel: string;
    /** Empty = visual CTA only until payment wire */
    ctaHref: string;
    accessBadge: string;
    earlyBird: string;
    /** C11b */
    breakdownTitle: string;
    checkIcon: string;
    breakdownLeft: { text: string; bold?: string }[];
    breakdownRight: { text: string; bold?: string }[];
    otherExpensesTitle: string;
    housingLabel: string;
    housingPrice: string;
    housingApprox: string;
    paymentTitle: string;
    paymentBody: string;
  };
};

export const PROGRAMS_COURSES_FIXTURE: ProgramsCoursesFixture = {
  id: "fixture-surgery-week-rcsed",
  titleLines: ["SURGERY WEEK IN RCSED - SCOTLAND UK", "JULY 2025"],
  whoIsItFor:
    "A One-Week Surgical Program for Medical Students and Young Doctors",
  whoForNote:
    "More sessions coming up for Medical & STEM aspirants — reach out to our counsellors.",
  partnership:
    "#PGS in partnership with the Royal College of Surgeons Edinburgh (RCSEd), Scotland, UK, presents an intensive Surgery Week for aspiring surgeons",
  typeLabel: "Type",
  typeValue: "Certificate",
  durationLabel: "Duration",
  durationValue: "7 Days",
  fillingBadge: "Filling Fast",
  fillingIcon: "/assets/img/programs-courses/fire.gif",
  modeLabel: "#inCampus",
  tags: ["#UK", "#Medical"],
  locationNote: "RCSEd, Edinburgh, Scotland, UK",
  bookingCta: "Book Your Seat",
  bookingUrl: "",
  heroImage: "/assets/img/programs-courses/hero-rcsed.jpg",
  heroImageAlt:
    "Royal College of Surgeons of Edinburgh building facade at dusk",
  partnerLogo: "/assets/img/programs-courses/rcsed-logo.jpg",
  shareIcon: "/assets/img/programs-courses/share.svg",
  start: { day: "31", month: "Dec", year: "25", time: "12pm to 2 pm" },
  end: { day: "01", month: "Jan", year: "26", time: "12pm to 2 pm" },
  description: {
    left: {
      title: "Who's It For?",
      bodies: [
        "Medical Intern? MBBS Grad? Preparing for PG? Those interested in General Surgery, Orthopaedics, or A&E Medicine",
        "This program is for you."
      ]
    },
    right: {
      title: "Program Topics",
      bodies: ["Consultant-led practical workshop on surgery."]
    }
  },
  descriptionMobile: {
    left: {
      title: "Who's It For?",
      bodies: [
        "Medical Intern? MBBS Grad? Preparing for PG? Those interested in General Surgery, Orthopaedics, or A&E Medicine",
        "This session's made for you."
      ]
    },
    right: {
      title: "Session Topics",
      bodies: ["Consultant-led practical workshop on surgery."]
    }
  },
  programDescription: {
    titleLines: ["Program", "Description"],
    body: "Planning a career in General Surgery, Ortho, or A&E? This hands-on program teaches you the must-know surgical skills, safe plaster techniques, and key anatomy essentials. Learn from expert surgeons and ortho techs, get real-time feedback, and earn a certificate that adds real value to your profile.",
    icon: "/assets/img/programs-courses/desc-icon.svg"
  },
  highlights: {
    title: "explore Program Highlights",
    icon: "/assets/img/programs-courses/highlight-icon.svg",
    items: [
      {
        num: "01",
        body: "Hands-on training in instrument handling, knot-tying, suturing, fine tissue manipulation, wound care, diathermy"
      },
      {
        num: "02",
        body: "Expert consultants deliver both theory and practice, blending anatomical precision with safe surgical techniques"
      },
      {
        num: "03",
        body: "Includes plaster application, non-operative fracture care pitfalls, led by orthopedic experts and plaster technicians"
      },
      {
        num: "04",
        body: "One-to-one supervision, formative assessments, and a participation certificate upon completion"
      }
    ]
  },
  checks: {
    chip: "And a few more to make sure you're on the right part.",
    icon: "/assets/img/programs-courses/check-ok.svg",
    items: [
      "Exclusive surgical exposure at RCSEd",
      "Delivered by skilled consultant surgeons",
      "Early-stage surgical skill-building",
      "Global certification from RCSEd",
      "Small group focus ensures personalized attention"
    ]
  },
  checksMobile: {
    chip: "And a few more to make sure you're on the right part.",
    icon: "/assets/img/programs-courses/check-ok.svg",
    items: [
      "Welcome Kit",
      "Live Q&A with Expert Counsellors",
      "Tips that you should know",
      "Goal-tracking and reflection chart",
      "Prep templates"
    ]
  },
  brochure: {
    title: "Need a downloadable course copy?",
    subtitle: "Grab the brochure and dive into the details.",
    ctaLabel: "Download Here",
    downloadUrl: "",
    badgeLabel: "Duolingo enthusiast",
    translateIcon: "/assets/img/programs-courses/translate.svg"
  },
  awarding: {
    title: "Learn more about the awarding body",
    body: "This program is officially awarded by [Name of Institution], a globally recognized institution known for its academic standards and real-world relevance.",
    logo: "/assets/img/programs-courses/awarding-logo.png",
    logoAlt: "The Royal College of Surgeons of Edinburgh",
    photo: "/assets/img/programs-courses/awarding-photo.png",
    photoMobile: "/assets/img/programs-courses/awarding-photo-mob.png",
    photoAlt:
      "Three people in ceremonial robes at the Royal College of Surgeons of Edinburgh",
    facts: [
      {
        title: "Founded in 1505",
        body: "One of the oldest surgical colleges in the world, with over 500 years of history."
      },
      {
        title: "Home of the UK’s First Surgical Trainer Faculty"
      },
      {
        title: "Expert-Led Training & Exams",
        body: "Offers MRCS, dental, anatomy, perioperative care, and surgical trainer certifications."
      },
      {
        title: "Global Reach",
        body: "Over 33,000 members worldwide in 100+ countries."
      }
    ],
    rankings: {
      titleLines: ["Rankings &", "Reputation"],
      bodies: [
        "Edinburgh’s Surgeons' Hall and RCSEd are touted globally as among the top surgical colleges—one of the world’s oldest and most respected surgical institutions",
        "Is backed by royal charter since 1778—recognized by global health systems and regulators."
      ]
    },
    accreditation: {
      titleLines: ["Accreditation", "and Membership"],
      logos: [
        {
          src: "/assets/img/programs-courses/accredit/ioe.png",
          alt: "Recognised as an Institution of Eminence by MHRD, Government of India",
          width: 115,
          height: 38
        },
        {
          src: "/assets/img/programs-courses/accredit/qs.png",
          alt: "QS World University Rankings",
          width: 115,
          height: 38
        },
        {
          src: "/assets/img/programs-courses/accredit/aiu.png",
          alt: "Association of Indian Universities",
          width: 38,
          height: 38
        },
        {
          src: "/assets/img/programs-courses/accredit/aacsb.png",
          alt: "AACSB Business Education Alliance Member",
          width: 92,
          height: 38
        },
        {
          src: "/assets/img/programs-courses/accredit/qs-igauge.png",
          alt: "QS I-GAUGE Diamond Indian University Rating",
          width: 90,
          height: 38
        }
      ]
    }
  },
  apply: {
    title: "How to Apply",
    subtitle:
      "The admission process for the 1-week surgical program can be completed in the following ways:",
    eligibilityLabel: "Eligibility",
    eligibilityChips: [
      "MBBS Students",
      "Medical Interns",
      "Surgeons aiming for global exposure",
      "Candidates preparing for global pathways"
    ],
    optionLabel: "Option",
    arrowIcon: "/assets/img/programs-courses/apply-arrow.svg",
    option1Steps: [
      {
        title: "Submit Application",
        bodyBefore: "Fill the form in the course intro button or ",
        linkText: "apply here",
        linkHref: "#",
        bodyAfter: ""
      },
      {
        title: "Wait for a follow up",
        body: "Get on a call with our counselor & clear doubts."
      },
      {
        title: "Get Payment Link",
        body: "Complete the payment, and get the welcome email"
      }
    ],
    option2: {
      title: "Pay via the enroll button",
      bodyBefore: "Skip the wait — pay directly in the Program Fee section ",
      linkText: "below",
      linkHref: "#pc-c11",
      bodyAfter: " to enroll and get your welcome email."
    }
  },
  certificate: {
    headline:
      "Upon successful completion, you’ll be awarded a certificate by RCSEd",
    whyTitle: "Why It Matters",
    checkIcon: "/assets/img/programs-courses/cert-check.svg",
    checks: [
      "Marks your hands-on surgical training & skill",
      "Recognized by hospitals & recruiters globally",
      "Adds real weight to your CV"
    ],
    mock: {
      ticket: "Certificate",
      programTitle: "Program Title",
      nameLabel: "Name",
      nameValue: "Your Name",
      dateLabel: "Date",
      dateValue: "Date Of Program",
      awardingLabel: "Awarding Body",
      awardingValue: "/* Awarding Body Name */",
      seal: "/assets/img/programs-courses/cert-seal.svg"
    }
  },
  enroll: {
    title: "Enrollment Fee",
    subtitle: "Surgery Week at RCSEd, Scotland",
    price: "GBP 1500",
    ctaLabel: "Enroll Now",
    ctaHref: "",
    accessBadge: "Includes full program access",
    earlyBird: "Early Bird Fee (valid till July 20)",
    breakdownTitle: "course breakdowns:",
    checkIcon: "/assets/img/programs-courses/cert-check.svg",
    breakdownLeft: [
      { text: "Intensive hands-on training at RCSEd" },
      { text: "Live sessions with global surgical experts" },
      { text: "Official RCSEd Certificate upon completion" },
      { text: "Study materials & surgical exam prep content" },
      {
        text: "Boosts your profile with a globally respected credential."
      },
      { text: "VISA application guidance ", bold: "(by #PGS)" },
      {
        text: "Exclusive access to alumni community & future sessions ",
        bold: "(by #PGS)"
      }
    ],
    breakdownRight: [
      { text: "Be added to a prep group* ", bold: "(by #PGS)" },
      { text: "& More" }
    ],
    otherExpensesTitle: "Other expenses (optional)",
    housingLabel: "Housing & Stay",
    housingPrice: "GBP 200",
    housingApprox: "*approx",
    paymentTitle: "Payment Methods",
    paymentBody: "Pay via Credit/Debit Card, UPI, or Bank Transfer"
  }
};
