import { WorkspaceStudentRegistry } from "@/components/workspace-student-registry";
import {
  canQueryStudentRegistry,
  isMentorScopedRegistry,
  loadStaffStudentRegistry,
  registryQueryCapabilities,
  resolveRegistryQueryFromRequest
} from "@/lib/operations-student-registry-server";
import { loadOperationsScoreboard } from "@/lib/operations-scoreboard";
import { requireStaffPermission } from "@/lib/staff-auth";
import { getStaffPreviewContext } from "@/lib/staff-preview-server";

export const metadata = {
  title: "Student Registry · PGS Workspace",
  description: "Find students and open their mentor desk."
};

/**
 * WS-REG — Workspace Student Registry.
 * Same authorized registry RPC as Ops STU1; Workspace chrome + Open Desk.
 */
export default async function WorkspaceStudentsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const context = await requireStaffPermission("overview.read");
  const preview = await getStaffPreviewContext(context);
  const raw = await searchParams;
  const mentorPreview = preview?.mode === "mentor";
  const mentorScoped = isMentorScopedRegistry(context) || mentorPreview;
  const capabilities = mentorPreview ? { allowOrgFilters: false } : registryQueryCapabilities(context);

  const scoreboard = await loadOperationsScoreboard(
    context,
    mentorPreview && preview ? { mentorPreviewTargetId: preview.targetId } : {}
  );

  let query = resolveRegistryQueryFromRequest(raw, capabilities, []);
  if (mentorPreview && preview) {
    query = { ...query, mentor: preview.targetId, joined: null };
  }

  const result = canQueryStudentRegistry(context)
    ? await loadStaffStudentRegistry(context, query)
    : { rows: [], totalCount: 0, page: query.page, pageSize: 10, error: true };

  const byKey = new Map(scoreboard.metrics.map((metric) => [metric.key, metric]));
  const all = byKey.get("total") ?? byKey.get("my_students");
  const mine = byKey.get("my_students") ?? byKey.get("assigned") ?? all;
  const premium = byKey.get("premium") ?? byKey.get("my_premium");
  const standard = byKey.get("standard") ?? byKey.get("my_standard");

  return (
    <WorkspaceStudentRegistry
      query={query}
      result={result}
      mentorScoped={mentorScoped}
      counts={{
        all: all?.value ?? null,
        mine: mine?.value ?? null,
        premium: premium?.value ?? null,
        standard: standard?.value ?? null
      }}
    />
  );
}
