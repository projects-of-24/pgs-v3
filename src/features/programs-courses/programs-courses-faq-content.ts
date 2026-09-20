/**
 * Courses C13 FAQ fixtures.
 * Desk `17072:11640` · mob `551:9580`.
 * Figma-visible Programme Details only. Learning / Refund empty (no invent).
 * Desk Q2 used (not mob scholarship paste). Q2 answer empty (closed in Figma).
 */
export type ProgramsCoursesFaqItem = {
  question: string;
  answer: string;
};

export type ProgramsCoursesFaqTab = {
  id: string;
  label: string;
  items: ProgramsCoursesFaqItem[];
};

export const COURSES_FAQ = {
  heading: "Frequently Asked Questions",
  plusIconSrc: "/assets/img/purple-events/faq-plus.png",
  minusIconSrc: "/assets/img/purple-events/faq-minus.png",
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
  ] as ProgramsCoursesFaqTab[]
} as const;
