"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import styles from "./workspace-desk-dashboard-data.module.css";

type PickRow = {
  id: string;
  course_id: number;
  title: string;
  sort_order: number;
  status: string;
  created_at: string;
};

type CatalogRow = { id: number; title: string };

type Props = {
  studentId: string;
  canManage: boolean;
};

/**
 * WS-FILL-3 — Desk Top Picks / Assigned (mentor-assign published courses).
 * Searchable picker (native &lt;select&gt; hangs on long course titles).
 */
export function WorkspaceDeskTopPicks({ studentId, canManage }: Props) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [picks, setPicks] = useState<PickRow[]>([]);
  const [catalog, setCatalog] = useState<CatalogRow[]>([]);
  const [courseId, setCourseId] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    setLoadError("");
    const response = await fetch(`/api/staff/students/${studentId}/workspace/top-picks`, {
      method: "GET",
      headers: { accept: "application/json" }
    });
    const result = (await response.json()) as {
      message?: string;
      picks?: PickRow[];
      catalog?: CatalogRow[];
    };
    if (!response.ok) {
      setLoadError(result.message ?? "Unable to load Top picks.");
      setPicks([]);
      setCatalog([]);
      return;
    }
    setPicks(result.picks ?? []);
    setCatalog(result.catalog ?? []);
  }, [studentId]);

  useEffect(() => {
    void load();
  }, [load]);

  const assignedIds = useMemo(() => new Set(picks.map((pick) => pick.course_id)), [picks]);

  const selected = useMemo(
    () => catalog.find((row) => String(row.id) === courseId) ?? null,
    [catalog, courseId]
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const rows = needle
      ? catalog.filter(
          (row) =>
            row.title.toLowerCase().includes(needle) || String(row.id).includes(needle)
        )
      : catalog;
    return rows.slice(0, 40);
  }, [catalog, query]);

  const canAssign = Boolean(courseId) && !assignedIds.has(Number(courseId));

  function chooseCourse(row: CatalogRow) {
    if (assignedIds.has(row.id)) {
      setMessage("That course is already assigned.");
      return;
    }
    setCourseId(String(row.id));
    setQuery(row.title);
    setOpen(false);
    setMessage("");
  }

  async function assignCourse() {
    if (!canManage || !courseId) return;
    const already = picks.some((pick) => String(pick.course_id) === courseId);
    if (already) {
      setMessage("That course is already assigned.");
      return;
    }
    setBusy(true);
    setMessage("Saving…");
    const response = await fetch(`/api/staff/students/${studentId}/workspace/top-picks`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ course_id: Number(courseId) })
    });
    const result = (await response.json()) as { message?: string };
    setBusy(false);
    if (!response.ok) {
      setMessage(result.message ?? "Unable to assign.");
      return;
    }
    setCourseId("");
    setQuery("");
    setMessage("Top pick assigned.");
    await load();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await assignCourse();
  }

  async function remove(id: string) {
    if (!canManage) return;
    setBusy(true);
    setMessage("Removing…");
    const response = await fetch(`/api/staff/students/${studentId}/workspace/top-picks`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id })
    });
    const result = (await response.json()) as { message?: string };
    setBusy(false);
    if (!response.ok) {
      setMessage(result.message ?? "Unable to remove.");
      return;
    }
    setMessage("Top pick removed.");
    await load();
  }

  return (
    <section className={styles.card} aria-labelledby="ws-fill-picks-heading">
      <div className={styles.cardHead}>
        <h2 id="ws-fill-picks-heading">Top Picks / Assigned</h2>
        <span className={styles.badgeFeed}>Student visible · #FEED</span>
      </div>

      {loadError ? (
        <p className={styles.empty} role="status">
          {loadError}
        </p>
      ) : null}

      {!loadError && picks.length === 0 ? (
        <p className={styles.empty} role="status">
          No courses assigned yet. Search a course, then click <strong>Assign Top pick</strong> on the
          right. Repeat for multiple.
        </p>
      ) : null}

      {!loadError && picks.length > 0 ? (
        <p className={styles.notesHint} role="status">
          {picks.length} assigned. Search another course below, then Assign again.
        </p>
      ) : null}

      {picks.length > 0 ? (
        <ul className={styles.picksList}>
          {picks.map((pick) => (
            <li key={pick.id} className={styles.picksItem}>
              <div className={styles.picksCopy}>
                <p className={styles.picksTitle}>{pick.title}</p>
                <p className={styles.notesHint}>
                  Course #{pick.course_id} · {pick.status}
                </p>
              </div>
              {canManage ? (
                <button
                  type="button"
                  className={styles.picksRemove}
                  disabled={busy}
                  onClick={() => void remove(pick.id)}
                >
                  Remove
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {canManage ? (
        <form className={styles.notesForm} onSubmit={(event) => void onSubmit(event)}>
          <label className={styles.notesField} htmlFor={`ws-top-pick-course-${studentId}`}>
            <span>Search published course</span>
          </label>
          <div className={styles.assignRow}>
            <div className={styles.assignSelectWrap}>
              <input
                ref={inputRef}
                id={`ws-top-pick-course-${studentId}`}
                className={styles.assignSelect}
                type="search"
                role="combobox"
                aria-expanded={open}
                aria-controls={listId}
                aria-autocomplete="list"
                autoComplete="off"
                placeholder={
                  catalog.length === 0 ? "No published courses" : "Type to search courses…"
                }
                value={query}
                disabled={busy || catalog.length === 0}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCourseId("");
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => {
                  window.setTimeout(() => setOpen(false), 150);
                }}
              />
              {open && catalog.length > 0 ? (
                <ul id={listId} className={styles.courseSuggest} role="listbox">
                  {filtered.length === 0 ? (
                    <li className={styles.courseSuggestEmpty} role="option" aria-disabled="true">
                      No matches
                    </li>
                  ) : (
                    filtered.map((row) => {
                      const taken = assignedIds.has(row.id);
                      return (
                        <li key={row.id} role="presentation">
                          <button
                            type="button"
                            role="option"
                            aria-selected={courseId === String(row.id)}
                            className={styles.courseSuggestItem}
                            disabled={taken}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => chooseCourse(row)}
                          >
                            <span className={styles.courseSuggestTitle}>{row.title}</span>
                            <span className={styles.courseSuggestMeta}>
                              #{row.id}
                              {taken ? " · already assigned" : ""}
                            </span>
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
              ) : null}
              {selected && !open ? (
                <p className={styles.notesHint}>Selected: {selected.title}</p>
              ) : null}
            </div>
            <button
              type="button"
              disabled={busy || !canAssign}
              onClick={() => void assignCourse()}
              aria-label="Assign Top pick to this student"
              className={styles.assignButton}
            >
              {busy ? "Working…" : "Assign Top pick"}
            </button>
          </div>
          <p className={styles.notesHint}>
            Type to find a course, click it in the list, then Assign on the right. Repeat for multiple.
          </p>
          <span className={styles.status} role="status">
            {message}
          </span>
        </form>
      ) : (
        <p className={styles.note} role="status">
          You can inspect assigned Top picks. Mutations are disabled for your role.
        </p>
      )}
    </section>
  );
}
