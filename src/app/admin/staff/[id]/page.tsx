import Link from "next/link";
import { notFound } from "next/navigation";
import { OperationsStaffAccessDetail } from "@/components/operations-staff-access-detail";
import { validUuid } from "@/lib/http";
import { loadStaffTargetSummary } from "@/lib/operations-staff-targets-server";
import {
  loadStaffAccessHistory,
  loadStaffAuthEmail,
  requireStaffAccessDetail
} from "@/lib/operations-staff-access-server";
import { can, requireStaffPermission } from "@/lib/staff-auth";
import { canStartMentorPreview, redirectMentorPreviewAwayFromPrivilegedPages } from "@/lib/staff-preview-server";

export default async function StaffAccessPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const context = await requireStaffPermission("staff.read");
  await redirectMentorPreviewAwayFromPrivilegedPages();
  const { id } = await params;
  const { from } = await searchParams;
  const fromUserManagement = from === "um";
  if (!validUuid(id)) notFound();
  const detail = await requireStaffAccessDetail(id);
  const [email, history, targetSummary] = await Promise.all([
    loadStaffAuthEmail(context, id),
    loadStaffAccessHistory(context, id),
    loadStaffTargetSummary(context, id)
  ]);

  return (
    <div className="ops-manage1-page" data-ops-manage-pass="manage1">
      <header className="ops-manage1-page-header">
        <div className="ops-manage1-page-heading">
          <div>
            <p className="ops-manage1-eyebrow">Staff</p>
            <h1>{detail.display_name}</h1>
            <p>Effective access comes from the active role assignment. This is not an HR profile.</p>
          </div>
          <Link
            className="ops-manage1-back"
            href={fromUserManagement ? "/ops/admin/users" : "/ops/team"}
          >
            {fromUserManagement ? "← Back to User Management" : "← Back to People & Access"}
          </Link>
        </div>
      </header>

      <OperationsStaffAccessDetail
        canManage={can(context, "roles.manage")}
        canPreviewMentor={
          canStartMentorPreview(context) &&
          (detail.role_key === "mentor" || detail.role_key === "admin" || detail.role_key === "super_admin") &&
          detail.status === "active" &&
          !detail.invite_pending
        }
        detail={detail}
        email={email}
        history={history}
        responsibility={[
          { label: "Assigned students", value: targetSummary.assignedStudents, tone: "purple" },
          { label: "Open targets", value: targetSummary.openTargets, tone: "blue" },
          { label: "Due soon", value: targetSummary.dueSoon, tone: "orange" },
          { label: "Overdue", value: targetSummary.overdue, tone: "red" },
          { label: "Completed recently", value: targetSummary.completedRecently, tone: "green" }
        ]}
      />
    </div>
  );
}
