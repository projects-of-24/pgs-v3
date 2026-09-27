"use client";

/** @deprecated S-R (2026-09-27): use `<PublicStrip/>` from public-strip-react.tsx; delete once no page imports this. */

/**
 * T-1 lab helper. The strip is still an HTML string (DSIH) until H-R; the lab
 * swaps the string #sidebar for `<div data-pgs-sidebar-slot>` and this
 * portals the React sidebar into that slot so the existing positioning
 * (absolute inside the strip) is unchanged. Delete at H-R.
 */
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { PublicSidebar, type PublicSidebarProps } from "@/features/shell/public-sidebar";

const noop = () => () => {};
const getSlot = () => document.querySelector<HTMLElement>("[data-pgs-sidebar-slot]");
const getServerSlot = () => null;

export function PublicSidebarPortal(props: PublicSidebarProps) {
  const slot = useSyncExternalStore(noop, getSlot, getServerSlot);
  if (!slot) return null;
  return createPortal(<PublicSidebar {...props} />, slot);
}
