"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserRoundPlus } from "lucide-react";
import type {
  StaffTargetAssigneeOption,
  StaffTargetPriority,
  StaffTargetStudentOption
} from "@/lib/operations-staff-targets";
import { staffRoleLabel } from "@/lib/operations-staff-access";

export function OperationsStaffTargetForm({
  assignees,
  students
}: {
  assignees: StaffTargetAssigneeOption[];
  students: StaffTargetStudentOption[];
}) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const [studentSearch, setStudentSearch] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const visibleStudents = useMemo(() => {
    const search = studentSearch.trim().toLowerCase();
    if (!search) return students;
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(search) || student.pgsCode.toLowerCase().includes(search)
    );
  }, [studentSearch, students]);

  async function submit(form: HTMLFormElement) {
    setPending(true);
    setMessage("Creating target…");
    const data = new FormData(form);
    const response = await fetch("/api/staff/targets", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: data.get("title"),
        description: data.get("description"),
        priority: data.get("priority") as StaffTargetPriority,
        assigned_staff_id: data.get("assigned_staff_id"),
        student_id: data.get("student_id"),
        due_date: data.get("due_date")
      })
    });
    const result = (await response.json()) as { message?: string };
    setPending(false);
    if (!response.ok) {
      setMessage(result.message ?? "Unable to create the target.");
      return;
    }
    form.reset();
    setStudentSearch("");
    setMessage("Target created.");
    router.refresh();
    requestAnimationFrame(() => titleRef.current?.focus());
  }

  return (
    <section className="ops-target1-card ops-target1-create" aria-labelledby="create-staff-target-heading">
      <div className="ops-target1-card-head">
        <span className="ops-target1-card-icon ops-target1-card-icon--purple" aria-hidden="true">
          <UserRoundPlus />
        </span>
        <div>
          <h2 id="create-staff-target-heading">Create staff target</h2>
          <p>Assign one clear operational responsibility. This does not change student access.</p>
        </div>
      </div>

      <form
        className="ops-target1-form"
        onSubmit={(event) => {
          event.preventDefault();
          void submit(event.currentTarget);
        }}
      >
        <label className="ops-target1-field ops-target1-field--half">
          <span>Title</span>
          <input ref={titleRef} className="ops-target1-control" name="title" required maxLength={160} />
        </label>

        <label className="ops-target1-field ops-target1-field--half">
          <span>Assignee</span>
          <select className="ops-target1-control" name="assigned_staff_id" required defaultValue="">
            <option value="" disabled>
              Select active staff
            </option>
            {assignees.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name} · {staffRoleLabel(staff.role)}
              </option>
            ))}
          </select>
        </label>

        <label className="ops-target1-field ops-target1-field--third">
          <span>Find student (optional)</span>
          <input
            className="ops-target1-control"
            type="search"
            value={studentSearch}
            onChange={(event) => setStudentSearch(event.target.value)}
            placeholder="Name or PGS ID"
          />
        </label>

        <label className="ops-target1-field ops-target1-field--third">
          <span>Priority</span>
          <select className="ops-target1-control" name="priority" defaultValue="normal">
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>

        <label className="ops-target1-field ops-target1-field--third">
          <span>Due date</span>
          <input className="ops-target1-control" name="due_date" type="date" />
        </label>

        <label className="ops-target1-field ops-target1-field--third">
          <span>Student</span>
          <select className="ops-target1-control" name="student_id" defaultValue="">
            <option value="">No student</option>
            {visibleStudents.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} · {student.pgsCode}
              </option>
            ))}
          </select>
        </label>

        <label className="ops-target1-field ops-target1-field--full">
          <span>Context</span>
          <input className="ops-target1-control" name="description" maxLength={4000} />
        </label>

        <div className="ops-target1-form-actions">
          <button className="ops-target1-primary" disabled={pending || !assignees.length} type="submit">
            Create target
          </button>
          {message ? (
            <p className="ops-target1-status" role="status" aria-live="polite">
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
