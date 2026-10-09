"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  Crown,
  Eye,
  KeyRound,
  Mail,
  Shield,
  Target,
  UserRound,
  UsersRound
} from "lucide-react";
import { OperationsStaffConfirmDialog } from "@/components/operations-staff-confirm-dialog";
import {
  assignmentLossWarning,
  isStaffRoleKey,
  staffAccessPreview,
  staffRoleLabel,
  staffStatusLabel,
  staffSurfaceAccess,
  SUSPENDED_STAFF_ACCESS,
  type StaffAccessDetail,
  type StaffDirectoryRole
} from "@/lib/operations-staff-access";

type HistoryEvent = {
  id: string;
  occurred_at: string;
  event_type: string;
  outcome: string;
  metadata: Record<string, unknown> | null;
};

type PendingAction = "role" | "suspend" | "reactivate" | "revoke" | null;
type ManageTab = "details" | "history" | "access";
type ResponsibilityTone = "purple" | "blue" | "orange" | "red" | "green";
type ResponsibilityItem = { label: string; value: number; tone: ResponsibilityTone };

function RoleIcon({ role }: { role: string }) {
  if (role === "super_admin") return <Shield aria-hidden="true" />;
  if (role === "admin") return <Crown aria-hidden="true" />;
  if (role === "mentor") return <UserRound aria-hidden="true" />;
  return <Eye aria-hidden="true" />;
}

function KpiIcon({ tone }: { tone: ResponsibilityTone }) {
  if (tone === "purple") return <UsersRound aria-hidden="true" />;
  if (tone === "blue") return <Target aria-hidden="true" />;
  if (tone === "orange") return <Clock3 aria-hidden="true" />;
  if (tone === "red") return <CircleAlert aria-hidden="true" />;
  return <CheckCircle2 aria-hidden="true" />;
}

function historyChange(metadata: Record<string, unknown> | null): string {
  if (!metadata) return "—";
  const previous = metadata.previous_role;
  const next = metadata.new_role;
  if (typeof previous === "string" || typeof next === "string") {
    return [previous, next].filter((value) => typeof value === "string" && value).join(" → ") || "—";
  }
  const granted = metadata.granted;
  const revoked = metadata.revoked;
  if (Array.isArray(granted) || Array.isArray(revoked)) {
    const parts: string[] = [];
    if (Array.isArray(granted) && granted.length) parts.push(`+${granted.length} grant`);
    if (Array.isArray(revoked) && revoked.length) parts.push(`-${revoked.length} revoke`);
    return parts.join(" · ") || "—";
  }
  try {
    const json = JSON.stringify(metadata);
    return json.length > 80 ? `${json.slice(0, 77)}…` : json;
  } catch {
    return "—";
  }
}

export function OperationsStaffAccessDetail({
  detail,
  canManage,
  canPreviewMentor = false,
  email,
  history,
  responsibility
}: {
  detail: StaffAccessDetail;
  canManage: boolean;
  canPreviewMentor?: boolean;
  email: string | null;
  history: HistoryEvent[];
  responsibility: ResponsibilityItem[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<ManageTab>("details");
  const [role, setRole] = useState<StaffDirectoryRole>(detail.role_key);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [action, setAction] = useState<PendingAction>(null);
  const currentAccess = staffSurfaceAccess(detail.permission_keys, detail.role_key);
  const nextAccess = staffAccessPreview(role);

  async function startMentorPreview() {
    setPending(true);
    setMessage("Starting mentor preview…");
    const response = await fetch("/api/staff/preview", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode: "mentor", target_id: detail.user_id })
    });
    const result = (await response.json()) as { ok?: boolean; redirect?: string; message?: string };
    if (!response.ok) {
      setPending(false);
      setMessage(result.message ?? "Unable to start mentor preview.");
      return;
    }
    window.location.assign(result.redirect ?? "/ops");
  }

  async function send(body: Record<string, unknown>) {
    setPending(true);
    setMessage("Saving…");
    const response = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };
    setPending(false);
    setAction(null);
    if (!response.ok) {
      setMessage(result.message ?? "Unable to change staff access.");
      return;
    }
    router.refresh();
    setMessage("Staff access was updated.");
  }

  const suspendWarning =
    detail.status === "active" && detail.assigned_student_count > 0
      ? assignmentLossWarning(detail.assigned_student_count)
      : undefined;

  const detailsPanel = (
    <div className="ops-manage1-tabpanel-body">
      <section className="ops-manage1-card" aria-labelledby="ops-manage1-responsibility-heading">
        <header className="ops-manage1-card-head">
          <span className="ops-manage1-card-icon ops-manage1-card-icon--purple" aria-hidden="true">
            <UserRound />
          </span>
          <div>
            <h2 id="ops-manage1-responsibility-heading">Staff responsibility</h2>
            <p>Current operational work. These facts do not represent an employee performance score.</p>
          </div>
        </header>
        <ul className="ops-manage1-kpi-grid">
          {responsibility.map((item) => (
            <li key={item.label} className={`ops-manage1-kpi ops-manage1-kpi--${item.tone}`}>
              <span className="ops-manage1-kpi-icon" aria-hidden="true">
                <KpiIcon tone={item.tone} />
              </span>
              <span className="ops-manage1-kpi-label">{item.label}</span>
              <strong className="ops-manage1-kpi-value">{item.value}</strong>
            </li>
          ))}
        </ul>
      </section>
      {detail.has_student_profile ? (
        <p className="ops-manage1-note" role="status">
          Also a PGS student. Student login and PGS ID remain.
        </p>
      ) : null}
      <div className="ops-manage1-identity-grid">
        <article className="ops-manage1-mini-card">
          <span className="ops-manage1-mini-icon ops-manage1-mini-icon--purple" aria-hidden="true">
            <Mail />
          </span>
          <div>
            <p className="ops-manage1-mini-label">Email</p>
            <p className="ops-manage1-mini-value">{email ?? "—"}</p>
          </div>
        </article>
        <article className="ops-manage1-mini-card ops-manage1-mini-card--split">
          <div className="ops-manage1-mini-split">
            <span className="ops-manage1-status-dot" aria-hidden="true" />
            <div>
              <p className="ops-manage1-mini-label">Status</p>
              <p className="ops-manage1-mini-value">{staffStatusLabel(detail.status, detail.invite_pending)}</p>
            </div>
          </div>
          <div className="ops-manage1-mini-split">
            <span className="ops-manage1-mini-icon ops-manage1-mini-icon--purple" aria-hidden="true">
              <RoleIcon role={detail.role_key} />
            </span>
            <div>
              <p className="ops-manage1-mini-label">Role</p>
              <p className="ops-manage1-mini-value">{staffRoleLabel(detail.role_key)}</p>
            </div>
          </div>
        </article>
        <article className="ops-manage1-mini-card">
          <span className="ops-manage1-mini-icon ops-manage1-mini-icon--blue" aria-hidden="true">
            <UsersRound />
          </span>
          <div>
            <p className="ops-manage1-mini-label">Assigned students</p>
            <p className="ops-manage1-mini-value">{detail.assigned_student_count}</p>
          </div>
        </article>
      </div>
    </div>
  );

  const historyPanel = (
    <section className="ops-manage1-card" aria-labelledby="ops-manage1-history-heading">
      <header className="ops-manage1-card-head">
        <span className="ops-manage1-card-icon ops-manage1-card-icon--orange" aria-hidden="true">
          <Clock3 />
        </span>
        <h2 id="ops-manage1-history-heading">Recent access history</h2>
      </header>
      {history.length ? (
        <div className="ops-manage1-table-scroll" tabIndex={0} role="region" aria-label="Recent access history">
          <table className="ops-manage1-table">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Event</th>
                <th scope="col">Outcome</th>
                <th scope="col">Change</th>
              </tr>
            </thead>
            <tbody>
              {history.map((event) => (
                <tr key={event.id}>
                  <td>
                    <time dateTime={event.occurred_at}>
                      {new Date(event.occurred_at).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short"
                      })}
                    </time>
                  </td>
                  <td>
                    <code>{event.event_type}</code>
                  </td>
                  <td>
                    <span
                      className={
                        event.outcome.toLowerCase() === "succeeded"
                          ? "ops-manage1-pill ops-manage1-pill--ok"
                          : "ops-manage1-pill ops-manage1-pill--deny"
                      }
                    >
                      {event.outcome}
                    </span>
                  </td>
                  <td>{historyChange(event.metadata)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="ops-manage1-empty">No recent access history yet.</p>
      )}
    </section>
  );

  const accessPanel =
    canPreviewMentor || canManage ? (
      <section className="ops-manage1-card" aria-labelledby="ops-manage1-actions-heading">
        <header className="ops-manage1-card-head">
          <span className="ops-manage1-card-icon ops-manage1-card-icon--green" aria-hidden="true">
            <KeyRound />
          </span>
          <h2 id="ops-manage1-actions-heading">Access management</h2>
        </header>

        {message ? (
          <p className="ops-manage1-status" role="status">
            {message}
          </p>
        ) : null}

        {canPreviewMentor ? (
          <div className="ops-manage1-actions-row">
            <button
              type="button"
              className="ops-manage1-btn ops-manage1-btn--outline"
              disabled={pending}
              onClick={() => void startMentorPreview()}
            >
              View as Mentor
            </button>
          </div>
        ) : null}

        {canManage ? (
          <>
            <label className="ops-manage1-field">
              <span>Role</span>
              <select
                className="ops-manage1-control"
                onChange={(event) => {
                  if (isStaffRoleKey(event.target.value)) setRole(event.target.value);
                }}
                value={role}
              >
                <option value="read_only_staff">Read-only Staff</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </label>

            <div className="ops-manage1-actions-row">
              <button
                type="button"
                className="ops-manage1-btn ops-manage1-btn--primary"
                disabled={pending || role === detail.role_key}
                onClick={() => setAction("role")}
              >
                Change role
              </button>
              {detail.invite_pending ? (
                <button type="button" className="ops-manage1-btn ops-manage1-btn--outline" disabled>
                  Resend invitation
                </button>
              ) : null}
              {detail.status === "active" ? (
                <button
                  type="button"
                  className="ops-manage1-btn ops-manage1-btn--outline"
                  disabled={pending}
                  onClick={() => setAction("suspend")}
                >
                  Suspend staff access
                </button>
              ) : (
                <button
                  type="button"
                  className="ops-manage1-btn ops-manage1-btn--outline"
                  disabled={pending}
                  onClick={() => setAction("reactivate")}
                >
                  Reactivate staff access
                </button>
              )}
              {detail.status !== "ended" ? (
                <button
                  type="button"
                  className="ops-manage1-btn ops-manage1-btn--danger"
                  disabled={pending}
                  onClick={() => setAction("revoke")}
                >
                  Revoke staff access
                </button>
              ) : null}
            </div>
            {detail.invite_pending ? (
              <p className="ops-manage1-status" role="status">
                Invitation resend coming before launch.
              </p>
            ) : null}
          </>
        ) : null}
      </section>
    ) : (
      <p className="ops-manage1-empty">No access management actions available for this staff member.</p>
    );

  return (
    <div className="ops-manage1-detail">
      <div className="ops-manage1-tablist" role="tablist" aria-label="Staff manage sections">
        <button
          type="button"
          role="tab"
          id="ops-manage1-tab-details"
          className={tab === "details" ? "ops-manage1-tab ops-manage1-tab--active" : "ops-manage1-tab"}
          aria-selected={tab === "details"}
          aria-controls="ops-manage1-panel-details"
          tabIndex={tab === "details" ? 0 : -1}
          onClick={() => setTab("details")}
        >
          Details
        </button>
        <button
          type="button"
          role="tab"
          id="ops-manage1-tab-history"
          className={tab === "history" ? "ops-manage1-tab ops-manage1-tab--active" : "ops-manage1-tab"}
          aria-selected={tab === "history"}
          aria-controls="ops-manage1-panel-history"
          tabIndex={tab === "history" ? 0 : -1}
          onClick={() => setTab("history")}
        >
          History
        </button>
        <button
          type="button"
          role="tab"
          id="ops-manage1-tab-access"
          className={tab === "access" ? "ops-manage1-tab ops-manage1-tab--active" : "ops-manage1-tab"}
          aria-selected={tab === "access"}
          aria-controls="ops-manage1-panel-access"
          tabIndex={tab === "access" ? 0 : -1}
          onClick={() => setTab("access")}
        >
          Access Management
        </button>
      </div>

      <div className="ops-manage1-panels">
        <div
          id="ops-manage1-panel-details"
          role="tabpanel"
          aria-labelledby="ops-manage1-tab-details"
          hidden={tab !== "details"}
          className="ops-manage1-tabpanel"
        >
          {detailsPanel}
        </div>
        <div
          id="ops-manage1-panel-history"
          role="tabpanel"
          aria-labelledby="ops-manage1-tab-history"
          hidden={tab !== "history"}
          className="ops-manage1-tabpanel"
        >
          {historyPanel}
        </div>
        <div
          id="ops-manage1-panel-access"
          role="tabpanel"
          aria-labelledby="ops-manage1-tab-access"
          hidden={tab !== "access"}
          className="ops-manage1-tabpanel"
        >
          {accessPanel}
        </div>
      </div>

      <OperationsStaffConfirmDialog
        afterAccess={
          action === "role" || action === "reactivate"
            ? nextAccess
            : action === "revoke" || action === "suspend"
              ? SUSPENDED_STAFF_ACCESS
              : currentAccess
        }
        beforeAccess={currentAccess}
        confirmLabel={
          action === "suspend"
            ? "Suspend staff access"
            : action === "revoke"
              ? "Revoke staff access"
              : action === "reactivate"
                ? "Reactivate staff access"
                : "Change role"
        }
        currentEmail={email}
        description="Review the access change before it is applied. The server still authorizes this with roles.manage."
        destructive={action === "suspend" || action === "revoke"}
        error={message}
        nextRole={action === "role" || action === "reactivate" ? role : undefined}
        onConfirm={() => {
          if (action === "role") {
            void send({
              action: "assign",
              user_id: detail.user_id,
              role,
              status: detail.status === "ended" ? "active" : detail.status,
              display_name: detail.display_name
            });
          } else if (action === "suspend") {
            void send({
              action: "assign",
              user_id: detail.user_id,
              role: detail.role_key,
              status: "suspended"
            });
          } else if (action === "reactivate") {
            void send({
              action: "assign",
              user_id: detail.user_id,
              role,
              status: "active",
              display_name: detail.display_name
            });
          } else if (action === "revoke") {
            void send({ action: "revoke", user_id: detail.user_id, role: detail.role_key });
          }
        }}
        onOpenChange={(open) => {
          if (!open) setAction(null);
        }}
        open={action !== null}
        pending={pending}
        previousRole={detail.role_key}
        title="Confirm staff access change"
        warning={
          action === "suspend"
            ? suspendWarning
            : action === "revoke"
              ? "Auth and any student account remain. Staff access ends."
              : undefined
        }
      />
    </div>
  );
}
