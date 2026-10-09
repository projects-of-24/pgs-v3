"use client";

import { useEffect } from "react";

/**
 * WS-CHROME-FIX QC — lock html/body like Ops `operations-session`
 * so Students registry scrolls inside the table, not the browser page.
 */
export function WorkspaceSessionLock() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("workspace-session");
    return () => {
      root.classList.remove("workspace-session");
    };
  }, []);

  return null;
}
