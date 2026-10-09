"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  STAFF_TARGET_STATUSES,
  formatStaffTargetDueDate,
  isStaffTargetOverdue,
  staffTargetDueDateValue,
  staffTargetPriorityLabel,
  staffTargetStatusLabel,
  type StaffTarget,
  type StaffTargetAssigneeOption,
  type StaffTargetStudentOption,
  type StaffTargetStatus
} from "@/lib/operations-staff-targets";
import { staffRoleLabel } from "@/lib/operations-staff-access";

function StatusControl({
  target,
  onSaved
}: {
  target: StaffTarget;
  onSaved: (message: string) => void;
}) {
  const [status, setStatus] = useState<StaffTargetStatus>(target.status);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setStatus(target.status);
  }, [target.status]);

  async function save() {
    if (status === target.status || pending) return;
    setPending(true);
    const response = await fetch("/api/staff/targets", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "status", id: target.id, status })
    });
    const result = (await response.json()) as { message?: string };
    setPending(false);
    onSaved(response.ok ? "Target status updated." : result.message ?? "Unable to update target status.");
  }

  return (
    <div className="ops-target1-action">
      <label className="ops-target1-action-field">
        <span className="ops-um-visually-hidden">Status for {target.title}</span>
        <select
          className="ops-target1-control ops-target1-control--compact"
          value={status}
          disabled={pending}
          aria-label={`Status for ${target.title}`}
          onChange={(event) => setStatus(event.target.value as StaffTargetStatus)}
        >
          {STAFF_TARGET_STATUSES.map((option) => (
            <option key={option} value={option}>
              {staffTargetStatusLabel(option)}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        className="ops-target1-update-status"
        disabled={pending || status === target.status}
        onClick={() => void save()}
      >
        Update status
      </button>
    </div>
  );
}

function EditTargetDialog({
  target,
  assignees,
  students,
  onSaved,
  onClose
}: {
  target: StaffTarget;
  assignees: StaffTargetAssigneeOption[];
  students: StaffTargetStudentOption[];
  onSaved: (message: string) => void;
  onClose: () => void;
}) {
  const [pending, setPending] = useState(false);
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => firstFieldRef.current?.focus());
  }, []);

  async function save(form: HTMLFormElement) {
    setPending(true);
    const data = new FormData(form);
    const response = await fetch("/api/staff/targets", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        action: "update",
        id: target.id,
        title: data.get("title"),
        description: data.get("description"),
        priority: data.get("priority"),
        assigned_staff_id: data.get("assigned_staff_id"),
        student_id: data.get("student_id"),
        due_date: data.get("due_date")
      })
    });
    const result = (await response.json()) as { message?: string };
    setPending(false);
    if (!response.ok) {
      onSaved(result.message ?? "Unable to update target.");
      return;
    }
    onSaved("Target details updated.");
    onClose();
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="ops-target1-dialog" aria-describedby={`${titleId}-desc`}>
        <DialogHeader className="ops-target1-dialog-header">
          <DialogTitle id={titleId} className="ops-target1-dialog-title">
            Edit {target.title}
          </DialogTitle>
          <DialogDescription id={`${titleId}-desc`} className="ops-um-visually-hidden">
            Update title, assignee, student, priority, due date, and context for this staff target.
          </DialogDescription>
          <DialogClose className="ops-target1-dialog-close" aria-label="Close edit target dialog">
            <X aria-hidden="true" />
          </DialogClose>
        </DialogHeader>

        <form
          className="ops-target1-dialog-form"
          onSubmit={(event) => {
            event.preventDefault();
            void save(event.currentTarget);
          }}
        >
          <label className="ops-target1-field">
            <span>Title</span>
            <input
              ref={firstFieldRef}
              className="ops-target1-control"
              name="title"
              required
              maxLength={160}
              defaultValue={target.title}
            />
          </label>
          <label className="ops-target1-field">
            <span>Assignee</span>
            <select className="ops-target1-control" name="assigned_staff_id" defaultValue={target.assignedStaffId}>
              {assignees.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} · {staffRoleLabel(staff.role)}
                </option>
              ))}
            </select>
          </label>
          <label className="ops-target1-field">
            <span>Student</span>
            <select className="ops-target1-control" name="student_id" defaultValue={target.studentId ?? ""}>
              <option value="">No student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} · {student.pgsCode}
                </option>
              ))}
            </select>
          </label>
          <div className="ops-target1-dialog-row">
            <label className="ops-target1-field">
              <span>Priority</span>
              <select className="ops-target1-control" name="priority" defaultValue={target.priority}>
                <option value="normal">Normal</option>
                <option value="important">Important</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
            <label className="ops-target1-field">
              <span>Due date</span>
              <input
                className="ops-target1-control"
                name="due_date"
                type="date"
                defaultValue={staffTargetDueDateValue(target.dueAt)}
              />
            </label>
          </div>
          <label className="ops-target1-field">
            <span>Context</span>
            <input
              className="ops-target1-control"
              name="description"
              maxLength={4000}
              defaultValue={target.description}
            />
          </label>
          <button className="ops-target1-primary" disabled={pending} type="submit">
            Save details
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function StudentLink({ target }: { target: StaffTarget }) {
  if (!target.studentId) return <span>Organization</span>;
  return (
    <Link className="ops-target1-student" href={`/ops/students/${target.studentId}`}>
      <strong>{target.studentName || "Student"}</strong>
      {target.studentPgsCode ? <small>{target.studentPgsCode}</small> : null}
    </Link>
  );
}

function priorityClass(priority: string): string {
  if (priority === "urgent") return "ops-target1-pill ops-target1-pill--urgent";
  if (priority === "important") return "ops-target1-pill ops-target1-pill--important";
  return "ops-target1-pill ops-target1-pill--normal";
}

function statusClass(status: string): string {
  if (status === "completed") return "ops-target1-pill ops-target1-pill--done";
  if (status === "cancelled") return "ops-target1-pill ops-target1-pill--cancelled";
  if (status === "in_progress") return "ops-target1-pill ops-target1-pill--progress";
  return "ops-target1-pill ops-target1-pill--pending";
}

export function OperationsStaffTargetList({
  targets,
  canManageAll,
  canUpdateStatus,
  assignees = [],
  students = [],
  showAssignee = true
}: {
  targets: StaffTarget[];
  canManageAll: boolean;
  canUpdateStatus: boolean;
  assignees?: StaffTargetAssigneeOption[];
  students?: StaffTargetStudentOption[];
  showAssignee?: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [editingTarget, setEditingTarget] = useState<StaffTarget | null>(null);
  const saved = (next: string) => {
    setMessage(next);
    if (next.endsWith("updated.")) router.refresh();
  };

  if (!targets.length) {
    return <p className="ops-target1-empty">No staff targets match this view.</p>;
  }

  return (
    <>
      {message ? (
        <p className="ops-target1-status" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}

      <div className="ops-target1-table-scroll" tabIndex={0} role="region" aria-label="Staff targets">
        <table className="ops-target1-table">
          <thead>
            <tr>
              <th scope="col">What</th>
              <th scope="col">Student</th>
              {showAssignee ? <th scope="col">Assignee</th> : null}
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
              <th scope="col">Due</th>
              {canUpdateStatus || canManageAll ? <th scope="col">Action</th> : null}
            </tr>
          </thead>
          <tbody>
            {targets.map((target) => {
              const overdue = isStaffTargetOverdue(target);
              return (
                <tr key={target.id} data-staff-target={target.id}>
                  <td>
                    <strong>{target.title}</strong>
                    {target.description ? <small className="ops-target1-context">{target.description}</small> : null}
                    {canManageAll ? (
                      <button className="ops-target1-edit-link" type="button" onClick={() => setEditingTarget(target)}>
                        Edit
                      </button>
                    ) : null}
                  </td>
                  <td>
                    <StudentLink target={target} />
                  </td>
                  {showAssignee ? (
                    <td>
                      <Link className="ops-target1-assignee" href={`/ops/team/${target.assignedStaffId}`}>
                        {target.assigneeName}
                      </Link>
                    </td>
                  ) : null}
                  <td>
                    <span className={statusClass(target.status)}>{staffTargetStatusLabel(target.status)}</span>
                  </td>
                  <td>
                    <span className={priorityClass(target.priority)}>{staffTargetPriorityLabel(target.priority)}</span>
                  </td>
                  <td>
                    <time dateTime={target.dueAt ?? undefined}>{formatStaffTargetDueDate(target.dueAt)}</time>
                    {overdue ? <strong className="ops-target1-overdue">Overdue</strong> : null}
                  </td>
                  {canUpdateStatus || canManageAll ? (
                    <td>{canUpdateStatus ? <StatusControl target={target} onSaved={saved} /> : null}</td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {canManageAll && editingTarget ? (
        <EditTargetDialog
          assignees={assignees}
          onClose={() => setEditingTarget(null)}
          onSaved={saved}
          students={students}
          target={editingTarget}
        />
      ) : null}
    </>
  );
}
