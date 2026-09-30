"use client";

/**
 * H5 — logged out: login button · logged in: avatar → Logout panel (Figma 19073:13354).
 */
import { useEffect, useId, useRef, useState } from "react";
import { HEADER_NAV } from "@/features/shell/header-nav";
import { signOutAndNavigate } from "@/lib/logout-navigation";

export function AuthNavControl({
  loginHref,
  avatarUrl = null,
  labFakeAuth = false,
}: {
  loginHref: string;
  avatarUrl?: string | null;
  /** Preview lab: Logout returns to logged-out lab without real session */
  labFakeAuth?: boolean;
}) {
  const loggedIn = Boolean(avatarUrl);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
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

  if (!loggedIn) {
    return (
      <a href={loginHref} className="pgs-header-login">
        {HEADER_NAV.login.label}
      </a>
    );
  }

  async function onLogout() {
    if (busy) return;
    setBusy(true);
    if (labFakeAuth) {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full page reload on purpose after sign-out (clears auth state)
      window.location.assign("/preview/header?loggedOut=1");
      return;
    }
    try {
      await signOutAndNavigate();
    } catch {
      setBusy(false);
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- full page reload on purpose after sign-out (clears auth state)
      window.location.assign("/logout");
    }
  }

  return (
    <div className="pgs-header-auth-wrap" ref={wrapRef}>
      <button
        type="button"
        className="pgs-header-avatar"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <img
          src={avatarUrl!}
          alt=""
          width={44}
          height={44}
          data-no-retina=""
        />
      </button>
      <div
        id={panelId}
        className={
          open ? "pgs-header-logout-panel is-open" : "pgs-header-logout-panel"
        }
        role="menu"
      >
        <button
          type="button"
          className="pgs-header-logout"
          role="menuitem"
          disabled={busy}
          onClick={() => {
            setOpen(false);
            void onLogout();
          }}
        >
          <img
            src="/assets/img/figma-header/logout.svg"
            alt=""
            width={22}
            height={22}
            className="pgs-header-logout__icon"
            data-no-retina=""
          />
          <span>{HEADER_NAV.logout.label}</span>
        </button>
      </div>
    </div>
  );
}
