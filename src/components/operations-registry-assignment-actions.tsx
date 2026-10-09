"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import {
  ArrowRight,
  GraduationCap,
  Info,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { staffRoleLabel, type StaffDirectoryRole } from "@/lib/operations-staff-access";
import type { RegistryMentorOption } from "@/lib/operations-student-registry";

type AssignmentKind = "assign" | "reassign" | "unassign";

export type RegistryAssignmentRow = {
  id: string;
  fullName: string;
  plan: "Premium" | "Standard";
  mentorId: string | null;
  mentorName: string;
};

function handlerLabel(option: RegistryMentorOption): string {
  return option.displayName;
}

function handlerRole(option: RegistryMentorOption): string {
  return option.roleKey ? staffRoleLabel(option.roleKey as StaffDirectoryRole) : "Staff";
}

export function OperationsRegistryAssignmentActions({
  row,
  handlers,
  canManage,
  canPreviewStudent,
  previewConfigured
}: {
  row: RegistryAssignmentRow;
  handlers: RegistryMentorOption[];
  canManage: boolean;
  canPreviewStudent: boolean;
  previewConfigured: boolean;
}) {
  const router = useRouter();
  const handlerFieldId = useId();
  const [kind, setKind] = useState<AssignmentKind | null>(null);
  const [handlerId, setHandlerId] = useState("");
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const selected = handlers.find((handler) => handler.id === handlerId) ?? null;
  const assigned = Boolean(row.mentorId);
  const premium = row.plan === "Premium";

  const afterName = useMemo(() => {
    if (kind === "unassign") return "Unassigned";
    return selected ? selected.displayName : "Select a handler";
  }, [kind, selected]);

  async function startPreview() {
    setPending(true);
    setError("");
    // Open tab in the click gesture first so the browser allows a new tab after the API returns.
    const previewTab = window.open("about:blank", "_blank");
    const response = await fetch("/api/staff/preview", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode: "student", target_id: row.id })
    });
    const result = (await response.json()) as { ok?: boolean; redirect?: string; message?: string };
    if (!response.ok) {
      previewTab?.close();
      setPending(false);
      setError(result.message ?? "Unable to start student preview.");
      return;
    }
    const href = new URL(result.redirect ?? "/student/dashboard", window.location.origin).href;
    if (previewTab) {
      previewTab.location.href = href;
      setPending(false);
      return;
    }
    setPending(false);
    setError("Allow pop-ups for this site so View as Student can open in a new tab.");
  }

  async function confirm() {
    if (!kind) return;
    if ((kind === "assign" || kind === "reassign") && !selected) {
      setError("Select a staff member to assign.");
      return;
    }
    setPending(true);
    setError("");
    const mentorId = kind === "unassign" ? row.mentorId : selected?.id;
    if (!mentorId) {
      setPending(false);
      setError("Select a staff member to assign.");
      return;
    }
    const response = await fetch("/api/staff/assignments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        student_id: row.id,
        mentor_id: mentorId,
        active: kind !== "unassign",
        reason: kind === "unassign" ? "viewer_ended" : kind === "reassign" ? "viewer_reassigned" : "assigned"
      })
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };
    setPending(false);
    if (!response.ok) {
      setError(result.message ?? "Unable to change the mentor assignment.");
      return;
    }
    setKind(null);
    setHandlerId("");
    setStatus(
      kind === "unassign"
        ? `${row.fullName} is now Unassigned.`
        : `${row.fullName} is now assigned to ${selected?.displayName ?? "the selected handler"}.`
    );
    router.refresh();
  }

  const dialogTitle = kind === "unassign" ? "Unassign mentor" : kind === "reassign" ? "Change mentor" : "Assign mentor";
  const confirmLabel =
    kind === "unassign" ? "Confirm unassign" : kind === "reassign" ? "Confirm change" : "Confirm assignment";

  function openKind(next: AssignmentKind) {
    setKind(next);
    setHandlerId("");
    setError("");
  }

  return (
    <div className="ops-registry-actions">
      {status ? (
        <p className="ops:sr-only" role="status" aria-live="polite">
          {status}
        </p>
      ) : null}
      {error && !kind ? (
        <p role="alert" className="ops-stu-assign-inline-error">
          {error}
        </p>
      ) : null}
      {canManage && premium && !assigned ? (
        <button type="button" className="ops-stu-assign-trigger" onClick={() => openKind("assign")}>
          Assign mentor
        </button>
      ) : null}
      {canManage && premium && assigned ? (
        <>
          <button type="button" className="ops-stu-assign-trigger" onClick={() => openKind("reassign")}>
            Change mentor
          </button>
          <button type="button" className="ops-stu-assign-trigger" onClick={() => openKind("unassign")}>
            Unassign
          </button>
        </>
      ) : null}
      {canManage && !premium && assigned ? (
        <button type="button" className="ops-stu-assign-trigger" onClick={() => openKind("unassign")}>
          Unassign
        </button>
      ) : null}
      {canManage && !premium && !assigned ? <span>Premium required for mentor assignment</span> : null}
      {canPreviewStudent ? (
        <button
          type="button"
          className="ops-stu-assign-trigger"
          disabled={pending || !previewConfigured}
          aria-describedby={!previewConfigured ? "student-preview-unavailable" : undefined}
          onClick={() => void startPreview()}
        >
          View as Student
        </button>
      ) : null}

      <Dialog
        open={kind !== null}
        onOpenChange={(open) => {
          if (!open && !pending) {
            setKind(null);
            setHandlerId("");
            setError("");
          }
        }}
      >
        <DialogContent
          className="ops-stu-assign-dialog"
          aria-describedby="ops-stu-assign-desc"
        >
          <DialogClose className="ops-stu-assign-close" aria-label="Close">
            <X aria-hidden="true" />
          </DialogClose>

          <DialogHeader className="ops-stu-assign-head">
            <span className="ops-stu-assign-head-icon" aria-hidden="true">
              <UsersRound />
            </span>
            <div className="ops-stu-assign-head-copy">
              <DialogTitle className="ops-stu-assign-title">{dialogTitle}</DialogTitle>
              <DialogDescription id="ops-stu-assign-desc" className="ops-stu-assign-desc">
                Review the assignment change before it is applied. The trusted assignment RPC remains the only write.
              </DialogDescription>
            </div>
          </DialogHeader>

          <dl className="ops-stu-assign-facts">
            <div className="ops-stu-assign-fact">
              <span className="ops-stu-assign-fact-icon" aria-hidden="true">
                <GraduationCap />
              </span>
              <dt>Student</dt>
              <dd>{row.fullName}</dd>
            </div>
            <div className="ops-stu-assign-fact">
              <span className="ops-stu-assign-fact-icon" aria-hidden="true">
                <UserRound />
              </span>
              <dt>Current mentor</dt>
              <dd>{assigned ? row.mentorName : "Unassigned"}</dd>
            </div>
            <div className="ops-stu-assign-fact">
              <span className="ops-stu-assign-fact-icon ops-stu-assign-fact-icon--before" aria-hidden="true">
                <ArrowRight />
              </span>
              <dt>BEFORE</dt>
              <dd>{assigned ? row.mentorName : "Unassigned"}</dd>
            </div>
            <div className="ops-stu-assign-fact">
              <span className="ops-stu-assign-fact-icon ops-stu-assign-fact-icon--after" aria-hidden="true">
                <ArrowRight />
              </span>
              <dt>AFTER</dt>
              <dd>{afterName}</dd>
            </div>
          </dl>

          {kind === "assign" || kind === "reassign" ? (
            <label className="ops-stu-assign-field" htmlFor={handlerFieldId}>
              <span>Assign to</span>
              <select
                id={handlerFieldId}
                className="ops-stu-assign-select"
                value={handlerId}
                onChange={(event) => setHandlerId(event.target.value)}
              >
                <option value="">Select a staff member</option>
                {handlers
                  .filter((handler) => handler.id !== row.mentorId)
                  .map((handler) => (
                    <option key={handler.id} value={handler.id}>
                      {handlerLabel(handler)} — {handlerRole(handler)}
                    </option>
                  ))}
              </select>
            </label>
          ) : null}

          {kind === "reassign" ? (
            <p className="ops-stu-assign-info" role="status">
              <Info aria-hidden="true" className="ops-stu-assign-info-icon" />
              <span>Changing the mentor will end the existing assignment and create the new active assignment.</span>
            </p>
          ) : null}

          {kind === "unassign" ? (
            <p className="ops-stu-assign-warn" role="status">
              This student will no longer have an active mentor relationship. Mentor workspace access will end.
            </p>
          ) : null}

          {error ? (
            <p className="ops-stu-assign-error" role="alert">
              {error}
            </p>
          ) : null}

          <DialogFooter className="ops-stu-assign-footer">
            <button
              type="button"
              className="ops-stu-assign-btn ops-stu-assign-btn--ghost"
              disabled={pending}
              onClick={() => {
                setKind(null);
                setHandlerId("");
                setError("");
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ops-stu-assign-btn ops-stu-assign-btn--primary"
              disabled={pending}
              onClick={() => void confirm()}
            >
              {confirmLabel}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
