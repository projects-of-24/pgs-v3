"use client";

/**
 * H2 — #studyAbroad desk dropdown (owned .pgs-header-drop).
 * Items are stubs until owner pages exist.
 */
import { useEffect, useId, useRef, useState } from "react";
import { HEADER_NAV } from "@/features/shell/header-nav";

export function StudyAbroadNavDrop() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

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
    <div className="pgs-header-study-wrap pgs-header-drop-wrap" ref={wrapRef}>
      <button
        type="button"
        className="pgs-header-study-abroad"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {HEADER_NAV.studyAbroad.label}
      </button>
      <ul
        id={menuId}
        className={
          open
            ? "pgs-header-drop pgs-header-drop--figma-panel pgs-header-drop--study is-open"
            : "pgs-header-drop pgs-header-drop--figma-panel pgs-header-drop--study"
        }
        role="menu"
      >
        {HEADER_NAV.studyAbroad.items.map((item) => (
          <li key={item.href} role="none">
            <a
              href={item.href}
              role="menuitem"
              data-stub={item.stub ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
