"use client";

import { useState, type ReactNode } from "react";
import { CalendarDays, Clock3, Crown, UsersRound } from "lucide-react";

type AccessOption = { id: string; label: string };
type PremiumPlanOption = { code: string; label: string; durationMonths: number };
type AccessTab = "assignments" | "history";

export type PremiumHistoryItem = {
  id: string;
  status: string;
  title: string;
  studentLabel: string;
  actorLabel: string | null;
  rangeLabel: string | null;
  occurredLabel: string;
  reason: string;
};

export type AssignmentHistoryItem = {
  id: string;
  status: string;
  mentorLabel: string;
  studentLabel: string;
  occurredLabel: string;
  reason: string;
};

export function StaffAccessControls({
  students,
  mentors,
  plans,
  premiumHistory,
  assignmentHistory
}: {
  students: AccessOption[];
  mentors: AccessOption[];
  plans: PremiumPlanOption[];
  premiumHistory: PremiumHistoryItem[];
  assignmentHistory: AssignmentHistoryItem[];
}) {
  const [tab, setTab] = useState<AccessTab>("assignments");
  const [message, setMessage] = useState("");
  const [premiumAction, setPremiumAction] = useState<"grant" | "revoke" | "reactivate">("grant");
  const [planCode, setPlanCode] = useState(plans[0]?.code ?? "");
  const plan = plans.find((item) => item.code === planCode);
  const needsPlan = premiumAction !== "revoke";

  async function submit(endpoint: string, values: Record<string, unknown>) {
    setMessage("Saving…");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values)
    });
    const result = await response.json();
    setMessage(response.ok ? "Saved and audited." : (result.message ?? "Unable to save."));
    if (response.ok) window.location.reload();
  }

  const studentOptions = students.map((student) => (
    <option key={student.id} value={student.id}>
      {student.label}
    </option>
  ));

  const assignmentsPanel: ReactNode = (
    <div className="ops-acc-grid">
      <section className="ops-acc-card" aria-labelledby="ops-acc-premium-heading">
        <header className="ops-acc-card-head">
          <span className="ops-acc-card-icon ops-acc-card-icon--premium" aria-hidden="true">
            <Crown />
          </span>
          <div>
            <h2 id="ops-acc-premium-heading">Premium entitlement</h2>
            <p>Grant a calendar-month plan, revoke immediately, or reactivate only to the original expiry.</p>
          </div>
        </header>

        <form
          className="ops-acc-form"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            void submit("/api/staff/premium", {
              student_id: data.get("student_id"),
              action: premiumAction,
              plan_code: needsPlan ? planCode : null,
              reason: data.get("reason")
            });
          }}
        >
          <label className="ops-acc-field" htmlFor="ops-acc-premium-student">
            <span>Student</span>
            <select id="ops-acc-premium-student" name="student_id" required defaultValue="">
              <option value="" disabled>
                Select a student
              </option>
              {studentOptions}
            </select>
          </label>

          <label className="ops-acc-field" htmlFor="ops-acc-premium-action">
            <span>Action</span>
            <select
              id="ops-acc-premium-action"
              name="action"
              value={premiumAction}
              onChange={(event) => setPremiumAction(event.target.value as typeof premiumAction)}
            >
              <option value="grant">Grant new period</option>
              <option value="revoke">Revoke immediately</option>
              <option value="reactivate">Reactivate</option>
            </select>
          </label>

          {needsPlan ? (
            <label className="ops-acc-field" htmlFor="ops-acc-premium-plan">
              <span>Premium plan</span>
              <select
                id="ops-acc-premium-plan"
                name="plan_code"
                required
                value={planCode}
                onChange={(event) => setPlanCode(event.target.value)}
              >
                {plans.map((item) => (
                  <option value={item.code} key={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="ops-acc-preview" aria-live="polite">
            <CalendarDays aria-hidden="true" className="ops-acc-preview-icon" />
            <div>
              <strong>
                {premiumAction === "reactivate"
                  ? "Original validity will be preserved"
                  : premiumAction === "revoke"
                    ? "Access stops immediately"
                    : (plan?.label ?? "Premium plan")}
              </strong>
              {premiumAction === "grant" && plan ? (
                <>
                  <span>Starts immediately at the authoritative server grant time.</span>
                  <span>
                    Ends after {plan.durationMonths} calendar month
                    {plan.durationMonths === 1 ? "" : "s"}.
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <label className="ops-acc-field" htmlFor="ops-acc-premium-reason">
            <span>Reason</span>
            <textarea
              id="ops-acc-premium-reason"
              name="reason"
              maxLength={1000}
              rows={3}
              placeholder="Enter reason (optional)..."
            />
          </label>

          <button type="submit" className="ops-acc-submit ops-acc-submit--premium">
            Confirm Premium action
          </button>
        </form>
      </section>

      <section className="ops-acc-card" aria-labelledby="ops-acc-mentor-heading">
        <header className="ops-acc-card-head">
          <span className="ops-acc-card-icon ops-acc-card-icon--mentor" aria-hidden="true">
            <UsersRound />
          </span>
          <div>
            <h2 id="ops-acc-mentor-heading">Mentor assignment</h2>
            <p>Only active assignments authorize access; ending one removes access immediately.</p>
          </div>
        </header>

        <form
          className="ops-acc-form"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            void submit("/api/staff/assignments", {
              student_id: data.get("student_id"),
              mentor_id: data.get("mentor_id"),
              active: data.get("active") === "true",
              reason: data.get("reason")
            });
          }}
        >
          <label className="ops-acc-field" htmlFor="ops-acc-mentor-student">
            <span>Student</span>
            <select id="ops-acc-mentor-student" name="student_id" required defaultValue="">
              <option value="" disabled>
                Select a student
              </option>
              {studentOptions}
            </select>
          </label>

          <label className="ops-acc-field" htmlFor="ops-acc-mentor-staff">
            <span>Mentor</span>
            <select id="ops-acc-mentor-staff" name="mentor_id" required defaultValue="">
              <option value="" disabled>
                Select a mentor
              </option>
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.label}
                </option>
              ))}
            </select>
          </label>

          <label className="ops-acc-field" htmlFor="ops-acc-mentor-action">
            <span>Action</span>
            <select id="ops-acc-mentor-action" name="active" defaultValue="true">
              <option value="true">Assign/reactivate</option>
              <option value="false">End assignment</option>
            </select>
          </label>

          <label className="ops-acc-field" htmlFor="ops-acc-mentor-reason">
            <span>Reason</span>
            <textarea
              id="ops-acc-mentor-reason"
              name="reason"
              maxLength={1000}
              rows={3}
              placeholder="Enter reason (optional)..."
            />
          </label>

          <button type="submit" className="ops-acc-submit ops-acc-submit--mentor">
            Save assignment
          </button>
        </form>
      </section>
    </div>
  );

  const historyPanel: ReactNode = (
    <div className="ops-acc-grid ops-acc-grid--history">
      <section className="ops-acc-card ops-acc-card--history" aria-labelledby="ops-acc-premium-history-heading">
        <header className="ops-acc-card-head">
          <span className="ops-acc-card-icon ops-acc-card-icon--premium" aria-hidden="true">
            <Clock3 />
          </span>
          <div className="ops-acc-history-title">
            <h2 id="ops-acc-premium-history-heading">Premium entitlement history</h2>
            <span className="ops-acc-count" aria-label={`${premiumHistory.length} events`}>
              {premiumHistory.length}
            </span>
          </div>
        </header>

        <div className="ops-acc-history-scroll" tabIndex={0} role="region" aria-label="Premium entitlement history">
          {premiumHistory.length ? (
            <ol className="ops-acc-timeline">
              {premiumHistory.map((event) => (
                <li key={event.id} className="ops-acc-timeline-item ops-acc-timeline-item--premium">
                  <span className={`ops-acc-badge ops-acc-badge--${event.status.toLowerCase()}`}>{event.status}</span>
                  <strong>{event.title}</strong>
                  <p>Student {event.studentLabel}</p>
                  {event.actorLabel ? <p>Actor {event.actorLabel}</p> : null}
                  {event.rangeLabel ? <p>{event.rangeLabel}</p> : null}
                  <p>
                    {event.occurredLabel} · {event.reason}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="ops-acc-empty">No Premium entitlement events yet.</p>
          )}
        </div>
      </section>

      <section className="ops-acc-card ops-acc-card--history" aria-labelledby="ops-acc-mentor-history-heading">
        <header className="ops-acc-card-head">
          <span className="ops-acc-card-icon ops-acc-card-icon--mentor" aria-hidden="true">
            <Clock3 />
          </span>
          <div className="ops-acc-history-title">
            <h2 id="ops-acc-mentor-history-heading">Mentor assignment history</h2>
            <span className="ops-acc-count" aria-label={`${assignmentHistory.length} assignments`}>
              {assignmentHistory.length}
            </span>
          </div>
        </header>

        <div className="ops-acc-history-scroll" tabIndex={0} role="region" aria-label="Mentor assignment history">
          {assignmentHistory.length ? (
            <ol className="ops-acc-timeline">
              {assignmentHistory.map((assignment) => (
                <li key={assignment.id} className="ops-acc-timeline-item ops-acc-timeline-item--mentor">
                  <span className={`ops-acc-badge ops-acc-badge--${assignment.status.toLowerCase()}`}>
                    {assignment.status}
                  </span>
                  <strong>Mentor {assignment.mentorLabel}</strong>
                  <p>Student {assignment.studentLabel}</p>
                  <p>
                    {assignment.occurredLabel} · {assignment.reason}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="ops-acc-empty">No mentor assignment history yet.</p>
          )}
        </div>
      </section>
    </div>
  );

  return (
    <div className="ops-acc-workspace" data-ops-acc-pass="acc1-t">
      <p className="ops-acc-status" role="status" aria-live="polite">{message || null}</p>

      {/* Tablist stays pinned — only panels scroll (was scrolling away under header). */}
      <div className="ops-acc-tablist" role="tablist" aria-label="Premium and mentor controls">
        <button
          type="button"
          role="tab"
          id="ops-acc-tab-assignments"
          className={tab === "assignments" ? "ops-acc-tab ops-acc-tab--active" : "ops-acc-tab"}
          aria-selected={tab === "assignments"}
          aria-controls="ops-acc-panel-assignments"
          tabIndex={tab === "assignments" ? 0 : -1}
          onClick={() => setTab("assignments")}
        >
          Assignments
        </button>
        <button
          type="button"
          role="tab"
          id="ops-acc-tab-history"
          className={tab === "history" ? "ops-acc-tab ops-acc-tab--active" : "ops-acc-tab"}
          aria-selected={tab === "history"}
          aria-controls="ops-acc-panel-history"
          tabIndex={tab === "history" ? 0 : -1}
          onClick={() => setTab("history")}
        >
          History
        </button>
      </div>

      <div className="ops-acc-tabs-panels">
        <div
          id="ops-acc-panel-assignments"
          role="tabpanel"
          aria-labelledby="ops-acc-tab-assignments"
          hidden={tab !== "assignments"}
          className="ops-acc-tabpanel ops-acc-tabpanel--assignments"
        >
          {assignmentsPanel}
        </div>
        <div
          id="ops-acc-panel-history"
          role="tabpanel"
          aria-labelledby="ops-acc-tab-history"
          hidden={tab !== "history"}
          className="ops-acc-tabpanel ops-acc-tabpanel--history"
        >
          {historyPanel}
        </div>
      </div>
    </div>
  );
}
