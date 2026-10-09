/**
 * WS-OC-1 — fixture inbox only. Not live DB.
 * Rows pretend a Mentor caseload (assigned students only).
 */

export type OverallCommentStatus = "needs_reply" | "replied" | "waiting_student";

export type OverallCommentMessage = {
  id: string;
  author: "student" | "staff";
  authorLabel: string;
  body: string;
  at: string;
};

export type OverallCommentThread = {
  id: string;
  studentId: string;
  studentName: string;
  pgsId: string;
  mentorLabel: string;
  premium: boolean;
  latestPreview: string;
  updatedAt: string;
  status: OverallCommentStatus;
  messages: OverallCommentMessage[];
};

export const OVERALL_COMMENTS_FIXTURES: readonly OverallCommentThread[] = [
  {
    id: "oc-fix-1",
    studentId: "fixture-asha",
    studentName: "Asha Patel",
    pgsId: "PGS261101",
    mentorLabel: "You (assigned)",
    premium: true,
    latestPreview: "Can you check my SOP draft again?",
    updatedAt: "2h ago",
    status: "needs_reply",
    messages: [
      {
        id: "m1",
        author: "student",
        authorLabel: "Asha Patel",
        body: "Hi — I uploaded a new SOP version.",
        at: "Yesterday · 16:20"
      },
      {
        id: "m2",
        author: "staff",
        authorLabel: "You",
        body: "Got it — I’ll review by tomorrow.",
        at: "Yesterday · 17:05"
      },
      {
        id: "m3",
        author: "student",
        authorLabel: "Asha Patel",
        body: "Can you check my SOP draft again?",
        at: "Today · 09:12"
      }
    ]
  },
  {
    id: "oc-fix-2",
    studentId: "fixture-rahul",
    studentName: "Rahul Mehta",
    pgsId: "PGS261118",
    mentorLabel: "You (assigned)",
    premium: true,
    latestPreview: "Thanks — I’ll upload the transcript today.",
    updatedAt: "1d ago",
    status: "waiting_student",
    messages: [
      {
        id: "m1",
        author: "staff",
        authorLabel: "You",
        body: "Please upload the official transcript when ready.",
        at: "1 day ago · 11:40"
      },
      {
        id: "m2",
        author: "student",
        authorLabel: "Rahul Mehta",
        body: "Thanks — I’ll upload the transcript today.",
        at: "1 day ago · 14:02"
      }
    ]
  },
  {
    id: "oc-fix-3",
    studentId: "fixture-maya",
    studentName: "Maya Chen",
    pgsId: "PGS261122",
    mentorLabel: "You (assigned)",
    premium: false,
    latestPreview: "Interview prep notes look good — keep practicing.",
    updatedAt: "3d ago",
    status: "replied",
    messages: [
      {
        id: "m1",
        author: "student",
        authorLabel: "Maya Chen",
        body: "Any tips before my UnivMeet?",
        at: "3 days ago · 10:00"
      },
      {
        id: "m2",
        author: "staff",
        authorLabel: "You",
        body: "Interview prep notes look good — keep practicing.",
        at: "3 days ago · 12:30"
      }
    ]
  },
  {
    id: "oc-fix-4",
    studentId: "fixture-dev",
    studentName: "Dev Sharma",
    pgsId: "PGS261130",
    mentorLabel: "You (assigned)",
    premium: true,
    latestPreview: "I have a question about the LoR timeline.",
    updatedAt: "5h ago",
    status: "needs_reply",
    messages: [
      {
        id: "m1",
        author: "student",
        authorLabel: "Dev Sharma",
        body: "I have a question about the LoR timeline.",
        at: "Today · 06:45"
      }
    ]
  }
];

export function overallCommentStatusLabel(status: OverallCommentStatus): string {
  switch (status) {
    case "needs_reply":
      return "Needs reply";
    case "waiting_student":
      return "Waiting on student";
    case "replied":
      return "Replied";
  }
}
