"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, KeyRound, LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OpsStudioLogoutButton } from "@/components/ops-studio-logout-button";
import { operationsFirstName, operationsInitials } from "@/lib/operations-presentation";

export function OperationsActorMenu({
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
  const headerName = operationsFirstName(displayName);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="ops-system-topbar-profile-wrap">
      <button
        type="button"
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="ops-system-topbar-profile"
        onClick={() => setOpen((value) => !value)}
      >
        <Avatar className="ops-system-topbar-avatar-face">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt="" className="ops-system-topbar-avatar-image" />
          ) : null}
          <AvatarFallback>{operationsInitials(displayName)}</AvatarFallback>
        </Avatar>
        <span className="ops-system-topbar-profile-text">
          <strong>{headerName}</strong>
          <span>{roleLabel}</span>
        </span>
        <ChevronDown aria-hidden="true" className="ops-system-topbar-profile-chevron" />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Account menu"
          className="ops-chrome-account-menu"
        >
          <div className="ops-chrome-account-menu-label">
            <span className="ops-chrome-account-menu-name">{displayName}</span>
            <span className="ops-chrome-account-menu-role">{roleLabel}</span>
          </div>
          <div className="ops-chrome-account-menu-sep" role="separator" />
          <Link
            href="/studio/profile"
            role="menuitem"
            className="ops-chrome-account-menu-item"
            onClick={() => setOpen(false)}
          >
            <UserRound aria-hidden="true" />
            My Profile
          </Link>
          <Link
            href="/studio/change-password"
            role="menuitem"
            className="ops-chrome-account-menu-item"
            onClick={() => setOpen(false)}
          >
            <KeyRound aria-hidden="true" />
            Change Password
          </Link>
          <div className="ops-chrome-account-menu-sep" role="separator" />
          <OpsStudioLogoutButton
            role="menuitem"
            className="ops-chrome-account-menu-item ops-chrome-account-logout"
            busyLabel="Logging out…"
          >
            <LogOut aria-hidden="true" />
            Logout
          </OpsStudioLogoutButton>
        </div>
      ) : null}
    </div>
  );
}
