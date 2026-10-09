import { AdminProfileForm } from "@/components/admin-profile-form";
import { operationsRoleLabel } from "@/lib/operations-presentation";
import { resolveStaffChromeAvatarUrl } from "@/lib/operations-staff-avatar";
import { requireStaffPermission } from "@/lib/staff-auth";
import "@/app/admin/operations.css";
import styles from "./workspace-profile.module.css";

export const dynamic = "force-dynamic";

/**
 * WS-CHROME-FIX — Workspace staff profile (same form as Studio/Ops profile).
 * Stays inside Workspace shell · logout → /workspace/login.
 */
export default async function WorkspaceProfilePage() {
  const context = await requireStaffPermission("overview.read");
  const avatarUrl = await resolveStaffChromeAvatarUrl({
    email: context.user.email,
    avatarPath: context.avatarPath
  });

  return (
    <div className={`operations-root ${styles.page}`} data-operations-product="true" data-ws-profile="true">
      <div className={`ops-page ops-profile-page ${styles.inner}`}>
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
    </div>
  );
}
