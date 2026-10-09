import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { OperationsUserPermissionsEditor } from "@/components/operations-user-permissions-editor";
import { validUuid } from "@/lib/http";
import {
  loadStaffAuthEmail,
  loadStaffNavGrants,
  requireStaffAccessDetail
} from "@/lib/operations-staff-access-server";
import { requireStaffPermission } from "@/lib/staff-auth";
import { redirectMentorPreviewAwayFromPrivilegedPages } from "@/lib/staff-preview-server";

export default async function UserPermissionsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  await redirectMentorPreviewAwayFromPrivilegedPages();
  const context = await requireStaffPermission("roles.manage");
  if (!context.roles.includes("super_admin")) {
    redirect("/ops");
  }

  const { id } = await params;
  if (!validUuid(id)) notFound();

  const detail = await requireStaffAccessDetail(id);
  if (detail.role_key === "super_admin") {
    redirect("/ops/admin/users");
  }

  let email: string | null = null;
  let navKeys: string[] = [];
  try {
    email = await loadStaffAuthEmail(context, id);
  } catch {
    email = null;
  }
  navKeys = await loadStaffNavGrants(id);

  return (
    <div className="ops-um-page ops-um2-page">
      <nav className="ops-um-breadcrumb" aria-label="Breadcrumb">
        <span>Admin Panel</span>
        <span className="ops-um-breadcrumb-sep" aria-hidden="true">
          ›
        </span>
        <Link href="/ops/admin/users">User Management</Link>
        <span className="ops-um-breadcrumb-sep" aria-hidden="true">
          ›
        </span>
        <span aria-current="page">Edit Permissions</span>
      </nav>
      <OperationsUserPermissionsEditor
        actorUserId={context.user.id}
        detail={detail}
        email={email}
        initialNavKeys={navKeys}
        navCustomized={navKeys.length > 0}
      />
    </div>
  );
}
