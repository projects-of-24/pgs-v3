/**
 * SR-1 — search results fixtures (lab only).
 * Rows copied from Figma `search bar UI` 19075:13657 (query "study in USA").
 * `course` exists in the live endpoint but not in the Figma sample; it renders
 * the same way. `page` / `service` come from a curated route index in SR-3.
 */

export type SearchResultType =
  | "event"
  | "page"
  | "program"
  | "course"
  | "service";

export type SearchResultRow = {
  id: string;
  title: string;
  type: SearchResultType;
  href: string;
};

export const SEARCH_RESULTS_FIXTURES: SearchResultRow[] = [
  {
    id: "fx-1",
    title: "study abroad live with ANJAY",
    type: "event",
    href: "/preview/purpleevents-lite"
  },
  { id: "fx-2", title: "countriesUSA", type: "page", href: "/countriesusa" },
  {
    id: "fx-3",
    title: "HARVARD-USA internsship",
    type: "program",
    href: "/preview/programs-courses"
  },
  { id: "fx-4", title: "studyAbroad", type: "service", href: "/explorecountries" },
  {
    id: "fx-5",
    title: "USMLERotation",
    type: "service",
    href: "/usmlerotation"
  }
];
