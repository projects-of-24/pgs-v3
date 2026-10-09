import Link from "next/link";
import { OperationsRegistryActiveFilters, OperationsRegistryFilterBar } from "@/components/operations-registry-filters";
import { OperationsRegistrySavedViews } from "@/components/operations-registry-saved-views";
import { OperationsStudentRegistry } from "@/components/operations-student-registry";
import { loadStudentCrmTags } from "@/lib/operations-student-crm-server";
import {
  canQueryStudentRegistry,
  isMentorScopedRegistry,
  loadRegistryMentorOptions,
  loadRegistrySavedViews,
  loadStaffStudentRegistry,
  registryQueryCapabilities,
  registryShowsMentorColumn,
  registryShowsOpenColumn,
  resolveRegistryQueryFromRequest
} from "@/lib/operations-student-registry-server";
import { registryJoinYearOptions } from "@/lib/operations-student-registry";
import { loadOperationsScoreboard, type ScoreboardMetric } from "@/lib/operations-scoreboard";
import { can, requireStaffPermission } from "@/lib/staff-auth";
import {
  canAssignStudents,
  canStartStaffPreview,
  getStaffPreviewContext
} from "@/lib/staff-preview-server";
import { staffPreviewConfigured } from "@/lib/staff-preview";

function kpiShare(part: number | null, total: number | null): string | null {
  if (part === null || total === null || total <= 0) return null;
  return `${Math.round((part / total) * 100)}% of total`;
}

function registryKpis(metrics: ScoreboardMetric[]): Array<{
  key: string;
  label: string;
  value: number | null;
  href: string;
  note: string | null;
}> {
  const byKey = new Map(metrics.map((metric) => [metric.key, metric]));
  const total = byKey.get("total") ?? byKey.get("my_students");
  const premium = byKey.get("premium") ?? byKey.get("my_premium");
  const standard = byKey.get("standard") ?? byKey.get("my_standard");
  const assigned = byKey.get("assigned");
  const unassigned = byKey.get("unassigned");
  const joinedMonth = byKey.get("joined_month");
  const totalValue = total?.value ?? null;

  const cards = [
    {
      key: "total",
      label: "Total students",
      value: totalValue,
      href: total?.href ?? "/ops/students",
      note:
        joinedMonth?.value !== null && joinedMonth?.value !== undefined
          ? `${joinedMonth.value} joined this month`
          : null
    },
    {
      key: "premium",
      label: "Premium students",
      value: premium?.value ?? null,
      href: premium?.href ?? "/ops/students?plan=premium",
      note: kpiShare(premium?.value ?? null, totalValue)
    },
    {
      key: "standard",
      label: "Standard students",
      value: standard?.value ?? null,
      href: standard?.href ?? "/ops/students?plan=standard",
      note: kpiShare(standard?.value ?? null, totalValue)
    }
  ];

  if (assigned || unassigned) {
    cards.push(
      {
        key: "assigned",
        label: "Assigned students",
        value: assigned?.value ?? null,
        href: assigned?.href ?? "/ops/students?mentor=assigned",
        note: kpiShare(assigned?.value ?? null, totalValue)
      },
      {
        key: "unassigned",
        label: "Unassigned students",
        value: unassigned?.value ?? null,
        href: unassigned?.href ?? "/ops/students?mentor=unassigned",
        note: kpiShare(unassigned?.value ?? null, totalValue)
      }
    );
  }

  return cards;
}

export default async function StudentsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const context = await requireStaffPermission("overview.read");
  const preview = await getStaffPreviewContext(context);
  const raw = await searchParams;
  const mentorPreview = preview?.mode === "mentor";
  const mentorScoped = isMentorScopedRegistry(context) || mentorPreview;
  const capabilities = mentorPreview
    ? { allowOrgFilters: false }
    : registryQueryCapabilities(context);
  const allowOrgFilters = capabilities.allowOrgFilters;
  const [savedViews, mentors, tags, scoreboard] = await Promise.all([
    loadRegistrySavedViews(context),
    loadRegistryMentorOptions(context),
    loadStudentCrmTags(),
    loadOperationsScoreboard(
      context,
      mentorPreview && preview ? { mentorPreviewTargetId: preview.targetId } : {}
    )
  ]);
  let query = resolveRegistryQueryFromRequest(raw, capabilities, savedViews);
  if (mentorPreview && preview) {
    query = { ...query, mentor: preview.targetId, joined: null };
  }
  const result = canQueryStudentRegistry(context)
    ? await loadStaffStudentRegistry(context, query)
    : { rows: [], totalCount: 0, page: query.page, pageSize: 10, error: true };

  const kpis = registryKpis(scoreboard.metrics);
  const totalMetric = scoreboard.metrics.find((metric) => metric.key === "total" || metric.key === "my_students");
  const premiumMetric = scoreboard.metrics.find((metric) => metric.key === "premium" || metric.key === "my_premium");
  const premiumUnassignedMetric = scoreboard.metrics.find((metric) => metric.key === "premium_awaiting_mentor");

  return (
    <div className="ops-stu-page" data-ops-stu-pass="stu1">
      <header className="ops-stu-page-header">
        <div className="ops-stu-page-heading">
          <p className="ops-stu-eyebrow">Students</p>
          <h1>{mentorScoped ? "My Students" : "Student Registry"}</h1>
          <p>
            {mentorScoped
              ? "Only students currently assigned to you are shown. Organization-wide metrics and student records remain out of scope."
              : "Search the authorized student registry and open only the workspaces permitted by your current scope."}
          </p>
        </div>
        {can(context, "premium.manage") ? (
          <Link className="ops-stu-premium-controls" href="/admin/access">
            Premium & mentor controls
          </Link>
        ) : null}
      </header>

      {kpis.length ? (
        <section className="ops-stu-kpis" aria-label="Student registry summary">
          {kpis.map((kpi) => (
            <Link key={kpi.key} className="ops-stu-kpi" href={kpi.href}>
              <span className="ops-stu-kpi-label">{kpi.label}</span>
              <strong className="ops-stu-kpi-value">{kpi.value ?? "—"}</strong>
              {kpi.note ? <span className="ops-stu-kpi-note">{kpi.note}</span> : null}
            </Link>
          ))}
        </section>
      ) : null}

      <section className="ops-stu-panel" aria-label="Authorized student registry">
        <OperationsRegistryFilterBar
          allowOrgFilters={allowOrgFilters}
          joinYears={registryJoinYearOptions()}
          mentors={mentors}
          query={query}
          tags={tags}
        />
        <OperationsRegistryActiveFilters mentors={mentors} query={query} tags={tags} />
        <OperationsRegistrySavedViews
          allowOrgFilters={allowOrgFilters}
          counts={{
            all: totalMetric?.value ?? null,
            premium: premiumMetric?.value ?? null,
            premiumUnassigned: premiumUnassignedMetric?.value ?? null
          }}
          query={query}
          views={savedViews}
        />
        <OperationsStudentRegistry
          canManageAssignments={canAssignStudents(context)}
          canPreviewStudent={canStartStaffPreview(context)}
          previewConfigured={staffPreviewConfigured()}
          previewOrgWide={
            context.roles.includes("admin")
            || context.roles.includes("super_admin")
            || can(context, "student_workspace.read_all")
          }
          previewActorId={context.user.id}
          handlers={mentors}
          mentorScoped={mentorScoped}
          query={query}
          result={result}
          showJoined={allowOrgFilters}
          showMentor={registryShowsMentorColumn(context) && !mentorPreview}
          showOpen={registryShowsOpenColumn(context)}
        />
      </section>
    </div>
  );
}
