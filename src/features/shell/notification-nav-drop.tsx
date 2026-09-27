"use client";

/**
 * H4 — notification panel (Figma 19070:15287 text UI).
 * Fixtures only; full notifications domain later.
 */
import { useEffect, useId, useRef, useState } from "react";
import { HEADER_NAV } from "@/features/shell/header-nav";

type NotifRow = (typeof HEADER_NAV.notifications.fixtures)[number];

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
  unreadCount = 0,
}: {
  unreadCount?: number;
}) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<NotifRow[]>(() => [
    ...HEADER_NAV.notifications.fixtures,
  ]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const badgeCount = open ? rows.length : unreadCount || rows.length;

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
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
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
              <li key={`${row.title}-${row.time}`}>
                <a
                  href={HEADER_NAV.notifications.href}
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
