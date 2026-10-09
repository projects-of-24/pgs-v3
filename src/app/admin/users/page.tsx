import Link from "next/link";
import { redirect } from "next/navigation";
import { OperationsUserManagementList } from "@/components/operations-user-management-list";
import {
  loadStaffDirectoryEmails,
  loadStaffPeopleDirectory
} from "@/lib/operations-staff-access-server";
import { requireStaffPermission } from "@/lib/staff-auth";
import { redirectMentorPreviewAwayFromPrivilegedPages } from "@/lib/staff-preview-server";

export default async function UserManagementPage() {
  await redirectMentorPreviewAwayFromPrivilegedPages();
  const context = await requireStaffPermission("roles.manage");
  if (!context.roles.includes("super_admin")) {
    redirect("/ops");
  }

  let rows: Array<Awaited<ReturnType<typeof loadStaffPeopleDirectory>>[number] & { email: string | null }> = [];
  try {
    const directory = await loadStaffPeopleDirectory();
    const managedRows = directory.filter((row) => row.role_key !== "super_admin");
    let emails: Record<string, string> = {};
    try {
      emails = await loadStaffDirectoryEmails(
        context,
        managedRows.map((row) => row.user_id)
      );
    } catch {
      emails = {};
    }
    rows = managedRows.map((row) => ({
      ...row,
      email: emails[row.user_id] ?? null
    }));
  } catch (error) {
    console.error("[UM1] failed to load staff directory", error);
    rows = [];
  }

  return (
    <div className="ops-um-page" data-ops-um-pass="um1">
      <header className="ops-um-page-header">
        <nav className="ops-um-breadcrumb" aria-label="Breadcrumb">
          <span>Admin Panel</span>
          <span className="ops-um-breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">User Management</span>
        </nav>
        <div className="ops-um-page-heading">
          <div>
            <h1>User Management</h1>
            <p>Manage all staff users, assign roles and permissions. (Super Admin is not listed)</p>
          </div>
          <Link className="ops-um-add-user" href="/ops/team/invite">
            + Add User
          </Link>
        </div>
      </header>

      <OperationsUserManagementList rows={rows} />
    </div>
  );
}
