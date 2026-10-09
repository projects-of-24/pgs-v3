import Link from "next/link";
import { CalendarDays, CheckSquare, ClipboardList, Crown, MessageSquare, Users } from "lucide-react";
import styles from "./workspace-dashboard.module.css";

export type WorkspaceDashboardCounts = {
  myStudents: number | null;
  premium: number | null;
};

/**
 * WS-DASH-3 — OG Dashboard body sorted to owner ChatGPT reference.
 * Real scoreboard counts only. No fake +2 / queue / event / activity rows.
 */
export function WorkspaceDashboard({
  displayName,
  counts,
  dateRangeLabel
}: {
  displayName: string;
  counts: WorkspaceDashboardCounts;
  dateRangeLabel: string;
}) {
  const premiumShare =
    counts.myStudents !== null
    && counts.myStudents > 0
    && counts.premium !== null
    && counts.premium <= counts.myStudents
      ? Math.round((counts.premium / counts.myStudents) * 100)
      : null;

  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1>
            Welcome back, {displayName}{" "}
            <span className={styles.wave} aria-hidden="true">
              👋
            </span>
          </h1>
          <p>Overview of your students, tasks and activity.</p>
        </div>
        <button type="button" className={styles.dateBtn} disabled aria-disabled="true">
          <CalendarDays aria-hidden="true" />
          <span>{dateRangeLabel}</span>
        </button>
      </header>

      <section className={styles.kpis} aria-label="Student totals">
        <Link href="/workspace/students?mentor=assigned" className={styles.kpi}>
          <span className={`${styles.kpiIcon} ${styles.kpiIconPurple}`} aria-hidden="true">
            <Users />
          </span>
          <span className={styles.kpiLabel}>My students</span>
          <strong className={styles.kpiValue}>{formatCount(counts.myStudents)}</strong>
          <span className={styles.kpiMeta}>Assigned now</span>
        </Link>

        <Link href="/workspace/students?plan=premium" className={styles.kpi}>
          <span className={`${styles.kpiIcon} ${styles.kpiIconGold}`} aria-hidden="true">
            <Crown />
          </span>
          <span className={styles.kpiLabel}>Premium students</span>
          <strong className={styles.kpiValue}>{formatCount(counts.premium)}</strong>
          <span className={styles.kpiMeta}>
            {premiumShare !== null ? `${premiumShare}% of my students` : "Active entitlement"}
          </span>
        </Link>

        <div className={styles.kpi} role="status">
          <span className={`${styles.kpiIcon} ${styles.kpiIconRose}`} aria-hidden="true">
            <ClipboardList />
          </span>
          <span className={styles.kpiLabel}>Review queue</span>
          <strong className={styles.kpiValueMuted}>—</strong>
          <span className={`${styles.kpiMeta} ${styles.kpiMetaRose}`}>Needs action · coming next</span>
        </div>

        <div className={styles.kpi} role="status">
          <span className={`${styles.kpiIcon} ${styles.kpiIconAmber}`} aria-hidden="true">
            <CalendarDays />
          </span>
          <span className={styles.kpiLabel}>Upcoming events</span>
          <strong className={styles.kpiValueMuted}>—</strong>
          <span className={`${styles.kpiMeta} ${styles.kpiMetaAmber}`}>This week · coming next</span>
        </div>
      </section>

      <div className={styles.columns}>
        <section className={styles.panel} aria-labelledby="ws-dash-activity-heading">
          <div className={styles.panelHead}>
            <h2 id="ws-dash-activity-heading">Recent Activity</h2>
            <Link href="/workspace/overall-comments" className={styles.viewAll}>
              View all →
            </Link>
          </div>
          <ul className={styles.feed}>
            <li className={styles.feedEmpty}>
              <span className={styles.feedIcon} aria-hidden="true">
                <MessageSquare />
              </span>
              <div>
                <strong>No recent activity yet</strong>
                <span>Comments, documents, and assignments will list here when wired.</span>
              </div>
            </li>
          </ul>
        </section>

        <section className={styles.panel} aria-labelledby="ws-dash-tasks-heading">
          <div className={styles.panelHead}>
            <h2 id="ws-dash-tasks-heading">My Tasks</h2>
            <Link href="/workspace/loopboard" className={styles.viewAll}>
              View all →
            </Link>
          </div>
          <ul className={styles.feed}>
            <li className={styles.feedEmpty}>
              <span className={styles.feedIcon} aria-hidden="true">
                <CheckSquare />
              </span>
              <div>
                <strong>No tasks yet</strong>
                <span>Review and mentor todos will list here when wired.</span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

function formatCount(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  return String(value);
}
