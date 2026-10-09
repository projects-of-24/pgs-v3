import { OperationsStaffTargetsShell } from "@/components/operations-staff-targets-shell";
import { validUuid } from "@/lib/http";
import {
  loadStaffTargetOptions,
  loadStaffTargetSummary,
  loadStaffTargets
} from "@/lib/operations-staff-targets-server";
import { normalizeStaffTargetFilter, resolveStaffTargetsScope } from "@/lib/operations-staff-targets";
import { can, requireStaffPermission } from "@/lib/staff-auth";

export default async function StaffTargetsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const context = await requireStaffPermission("overview.read");
  const query = await searchParams;
  const scope = resolveStaffTargetsScope(context);
  const status = normalizeStaffTargetFilter(Array.isArray(query.status) ? query.status[0] : query.status);
  const requestedAssignee = Array.isArray(query.assignee) ? query.assignee[0] : query.assignee;
  const requestedTarget = Array.isArray(query.target) ? query.target[0] : query.target;
  const assigneeId = scope === "organization" && validUuid(requestedAssignee) ? requestedAssignee : null;
  const targetId = validUuid(requestedTarget) ? requestedTarget : null;
  const [summary, targets, options] = await Promise.all([
    loadStaffTargetSummary(context, assigneeId),
    loadStaffTargets(context, { assigneeId, status, targetId, limit: 100 }),
    loadStaffTargetOptions(context)
  ]);
  const canManageAll = scope === "organization" && can(context, "staff_targets.manage_all");
  const canUpdateStatus =
    scope !== "restricted" && (can(context, "staff_targets.manage") || canManageAll);

  if (scope === "restricted") {
    return (
      <div className="ops-target1-page" data-ops-target-pass="target1">
        <header className="ops-target1-page-header">
          <div className="ops-target1-page-heading">
            <div>
              <p className="ops-target1-eyebrow">Operations work</p>
              <h1>Staff Targets</h1>
              <p>Your current role does not include staff-target responsibility.</p>
            </div>
          </div>
        </header>
        <section className="ops-target1-card" aria-labelledby="targets-restricted-heading">
          <h2 id="targets-restricted-heading">Restricted view</h2>
          <p>No target rows are available under your current read-only authority.</p>
        </section>
      </div>
    );
  }

  return (
    <OperationsStaffTargetsShell
      assigneeId={assigneeId}
      assignees={options.assignees}
      canManageAll={canManageAll}
      canUpdateStatus={canUpdateStatus}
      scope={scope}
      status={status}
      students={options.students}
      summary={summary}
      targetId={targetId}
      targets={targets}
    />
  );
}
