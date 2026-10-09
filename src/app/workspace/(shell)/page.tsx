import { WorkspaceDashboard } from "@/components/workspace-dashboard";
import { loadOperationsScoreboard } from "@/lib/operations-scoreboard";
import { requireStaffPermission } from "@/lib/staff-auth";
import { getStaffPreviewContext } from "@/lib/staff-preview-server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard · PGS Workspace",
  description: "Mentor-Student Workspace home."
};

/**
 * WS-DASH-3 — OG Dashboard body sorted to owner ChatGPT reference.
 */
export default async function WorkspaceHomePage() {
  const context = await requireStaffPermission("overview.read");
  const preview = await getStaffPreviewContext(context);
  const scoreboard = await loadOperationsScoreboard(
    context,
    preview?.mode === "mentor" && preview ? { mentorPreviewTargetId: preview.targetId } : {}
  );

  const byKey = new Map(scoreboard.metrics.map((metric) => [metric.key, metric]));
  const myStudents = byKey.get("my_students") ?? byKey.get("assigned") ?? byKey.get("total");
  const premium = byKey.get("my_premium") ?? byKey.get("premium");

  return (
    <WorkspaceDashboard
      displayName={context.displayName}
      dateRangeLabel={currentMonthRangeLabel()}
      counts={{
        myStudents: myStudents?.value ?? null,
        premium: premium?.value ?? null
      }}
    />
  );
}

/** Display-only month chrome (India time). Does not filter data this gate. */
function currentMonthRangeLabel(): string {
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
  const [year, month] = ymd.split("-").map(Number);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "2-digit",
    year: "numeric"
  });
  const start = fmt.format(new Date(`${year}-${String(month).padStart(2, "0")}-01T06:00:00+05:30`));
  const lastDay = new Date(year, month, 0).getDate();
  const end = fmt.format(
    new Date(`${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}T06:00:00+05:30`)
  );
  return `${start} – ${end}`;
}
