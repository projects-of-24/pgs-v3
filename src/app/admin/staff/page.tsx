import Link from "next/link";
import { Plus } from "lucide-react";
import { OperationsStaffDirectory } from "@/components/operations-staff-directory";
import { loadStaffPeopleDirectory } from "@/lib/operations-staff-access-server";
import { can, requireStaffPermission } from "@/lib/staff-auth";
import { redirectMentorPreviewAwayFromPrivilegedPages } from "@/lib/staff-preview-server";

export default async function StaffPage() {
  await redirectMentorPreviewAwayFromPrivilegedPages();
  const context = await requireStaffPermission("staff.read");
  const rows = await loadStaffPeopleDirectory();
  const canManage = can(context, "roles.manage");

  return (
    <div className="ops-team1-page" data-ops-team-pass="team1">
      <header className="ops-team1-page-header">
        <div className="ops-team1-page-heading">
          <div>
            <p className="ops-team1-eyebrow">Team</p>
            <h1>People &amp; Access</h1>
            <p>
              {canManage
                ? "Invite staff, inspect effective access, and change roles. Assignment actions live in Student Registry."
                : "Inspect staff identities, assigned-student workload, and effective access. Role changes require Super Admin."}
            </p>
          </div>
          <div className="ops-team1-actions">
            {canManage ? (
              <Link className="ops-team1-btn ops-team1-btn--primary" href="/ops/team/invite">
                <Plus aria-hidden="true" />
                Invite staff
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <OperationsStaffDirectory canManage={canManage} rows={rows} />
    </div>
  );
}
