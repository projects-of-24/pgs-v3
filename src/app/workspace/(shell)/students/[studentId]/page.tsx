import Link from "next/link";
import { notFound } from "next/navigation";
import { OpsViewAsStudentButton } from "@/components/ops-view-as-student-button";
import {
  StaffWorkspaceAlertsPanel,
  StaffWorkspaceCommentsPanel,
  StaffWorkspaceDocumentsPanel,
  StaffWorkspaceNotesPanel,
  StaffWorkspaceReviewsPanel
} from "@/components/staff-workspace-panels";
import { operationsRoleLabel } from "@/lib/operations-presentation";
import { StudentCrmIdentityPanel } from "@/components/student-crm-identity-panel";
import { StudentDetailTabs } from "@/components/student-detail-tabs";
import { StudentGuardiansPanel } from "@/components/student-guardians-panel";
import { WorkspaceDeskDashboardData } from "@/components/workspace-desk-dashboard-data";
import { WorkspaceDeskGuardiansCrm } from "@/components/workspace-desk-guardians-crm";
import { WorkspaceDeskTopPicks } from "@/components/workspace-desk-top-picks";
import { staffListStudentGuardians } from "@/lib/guardian-portal-server";
import { loadStaffStudentCrmProfile, loadStudentCrmTags } from "@/lib/operations-student-crm-server";
import { registryShowsOpenColumn } from "@/lib/operations-student-registry-server";
import { loadPremiumWorkspace, WorkspaceAccessError } from "@/lib/premium-workspace";
import { can, requireStaffPermission } from "@/lib/staff-auth";
import { staffPreviewConfigured } from "@/lib/staff-preview";
import { canPreviewStudentTarget, canStartStaffPreview } from "@/lib/staff-preview-server";
import { canViewStudent, requireStudentViewer } from "@/lib/student-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import "@/app/admin/operations.css";

export const dynamic = "force-dynamic";

/**
 * WS-DESK-WS + WS-FILL-1 — Workspace Student Desk.
 * Dashboard Data = mock top-down fill UI; other tabs reuse shared workspace panels.
 */
export default async function WorkspaceStudentDeskPage({
  params
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  const context = await requireStaffPermission("overview.read");
  if (!registryShowsOpenColumn(context)) notFound();

  const [crm, availableTags, previewScope] = await Promise.all([
    loadStaffStudentCrmProfile(studentId),
    loadStudentCrmTags(),
    canStartStaffPreview(context) ? canPreviewStudentTarget(context, studentId) : Promise.resolve("out_of_scope" as const)
  ]);
  if (!crm) notFound();

  const canPreviewStudent = canStartStaffPreview(context) && previewScope === "ok";
  const previewConfigured = staffPreviewConfigured();

  let actor = null;
  let workspace = null;
  if (crm.canOpenWorkspace) {
    try {
      actor = await requireStudentViewer(studentId, { route: "/workspace/students/[studentId]" });
      workspace = await loadPremiumWorkspace(studentId);
    } catch (error) {
      if (!(error instanceof WorkspaceAccessError)) throw error;
    }
  }

  const canManage = Boolean(workspace && actor && actor.kind !== "student" && (await canViewStudent(studentId, "manage")).allowed);
  const supabase = await createSupabaseServerClient();
  const [{ data: staffAlerts }, { data: staffNotes }] = workspace
    ? await Promise.all([
        supabase
          .from("student_alerts")
          .select("id,alert_text,severity,active,sort_order,created_at,updated_at")
          .eq("student_id", studentId)
          .order("sort_order"),
        supabase
          .from("counselor_notes")
          .select("id,body,visibility,created_at,author_id")
          .eq("student_id", studentId)
          .order("created_at", { ascending: false })
      ])
    : [{ data: [] }, { data: [] }];

  const authorIds = [
    ...new Set([
      ...(workspace?.comments.map((comment) => comment.author_id) ?? []),
      ...(staffNotes ?? []).map((note) => note.author_id)
    ])
  ].filter(Boolean);

  const [{ data: staffNames }, { data: profileNames }] = authorIds.length
    ? await Promise.all([
        supabase.from("staff_profiles").select("user_id,display_name").in("user_id", authorIds),
        supabase.from("profiles").select("id,full_name").in("id", authorIds)
      ])
    : [{ data: [] }, { data: [] }];

  const authorLabels: Record<string, string> = {};
  for (const row of profileNames ?? []) {
    if (row.full_name) authorLabels[row.id] = row.full_name;
  }
  for (const row of staffNames ?? []) {
    if (row.display_name) authorLabels[row.user_id] = row.display_name;
  }
  if (workspace?.profile?.full_name) authorLabels[studentId] = workspace.profile.full_name;

  const canManageGuardians = can(context, "student_workspace.manage_all");
  const guardiansResult = await staffListStudentGuardians(studentId);
  const guardians = "rows" in guardiansResult ? guardiansResult.rows : [];

  const { data: universityOptions } = workspace
    ? await supabase
        .from("universities")
        .select("id,name")
        .eq("published", true)
        .order("name")
        .limit(300)
    : { data: [] as Array<{ id: number; name: string }> };

  const metaBits = [
    crm.pgsCode ? `PGS ${crm.pgsCode}` : null,
    `Mentor: ${crm.mentorName}`,
    crm.stream ? `Stream: ${crm.stream}` : null,
    crm.targetYear ? `Year: ${crm.targetYear}` : null,
    `Stage: ${crm.stage}`
  ].filter(Boolean);

  return (
    <div className="operations-root" data-operations-product="true" data-ws-desk="true">
      <div className="ops-stu2-page ops-ws-desk-page" data-ops-stu-pass="ws-desk-ws">
        <header className="ops-stu2-page-header ops-ws-desk-header">
          <nav className="ops-stu2-breadcrumb" aria-label="Breadcrumb">
            <Link href="/workspace/students">Students</Link>
            <span className="ops-stu2-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">{crm.fullName}</span>
          </nav>
          <Link className="ops-stu2-back" href="/workspace/students">
            ← Back to Students
          </Link>
          <div className="ops-stu2-page-header-row ops-ws-desk-title-row">
            <div className="ops-ws-desk-title-block">
              <h1>{crm.fullName}</h1>
              <span
                className={
                  crm.plan === "Premium"
                    ? "ops-ws-desk-plan ops-ws-desk-plan--premium"
                    : "ops-ws-desk-plan ops-ws-desk-plan--standard"
                }
              >
                {crm.plan}
              </span>
            </div>
            {canPreviewStudent ? (
              <OpsViewAsStudentButton studentId={studentId} previewConfigured={previewConfigured} />
            ) : null}
          </div>
          <p className="ops-ws-desk-meta">{metaBits.join(" · ")}</p>
          <p className="ops-ws-desk-scope">
            {workspace
              ? `Authorized as ${actor?.kind.replaceAll("_", " ")}. Desk tabs use the student's shared workspace truth.`
              : "CRM + guardians available. Premium workspace tabs open when entitlement and permission allow."}
          </p>
        </header>

        <StudentDetailTabs
          dashboard={
            <WorkspaceDeskDashboardData
              studentId={studentId}
              crm={crm}
              canManage={canManage}
              premiumProfile={workspace?.premiumProfile ?? null}
              hasPremiumWorkspace={Boolean(workspace)}
              universityOptions={universityOptions ?? []}
              universitySelections={workspace?.universities ?? []}
              topPicks={
                workspace ? (
                  <WorkspaceDeskTopPicks studentId={studentId} canManage={canManage} />
                ) : (
                  <p className="ops-ws-desk-empty" role="status">
                    Top picks open when this student has Premium workspace access.
                  </p>
                )
              }
            />
          }
          comments={
            workspace ? (
              <StaffWorkspaceCommentsPanel
                studentId={studentId}
                canManage={canManage}
                studentIdForComments={studentId}
                comments={workspace.comments}
                authorLabels={authorLabels}
                actorLabel={context.displayName}
                actorRoleLabel={operationsRoleLabel(context.roles)}
              />
            ) : (
              <p className="ops-ws-desk-empty" role="status">
                Comments open when this student has Premium workspace access.
              </p>
            )
          }
          alerts={
            workspace ? (
              <StaffWorkspaceAlertsPanel
                studentId={studentId}
                canManage={canManage}
                alerts={staffAlerts ?? []}
              />
            ) : (
              <p className="ops-ws-desk-empty" role="status">
                Alerts open when this student has Premium workspace access.
              </p>
            )
          }
          review={
            workspace ? (
              <StaffWorkspaceReviewsPanel
                studentId={studentId}
                canManage={canManage}
                reviews={workspace.reviews}
              />
            ) : (
              <p className="ops-ws-desk-empty" role="status">
                Reviews open when this student has Premium workspace access.
              </p>
            )
          }
          notes={
            workspace ? (
              <StaffWorkspaceNotesPanel
                studentId={studentId}
                canManage={canManage}
                notes={staffNotes ?? []}
                authorLabels={authorLabels}
              />
            ) : (
              <p className="ops-ws-desk-empty" role="status">
                Notes open when this student has Premium workspace access.
              </p>
            )
          }
          documents={
            workspace ? (
              <StaffWorkspaceDocumentsPanel
                studentId={studentId}
                canManage={canManage}
                requirements={workspace.requirements}
              />
            ) : (
              <p className="ops-ws-desk-empty" role="status">
                Documents open when this student has Premium workspace access.
              </p>
            )
          }
          guardians={
            <WorkspaceDeskGuardiansCrm
              crm={
                <StudentCrmIdentityPanel
                  availableTags={availableTags}
                  canCreateTags={can(context, "student_workspace.manage_all")}
                  profile={crm}
                />
              }
              guardian={
                <StudentGuardiansPanel
                  studentId={studentId}
                  initialGuardians={guardians}
                  canManage={canManageGuardians}
                />
              }
            />
          }
        />
      </div>
    </div>
  );
}
