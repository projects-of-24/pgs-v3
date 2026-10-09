"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Send, Shield, UserRound } from "lucide-react";
import { OperationsStaffConfirmDialog } from "@/components/operations-staff-confirm-dialog";
import {
  existingStudentStaffGrantCopy,
  isPrivilegeBroadening,
  isStaffRoleKey,
  isValidStaffEmail,
  normalizeStaffEmail,
  staffRoleLabel,
  type StaffDirectoryRole,
  type StaffInviteIdentity
} from "@/lib/operations-staff-access";

export function OperationsStaffInviteForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<StaffDirectoryRole>("mentor");
  const [identity, setIdentity] = useState<StaffInviteIdentity | null | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const studentWarning =
    identity?.has_student_profile && !identity.has_staff_profile ? existingStudentStaffGrantCopy() : null;

  async function resolveIdentity() {
    setMessage("");
    if (!isValidStaffEmail(email)) {
      setMessage("Enter a valid staff email.");
      return "error";
    }
    const response = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "resolve", email: normalizeStaffEmail(email) })
    });
    const result = (await response.json()) as {
      ok?: boolean;
      identity?: StaffInviteIdentity | null;
      message?: string;
    };
    if (!response.ok) {
      setMessage(result.message ?? "Unable to check this email.");
      return "error";
    }
    setIdentity(result.identity ?? null);
    return result.identity ?? null;
  }

  async function sendInvite() {
    setPending(true);
    setMessage("Sending…");
    const response = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        action: "invite",
        email: normalizeStaffEmail(email),
        display_name: displayName,
        role
      })
    });
    const result = (await response.json()) as {
      ok?: boolean;
      user_id?: string;
      code?: string;
      message?: string;
      resent?: boolean;
    };
    setPending(false);
    if (response.status === 409 && result.user_id) {
      setMessage("This person already has staff access.");
      router.push(`/ops/team/${result.user_id}`);
      return;
    }
    if (!response.ok) {
      setMessage(result.message ?? "Unable to invite this person.");
      return;
    }
    if (result.user_id) {
      router.push("/ops/team");
      router.refresh();
      return;
    }
    setMessage(result.resent ? "The invitation was resent." : "Staff access was saved.");
    router.push("/ops/team");
    router.refresh();
  }

  return (
    <form
      className="ops-invite1-form"
      onSubmit={(event) => {
        event.preventDefault();
        void (async () => {
          const resolved = identity === undefined ? await resolveIdentity() : identity;
          if (resolved === "error") return;
          if (resolved?.invite_pending) {
            setMessage("Invitation resend will be enabled before launch.");
            return;
          }
          if (resolved?.has_staff_profile && resolved.staff_status === "active" && !resolved.invite_pending) {
            setMessage("This person already has staff access.");
            return;
          }
          if (isPrivilegeBroadening(resolved?.staff_role ?? null, role)) {
            setConfirmOpen(true);
            return;
          }
          await sendInvite();
        })();
      }}
    >
      <label className="ops-invite1-field">
        <span className="ops-invite1-field-head">
          <span className="ops-invite1-field-icon ops-invite1-field-icon--email" aria-hidden="true">
            <Mail />
          </span>
          <span>Email</span>
        </span>
        <input
          autoComplete="off"
          className="ops-invite1-control"
          name="email"
          onBlur={() => {
            void resolveIdentity();
          }}
          onChange={(event) => {
            setEmail(event.target.value);
            setIdentity(undefined);
          }}
          placeholder="Enter email address"
          required
          type="email"
          value={email}
        />
      </label>

      <label className="ops-invite1-field">
        <span className="ops-invite1-field-head">
          <span className="ops-invite1-field-icon ops-invite1-field-icon--name" aria-hidden="true">
            <UserRound />
          </span>
          <span>Display name</span>
        </span>
        <input
          className="ops-invite1-control"
          maxLength={255}
          name="display_name"
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="Enter display name"
          required
          value={displayName}
        />
      </label>

      <label className="ops-invite1-field">
        <span className="ops-invite1-field-head">
          <span className="ops-invite1-field-icon ops-invite1-field-icon--role" aria-hidden="true">
            <Shield />
          </span>
          <span>Role</span>
        </span>
        <select
          className="ops-invite1-control"
          name="role"
          onChange={(event) => {
            const next = event.target.value;
            if (isStaffRoleKey(next)) setRole(next);
          }}
          value={role}
        >
          <option value="read_only_staff">Read-only Staff</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      </label>

      {identity?.has_staff_profile && identity.staff_status === "active" && !identity.invite_pending ? (
        <p className="ops-invite1-warning" role="status">
          This email already has staff access. Open Manage for {staffRoleLabel(identity.staff_role ?? role)}.
        </p>
      ) : null}
      {identity?.invite_pending ? (
        <p className="ops-invite1-warning" role="status">
          A pending invitation already exists for this email. Invitation resend will be enabled before launch.
        </p>
      ) : null}
      {identity?.has_staff_profile &&
      (identity.staff_status === "suspended" || identity.staff_status === "ended") ? (
        <p className="ops-invite1-warning" role="status">
          This email already has a staff identity. Sending will reuse the same login and restore access.
        </p>
      ) : null}
      {studentWarning ? (
        <p className="ops-invite1-warning" role="status">
          {studentWarning}
        </p>
      ) : null}

      {message ? (
        <p className="ops-invite1-status" role="status">
          {message}
        </p>
      ) : null}

      <button
        className="ops-invite1-submit"
        disabled={pending || Boolean(identity?.invite_pending)}
        type="submit"
      >
        <Send aria-hidden="true" />
        Review and send invitation
      </button>

      <OperationsStaffConfirmDialog
        confirmLabel="Send invitation"
        currentEmail={normalizeStaffEmail(email)}
        description="Review the access this invitation will grant, then confirm."
        error={message}
        nextRole={role}
        onConfirm={() => {
          setConfirmOpen(false);
          void sendInvite();
        }}
        onOpenChange={setConfirmOpen}
        open={confirmOpen}
        pending={pending}
        previousRole={identity?.staff_role ?? null}
        requireEmail={isPrivilegeBroadening(identity?.staff_role ?? null, role)}
        title="Confirm staff invitation"
        variant="confirm1"
      />
    </form>
  );
}
