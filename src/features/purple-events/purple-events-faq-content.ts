/**
 * Purple Events E13 FAQ fixtures.
 * Desk `17071:14507` · mob `551:8162`.
 * Figma-visible Programme Details only. Learning / Refund empty (no invent).
 * Desk Q2 used (not mob scholarship paste). Q2 answer empty (closed in Figma).
 */
export type PurpleEventsFaqItem = {
  question: string;
  answer: string;
};

export type PurpleEventsFaqTab = {
  id: string;
  label: string;
  items: PurpleEventsFaqItem[];
};

export const EVENT_FAQ = {
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
  ] as PurpleEventsFaqTab[]
} as const;
