"use client";

/**
 * SR-1 lab helper. The desktop strip is still an HTML string (DSIH) until
 * H-R, so the React results card portals itself into `.pgs-strip-tools
 * .pgs-search` after mount. Delete when the strip becomes React.
 */
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { SearchResults } from "@/features/shell/search-results";
import type { SearchResultRow } from "@/features/shell/search-results-fixtures";

const noop = () => () => {};
const getHost = () =>
  document.querySelector<HTMLElement>(".pgs-strip-tools .pgs-search");
const getServerHost = () => null;

export function SearchResultsStripPortal({ results }: { results: SearchResultRow[] }) {
  const host = useSyncExternalStore(noop, getHost, getServerHost);
  if (!host) return null;
  return createPortal(
    <SearchResults results={results} open listId="pgs-search-results-strip" />,
    host
  );
}
