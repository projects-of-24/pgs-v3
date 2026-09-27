"use client";
/**
 * H4 — notification panel (Figma 19070:15287 text UI).
 *
 * Logic (owner lock 2026-09-27):
 *   logged out            → bell only: no badge, click does nothing
 *   logged in, 0 rows     → bell only: no badge, no dropdown
 *   logged in, N rows     → badge = unread count, dropdown lists the REAL rows
 *   lab fake login        → Figma fixtures (lab QC only, `labFixtures`)
 */
import { useEffect, useId, useRef, useState } from "react";
import { HEADER_NAV } from "@/features/shell/header-nav";
import type { StudentHeaderNotification } from "@/lib/student-experience";

type NotifRow = { id: string; title: string; time: string; href: string };

/** "1 hour ago" style, matching the Figma fixture copy. */
function relativeTime(iso: string, now = Date.now()): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const s = Math.max(0, Math.round((now - t) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
  const date = new Date(t);
  const day = date.getDate();
  const suffix = [11, 12, 13].includes(day % 100) ? "th" : ["th", "st", "nd", "rd"][day % 10] ?? "th";
  return `${day}${suffix} ${date.toLocaleString("en-GB", { month: "short" })} ${date.getFullYear()}`;
}

function toRows(notifications: StudentHeaderNotification[]): NotifRow[] {
  return notifications.map((n) => ({
    id: n.id,
    title: n.title,
    time: relativeTime(n.created_at),
    href: n.destination_path || HEADER_NAV.notifications.href
  }));
}

function fixtureRows(): NotifRow[] {
  return HEADER_NAV.notifications.fixtures.map((f, i) => ({
    id: `fx-${i}`,
    title: f.title,
    time: f.time,
    href: HEADER_NAV.notifications.href
  }));
}

function NotificationBadge({ unreadCount }: { unreadCount: number }) {
  const empty = unreadCount === 0;
  return (
    <span
      className={
        empty ? "header-notification-badge is-empty" : "header-notification-badge"
      }
    >
      {unreadCount}
    </span>
  );
}

export function NotificationNavDrop({
  signedIn = false,
  unreadCount = 0,
  notifications = [],
  labFixtures = false,
}: {
  signedIn?: boolean;
  unreadCount?: number;
  notifications?: StudentHeaderNotification[];
  /** Lab only: show the Figma fixture rows instead of real data. */
  labFixtures?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<NotifRow[]>(() =>
    labFixtures ? fixtureRows() : signedIn ? toRows(notifications) : []
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const interactive = signedIn && rows.length > 0;
  const badgeCount = !signedIn ? 0 : labFixtures ? rows.length : Math.min(unreadCount, rows.length);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="pgs-header-notif-wrap site-notification-dropdown" ref={wrapRef}>
      <button
        type="button"
        className="header-notification-wrapper"
        aria-label={HEADER_NAV.notifications.ariaLabel}
        aria-haspopup={interactive ? "dialog" : undefined}
        aria-expanded={interactive ? open : undefined}
        aria-controls={interactive ? panelId : undefined}
        aria-disabled={interactive ? undefined : true}
        onClick={() => {
          if (interactive) setOpen((value) => !value);
        }}
      >
        <img
          className="pgs-header-bell pgs-header-bell-desktop"
          src="/assets/img/figma-header/bell-desktop.svg"
          alt=""
          width={27}
          height={32}
          data-no-retina=""
        />
        <img
          className="pgs-header-bell pgs-header-bell-tablet"
          src="/assets/img/figma-header/bell-tablet.svg"
          alt=""
          width={32}
          height={38}
          data-no-retina=""
        />
        <img
          className="pgs-header-bell pgs-header-bell-mobile"
          src="/assets/img/figma-header/bell-mobile.svg"
          alt=""
          width={17}
          height={20}
          data-no-retina=""
        />
        <NotificationBadge unreadCount={badgeCount} />
      </button>

      <div
        id={panelId}
        className={
          open ? "pgs-header-notif-panel is-open" : "pgs-header-notif-panel"
        }
        role="dialog"
        aria-label={HEADER_NAV.notifications.ariaLabel}
      >
        <img
          src="/assets/img/figma-header/notif-corner.svg"
          alt=""
          width={24}
          height={24}
          className="pgs-header-notif-corner"
          data-no-retina=""
          aria-hidden="true"
        />
        <button
          type="button"
          className="pgs-header-notif-clear"
          onClick={() => setRows([])}
          disabled={rows.length === 0}
        >
          {HEADER_NAV.notifications.clearAllLabel}
        </button>

        {rows.length === 0 ? (
          <p className="pgs-header-notif-empty">No notifications</p>
        ) : (
          <ul className="pgs-header-notif-list">
            {rows.map((row) => (
              <li key={row.id}>
                <a
                  href={row.href}
                  className="pgs-header-notif-row"
                  onClick={() => setOpen(false)}
                >
                  <span className="pgs-header-notif-row__title">{row.title}</span>
                  <span className="pgs-header-notif-row__time">{row.time}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
