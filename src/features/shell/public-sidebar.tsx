"use client";

/**
 * T-1 — open toggle box (#sidebar) as React. Figma 19072:16102 (v2) + 19067:15187 (dropdown).
 *
 * Keeps the legacy hooks so nothing else changes:
 *   id="sidebar" .arrow-box.sidebar-box  → open/close + band positioning (legacy-page.tsx, globals.css)
 *   #close_Btn.flot-arrow-sidebar         → close control
 *   h5.fs-48.fnt-family / ul.ml-0 / .fit-icon-sidebar / .mt-30 → existing band type rules
 *   img[src*=profile-icon|heart-icon] + data-login-required     → guest gate (isGuestSidebarGateLink)
 * New look lives in pgs-sidebar.css under [data-pgs-sidebar="react"].
 */
import { useEffect, useRef, useState } from "react";
import {
  SIDEBAR_ICONS,
  SIDEBAR_ROWS,
  sidebarFooterLinks,
  type SidebarRow
} from "@/features/shell/sidebar-nav";
import "@/features/shell/pgs-sidebar.css";

export type PublicSidebarProps = {
  signedIn: boolean;
  name?: string | null;
  loginHref?: string;
  rows?: SidebarRow[];
};

export function PublicSidebar({ signedIn, name, loginHref = "/login", rows = SIDEBAR_ROWS }: PublicSidebarProps) {
  const [openRow, setOpenRow] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const displayName = (name || "").trim() || "User";

  // Close the dropdown when the panel closes or the click lands outside it.
  useEffect(() => {
    if (!openRow) return;
    const onDown = (e: MouseEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) setOpenRow(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openRow]);

  return (
    <div
      className="arrow-box sidebar-box"
      id="sidebar"
      data-pgs-sidebar="react"
      data-pgs-sidebar-variant={signedIn ? "signed" : "unsigned"}
      ref={rootRef}
    >
      <div className="d-flex justify-content-space align-items-start pgs-sidebar__head">
        <h5 className="pt-13 text-black fs-48 fnt-family text-start pgs-sidebar__welcome">
          Welcome <br />
          <span className="pgs-sidebar__name">{displayName}</span>
        </h5>
        <img
          src={SIDEBAR_ICONS.close}
          id="close_Btn"
          className="flot-arrow-sidebar"
          alt=""
          data-no-retina=""
        />
      </div>

      <ul className="ml-0 pgs-sidebar__list">
        {rows.map((row) => {
          const hasDrop = Boolean(row.children?.length);
          const isOpen = openRow === row.id;
          const dropId = `pgs-sidebar-drop-${row.id}`;
          return (
            <li key={row.id} className={`pgs-sidebar__row${hasDrop ? " has-drop" : ""}${isOpen ? " is-open" : ""}`}>
              {hasDrop ? (
                <a
                  href={row.href}
                  role="button"
                  className="pgs-sidebar__link pgs-sidebar__drop-toggle"
                  aria-expanded={isOpen}
                  aria-controls={dropId}
                  /* Capture phase: runs before legacy-page.tsx's click router on <main>, so the row toggles instead of navigating. */
                  onClickCapture={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenRow(isOpen ? null : row.id);
                  }}
                >
                  <span className="fit-icon-sidebar">
                    <img src={SIDEBAR_ICONS[row.icon]} alt="" data-no-retina="" />
                  </span>
                  <span className="pgs-sidebar__label">{row.label}</span>
                  <i className="bi bi-arrow-right-circle-fill pgs-sidebar__drop-glyph" aria-hidden="true" />
                </a>
              ) : (
                <a href={row.href} className="pgs-sidebar__link">
                  <span className="fit-icon-sidebar">
                    <img src={SIDEBAR_ICONS[row.icon]} alt="" data-no-retina="" />
                  </span>
                  <span className="pgs-sidebar__label">{row.label}</span>
                </a>
              )}
              {hasDrop ? (
                <ul id={dropId} className="pgs-sidebar__drop" hidden={!isOpen}>
                  {row.children!.map((child) => (
                    <li key={child.href}>
                      <a href={child.href} className="pgs-sidebar__drop-link">
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="d-flex justify-content-space mt-30 pgs-sidebar__foot">
        {sidebarFooterLinks(signedIn, loginHref).map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-black fs-20 pgs-sidebar__foot-link"
            data-login-required={link.loginRequired ? "true" : undefined}
          >
            <img src={SIDEBAR_ICONS[link.icon]} className="d-block mb-10" alt="" data-no-retina="" />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
