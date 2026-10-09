import Link from "next/link";
import { OperationsStaffInviteForm } from "@/components/operations-staff-invite-form";
import { requireStaffPermission } from "@/lib/staff-auth";
import { redirectMentorPreviewAwayFromPrivilegedPages } from "@/lib/staff-preview-server";

export default async function InviteStaffPage() {
  await redirectMentorPreviewAwayFromPrivilegedPages();
  await requireStaffPermission("roles.manage");

  return (
    <div className="ops-invite1-page" data-ops-invite-pass="invite1">
      <header className="ops-invite1-page-header">
        <div className="ops-invite1-page-heading">
          <div>
            <p className="ops-invite1-eyebrow">Team</p>
            <h1>Invite staff</h1>
            <p>
              The same Auth identity is reused when the email already exists. Student accounts and PGS IDs
              are not converted or replaced.
            </p>
          </div>
          <Link className="ops-invite1-back" href="/ops/team">
            ← Back to People &amp; Access
          </Link>
        </div>
      </header>

      <section className="ops-invite1-card" aria-label="Invite staff">
        <OperationsStaffInviteForm />
      </section>
    </div>
  );
}
