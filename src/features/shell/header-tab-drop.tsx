"use client";

/**
 * Shared desk tab dropdown — mounts owned .pgs-header-drop (H1c).
 * variant: premium = yellow Figma drop · panel = white Figma card under tab.
 */
import { useEffect, useId, useRef, useState } from "react";
import type { HeaderNavLink } from "@/features/shell/header-nav";

type HeaderTabDropProps = {
  label: string;
  items: readonly HeaderNavLink[];
  liClassName?: string;
  /** premium = yellow · panel = white (CV Ready / CV Medical per Figma) */
  variant?: "premium" | "panel";
};

export function HeaderTabDrop({
  label,
  items,
  liClassName = "",
  variant = "premium",
}: HeaderTabDropProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
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

  const dropClass = [
    "pgs-header-drop",
    variant === "panel"
      ? "pgs-header-drop--figma-panel"
      : "pgs-header-drop--premium",
    open ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={["pgs-header-drop-wrap", liClassName].filter(Boolean).join(" ")}
      ref={wrapRef}
    >
      <button
        type="button"
        className="tab-button text-black"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      <ul id={menuId} className={dropClass} role="menu">
        {items.map((item) => (
          <li key={`${item.label}-${item.href}`} role="none">
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
    </li>
  );
}
