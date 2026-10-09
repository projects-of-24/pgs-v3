"use client";

import { useState, useTransition } from "react";
import { Mail, UsersRound } from "lucide-react";
import {
  GUARDIAN_RELATIONSHIP_LABELS,
  type GuardianRelationshipLabel,
  type GuardianRelationshipRow
} from "@/lib/guardian-portal";

type Props = {
  studentId: string;
  initialGuardians: GuardianRelationshipRow[];
  canManage: boolean;
};

function statusLabel(status: string): string {
  if (status === "invited") return "Invited — awaiting acceptance";
  if (status === "active") return "Active";
  if (status === "revoked") return "Revoked";
  return status;
}

export function StudentGuardiansPanel({ studentId, initialGuardians, canManage }: Props) {
  const [guardians, setGuardians] = useState<GuardianRelationshipRow[]>(initialGuardians);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLabel, setInviteLabel] = useState<GuardianRelationshipLabel>("Guardian");
  const [inviting, setInviting] = useState(false);

  const baseUrl = `/api/staff/students/${studentId}/guardians`;

  async function refresh() {
    const res = await fetch(baseUrl);
    if (res.ok) {
      const data = (await res.json()) as { guardians: GuardianRelationshipRow[] };
      setGuardians(data.guardians ?? []);
    }
  }

  async function handleInvite(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setInviting(true);
    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ intent: "invite", email: inviteEmail, label: inviteLabel })
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Unable to send invitation.");
      } else {
        setInviteEmail("");
        startTransition(() => {
          void refresh();
        });
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setInviting(false);
    }
  }

  async function handleRevoke(relationshipId: string, guardianEmail: string) {
    setError("");
    if (!confirm(`Revoke guardian access for ${guardianEmail}? This takes effect immediately.`)) return;
    try {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ intent: "revoke", relationship_id: relationshipId })
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Unable to revoke guardian.");
      } else {
        startTransition(() => {
          void refresh();
        });
      }
    } catch {
      setError("An unexpected error occurred.");
    }
  }

  const active = guardians.filter((g) => g.status !== "revoked");
  const revoked = guardians.filter((g) => g.status === "revoked");

  return (
    <section className="ops-stu2-card ops-stu2-guardians" aria-labelledby="guardians-panel-heading">
      <header className="ops-stu2-card-head">
        <div className="ops-stu2-card-title">
          <span className="ops-stu2-card-icon" aria-hidden="true">
            <UsersRound />
          </span>
          <h2 id="guardians-panel-heading">Guardians / Parents</h2>
        </div>
      </header>

      <p className="ops-stu2-lead">
        Explicit guardian relationships for this student. Each guardian authenticates with their own identity.
      </p>

      {error ? (
        <p role="alert" className="ops-stu2-status ops-stu2-status--error">
          {error}
        </p>
      ) : null}

      {active.length === 0 ? (
        <p className="ops-stu2-note">No active or pending guardians.</p>
      ) : (
        <div className="ops-stu2-table-wrap">
          <table className="ops-stu2-table" aria-label="Active and pending guardians">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Relationship</th>
                <th scope="col">Status</th>
                <th scope="col">Accepted</th>
                {canManage ? (
                  <th scope="col">
                    <span className="ops-stu2-visually-hidden">Actions</span>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {active.map((row) => (
                <tr key={row.id}>
                  <td>{row.guardian_email}</td>
                  <td>{row.relationship_label}</td>
                  <td>
                    <span className={`ops-stu2-pill ${row.status === "active" ? "ops-stu2-pill--success" : "ops-stu2-pill--pending"}`}>
                      {statusLabel(row.status)}
                    </span>
                  </td>
                  <td>{row.accepted_at ? new Date(row.accepted_at).toLocaleDateString() : "—"}</td>
                  {canManage ? (
                    <td>
                      <button
                        type="button"
                        className="ops-stu2-link-danger"
                        onClick={() => void handleRevoke(row.id, row.guardian_email)}
                        disabled={pending}
                        aria-label={`Revoke guardian access for ${row.guardian_email}`}
                      >
                        Revoke
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {revoked.length > 0 ? (
        <details className="ops-stu2-details">
          <summary>
            {revoked.length} revoked {revoked.length === 1 ? "record" : "records"}
          </summary>
          <div className="ops-stu2-table-wrap">
            <table className="ops-stu2-table" aria-label="Revoked guardians">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Relationship</th>
                  <th scope="col">Revoked</th>
                </tr>
              </thead>
              <tbody>
                {revoked.map((row) => (
                  <tr key={row.id}>
                    <td>{row.guardian_email}</td>
                    <td>{row.relationship_label}</td>
                    <td>{row.revoked_at ? new Date(row.revoked_at).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ) : null}

      {canManage ? (
        <form className="ops-stu2-invite" onSubmit={(e) => void handleInvite(e)} aria-label="Invite a guardian">
          <h3>Invite a guardian</h3>
          <div className="ops-stu2-invite-row">
            <label className="ops-stu2-field" htmlFor="guardian-email">
              <span>Guardian email</span>
              <input
                id="guardian-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                autoComplete="off"
                maxLength={254}
                placeholder="parent@example.com"
                className="ops-stu2-control"
              />
            </label>
            <label className="ops-stu2-field" htmlFor="guardian-label">
              <span>Relationship</span>
              <select
                id="guardian-label"
                value={inviteLabel}
                onChange={(e) => setInviteLabel(e.target.value as GuardianRelationshipLabel)}
                className="ops-stu2-control"
              >
                {GUARDIAN_RELATIONSHIP_LABELS.map((lbl) => (
                  <option key={lbl} value={lbl}>
                    {lbl}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={inviting || pending} className="ops-stu2-btn ops-stu2-btn--dark" aria-label="Send guardian invitation">
              <Mail aria-hidden="true" />
              {inviting ? "Sending…" : "Send invitation"}
            </button>
          </div>
          <p className="ops-stu2-note">
            The guardian will receive an email invitation. They must accept before gaining access. Resending invitations
            requires Preview SMTP to be live.
          </p>
        </form>
      ) : null}
    </section>
  );
}
