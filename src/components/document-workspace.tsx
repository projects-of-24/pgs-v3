"use client";

import { useMemo, useState } from "react";
import type { DocumentRequirement, StudentDocument } from "@/lib/premium-workspace";
import {
  createStudentDocumentStorageClient,
  UPLOAD_DOCS_ACCEPT,
  uploadStudentDocument,
  validateUploadFile
} from "@/features/upload-your-docs/upload-document";

function latestActive(requirement: DocumentRequirement): StudentDocument | undefined {
  return [...(requirement.student_documents ?? [])]
    .filter((doc) => !doc.superseded_at && !doc.archived_at && !doc.purged_at)
    .sort((a, b) => b.version - a.version)[0];
}

type LocalSelection = { requirementId: string; file: File; previewUrl: string | null };

export function DocumentWorkspace({ requirements, readOnly = false }: { requirements: DocumentRequirement[]; readOnly?: boolean }) {
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState<LocalSelection | null>(null);
  const storageClient = useMemo(() => createStudentDocumentStorageClient(), []);

  function clearSelection() {
    setSelection((current) => {
      if (current?.previewUrl) URL.revokeObjectURL(current.previewUrl);
      return null;
    });
  }

  function selectLocal(requirementId: string, file: File | undefined) {
    if (!file) return;
    const invalid = validateUploadFile(file);
    if (invalid) {
      setMessage(invalid);
      return;
    }
    clearSelection();
    const previewUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
    setSelection({ requirementId, file, previewUrl });
    setMessage(`Selected ${file.name} (${Math.ceil(file.size / (1024 * 1024))} MB). Review, then upload — or remove to cancel.`);
  }

  async function uploadSelected() {
    if (!selection || !storageClient) return setMessage("Unable to upload right now.");
    const { requirementId, file } = selection;
    const result = await uploadStudentDocument({
      requirementId,
      file,
      storageClient,
      onStatus: setMessage
    });
    if (!result.ok) return setMessage(result.message);
    clearSelection();
    window.location.reload();
  }

  function open(documentId: string) {
    window.open(`/api/premium/documents/${documentId}?redirect=1`, "_blank", "noopener,noreferrer");
  }

  async function requestDeletion(documentId: string) {
    if (!window.confirm("Request deletion of this uploaded document? It will be archived for 90 days, then permanently removed.")) return;
    const response = await fetch(`/api/premium/documents/${documentId}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) return setMessage(result.message);
    window.location.reload();
  }

  const groups = ["required", "additional"] as const;

  return <>
    <p role="status" className="premium-document-status">{message}</p>
    {selection && !readOnly && <section className="premium-document-group" aria-label="Selected file preview">
      <h2 className="fnt-family">Selected file</h2>
      <p className="mb-2">{selection.file.name} · {(selection.file.size / (1024 * 1024)).toFixed(2)} MB</p>
      {/* Local blob preview — next/image cannot optimize object URLs */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {selection.previewUrl && <p><img src={selection.previewUrl} alt="" width={240} height={180} style={{ maxWidth: "240px", height: "auto" }} /></p>}
      <div className="premium-document-actions">
        <button type="button" className="btn btn-black-outline" onClick={() => clearSelection()}>Remove selected file</button>
        <button type="button" className="btn btn-black-upload" onClick={() => void uploadSelected()}>Upload selected file</button>
      </div>
    </section>}
    {groups.map((group) => <section key={group} className="premium-document-group">
      <h2 className="fnt-family">{group === "required" ? "Resource List" : "Additional documents, if we asked for them"}</h2>
      <div className="premium-document-table-wrap">
        <table className="w-100 table border-none text-bold-table">
          <thead><tr><th>Resource Drop</th><th>uploaded on</th><th>qc status</th><th>action</th></tr></thead>
          <tbody>
            {requirements.filter((item) => group === "required" ? item.requirement_kind === "required" : item.requirement_kind !== "required").map((requirement) => {
              const document = latestActive(requirement);
              const canView = Boolean(document && document.scan_status === "clean");
              return <tr key={requirement.id} data-doc-state={document ? "uploaded" : "empty"}>
                <td>{requirement.document_type}</td>
                <td>{document ? new Date(document.uploaded_at).toLocaleDateString("en-GB") : <span className="blank-dots" />}</td>
                <td>{document ? <span className={document.qc_status === "approved" ? "status-approved" : document.qc_status === "in_draft" ? "status-InDraft" : "status-pending"}>{document.qc_status.replace("_", " ")}</span> : <span className="blank-dots" />}</td>
                <td>
                  {document ? (
                    <div className="pgs-upload-docs__actions premium-document-actions" data-mode="view">
                      {canView ? (
                        <button type="button" className="btn btn-black-outline" onClick={() => void open(document.id)}>View</button>
                      ) : (
                        <span className="pgs-upload-docs__scan-wait">Scan pending</span>
                      )}
                      {!readOnly ? (
                        <>
                          <label className="btn btn-black-upload">Re-upload
                            <input hidden type="file" accept={UPLOAD_DOCS_ACCEPT} onChange={(event) => selectLocal(requirement.id, event.target.files?.[0])} />
                          </label>
                          <button type="button" className="premium-delete-document" onClick={() => void requestDeletion(document.id)}>Request deletion</button>
                        </>
                      ) : null}
                    </div>
                  ) : !readOnly ? (
                    <div className="pgs-upload-docs__actions premium-document-actions" data-mode="upload">
                      <label className="btn btn-black-upload">Upload
                        <input hidden type="file" accept={UPLOAD_DOCS_ACCEPT} onChange={(event) => selectLocal(requirement.id, event.target.files?.[0])} />
                      </label>
                    </div>
                  ) : (
                    <span className="blank-dots" />
                  )}
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </section>)}
  </>;
}
