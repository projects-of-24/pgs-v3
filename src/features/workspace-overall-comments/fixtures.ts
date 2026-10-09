/**
 * WS-OC-1 — fixture inbox only. Not DB. Mentor caseload shape for QC.
 * Live wire = WS-OC-2 (`workspace_comments` · mentor_assignments scope).
 */

export type OverallCommentFixtureStatus = "needs_reply" | "replied" | "student_waiting";

export type OverallCommentFixtureMessage = {
  id: string;
  author: "student" | "staff";
  authorLabel: string;
  body: string;
  at: string;
};

export type OverallCommentFixtureRow = {
  id: string;
  studentId: string | null;
  studentName: string;
  pgsId: string;
  preview: string;
  updatedAt: string;
  status: OverallCommentFixtureStatus;
  messages: OverallCommentFixtureMessage[];
};

/** Progress Lab Premium — Open Desk can hit a real desk when that student exists. */
export const WS_OC1_LAB_STUDENT_ID = "c1000000-0000-4000-8000-000000000001";

export const WS_OC1_FIXTURE_ROWS: readonly OverallCommentFixtureRow[] = [
  {
    id: "oc1-asha",
    studentId: WS_OC1_LAB_STUDENT_ID,
    studentName: "Progress Lab Premium",
    pgsId: "PGS261119",
    preview: "Can you check my SOP draft again?",
    updatedAt: "2026-10-08 · 16:55",
    status: "needs_reply",
    messages: [
      {
        id: "m1",
        author: "student",
        authorLabel: "Progress Lab Premium",
        body: "Can you check my SOP draft again?",
        at: "2026-10-08 · 16:55"
      },
      {
        id: "m0",
        author: "staff",
        authorLabel: "Progress Lab Super Admin",
        body: "Send the latest version when ready.",
        at: "2026-10-08 · 14:10"
      }
    ]
  },
  {
    id: "oc1-rahul",
    studentId: null,
    studentName: "Rahul Fixture",
    pgsId: "PGS-FIX-002",
    preview: "Documents uploaded — waiting on QC.",
    updatedAt: "2026-10-07 · 11:20",
    status: "student_waiting",
    messages: [
      {
        id: "m2",
        author: "staff",
        authorLabel: "Progress Lab Super Admin",
        body: "Please upload the passport scan.",
        at: "2026-10-07 · 09:00"
      },
      {
        id: "m3",
        author: "student",
        authorLabel: "Rahul Fixture",
        body: "Documents uploaded — waiting on QC.",
        at: "2026-10-07 · 11:20"
      }
    ]
  },
  {
    id: "oc1-maya",
    studentId: null,
    studentName: "Maya Fixture",
    pgsId: "PGS-FIX-003",
    preview: "Thanks — that helps!",
    updatedAt: "2026-10-06 · 18:02",
    status: "replied",
    messages: [
      {
        id: "m4",
        author: "student",
        authorLabel: "Maya Fixture",
        body: "Which universities should I shortlist first?",
        at: "2026-10-06 · 17:40"
      },
      {
        id: "m5",
        author: "staff",
        authorLabel: "Progress Lab Super Admin",
        body: "Start with your top 3 from Top Picks — we can refine tomorrow.",
        at: "2026-10-06 · 18:00"
      },
      {
        id: "m6",
        author: "student",
        authorLabel: "Maya Fixture",
        body: "Thanks — that helps!",
        at: "2026-10-06 · 18:02"
      }
    ]
  }
];

export function overallCommentStatusLabel(status: OverallCommentFixtureStatus): string {
  switch (status) {
    case "needs_reply":
      return "Needs reply";
    case "student_waiting":
      return "Waiting on student";
    case "replied":
      return "Replied";
  }
}
