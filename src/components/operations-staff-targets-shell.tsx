"use client";

import { useState } from "react";
import { CheckCircle2, Clock3, ListTodo, Target, TriangleAlert } from "lucide-react";
import { OperationsStaffTargetForm } from "@/components/operations-staff-target-form";
import { OperationsStaffTargetList } from "@/components/operations-staff-target-list";
import type {
  StaffTarget,
  StaffTargetAssigneeOption,
  StaffTargetFilter,
  StaffTargetStudentOption,
  StaffTargetSummary
} from "@/lib/operations-staff-targets";

type TargetTab = "details" | "create" | "responsibility";

export function OperationsStaffTargetsShell({
  scope,
  summary,
  targets,
  assignees,
  students,
  canManageAll,
  canUpdateStatus,
  status,
  assigneeId,
  targetId
}: {
  scope: "organization" | "my_work";
  summary: StaffTargetSummary;
  targets: StaffTarget[];
  assignees: StaffTargetAssigneeOption[];
  students: StaffTargetStudentOption[];
  canManageAll: boolean;
  canUpdateStatus: boolean;
  status: StaffTargetFilter | null;
  assigneeId: string | null;
  targetId: string | null;
}) {
  const hasQueueQuery = Boolean(status || assigneeId || targetId);
  const [tab, setTab] = useState<TargetTab>(hasQueueQuery ? "responsibility" : "details");
  const title = scope === "my_work" ? "My Work" : "Staff Targets";
  const description =
    scope === "organization"
      ? "Assign and inspect clear operational responsibilities across authorized staff."
      : "Work assigned to you for students you are currently authorized to handle.";

  const kpis = [
    { label: "Open targets", value: summary.openTargets, tone: "purple", Icon: Target },
    { label: "Due soon", value: summary.dueSoon, tone: "blue", Icon: Clock3 },
    { label: "Overdue", value: summary.overdue, tone: "orange", Icon: TriangleAlert },
    { label: "Completed recently", value: summary.completedRecently, tone: "green", Icon: CheckCircle2 }
  ] as const;

  const tabs: { id: TargetTab; label: string; show: boolean }[] = [
    { id: "details", label: "Details", show: true },
    { id: "create", label: "Create Staff", show: canManageAll },
    { id: "responsibility", label: "Staff Responsibility", show: true }
  ];

  return (
    <div className="ops-target1-page" data-ops-target-pass="target1">
      <header className="ops-target1-page-header">
        <div className="ops-target1-page-heading">
          <div>
            <p className="ops-target1-eyebrow">Operations work</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
      </header>

      <div className="ops-target1-tabs-shell">
        <div className="ops-target1-tablist" role="tablist" aria-label="Staff targets sections">
          {tabs
            .filter((item) => item.show)
            .map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`ops-target1-tab-${item.id}`}
                aria-controls={`ops-target1-panel-${item.id}`}
                aria-selected={tab === item.id}
                className={tab === item.id ? "ops-target1-tab ops-target1-tab--active" : "ops-target1-tab"}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
        </div>

        <div
          id="ops-target1-panel-details"
          role="tabpanel"
          aria-labelledby="ops-target1-tab-details"
          className="ops-target1-tabpanel"
          hidden={tab !== "details"}
        >
          <div className="ops-target1-tabpanel-body">
            <section className="ops-target1-card" aria-labelledby="ops-target1-details-heading">
              <div className="ops-target1-card-head">
                <span className="ops-target1-card-icon ops-target1-card-icon--purple" aria-hidden="true">
                  <ListTodo />
                </span>
                <div>
                  <h2 id="ops-target1-details-heading">Targets dashboard</h2>
                  <p>Live counts from authorized staff targets — not decorative metrics.</p>
                </div>
              </div>
              <div className="ops-target1-kpi-grid" aria-label="Staff target summary">
                {kpis.map(({ label, value, tone, Icon }) => (
                  <article key={label} className={`ops-target1-kpi ops-target1-kpi--${tone}`}>
                    <span className="ops-target1-kpi-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <p className="ops-target1-kpi-label">{label}</p>
                      <p className="ops-target1-kpi-value">{value}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        {canManageAll ? (
          <div
            id="ops-target1-panel-create"
            role="tabpanel"
            aria-labelledby="ops-target1-tab-create"
            className="ops-target1-tabpanel"
            hidden={tab !== "create"}
          >
            <div className="ops-target1-tabpanel-body">
              <OperationsStaffTargetForm assignees={assignees} students={students} />
            </div>
          </div>
        ) : null}

        <div
          id="ops-target1-panel-responsibility"
          role="tabpanel"
          aria-labelledby="ops-target1-tab-responsibility"
          className="ops-target1-tabpanel"
          hidden={tab !== "responsibility"}
        >
          <div className="ops-target1-tabpanel-body">
            <section className="ops-target1-card ops-target1-queue" aria-labelledby="staff-target-list-heading">
              <div className="ops-target1-queue-head">
                <div className="ops-target1-card-head">
                  <span className="ops-target1-card-icon ops-target1-card-icon--blue" aria-hidden="true">
                    <ListTodo />
                  </span>
                  <div>
                    <h2 id="staff-target-list-heading">
                      {targetId
                        ? "Notification target"
                        : scope === "my_work"
                          ? "My responsibility queue"
                          : "Organization responsibility queue"}
                    </h2>
                    <p>
                      {targetId
                        ? "The linked target is shown only when your current authority permits it."
                        : "Up to 100 targets in the selected view."}
                    </p>
                  </div>
                </div>
                <form className="ops-target1-filters" method="get">
                  <label className="ops-target1-field">
                    <span>Status</span>
                    <select className="ops-target1-control" name="status" defaultValue={status ?? ""}>
                      <option value="">All</option>
                      <option value="open">All open</option>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In progress</option>
                      <option value="due_soon">Due soon</option>
                      <option value="overdue">Overdue</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </label>
                  {scope === "organization" ? (
                    <label className="ops-target1-field">
                      <span>Staff</span>
                      <select className="ops-target1-control" name="assignee" defaultValue={assigneeId ?? ""}>
                        <option value="">All staff</option>
                        {assignees.map((staff) => (
                          <option key={staff.id} value={staff.id}>
                            {staff.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}
                  <button className="ops-target1-apply" type="submit">
                    Apply filters
                  </button>
                </form>
              </div>
              <OperationsStaffTargetList
                assignees={assignees}
                canManageAll={canManageAll}
                canUpdateStatus={canUpdateStatus}
                showAssignee={scope === "organization"}
                students={students}
                targets={targets}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
