import Link from "next/link";
import { crmStageLabel } from "@/lib/operations-student-crm";
import {
  REGISTRY_PAGE_SIZE,
  registryHref,
  type NormalizedRegistryQuery,
  type StudentRegistryResult
} from "@/lib/operations-student-registry";
import styles from "./workspace-student-registry.module.css";

type TabKey = "all" | "mine" | "premium" | "standard";

function activeTab(query: NormalizedRegistryQuery, mentorScoped: boolean): TabKey {
  if (query.plan === "premium") return "premium";
  if (query.plan === "standard") return "standard";
  if (!mentorScoped && query.mentor === "assigned") return "mine";
  return "all";
}

function tabHref(
  query: NormalizedRegistryQuery,
  tab: TabKey,
  mentorScoped: boolean
): string {
  const next: NormalizedRegistryQuery = {
    ...query,
    page: 1,
    plan: tab === "premium" ? "premium" : tab === "standard" ? "standard" : null,
    mentor: tab === "mine" && !mentorScoped ? "assigned" : tab === "all" || tab === "premium" || tab === "standard"
      ? null
      : query.mentor
  };
  if (tab === "all") {
    next.plan = null;
    if (!mentorScoped) next.mentor = null;
  }
  return registryHref(next, { includePage: true, basePath: "/workspace/students" });
}

/**
 * WS-REG — Workspace Student Registry (mock list).
 * Same registry RPC/scope as Ops STU1; Workspace chrome + Open Desk paths.
 */
export function WorkspaceStudentRegistry({
  query,
  result,
  mentorScoped,
  counts
}: {
  query: NormalizedRegistryQuery;
  result: StudentRegistryResult;
  mentorScoped: boolean;
  counts: {
    all: number | null;
    mine: number | null;
    premium: number | null;
    standard: number | null;
  };
}) {
  const tab = activeTab(query, mentorScoped);
  const pageSize = Math.max(1, result.pageSize || REGISTRY_PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(result.totalCount / pageSize) || 1);
  const previousPage = result.page > 1 ? result.page - 1 : null;
  const nextPage = result.page < totalPages && result.totalCount > 0 ? result.page + 1 : null;
  const pages = pageWindow(result.page, totalPages);
  const start = result.totalCount ? (result.page - 1) * pageSize + 1 : 0;
  const end = result.totalCount ? Math.min(result.page * pageSize, result.totalCount) : 0;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div>
          <h1>Students</h1>
          <p>Find students, see Premium and mentor, then open their desk.</p>
        </div>
      </header>

      <form className={styles.searchBar} method="get" action="/workspace/students" role="search">
        <label className={styles.srOnly} htmlFor="ws-reg-q">
          Search students
        </label>
        <input
          id="ws-reg-q"
          name="q"
          type="search"
          defaultValue={query.q ?? ""}
          placeholder="Search by name, email, or PGS ID..."
        />
        {query.plan ? <input type="hidden" name="plan" value={query.plan} /> : null}
        {query.mentor ? <input type="hidden" name="mentor" value={query.mentor} /> : null}
        <button type="submit">Search</button>
        {query.q || query.plan || (!mentorScoped && query.mentor) ? (
          <Link className={styles.reset} href="/workspace/students">
            Reset
          </Link>
        ) : null}
      </form>

      <div className={styles.tabs} role="tablist" aria-label="Student list filters">
        {(
          [
            { key: "all" as const, label: "All Students", count: counts.all },
            { key: "mine" as const, label: mentorScoped ? "My Assigned" : "My Assigned", count: counts.mine },
            { key: "premium" as const, label: "Premium", count: counts.premium },
            { key: "standard" as const, label: "Not Premium", count: counts.standard }
          ] as const
        ).map((item) => (
          <Link
            key={item.key}
            href={tabHref(query, item.key, mentorScoped)}
            className={tab === item.key ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            role="tab"
            aria-selected={tab === item.key}
          >
            {item.label}
            {item.count !== null ? <span className={styles.tabCount}>{item.count}</span> : null}
          </Link>
        ))}
      </div>

      {result.error ? (
        <p className={styles.empty} role="alert">
          Could not load students. Try again.
        </p>
      ) : !result.rows.length ? (
        <p className={styles.empty} role="status">
          No students match this view.
        </p>
      ) : (
        <div className={styles.tableWrap} data-ws-body-scroll>
          <table className={styles.table}>
            <caption className={styles.srOnly}>Student registry</caption>
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">PGS ID</th>
                <th scope="col">Premium</th>
                <th scope="col">Mentor</th>
                <th scope="col">Stage</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row) => (
                <tr key={row.id}>
                  <td data-label="Student">
                    <div className={styles.studentCell}>
                      <span className={styles.avatar} aria-hidden="true">
                        {row.fullName
                          .split(/\s+/)
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0]?.toUpperCase() ?? "")
                          .join("") || "ST"}
                      </span>
                      <span>
                        <strong>{row.fullName}</strong>
                        {row.studyLevel ? <small>{row.studyLevel}</small> : null}
                      </span>
                    </div>
                  </td>
                  <td data-label="PGS ID">{row.pgsCode}</td>
                  <td data-label="Premium">
                    <span
                      className={
                        row.plan === "Premium" ? `${styles.badge} ${styles.badgePremium}` : `${styles.badge} ${styles.badgeStandard}`
                      }
                    >
                      {row.plan}
                    </span>
                  </td>
                  <td data-label="Mentor">{row.mentorName}</td>
                  <td data-label="Stage">{crmStageLabel(row.stage)}</td>
                  <td data-label="Actions">
                    <Link className={styles.openDesk} href={`/workspace/students/${row.id}`}>
                      Open Desk
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <nav className={styles.pager} aria-label="Student registry pagination">
        <p>
          {result.totalCount ? `${start}–${end} of ${result.totalCount}` : "0 students"} · {pageSize} per
          page
        </p>
        <div className={styles.pagerControls}>
          {previousPage ? (
            <Link
              className={styles.pageBtn}
              href={registryHref(
                { ...query, page: previousPage },
                { includePage: true, basePath: "/workspace/students" }
              )}
              aria-label="Previous page"
            >
              ‹
            </Link>
          ) : (
            <span className={styles.pageBtn} aria-disabled="true">
              ‹
            </span>
          )}
          {pages.map((page) =>
            page === result.page ? (
              <span key={page} className={`${styles.pageBtn} ${styles.pageBtnActive}`} aria-current="page">
                {page}
              </span>
            ) : (
              <Link
                key={page}
                className={styles.pageBtn}
                href={registryHref({ ...query, page }, { includePage: true, basePath: "/workspace/students" })}
                aria-label={`Page ${page}`}
              >
                {page}
              </Link>
            )
          )}
          {nextPage ? (
            <Link
              className={styles.pageBtn}
              href={registryHref(
                { ...query, page: nextPage },
                { includePage: true, basePath: "/workspace/students" }
              )}
              aria-label="Next page"
            >
              ›
            </Link>
          ) : (
            <span className={styles.pageBtn} aria-disabled="true">
              ›
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}

/** Same windowing as Ops STU1 registry. */
function pageWindow(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const start = Math.max(1, Math.min(current - 2, total - 4));
  return Array.from({ length: 5 }, (_, index) => start + index).filter((page) => page <= total);
}
