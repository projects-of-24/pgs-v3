"use client";

/**
 * H3 — #me “Upcoming” panel (Figma 19070:15287).
 * Fixtures only; CMS picks + audit later.
 */
import { useEffect, useId, useRef, useState } from "react";
import { HEADER_NAV } from "@/features/shell/header-nav";

export function MeNavDrop() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

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
    <div className="pgs-header-me-wrap" ref={wrapRef}>
      <button
        type="button"
        className="pgs-header-me"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {HEADER_NAV.me.label}
      </button>
      <div
        id={panelId}
        className={
          open ? "pgs-header-me-panel is-open" : "pgs-header-me-panel"
        }
        role="dialog"
        aria-label={HEADER_NAV.me.title}
      >
        <p className="pgs-header-me-panel__title">{HEADER_NAV.me.title}</p>
        <ul className="pgs-header-me-panel__list">
          {HEADER_NAV.me.fixtures.map((row) => (
            <li key={`${row.index}-${row.href}`}>
              <a
                href={row.href}
                className="pgs-header-me-row"
                data-stub={row.stub ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                <span
                  className={`pgs-header-me-badge pgs-header-me-badge--${row.badgeTone}`}
                >
                  {row.badge}
                </span>
                <span className="pgs-header-me-index">{row.index}</span>
                <span className="pgs-header-me-row__title">{row.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
