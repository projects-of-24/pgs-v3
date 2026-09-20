/**
 * Upload Your Docs fixtures (preview lab Family A).
 * Premium Family B uses live `student_alerts` / requirements when available.
 *
 * Owner name-color legend (row headings):
 * - pending / InDraft → red
 * - Approved → green
 * - ------- → status required (red dashes)
 * - -- → not required (black)
 * - black → default when no upload status
 */

export const UPLOAD_DOCS_ALERTS = [
  "LOR is pending",
  "Two UNIs have proved CAS!",
  "Have to submit application by 28th June, 2025"
] as const;

export const UPLOAD_DOCS_ALERTS_EMPTY = "No alerts right now.";

export const UPLOAD_DOCS_HELPER_LEAD = "Make sure your file is under 50MB.";
export const UPLOAD_DOCS_HELPER_BODY =
  "We accept PDF, JPG, PNG, and MS Word formats. Hit upload when you're ready.";

export type UploadDocsFixtureQc = "Approved" | "InDraft";

/** Empty slot marks — owner legend. */
export type UploadDocsEmptyKind = "required" | "not_required" | "pending";

export type UploadDocsFixtureRow = {
  name: string;
  uploaded: boolean;
  qc: UploadDocsFixtureQc | null;
  /** Only when uploaded=false. Default required. */
  emptyKind?: UploadDocsEmptyKind;
};

/**
 * Family A Resource List fixtures — one truth for desktop + mobile.
 * Column 1 label in Figma desktop = “Resource Drop”; section name = Resource List.
 */
export const UPLOAD_DOCS_FIXTURE_RESOURCES: readonly UploadDocsFixtureRow[] = [
  { name: "Passport Front", uploaded: true, qc: "Approved" },
  { name: "Passport Back", uploaded: true, qc: "InDraft" },
  { name: "CV", uploaded: true, qc: "InDraft" },
  { name: "LoR", uploaded: false, qc: null, emptyKind: "required" },
  { name: "UG Marksheet - 1", uploaded: false, qc: null, emptyKind: "not_required" },
  { name: "UG Consolidated Marksheet", uploaded: false, qc: null, emptyKind: "required" },
  { name: "UG Provisional Certificate", uploaded: false, qc: null, emptyKind: "required" },
  { name: "UG Degree Certificate", uploaded: false, qc: null, emptyKind: "required" },
  { name: "SOP", uploaded: true, qc: "Approved" },
  { name: "12th Marksheet", uploaded: true, qc: "InDraft" },
  { name: "10th Marksheet", uploaded: false, qc: null, emptyKind: "required" },
  { name: "PG Marksheet - 1", uploaded: false, qc: null, emptyKind: "required" },
  { name: "PG Consolidated Marksheet", uploaded: false, qc: null, emptyKind: "required" },
  { name: "PG Provisional Certificate", uploaded: false, qc: null, emptyKind: "required" },
  { name: "PG Degree Certificate", uploaded: false, qc: null, emptyKind: "pending" },
  { name: "pre-journey checklist", uploaded: false, qc: null, emptyKind: "not_required" }
];
