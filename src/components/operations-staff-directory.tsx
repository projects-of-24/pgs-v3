"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Crown, Eye, MoreVertical, Shield, UserRound } from "lucide-react";
import {
  staffDirectoryActionLabel,
  staffRoleLabel,
  staffStatusLabel,
  staffStudentScopeLabel,
  type StaffDirectoryRow
} from "@/lib/operations-staff-access";

const PAGE_SIZE = 10;

function roleBadgeClass(role: string): string {
  if (role === "super_admin") return "ops-team1-role ops-team1-role--super";
  if (role === "admin") return "ops-team1-role ops-team1-role--admin";
  if (role === "mentor") return "ops-team1-role ops-team1-role--mentor";
  return "ops-team1-role ops-team1-role--readonly";
}

function RoleIcon({ role }: { role: string }) {
  if (role === "super_admin") return <Shield aria-hidden="true" />;
  if (role === "admin") return <Crown aria-hidden="true" />;
  if (role === "mentor") return <UserRound aria-hidden="true" />;
  return <Eye aria-hidden="true" />;
}

function statusClass(status: string, invitePending: boolean): string {
  if (invitePending) return "ops-team1-status ops-team1-status--pending";
  if (status === "active") return "ops-team1-status ops-team1-status--active";
  return "ops-team1-status ops-team1-status--inactive";
}

export function OperationsStaffDirectory({
  rows,
  canManage
}: {
  rows: StaffDirectoryRow[];
  canManage: boolean;
}) {
  const [page, setPage] = useState(1);
  const actionLabel = staffDirectoryActionLabel(canManage);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE) || 1);
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageRows = useMemo(() => rows.slice(start, start + PAGE_SIZE), [rows, start]);
  const showingFrom = rows.length === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + PAGE_SIZE, rows.length);

  return (
    <section className="ops-team1-panel" aria-labelledby="ops-team1-list-heading">
      <h2 id="ops-team1-list-heading" className="ops-team1-visually-hidden">
        People and access directory
      </h2>

      <div className="ops-team1-table-scroll" tabIndex={0} role="region" aria-label="People and access table">
        <table className="ops-team1-table">
          <thead>
            <tr>
              <th scope="col">Person</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Scope</th>
              <th scope="col">Assigned students</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.user_id}>
                <td>
                  <strong className="ops-team1-name">{row.display_name}</strong>
                  {row.has_student_profile ? (
                    <span className="ops-team1-meta">Also a PGS student</span>
                  ) : null}
                </td>
                <td>
                  <span className={roleBadgeClass(row.role_key)}>
                    <RoleIcon role={row.role_key} />
                    {staffRoleLabel(row.role_key)}
                  </span>
                </td>
                <td>
                  <span className={statusClass(row.status, row.invite_pending)}>
                    <span className="ops-team1-status-dot" aria-hidden="true" />
                    {staffStatusLabel(row.status, row.invite_pending)}
                  </span>
                </td>
                <td>{staffStudentScopeLabel(row.role_key)}</td>
                <td>{row.assigned_student_count}</td>
                <td>
                  <div className="ops-team1-manage">
                    <Link className="ops-team1-manage-btn" href={`/ops/team/${row.user_id}`}>
                      {actionLabel}
                    </Link>
                    <span className="ops-team1-more" aria-hidden="true">
                      <MoreVertical />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {!pageRows.length ? (
              <tr>
                <td className="ops-team1-empty" colSpan={6}>
                  No staff identities were returned.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <nav className="ops-team1-pagination" aria-label="People list pagination">
        <p>
          Showing {showingFrom} to {showingTo} of {rows.length} people
        </p>
        <div className="ops-team1-pagination-controls">
          <button
            type="button"
            className="ops-team1-page-btn"
            disabled={safePage <= 1}
            aria-label="Previous page"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            ‹
          </button>
          <button
            type="button"
            className="ops-team1-page-btn ops-team1-page-btn--active"
            aria-label={`Page ${safePage}`}
            aria-current="page"
          >
            {safePage}
          </button>
          <button
            type="button"
            className="ops-team1-page-btn"
            disabled={safePage >= pageCount}
            aria-label="Next page"
            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          >
            ›
          </button>
        </div>
      </nav>
    </section>
  );
}
