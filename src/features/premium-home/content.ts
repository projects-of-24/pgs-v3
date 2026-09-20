/** purplePREMIUM HOME fixtures — H1 hero headline. Desktop `17052:8154` · mobile `366:4076`. */

export const PREMIUM_HOME_HERO = {
  title: "Get Into Your Dream University Abroad with a Structured Workflow",
  lead: "Boost Your Chances of Selection 3X with Smart, Informed University Picks",
  subtitle: "For Medical, STEM, and More—We’ve Got You Covered",
  ctaLabel: "Set Up a Quick Call",
  ctaHint:
    "Clear All Your Doubts in 30 Minutes—Get Your Admission Workflow Sorted."
} as const;

/** H2 — hero video card. Desktop `17052:8162` · mobile `366:4088`.
 * Poster = Figma still. Play uses owned desk/mob MP4 fixtures (CMS swap later). */
export const PREMIUM_HOME_VIDEO = {
  brandLine1: "Step into",
  brandLine2: "#purplepremium",
  clickLabel: "click here",
  playLabel: "Play #PurplePremium video",
  imageSrc: "/assets/img/premium-home/hero-video.jpg",
  imageAlt: "Student in glasses smiling against a chalkboard wall",
  videoDeskSrc: "/assets/img/premium-home/hero-desk.mp4",
  videoMobSrc: "/assets/img/premium-home/hero-mob.mp4",
  arrowDeskSrc: "/assets/img/premium-home/click-arrow-desk.svg",
  arrowMobSrc: "/assets/img/premium-home/click-arrow-mob.svg"
} as const;

/** H3 — path chooser. Desktop `17052:8172` · mobile `366:4255`. Links = live pathway routes. */
export const PREMIUM_HOME_PATHS = {
  titleLine1: "With #PurplePremium, you can choose",
  titleLine2: "the path that matches your goals.",
  startLabel: "start now",
  photoSrc: "/assets/img/premium-home/path-student.jpg",
  photoAlt: "Student with curly hair holding folders",
  hashSrc: "/assets/img/premium-home/path-hash.svg",
  /** Desk vectors `17052:8179–8182`. Mob vectors `366:4200–4203`. Text stays HTML. */
  focusCornersDesk: {
    tl: "/assets/img/premium-home/path-focus-tl.svg",
    tr: "/assets/img/premium-home/path-focus-tr.svg",
    br: "/assets/img/premium-home/path-focus-br.svg",
    bl: "/assets/img/premium-home/path-focus-bl.svg"
  },
  focusCornersMob: {
    tl: "/assets/img/premium-home/path-focus-tl-mob.svg",
    tr: "/assets/img/premium-home/path-focus-tr-mob.svg",
    br: "/assets/img/premium-home/path-focus-br-mob.svg",
    bl: "/assets/img/premium-home/path-focus-bl-mob.svg"
  },
  paths: [
    { id: "usmle", label: "USMLE", href: "/purpleusmle" },
    { id: "plab", label: "PLAB", href: "/purpleplab" },
    { id: "amc", label: "AMC", href: "/purpleamc" },
    {
      id: "nonmedical",
      labelLines: ["Masters, STEM", "UG, MBA & Others"] as const,
      href: "/purplenonmedical"
    }
  ]
} as const;

/** H4 — aim / stats + roadmap card. Desktop `17052:8216` · mobile `366:4321`. */
export const PREMIUM_HOME_AIM = {
  titleLine1: "With #PurplePremium,",
  titleLine2: "we aim to give our aspirants:",
  brandTag: "#PGS",
  brandSub: "#PurplePremium",
  roadmapLine1: "Your roadmap to a smarter, well-guided",
  roadmapLine2: "study abroad journey.",
  stats: [
    { value: "40%", label: "Stronger Applications" },
    { value: "3x", label: "Profile Boost" },
    { value: "100%", label: "Personalized Support" },
    { value: "10/10", label: "Targeted Roadmaps" }
  ]
} as const;

/** H5 — dashboard unlock. Desktop `17052:8230` · mobile `366:4322`. */
export const PREMIUM_HOME_DASHBOARD = {
  titleDesk: "Your journey, fully mapped",
  titleMobLine1: "One of the best parts of #PGS?",
  titleMobLine2: "The Student Dashboard.",
  advantageTitle: "Mentor + Dashboard + Admission Counseling — #PGS Advantage",
  advantageBody:
    "Your full admission guide. Get expert advice, real data, and hands-on support so you can seamlessly turn your goals into admission success.",
  unlockDeskLine1: "dashboard",
  unlockDeskLine2: "Fully unlocked when you sign up for #purplePremium.",
  unlockMobBody:
    "Get real-time updates, mentor feedback, and full progress tracking—every step from Day 1 to your admit. Everything stays mapped, organized, and right here in one place.",
  unlockMobCloser: "Stay on track. Get admitted with confidence.",
  /** Desk still framed in `17052:8235`. Mob = full grey window export `366:4325` (separate file). */
  imageDeskSrc: "/assets/img/premium-home/dashboard-desk.jpg",
  imageShotMobSrc: "/assets/img/premium-home/dashboard-shot-mob.jpg",
  imageAlt: "Student dashboard showing progress cards, notes, and top picks",
  checkSrc: "/assets/img/premium-home/dashboard-check.svg",
  stripeSrc: "/assets/img/premium-home/dashboard-stripe.svg",
  heartSrc: "/assets/img/premium-home/dashboard-heart.gif"
} as const;

/** H7 — university discovery. Desktop `17052:8319` · Mobile `473:5530`. */
export const PREMIUM_HOME_UNIV = {
  title: "Discover Top Universities in Every Country — With Scholarships & Fee Waivers",
  lead: "Explore our global university tie-ups and map out your perfect path — we’re here to guide you.",
  journey: "Your College Journey Starts Here",
  bullets: [
    "500+ University Tie-ups",
    "20+ years experienced Mentors",
    "Current Student as Mentors"
  ] as const,
  /** Fixture logos — CMS W1 will swap via getPremiumHomeUnivLogos (Finance pattern). */
  logos: [
    { src: "/assets/img/premium-home/univ/dorset.png", alt: "Dorset College" },
    { src: "/assets/img/premium-home/univ/dundalk.png", alt: "Dundalk Institute of Technology" },
    { src: "/assets/img/premium-home/univ/edc.png", alt: "EDC" },
    { src: "/assets/img/premium-home/univ/eidm.png", alt: "EIDM Fashion & Luxury School" },
    { src: "/assets/img/premium-home/univ/em-normandie.png", alt: "EM Normandie" },
    { src: "/assets/img/premium-home/univ/esaip.png", alt: "ESAIP" },
    { src: "/assets/img/premium-home/univ/esce.png", alt: "ESCE Business School" },
    { src: "/assets/img/premium-home/univ/esigelec.png", alt: "ESIGELEC" },
    { src: "/assets/img/premium-home/univ/esilv.png", alt: "ESILV" }
  ] as const,
  /** Figma draws four identical logo rows. */
  logoRowCount: 4,
  bulletCheckSrc: "/assets/img/premium-home/univ/bullet-check.svg",
  paths: "Medicine. engineering. Allied Health. masters.management",
  connectLines: [
    "Connect with our",
    "expert today and",
    "kickstart your",
    "study abroad journey!"
  ] as const,
  /** Mob Figma is one paragraph (desk keeps line breaks). */
  connectMob:
    "Connect with our expert today and kickstart your study abroad journey!",
  collageSrc: "/assets/img/premium-home/univ/collage.png",
  collageMobSrc: "/assets/img/premium-home/univ/collage-mob.png",
  collageAlt:
    "Program highlights: MBA, Engineering, Scholarship and Fee Waiver, 95% offer letters in under four weeks, 98% visa success, USMLE PLAB AMC paths"
} as const;

/** H9 — Why #purplepremium. Desktop `17052:8371`. Mobile later. */
export type PremiumHomeWhyPart = { text: string; bold?: boolean };

export const PREMIUM_HOME_WHY = {
  titleLines: ["why", "#purplepremium?"] as const,
  reasons: [
    {
      num: "01",
      text: "6/10 apply to the wrong programs; wasting a year."
    },
    {
      num: "02",
      text: "Most don’t know how to show off their CV; we help you with it."
    },
    {
      num: "03",
      text: "Deadlines, forms, SOPs? We manage that stress."
    },
    {
      num: "04",
      text: "Not just “advice,” we give actual checklists and tasks for you to complete."
    },
    {
      num: "05",
      text: "Its easy to loose years in medical pathway & still be struck in point zero"
    }
  ] as const,
  alsoTitle: "&ALSO",
  alsoBody: [
    "over the years, we’ve noticed a pattern with students. No matter which path they take, many succeed—and they’ve truly earned it. But the reality is, 7 out of 10 still run into the same common roadblocks. They start strong, inspired by others who’ve “made it” (on social media or in real life), and try to figure things out on their own. But somewhere around the halfway point, they hit a wall—losing time, money, and momentum. That’s when things start to feel like they’re back to square one—or worse, stuck in a “I’m lost and don’t see the point anymore” loop. SOUNDS FAMILIAR ?",
    "That’s why we took a closer look at the journeys we’ve seen again and again. And that’s what led us to one simple solution: #purplePremium."
  ] as const,
  alsoPhotoSrc: "/assets/img/premium-home/why/also-photo.png",
  alsoPhotoAlt: "Student studying at a desk looking stressed",
  compareLead:
    "Below, we’ve laid out some of the biggest challenges students face—and more importantly, how we at #pgs help you avoid them.",
  noLabel: "no",
  yesLabel: "yes",
  vsLabel: "vs",
  noTitle: ["The “Figure It Out”", "Struggle"] as const,
  yesTitle: ["With", "#PurplePremium"] as const,
  noItems: [
    [{ text: "Apply to random programs hoping for the best" }],
    [{ text: "Generic SOPs, reused CVs" }],
    [{ text: "No idea how much the journey will cost" }],
    [{ text: "Confused about timelines, intakes, and deadlines" }],
    [{ text: "Burnt out doing it all alone" }],
    [{ text: "Spend months just figuring things out" }],
    [
      { text: "#Medical ", bold: true },
      {
        text: "students often get stuck after exams or even post-license. With long prep timelines and no clear plan, resume, or job match—it’s easy to lose years. Restarting later takes serious motivation."
      }
    ],
    [
      { text: "No clue how to get into top STEM or MBA programs " },
      { text: "#TopUNIs", bold: true }
    ],
    [{ text: "Struggle to get offer letters" }],
    [{ text: "Always second-guessing" }],
    [{ text: "No profile-building help" }],
    [{ text: "Struggling with scholarships or getting your loan approved?" }]
  ] as const satisfies readonly PremiumHomeWhyPart[][],
  yesItems: [
    [
      {
        text: "Smart university picks tailored to your background, ROI, and success chances"
      }
    ],
    [
      {
        text: "Personalized SOPs, project suggestions, and a CV that stands out"
      }
    ],
    [
      {
        text: "Detailed expense breakdown — from exam fees to till final step "
      },
      { text: "#Medical & #AllPaths", bold: true }
    ],
    [
      {
        text: "Roadmap from day one, with alerts and reminders. So you don’t waste time researching everything yourself."
      },
      { text: " #Medical & #AllPaths ", bold: true }
    ],
    [
      {
        text: "Access to experienced mentors and students who are in the same path"
      }
    ],
    [
      {
        text: "Spend weeks actually moving forward with a plan that works. Every form, every application—guided. Just focus on what really matters: your "
      },
      { text: "#medical", bold: true },
      { text: " license exams or your uni application " },
      { text: "#all", bold: true }
    ],
    [
      {
        text: "Clinical rotation support + interview readiness mapped out "
      },
      { text: "#USMLE", bold: true }
    ],
    [
      {
        text: "University shortlists with scholarship options and pre-interview prep"
      }
    ],
    [{ text: "95% offers within 4 weeks via our university tie-ups" }],
    [{ text: "Clarity and confidence at every step" }],
    [
      {
        text: "Research projects, workshops, and profile upgrades included "
      },
      { text: "#Medical & #AllPaths", bold: true }
    ],
    [{ text: "Multiple pathways planned based on your goals" }]
  ] as const satisfies readonly PremiumHomeWhyPart[][],
  starSrc: "/assets/img/premium-home/why/star.svg",
  checkSrc: "/assets/img/premium-home/why/check.svg",
  crossSrc: "/assets/img/premium-home/why/cross.svg",
  arrowSrc: "/assets/img/premium-home/why/arrow.svg",
  ticker: [
    "2 days left to apply for X University with full waiver. We help you prep.",
    "Parents welcome on consultation calls. We've helped families just like yours plan with confidence."
  ] as const
} as const;

