import { OpsChangePasswordForm } from "@/components/ops-change-password-form";
import { requireStaffPermission } from "@/lib/staff-auth";

export default async function StudioChangePasswordPage() {
  await requireStaffPermission("overview.read");
  return (
    <div className="ops-page ops-profile-page ops-change-password-page">
      <header className="ops-profile-page-header">
        <nav className="ops-profile-breadcrumb" aria-label="Breadcrumb">
          <span>Account</span>
          <span className="ops-profile-breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">Change Password</span>
        </nav>
        <h1>Change Password</h1>
        <p>Update your password to keep your account secure.</p>
      </header>
      <OpsChangePasswordForm />
    </div>
  );
}
