"use client";

/** @deprecated S-R (2026-09-27): use `<PublicStrip/>` from public-strip-react.tsx; delete once no page imports this. */

/**
 * SR-2a lab helper. The desktop strip search field is still inside the DSIH
 * strip string until H-R, so this component listens to that input and
 * portals the React results card into `.pgs-strip-tools .pgs-search`.
 * Delete when the strip becomes React (then use DrawerSearch's pattern).
 */
import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { SearchResults } from "@/features/shell/search-results";
import { useSearchResults } from "@/features/shell/use-search-results";

const noop = () => () => {};
const getHost = () =>
  document.querySelector<HTMLElement>(".pgs-strip-tools .pgs-search");
const getServerHost = () => null;

export function SearchResultsStripPortal() {
  const host = useSyncExternalStore(noop, getHost, getServerHost);
  const rootRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    rootRef.current = host;
  }, [host]);
  const s = useSearchResults(rootRef);
  const { update, onKeyDown, setOpen } = s;
  const rowsLen = s.rows.length;

  useEffect(() => {
    if (!host) return;
    const input = host.querySelector<HTMLInputElement>(".pgs-search__input");
    if (!input) return;
    const onInput = () => update(input.value);
    const onKey = (e: KeyboardEvent) => onKeyDown(e);
    const onFocus = () => rowsLen && setOpen(true);
    input.addEventListener("input", onInput);
    input.addEventListener("keydown", onKey);
    input.addEventListener("focus", onFocus);
    input.setAttribute("aria-controls", "pgs-search-results-strip");
    return () => {
      input.removeEventListener("input", onInput);
      input.removeEventListener("keydown", onKey);
      input.removeEventListener("focus", onFocus);
    };
  }, [host, update, onKeyDown, setOpen, rowsLen]);

  if (!host) return null;
  return createPortal(
    <SearchResults
      results={s.rows}
      open={s.open}
      activeIndex={s.activeIndex}
      listId="pgs-search-results-strip"
    />,
    host
  );
}
