"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Bell, Globe, MessageSquare, Pencil, Send, Trash2 } from "lucide-react";
import { requestStaffWorkspace } from "@/components/staff-workspace-request";
import type { PremiumWorkspace } from "@/lib/premium-workspace";
import { MAX_STUDENT_ALERT_WORDS, studentAlertWordCount } from "@/lib/student-operations";
import styles from "./workspace-desk-comments.module.css";

export type StaffAlert = {
  id: string;
  alert_text: string;
  severity: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type CommentRow = PremiumWorkspace["comments"][number];

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
  return { message, save };
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

function AlertTextField({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const [text, setText] = useState(defaultValue ?? "");
  const words = studentAlertWordCount(text);
  return (
    <label>
      <span>Alert text</span>
      <textarea name={name} required value={text} onChange={(event) => setText(event.target.value)} maxLength={240} />
      <small>
        {words} / {MAX_STUDENT_ALERT_WORDS} words
      </small>
    </label>
  );
}

function AlertsBody({
  alerts,
  canManage,
  save,
  severitySelectId = "ws-alert-severity"
}: {
  alerts: StaffAlert[];
  canManage: boolean;
  save: (resource: string, method: "POST" | "PATCH" | "DELETE", values: Record<string, unknown>) => Promise<void>;
  severitySelectId?: string;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const activeAlerts = alerts.filter((alert) => alert.active).length;

  return (
    <>
      <header className={styles.head}>
        <h2>Alerts</h2>
        <p className={styles.lead}>
          {activeAlerts} active of {Math.max(alerts.length, 3)} alerts · student-visible when Active
        </p>
      </header>

      {canManage ? (
        <form
          className={styles.composerCard}
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const data = new FormData(form);
            void save("alerts", "POST", {
              alert_text: data.get("alert_text"),
              severity: data.get("severity")
            });
            form.reset();
          }}
        >
          <div className={styles.authorRow}>
            <span className={styles.avatar} aria-hidden="true">
              <Bell aria-hidden="true" />
            </span>
            <div className={styles.authorMeta}>
              <strong>New alert</strong>
              <span>Shown on student feed when Active</span>
            </div>
          </div>
          <AlertTextField name="alert_text" />
          <div className={styles.composerBar}>
            <div className={styles.visibility}>
              <Bell aria-hidden="true" />
              <label className={styles.srOnly} htmlFor={severitySelectId}>
                Severity
              </label>
              <select id={severitySelectId} name="severity" defaultValue="important">
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
                <option value="info">Info</option>
              </select>
            </div>
            <button type="submit" className={styles.btnPost}>
              <Send aria-hidden="true" />
              Post alert
            </button>
          </div>
        </form>
      ) : null}

      <div className={styles.thread}>
        {!alerts.length ? (
          <p className={styles.empty} role="status">
            No alerts yet.
          </p>
        ) : (
          alerts.map((alert) => {
            const editing = editingId === alert.id;
            return (
              <article key={alert.id} className={styles.commentCard}>
                <div className={styles.authorRow}>
                  <span className={styles.avatar} aria-hidden="true">
                    <Bell aria-hidden="true" />
                  </span>
                  <div className={styles.authorMeta}>
                    <strong>
                      {alert.active ? "Active" : "Dismissed"} · {alert.severity}
                    </strong>
                    <time className={styles.timestamp} dateTime={alert.updated_at}>
                      {formatTime(alert.updated_at)}
                    </time>
                  </div>
                  {canManage ? (
                    <div className={styles.cardActions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        aria-label="Edit alert"
                        onClick={() => setEditingId((current) => (current === alert.id ? null : alert.id))}
                      >
                        <Pencil aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                        aria-label="Delete alert"
                        onClick={() => {
                          if (confirm("Delete this alert?")) void save("alerts", "DELETE", { id: alert.id });
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
                        void save("alerts", "PATCH", {
                          id: alert.id,
                          alert_text: data.get("alert_text"),
                          severity: data.get("severity"),
                          active: data.get("active") === "true",
                          sort_order: Number(data.get("sort_order"))
                        });
                        setEditingId(null);
                      }}
                    >
                      <AlertTextField name="alert_text" defaultValue={alert.alert_text} />
                      <label>
                        <span>Severity</span>
                        <select name="severity" defaultValue={alert.severity}>
                          <option>important</option>
                          <option>urgent</option>
                          <option>info</option>
                        </select>
                      </label>
                      <label>
                        <span>State</span>
                        <select name="active" defaultValue={String(alert.active)}>
                          <option value="true">Active</option>
                          <option value="false">Dismissed</option>
                        </select>
                      </label>
                      <label>
                        <span>Order</span>
                        <input name="sort_order" type="number" min={0} defaultValue={alert.sort_order} />
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
                  ) : (
                    <p className={styles.commentBody}>{alert.alert_text}</p>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </>
  );
}

/**
 * WS-COMMENTS-1 QC — Desk Comments tab only (Alerts is its own top tab).
 */
export function StaffWorkspaceCommentsPanel({
  studentId,
  canManage,
  studentIdForComments,
  comments,
  authorLabels,
  actorLabel = "Staff",
  actorRoleLabel = "Mentor"
}: {
  studentId: string;
  canManage: boolean;
  studentIdForComments: string;
  comments: PremiumWorkspace["comments"];
  authorLabels: Record<string, string>;
  actorLabel?: string;
  actorRoleLabel?: string;
}) {
  const { message, save } = useWorkspaceSave(studentId);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");

  const roots = comments.filter((comment) => !comment.parent_id);
  const repliesFor = (id: string) => comments.filter((comment) => comment.parent_id === id);

  function labelFor(authorId: string) {
    return authorLabels[authorId] ?? (authorId === studentIdForComments ? "Student" : "PGS Team");
  }

  async function postComment(event: FormEvent<HTMLFormElement>, parentId: string | null) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    await save("comments", "POST", {
      body: data.get("body"),
      visibility: data.get("visibility") === "staff_only" ? "staff_only" : "student_visible",
      parent_id: parentId
    });
    form.reset();
    setReplyToId(null);
  }

  async function saveEdit(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    await save("comments", "PATCH", { id, body: editBody });
    setEditingId(null);
    setEditBody("");
  }

  function renderComment(comment: CommentRow, isReply = false) {
    const name = labelFor(comment.author_id);
    const editing = editingId === comment.id;
    const childReplies = isReply ? [] : repliesFor(comment.id);

    const main = (
      <>
        {editing ? (
          <form className={styles.editForm} onSubmit={(event) => void saveEdit(event, comment.id)}>
            <label className={styles.srOnly} htmlFor={`edit-comment-${comment.id}`}>
              Edit comment
            </label>
            <textarea
              id={`edit-comment-${comment.id}`}
              value={editBody}
              onChange={(event) => setEditBody(event.target.value)}
              required
              maxLength={4000}
              rows={3}
            />
            <div className={styles.editActions}>
              <button type="submit" className={styles.btnPost}>
                Save
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => {
                  setEditingId(null);
                  setEditBody("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className={styles.commentBody}>{comment.body}</p>
        )}

        {!isReply && canManage && !editing ? (
          <button
            type="button"
            className={styles.replyBtn}
            onClick={() => {
              setReplyToId((current) => (current === comment.id ? null : comment.id));
              setEditingId(null);
            }}
          >
            <MessageSquare aria-hidden="true" />
            Reply
          </button>
        ) : null}

        {!isReply && replyToId === comment.id ? (
          <form className={styles.replyForm} onSubmit={(event) => void postComment(event, comment.id)}>
            <label className={styles.srOnly} htmlFor={`reply-${comment.id}`}>
              Reply
            </label>
            <textarea
              id={`reply-${comment.id}`}
              name="body"
              required
              maxLength={4000}
              rows={3}
              placeholder="Write a reply…"
            />
            <input type="hidden" name="visibility" value="student_visible" />
            <div className={styles.editActions}>
              <button type="submit" className={styles.btnPost}>
                <Send aria-hidden="true" />
                Post reply
              </button>
              <button type="button" className={styles.btnGhost} onClick={() => setReplyToId(null)}>
                Cancel
              </button>
            </div>
          </form>
        ) : null}
      </>
    );

    return (
      <article key={comment.id} className={isReply ? styles.replyCard : styles.commentCard}>
        <div className={styles.authorRow}>
          <span className={styles.avatar} aria-hidden="true">
            {initials(name)}
          </span>
          <div className={styles.authorMeta}>
            <strong>{name}</strong>
            <time className={styles.timestamp} dateTime={comment.created_at}>
              {formatTime(comment.created_at)}
            </time>
          </div>
          {canManage ? (
            <div className={styles.cardActions}>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label={`Edit comment by ${name}`}
                onClick={() => {
                  setEditingId(comment.id);
                  setEditBody(comment.body);
                  setReplyToId(null);
                }}
              >
                <Pencil aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                aria-label={`Delete comment by ${name}`}
                onClick={() => {
                  if (confirm("Delete this comment?")) void save("comments", "DELETE", { id: comment.id });
                }}
              >
                <Trash2 aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
        {main}
        {!isReply ? (
          <div className={styles.commentCardScroll}>
            {childReplies.length ? (
              <div className={styles.replies}>{childReplies.map((reply) => renderComment(reply, true))}</div>
            ) : null}
          </div>
        ) : null}
      </article>
    );
  }

  return (
    <PanelShell message={message}>
      <div className={styles.root}>
        <header className={styles.head}>
          <h2>Comments</h2>
          <p className={styles.lead}>
            Student can see these comments in their feed when visibility is student-visible.
          </p>
        </header>

        {canManage ? (
          <form className={styles.composerCard} onSubmit={(event) => void postComment(event, null)}>
            <div className={styles.authorRow}>
              <span className={styles.avatar} aria-hidden="true">
                {initials(actorLabel)}
              </span>
              <div className={styles.authorMeta}>
                <strong>{actorLabel}</strong>
                <span>{actorRoleLabel}</span>
              </div>
            </div>
            <label className={styles.srOnly} htmlFor="ws-new-comment">
              Write a student-visible comment
            </label>
            <textarea
              id="ws-new-comment"
              name="body"
              required
              maxLength={4000}
              rows={3}
              placeholder="Write a student-visible comment..."
            />
            <div className={styles.composerBar}>
              <div className={styles.visibility}>
                <Globe aria-hidden="true" />
                <label className={styles.srOnly} htmlFor="ws-comment-visibility">
                  Visibility
                </label>
                <select id="ws-comment-visibility" name="visibility" defaultValue="student_visible">
                  <option value="student_visible">Visible to student</option>
                  <option value="staff_only">Staff only</option>
                </select>
              </div>
              <button type="submit" className={styles.btnPost}>
                <Send aria-hidden="true" />
                Post comment
              </button>
            </div>
          </form>
        ) : null}

        <div className={`${styles.thread} ${styles.commentsThread}`}>
          {!roots.length ? (
            <p className={styles.empty} role="status">
              No comments yet.
            </p>
          ) : (
            roots.map((comment) => renderComment(comment))
          )}
        </div>
      </div>
    </PanelShell>
  );
}

/**
 * WS-COMMENTS-1 QC — Alerts tab (same card grid as Comments).
 */
export function StaffWorkspaceAlertsPanel({
  studentId,
  canManage,
  alerts
}: {
  studentId: string;
  canManage: boolean;
  alerts: StaffAlert[];
}) {
  const { message, save } = useWorkspaceSave(studentId);

  return (
    <PanelShell message={message}>
      <div className={styles.root}>
        <AlertsBody alerts={alerts} canManage={canManage} save={save} severitySelectId="ws-alert-severity" />
      </div>
    </PanelShell>
  );
}
