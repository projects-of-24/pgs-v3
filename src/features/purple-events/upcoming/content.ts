/**
 * E8 Upcoming rail — UI fixtures only (no DB / no Supabase).
 * B* later plugs real event rows + staff "show N".
 * Cards reuse locked PurpleEventFaceCard shape.
 */

import type { PurpleEventFaceCard } from "../face-card/content";

export const UPCOMING_HEADING = "Upcoming Sessions";

const BASE = {
  href: "/preview/purpleevents-lite",
  cta: "Learn More",
  photo: "/assets/img/purple-events/face/photo.jpg",
  photoAlt: "",
  whoHeading: "Who’s It For?",
  whoLines: [
    "Final-year student? Recent grad? Researching for masters?",
    "This session’s made for you."
  ],
  topicsHeading: "Topics Covered",
  topics: ["Masters in USA", "UK for graduates", "How to prepare your finances"],
  speakerName: "Anjay Nilmek",
  speakerBioLines: [
    "20+ Years as mentor,",
    "Helped students across various paths"
  ],
  fillingBadge: "Filling Fast",
  fillingIcon: "/assets/img/purple-events/fire-filling.gif",
  modeLabel: "#inCampus",
  tags: ["#UK", "#AUS"],
  designedForLines: [
    "This Session Is Designed",
    "for MBA, Master’s &",
    "Engineering Applicants"
  ],
  designedNote:
    "More sessions coming up for Medical & STEM aspirants — reach out to our counsellors.",
  shareIcon: "/assets/img/purple-events/share.svg",
  shareLabel: "Share this event",
  /** Same filled heart as `FACE_SHARED` — visual only (save deferred B*). */
  heartIcon: "/assets/img/purple-events/face/cvready/heart-filled.svg"
} as const;

/**
 * Six fake UI events for scroll QC (desk ~3 visible · mob ~2).
 * Mix open + closed. No database.
 */
export const UPCOMING_FACE_RAIL: PurpleEventFaceCard[] = [
  {
    ...BASE,
    id: "upcoming-1",
    status: "open",
    headlineLines: ["Online study abroad", "plan meetup."],
    start: { day: "31", month: "Dec", year: "25", time: "12pm to 2 pm" },
    end: { day: "01", month: "Jan", year: "26", time: "12pm to 2 pm" },
    closedLabel: ""
  },
  {
    ...BASE,
    id: "upcoming-2",
    status: "open",
    headlineLines: ["UK masters roadmap", "live clinic."],
    start: { day: "07", month: "Jan", year: "26", time: "4pm to 6 pm" },
    end: { day: "08", month: "Jan", year: "26", time: "4pm to 6 pm" },
    tags: ["#UK", "#MBA"],
    modeLabel: "#Online",
    closedLabel: ""
  },
  {
    ...BASE,
    id: "upcoming-3",
    status: "closed",
    headlineLines: ["Online study abroad", "plan meetup."],
    start: { day: "15", month: "Jun", year: "25", time: "12pm to 2 pm" },
    end: { day: "16", month: "Jun", year: "25", time: "12pm to 2 pm" },
    closedLabel: "Closed on June 15 – 46 students registered"
  },
  {
    ...BASE,
    id: "upcoming-4",
    status: "open",
    headlineLines: ["STEM path abroad", "ask-anything."],
    start: { day: "14", month: "Jan", year: "26", time: "11am to 1 pm" },
    end: { day: "15", month: "Jan", year: "26", time: "11am to 1 pm" },
    tags: ["#AUS", "#STEM"],
    topics: ["Australia STEM", "Visa timeline", "How to shortlist unis"],
    closedLabel: ""
  },
  {
    ...BASE,
    id: "upcoming-5",
    status: "open",
    headlineLines: ["Finance for visas", "family briefing."],
    start: { day: "21", month: "Jan", year: "26", time: "6pm to 7 pm" },
    end: { day: "21", month: "Jan", year: "26", time: "6pm to 7 pm" },
    tags: ["#Finance"],
    modeLabel: "#Online",
    closedLabel: ""
  },
  {
    ...BASE,
    id: "upcoming-6",
    status: "closed",
    headlineLines: ["Medical pathway", "intro night."],
    start: { day: "02", month: "May", year: "25", time: "5pm to 7 pm" },
    end: { day: "02", month: "May", year: "25", time: "5pm to 7 pm" },
    tags: ["#Med", "#USMLE"],
    closedLabel: "Closed on May 2 – 38 students registered"
  }
];
