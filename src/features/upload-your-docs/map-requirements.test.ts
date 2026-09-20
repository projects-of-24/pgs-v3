import { describe, expect, it } from "vitest";
import type { DocumentRequirement } from "@/lib/premium-workspace";
import { mapRequiredRequirementsToRows } from "./map-requirements";

describe("mapRequiredRequirementsToRows", () => {
  it("keeps only required kind and maps uploaded clean approved", () => {
    const requirements: DocumentRequirement[] = [
      {
        id: "req-1",
        document_type: "Passport Front",
        requirement_kind: "required",
        status: "approved",
        instructions: "",
        sort_order: 1,
        student_documents: [
          {
            id: "doc-1",
            requirement_id: "req-1",
            storage_path: "lab/req-1/pass.pdf",
            original_filename: "pass.pdf",
            mime_type: "application/pdf",
            byte_size: 100,
            version: 1,
            qc_status: "approved",
            scan_status: "clean",
            uploaded_at: "2025-04-24T12:00:00.000Z"
          }
        ]
      },
      {
        id: "req-extra",
        document_type: "Extra letter",
        requirement_kind: "additional",
        status: "missing",
        instructions: "",
        sort_order: 2,
        student_documents: []
      }
    ];

    const rows = mapRequiredRequirementsToRows(requirements);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.name).toBe("Passport Front");
    expect(rows[0]?.uploaded).toBe(true);
    expect(rows[0]?.qc).toBe("Approved");
    expect(rows[0]?.canView).toBe(true);
    expect(rows[0]?.documentId).toBe("doc-1");
    expect(rows[0]?.uploadedOnLabel).toMatch(/April 2025/);
  });

  it("maps empty waived to not_required and scan-pending when not clean", () => {
    const requirements: DocumentRequirement[] = [
      {
        id: "req-2",
        document_type: "UG Marksheet - 1",
        requirement_kind: "required",
        status: "waived",
        instructions: "",
        sort_order: 1,
        student_documents: []
      },
      {
        id: "req-3",
        document_type: "CV",
        requirement_kind: "required",
        status: "uploaded",
        instructions: "",
        sort_order: 2,
        student_documents: [
          {
            id: "doc-2",
            requirement_id: "req-3",
            storage_path: "lab/req-3/cv.pdf",
            original_filename: "cv.pdf",
            mime_type: "application/pdf",
            byte_size: 50,
            version: 1,
            qc_status: "in_draft",
            scan_status: "pending",
            uploaded_at: "2025-04-24T12:00:00.000Z"
          }
        ]
      }
    ];

    const rows = mapRequiredRequirementsToRows(requirements);
    expect(rows[0]?.emptyKind).toBe("not_required");
    expect(rows[0]?.uploaded).toBe(false);
    expect(rows[1]?.qc).toBe("InDraft");
    expect(rows[1]?.canView).toBe(false);
    expect(rows[1]?.documentId).toBe("doc-2");
  });
});
