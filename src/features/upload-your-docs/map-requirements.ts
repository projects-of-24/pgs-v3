/**
 * W1/W2 — map Phase 4D requirements → Family B Resource List display rows.
 * W2: includes `documentId` for clean-scan view → GET /api/premium/documents/:id
 */
import type { DocumentRequirement, StudentDocument } from "@/lib/premium-workspace";
import type { UploadDocsEmptyKind, UploadDocsFixtureQc, UploadDocsFixtureRow } from "./content";

export type UploadDocsLiveRow = UploadDocsFixtureRow & {
  /** Requirement id (row key). */
  id: string;
  /** Active `student_documents.id` when uploaded — needed for view. */
  documentId: string | null;
  uploadedOnLabel: string | null;
  /** Non-Approved/InDraft qc_status for plain label. */
  qcRaw?: string | null;
  /** Phase 4D scan gate — view only when clean. */
  scanStatus: string | null;
  canView: boolean;
  /**
   * Short-lived Storage signed URL (minted on page load).
   * Prefer this for view — click skips API. Fallback: `?redirect=1`.
   */
  viewHref?: string | null;
};

function latestActive(requirement: DocumentRequirement): StudentDocument | undefined {
  return [...(requirement.student_documents ?? [])]
    .filter((doc) => !doc.superseded_at && !doc.archived_at && !doc.purged_at)
    .sort((a, b) => b.version - a.version)[0];
}

function formatUploadedOn(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function mapQc(qcStatus: string): UploadDocsFixtureQc | null {
  if (qcStatus === "approved") return "Approved";
  if (qcStatus === "in_draft") return "InDraft";
  return null;
}

function emptyKindFromRequirement(status: string): UploadDocsEmptyKind {
  if (status === "waived") return "not_required";
  return "required";
}

/** Resource List = requirement_kind `required` only (Additional = later gate). */
export function mapRequiredRequirementsToRows(
  requirements: readonly DocumentRequirement[]
): UploadDocsLiveRow[] {
  return requirements
    .filter((item) => item.requirement_kind === "required")
    .map((requirement) => {
      const document = latestActive(requirement);
      if (!document) {
        const emptyKind = emptyKindFromRequirement(requirement.status);
        return {
          id: requirement.id,
          documentId: null,
          name: requirement.document_type,
          uploaded: false,
          qc: null,
          emptyKind,
          uploadedOnLabel: null,
          scanStatus: null,
          canView: false,
          viewHref: null
        };
      }
      const qc = mapQc(document.qc_status);
      return {
        id: requirement.id,
        documentId: document.id,
        name: requirement.document_type,
        uploaded: true,
        qc,
        qcRaw: qc ? null : document.qc_status,
        uploadedOnLabel: formatUploadedOn(document.uploaded_at),
        scanStatus: document.scan_status,
        canView: document.scan_status === "clean",
        viewHref: null
      };
    });
}
