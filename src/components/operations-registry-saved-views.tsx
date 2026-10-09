import {
  isRegistryPremiumUnassignedView,
  registryHref,
  registryPremiumUnassignedQuery,
  registryQueryHasSearchOrFilters,
  type NormalizedRegistryQuery
} from "@/lib/operations-student-registry";

function countLabel(base: string, count: number | null | undefined): string {
  if (count === null || count === undefined) return base;
  return `${base} (${count})`;
}

/** Built-in registry tabs only — Save / Reset / rename views removed (owner STU1 QC). */
export function OperationsRegistrySavedViews({
  query,
  allowOrgFilters = false,
  counts
}: {
  query: NormalizedRegistryQuery;
  /** Kept for call-site compatibility; custom saved views are not shown. */
  views?: unknown;
  allowOrgFilters?: boolean;
  counts?: {
    all: number | null;
    premium: number | null;
    premiumUnassigned: number | null;
  };
}) {
  const allHref = "/ops/students";
  const premiumHref = registryHref({
    ...query,
    q: null,
    plan: "premium",
    mentor: null,
    studyLevel: null,
    stream: null,
    targetYear: null,
    stage: null,
    tag: null,
    completion: null,
    joined: null,
    sort: null,
    page: 1,
    view: null
  });
  const premiumUnassignedHref = registryHref(registryPremiumUnassignedQuery());
  const premiumOnly =
    query.plan === "premium" &&
    !query.q &&
    !query.mentor &&
    !query.studyLevel &&
    !query.stream &&
    !query.targetYear &&
    !query.stage &&
    !query.tag &&
    !query.completion &&
    !query.joined &&
    !query.sort &&
    !query.view;

  return (
    <div className="ops-registry-views">
      <nav aria-label="Registry views" className="ops-registry-view-tabs">
        <a aria-current={!registryQueryHasSearchOrFilters(query) && !query.view ? "page" : undefined} href={allHref}>
          {countLabel("All Students", counts?.all)}
        </a>
        <a aria-current={premiumOnly ? "page" : undefined} href={premiumHref}>
          {countLabel("Premium", counts?.premium)}
        </a>
        {allowOrgFilters ? (
          <a
            aria-current={isRegistryPremiumUnassignedView(query) && !query.view ? "page" : undefined}
            href={premiumUnassignedHref}
          >
            {countLabel("Premium Unassigned", counts?.premiumUnassigned)}
          </a>
        ) : null}
      </nav>
    </div>
  );
}
