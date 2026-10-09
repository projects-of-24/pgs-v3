import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CircleGauge,
  GraduationCap,
  Sparkles,
  TriangleAlert,
  User,
  UserCheck,
  UserMinus,
  UsersRound
} from "lucide-react";
import type {
  OperationsScoreboardModel,
  ScoreboardActivityItem,
  ScoreboardComposition,
  ScoreboardMetric,
  ScoreboardOperateLink,
  ScoreboardRosterItem
} from "@/lib/operations-scoreboard";
import { OperationsJoinTrendChart } from "@/components/operations-scoreboard-chart";
import styles from "./operations-scoreboard.module.css";

const metricIcons = {
  total: GraduationCap,
  premium: Sparkles,
  standard: CircleGauge,
  assigned: UserCheck,
  unassigned: UserMinus,
  premium_awaiting_mentor: TriangleAlert,
  joined_month: CalendarDays,
  joined_year: CalendarDays,
  my_students: UsersRound,
  my_premium: Sparkles,
  my_standard: CircleGauge
} as const;

const metricTints: Record<ScoreboardMetric["key"], string> = {
  total: styles.tintBlue,
  premium: styles.tintPurple,
  standard: styles.tintOrange,
  assigned: styles.tintGreen,
  unassigned: styles.tintPink,
  premium_awaiting_mentor: styles.tintOrange,
  joined_month: styles.tintBlue,
  joined_year: styles.tintPurple,
  my_students: styles.tintBlue,
  my_premium: styles.tintPurple,
  my_standard: styles.tintOrange
};

function metricValue(value: number | null): string {
  return value === null ? "—" : String(value);
}

function ScoreboardWelcome({
  displayName,
  title,
  description
}: {
  displayName: string;
  title: string;
  description: string;
}) {
  const firstName = displayName.split(/\s+/)[0] || displayName;
  return (
    <header className={styles.welcome}>
      <div className={styles.welcomeCopy}>
        <p className={styles.welcomeEyebrow}>Scoreboard</p>
        <h1 className={styles.welcomeTitle}>Welcome back, {firstName}</h1>
        <p className={styles.welcomeLead}>{description || title}</p>
      </div>
    </header>
  );
}

function ScoreboardMetrics({ metrics }: { metrics: ScoreboardMetric[] }) {
  if (!metrics.length) return null;
  return (
    <section aria-label="Operations metrics">
      <ul className={styles.kpiGrid}>
        {metrics.map((metric) => {
          const Icon = metricIcons[metric.key];
          return (
            <li key={metric.key}>
              <Link
                href={metric.href}
                data-scoreboard-metric={metric.key}
                className={styles.kpiCard}
              >
                <span className={styles.kpiTop}>
                  <span className={`${styles.kpiIcon} ${metricTints[metric.key]}`} aria-hidden="true">
                    <Icon />
                  </span>
                </span>
                <div className={styles.kpiBody}>
                  <p className={styles.kpiLabel}>{metric.label}</p>
                  <p className={styles.kpiValue}>{metricValue(metric.value)}</p>
                  <p className={styles.kpiHint}>{metric.description}</p>
                </div>
                <span className={styles.kpiOpen}>
                  Open view <ArrowUpRight aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AttentionMetric({ metric }: { metric: ScoreboardMetric }) {
  return (
    <section aria-label="Operational attention">
      <Link href={metric.href} data-scoreboard-metric={metric.key} className={styles.attention}>
        <span className={styles.attentionIcon} aria-hidden="true">
          <TriangleAlert />
        </span>
        <span className={styles.attentionCopy}>
          <strong>{metric.label}</strong>
          <span>{metric.description}</span>
        </span>
        <strong className={styles.attentionValue}>{metricValue(metric.value)}</strong>
        <span className={styles.attentionOpen}>
          Open view <ArrowUpRight aria-hidden="true" />
        </span>
      </Link>
    </section>
  );
}

function CompositionPanel({
  title,
  description,
  mix,
  tone
}: {
  title: string;
  description: string;
  mix: ScoreboardComposition;
  tone: "premium" | "assignment";
}) {
  const firstShare = mix.total > 0 ? Math.round((mix.first.value / mix.total) * 100) : 0;
  const secondShare = mix.total > 0 ? Math.max(0, 100 - firstShare) : 0;
  const firstSeg = tone === "premium" ? styles.mixSegPurple : styles.mixSegGreen;

  return (
    <article className={styles.panel}>
      <header className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>{title}</h2>
        <p className={styles.panelLead}>{description}</p>
      </header>
      <div
        className={styles.mixTrack}
        role="img"
        aria-label={`${mix.first.value} ${mix.first.label}, ${mix.second.value} ${mix.second.label}`}
      >
        {firstShare > 0 ? (
          <span className={`${styles.mixSeg} ${firstSeg}`} style={{ width: `${firstShare}%` }} />
        ) : null}
        {secondShare > 0 || mix.total === 0 ? (
          <span
            className={`${styles.mixSeg} ${styles.mixSegGray}`}
            style={{ width: mix.total === 0 ? "100%" : `${secondShare}%` }}
          />
        ) : null}
      </div>
      <ul className={styles.mixList}>
        {[mix.first, mix.second].map((item) => (
          <li key={item.label}>
            <Link href={item.href} className={styles.mixRow}>
              <span>
                <span className={styles.mixLabel}>{item.label}</span>
                <span className={styles.mixMeta}>
                  {mix.total > 0
                    ? `${Math.round((item.value / mix.total) * 100)}% of ${mix.total}`
                    : "No students in scope"}
                </span>
              </span>
              <span className={styles.mixValue}>
                {item.value}
                <ArrowUpRight aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

function JoinTrendPanel({
  points
}: {
  points: NonNullable<OperationsScoreboardModel["joinTrend"]>;
}) {
  return (
    <article className={styles.panel}>
      <header className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Student join trend</h2>
        <p className={styles.panelLead}>
          Canonical student joins across the last six India-time calendar months.
        </p>
      </header>
      <OperationsJoinTrendChart points={points} />
    </article>
  );
}

function formatActivityTime(value: string): string {
  return new Date(value).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

function RecentActivityPanel({ activity }: { activity: ScoreboardActivityItem[] }) {
  return (
    <article className={styles.panel}>
      <header className={styles.panelHeaderRow}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Recent activity</h2>
          <p className={styles.panelLead}>Authorized events from the canonical audit ledger.</p>
        </div>
        <Link href="/ops/activity" className={styles.panelLink}>
          View all activity <ArrowUpRight aria-hidden="true" />
        </Link>
      </header>
      {activity.length ? (
        <ul className={styles.activityList}>
          {activity.map((event) => (
            <li key={event.id}>
              <Link
                href={`/ops/activity?domain=${encodeURIComponent(event.domain)}`}
                className={styles.activityRow}
              >
                <span className={styles.activityIcon} aria-hidden="true">
                  <User />
                </span>
                <span className={styles.activityCopy}>
                  <strong className={styles.activityAction}>{event.action}</strong>
                  <span className={styles.activityMeta}>
                    {event.actor}
                    {event.target ? ` · ${event.target}` : ""}
                  </span>
                </span>
                <time className={styles.activityTime} dateTime={event.occurredAt}>
                  {formatActivityTime(event.occurredAt)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.panelEmpty}>No authorized activity matches this view.</p>
      )}
    </article>
  );
}

function AssignedRosterPanel({
  roster,
  rosterTotal
}: {
  roster: ScoreboardRosterItem[];
  rosterTotal: number | null;
}) {
  return (
    <article className={styles.panel}>
      <header className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>My students</h2>
        <p className={styles.panelLead}>
          Students currently assigned to you. Future Registry fields are not shown.
        </p>
      </header>
      {roster.length ? (
        <ul className={styles.rosterList}>
          {roster.map((student) => (
            <li key={student.id}>
              <Link href={`/ops/students/${student.id}`} className={styles.rosterRow}>
                <span>
                  <strong className={styles.rosterName}>{student.fullName}</strong>
                  <span className={styles.rosterMeta}>
                    <span className={styles.rosterBadge}>{student.profileStatus}</span>
                    <span className={styles.activityMeta}>
                      {student.studyLevel || "Study level not set"}
                    </span>
                  </span>
                </span>
                <span className={styles.rosterOpen}>Open workspace</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.panelEmpty}>No students are currently assigned to you.</p>
      )}
      {rosterTotal !== null && rosterTotal > roster.length ? (
        <Link href="/ops/students" className={styles.panelLink}>
          View all my students <ArrowUpRight aria-hidden="true" />
        </Link>
      ) : null}
    </article>
  );
}

function OperatePanel({
  links,
  title,
  description
}: {
  links: ScoreboardOperateLink[];
  title: string;
  description?: string;
}) {
  if (!links.length) return null;
  return (
    <section aria-label={title} className={styles.operateGrid}>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={styles.kpiCard}>
          <div className={styles.kpiBody}>
            <p className={styles.kpiLabel}>{link.label}</p>
            <p className={styles.kpiHint}>
              {description || `Open the current ${link.label.toLowerCase()} workspace.`}
            </p>
          </div>
          <span className={styles.kpiOpen}>
            Open {link.label.toLowerCase()} <ArrowUpRight aria-hidden="true" />
          </span>
        </Link>
      ))}
    </section>
  );
}

export function OperationsScoreboardView({
  model,
  displayName
}: {
  model: OperationsScoreboardModel;
  displayName: string;
}) {
  if (model.scope === "restricted") {
    return (
      <div className={styles.page} data-ops-scoreboard-pass="dash1">
        <ScoreboardWelcome displayName={displayName} title={model.title} description={model.description} />
        <OperatePanel links={model.operate} title="Authorized Operations views" />
      </div>
    );
  }

  const attention = model.metrics.find((metric) => metric.attention);
  const primaryMetrics = model.metrics.filter((metric) => !metric.attention);

  return (
    <div className={styles.page} data-ops-scoreboard-pass="dash1">
      <ScoreboardWelcome displayName={displayName} title={model.title} description={model.description} />
      <ScoreboardMetrics metrics={primaryMetrics} />
      {attention ? <AttentionMetric metric={attention} /> : null}

      <div className={styles.below}>
        {model.scope === "organization" && (model.joinTrend || model.premiumMix || model.assignmentMix) ? (
          <section aria-label="Scoreboard reporting" className={styles.reportGrid}>
            {model.joinTrend ? <JoinTrendPanel points={model.joinTrend} /> : null}
            <div className={styles.reportStack}>
              {model.premiumMix ? (
                <CompositionPanel
                  title="Premium composition"
                  description="Active Premium versus Standard."
                  mix={model.premiumMix}
                  tone="premium"
                />
              ) : null}
              {model.assignmentMix ? (
                <CompositionPanel
                  title="Assignment coverage"
                  description="Active assignment versus Unassigned."
                  mix={model.assignmentMix}
                  tone="assignment"
                />
              ) : null}
            </div>
          </section>
        ) : null}
        {model.scope === "organization" && model.activity ? (
          <RecentActivityPanel activity={model.activity} />
        ) : null}
        {model.scope === "assigned_students" && model.premiumMix ? (
          <section aria-label="Assigned student composition" className={styles.reportStack}>
            <CompositionPanel
              title="My student composition"
              description="Premium versus Standard within active assignments only."
              mix={model.premiumMix}
              tone="premium"
            />
          </section>
        ) : null}
        {model.roster ? <AssignedRosterPanel roster={model.roster} rosterTotal={model.rosterTotal} /> : null}
        {model.scope === "organization" && model.operate.length ? (
          <section aria-label="Operate" className={styles.operateRow}>
            {model.operate.map((link) => (
              <Link key={link.href} href={link.href} className={styles.operateChip}>
                {link.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </section>
        ) : null}
      </div>
    </div>
  );
}
