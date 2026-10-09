/**
 * WS-OC-2 — Overall Comments table (no reply · no inner Comments heading).
 * Pagination matches Workspace registry (10 per page).
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import type { OverallCommentRow } from "@/features/workspace-overall-comments/load-overall-comments";
import styles from "./workspace-overall-comments.module.css";

const PAGE_SIZE = 10;

export function WorkspaceOverallComments({
  rows: liveRows,
  scope
}: {
  rows: readonly OverallCommentRow[];
  scope: "assigned" | "authorized";
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...liveRows];
    return liveRows.filter(
      (row) =>
        row.studentName.toLowerCase().includes(q) ||
        row.pgsId.toLowerCase().includes(q) ||
        row.comment.toLowerCase().includes(q)
    );
  }, [liveRows, query]);

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE) || 1);
  const safePage = Math.min(page, totalPages);
  const startIndex = totalCount ? (safePage - 1) * PAGE_SIZE : 0;
  const pageRows = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const start = totalCount ? startIndex + 1 : 0;
  const end = totalCount ? Math.min(startIndex + PAGE_SIZE, totalCount) : 0;

  useEffect(() => {
    setPage(1);
  }, [query, liveRows]);

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    const mid = Math.min(Math.max(safePage, 3), totalPages - 2);
    return [mid - 2, mid - 1, mid, mid + 1, mid + 2].filter(
      (value) => value >= 1 && value <= totalPages
    );
  }, [safePage, totalPages]);

  return (
    <main className={styles.root} data-ws-gate="ws-oc-2" data-ws-source="workspace_comments">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Overall Comments</p>
          <h1>Overall Comments</h1>
          <p className={styles.lead}>
            Same comments as Student Desk → Comments.{" "}
            {scope === "assigned" ? (
              <>
                Mentor scope: <strong>assigned students only</strong>.
              </>
            ) : (
              <>Authorized staff scope (permission-shaped).</>
            )}{" "}
            Reply on the student Desk — not here.
          </p>
        </div>
      </header>

      <div className={styles.filters}>
        <label className={styles.searchLabel}>
          <span className={styles.srOnly}>Search comments</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search student, PGS ID, or comment…"
            autoComplete="off"
          />
        </label>
        <p className={styles.scopeNote}>
          {liveRows.length} comment{liveRows.length === 1 ? "" : "s"} in scope
        </p>
      </div>

      <section className={styles.tablePanel} aria-label="Comments table">
        {!liveRows.length ? (
          <p className={styles.empty} role="status">
            No comments yet for students in your scope. Post on Desk → Comments and refresh.
          </p>
        ) : !filtered.length ? (
          <p className={styles.empty} role="status">
            No rows match this search.
          </p>
        ) : (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Student name</th>
                  <th scope="col">Student ID</th>
                  <th scope="col">Comment</th>
                  <th scope="col">Timing</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.studentName}</td>
                    <td>{row.pgsId}</td>
                    <td>{row.comment}</td>
                    <td>
                      <time dateTime={row.createdAt}>{row.timing}</time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <nav className={styles.pager} aria-label="Overall comments pagination">
          <p>
            {totalCount ? `${start}–${end} of ${totalCount}` : "0 comments"} · {PAGE_SIZE} per page
          </p>
          <div className={styles.pagerControls}>
            <button
              type="button"
              className={styles.pageBtn}
              aria-label="Previous page"
              disabled={safePage <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              ‹
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={
                  pageNumber === safePage ? `${styles.pageBtn} ${styles.pageBtnActive}` : styles.pageBtn
                }
                aria-label={`Page ${pageNumber}`}
                aria-current={pageNumber === safePage ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              className={styles.pageBtn}
              aria-label="Next page"
              disabled={safePage >= totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            >
              ›
            </button>
          </div>
        </nav>
      </section>
    </main>
  );
}
