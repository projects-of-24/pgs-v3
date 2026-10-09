import Link from "next/link";
import { OperationsRegistryAssignmentActions } from "@/components/operations-registry-assignment-actions";
import { OperationsTableFrame } from "@/components/operations-table-frame";
import { crmStageLabel } from "@/lib/operations-student-crm";
import {
  registryEmptyCopy,
  registryEmptyState,
  registryHref,
  registryPlanTone,
  registryVisibleColumns,
  type NormalizedRegistryQuery,
  type RegistryMentorOption,
  type StudentRegistryColumnKey,
  type StudentRegistryResult,
  type StudentRegistryRow
} from "@/lib/operations-student-registry";

const COLUMN_LABELS: Record<StudentRegistryColumnKey, string> = {
  pgsCode: "PGS ID",
  student: "Student",
  studyLevel: "Study level",
  stream: "Stream",
  stage: "Stage",
  plan: "Plan",
  mentor: "Mentor",
  joined: "Joined",
  completion: "Completion",
  open: "Open",
  actions: "Actions"
};

function cellValue(row: StudentRegistryRow, column: StudentRegistryColumnKey): string {
  if (column === "pgsCode") return row.pgsCode;
  if (column === "student") return row.fullName;
  if (column === "studyLevel") return row.studyLevel || "—";
  if (column === "stream") return row.stream || "—";
  if (column === "stage") return crmStageLabel(row.stage);
  if (column === "plan") return row.plan;
  if (column === "mentor") return row.mentorName;
  if (column === "joined") return row.joinedAt;
  if (column === "completion") return row.completion;
  if (column === "actions") return "";
  return row.canOpenWorkspace ? "Open workspace" : "Open student";
}

function StatusBadge({
  label,
  tone
}: {
  label: string;
  tone: "accent" | "default" | "success" | "danger" | "muted";
}) {
  return <span className={`ops-stu-badge ops-stu-badge--${tone}`}>{label}</span>;
}

function OpenCell({ row }: { row: StudentRegistryRow }) {
  return (
    <Link className="ops-stu-open" href={`/ops/students/${row.id}`}>
      {row.canOpenWorkspace ? "Open workspace" : "Open student"}
    </Link>
  );
}

function rowAllowsStudentPreview(
  row: Pick<StudentRegistryRow, "mentorId">,
  canPreviewStudent: boolean,
  previewOrgWide: boolean,
  previewActorId: string | null
): boolean {
  if (!canPreviewStudent) return false;
  if (previewOrgWide) return true;
  return Boolean(previewActorId && row.mentorId === previewActorId);
}

function TableCell({
  row,
  column,
  handlers,
  canManage,
  canPreviewStudent,
  previewConfigured,
  previewOrgWide,
  previewActorId,
  linkName
}: {
  row: StudentRegistryRow;
  column: StudentRegistryColumnKey;
  handlers: RegistryMentorOption[];
  canManage: boolean;
  canPreviewStudent: boolean;
  previewConfigured: boolean;
  previewOrgWide: boolean;
  previewActorId: string | null;
  linkName: boolean;
}) {
  if (column === "pgsCode") {
    return linkName ? (
      <Link className="ops-registry-pgs-code" href={`/ops/students/${row.id}`}>
        {row.pgsCode}
      </Link>
    ) : (
      <span className="ops-registry-pgs-code">{row.pgsCode}</span>
    );
  }
  if (column === "student") {
    return linkName ? (
      <Link className="ops-registry-student-name" href={`/ops/students/${row.id}`}>
        {row.fullName}
      </Link>
    ) : (
      <strong className="ops-registry-student-name">{row.fullName}</strong>
    );
  }
  if (column === "plan") {
    return <StatusBadge label={row.plan} tone={registryPlanTone(row.plan) === "accent" ? "accent" : "muted"} />;
  }
  if (column === "stage") {
    const label = crmStageLabel(row.stage);
    return <StatusBadge label={label} tone={label.toLowerCase() === "active" ? "success" : "muted"} />;
  }
  if (column === "completion") {
    return <StatusBadge label={row.completion} tone={row.completion === "Complete" ? "success" : "danger"} />;
  }
  if (column === "open") {
    return <OpenCell row={row} />;
  }
  if (column === "actions") {
    return (
      <OperationsRegistryAssignmentActions
        canManage={canManage}
        canPreviewStudent={rowAllowsStudentPreview(row, canPreviewStudent, previewOrgWide, previewActorId)}
        previewConfigured={previewConfigured}
        handlers={handlers}
        row={{
          id: row.id,
          fullName: row.fullName,
          plan: row.plan,
          mentorId: row.mentorId,
          mentorName: row.mentorName
        }}
      />
    );
  }
  return <>{cellValue(row, column)}</>;
}

function resultSummary(result: StudentRegistryResult): string {
  if (result.error) return "The registry could not be loaded.";
  if (!result.totalCount) return "0 students";
  const start = (result.page - 1) * result.pageSize + 1;
  const end = Math.min(result.page * result.pageSize, result.totalCount);
  return `Showing ${start}–${end} of ${result.totalCount} students`;
}

function pageWindow(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const start = Math.max(1, Math.min(current - 2, total - 4));
  return Array.from({ length: 5 }, (_, index) => start + index).filter((page) => page <= total);
}

export function OperationsStudentRegistry({
  result,
  query,
  showMentor,
  showJoined,
  showOpen,
  mentorScoped,
  handlers = [],
  canManageAssignments = false,
  canPreviewStudent = false,
  previewConfigured = true,
  previewOrgWide = false,
  previewActorId = null
}: {
  result: StudentRegistryResult;
  query: NormalizedRegistryQuery;
  showMentor: boolean;
  showJoined: boolean;
  showOpen: boolean;
  mentorScoped: boolean;
  handlers?: RegistryMentorOption[];
  canManageAssignments?: boolean;
  canPreviewStudent?: boolean;
  previewConfigured?: boolean;
  previewOrgWide?: boolean;
  previewActorId?: string | null;
}) {
  const showActions = canManageAssignments || canPreviewStudent;
  const columns = registryVisibleColumns({ showMentor, showOpen, showJoined, showActions });
  const pageCount = Math.max(1, Math.ceil(result.totalCount / result.pageSize) || 1);
  const previousPage = result.page > 1 ? result.page - 1 : null;
  const nextPage = result.page < pageCount && result.totalCount > 0 ? result.page + 1 : null;
  const empty = registryEmptyState({
    error: result.error,
    totalCount: result.totalCount,
    query,
    mentorScoped
  });
  const emptyCopy = empty ? registryEmptyCopy(empty, query) : null;
  const pages = pageWindow(result.page, pageCount);
  const start = result.totalCount ? (result.page - 1) * result.pageSize + 1 : 0;
  const end = Math.min(result.page * result.pageSize, result.totalCount);

  return (
    <div className="ops-stu-registry">
      <div className="ops-stu-registry-toolbar">
        <p className="ops-registry-status" aria-live="polite">
          {emptyCopy ?? resultSummary(result)}
        </p>
      </div>
      {canPreviewStudent && !previewConfigured ? (
        <p id="student-preview-unavailable" className="ops-team-warning" role="status">
          View as Student is not configured on this deployment.
        </p>
      ) : null}
      <div className="ops-registry-desktop ops-stu-table-wrap">
        <OperationsTableFrame minimumWidth={1120} ariaLabel="Scrollable student registry">
          <caption className="ops:sr-only">Authorized student registry</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col">
                  {COLUMN_LABELS[column]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column} data-column={column}>
                    <TableCell
                      row={row}
                      column={column}
                      handlers={handlers}
                      canManage={canManageAssignments}
                      canPreviewStudent={canPreviewStudent}
                      previewConfigured={previewConfigured}
                      previewOrgWide={previewOrgWide}
                      previewActorId={previewActorId}
                      linkName={showOpen}
                    />
                  </td>
                ))}
              </tr>
            ))}
            {!result.rows.length && (
              <tr>
                <td className="ops-system-empty-cell" colSpan={columns.length}>
                  {emptyCopy}
                </td>
              </tr>
            )}
          </tbody>
        </OperationsTableFrame>
      </div>

      <div className="ops-registry-mobile">
        {result.rows.length ? (
          <ul className="ops-registry-card-list">
            {result.rows.map((row) => (
              <li key={row.id}>
                <article className="ops-registry-card" aria-labelledby={`registry-student-${row.id}`}>
                  {showOpen ? (
                    <h2 className="ops-registry-student-name" id={`registry-student-${row.id}`}>
                      <Link className="ops:no-underline" href={`/ops/students/${row.id}`}>
                        {row.fullName}
                      </Link>
                    </h2>
                  ) : (
                    <h2 className="ops-registry-student-name" id={`registry-student-${row.id}`}>
                      {row.fullName}
                    </h2>
                  )}
                  <dl className="ops-registry-card-fields">
                    {columns
                      .filter((column) => column !== "student" && column !== "open" && column !== "actions")
                      .map((column) => (
                        <div key={column}>
                          <dt>{COLUMN_LABELS[column]}</dt>
                          <dd>
                            {column === "plan" || column === "completion" || column === "stage" || column === "pgsCode" ? (
                              <TableCell
                                row={row}
                                column={column}
                                handlers={handlers}
                                canManage={canManageAssignments}
                                canPreviewStudent={canPreviewStudent}
                                previewConfigured={previewConfigured}
                                previewOrgWide={previewOrgWide}
                                previewActorId={previewActorId}
                                linkName={showOpen}
                              />
                            ) : (
                              cellValue(row, column)
                            )}
                          </dd>
                        </div>
                      ))}
                  </dl>
                  {showOpen ? (
                    <p className="ops-registry-card-open">
                      <OpenCell row={row} />
                    </p>
                  ) : null}
                  {showActions ? (
                    <OperationsRegistryAssignmentActions
                      canManage={canManageAssignments}
                      canPreviewStudent={rowAllowsStudentPreview(
                        row,
                        canPreviewStudent,
                        previewOrgWide,
                        previewActorId
                      )}
                      previewConfigured={previewConfigured}
                      handlers={handlers}
                      row={{
                        id: row.id,
                        fullName: row.fullName,
                        plan: row.plan,
                        mentorId: row.mentorId,
                        mentorName: row.mentorName
                      }}
                    />
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ops-system-empty-cell">{emptyCopy}</p>
        )}
      </div>

      <nav className="ops-stu-pagination" aria-label="Student registry pagination">
        <p>
          {result.totalCount
            ? `${start}–${end} of ${result.totalCount}`
            : "0 students"}{" "}
          · {result.pageSize} per page
        </p>
        <div className="ops-stu-pagination-controls">
          {previousPage ? (
            <Link
              className="ops-stu-page-btn"
              href={registryHref({ ...query, page: previousPage }, { includePage: true, includeView: true })}
              aria-label="Previous page"
            >
              ‹
            </Link>
          ) : (
            <span className="ops-stu-page-btn" aria-disabled="true">
              ‹
            </span>
          )}
          {pages.map((page) =>
            page === result.page ? (
              <span key={page} className="ops-stu-page-btn ops-stu-page-btn--active" aria-current="page">
                {page}
              </span>
            ) : (
              <Link
                key={page}
                className="ops-stu-page-btn"
                href={registryHref({ ...query, page }, { includePage: true, includeView: true })}
                aria-label={`Page ${page}`}
              >
                {page}
              </Link>
            )
          )}
          {nextPage ? (
            <Link
              className="ops-stu-page-btn"
              href={registryHref({ ...query, page: nextPage }, { includePage: true, includeView: true })}
              aria-label="Next page"
            >
              ›
            </Link>
          ) : (
            <span className="ops-stu-page-btn" aria-disabled="true">
              ›
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}
