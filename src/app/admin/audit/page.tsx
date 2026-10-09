import { OperationsActivityList } from "@/components/operations-activity-list";
import { loadOperationsActivity } from "@/lib/operations-activity-server";
import {
  normalizeOperationsActivityDomain
} from "@/lib/operations-activity";
import { requireStaffPermission } from "@/lib/staff-auth";
import { redirectMentorPreviewAwayFromPrivilegedPages } from "@/lib/staff-preview-server";

export default async function AuditPage({
  searchParams
}: {
  searchParams: Promise<{ domain?: string | string[] }>;
}) {
  await redirectMentorPreviewAwayFromPrivilegedPages();
  await requireStaffPermission("audit.read");
  const filters = await searchParams;
  const domain = normalizeOperationsActivityDomain(
    Array.isArray(filters.domain) ? filters.domain[0] : filters.domain
  );
  const events = await loadOperationsActivity(domain);

  return (
    <div className="ops-activity-page">
      <header className="ops-activity-page-header" style={{ marginBottom: 20 }}>
        <nav className="ops-activity-breadcrumb" aria-label="Breadcrumb">
          <span>Operations</span>
          <span className="ops-activity-breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">Activity</span>
        </nav>
        <h1>Activity</h1>
        <p>View a readable, immutable audit history of all authorized actions in the system.</p>
      </header>

      <OperationsActivityList key={domain ?? "all"} items={events} initialDomain={domain} />
    </div>
  );
}
