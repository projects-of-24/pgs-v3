import Link from "next/link";
import { OpsViewAsStudentButton } from "@/components/ops-view-as-student-button";
import { StaffKanbanBoard } from "@/components/staff-kanban-board";
import { StaffWorkspaceControls } from "@/components/staff-workspace-controls";
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
import { WorkspaceDeskGuardiansCrm } from "@/components/workspace-desk-guardians-crm";
import { loadStaffStudentCrmProfile, loadStudentCrmTags } from "@/lib/operations-student-crm-server";
import { registryShowsOpenColumn } from "@/lib/operations-student-registry-server";
import { loadPremiumWorkspace, WorkspaceAccessError } from "@/lib/premium-workspace";
import { can, requireStaffPermission } from "@/lib/staff-auth";
import { canPreviewStudentTarget, canStartStaffPreview } from "@/lib/staff-preview-server";
import { staffPreviewConfigured } from "@/lib/staff-preview";
import { canViewStudent, requireStudentViewer } from "@/lib/student-access";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { staffListStudentGuardians } from "@/lib/guardian-portal-server";
import { notFound } from "next/navigation";

export default async function AdminStudentWorkspace({ params }: { params: Promise<{ studentId: string }> }) {
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
      actor = await requireStudentViewer(studentId, { route: "/admin/students/[studentId]" });
      workspace = await loadPremiumWorkspace(studentId);
    } catch (error) {
      if (!(error instanceof WorkspaceAccessError)) throw error;
    }
  }

  const canManage = Boolean(workspace && actor && actor.kind !== "student" && (await canViewStudent(studentId, "manage")).allowed);
  const supabase = await createSupabaseServerClient();
  const [{ data: universities }, { data: staffAlerts }, { data: staffNotes }] = workspace
    ? await Promise.all([
        supabase.from("universities").select("id,name").order("name").limit(300),
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
    : [{ data: [] }, { data: [] }, { data: [] }];
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

  const metaBits = [
    crm.pgsCode ? `PGS ${crm.pgsCode}` : null,
    `Mentor: ${crm.mentorName}`,
    crm.stream ? `Stream: ${crm.stream}` : null,
    crm.targetYear ? `Year: ${crm.targetYear}` : null,
    `Stage: ${crm.stage}`
  ].filter(Boolean);

  return (
    <div className="ops-stu2-page ops-ws-desk-page" data-ops-stu-pass="ws-desk">
      <header className="ops-stu2-page-header ops-ws-desk-header">
        <nav className="ops-stu2-breadcrumb" aria-label="Breadcrumb">
          <Link href="/ops/students">Students</Link>
          <span className="ops-stu2-breadcrumb-sep" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{crm.fullName}</span>
        </nav>
        <Link className="ops-stu2-back" href="/ops/students">
          ← Back to Students
        </Link>
        <div className="ops-stu2-page-header-row ops-ws-desk-title-row">
          <div className="ops-ws-desk-title-block">
            <h1>{crm.fullName}</h1>
            <span
              className={
                crm.plan === "Premium" ? "ops-ws-desk-plan ops-ws-desk-plan--premium" : "ops-ws-desk-plan ops-ws-desk-plan--standard"
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
          <div className="ops-ws-desk-dashboard">
            {workspace ? (
              <>
                <section className="ops-stu2-metrics" aria-label="Workspace totals">
                  <div>
                    <span>Pathway</span>
                    <strong>{workspace.premiumProfile?.pathway_label || "Not set"}</strong>
                  </div>
                  <div>
                    <span>Documents</span>
                    <strong>{workspace.requirements.length}</strong>
                  </div>
                  <div>
                    <span>Active alerts</span>
                    <strong>{(staffAlerts ?? []).filter((alert) => alert.active).length}</strong>
                  </div>
                  <div>
                    <span>Tasks</span>
                    <strong>{workspace.tasks.length}</strong>
                  </div>
                </section>
                <StaffWorkspaceControls
                  studentId={studentId}
                  canManage={canManage}
                  universityOptions={universities ?? []}
                  selections={workspace.universities}
                  premiumProfile={workspace.premiumProfile}
                />
                <section className="ops-stu2-card" aria-labelledby="ops-stu2-loopboard-heading">
                  <h2 id="ops-stu2-loopboard-heading">Progress / Loopboard</h2>
                  <StaffKanbanBoard
                    studentId={studentId}
                    columns={workspace.columns}
                    tasks={workspace.tasks}
                    canManage={canManage}
                  />
                </section>
              </>
            ) : (
              <p className="ops-ws-desk-empty" role="status">
                Premium dashboard data is not available for this student yet. CRM identity is under Guardians / CRM.
              </p>
            )}
          </div>
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
  );
}
