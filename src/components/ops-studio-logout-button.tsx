"use client";

import { useState, type AriaRole, type ReactNode } from "react";
import { signOutAndNavigate } from "@/lib/logout-navigation";

/** Ops/Studio staff logout — no /logout confirm page; lands on /studio/login. */
export function OpsStudioLogoutButton({
  className,
  children,
  busyLabel = "Logging out…",
  role
}: {
  className?: string;
  children: ReactNode;
  busyLabel?: string;
  role?: AriaRole;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setBusy(true);
    setError("");
    try {
      await signOutAndNavigate(fetch, window.location, "studio");
    } catch {
      setBusy(false);
      setError("Unable to log out. Please try again.");
    }
  }

  return (
    <>
      <button
        type="button"
        role={role}
        className={className}
        disabled={busy}
        onClick={() => void logout()}
      >
        {busy ? busyLabel : children}
      </button>
      {error ? (
        <span className="ops-studio-logout-error" role="alert">
          {error}
        </span>
      ) : null}
    </>
  );
}
