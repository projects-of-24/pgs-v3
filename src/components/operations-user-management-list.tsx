"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  staffRoleLabel,
  staffStatusLabel,
  type StaffDirectoryRow
} from "@/lib/operations-staff-access";

const PAGE_SIZE = 10;

export type UserManagementRow = StaffDirectoryRow & {
  email: string | null;
};

function roleBadgeClass(role: string): string {
  if (role === "admin") return "ops-um-badge ops-um-badge--admin";
  if (role === "mentor") return "ops-um-badge ops-um-badge--mentor";
  return "ops-um-badge ops-um-badge--staff";
}

function statusBadgeClass(status: string, invitePending: boolean): string {
  if (invitePending) return "ops-um-badge ops-um-badge--pending";
  if (status === "active") return "ops-um-badge ops-um-badge--active";
  return "ops-um-badge ops-um-badge--inactive";
}

function displayRoleLabel(role: string): string {
  if (role === "read_only_staff") return "Staff";
  return staffRoleLabel(role);
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function OperationsUserManagementList({ rows }: { rows: UserManagementRow[] }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (role !== "all" && row.role_key !== role) return false;
      if (!q) return true;
      const hay = `${row.display_name} ${row.email ?? ""} ${displayRoleLabel(row.role_key)}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, search, role]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE) || 1);
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(start, start + PAGE_SIZE);
  const showingFrom = filtered.length === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + PAGE_SIZE, filtered.length);

  return (
    <section className="ops-um-panel" aria-labelledby="ops-um-list-heading">
      <h2 id="ops-um-list-heading" className="ops-um-visually-hidden">
        Staff users
      </h2>

      <div className="ops-um-toolbar">
        <label className="ops-um-search">
          <span className="ops-um-visually-hidden">Search users</span>
          <input
            type="search"
            className="ops-um-control"
            placeholder="Search users..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </label>
        <label className="ops-um-role-filter">
          <span className="ops-um-visually-hidden">Role</span>
          <select
            className="ops-um-control"
            value={role}
            onChange={(event) => {
              setRole(event.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="mentor">Mentor</option>
            <option value="read_only_staff">Staff</option>
          </select>
        </label>
      </div>

      <div className="ops-um-table-scroll" tabIndex={0} role="region" aria-label="User management table">
        <table className="ops-um-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Assigned</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.user_id}>
                <td>
                  <div className="ops-um-person">
                    <span className="ops-um-avatar" aria-hidden="true">
                      {initials(row.display_name)}
                    </span>
                    <strong>{row.display_name}</strong>
                  </div>
                </td>
                <td>{row.email ?? "—"}</td>
                <td>
                  <span className={roleBadgeClass(row.role_key)}>{displayRoleLabel(row.role_key)}</span>
                </td>
                <td>
                  <span className={statusBadgeClass(row.status, row.invite_pending)}>
                    {staffStatusLabel(row.status, row.invite_pending) === "Invite pending"
                      ? "Pending"
                      : staffStatusLabel(row.status, row.invite_pending) === "Active"
                        ? "Active"
                        : "Inactive"}
                  </span>
                </td>
                <td>{row.assigned_student_count}</td>
                <td>
                  <div className="ops-um-actions">
                    <Link className="ops-um-edit" href={`/ops/admin/users/${row.user_id}/permissions`}>
                      Edit Permissions
                    </Link>
                    <Link
                      className="ops-team1-manage-btn"
                      href={`/ops/team/${row.user_id}?from=um`}
                    >
                      Manage
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {!pageRows.length ? (
              <tr>
                <td className="ops-um-empty" colSpan={6}>
                  No staff users match this filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <nav className="ops-um-pagination" aria-label="User list pagination">
        <p>
          Showing {showingFrom} to {showingTo} of {filtered.length} users
        </p>
        <div className="ops-um-pagination-controls">
          <button
            type="button"
            className="ops-um-page-btn"
            disabled={safePage <= 1}
            aria-label="Previous page"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            ‹
          </button>
          <button
            type="button"
            className="ops-um-page-btn ops-um-page-btn--active"
            aria-label={`Page ${safePage}`}
            aria-current="page"
          >
            {safePage}
          </button>
          <button
            type="button"
            className="ops-um-page-btn"
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
