"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Calendar,
  FileText,
  MessageSquare,
  Target,
  Bell
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { OperationsNotification, StaffNotificationFilter } from "@/lib/operations-notifications";

const PAGE_SIZE = 10;

type IconTone = "blue" | "green" | "purple" | "orange" | "red" | "gray";

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

function notificationIcon(eventType: string): { Icon: typeof Bell; tone: IconTone } {
  const type = eventType.toLowerCase();
  if (type.includes("comment") || type.includes("mention")) {
    return { Icon: MessageSquare, tone: "blue" };
  }
  if (type.includes("document") || type.includes("course") || type.includes("submission")) {
    return { Icon: FileText, tone: "green" };
  }
  if (type.includes("webinar") || type.includes("event") || type.includes("calendar") || type.includes("schedule")) {
    return { Icon: Calendar, tone: "purple" };
  }
  if (type.includes("target")) {
    return { Icon: Target, tone: "orange" };
  }
  if (type.includes("alert") || type.includes("overdue") || type.includes("attention") || type.includes("scan")) {
    return { Icon: AlertTriangle, tone: "red" };
  }
  return { Icon: Bell, tone: "gray" };
}

function scopeLabel(item: OperationsNotification): string {
  if (item.studentId) {
    const name = item.studentName || "Student";
    return item.studentPgsCode ? `${name} ${item.studentPgsCode}` : name;
  }
  const type = item.eventType.toLowerCase();
  if (type.includes("target")) return "Targets";
  if (type.includes("webinar") || type.includes("event")) return "Webinar";
  if (type.includes("course") || type.includes("document")) return "Course Submission";
  if (type.includes("premium") || type.includes("account")) return "Account";
  return "Operations";
}

function matchesSearch(item: OperationsNotification, query: string): boolean {
  if (!query) return true;
  const haystack = [
    item.title,
    item.body,
    item.studentName,
    item.studentPgsCode,
    item.eventType,
    scopeLabel(item)
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function StudentContext({ item }: { item: OperationsNotification }) {
  if (!item.studentId) {
    return <span>{scopeLabel(item)}</span>;
  }
  return (
    <Link href={`/ops/students/${item.studentId}`} className="ops-notifications-scope-link">
      <span className="ops-notifications-scope-name">{item.studentName || "Unknown user"}</span>
      {item.studentPgsCode ? (
        <span className="ops-notifications-scope-code">{item.studentPgsCode}</span>
      ) : null}
    </Link>
  );
}

function NotificationActions({
  item,
  pending,
  onAction
}: {
  item: OperationsNotification;
  pending: boolean;
  onAction: (item: OperationsNotification, action: "read" | "archive", follow: boolean) => void;
}) {
  const unread = !item.readAt;
  return (
    <div className="ops-notifications-actions">
      {item.destinationPath ? (
        <button
          type="button"
          className="ops-notifications-btn ops-notifications-btn--primary"
          disabled={pending}
          onClick={() => onAction(item, "read", true)}
        >
          Open
        </button>
      ) : null}
      {unread ? (
        <button
          type="button"
          className="ops-notifications-btn ops-notifications-btn--secondary"
          disabled={pending}
          onClick={() => onAction(item, "archive", false)}
        >
          Archive
        </button>
      ) : null}
    </div>
  );
}

function NotificationIcon({ eventType }: { eventType: string }) {
  const { Icon, tone } = notificationIcon(eventType);
  return (
    <span className={`ops-notifications-icon ops-notifications-icon--${tone}`} aria-hidden="true">
      <Icon size={16} strokeWidth={2} />
    </span>
  );
}

export function OperationsNotificationInbox({
  initialItems,
  filter,
  counts
}: {
  initialItems: OperationsNotification[];
  filter: StaffNotificationFilter;
  counts: { all: number; unread: number; read: number };
}) {
  const [items, setItems] = useState(initialItems);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const searchId = "ops-notifications-search";

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => matchesSearch(item, q));
  }, [items, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE) || 1);
  const safePage = Math.min(page, pageCount);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);
  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + PAGE_SIZE, filtered.length);

  async function act(item: OperationsNotification, action: "read" | "archive", follow: boolean) {
    setPendingId(item.id);
    setMessage(action === "archive" ? "Archiving notification…" : "Updating notification…");
    const response = await fetch(`/api/staff/notifications/${item.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action })
    });
    const result = (await response.json()) as { message?: string; destination?: string | null };
    setPendingId(null);
    if (!response.ok) {
      setMessage(result.message ?? "Unable to update the notification.");
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }
    if (action === "archive") {
      setItems((current) => current.filter((value) => value.id !== item.id));
      setMessage("Notification archived.");
    } else {
      setItems((current) =>
        current.map((value) =>
          value.id === item.id ? { ...value, readAt: value.readAt ?? new Date().toISOString() } : value
        )
      );
      setMessage("Notification marked read.");
    }
    if (follow && result.destination) {
      window.location.assign(result.destination);
      return;
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  function goToPage(next: number) {
    setPage(Math.min(Math.max(1, next), pageCount));
  }

  const pageNumbers = Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 7);
  const pillActive = (pill: "all" | "unread" | "read") =>
    filter === pill || (pill === "all" && filter === "recent");

  return (
    <div className="ops-notifications-inbox" data-operations-notifications data-filter={filter}>
      <div className="ops-notifications-toolbar">
        <nav className="ops-notifications-pills" aria-label="Notification filters">
          {(
            [
              ["all", "All", counts.all],
              ["unread", "Unread", counts.unread],
              ["read", "Read", counts.read]
            ] as const
          ).map(([pill, label, count]) => {
            const active = pillActive(pill);
            return (
              <Link
                key={pill}
                href={pill === "all" ? "/ops/notifications?view=all" : `/ops/notifications?view=${pill}`}
                className={
                  active
                    ? "ops-notifications-pill ops-notifications-pill--active"
                    : "ops-notifications-pill"
                }
                aria-current={active ? "page" : undefined}
              >
                {label}
                <span className="ops-notifications-pill-count">({count})</span>
              </Link>
            );
          })}
        </nav>

        <div className="ops-notifications-tools">
          <div className="ops-notifications-search">
            <label className="ops-notifications-visually-hidden" htmlFor={searchId}>
              Search notifications
            </label>
            <input
              id={searchId}
              type="search"
              className="ops-notifications-search-input"
              placeholder="Search notifications..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <p
        className="ops-notifications-status"
        ref={statusRef}
        role="status"
        tabIndex={-1}
      >
        {message}
      </p>

      {pageItems.length ? (
        <>
          <div className="ops-notifications-desktop">
            <div className="ops-notifications-table-scroll" tabIndex={0} role="region" aria-label="Notifications table">
              <table className="ops-notifications-table">
                <thead>
                  <tr>
                    <th scope="col">Notification</th>
                    <th scope="col">Student / Scope</th>
                    <th scope="col">Received</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((item) => (
                    <tr key={item.id} className={item.readAt ? undefined : "ops-notifications-row--unread"}>
                      <td>
                        <div className="ops-notifications-cell-main">
                          <NotificationIcon eventType={item.eventType} />
                          <div>
                            <strong className="ops-notifications-title">{item.title}</strong>
                            {item.body ? (
                              <p className="ops-notifications-body">{item.body}</p>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td>
                        <StudentContext item={item} />
                      </td>
                      <td className="ops-notifications-received">
                        <time dateTime={item.createdAt}>{formatTime(item.createdAt)}</time>
                      </td>
                      <td>
                        <span
                          className={
                            item.readAt
                              ? "ops-notifications-badge ops-notifications-badge--read"
                              : "ops-notifications-badge ops-notifications-badge--unread"
                          }
                        >
                          {item.readAt ? "Read" : "Unread"}
                        </span>
                      </td>
                      <td>
                        <NotificationActions
                          item={item}
                          pending={pendingId === item.id}
                          onAction={(value, action, follow) => void act(value, action, follow)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ul className="ops-notifications-mobile">
            {pageItems.map((item) => (
              <li className="ops-notifications-card" key={item.id}>
                <div className="ops-notifications-card-top">
                  <div className="ops-notifications-cell-main">
                    <NotificationIcon eventType={item.eventType} />
                    <div>
                      <strong className="ops-notifications-title">{item.title}</strong>
                      {item.body ? <p className="ops-notifications-body">{item.body}</p> : null}
                    </div>
                  </div>
                  <span
                    className={
                      item.readAt
                        ? "ops-notifications-badge ops-notifications-badge--read"
                        : "ops-notifications-badge ops-notifications-badge--unread"
                    }
                  >
                    {item.readAt ? "Read" : "Unread"}
                  </span>
                </div>
                <dl className="ops-notifications-card-meta">
                  <div>
                    <dt>Student / Scope</dt>
                    <dd>
                      <StudentContext item={item} />
                    </dd>
                  </div>
                  <div>
                    <dt>Received</dt>
                    <dd>
                      <time dateTime={item.createdAt}>{formatTime(item.createdAt)}</time>
                    </dd>
                  </div>
                </dl>
                <NotificationActions
                  item={item}
                  pending={pendingId === item.id}
                  onAction={(value, action, follow) => void act(value, action, follow)}
                />
              </li>
            ))}
          </ul>

          <nav className="ops-notifications-pagination" aria-label="Notification pagination">
            <p>
              Showing {showingFrom} to {showingTo} of {filtered.length} notifications
            </p>
            <div className="ops-notifications-pagination-controls">
              <button
                type="button"
                className="ops-notifications-page-btn"
                disabled={safePage <= 1}
                aria-label="Previous page"
                onClick={() => goToPage(safePage - 1)}
              >
                ‹
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  className={
                    number === safePage
                      ? "ops-notifications-page-btn ops-notifications-page-btn--active"
                      : "ops-notifications-page-btn"
                  }
                  aria-label={`Page ${number}`}
                  aria-current={number === safePage ? "page" : undefined}
                  onClick={() => goToPage(number)}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                className="ops-notifications-page-btn"
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
        <div className="ops-notifications-empty">
          <h3>No notifications in this view</h3>
          <p>
            {search.trim()
              ? "No notifications match your search."
              : "Actionable Operations updates addressed to you will appear here."}
          </p>
        </div>
      )}
    </div>
  );
}
