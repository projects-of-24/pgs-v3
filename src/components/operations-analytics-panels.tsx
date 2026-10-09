import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  CalendarDays,
  CalendarRange,
  CircleGauge,
  FileStack,
  Layers,
  LayoutTemplate,
  Monitor,
  Sparkles,
  Tag,
  Target,
  TriangleAlert,
  UserCheck,
  UserMinus,
  UsersRound,
  Zap
} from "lucide-react";
import { OperationsDistributionChart } from "@/components/operations-analytics-chart";
import {
  ANALYTICS_PERIOD_LABELS,
  analyticsPeriodQuery,
  analyticsShare,
  type AnalyticsCatalogBlock,
  type AnalyticsCountLink,
  type OperationsAnalyticsModel
} from "@/lib/operations-analytics";
import styles from "./operations-analytics.module.css";

type PanelTheme = "purple" | "blue" | "green" | "red" | "orange" | "pink" | "cyan";

const themeClass: Record<PanelTheme, string> = {
  purple: styles.themePurple,
  blue: styles.themeBlue,
  green: styles.themeGreen,
  red: styles.themeRed,
  orange: styles.themeOrange,
  pink: styles.themePink,
  cyan: styles.themeCyan
};

const chartFill: Record<"purple" | "blue", string> = {
  purple: "#6b3fa0",
  blue: "#2f5fcc"
};

function MetricLink({
  href,
  label,
  value,
  detail,
  tint,
  icon: Icon
}: {
  href: string;
  label: string;
  value: number;
  detail?: string;
  tint: string;
  icon: typeof UsersRound;
}) {
  return (
    <li>
      <Link href={href} className={styles.metricCard}>
        <span className={`${styles.metricIcon} ${tint}`} aria-hidden="true">
          <Icon />
        </span>
        <p className={styles.metricLabel}>{label}</p>
        <p className={styles.metricValue}>{value}</p>
        {detail ? <p className={styles.metricDetail}>{detail}</p> : null}
        <span className={styles.metricOpen}>
          Open Registry <ArrowUpRight aria-hidden="true" />
        </span>
      </Link>
    </li>
  );
}

function PanelHead({
  title,
  lead,
  icon: Icon
}: {
  title: string;
  lead?: string;
  icon: typeof UsersRound;
}) {
  return (
    <header className={styles.panelHead}>
      <span className={styles.panelIcon} aria-hidden="true">
        <Icon />
      </span>
      <div className={styles.panelHeadCopy}>
        <h3 className={styles.panelTitle}>{title}</h3>
        {lead ? <p className={styles.panelLead}>{lead}</p> : null}
      </div>
    </header>
  );
}

function StageList({ items }: { items: AnalyticsCountLink[] }) {
  const max = Math.max(...items.map((item) => item.count), 1);

  return (
    <ul className={styles.stageList}>
      {items.map((item) => (
        <li key={item.key}>
          <Link href={item.href} className={styles.stageRow}>
            <span className={styles.stageLabel}>{item.label}</span>
            <span className={styles.stageTrack} aria-hidden="true">
              <span className={styles.stageFill} style={{ width: `${Math.max(8, (item.count / max) * 100)}%` }} />
            </span>
            <span className={styles.stageValue}>
              {item.count}
              <ArrowUpRight aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function CountList({
  title,
  empty,
  items,
  lead,
  theme,
  icon,
  variant = "rows"
}: {
  title: string;
  empty: string;
  items: AnalyticsCountLink[];
  lead?: string;
  theme: PanelTheme;
  icon: typeof UsersRound;
  variant?: "rows" | "stages";
}) {
  return (
    <article className={`${styles.panel} ${themeClass[theme]}`}>
      <PanelHead title={title} lead={lead} icon={icon} />
      {items.length ? (
        variant === "stages" ? (
          <StageList items={items} />
        ) : (
          <ul className={styles.rowList}>
            {items.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={styles.rowLink}>
                  <span className={styles.rowLabel}>{item.label}</span>
                  <span className={styles.rowValue}>
                    {item.count}
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className={styles.emptyBox}>
          <FileStack aria-hidden="true" />
          <p className={styles.empty}>{empty}</p>
        </div>
      )}
    </article>
  );
}

function CatalogCounts({
  title,
  block,
  featuredLabel,
  theme,
  icon
}: {
  title: string;
  block: AnalyticsCatalogBlock;
  featuredLabel?: string;
  theme: PanelTheme;
  icon: typeof UsersRound;
}) {
  return (
    <article className={`${styles.panel} ${themeClass[theme]}`}>
      <PanelHead title={title} icon={icon} />
      <ul className={styles.rowList}>
        <li>
          <Link href={block.hrefPublished} className={styles.rowLink}>
            <span className={styles.rowLabel}>Published</span>
            <strong className={styles.countPill}>{block.published}</strong>
          </Link>
        </li>
        <li>
          <Link href={block.hrefDraft} className={styles.rowLink}>
            <span className={styles.rowLabel}>Draft</span>
            <strong className={styles.countPill}>{block.draft}</strong>
          </Link>
        </li>
        {featuredLabel && block.hrefFeatured ? (
          <li>
            <Link href={block.hrefFeatured} className={styles.rowLink}>
              <span className={styles.rowLabel}>{featuredLabel}</span>
              <strong className={styles.countPill}>{block.featured ?? 0}</strong>
            </Link>
          </li>
        ) : null}
        {block.hrefUpcoming ? (
          <li>
            <Link href={block.hrefUpcoming} className={styles.rowLink}>
              <span className={styles.rowLabel}>Upcoming</span>
              <strong className={styles.countPill}>{block.upcoming ?? 0}</strong>
            </Link>
          </li>
        ) : null}
        {block.hrefPast ? (
          <li>
            <Link href={block.hrefPast} className={styles.rowLink}>
              <span className={styles.rowLabel}>Past</span>
              <strong className={styles.countPill}>{block.past ?? 0}</strong>
            </Link>
          </li>
        ) : null}
      </ul>
    </article>
  );
}

function handlerInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : "?";
}

export function OperationsAnalyticsView({ model }: { model: OperationsAnalyticsModel }) {
  const total = model.students.total;
  const joinedPeriod = model.period !== "current";

  return (
    <section
      data-analytics-scope={model.scope}
      data-analytics-period={model.period}
      data-ops-analytics-pass="dash2"
      className={styles.page}
      aria-labelledby="ops-analytics-heading"
    >
      <div className={styles.header}>
        <div className={styles.headerCopy}>
          <h2 id="ops-analytics-heading" className={styles.title}>
            Analytics
          </h2>
          <p className={styles.lead}>{model.grain}</p>
        </div>
        <form className={styles.periodForm} method="get" action="/ops">
          <label className={styles.periodLabel}>
            Time period
            <select className={styles.periodSelect} defaultValue={model.period} name="period">
              {Object.entries(ANALYTICS_PERIOD_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button className={styles.periodButton} type="submit">
            Apply period
          </button>
        </form>
      </div>

      <ul className={styles.metricGrid}>
        <MetricLink
          href={model.students.hrefs.total}
          label={joinedPeriod ? "Students in period" : "Total students"}
          value={model.students.total}
          tint={styles.tintBlue}
          icon={UsersRound}
        />
        <MetricLink
          href={model.students.hrefs.premium}
          label="Premium"
          value={model.students.premium}
          detail={`${analyticsShare(model.students.premium, total)} of this set`}
          tint={styles.tintPurple}
          icon={Sparkles}
        />
        <MetricLink
          href={model.students.hrefs.standard}
          label="Standard"
          value={model.students.standard}
          detail={`${analyticsShare(model.students.standard, total)} of this set`}
          tint={styles.tintOrange}
          icon={CircleGauge}
        />
        {model.scope === "organization" ? (
          <>
            <MetricLink
              href={model.students.hrefs.assigned}
              label="Assigned"
              value={model.students.assigned}
              tint={styles.tintGreen}
              icon={UserCheck}
            />
            <MetricLink
              href={model.students.hrefs.unassigned}
              label="Unassigned"
              value={model.students.unassigned}
              detail="No active assignment"
              tint={styles.tintPink}
              icon={UserMinus}
            />
            <MetricLink
              href={model.students.hrefs.premium_awaiting_mentor}
              label="Premium awaiting mentor"
              value={model.students.premiumAwaitingMentor}
              tint={styles.tintOrange}
              icon={TriangleAlert}
            />
          </>
        ) : null}
      </ul>

      <div className={styles.twoCol}>
        <article className={`${styles.panel} ${styles.themePurple}`}>
          <PanelHead
            title="Stream distribution"
            lead="Canonical Mini CRM stream. Empty stream is omitted."
            icon={LayoutTemplate}
          />
          <OperationsDistributionChart
            caption="Student counts by stream"
            points={model.streams}
            fill={chartFill.purple}
          />
        </article>
        <article className={`${styles.panel} ${styles.themeBlue}`}>
          <PanelHead title="Target year" lead="Canonical Mini CRM target year." icon={CalendarDays} />
          <OperationsDistributionChart
            caption="Student counts by target year"
            points={model.targetYears}
            fill={chartFill.blue}
          />
        </article>
      </div>

      <div className={styles.twoCol}>
        <CountList
          title="CRM stage (Students)"
          empty="No CRM stages in this set."
          items={model.stages}
          theme="green"
          icon={Layers}
          variant="stages"
        />
        <CountList
          title="Manual CRM tags"
          empty="No manual tags in this set. Derived facts such as Premium are not tags."
          items={model.tags}
          theme="red"
          icon={Tag}
        />
      </div>

      <div className={model.handlers.length || model.work ? styles.threeCol : styles.twoCol}>
        <article className={`${styles.panel} ${styles.themeOrange}`}>
          <PanelHead
            title="Cohorts"
            lead="Stream + target year + current Premium state. Click a row to open the matching Registry filters."
            icon={UsersRound}
          />
          {model.cohorts.length ? (
            <ul className={styles.rowList}>
              {model.cohorts.map((cohort) => (
                <li key={`${cohort.stream}-${cohort.targetYear}-${cohort.plan}`}>
                  <Link href={cohort.href} className={styles.rowLink}>
                    <span className={styles.rowLabel}>{cohort.label}</span>
                    <span className={styles.rowValue}>
                      <span className={styles.countPill}>{cohort.count}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyBox}>
              <FileStack aria-hidden="true" />
              <p className={styles.empty}>No stream + year cohorts yet.</p>
            </div>
          )}
        </article>

        {model.handlers.length ? (
            <article className={`${styles.panel} ${styles.themePurple}`}>
            <PanelHead
              title="Handler workload"
              lead="Active assignments only. This is workload, not a staff ranking."
              icon={Zap}
            />
            <ul className={styles.rowList}>
              {model.handlers.map((handler) => (
                <li key={handler.id}>
                  <Link href={handler.href} className={styles.rowLink}>
                    <span className={styles.handlerRow}>
                      <span className={styles.handlerAvatar} aria-hidden="true">
                        {handlerInitial(handler.name)}
                      </span>
                      <span>
                        <span className={styles.rowLabel}>{handler.name}</span>
                        <span className={styles.rowMeta}>{handler.premium} Premium</span>
                      </span>
                    </span>
                    <span className={styles.rowValue}>
                      <span className={styles.countPill}>{handler.students}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ) : null}

        {model.work ? (
          <article className={`${styles.panel} ${styles.themeGreen}`}>
            <PanelHead
              title="Staff targets"
              lead="Canonical Staff Targets queue. Not a productivity score."
              icon={Target}
            />
            <div className={styles.workGrid}>
              <Link href={model.work.hrefOpen} className={styles.rowLink}>
                <span className={styles.rowLabel}>Open</span>
                <strong className={`${styles.countPill} ${styles.countPillOpen}`}>{model.work.open}</strong>
              </Link>
              <Link href={model.work.hrefDueSoon} className={styles.rowLink}>
                <span className={styles.rowLabel}>Due soon</span>
                <strong className={styles.countPlain}>{model.work.dueSoon}</strong>
              </Link>
              <Link href={model.work.hrefOverdue} className={styles.rowLink}>
                <span className={styles.rowLabel}>Overdue</span>
                <strong className={`${styles.countPill} ${styles.countPillWarn}`}>{model.work.overdue}</strong>
              </Link>
              <Link href={model.work.hrefCompleted} className={styles.rowLink}>
                <span className={styles.rowLabel}>Completed recently</span>
                <strong className={styles.countPlain}>{model.work.completedRecently}</strong>
              </Link>
            </div>
          </article>
        ) : null}
      </div>

      {model.catalog ? (
        <section className={styles.section} aria-label="Catalog">
          <h3 className={styles.sectionTitle}>Catalog</h3>
          <div className={styles.catalogGrid}>
            <CatalogCounts
              title="Courses"
              block={model.catalog.courses}
              featuredLabel="Featured / Top picks"
              theme="purple"
              icon={BookOpen}
            />
            <CatalogCounts
              title="Programs"
              block={model.catalog.programs}
              featuredLabel="Most Wanted"
              theme="blue"
              icon={FileStack}
            />
            <CatalogCounts title="Events" block={model.catalog.events} theme="green" icon={CalendarRange} />
            <CatalogCounts title="Universities" block={model.catalog.universities} theme="pink" icon={Building2} />
          </div>
        </section>
      ) : null}

      {model.pages ? (
        <article className={`${styles.panel} ${styles.themeCyan}`}>
          <PanelHead
            title="CMS pages"
            lead="Canonical page status. Page-view popularity is not available."
            icon={Monitor}
          />
          <div className={styles.workGrid}>
            <Link href={model.pages.href} className={styles.rowLink}>
              <span className={styles.rowLabel}>Published</span>
              <strong className={styles.countPill}>{model.pages.published}</strong>
            </Link>
            <Link href={model.pages.href} className={styles.rowLink}>
              <span className={styles.rowLabel}>Draft</span>
              <strong className={styles.countPill}>{model.pages.draft}</strong>
            </Link>
            <Link href={model.pages.href} className={styles.rowLink}>
              <span className={styles.rowLabel}>Unpublished</span>
              <strong className={styles.countPill}>{model.pages.unpublished}</strong>
            </Link>
          </div>
        </article>
      ) : null}

      {model.period !== "current" ? (
        <p className={styles.clearLink}>
          <Link href={analyticsPeriodQuery("current")}>Clear period filter</Link> to return to current-state
          analytics.
        </p>
      ) : null}
    </section>
  );
}
