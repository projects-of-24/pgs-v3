"use client";

import { useEffect, useState } from "react";

type HeartToggleProps = {
  initialSaved?: boolean;
  /** Controlled saved state (preferred when persisting to server). */
  saved?: boolean;
  className?: string;
  /** May return a Promise — uncontrolled mode only flips after success. */
  onToggle?: (saved: boolean) => void | boolean | Promise<void | boolean>;
  disabled?: boolean;
};

export function HeartToggle({
  initialSaved = false,
  saved: savedProp,
  className = "",
  onToggle,
  disabled = false,
}: HeartToggleProps) {
  const [internalSaved, setInternalSaved] = useState(initialSaved);
  const [busy, setBusy] = useState(false);
  const controlled = savedProp !== undefined;
  const saved = controlled ? savedProp : internalSaved;

  useEffect(() => {
    if (!controlled) setInternalSaved(initialSaved);
  }, [initialSaved, controlled]);

  return (
    <button
      type="button"
      className={`cardbox-heart border-0 bg-transparent p-0${saved ? " is-liked" : ""}${className ? ` ${className}` : ""}`}
      aria-label={saved ? "Unsave" : "Save"}
      aria-pressed={saved}
      disabled={disabled || busy}
      onClick={() => {
        if (busy) return;
        const next = !saved;
        if (!onToggle) {
          if (!controlled) setInternalSaved(next);
          return;
        }
        const result = onToggle(next);
        if (result != null && typeof (result as Promise<unknown>).then === "function") {
          setBusy(true);
          void Promise.resolve(result)
            .then((ok) => {
              if (!controlled && ok !== false) setInternalSaved(next);
            })
            .finally(() => setBusy(false));
          return;
        }
        if (!controlled && result !== false) setInternalSaved(next);
      }}
    >
      <i className={saved ? "bi bi-heart-fill" : "bi bi-heart"} />
    </button>
  );
}
