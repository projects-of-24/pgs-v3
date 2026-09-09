/**
 * Resource List — Family A (locked+frost) · Family B Premium (unlocked).
 * Desktop: real <thead> · Mobile: Resource List | Upload band.
 * W1: live required rows. W2: view (pre-signed / redirect). W3: upload + re-upload.
 */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  UPLOAD_DOCS_FIXTURE_RESOURCES,
  type UploadDocsEmptyKind,
  type UploadDocsFixtureQc,
  type UploadDocsFixtureRow
} from "./content";
import type { UploadDocsLiveRow } from "./map-requirements";
import {
  createStudentDocumentStorageClient,
  UPLOAD_DOCS_ACCEPT,
  uploadStudentDocument,
  validateUploadFile
} from "./upload-document";
import "./upload-your-docs-table-stub.css";

const LOCK_SRC = "/assets/img/figma-progress/alerts-lock.svg";
const UPLOADED_ON_FIXTURE = "24 April 2025";

type DisplayRow = {
  key: string;
  requirementId: string | null;
  name: string;
  uploaded: boolean;
  qc: UploadDocsFixtureQc | null;
  qcRaw: string | null;
  emptyKind: UploadDocsEmptyKind;
  uploadedOnLabel: string | null;
  canView: boolean;
  scanPending: boolean;
  documentId: string | null;
  viewHref: string | null;
};

type UploadYourDocsTableStubProps = {
  locked?: boolean;
  /**
   * Live Resource List (`requirement_kind === required`).
   * `undefined` = fixtures (visual lab). `[]` = truthful empty.
   */
  liveRows?: UploadDocsLiveRow[];
  /** Staff preview — no upload/re-upload. */
  readOnly?: boolean;
};

function toDisplayRows(
  locked: boolean,
  liveRows: UploadDocsLiveRow[] | undefined
): { rows: DisplayRow[]; source: "live" | "fixture" } {
  if (!locked && liveRows !== undefined) {
    return {
      source: "live",
      rows: liveRows.map((row) => ({
        key: row.id,
        requirementId: row.id,
        name: row.name,
        uploaded: row.uploaded,
        qc: row.qc,
        qcRaw: row.qcRaw ?? null,
        emptyKind: row.emptyKind ?? "required",
        uploadedOnLabel: row.uploadedOnLabel,
        canView: row.canView,
        scanPending: Boolean(row.uploaded && !row.canView),
        documentId: row.documentId,
        viewHref: row.viewHref ?? null
      }))
    };
  }
  return {
    source: "fixture",
    rows: UPLOAD_DOCS_FIXTURE_RESOURCES.map((row: UploadDocsFixtureRow, index) => ({
      key: `fixture-${index}-${row.name}`,
      requirementId: null,
      name: row.name,
      uploaded: row.uploaded,
      qc: row.qc,
      qcRaw: null,
      emptyKind: row.emptyKind ?? "required",
      uploadedOnLabel: row.uploaded ? UPLOADED_ON_FIXTURE : null,
      canView: row.uploaded,
      scanPending: false,
      documentId: null,
      viewHref: null
    }))
  };
}

function nameToneClass(qc: UploadDocsFixtureQc | null, uploaded: boolean): string {
  if (!uploaded || !qc) return "uyd-table-stub__name uyd-table-stub__name--default";
  if (qc === "Approved") return "uyd-table-stub__name uyd-table-stub__name--approved";
  return "uyd-table-stub__name uyd-table-stub__name--indraft";
}

function EmptyMark({ kind }: { kind: UploadDocsEmptyKind }) {
  if (kind === "not_required") {
    return <span className="uyd-table-stub__mark uyd-table-stub__mark--not-required">--</span>;
  }
  if (kind === "pending") {
    return <span className="uyd-table-stub__mark uyd-table-stub__mark--pending">PENDING</span>;
  }
  return <span className="uyd-table-stub__blank uyd-table-stub__blank--required" aria-hidden="true" />;
}

function FileActionLabel({
  label,
  className,
  disabled,
  inputRef,
  onPick
}: {
  label: string;
  className: string;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onPick: (file: File) => void;
}) {
  return (
    <label className={className} aria-disabled={disabled || undefined}>
      {label}
      <input
        hidden
        type="file"
        accept={UPLOAD_DOCS_ACCEPT}
        disabled={disabled}
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) onPick(file);
        }}
      />
    </label>
  );
}

function RowActions({
  uploaded,
  emptyKind,
  locked,
  scanPending,
  documentId,
  viewHref,
  requirementId,
  uploadLive,
  uploadBusy,
  onUpload
}: {
  uploaded: boolean;
  emptyKind: UploadDocsEmptyKind;
  locked: boolean;
  scanPending: boolean;
  documentId: string | null;
  viewHref: string | null;
  requirementId: string | null;
  uploadLive: boolean;
  uploadBusy: boolean;
  onUpload: (requirementId: string, file: File) => void;
}) {
  if (uploaded) {
    if (scanPending) {
      return <span className="uyd-table-stub__scan-wait">Scan pending</span>;
    }
    if (locked) {
      return <span className="uyd-table-stub__btn uyd-table-stub__btn--view">view</span>;
    }
    const href =
      viewHref ??
      (documentId ? `/api/premium/documents/${documentId}?redirect=1` : null);
    const viewControl = href ? (
      <a
        href={href}
        className="uyd-table-stub__btn uyd-table-stub__btn--view"
        target="_blank"
        rel="noopener noreferrer"
      >
        view
      </a>
    ) : (
      <span className="uyd-table-stub__btn uyd-table-stub__btn--view">view</span>
    );
    /* Desktop: view + re-upload. Mobile ≤600: CSS hides re-upload (Figma = view only). */
    return (
      <span className="uyd-table-stub__actions">
        {viewControl}
        {uploadLive && requirementId ? (
          <FileActionLabel
            label="re-upload"
            className="uyd-table-stub__btn uyd-table-stub__btn--reupload"
            disabled={uploadBusy}
            onPick={(file) => onUpload(requirementId, file)}
          />
        ) : (
          <span className="uyd-table-stub__btn uyd-table-stub__btn--reupload">re-upload</span>
        )}
      </span>
    );
  }
  if (emptyKind === "not_required") {
    return <EmptyMark kind="not_required" />;
  }
  if (uploadLive && requirementId) {
    return (
      <FileActionLabel
        label="upload"
        className="uyd-table-stub__btn uyd-table-stub__btn--upload"
        disabled={uploadBusy}
        onPick={(file) => onUpload(requirementId, file)}
      />
    );
  }
  return <span className="uyd-table-stub__btn uyd-table-stub__btn--upload">upload</span>;
}

function QcCell({
  qc,
  qcRaw,
  uploaded,
  emptyKind
}: {
  qc: UploadDocsFixtureQc | null;
  qcRaw: string | null;
  uploaded: boolean;
  emptyKind: UploadDocsEmptyKind;
}) {
  if (qc === "Approved") {
    return <span className="uyd-table-stub__badge uyd-table-stub__badge--approved">Approved</span>;
  }
  if (qc === "InDraft") {
    return <span className="uyd-table-stub__badge uyd-table-stub__badge--indraft">InDraft</span>;
  }
  if (uploaded && qcRaw) {
    return <span className="uyd-table-stub__qc-raw">{qcRaw.replaceAll("_", " ")}</span>;
  }
  return <EmptyMark kind={emptyKind === "not_required" ? "not_required" : "required"} />;
}

export function UploadYourDocsTableStub({
  locked = true,
  liveRows,
  readOnly = false
}: UploadYourDocsTableStubProps) {
  const { rows, source } = toDisplayRows(locked, liveRows);
  const live = !locked && source === "live";
  const uploadLive = live && !readOnly;
  const router = useRouter();
  const storageClient = useMemo(() => createStudentDocumentStorageClient(), []);
  const [statusMessage, setStatusMessage] = useState("");
  const [busyRequirementId, setBusyRequirementId] = useState<string | null>(null);
  const statusTone = statusMessage.startsWith("Unable") || statusMessage.includes("failed")
    ? "error"
    : "info";

  async function handleUpload(requirementId: string, file: File) {
    const invalid = validateUploadFile(file);
    if (invalid) {
      setStatusMessage(invalid);
      return;
    }
    if (!storageClient) {
      setStatusMessage("Unable to upload right now.");
      return;
    }
    setBusyRequirementId(requirementId);
    const result = await uploadStudentDocument({
      requirementId,
      file,
      storageClient,
      onStatus: setStatusMessage
    });
    setBusyRequirementId(null);
    if (!result.ok) {
      setStatusMessage(result.message);
      return;
    }
    setStatusMessage("Uploaded. Refreshing list…");
    router.refresh();
  }

  return (
    <section
      className="uyd-table-stub"
      data-pgs-module="upload-your-docs-table-stub"
      data-docs-family={locked ? "locked" : "premium"}
      data-block-gate={locked ? "a2" : "b2"}
      data-wire={live ? "w3-upload" : undefined}
      data-row-source={source}
      data-figma-desktop-list="18375:11659"
      data-figma-desktop-frost={locked ? "18375:11688" : undefined}
      data-figma-desktop-premium={locked ? undefined : "17041:15265"}
      data-actions={
        locked
          ? "visual-locked"
          : uploadLive
            ? "view-upload-live"
            : live
              ? "view-live-readonly"
              : "view-reupload-visual"
      }
      data-readonly={readOnly ? "true" : undefined}
      aria-labelledby="uyd-resource-list-heading"
    >
      <h2 id="uyd-resource-list-heading" className="uyd-table-stub__heading">
        Resource List
      </h2>

      {statusMessage ? (
        <p
          className={
            statusTone === "error"
              ? "uyd-table-stub__status uyd-table-stub__status--error"
              : "uyd-table-stub__status"
          }
          role="status"
        >
          {statusMessage}
        </p>
      ) : null}

      <div className="uyd-table-stub__wrap">
        <div className="uyd-table-stub__colheads-mobile" aria-hidden="true">
          <span>Resource List</span>
          <span>Upload</span>
        </div>

        <table className="uyd-table-stub__table">
          <thead>
            <tr>
              <th scope="col">Resource Drop</th>
              <th scope="col">uploaded on</th>
              <th scope="col">qc status</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="uyd-table-stub__empty">
                  No required documents yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                const emptyKind = row.emptyKind;
                return (
                  <tr key={row.key} data-uploaded={row.uploaded ? "true" : "false"}>
                    <td data-label="Resource Drop">
                      <span className={nameToneClass(row.qc, row.uploaded)}>{row.name}</span>
                    </td>
                    <td data-label="uploaded on">
                      {row.uploaded && row.uploadedOnLabel ? (
                        <span className="uyd-table-stub__uploaded">
                          <span className="uyd-table-stub__uploaded-label">UPLOADED ON </span>
                          <span className="uyd-table-stub__uploaded-date">{row.uploadedOnLabel}</span>
                        </span>
                      ) : (
                        <EmptyMark kind={emptyKind === "not_required" ? "not_required" : "required"} />
                      )}
                    </td>
                    <td data-label="qc status">
                      <QcCell
                        qc={row.qc}
                        qcRaw={row.qcRaw}
                        uploaded={row.uploaded}
                        emptyKind={emptyKind}
                      />
                    </td>
                    <td data-label="action">
                      <RowActions
                        uploaded={row.uploaded}
                        emptyKind={emptyKind}
                        locked={locked}
                        scanPending={row.scanPending}
                        documentId={row.documentId}
                        viewHref={row.viewHref}
                        requirementId={row.requirementId}
                        uploadLive={uploadLive}
                        uploadBusy={busyRequirementId === row.requirementId}
                        onUpload={(id, file) => void handleUpload(id, file)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {locked ? (
          <div className="uyd-table-stub__forlocked" aria-hidden="true">
            <Image src={LOCK_SRC} alt="" width={48} height={48} className="uyd-table-stub__lock" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
