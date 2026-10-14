/**
 * Country destination template — content fixtures.
 * USA pilot (Figma iPad `26:2456`). Other countries = same slots, new fixture.
 */

export type CountriesDestinationHeroContent = {
  title: string;
  lead: string;
  subtitle: string;
  ctaLabel: string;
  /** Real nav link — owner C1 “and link” */
  ctaHref: string;
  /** Portrait — iPad + phone (QC’d country-hero-figma mobile asset) */
  photoSrc: string;
  /** Landscape — desk >1366 (QC’d country-hero-figma desktop asset) */
  photoSrcDesktop: string;
  photoAlt: string;
  flagSrc: string;
  badgeSrc: string;
};

export const USA_DESTINATION_HERO: CountriesDestinationHeroContent = {
  title: "Comprehensive Guide to Studying in the USA",
  lead: "Best Universities, Programs, Costs & Admission Criteria for International Students",
  subtitle: "For Medical, STEM, and More—We’ve Got You Covered",
  ctaLabel: "Got Questions? Talk to Us",
  ctaHref: "/contact-counsellor",
  photoSrc: "/assets/img/countries/usa/hero-mobile.png",
  photoSrcDesktop: "/assets/img/countries/usa/hero-desktop.jpg",
  photoAlt: "Golden Gate Bridge — study in the USA",
  flagSrc: "/assets/img/countries/usa/badge-us-flag.png",
  badgeSrc: "/assets/img/countries/usa/badge-graduation.jpg"
};

export type CountriesDestinationTab = {
  id: string;
  label: string;
  /** Figma: first tab ExtraBold; black pill = cta */
  emphasis?: "active" | "cta";
};

/** C2 — Figma `26:2808` */
export const USA_DESTINATION_TABS: readonly CountriesDestinationTab[] = [
  { id: "study101", label: "USA Study 101", emphasis: "active" },
  { id: "cost", label: "Study Cost" },
  { id: "visa", label: "Visa 101" },
  { id: "short-term", label: "Short-Term-Profile Courses" },
  { id: "scholarships", label: "Scholarships" },
  { id: "tracks", label: "🇺🇸 Popular Study Tracks", emphasis: "cta" }
];

export type CountriesDestinationTocLink = {
  id: string;
  label: string;
};

export type CountriesDestinationTocContent = {
  links: readonly CountriesDestinationTocLink[];
  stats: readonly { value: string; label: string }[];
  aside: string;
  /**
   * Study/Cost/Visa = Bebas shout. Short-Term Figma `33:5791` = Roboto body.
   * Default `bebas` keeps prior tabs unchanged.
   */
  asideStyle?: "bebas" | "body";
  footnote: string;
};

/** C3 — Figma `26:2820` · anchor ids match C4+ section ids */
export const USA_DESTINATION_TOC: CountriesDestinationTocContent = {
  links: [
    { id: "cd-why", label: "Why Study in USA as an Indian Student?" },
    {
      id: "cd-overview",
      label: "USA as a Study Destination: A quick overview"
    },
    {
      id: "cd-choose",
      label: "Why Students Choose the USA for Higher Studies"
    },
    { id: "cd-stem", label: "For STEM Candidates:" },
    { id: "cd-usmle", label: "For USMLE Candidates:" },
    { id: "cd-nonstem", label: "For All Other Fields (Non-STEM):" }
  ],
  stats: [
    { value: "28", label: "of top 100" },
    { value: "5", label: "of top 10" }
  ],
  aside: "Universities\nare from\nthe US",
  footnote: "*Data from Open Doors"
};

/** CS1 — Figma `29:4785` · Study Cost TOC · anchors for CS2+ */
export const USA_DESTINATION_COST_TOC: CountriesDestinationTocContent = {
  links: [
    { id: "cd-cost-budgeting", label: "U.S. College Budgeting 101" },
    {
      id: "cd-cost-spend",
      label: "What Students Really Spend the Most On"
    }
  ],
  stats: [
    { value: "1,126,690", label: "Worldwide" },
    { value: "331,602", label: "from INDIA" }
  ],
  aside: "International\nstudents in\nthe USA",
  footnote: "*Data from Open Doors"
};

/** V1 — Figma `30:5056` · Visa 101 TOC · anchors for V2+ */
export const USA_DESTINATION_VISA_TOC: CountriesDestinationTocContent = {
  links: [
    { id: "cd-visa-intro", label: "Intro to USA Student Visa" },
    {
      id: "cd-visa-docs",
      label: "Essential Documents for US Student Visa"
    },
    { id: "cd-visa-steps", label: "Step-by-Step Guide: Applying 101" },
    {
      id: "cd-visa-dos",
      label: "Key Do's and Don'ts for US Student Visa Application/Interview"
    },
    { id: "cd-visa-helps", label: "How #PGS Helps" }
  ],
  stats: [
    { value: "54.5%", label: "Personal & Family" },
    { value: "19.0%", label: "U.S College or UNI" },
    { value: "26.5%", label: "Other Sources" }
  ],
  aside: "Top Funding\nSources for\nInternational\nStudents",
  footnote: "*Data from Open Doors"
};

/** ST1 — Figma `33:5791` · Short-Term TOC · anchors for ST2+ */
export const USA_DESTINATION_SHORT_TOC: CountriesDestinationTocContent = {
  links: [
    {
      id: "cd-short-intro",
      label: "Internships. Certificates. Let’s Talk."
    },
    {
      id: "cd-short-mentor",
      label: "Start Here. Personalize With a Mentor."
    }
  ],
  stats: [
    { value: "1,126,690", label: "studied in person" },
    { value: "18,129", label: "studied online from abroad" }
  ],
  aside:
    "These numbers are updated every few years. When the next update is out, you’ll see it live right here.",
  asideStyle: "body",
  footnote: "*Data from Open Doors"
};

/** SC1 — Figma `34:6260` · Scholarships TOC · anchors for SC2+ */
export const USA_DESTINATION_SCHOLARSHIP_TOC: CountriesDestinationTocContent = {
  links: [
    {
      id: "cd-scholarship-major",
      label:
        "Major Scholarships & Positions in the USA Students Should Know About"
    },
    {
      id: "cd-scholarship-guide",
      label: "#PGS | Scholarship Apply Guide"
    }
  ],
  stats: [
    { value: "88%", label: "special-focus institutions" },
    { value: "78%", label: "baccalaureate colleges" },
    { value: "65%", label: "doctoral universities" }
  ],
  aside:
    "Institutions\nhave Boosted or\nMaintained Financial\nSupport Since 2020",
  footnote: "*Data from Open Doors"
};

/** PT1 — Figma `35:6807` · Popular Study Tracks TOC · anchors for PT2+ */
export const USA_DESTINATION_TRACKS_TOC: CountriesDestinationTocContent = {
  links: [
    {
      id: "cd-tracks-section1",
      label: "Section 1: Masters, STEM UG, MBA & Others"
    },
    {
      id: "cd-tracks-section2",
      label: "Section 2: Medical, Health, and Life Sciences"
    },
    { id: "cd-tracks-headsup", label: "A Heads Up" }
  ],
  stats: [
    { value: "3.2%", label: "Health Professions" },
    /* Figma `35:6820` · wrap so grey box stays ~168.8 (no aside overlap) */
    {
      value: "43.6%",
      label: "Math, Engineering\n& Computer\nScience"
    },
    { value: "14.2%", label: "Business &\nManagement" }
  ],
  aside: "Study Tracks\nPicked by\nInternational\nStudents",
  footnote: "*Data from Open Doors"
};

/**
 * PT2 — Figma `35:6829` · lead paras (no title).
 * FIGMA CONTENT NOTE: Figma paras 3–4 are scholarship bleed — REJECT.
 * ADOPT legacy tracks intro para 3 (mentors / Master’s + UG list).
 */
export const USA_DESTINATION_TRACKS_INTRO: CountriesDestinationWhyContent = {
  paragraphs: [
    "Every year, international students apply to study in the U.S. and a majority of them end up choosing from a few key programs. According to data from Open Doors and SEVIS, over 60% of students pick STEM, business, or health-related degrees.",
    "For a quick overview: we’ve divided them into Non-Medical and Medical sections.",
    "Below is a list of Master’s and UG tracks. Our mentors can guide you based on what best fits your profile."
  ]
};

export type CountriesDestinationTracksSectionRow = {
  track: string;
  field: string;
  idealFor: string;
};

export type CountriesDestinationTracksSectionContent = {
  title: string;
  rows: readonly CountriesDestinationTracksSectionRow[];
};

/** PT3 — Figma `35:6834` · Section 1 table · `#cd-tracks-section1` */
export const USA_DESTINATION_TRACKS_SECTION1: CountriesDestinationTracksSectionContent =
  {
    title: "Section 1:\nMasters, STEM, UG, MBA & Others",
    rows: [
      {
        track: "Computer Science",
        field: "STEM",
        idealFor: "CS, IT, or math background"
      },
      {
        track: "Data Science & AI",
        field: "STEM",
        idealFor: "CS, stats, math grads"
      },
      {
        track: "Cybersecurity",
        field: "STEM",
        idealFor: "Tech background or CS grads"
      },
      {
        track: "Business Analytics",
        field: "STEM",
        idealFor: "Business + basic coding"
      },
      {
        track: "MBA (General / Finance / Marketing)",
        field: "Business",
        idealFor: "Working professionals, any UG"
      },
      {
        track: "Mechanical Engineering",
        field: "STEM",
        idealFor: "Engineering UG (Mech/Auto)"
      },
      {
        track: "Electrical Engineering",
        field: "STEM",
        idealFor: "EE/EC/Instrumentation grads"
      },
      {
        track: "Architecture",
        field: "Design",
        idealFor: "B.Arch holders or design UG"
      },
      {
        track: "Film & Media",
        field: "Creative",
        idealFor: "Media, design, or creators"
      },
      { track: "Law (LLM)", field: "Legal", idealFor: "LLB grads" },
      {
        track: "Psychology",
        field: "Social Sciences",
        idealFor: "Psychology or related UG"
      }
    ]
  };

/** PT4 — Figma `35:6913` · Section 2 table · `#cd-tracks-section2` */
export const USA_DESTINATION_TRACKS_SECTION2: CountriesDestinationTracksSectionContent =
  {
    title: "Section 2:\nMedical, Health, and Life Sciences",
    rows: [
      {
        track: "USMLE Pathway",
        field: "Medicine",
        idealFor: "MBBS graduates / Doctors only"
      },
      {
        track: "Clinical Embryology",
        field: "Life Sciences + Medicine",
        idealFor: "Life sci, biotech, BSc, BPharm"
      },
      {
        track: "Public Health (MPH)",
        field: "Health",
        idealFor: "Any health/life sci grads"
      },
      {
        track: "Nursing (BSN / MSN)",
        field: "Healthcare",
        idealFor: "12th (for BSN) / RN / BSc"
      },
      {
        track: "Health Administration",
        field: "Management",
        idealFor: "Medical, dental, or health UG"
      },
      {
        track: "Occupational Therapy",
        field: "Rehab Sciences",
        idealFor: "Allied health / BPT grads"
      },
      {
        track: "Nutrition & Dietetics",
        field: "Allied Health",
        idealFor: "BSc Life Sci / Dietetics UG"
      }
    ]
  };

export type CountriesDestinationTracksHeadsUpSeg = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

export type CountriesDestinationTracksHeadsUpContent = {
  title: string;
  lead: string;
  /** Figma `35:6973` middle para — bold / italic spans */
  middle: readonly CountriesDestinationTracksHeadsUpSeg[];
  closing: string;
  punchline: {
    skill: string;
    separator: string;
    rest: string;
  };
};

/** PT5 — Figma `35:6968` · A Heads Up · `#cd-tracks-headsup` */
export const USA_DESTINATION_TRACKS_HEADSUP: CountriesDestinationTracksHeadsUpContent =
  {
    title: "A Heads Up",
    lead: "The list above is just a course highlight, these aren’t the only options, just the ones most students usually go for. What really works for you depends on your profile.",
    middle: [
      { text: "At " },
      { text: "#PGS", bold: true },
      {
        text: ", we don’t suggest random courses at you. We start with where you want to end up "
      },
      { text: "‘your career goal’ ", bold: true },
      { text: "and " },
      {
        text: "exclusively prioritize reverse engineering your study path from there. ",
        bold: true,
        italic: true
      },
      {
        text: "It’s not a shortcut. It’s a smarter way. ",
        italic: true
      },
      {
        text: "We’re admission counselors, sure. But first, we’re mentors."
      }
    ],
    closing: "Because at PGS, we believe one thing:",
    punchline: {
      skill: "Skill",
      separator: ">",
      rest: "Everything Else"
    }
  };

export type CountriesDestinationVisaType = {
  name: string;
  description: string;
};

export type CountriesDestinationVisaTypesContent = {
  types: readonly CountriesDestinationVisaType[];
  prepNote: string;
};

/** V2 — Figma `30:5086` + `30:5085` */
export const USA_DESTINATION_VISA_TYPES: CountriesDestinationVisaTypesContent = {
  types: [
    {
      name: "F-1 Visa",
      description:
        "For full-time academic courses like bachelor's, master’s, or PhD programs."
    },
    {
      name: "J-1 Visa",
      description:
        "For exchange programs, research, or short-term academic training."
    },
    {
      name: "M-1 Visa",
      description: "For vocational or technical training."
    }
  ],
  prepNote:
    "International applicants should prepare documents like Form I-20 (for F-1/M-1) or DS-2019 (for J-1), proof of financial support, and a valid passport, while adhering to current U.S. immigration guidelines."
};

export type CountriesDestinationVisaDocGroup = {
  title: string;
  /** Corner icon — same /assets family as mobile */
  iconSrc: string;
  items: readonly string[];
};

export type CountriesDestinationVisaDocsContent = {
  title: string;
  groups: readonly CountriesDestinationVisaDocGroup[];
  notesTitle: string;
  notes: readonly string[];
  planTitle: string;
  planBody: string;
};

/** V3 — Figma `30:5105` · same mobile docs-grid / doc-card structure · CSS pass */
export const USA_DESTINATION_VISA_DOCS: CountriesDestinationVisaDocsContent = {
  title: "Essential Documents for US Student Visa",
  groups: [
    {
      title: "Primary Documents:",
      iconSrc: "/assets/img/user-edit.png",
      items: [
        "Valid Passport",
        "Form I-20 (issued by your institution)",
        "DS-160 confirmation page",
        "SEVIS fee receipt",
        "Two recent passport-sized photographs"
      ]
    },
    {
      title: "Academic Documents:",
      iconSrc: "/assets/img/list-check.png",
      items: [
        "UNI Acceptance letter",
        "Official academic transcripts and certificates",
        "Test scores (IELTS, TOEFL, GRE/GMAT)",
        "Statement of Purpose (SOP) and Letters of Recommendation (at least 2 LORs)"
      ]
    },
    {
      title: "Financial Documents:",
      iconSrc: "/assets/img/stemp.png",
      items: [
        "Bank Statements Proving Sufficient Funds",
        "Loan Approval Letter (if applicable)",
        "Sponsorship Letter (if sponsored by an organization)",
        "Salary Slips and Employment Verification (if applicable)",
        "Tax Returns for the Last 3 Years (if applicable)",
        "Scholarship Letter (if applicable)"
      ]
    }
  ],
  notesTitle: "Notes",
  notes: [
    "Ensure all documents are current and meet U.S. embassy/consulate requirements.",
    "Make sure to check the official U.S. Department of State website (travel.state.gov) or follow your local embassy’s official social media account for the latest 2025 updates."
  ],
  planTitle: "Plan. Review. Submit.",
  planBody:
    "For all our students, #PGS will make sure you don’t miss anything on your visa checklist. ❤️"
};

export type CountriesDestinationVisaStep = {
  stepLabel: string;
  title: string;
  detail: string;
};

export type CountriesDestinationVisaStepsContent = {
  title: string;
  steps: readonly CountriesDestinationVisaStep[];
};

/** V4 — Figma `30:5210` · same mobile step-card · CSS pass · `#cd-visa-steps` */
export const USA_DESTINATION_VISA_STEPS: CountriesDestinationVisaStepsContent = {
  title: "Step-by-Step Guide: Applying 101",
  steps: [
    {
      stepLabel: "Step 1",
      title: "Secure Institution Admission",
      detail: "Get accepted to a SEVP-certified US institution"
    },
    {
      stepLabel: "Step 2",
      title: "Obtain Form I-20 & Pay SEVIS",
      detail: "Get I-20 from DSO and pay SEVIS fee"
    },
    {
      stepLabel: "Step 3",
      title: "Complete DS-160 Application",
      detail: "Fill out online application and get a confirmation copy"
    },
    {
      stepLabel: "Step 4",
      title: "Pay visa application fee",
      detail: "Schedule Biometrics and appointment"
    },
    {
      stepLabel: "Step 5",
      title: "required documents",
      detail:
        "Gop thru all required documents and make sure they are checked before interview"
    },
    {
      stepLabel: "Step 6",
      title: "Visa Interview",
      detail:
        "Prepare for and attend in-person interview. Be Confident. Believe in the process. Don't over-prepare."
    }
  ]
};

export type CountriesDestinationVisaDosRow = {
  criteria: string;
  dos: string;
  donts: string;
};

export type CountriesDestinationVisaDosContent = {
  title: string;
  criteriaHeading: string;
  dosHeading: string;
  dontsHeading: string;
  rows: readonly CountriesDestinationVisaDosRow[];
};

/** V5 — Figma `30:5220` · same mobile stacked lists · CSS pass · `#cd-visa-dos` */
export const USA_DESTINATION_VISA_DOS: CountriesDestinationVisaDosContent = {
  title: "Key Do's and Don'ts for US Student Visa Application",
  criteriaHeading: "Criteria",
  dosHeading: "Do’s",
  dontsHeading: "Don’ts",
  rows: [
    {
      criteria: "Interview",
      dos: "Arrive early and dress formally",
      donts: "Avoid rudeness or disorganization"
    },
    {
      criteria: "Answering Questions",
      dos: "Be truthful and confident",
      donts: "Avoid jokes or casual responses"
    },
    {
      criteria: "Documentation",
      dos: "Keep all documents organized and complete",
      donts: "Never miss or falsify documents"
    },
    {
      criteria: "Financials",
      dos: "Ensure timely payment, ready and keep all receipts",
      donts: "Don’t apply without finance support and proof"
    }
  ]
};

export type CountriesDestinationVisaHelpContent = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

/** V6 — Figma `30:5257` · same mobile helper-box + CTA · `#cd-visa-helps` */
export const USA_DESTINATION_VISA_HELP: CountriesDestinationVisaHelpContent = {
  title: "How #PGS Helps",
  body: "At PurpleGuide.study, we understand the intricacies involved in applying for a US student visa. Our personalized assistance ensures every step of your journey—from application to interview—is seamless. With our guidance and your preparedness you got it.",
  ctaLabel: "Talk to our expert today and get clarity.",
  ctaHref: "/contact-counsellor"
};

export type CountriesDestinationWhyContent = {
  /** Omit for Scholarships intro Figma `34:6281` (paras only). */
  title?: string;
  paragraphs: readonly string[];
};

/** SC2 — Figma `34:6281` · lead paras only (title lives on table SC3) */
export const USA_DESTINATION_SCHOLARSHIP_INTRO: CountriesDestinationWhyContent =
  {
    paragraphs: [
      "One of the main reasons students are attracted to studying in the USA is the availability of scholarships, research funding, and a solid post-study job environment.",
      "But scholarships aren’t automatic. Most universities have a separate division that reviews each student’s eligibility—looking at financial need, academic background, and overall fit before awarding any grant.",
      "In addition to scholarships, there are also RA/TA positions, research grants, and exchange program funds that students can apply for.",
      "We’ve listed a few of the key ones below."
    ]
  };

export type CountriesDestinationScholarshipRow = {
  name: string;
  type: string;
  providedBy: string;
};

export type CountriesDestinationScholarshipMajorContent = {
  title: string;
  rows: readonly CountriesDestinationScholarshipRow[];
};

/** SC4 — Figma `34:6365` · Apply Guide · `#cd-scholarship-guide` */
export type CountriesDestinationScholarshipGuideContent = {
  title: string;
  paragraphs: readonly string[];
  /** Bold lead before list · e.g. At #PGS… */
  pledge: string;
  helpIntro: string;
  helpItems: readonly string[];
  closing: string;
};

export const USA_DESTINATION_SCHOLARSHIP_GUIDE: CountriesDestinationScholarshipGuideContent =
  {
    title: "#PGS | Scholarship Apply Guide",
    paragraphs: [
      "Most students miss scholarships, not because they’re not eligible, but because no one tells them how to actually apply the right way.",
      "For international students, the scholarship journey is often confusing.",
      "Every university or scholarship body has its own rules. Some want essays. Some ask for income proof. Deadlines are to be followed. And most of the time, you’re just applying randomly hoping it works.",
      "By the time you figure it all out—you’ve either missed the deadline or applied with zero strategy. That’s where most students lose out."
    ],
    pledge: "At #PGS, we don’t let that happen.",
    helpIntro: "We help you:",
    helpItems: [
      "Find scholarships that actually match your course and profile.",
      "Break down what each one really needs—essays, docs, formats, all of it.",
      "Apply with a clear plan, without last-minute chaos."
    ],
    closing:
      "And if you’re part of #PurplePremium?\nThis whole process is already included."
  };

/** SC3 — Figma `34:6286` · Major Scholarships table · `#cd-scholarship-major` */
export const USA_DESTINATION_SCHOLARSHIP_MAJOR: CountriesDestinationScholarshipMajorContent =
  {
    title: "Major Scholarships & Positions in the USA Students Should Know About",
    rows: [
      {
        name: "Fulbright Foreign Student Program",
        type: "Fully Funded",
        providedBy: "U.S. Govt"
      },
      {
        name: "Hubert H. Humphrey Fellowship",
        type: "Full (non-degree)",
        providedBy: "U.S. Govt"
      },
      {
        name: "AAUW International Fellowships",
        type: "Women-focused",
        providedBy: "AAUW"
      },
      {
        name: "Aga Khan Foundation Scholarship",
        type: "Need-based + Loan",
        providedBy: "Aga Khan Foundation"
      },
      {
        name: "Rotary Foundation Global Grants",
        type: "Project/Research",
        providedBy: "Rotary International"
      },
      {
        name: "Knight-Hennessy Scholars",
        type: "Fully Funded",
        providedBy: "Stanford University"
      },
      {
        name: "Yale Need-Based Aid",
        type: "100% Need Met",
        providedBy: "Yale University"
      },
      {
        name: "Harvard Financial Aid",
        type: "Need-Based",
        providedBy: "Harvard University"
      },
      {
        name: "On-Campus Graduate Assistantships",
        type: "Tuition + Stipend",
        providedBy: "Most U.S. Universities"
      },
      {
        name: "Research Assistantships (RA/TA)",
        type: "Paid Positions",
        providedBy: "STEM/Research Programs"
      },
      {
        name: "Emerging Global Leader Scholarship",
        type: "Fully Funded",
        providedBy: "American University"
      }
    ]
  };

/** V2 — Figma `30:5080` · anchor `cd-visa-intro` (title + lead) */
export const USA_DESTINATION_VISA_INTRO: CountriesDestinationWhyContent = {
  title: "Intro to USA Student Visa",
  paragraphs: [
    "USA offers different visa options depending on whether it’s for a full degree, an exchange program, or a vocational course. They dont have an one visa for all programs system! Understanding the visa types and requirements is crucial for a smooth application process."
  ]
};

/** ST2 — Figma `33:5809` · anchor `cd-short-intro` (title + lead) */
export const USA_DESTINATION_SHORT_INTRO: CountriesDestinationWhyContent = {
  title: "Internships. Certificates. Let’s Talk.",
  paragraphs: [
    "As part of our profile-building program, we bring you a range of exclusive internship opportunities, certificate courses, and short-term programs designed to give your CV that extra edge. These are not your typical courses—they’re curated based on what actually helps students get noticed, whether it's for university admissions, competitive jobs, or global exposure.",
    "From clinical rotations and internships to summer schools and online certifications from top institutes—we’ve got you covered. These experiences also help you build a stronger network, meet mentors in your field, and add real value to your journey.",
    "Not sure which course fits your goals? Wondering if you’re eligible or if this adds real weight to your application?"
  ]
};

export type CountriesDestinationShortCtaContent = {
  ctaLabel: string;
  ctaHref: string;
  helper: string;
};

/** ST3 — Figma `33:5812` · yellow CTA + helper (under intro) */
export const USA_DESTINATION_SHORT_CTA: CountriesDestinationShortCtaContent = {
  ctaLabel: "Talk to our expert today and get clarity.",
  ctaHref: "/contact-counsellor",
  helper:
    "We'll help you choose the right add-ons based on your career path and guide you through the process step by step."
};

export type CountriesDestinationShortCourse = {
  id: string;
  directionTag: string;
  title: string;
  blurb: string;
  categoryTag: string;
  metric: string;
  imageSrc: string;
  heartFilled: boolean;
  /** Figma closed overlay on card 1 — fixture state */
  closedLabel?: string;
};

export type CountriesDestinationShortMentorContent = {
  title: string;
  blurb: string;
  courses: readonly CountriesDestinationShortCourse[];
};

/** ST4 — Figma `33:5817` · mentor plate + 3× `courses short` · `#cd-short-mentor` */
export const USA_DESTINATION_SHORT_MENTOR: CountriesDestinationShortMentorContent =
  {
    title: "Start Here. Personalize With a Mentor.",
    blurb:
      "Our mentors are better suited to guide you based on your background, goals, and where you want to land. Reach out to them.",
    courses: [
      {
        id: "short-harvard-1",
        directionTag: "#inCampus",
        title: "Harvard Internship",
        blurb:
          "Harvard Internship Harvard Harvard Internship Harvard Harvard Internship Harvard.",
        categoryTag: "#all",
        metric: "our 3rd batch",
        imageSrc: "/assets/img/half-cut-girl.png",
        heartFilled: false,
        closedLabel: "Closed on June 15 *46 students registered*"
      },
      {
        id: "short-harvard-2",
        directionTag: "#inCampus",
        title: "Harvard Internship",
        blurb:
          "Harvard Internship Harvard Harvard Internship Harvard Harvard Internship Harvard.",
        categoryTag: "#all",
        metric: "our 3rd batch",
        imageSrc: "/assets/img/half-cut-girl.png",
        heartFilled: true
      },
      {
        id: "short-harvard-3",
        directionTag: "#inCampus",
        title: "Harvard Internship",
        blurb:
          "Harvard Internship Harvard Harvard Internship Harvard Harvard Internship Harvard.",
        categoryTag: "#all",
        metric: "our 3rd batch",
        imageSrc: "/assets/img/half-cut-girl.png",
        heartFilled: true
      }
    ]
  };

/** CS2 — Figma `29:4803` · anchor `cd-cost-budgeting` */
export const USA_DESTINATION_COST_BUDGETING: CountriesDestinationWhyContent = {
  title: "U.S. College Budgeting 101",
  paragraphs: [
    "In all our years of counseling, one thing’s been consistent—before jumping into applications, most students hit us with the real questions:",
    "“Can I actually afford this?”\n“Will I be able to pay back my student loan later?”\n“What’s the actual budget I need to be prepared for?”",
    "And you know what? These aren’t just fair questions—they’re smart ones.",
    "From tuition fees and day-to-day living costs to extras like health insurance, visa fees, and emergency funds, we’ll walk you through everything in simple terms.",
    "This section is an overview of things student need to keep in their mind for overall budget planning."
  ]
};

/** C4 — Figma `26:2840` · anchor `cd-why` */
export const USA_DESTINATION_WHY: CountriesDestinationWhyContent = {
  title: "Why Study in USA as an Indian Student?",
  paragraphs: [
    "With over 1.1 million international students, the USA has emerged as the number one study destination over the years. One of the major reasons for students flocking to study in USA is the excellent reputation that US universities and degrees hold.",
    "Diversity is another distinguishing factor that attracts students to pursue higher studies in USA. The country also provides ample work opportunities to the students during and after completion of their academic courses.",
    "Overall, USA is one of the most favorable places in the world for those who wish to turn their study abroad dream into reality."
  ]
};

export type CountriesDestinationOverviewRow = {
  label: string;
  value: string;
};

export type CountriesDestinationOverviewContent = {
  title: string;
  rows: readonly CountriesDestinationOverviewRow[];
};

/** C5 — Figma `26:2846` · anchor `cd-overview` · iPad copy */
export const USA_DESTINATION_OVERVIEW: CountriesDestinationOverviewContent = {
  title: "USA as a Study Destination: A quick overview",
  rows: [
    {
      label: "Language You’ll Study In",
      value: "English – No surprises here."
    },
    {
      label: "What It’ll Cost You",
      value: "On average, $55,000 a year for tuition."
    },
    {
      label: "Living costs range",
      value: "$10,000 to $20,000 per year. Big cities cost more."
    },
    {
      label: "Scholarships",
      value:
        "Competitive, but if your profile’s strong, it’s absolutely within reach."
    },
    {
      label: "When Do Courses Start?",
      value: "Three intakes: Fall (most popular), Spring and Summer."
    },
    {
      label: "What Visa You’ll Need",
      value:
        "Mostly F1 visa. J1 if it’s an exchange, M1 for short/vocational stuff."
    },
    { label: "Visa Cost", value: "Around $510." }
  ]
};

export type CountriesDestinationChooseChip = {
  label: string;
  iconSrc: string;
  iconAlt: string;
  /** Optional bold line above label (CS3 Tuition Fees) */
  heading?: string;
};

export type CountriesDestinationChooseContent = {
  title: string;
  chips: readonly CountriesDestinationChooseChip[];
  combo: {
    left: string;
    right: string;
    leftIconSrc: string;
    rightIconSrc: string;
  };
  timeline: {
    label: string;
    iconSrc: string;
  };
  tagline: string;
  quote: string;
};

/** C6 — Figma `26:2867` · anchor `cd-choose` · icons from existing /assets */
export const USA_DESTINATION_CHOOSE: CountriesDestinationChooseContent = {
  title: "Why Students Choose the USA for Higher Studies",
  chips: [
    {
      label: "Strong Research & Tech Support",
      iconSrc: "/assets/img/list-check.png",
      iconAlt: ""
    },
    {
      label: "Well-known Universities",
      iconSrc: "/assets/img/user-edit.png",
      iconAlt: ""
    }
  ],
  combo: {
    left: "The U.S. is home to world-famous universities like MIT, Harvard, Stanford, and many more.",
    right: "Good startup & VC Culture",
    leftIconSrc: "/assets/img/topy.png",
    rightIconSrc: "/assets/img/stemp.png"
  },
  timeline: {
    label: "And a timeline that doesn’t burn you out or waste years",
    iconSrc: "/assets/img/heart.gif"
  },
  tagline: "Learn. Do. Succeed.",
  quote:
    "Studying in the U.S. means more than just classes — you get real-world experience, STEM OPT extensions, scholarships, internships, and a chance to build your future while you study. It’s where top education meets real opportunity. ❤️"
};

export type CountriesDestinationCostCtaContent = {
  envelopeHeadline: string;
  envelopeBody: string;
  mark: string;
  /** Same Subtract ticket as mobile compete — iPad CSS rotates it upright */
  ticketSrc: string;
  portraitSrc: string;
  portraitAlt: string;
  joinLine: string;
  brandLine: string;
  support: string;
};

/** CS4 — Figma `29:4895` + `29:4907` + `29:4910` · anchor `cd-cost-cta` */
export const USA_DESTINATION_COST_CTA: CountriesDestinationCostCtaContent = {
  envelopeHeadline:
    "Yes, the competition is global, but so are the rewards stay sharp and go claim yours.",
  envelopeBody:
    "We’ve worked closely with students who’ve taken this path—and yeah, it definitely takes commitment. But with the right mentor and a clear plan, it makes all the difference. That’s why we’ve built a solid approach for each pathway, helping our students stay on track and move forward with confidence.",
  mark: "#PGS",
  ticketSrc: "/assets/img/countries-destination/cost-envelope-subtract.svg",
  portraitSrc: "/assets/img/step.png",
  portraitAlt: "",
  joinLine: "join",
  brandLine: "#purplePremium",
  support: "Streamlined Support for USA Medical & Non-Medical study Paths."
};

/** CS3 — Figma `29:4807` · anchor `cd-cost-spend` */
export const USA_DESTINATION_COST_SPEND: CountriesDestinationChooseContent = {
  title: "What Students Really Spend the Most On",
  chips: [
    {
      heading: "Tuition Fees:",
      label: "This is almost always the largest single cost.",
      iconSrc: "/assets/img/list-check.png",
      iconAlt: ""
    },
    {
      label: "Well-known Universities",
      iconSrc: "/assets/img/user-edit.png",
      iconAlt: ""
    }
  ],
  combo: {
    left: "The U.S. is home to world-famous universities like MIT, Harvard, Stanford, and many more.",
    right: "Good startup & VC Culture",
    leftIconSrc: "/assets/img/topy.png",
    rightIconSrc: "/assets/img/stemp.png"
  },
  timeline: {
    label: "To be part of a strong alumni network",
    iconSrc: "/assets/img/heart.gif"
  },
  tagline: "Learn. Do. Succeed.",
  quote:
    "Studying in the U.S. means more than just classes — you get real-world experience, STEM OPT extensions, scholarships, internships, and a chance to build your future while you study. It’s where top education meets real opportunity. ❤️"
};

export type CountriesDestinationTrack = {
  id: string;
  title: string;
  body: string;
};

export type CountriesDestinationTracksContent = {
  tracks: readonly CountriesDestinationTrack[];
};

/** C7 — Figma `26:2954` · anchors match C3 TOC */
export const USA_DESTINATION_TRACKS: CountriesDestinationTracksContent = {
  tracks: [
    {
      id: "cd-stem",
      title:
        "For STEM Candidates (Science, Technology, Engineering, Mathematics):",
      body: "The U.S. is a global leader when it comes to cutting-edge research and innovation in STEM fields. If you're an F-1 visa holder, you get 12 months of Optional Practical Training (OPT) after graduation—and if you're in a STEM field, you can apply for a 24-month STEM OPT extension, giving you up to 36 months of valuable work experience. That’s a huge boost for landing long-term job opportunities and increasing your chances of securing H-1B sponsorship."
    },
    {
      id: "cd-usmle",
      title: "For USMLE Candidates:",
      body: "International Medical Graduates (IMGs) play a vital role in the healthcare system, especially by helping fill physician shortages in primary care. In the 2025 Match, 9,761 IMGs landed first-year residency positions, making up over 25% of all matched applicants. For non-U.S. citizen IMGs, the match rate was around 58%—a solid figure considering the level of competition. Whether they choose to build a life and career in the States or use their experience to practice elsewhere, it’s a powerful credential that’s respected worldwide."
    },
    {
      id: "cd-nonstem",
      title: "For All Other Fields (Non-STEM):",
      body: "Studying in the U.S. as an international student in non-STEM fields like business, humanities, arts, or social sciences offers high-value education, global perspectives, and real-world skills—like critical thinking, communication, and adaptability—that are highly valued in today’s international job market. The vibrant campus life and diverse learning environment help you grow personally and professionally. With the right mindset and networking, you can turn your U.S. experience into a strong career launchpad."
    }
  ]
};
