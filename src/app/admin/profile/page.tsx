import { AdminProfileForm } from "@/components/admin-profile-form";
import { resolveStaffChromeAvatarUrl } from "@/lib/operations-staff-avatar";
import { operationsRoleLabel } from "@/lib/operations-presentation";
import { requireStaffPermission } from "@/lib/staff-auth";

export default async function AdminProfilePage() {
  const context = await requireStaffPermission("overview.read");
  const avatarUrl = await resolveStaffChromeAvatarUrl({
    email: context.user.email,
    avatarPath: context.avatarPath
  });
  return (
    <div className="ops-page ops-profile-page">
      <header className="ops-profile-page-header">
        <nav className="ops-profile-breadcrumb" aria-label="Breadcrumb">
          <span>Account</span>
          <span className="ops-profile-breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">Profile</span>
        </nav>
        <h1>Staff Profile</h1>
        <p>
          View and edit your personal information. Your role and status are managed by the Super
          Admin.
        </p>
      </header>
      <AdminProfileForm
        displayName={context.displayName}
        email={context.user.email ?? ""}
        avatarUrl={avatarUrl}
        roleLabel={operationsRoleLabel(context.roles)}
        status={context.status}
      />
    </div>
  );
}
