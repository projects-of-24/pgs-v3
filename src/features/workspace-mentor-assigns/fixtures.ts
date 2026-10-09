/**
 * FTP-B7a — Mentor Assigns fixtures (shared Tips + Resources for all students).
 * Live DB = FTP-B7b. Seeded from Track Progress Figma fixtures.
 */

export type MentorTipFixture = {
  id: string;
  label: string;
  body: string;
};

export type MentorResourceFixture = {
  id: string;
  label: string;
  /** External URL — wired in B7b; empty OK in fixture UI. */
  url: string;
};

export const MENTOR_ASSIGNS_TIP_FIXTURES: MentorTipFixture[] = [
  {
    id: "tip-1",
    label: "SOP Flow",
    body: "Don't start your SOP with your academic history — start with why this dream matters to you. Story > Stats."
  },
  {
    id: "tip-2",
    label: "SOP Flow",
    body: "Don't start your SOP with your academic history — start with why this dream matters to you. Story > Stats."
  },
  {
    id: "tip-3",
    label: "SOP Flow",
    body: "Don't start your SOP with your academic history — start with why this dream matters to you. Story > Stats."
  }
];

export const MENTOR_ASSIGNS_RESOURCE_FIXTURES: MentorResourceFixture[] = [
  { id: "res-1", label: "Visa Docs Checklist", url: "" },
  { id: "res-2", label: "Sample SOP for STEM", url: "" },
  { id: "res-3", label: "pre-journey checklist", url: "" }
];
