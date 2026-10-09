"use client";

import { useId } from "react";
import {
  CRM_STAGES,
  CRM_STAGE_LABELS,
  CRM_STREAMS,
  crmTargetYearOptions,
  type StudentCrmTag
} from "@/lib/operations-student-crm";
import {
  REGISTRY_STUDY_LEVELS,
  omitRegistryFilter,
  registryHref,
  type NormalizedRegistryQuery,
  type RegistryMentorOption
} from "@/lib/operations-student-registry";

type FilterBarProps = {
  query: NormalizedRegistryQuery;
  mentors: RegistryMentorOption[];
  tags: StudentCrmTag[];
  joinYears: number[];
  allowOrgFilters: boolean;
};

function FilterFields({
  query,
  mentors,
  tags,
  joinYears,
  allowOrgFilters,
  idPrefix
}: FilterBarProps & { idPrefix: string }) {
  return (
    <>
      {allowOrgFilters ? (
        <label className="ops-registry-field" htmlFor={`${idPrefix}-mentor`}>
          <span>Mentor</span>
          <select className="ops-stu-control" id={`${idPrefix}-mentor`} name="mentor" defaultValue={query.mentor ?? ""}>
            <option value="">All mentors</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
            {mentors.map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.displayName}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="ops-registry-field" htmlFor={`${idPrefix}-study-level`}>
        <span>Study level</span>
        <select
          className="ops-stu-control"
          id={`${idPrefix}-study-level`}
          name="study_level"
          defaultValue={query.studyLevel ?? ""}
        >
          <option value="">All study levels</option>
          {REGISTRY_STUDY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      <label className="ops-registry-field" htmlFor={`${idPrefix}-stream`}>
        <span>Stream</span>
        <select className="ops-stu-control" id={`${idPrefix}-stream`} name="stream" defaultValue={query.stream ?? ""}>
          <option value="">All streams</option>
          {CRM_STREAMS.map((stream) => (
            <option key={stream} value={stream}>
              {stream}
            </option>
          ))}
        </select>
      </label>
      <label className="ops-registry-field" htmlFor={`${idPrefix}-target-year`}>
        <span>Target year</span>
        <select
          className="ops-stu-control"
          id={`${idPrefix}-target-year`}
          name="target_year"
          defaultValue={query.targetYear ? String(query.targetYear) : ""}
        >
          <option value="">All target years</option>
          {crmTargetYearOptions().map((year) => (
            <option key={year} value={String(year)}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <label className="ops-registry-field" htmlFor={`${idPrefix}-stage`}>
        <span>CRM stage</span>
        <select className="ops-stu-control" id={`${idPrefix}-stage`} name="stage" defaultValue={query.stage ?? ""}>
          <option value="">All stages</option>
          {CRM_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {CRM_STAGE_LABELS[stage]}
            </option>
          ))}
        </select>
      </label>
      <label className="ops-registry-field" htmlFor={`${idPrefix}-tag`}>
        <span>Tag</span>
        <select className="ops-stu-control" id={`${idPrefix}-tag`} name="tag" defaultValue={query.tag ?? ""}>
          <option value="">All manual tags</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </label>
      <label className="ops-registry-field" htmlFor={`${idPrefix}-completion`}>
        <span>Completion</span>
        <select
          className="ops-stu-control"
          id={`${idPrefix}-completion`}
          name="completion"
          defaultValue={query.completion ?? ""}
        >
          <option value="">All completion states</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </label>
      {allowOrgFilters ? (
        <label className="ops-registry-field" htmlFor={`${idPrefix}-joined`}>
          <span>Joined</span>
          <select className="ops-stu-control" id={`${idPrefix}-joined`} name="joined" defaultValue={query.joined ?? ""}>
            <option value="">All join dates</option>
            <option value="this_month">This month</option>
            {joinYears.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="ops-registry-field" htmlFor={`${idPrefix}-sort`}>
        <span>Sort</span>
        <select className="ops-stu-control" id={`${idPrefix}-sort`} name="sort" defaultValue={query.sort ?? ""}>
          <option value="">{allowOrgFilters ? "Joined (newest)" : "Default order"}</option>
          {allowOrgFilters ? <option value="joined_asc">Joined (oldest)</option> : null}
          <option value="name_asc">Name A–Z</option>
          <option value="name_desc">Name Z–A</option>
          <option value="pgs_asc">PGS ID A–Z</option>
          <option value="pgs_desc">PGS ID Z–A</option>
        </select>
      </label>
    </>
  );
}

function SearchField({ query, id }: { query: NormalizedRegistryQuery; id: string }) {
  return (
    <label className="ops-registry-field" htmlFor={id}>
      <span>Search by name or PGS ID</span>
      <input
        className="ops-stu-control"
        defaultValue={query.q ?? ""}
        id={id}
        name="q"
        placeholder="Name or PGS261111"
        type="search"
        autoComplete="off"
      />
    </label>
  );
}

function PlanField({ query, id }: { query: NormalizedRegistryQuery; id: string }) {
  return (
    <label className="ops-registry-field" htmlFor={id}>
      <span>Plan</span>
      <select className="ops-stu-control" defaultValue={query.plan ?? ""} id={id} name="plan">
        <option value="">All plans</option>
        <option value="premium">Premium</option>
        <option value="standard">Standard</option>
      </select>
    </label>
  );
}

export function OperationsRegistryFilterBar(props: FilterBarProps) {
  const { query } = props;
  const desktopId = useId();
  const mobileId = useId();

  return (
    <>
      <form className="ops-stu-filters" method="get" role="search">
        <SearchField id={`${desktopId}-q`} query={query} />
        <PlanField id={`${desktopId}-plan`} query={query} />
        <FilterFields {...props} idPrefix={desktopId} />
        <div className="ops-registry-filter-actions">
          <a className="ops-stu-btn ops-stu-btn--ghost" href="/ops/students">
            Reset
          </a>
          <button type="submit" className="ops-stu-btn ops-stu-btn--primary">
            Apply filters
          </button>
        </div>
      </form>

      <div className="ops-registry-filters-mobile">
        <form className="ops-stu-filters ops-stu-filters--mobile" method="get" role="search">
          <SearchField id={`${mobileId}-q`} query={query} />
          <PlanField id={`${mobileId}-plan`} query={query} />
          <FilterFields {...props} idPrefix={mobileId} />
          <div className="ops-registry-filter-actions">
            <a className="ops-stu-btn ops-stu-btn--ghost" href="/ops/students">
              Reset
            </a>
            <button type="submit" className="ops-stu-btn ops-stu-btn--primary">
              Apply filters
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export function OperationsRegistryActiveFilters({
  query,
  mentors,
  tags
}: {
  query: NormalizedRegistryQuery;
  mentors: RegistryMentorOption[];
  tags: StudentCrmTag[];
}) {
  const chips: Array<{
    key: "q" | "plan" | "mentor" | "studyLevel" | "stream" | "targetYear" | "stage" | "tag" | "completion" | "joined" | "sort";
    label: string;
    remove: string;
  }> = [];
  if (query.q) chips.push({ key: "q", label: `Search: ${query.q}`, remove: `Remove search filter ${query.q}` });
  if (query.plan) {
    chips.push({
      key: "plan",
      label: query.plan === "premium" ? "Premium" : "Standard",
      remove: `Remove ${query.plan === "premium" ? "Premium" : "Standard"} filter`
    });
  }
  if (query.mentor) {
    const mentorName =
      query.mentor === "assigned"
        ? "Assigned"
        : query.mentor === "unassigned"
          ? "Unassigned"
          : mentors.find((mentor) => mentor.id === query.mentor)?.displayName || "Mentor";
    chips.push({ key: "mentor", label: `Mentor: ${mentorName}`, remove: `Remove Mentor filter ${mentorName}` });
  }
  if (query.studyLevel) {
    chips.push({
      key: "studyLevel",
      label: `Study level: ${query.studyLevel}`,
      remove: `Remove Study level filter ${query.studyLevel}`
    });
  }
  if (query.stream) {
    chips.push({ key: "stream", label: `Stream: ${query.stream}`, remove: `Remove Stream filter ${query.stream}` });
  }
  if (query.targetYear) {
    chips.push({
      key: "targetYear",
      label: `Target year: ${query.targetYear}`,
      remove: `Remove Target year filter ${query.targetYear}`
    });
  }
  if (query.stage) {
    chips.push({
      key: "stage",
      label: `Stage: ${CRM_STAGE_LABELS[query.stage]}`,
      remove: `Remove Stage filter ${CRM_STAGE_LABELS[query.stage]}`
    });
  }
  if (query.tag) {
    const tagName = tags.find((tag) => tag.id === query.tag)?.name || "Tag";
    chips.push({ key: "tag", label: `Tag: ${tagName}`, remove: `Remove Tag filter ${tagName}` });
  }
  if (query.completion) {
    chips.push({
      key: "completion",
      label: query.completion === "complete" ? "Complete" : "Incomplete",
      remove: `Remove ${query.completion === "complete" ? "Complete" : "Incomplete"} filter`
    });
  }
  if (query.joined) {
    chips.push({
      key: "joined",
      label: query.joined === "this_month" ? "Joined this month" : `Joined ${query.joined}`,
      remove: "Remove Joined filter"
    });
  }
  if (query.sort) chips.push({ key: "sort", label: sortChipLabel(query.sort), remove: `Remove ${sortChipLabel(query.sort)} sort` });
  if (!chips.length) return null;

  return (
    <ul className="ops-registry-chips" aria-label="Active filters">
      {chips.map((chip) => (
        <li key={chip.key}>
          <a
            aria-label={chip.remove}
            className="ops-registry-chip"
            href={registryHref(omitRegistryFilter(query, chip.key))}
          >
            <span aria-hidden="true">
              {chip.label} ×
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function sortChipLabel(sort: NonNullable<NormalizedRegistryQuery["sort"]>): string {
  if (sort === "joined_desc") return "Joined newest";
  if (sort === "joined_asc") return "Joined oldest";
  if (sort === "name_asc") return "Name A–Z";
  if (sort === "name_desc") return "Name Z–A";
  if (sort === "pgs_asc") return "PGS ID A–Z";
  return "PGS ID Z–A";
}
