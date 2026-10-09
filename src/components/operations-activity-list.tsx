"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  XCircle
} from "lucide-react";
import {
  OPERATIONS_ACTIVITY_DOMAINS,
  operationsActivityDomainLabel,
  type OperationsActivityDomain,
  type OperationsActivityItem
} from "@/lib/operations-activity";

const PAGE_SIZE = 10;

type DomainTone = "blue" | "purple" | "orange" | "green" | "red" | "gray" | "teal";

function formatTime(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(value));
}

function actorInitials(label: string): string {
  const parts = label.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function domainTone(domain: string): DomainTone {
  const key = domain.toLowerCase();
  if (key === "staff" || key === "auth" || key === "settings") return "blue";
  if (key === "assignments" || key === "staff_targets") return "purple";
  if (key === "premium") return "orange";
  if (key === "premium_workspace" || key === "catalog" || key === "cms" || key === "content") return "green";
  if (key === "documents") return "teal";
  if (key === "notifications" || key === "leads") return "red";
  return "gray";
}

function normalizeOutcome(outcome: string): "success" | "failed" | "other" {
  const value = outcome.trim().toLowerCase();
  if (
    value.includes("fail") ||
    value.includes("error") ||
    value.includes("denied") ||
    value.includes("reject") ||
    value.includes("blocked")
  ) {
    return "failed";
  }
  if (
    value.includes("success") ||
    value.includes("succeed") ||
    value === "ok" ||
    value.includes("allow") ||
    value.includes("complet")
  ) {
    return "success";
  }
  return "other";
}

function outcomeLabel(outcome: string): string {
  const kind = normalizeOutcome(outcome);
  if (kind === "success") return "Succeeded";
  if (kind === "failed") return "Failed";
  return outcome || "—";
}

function dayKey(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function matchesSearch(item: OperationsActivityItem, query: string): boolean {
  if (!query) return true;
  const haystack = [
    item.eventLabel,
    item.eventType,
    item.actorLabel,
    item.targetLabel,
    item.contextLabel,
    item.outcome,
    item.sourceSubsystem,
    operationsActivityDomainLabel(item.sourceSubsystem)
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function ActivityDestination({ item }: { item: OperationsActivityItem }) {
  return (
    <div className="ops-activity-target">
      <span className="ops-activity-target-label">{item.targetLabel}</span>
      {item.destinationPath ? (
        <Link className="ops-activity-destination" href={item.destinationPath}>
          Open destination
        </Link>
      ) : null}
    </div>
  );
}

export function OperationsActivityList({
  items,
  initialDomain
}: {
  items: OperationsActivityItem[];
  initialDomain: OperationsActivityDomain | null;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [domainDraft, setDomainDraft] = useState(initialDomain ?? "");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [outcomeDraft, setOutcomeDraft] = useState<"all" | "success" | "failed">("all");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");
  const [appliedOutcome, setAppliedOutcome] = useState<"all" | "success" | "failed">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = appliedSearch.trim().toLowerCase();
    return items.filter((item) => {
      if (!matchesSearch(item, q)) return false;
      const day = dayKey(item.occurredAt);
      if (appliedFrom && day && day < appliedFrom) return false;
      if (appliedTo && day && day > appliedTo) return false;
      if (appliedOutcome !== "all" && normalizeOutcome(item.outcome) !== appliedOutcome) return false;
      return true;
    });
  }, [items, appliedSearch, appliedFrom, appliedTo, appliedOutcome]);

  const kpis = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    let todayCount = 0;
    let successCount = 0;
    let failedCount = 0;
    for (const item of filtered) {
      if (dayKey(item.occurredAt) === today) todayCount += 1;
      const kind = normalizeOutcome(item.outcome);
      if (kind === "success") successCount += 1;
      if (kind === "failed") failedCount += 1;
    }
    return {
      total: filtered.length,
      today: todayCount,
      success: successCount,
      failed: failedCount
    };
  }, [filtered]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE) || 1);
  const safePage = Math.min(page, pageCount);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + PAGE_SIZE, filtered.length);

  function applyFilters(event: FormEvent) {
    event.preventDefault();
    setAppliedSearch(search);
    setAppliedFrom(dateFrom);
    setAppliedTo(dateTo);
    setAppliedOutcome(outcomeDraft);
    setPage(1);

    const nextDomain = domainDraft || null;
    const currentDomain = initialDomain ?? null;
    if (nextDomain !== currentDomain) {
      const href = nextDomain ? `/ops/activity?domain=${encodeURIComponent(nextDomain)}` : "/ops/activity";
      router.push(href);
    }
  }

  function goToPage(next: number) {
    setPage(Math.min(Math.max(1, next), pageCount));
  }

  const pageNumbers = buildPageNumbers(safePage, pageCount);

  return (
    <div className="ops-activity-view" data-operations-activity style={{ marginTop: 0, paddingTop: 0 }}>
      <section className="ops-activity-kpis" aria-label="Activity summary" style={{ marginTop: 0 }}>
        <article className="ops-activity-kpi">
          <span className="ops-activity-kpi-icon ops-activity-kpi-icon--blue" aria-hidden="true">
            <FileText size={18} />
          </span>
          <div>
            <p className="ops-activity-kpi-label">Total Events</p>
            <p className="ops-activity-kpi-value">{kpis.total}</p>
          </div>
        </article>
        <article className="ops-activity-kpi">
          <span className="ops-activity-kpi-icon ops-activity-kpi-icon--purple" aria-hidden="true">
            <CalendarDays size={18} />
          </span>
          <div>
            <p className="ops-activity-kpi-label">Today</p>
            <p className="ops-activity-kpi-value">{kpis.today}</p>
          </div>
        </article>
        <article className="ops-activity-kpi">
          <span className="ops-activity-kpi-icon ops-activity-kpi-icon--green" aria-hidden="true">
            <CheckCircle2 size={18} />
          </span>
          <div>
            <p className="ops-activity-kpi-label">Successful</p>
            <p className="ops-activity-kpi-value">{kpis.success}</p>
          </div>
        </article>
        <article className="ops-activity-kpi">
          <span className="ops-activity-kpi-icon ops-activity-kpi-icon--red" aria-hidden="true">
            <XCircle size={18} />
          </span>
          <div>
            <p className="ops-activity-kpi-label">Failed</p>
            <p className="ops-activity-kpi-value">{kpis.failed}</p>
          </div>
        </article>
      </section>

      <section className="ops-activity-panel" aria-labelledby="ops-activity-heading">
        <h2 id="ops-activity-heading" className="ops-activity-visually-hidden">
          Activity log
        </h2>

        <form className="ops-activity-filters" onSubmit={applyFilters}>
          <div className="ops-activity-filter-field ops-activity-filter-search">
            <label className="ops-activity-visually-hidden" htmlFor="ops-activity-search">
              Search activity
            </label>
            <input
              id="ops-activity-search"
              type="search"
              className="ops-activity-control"
              placeholder="Search activity..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="ops-activity-filter-field">
            <label className="ops-activity-visually-hidden" htmlFor="ops-activity-domain">
              Activity domain
            </label>
            <select
              id="ops-activity-domain"
              className="ops-activity-control"
              value={domainDraft}
              onChange={(event) => setDomainDraft(event.target.value)}
              aria-label="Activity domain"
            >
              <option value="">All domains</option>
              {OPERATIONS_ACTIVITY_DOMAINS.map((option) => (
                <option key={option} value={option}>
                  {operationsActivityDomainLabel(option)}
                </option>
              ))}
            </select>
          </div>

          <div className="ops-activity-filter-field ops-activity-filter-dates">
            <label className="ops-activity-visually-hidden" htmlFor="ops-activity-from">
              From date
            </label>
            <input
              id="ops-activity-from"
              type="date"
              className="ops-activity-control"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              aria-label="From date"
            />
            <span className="ops-activity-date-sep" aria-hidden="true">
              –
            </span>
            <label className="ops-activity-visually-hidden" htmlFor="ops-activity-to">
              To date
            </label>
            <input
              id="ops-activity-to"
              type="date"
              className="ops-activity-control"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              aria-label="To date"
            />
          </div>

          <div className="ops-activity-filter-field">
            <label className="ops-activity-visually-hidden" htmlFor="ops-activity-outcome">
              Outcome
            </label>
            <select
              id="ops-activity-outcome"
              className="ops-activity-control"
              value={outcomeDraft}
              onChange={(event) =>
                setOutcomeDraft(event.target.value as "all" | "success" | "failed")
              }
              aria-label="Outcome"
            >
              <option value="all">All outcomes</option>
              <option value="success">Succeeded</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <button type="submit" className="ops-activity-filter-submit">
            Filter
          </button>
        </form>

        {pageItems.length ? (
          <>
            <div className="ops-activity-desktop">
              <div
                className="ops-activity-table-scroll"
                tabIndex={0}
                role="region"
                aria-label="Authorized Operations activity"
              >
                <table className="ops-activity-table">
                  <thead>
                    <tr>
                      <th scope="col">Time</th>
                      <th scope="col">Domain</th>
                      <th scope="col">Event</th>
                      <th scope="col">Target</th>
                      <th scope="col">Actor</th>
                      <th scope="col">Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((item) => {
                      const tone = domainTone(item.sourceSubsystem);
                      const kind = normalizeOutcome(item.outcome);
                      return (
                        <tr key={item.id}>
                          <td className="ops-activity-time">
                            <time dateTime={item.occurredAt}>{formatTime(item.occurredAt)}</time>
                          </td>
                          <td>
                            <span className={`ops-activity-domain ops-activity-domain--${tone}`}>
                              {operationsActivityDomainLabel(item.sourceSubsystem)}
                            </span>
                          </td>
                          <td>
                            <strong className="ops-activity-event">{item.eventLabel}</strong>
                            {item.contextLabel ? (
                              <span className="ops-activity-context">{item.contextLabel}</span>
                            ) : null}
                          </td>
                          <td>
                            <ActivityDestination item={item} />
                          </td>
                          <td>
                            <div className="ops-activity-actor">
                              <span className="ops-activity-actor-avatar" aria-hidden="true">
                                {actorInitials(item.actorLabel)}
                              </span>
                              <span>{item.actorLabel}</span>
                            </div>
                          </td>
                          <td>
                            <span
                              className={
                                kind === "failed"
                                  ? "ops-activity-outcome ops-activity-outcome--failed"
                                  : kind === "success"
                                    ? "ops-activity-outcome ops-activity-outcome--success"
                                    : "ops-activity-outcome"
                              }
                            >
                              {outcomeLabel(item.outcome)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <ul className="ops-activity-mobile">
              {pageItems.map((item) => {
                const kind = normalizeOutcome(item.outcome);
                return (
                  <li className="ops-activity-card" key={item.id}>
                    <div className="ops-activity-card-top">
                      <strong className="ops-activity-event">{item.eventLabel}</strong>
                      <span
                        className={
                          kind === "failed"
                            ? "ops-activity-outcome ops-activity-outcome--failed"
                            : kind === "success"
                              ? "ops-activity-outcome ops-activity-outcome--success"
                              : "ops-activity-outcome"
                        }
                      >
                        {outcomeLabel(item.outcome)}
                      </span>
                    </div>
                    {item.contextLabel ? <p className="ops-activity-context">{item.contextLabel}</p> : null}
                    <dl className="ops-activity-card-meta">
                      <div>
                        <dt>Time</dt>
                        <dd>
                          <time dateTime={item.occurredAt}>{formatTime(item.occurredAt)}</time>
                        </dd>
                      </div>
                      <div>
                        <dt>Domain</dt>
                        <dd>{operationsActivityDomainLabel(item.sourceSubsystem)}</dd>
                      </div>
                      <div>
                        <dt>Target</dt>
                        <dd>
                          <ActivityDestination item={item} />
                        </dd>
                      </div>
                      <div>
                        <dt>Actor</dt>
                        <dd>{item.actorLabel}</dd>
                      </div>
                    </dl>
                  </li>
                );
              })}
            </ul>

            <nav className="ops-activity-pagination" aria-label="Activity pagination">
              <p>
                Showing {showingFrom} to {showingTo} of {filtered.length} activities
              </p>
              <div className="ops-activity-pagination-controls">
                <button
                  type="button"
                  className="ops-activity-page-btn"
                  disabled={safePage <= 1}
                  aria-label="Previous page"
                  onClick={() => goToPage(safePage - 1)}
                >
                  ‹
                </button>
                {pageNumbers.map((entry, index) =>
                  entry === "…" ? (
                    <span key={`ellipsis-${index}`} className="ops-activity-page-ellipsis" aria-hidden="true">
                      …
                    </span>
                  ) : (
                    <button
                      key={entry}
                      type="button"
                      className={
                        entry === safePage
                          ? "ops-activity-page-btn ops-activity-page-btn--active"
                          : "ops-activity-page-btn"
                      }
                      aria-label={`Page ${entry}`}
                      aria-current={entry === safePage ? "page" : undefined}
                      onClick={() => goToPage(entry)}
                    >
                      {entry}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className="ops-activity-page-btn"
                  disabled={safePage >= pageCount}
                  aria-label="Next page"
                  onClick={() => goToPage(safePage + 1)}
                >
                  ›
                </button>
              </div>
            </nav>
          </>
        ) : (
          <div className="ops-activity-empty">
            <h3>No authorized activity matches this view</h3>
            <p>Try another domain, date range, or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}

function buildPageNumbers(current: number, total: number): Array<number | "…"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const pages = new Set<number>([1, total, current, current - 1, current + 1, 2, total - 1]);
  const sorted = [...pages].filter((value) => value >= 1 && value <= total).sort((a, b) => a - b);
  const result: Array<number | "…"> = [];
  for (const value of sorted) {
    const last = result[result.length - 1];
    if (typeof last === "number" && value - last > 1) result.push("…");
    result.push(value);
  }
  return result;
}
