/** Locked Family A fixtures — Figma desktop `17041:14026` · mobile `210:3346`. Not live student data. */

export const FEED_TRACK_PROGRESS_INTRO =
  "This section is built to guide you from Day 1 to your final university admit. It shows every step of your study journey in one clear view. Your mentor will create a personalized map based on your profile. Think of it like your own Kanban board—split into draft, in progress, and completed stages. You’ll always know what’s done, what’s next, and what needs work. No guesswork, no confusion—just your path, laid out clearly.";

export const FEED_TRACK_PROGRESS_ALERTS = [
  "LOR is pending",
  "Two UNIs have proved CAS!",
  "Have to submit application by 28th June, 2025"
] as const;

/** Live PremiumProgressBoard empty copy — B1 honest empty (do not invent). */
export const PROGRESS_ALERTS_EMPTY =
  "No alerts right now. Your mentor will post updates here.";

export const FEED_TRACK_PROGRESS_DRAFT_METER = {
  completed: 3,
  rows: [
    {
      label: "SOP drafts",
      meterSrc: "/assets/img/figma-progress/meter-a.svg"
    },
    {
      label: "Mentor checking Visa Checklist for You",
      meterSrc: "/assets/img/figma-progress/meter-b.svg"
    },
    {
      label: "On Final Draft of your cover letter",
      meterSrc: "/assets/img/figma-progress/meter-c.svg"
    }
  ]
} as const;

export const FEED_TRACK_PROGRESS_REVIEW_QUEUE = {
  completed: 2,
  rows: [
    { label: "Scholarship Essay Reviewed", done: true },
    { label: "Internship Application - King’s College London", done: false },
    { label: "Waiting on LOR Feedback", done: false },
    { label: "Waiting on LOR Feedback", done: false }
  ]
} as const;

export const FEED_TRACK_PROGRESS_COUNSELOR_NOTES = {
  /** How many note bubbles visible at once (arrow window). */
  windowSize: 4,
  rows: [
    { n: 1, body: "Passport needs clearer scan – reupload" },
    { n: 2, body: "LOR missing signature – resend" },
    { n: 3, body: "Degree PDF is password protected – please unlock" },
    { n: 4, body: "Degree PDF is password protected – please unlock" },
    { n: 5, body: "Transcript missing last semester grades" },
    { n: 6, body: "Recommendation letter deadline next week" },
    { n: 7, body: "Upload bank statement for visa file" },
    { n: 8, body: "Confirm intended major on application" }
  ]
} as const;

export const FEED_TRACK_PROGRESS_LOOPBOARD_INTRO = {
  title: "#PGS Loopboard",
  paragraphs: [
    "At PurpleGuide.study, we believe targeted success starts with a clear, well-thought-out study path. Most students waste time going in circles—trying things, pausing, rethinking, and starting over. We’ve seen it happen way too often. But the ones who truly succeed? They know exactly what they’re doing at every step.",
    "That’s where we come in.",
    "At #PGS, we help you build that clarity from day one. After a detailed chat with your counselor and mentor, we reverse-engineer your journey—starting from your goal and working backward to build the right steps for you.",
    "Below, you’ll find your custom roadmap, broken into four key sections. This isn’t some generic plan—it’s built just for you. Our goal? Every PurpleGuide student should know their path from the very beginning."
  ]
} as const;

const TWILIO_BULLETS = [
  "Deck theme as per brand guidelines.",
  "Limit to 12 slides.",
  "Use images from image bank only.",
  "Divide amongst presenters. (Not more than two.)"
] as const;

const TWILIO_SMS =
  "Create new note via SMS. Support text, audio, links, and media." as const;

/** Visual stand-in only — not live Loopboard / student_tasks. */
export const FEED_TRACK_PROGRESS_BOARD = {
  columns: [
    {
      title: "JOURNEY MAP",
      cards: [
        {
          kind: "ticket-list" as const,
          accent: "pink" as const,
          title: "Twilio integration",
          bullets: TWILIO_BULLETS,
          badge: "Important"
        },
        {
          kind: "ticket-text" as const,
          accent: "pink" as const,
          title: "Twilio integration",
          body: TWILIO_SMS
        },
        {
          kind: "ticket-text" as const,
          accent: "pink" as const,
          title: "Twilio integration",
          body: TWILIO_SMS
        },
        {
          kind: "ticket-text" as const,
          accent: "pink" as const,
          title: "Twilio integration",
          body: TWILIO_SMS
        },
        {
          kind: "task" as const,
          title: "Delegate tasks for next week.",
          body: TWILIO_SMS
        }
      ]
    },
    {
      title: "IN PROGRESS",
      cards: [
        {
          kind: "note" as const,
          body: "Log-in extra hours on company portal. Refer your personal Notion database for hours worked."
        },
        {
          kind: "ticket-list" as const,
          accent: "purple" as const,
          title: "Twilio integration",
          bullets: TWILIO_BULLETS
        }
      ]
    },
    {
      title: "draft phase",
      cards: [
        {
          kind: "ticket-list" as const,
          accent: "purple" as const,
          title: "Twilio integration",
          bullets: TWILIO_BULLETS
        },
        {
          kind: "ticket-text" as const,
          accent: "pink" as const,
          title: "Twilio integration",
          body: TWILIO_SMS
        },
        {
          kind: "task" as const,
          title: "Delegate tasks for next week.",
          body: TWILIO_SMS
        },
        {
          kind: "task" as const,
          title: "Delegate tasks for next week.",
          body: TWILIO_SMS
        },
        {
          kind: "task" as const,
          title: "Delegate tasks for next week.",
          body: TWILIO_SMS
        },
        {
          kind: "task" as const,
          title: "Delegate tasks for next week.",
          body: TWILIO_SMS
        }
      ]
    },
    {
      title: "completed",
      cards: [
        {
          kind: "media" as const,
          title: "Gear up for Mt. Fuji!",
          imageSrc: "/assets/img/figma-progress/board-fuji.png",
          emojiSrc: "/assets/img/figma-progress/board-emoji.png"
        },
        {
          kind: "ticket-text" as const,
          accent: "black" as const,
          title: "IELTS exam",
          body: TWILIO_SMS
        },
        {
          kind: "ticket-text" as const,
          accent: "green" as const,
          title: "Twilio integration",
          body: TWILIO_SMS
        },
        {
          kind: "ticket-text" as const,
          accent: "green" as const,
          title: "Twilio integration",
          body: TWILIO_SMS
        }
      ]
    }
  ]
} as const;

export const FEED_TRACK_PROGRESS_PATHWAY = {
  title: "stem PATHWAY",
  chips: [
    {
      id: "name",
      tone: "yellow" as const,
      parts: [
        { kind: "text" as const, text: "Rajeev" },
        { kind: "text" as const, text: "Singh" }
      ]
    },
    {
      id: "role",
      tone: "cyan" as const,
      parts: [
        { kind: "text" as const, text: "MBA Aspirant" },
        { kind: "sep" as const, text: "@" },
        { kind: "text" as const, text: "class of 2025" }
      ]
    }
  ]
} as const;

export const FEED_TRACK_PROGRESS_TIPS = {
  title: "Useful Tips for Your Journey",
  /**
   * W0 fixture carousel — same Figma tip × 3 (Hostinger parity).
   * CMS tips (W1+) = later backend pass. Do not invent alternate tip copy here.
   */
  slides: [
    {
      label: "SOP Flow",
      body: "Don’t start your SOP with your academic history — start with why this dream matters to you. Story > Stats."
    },
    {
      label: "SOP Flow",
      body: "Don’t start your SOP with your academic history — start with why this dream matters to you. Story > Stats."
    },
    {
      label: "SOP Flow",
      body: "Don’t start your SOP with your academic history — start with why this dream matters to you. Story > Stats."
    }
  ]
} as const;

export const FEED_TRACK_PROGRESS_RESOURCE_DROP = {
  title: "Resource Drop",
  /**
   * Figma / Hostinger labels only for Family A UI.
   * Real hrefs = backend pass (owner 2026-09-08). Do not invent links in UI.
   */
  items: ["Visa Docs Checklist", "Sample SOP for STEM", "pre-journey checklist"] as const
} as const;
