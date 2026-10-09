/**
 * COURSE2d-D4 — default C12 learners + C13 FAQ slices for detail_body.
 * Sourced from shared fixtures so lab + empty CMS bodies stay aligned.
 */
import { LEARNER_WORDS } from "../shared/learner-words/content";
import { COURSES_FAQ } from "./programs-courses-faq-content";

export type CoursesLearnersBody = {
  lead: string;
  badge: string;
  bodyBefore: string;
  bodyBoldPgs: string;
  bodyMid: string;
  bodyBold3x: string;
  bodyAnd: string;
  bodyBoldSkills: string;
  bodyAfter: string;
  photoSrc: string;
  photoAlt: string;
  quoteSrc: string;
  quoteMob: string;
  cards: { quoteDesk: string }[];
  bio: { name: string; role: string; location: string };
};

export type CoursesFaqBody = {
  heading: string;
  plusIconSrc: string;
  minusIconSrc: string;
  defaultTabId: string;
  defaultOpenIndex: number;
  tabs: {
    id: string;
    label: string;
    items: { question: string; answer: string }[];
  }[];
};

export function defaultCoursesLearners(): CoursesLearnersBody {
  return {
    lead: LEARNER_WORDS.lead,
    badge: LEARNER_WORDS.badge,
    bodyBefore: LEARNER_WORDS.bodyBefore,
    bodyBoldPgs: LEARNER_WORDS.bodyBoldPgs,
    bodyMid: LEARNER_WORDS.bodyMid,
    bodyBold3x: LEARNER_WORDS.bodyBold3x,
    bodyAnd: LEARNER_WORDS.bodyAnd,
    bodyBoldSkills: LEARNER_WORDS.bodyBoldSkills,
    bodyAfter: LEARNER_WORDS.bodyAfter,
    photoSrc: LEARNER_WORDS.photoSrc,
    photoAlt: LEARNER_WORDS.photoAlt,
    quoteSrc: LEARNER_WORDS.quoteSrc,
    quoteMob: LEARNER_WORDS.quoteMob,
    cards: LEARNER_WORDS.cards.map((card) => ({ quoteDesk: card.quoteDesk })),
    bio: { ...LEARNER_WORDS.bio }
  };
}

export function emptyCoursesLearners(): CoursesLearnersBody {
  return {
    lead: "A word from",
    badge: "Our learners",
    bodyBefore: "Also at ",
    bodyBoldPgs: "#PGS",
    bodyMid: ", we believe that with the right prep, skills, and a solid game plan, most students ",
    bodyBold3x: "3x their portfolio ",
    bodyAnd: "and",
    bodyBoldSkills: " gain real-world skills",
    bodyAfter: " along the way.",
    photoSrc: "",
    photoAlt: "",
    quoteSrc: "/assets/img/learner-words/quote.svg",
    quoteMob: "",
    cards: [{ quoteDesk: "" }, { quoteDesk: "" }, { quoteDesk: "" }],
    bio: { name: "", role: "", location: "" }
  };
}

export function defaultCoursesFaq(): CoursesFaqBody {
  return {
    heading: COURSES_FAQ.heading,
    plusIconSrc: COURSES_FAQ.plusIconSrc,
    minusIconSrc: COURSES_FAQ.minusIconSrc,
    defaultTabId: COURSES_FAQ.defaultTabId,
    defaultOpenIndex: COURSES_FAQ.defaultOpenIndex,
    tabs: COURSES_FAQ.tabs.map((tab) => ({
      id: tab.id,
      label: tab.label,
      items: tab.items.map((item) => ({ question: item.question, answer: item.answer }))
    }))
  };
}

export function emptyCoursesFaq(): CoursesFaqBody {
  return {
    heading: "Frequently Asked Questions",
    plusIconSrc: "/assets/img/purple-events/faq-plus.png",
    minusIconSrc: "/assets/img/purple-events/faq-minus.png",
    defaultTabId: "programme-details",
    defaultOpenIndex: 0,
    tabs: [
      { id: "programme-details", label: "Programme Details", items: [] },
      { id: "learning", label: "Programme Learning Experience", items: [] },
      { id: "refund", label: "Refund Policy/Financials", items: [] }
    ]
  };
}
