/**
 * Event detail template fixtures (F-E).
 * Field names mirror existing Supabase `events` / facilitators where possible
 * so B* can plug live rows later. No DB reads in F-E.
 */

export type PurpleEventDateParts = {
  day: string;
  month: string;
  year: string;
  time: string;
};

export type PurpleEventFacilitator = {
  name: string;
  role: string;
  biography: string;
  image: string;
};

export type PurpleEventCoverItem = {
  label: string;
  image?: string;
};

export type PurpleEventFaqItem = {
  question: string;
  answer: string;
};

export type PurpleEventTestimonial = {
  id: string;
  quote: string;
  name: string;
  /** e.g. `#UK` */
  pathLabel: string;
  /** e.g. `masters` — mob top-right; hidden on desk E11a */
  programLabel: string;
  /** Desk: `#purplePremium student` · mob shortens in E11b */
  premiumLabel: string;
  image: string;
  imageAlt: string;
};

/** Fixture shaped for the Figma `#purpleEVENTS` base detail template. */
export type PurpleEventSessionFixture = {
  id: string;
  title: string;
  headline: string;
  summary: string;
  host: string;
  topLabel: string;
  badge: string;
  mode: string;
  locationNote: string;
  whoIsItFor: string;
  whoForNote: string;
  tags: string[];
  start: PurpleEventDateParts;
  end: PurpleEventDateParts;
  startsAt: string | null;
  endsAt: string | null;
  bookingUrl: string;
  bookingCta: string;
  heroImage: string;
  heroImageAlt: string;
  fillingBadge: string;
  fillingIcon: string;
  shareIcon: string;
  speakerName: string;
  speakerBio: string;
  /** E3 — Who / topics green blocks */
  whoBlockHeading: string;
  whoAudience: string;
  whoCloser: string;
  topicsHeading: string;
  topics: string[];
  coverHeading: string;
  coverItems: PurpleEventCoverItem[];
  perksHeading: string;
  perks: string[];
  facilitatorsHeading: string;
  facilitators: PurpleEventFacilitator[];
  /** E7 — sticky note + trac copy */
  stickyBody: string;
  tracHeadline: string;
  tracBody: string;
  moreSessionsLead: string;
  moreSessionsBold: string;
  upcomingHeading: string;
  shareHeading: string;
  shareBody: string;
  /** Bold substrings inside shareBody (fixture order). */
  shareBodyBold: string[];
  /** Flat Figma exports — desk `17071:14067` · mob `551:7711` */
  posterDesk: string;
  posterMob: string;
  posterDownloadHref: string;
  socials: { id: string; label: string; href: string; icon: string }[];
  highlightsEyebrow: string;
  highlightsTitle: string;
  highlightsPlace: string;
  highlightsBody: string;
  highlightImages: string[];
  testimonials: PurpleEventTestimonial[];
  outroEyebrow: string;
  outroTitle: string;
  outroBody: string;
  outroCta: string;
  outroHref: string;
  faqHeading: string;
  faq: PurpleEventFaqItem[];
};

/**
 * E1 invite fixture — Figma `#purpleEVENTS` invite (desk 17071:12186 · mob 551:9013).
 * Empty fields remain for later blocks.
 */
export const EVENT_SESSION_FIXTURE: PurpleEventSessionFixture = {
  id: "fixture",
  title: "Online study abroad plan meetup.",
  headline: "Online study abroad plan meetup.",
  summary: "",
  host: "#teamPGS",
  topLabel: "#inCampus",
  badge: "Filling Fast",
  mode: "",
  locationNote: "Live on Zoom | You’ll get the link after signing up",
  whoIsItFor: "This Session Is Designed for MBA, Master’s & Engineering Applicants",
  whoForNote:
    "More sessions coming up for Medical & STEM aspirants — reach out to our counsellors.",
  tags: ["#UK", "#AUS"],
  start: { day: "31", month: "Dec", year: "25", time: "12pm to 2 pm" },
  end: { day: "01", month: "Jan", year: "26", time: "12pm to 2 pm" },
  startsAt: null,
  endsAt: null,
  bookingUrl: "",
  bookingCta: "Book Your Seat",
  heroImage: "/assets/img/purple-events/hero-invite.jpg",
  heroImageAlt: "",
  fillingBadge: "Filling Fast",
  fillingIcon: "/assets/img/purple-events/fire-filling.gif",
  shareIcon: "/assets/img/purple-events/share.svg",
  speakerName: "Anjay Nilmek",
  speakerBio: "20+ Years as mentor, Helped students across various paths",
  whoBlockHeading: "Who’s It For?",
  whoAudience: "Final-year student?\nRecent grad? Researching\nfor masters?",
  whoCloser: "This session’s made for you.",
  topicsHeading: "Session Topics",
  topics: [
    "Masters in USA",
    "UK for graduates",
    "How to prepare your finances"
  ],
  coverHeading: "What We’ll Cover in This Session:",
  coverItems: [
    {
      label: "How to shortlist unis that actually match your profile",
      image: "/assets/img/purple-events/cover/icon.svg"
    },
    {
      label: "Avoid common SOP/LOR mistakes that cost students",
      image: "/assets/img/purple-events/cover/icon.svg"
    },
    {
      label: "How Research Matters in your application",
      image: "/assets/img/purple-events/cover/icon.svg"
    },
    {
      label: "If you have gap in your profile or low CGPA how to proceed",
      image: "/assets/img/purple-events/cover/icon.svg"
    },
    {
      label: "What scholarships you be getting & what you need to do.",
      image: "/assets/img/purple-events/cover/icon.svg"
    }
  ],
  perksHeading:
    "And a few more to\nmake sure you're on\nthe right part.",
  perks: [
    "Welcome Kit",
    "Live Q&A with Expert Counsellors",
    "Tips that you should know",
    "Goal-tracking and reflection chart",
    "Prep templates"
  ],
  facilitatorsHeading: "Meet Your Facilitators",
  facilitators: [
    {
      name: "Anjay Nilmek",
      role: "Counsellor & student strategist",
      biography:
        "With over a decade of guiding creative professionals, Priyanka brings clarity, structure, and a spark of inspiration to every session.",
      image: "/assets/img/purple-events/facilitators/anjay.png"
    },
    {
      name: "Priyanka\nSaha",
      role: "Counsellor & student strategist",
      biography:
        "With over a decade of guiding creative professionals, Priyanka brings clarity, structure, and a spark of inspiration to every session.",
      image: "/assets/img/purple-events/facilitators/priyanka.png"
    }
  ],
  stickyBody:
    "This is a tailor made\nevent for Masters,\nengineering & Mba Aspirants",
  tracHeadline: "Walk away with a clear roadmap for your study abroad journey.",
  tracBody:
    "Get tips, avoid common mistakes, and boost your admit chances to top UK universities—plus crack scholarships, SOPs, and ROI planning like a pro.",
  moreSessionsLead:
    "More sessions coming up for Medical aspirants & for STEAM streams connect with our counselors to get started. ",
  moreSessionsBold: "Get your seat locked.",
  upcomingHeading: "",
  shareHeading: "Download the poster. Share it.\nTag us on your fav socials.",
  shareBody:
    "Help us spread the word, and you might just win a Purple Hamper and get free guidance on one research project. Become a #PurpleAmbassador.",
  shareBodyBold: ["Purple Hamper", "get free guidance on one research project"],
  posterDesk: "/assets/img/purple-events/share/poster-desk.png?v=3",
  posterMob: "/assets/img/purple-events/share/poster-mob.png?v=3",
  posterDownloadHref: "/assets/img/purple-events/share/poster-desk.png?v=3",
  socials: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "#",
      icon: "/assets/img/purple-events/share/whatsapp.png"
    },
    {
      id: "messenger",
      label: "Messenger",
      href: "#",
      icon: "/assets/img/purple-events/share/messenger.png"
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "#",
      icon: "/assets/img/purple-events/share/instagram.png"
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "#",
      icon: "/assets/img/purple-events/share/facebook.png"
    }
  ],
  highlightsEyebrow: "",
  highlightsTitle: "",
  highlightsPlace: "",
  highlightsBody: "",
  highlightImages: [],
  testimonials: [
    {
      id: "vilivi",
      quote:
        "Everything changed when I crossed paths with my mentor, Mr. Nilmek of purpleGuide. Back when uncertainty clouded my path, they gave me more than just the right guidance—they offered unwavering support and care at every step. For me, they didn’t just make my dream possible—they made it happen.",
      name: "vilivi p aye",
      pathLabel: "#UK",
      programLabel: "masters",
      premiumLabel: "#purplePremium student",
      image: "/assets/img/purple-events/testimonials/vilivi.jpg",
      imageAlt: "Vilivi P Aye smiling outdoors at night in the UK"
    },
    {
      id: "fixture-2",
      quote:
        "The Purple Events sessions turned vague study-abroad plans into a clear path. Mentors answered every question, and I left knowing exactly what to do next for applications and funding.",
      name: "aisha k",
      pathLabel: "#IE",
      programLabel: "bachelors",
      premiumLabel: "#purplePremium student",
      image: "/assets/img/purple-events/testimonials/aisha.jpg",
      imageAlt: "Aisha K portrait"
    },
    {
      id: "fixture-3",
      quote:
        "I joined for one meetup and stayed for the community. Honest timelines, real university talk, and people who actually check in after the session ends.",
      name: "rahul m",
      pathLabel: "#CA",
      programLabel: "masters",
      premiumLabel: "#purplePremium student",
      image: "/assets/img/purple-events/testimonials/rahul.jpg",
      imageAlt: "Rahul M portrait"
    }
  ],
  outroEyebrow: "Let's Go",
  outroTitle: "Ready to get started?",
  outroBody: "Let’s chart your study abroad path, together with Team #PGS.",
  outroCta: "Start Your Journey",
  outroHref: "",
  faqHeading: "Frequently Asked Questions",
  faq: []
};
