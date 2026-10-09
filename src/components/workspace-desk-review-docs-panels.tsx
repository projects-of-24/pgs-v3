"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ClipboardList, FileText, FolderOpen, Pencil, Send, Trash2 } from "lucide-react";
import { requestStaffWorkspace } from "@/components/staff-workspace-request";
import type { DocumentRequirement, PremiumWorkspace } from "@/lib/premium-workspace";
import styles from "./workspace-desk-comments.module.css";

function formText(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
}

export type StaffNote = {
  id: string;
  body: string;
  visibility: string;
  created_at: string;
  author_id: string;
};

type ReviewRow = PremiumWorkspace["reviews"][number];

function formatTime(value: string) {
  return new Date(value).toLocaleString("en-GB");
}

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

function useWorkspaceSave(studentId: string) {
  const [message, setMessage] = useState("");
  async function save(resource: string, method: "POST" | "PATCH" | "DELETE", values: Record<string, unknown>) {
    setMessage("Saving…");
    const error = await requestStaffWorkspace(studentId, resource, method, values);
    if (error) setMessage(error);
    else setMessage("Saved.");
  }
  return { message, setMessage, save };
}

function PanelShell({ children, message }: { children: ReactNode; message: string }) {
  return (
    <section className={`ops-ws-desk-panel ${styles.panel}`} data-ws-body-scroll>
      {message ? (
        <p className={styles.saveStatus} role="status">
          {message}
        </p>
      ) : null}
      {children}
    </section>
  );
}

function isCurrentDocument(document: NonNullable<DocumentRequirement["student_documents"]>[number]) {
  return !document.superseded_at && !document.archived_at && !document.purged_at;
}

/**
 * WS-DESK — Reviews tab only (Comments-style card flow).
 */
export function StaffWorkspaceReviewsPanel({
  studentId,
  canManage,
  reviews
}: {
  studentId: string;
  canManage: boolean;
  reviews: PremiumWorkspace["reviews"];
}) {
  const { message, setMessage, save } = useWorkspaceSave(studentId);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [rows, setRows] = useState<ReviewRow[]>(() => [...reviews]);
  const [syncedReviews, setSyncedReviews] = useState(reviews);
  if (reviews !== syncedReviews) {
    setSyncedReviews(reviews);
    setRows([...reviews]);
  }
  const completedReviews = rows.filter((item) => item.status === "completed").length;

  async function postReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await save("reviews", "POST", {
      title: formText(data, "title"),
      details: formText(data, "details"),
      status: formText(data, "status") || "queued",
      student_visible: formText(data, "student_visible") === "true",
      sort_order: Number(formText(data, "sort_order") || 0)
    });
    form.reset();
  }

  async function saveReviewEdit(event: FormEvent<HTMLFormElement>, item: ReviewRow) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: ReviewRow = {
      ...item,
      title: formText(data, "title").trim(),
      details: formText(data, "details").trim(),
      status: formText(data, "status") || item.status,
      student_visible: formText(data, "student_visible") === "true",
      sort_order: Number(formText(data, "sort_order") || 0)
    };
    if (!next.title) return;

    // Show saved details on the card immediately; full reload follows on success.
    setRows((current) => current.map((row) => (row.id === item.id ? next : row)));
    setEditingReviewId(null);
    setMessage("Saving…");

    const error = await requestStaffWorkspace(studentId, "reviews", "PATCH", {
      id: item.id,
      title: next.title,
      details: next.details,
      status: next.status,
      student_visible: next.student_visible,
      sort_order: next.sort_order
    });
    if (error) {
      setRows([...reviews]);
      setEditingReviewId(item.id);
      setMessage(error);
    }
  }

  function renderReviewCard(item: ReviewRow) {
    const editing = editingReviewId === item.id;
    const detailText = typeof item.details === "string" ? item.details.trim() : "";
    return (
      <article key={item.id} className={`${styles.commentCard} ${styles.reviewCard}`}>
        <div className={styles.authorRow}>
          <span className={styles.avatar} aria-hidden="true">
            <ClipboardList aria-hidden="true" />
          </span>
          <div className={styles.authorMeta}>
            <strong>{item.title}</strong>
            <span className={styles.timestamp}>
              {item.status.replaceAll("_", " ")}
              {item.status === "completed" ? " · checked" : ""}
              {" · "}
              {item.student_visible !== false ? "Student visible" : "Staff only"}
            </span>
          </div>
          {canManage ? (
            <div className={styles.cardActions}>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label={`Edit review ${item.title}`}
                onClick={() => setEditingReviewId((current) => (current === item.id ? null : item.id))}
              >
                <Pencil aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                aria-label={`Delete review ${item.title}`}
                onClick={() => {
                  if (confirm("Delete this review?")) void save("reviews", "DELETE", { id: item.id });
                }}
              >
                <Trash2 aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>

        <div className={styles.reviewCardBody}>
          {editing && canManage ? (
            <form className={styles.alertForm} onSubmit={(event) => void saveReviewEdit(event, item)}>
              <label>
                <span>Title</span>
                <input name="title" required maxLength={255} defaultValue={item.title} />
              </label>
              <label>
                <span>Details</span>
                <textarea name="details" maxLength={4000} rows={4} defaultValue={detailText} />
              </label>
              <label>
                <span>Status</span>
                <select name="status" defaultValue={item.status}>
                  <option value="queued">Queued</option>
                  <option value="in_review">In review</option>
                  <option value="changes_requested">Changes requested</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <label>
                <span>Visibility</span>
                <select name="student_visible" defaultValue={String(item.student_visible !== false)}>
                  <option value="true">Student visible</option>
                  <option value="false">Staff only</option>
                </select>
              </label>
              <label>
                <span>Order</span>
                <input name="sort_order" type="number" min={0} defaultValue={item.sort_order} />
              </label>
              <div className={styles.editActions}>
                <button type="submit" className={styles.btnPost}>
                  Save
                </button>
                <button type="button" className={styles.btnGhost} onClick={() => setEditingReviewId(null)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : detailText ? (
            <p className={styles.commentBody}>{detailText}</p>
          ) : (
            <p className={styles.commentBody}>No details.</p>
          )}
        </div>
      </article>
    );
  }

  return (
    <PanelShell message={message}>
      <div className={styles.root}>
        <header className={styles.head}>
          <h2>Reviews</h2>
          <p className={styles.lead}>
            {completedReviews} completed of {rows.length} · student-visible when set
          </p>
        </header>

        {canManage ? (
          <form className={styles.composerCard} onSubmit={(event) => void postReview(event)}>
            <div className={styles.authorRow}>
              <span className={styles.avatar} aria-hidden="true">
                <ClipboardList aria-hidden="true" />
              </span>
              <div className={styles.authorMeta}>
                <strong>New review</strong>
                <span>Set status &amp; visibility before post</span>
              </div>
            </div>
            <label className={styles.srOnly} htmlFor="ws-new-review-title">
              Review title
            </label>
            <input id="ws-new-review-title" name="title" required maxLength={255} placeholder="Review title…" />
            <label className={styles.srOnly} htmlFor="ws-new-review-details">
              Details
            </label>
            <textarea id="ws-new-review-details" name="details" maxLength={4000} rows={3} placeholder="Details (optional)…" />
            <div className={styles.alertForm}>
              <label htmlFor="ws-new-review-status">
                <span>Status</span>
                <select id="ws-new-review-status" name="status" defaultValue="queued">
                  <option value="queued">Queued</option>
                  <option value="in_review">In review</option>
                  <option value="changes_requested">Changes requested</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
              <label htmlFor="ws-new-review-visibility">
                <span>Visibility</span>
                <select id="ws-new-review-visibility" name="student_visible" defaultValue="true">
                  <option value="true">Student visible</option>
                  <option value="false">Staff only</option>
                </select>
              </label>
              <label htmlFor="ws-new-review-order">
                <span>Order</span>
                <input id="ws-new-review-order" name="sort_order" type="number" min={0} defaultValue={0} />
              </label>
            </div>
            <div className={styles.composerBar}>
              <button type="submit" className={styles.btnPost}>
                <Send aria-hidden="true" />
                Post review
              </button>
            </div>
          </form>
        ) : null}

        <div className={`${styles.thread} ${styles.commentsThread}`}>
          {!rows.length ? (
            <p className={styles.empty} role="status">
              No review items yet.
            </p>
          ) : (
            rows.map((item) => renderReviewCard(item))
          )}
        </div>
      </div>
    </PanelShell>
  );
}

/**
 * WS-DESK — Notes tab only (Comments-style card flow).
 */
export function StaffWorkspaceNotesPanel({
  studentId,
  canManage,
  notes,
  authorLabels
}: {
  studentId: string;
  canManage: boolean;
  notes: StaffNote[];
  authorLabels: Record<string, string>;
}) {
  const { message, save } = useWorkspaceSave(studentId);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  async function postNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await save("notes", "POST", {
      body: data.get("body"),
      visibility: data.get("visibility")
    });
    form.reset();
  }

  function renderNoteCard(note: StaffNote) {
    const author = authorLabels[note.author_id] ?? "Staff";
    const editing = editingNoteId === note.id;
    return (
      <article key={note.id} className={styles.commentCard}>
        <div className={styles.authorRow}>
          <span className={styles.avatar} aria-hidden="true">
            {initials(author)}
          </span>
          <div className={styles.authorMeta}>
            <strong>{author}</strong>
            <time className={styles.timestamp} dateTime={note.created_at}>
              {note.visibility === "student_visible" ? "Student visible" : "Staff only"} · {formatTime(note.created_at)}
            </time>
          </div>
          {canManage ? (
            <div className={styles.cardActions}>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label={`Edit note by ${author}`}
                onClick={() => setEditingNoteId((current) => (current === note.id ? null : note.id))}
              >
                <Pencil aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                aria-label={`Delete note by ${author}`}
                onClick={() => {
                  if (confirm("Delete this note?")) void save("notes", "DELETE", { id: note.id });
                }}
              >
                <Trash2 aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>

        <div className={styles.commentCardScroll}>
          {editing && canManage ? (
            <form
              className={styles.alertForm}
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                void save("notes", "PATCH", {
                  id: note.id,
                  body: data.get("body"),
                  visibility: data.get("visibility")
                });
                setEditingNoteId(null);
              }}
            >
              <label>
                <span>Note</span>
                <textarea name="body" required maxLength={6000} defaultValue={note.body} rows={4} />
              </label>
              <label>
                <span>Visibility</span>
                <select name="visibility" defaultValue={note.visibility}>
                  <option value="staff_only">Staff only</option>
                  <option value="student_visible">Visible to student</option>
                </select>
              </label>
              <div className={styles.editActions}>
                <button type="submit" className={styles.btnPost}>
                  Save
                </button>
                <button type="button" className={styles.btnGhost} onClick={() => setEditingNoteId(null)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className={styles.commentBody}>{note.body}</p>
          )}
        </div>
      </article>
    );
  }

  return (
    <PanelShell message={message}>
      <div className={styles.root}>
        <header className={styles.head}>
          <h2>Notes</h2>
          <p className={styles.lead}>Counselor notes · staff-only by default · student-visible when set</p>
        </header>

        {canManage ? (
          <form className={styles.composerCard} onSubmit={(event) => void postNote(event)}>
            <div className={styles.authorRow}>
              <span className={styles.avatar} aria-hidden="true">
                <FileText aria-hidden="true" />
              </span>
              <div className={styles.authorMeta}>
                <strong>New note</strong>
                <span>Counselor note for this student</span>
              </div>
            </div>
            <label className={styles.srOnly} htmlFor="ws-new-note-body">
              Note body
            </label>
            <textarea id="ws-new-note-body" name="body" required maxLength={6000} rows={3} placeholder="Write a counselor note…" />
            <div className={styles.composerBar}>
              <div className={styles.visibility}>
                <FileText aria-hidden="true" />
                <label className={styles.srOnly} htmlFor="ws-note-visibility">
                  Visibility
                </label>
                <select id="ws-note-visibility" name="visibility" defaultValue="staff_only">
                  <option value="staff_only">Staff only</option>
                  <option value="student_visible">Visible to student</option>
                </select>
              </div>
              <button type="submit" className={styles.btnPost}>
                <Send aria-hidden="true" />
                Post note
              </button>
            </div>
          </form>
        ) : null}

        <div className={`${styles.thread} ${styles.commentsThread}`}>
          {!notes.length ? (
            <p className={styles.empty} role="status">
              No counselor notes yet.
            </p>
          ) : (
            notes.map((note) => renderNoteCard(note))
          )}
        </div>
      </div>
    </PanelShell>
  );
}

/** @deprecated Prefer StaffWorkspaceReviewsPanel + StaffWorkspaceNotesPanel */
export function StaffWorkspaceReviewNotesPanel({
  studentId,
  canManage,
  reviews,
  notes,
  authorLabels
}: {
  studentId: string;
  canManage: boolean;
  reviews: PremiumWorkspace["reviews"];
  notes: StaffNote[];
  authorLabels: Record<string, string>;
}) {
  return (
    <>
      <StaffWorkspaceReviewsPanel studentId={studentId} canManage={canManage} reviews={reviews} />
      <StaffWorkspaceNotesPanel
        studentId={studentId}
        canManage={canManage}
        notes={notes}
        authorLabels={authorLabels}
      />
    </>
  );
}

/**
 * WS-DESK — Documents (Comments-style card flow).
 */
export function StaffWorkspaceDocumentsPanel({
  studentId,
  canManage,
  requirements
}: {
  studentId: string;
  canManage: boolean;
  requirements: DocumentRequirement[];
}) {
  const { message, save } = useWorkspaceSave(studentId);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function postRequirement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await save("requirements", "POST", {
      document_type: data.get("document_type"),
      requirement_kind: "additional",
      instructions: data.get("instructions")
    });
    form.reset();
  }

  return (
    <PanelShell message={message}>
      <div className={styles.root}>
        <header className={styles.head}>
          <h2>Documents</h2>
          <p className={styles.lead}>Requirements + QC · same card flow as Comments · student uploads on Upload Your Docs</p>
        </header>

        {canManage ? (
          <form className={styles.composerCard} onSubmit={(event) => void postRequirement(event)}>
            <div className={styles.authorRow}>
              <span className={styles.avatar} aria-hidden="true">
                <FolderOpen aria-hidden="true" />
              </span>
              <div className={styles.authorMeta}>
                <strong>Request a document</strong>
                <span>Adds a requirement for this student</span>
              </div>
            </div>
            <label className={styles.srOnly} htmlFor="ws-new-doc-type">
              Document type
            </label>
            <input id="ws-new-doc-type" name="document_type" required maxLength={160} placeholder="Document type…" />
            <label className={styles.srOnly} htmlFor="ws-new-doc-instructions">
              Instructions
            </label>
            <textarea
              id="ws-new-doc-instructions"
              name="instructions"
              maxLength={2000}
              rows={3}
              placeholder="Instructions for the student…"
            />
            <div className={styles.composerBar}>
              <span className={styles.visibility}>
                <FolderOpen aria-hidden="true" />
                Additional
              </span>
              <button type="submit" className={styles.btnPost}>
                <Send aria-hidden="true" />
                Post requirement
              </button>
            </div>
          </form>
        ) : null}

        <div className={`${styles.thread} ${styles.commentsThread}`}>
          {!requirements.length ? (
            <p className={styles.empty} role="status">
              No document requirements yet.
            </p>
          ) : (
            requirements.map((item) => {
              const versions = [...(item.student_documents ?? [])].sort((left, right) => right.version - left.version);
              const editing = editingId === item.id;
              return (
                <article key={item.id} className={styles.commentCard}>
                  <div className={styles.authorRow}>
                    <span className={styles.avatar} aria-hidden="true">
                      <FolderOpen aria-hidden="true" />
                    </span>
                    <div className={styles.authorMeta}>
                      <strong>{item.document_type}</strong>
                      <span className={styles.timestamp}>
                        {item.requirement_kind} · {item.status.replaceAll("_", " ")}
                      </span>
                    </div>
                    {canManage ? (
                      <div className={styles.cardActions}>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          aria-label={`Edit requirement ${item.document_type}`}
                          onClick={() => setEditingId((current) => (current === item.id ? null : item.id))}
                        >
                          <Pencil aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                          aria-label={`Delete requirement ${item.document_type}`}
                          onClick={() => {
                            if (confirm("Delete this requirement?")) void save("requirements", "DELETE", { id: item.id });
                          }}
                        >
                          <Trash2 aria-hidden="true" />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {item.instructions && !editing ? <p className={styles.commentBody}>{item.instructions}</p> : null}

                  <div className={styles.commentCardScroll}>
                    {editing && canManage ? (
                      <form
                        className={styles.alertForm}
                        onSubmit={(event) => {
                          event.preventDefault();
                          const data = new FormData(event.currentTarget);
                          void save("requirements", "PATCH", {
                            id: item.id,
                            instructions: data.get("instructions"),
                            status: data.get("status")
                          });
                          setEditingId(null);
                        }}
                      >
                        <label>
                          <span>Instructions</span>
                          <textarea name="instructions" maxLength={2000} defaultValue={item.instructions ?? ""} rows={3} />
                        </label>
                        <label>
                          <span>Status</span>
                          <select name="status" defaultValue={item.status}>
                            <option value="missing">Missing</option>
                            <option value="uploaded">Uploaded</option>
                            <option value="in_review">In review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="in_draft">In draft</option>
                            <option value="waived">Waived</option>
                          </select>
                        </label>
                        <div className={styles.editActions}>
                          <button type="submit" className={styles.btnPost}>
                            Save
                          </button>
                          <button type="button" className={styles.btnGhost} onClick={() => setEditingId(null)}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : null}

                    {versions.length ? (
                      <div className={styles.replies}>
                        {versions.map((document) => {
                          const current = isCurrentDocument(document);
                          const canReview = canManage && current && document.scan_status === "clean";
                          return (
                            <div key={document.id} className={styles.replyCard}>
                              <div className={styles.authorMeta}>
                                <strong>
                                  v{document.version} · {document.original_filename}
                                </strong>
                                <span className={styles.timestamp}>
                                  Scan {document.scan_status} · QC {document.qc_status.replaceAll("_", " ")} ·{" "}
                                  {current
                                    ? "Current"
                                    : document.superseded_at
                                      ? "Superseded"
                                      : document.archived_at
                                        ? "Archived"
                                        : "Not current"}
                                </span>
                              </div>
                              {canReview ? (
                                <form
                                  className={styles.alertForm}
                                  onSubmit={(event) => {
                                    event.preventDefault();
                                    const data = new FormData(event.currentTarget);
                                    void save("documents", "PATCH", {
                                      id: document.id,
                                      qc_status: data.get("qc_status"),
                                      review_note: data.get("review_note")
                                    });
                                  }}
                                >
                                  <label>
                                    <span>QC status</span>
                                    <select name="qc_status" defaultValue={document.qc_status}>
                                      <option value="in_review">In review</option>
                                      <option value="in_draft">In draft</option>
                                      <option value="approved">Approved</option>
                                      <option value="rejected">Rejected</option>
                                    </select>
                                  </label>
                                  <label>
                                    <span>Review note</span>
                                    <textarea name="review_note" maxLength={2000} rows={2} />
                                  </label>
                                  <button type="submit" className={styles.btnPost}>
                                    Save QC
                                  </button>
                                </form>
                              ) : null}
                              {current && document.scan_status !== "clean" ? (
                                <p className={styles.meta}>QC waits for a clean scan.</p>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    ) : !editing ? (
                      <p className={styles.meta}>No uploads yet.</p>
                    ) : null}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </PanelShell>
  );
}
