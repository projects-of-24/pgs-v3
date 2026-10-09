"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OperationsStaffSearch } from "@/components/operations-staff-search";
import { signOutAndNavigate } from "@/lib/logout-navigation";
import { operationsFirstName, operationsInitials } from "@/lib/operations-presentation";
import styles from "./workspace-header.module.css";
import "@/app/admin/operations.css";

/**
 * WS-HOME-1 + WS-CHROME-FIX QC — Ops/Studio top bar:
 * centered search popup (student → Open Desk) · Ops-size profile · /workspace/profile · logout → /workspace/login
 */
export function WorkspaceHeader({
  displayName,
  roleLabel,
  avatarUrl = null
}: {
  displayName: string;
  roleLabel: string;
  avatarUrl?: string | null;
}) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [logoutBusy, setLogoutBusy] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const headerName = operationsFirstName(displayName);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
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

  async function logout() {
    setLogoutBusy(true);
    setLogoutError("");
    try {
      await signOutAndNavigate(fetch, window.location, "workspace");
    } catch {
      setLogoutBusy(false);
      setLogoutError("Unable to log out. Please try again.");
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.leftSlot} aria-hidden="true" />

        <div className={styles.centerSlot}>
          <OperationsStaffSearch
            surface="workspace"
            triggerClassName={styles.searchTrigger}
            placeholder="Search students by name, email, PGS ID..."
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.bell} aria-label="Notifications (coming soon)" disabled>
            <Bell aria-hidden="true" />
          </button>

          <div ref={rootRef} className={styles.profileWrap}>
            <button
              type="button"
              className={styles.profile}
              aria-label="Open account menu"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              <Avatar className={styles.avatar}>
                {avatarUrl ? <AvatarImage src={avatarUrl} alt="" className={styles.avatarImage} /> : null}
                <AvatarFallback className={styles.avatarFallback}>{operationsInitials(displayName)}</AvatarFallback>
              </Avatar>
              <span className={styles.profileText}>
                <strong>{headerName}</strong>
                <span>{roleLabel}</span>
              </span>
              <ChevronDown aria-hidden="true" className={styles.chevron} />
            </button>

            {open ? (
              <div id={menuId} role="menu" aria-label="Account menu" className={styles.menu}>
                <div className={styles.menuLabel}>
                  <span className={styles.menuName}>{displayName}</span>
                  <span className={styles.menuRole}>{roleLabel}</span>
                </div>
                <div className={styles.menuSep} role="separator" />
                <Link
                  href="/workspace/profile"
                  role="menuitem"
                  className={styles.menuItem}
                  onClick={() => setOpen(false)}
                >
                  <UserRound aria-hidden="true" />
                  My Profile
                </Link>
                <div className={styles.menuSep} role="separator" />
                <button
                  type="button"
                  role="menuitem"
                  className={`${styles.menuItem} ${styles.menuLogout}`}
                  disabled={logoutBusy}
                  onClick={() => void logout()}
                >
                  <LogOut aria-hidden="true" />
                  {logoutBusy ? "Logging out…" : "Logout"}
                </button>
                {logoutError ? (
                  <p className={styles.menuError} role="alert">
                    {logoutError}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
