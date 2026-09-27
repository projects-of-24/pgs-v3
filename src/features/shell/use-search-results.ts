"use client";

/**
 * SR-2a — typing state for the search field: query → rows (lab index),
 * open/close, arrow keys, Enter, Esc, outside click. No fetch (SR-2b).
 * Pattern: WAI-ARIA combobox (as in cmdk / Algolia autocomplete).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { searchIndex } from "@/features/shell/search-index";
import type { PublicSearchResult } from "@/features/shell/search-contract";

export function useSearchResults(rootRef: React.RefObject<HTMLElement | null>) {
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<PublicSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rowsRef = useRef<PublicSearchResult[]>([]);
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const update = useCallback((value: string) => {
    setQuery(value);
    const next = searchIndex(value);
    setRows(next);
    setOpen(next.length > 0);
    setActiveIndex(-1);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent | React.KeyboardEvent) => {
      const list = rowsRef.current;
      if (event.key === "Escape") {
        close();
        return;
      }
      if (!list.length) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setOpen(true);
        setActiveIndex((i) => (i + 1) % list.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setOpen(true);
        setActiveIndex((i) => (i <= 0 ? list.length - 1 : i - 1));
      } else if (event.key === "Enter") {
        setActiveIndex((i) => {
          if (i >= 0 && list[i]) {
            event.preventDefault();
            window.location.href = list[i].url;
          }
          return i;
        });
      }
    },
    [close]
  );

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(event.target as Node)) close();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, close, rootRef]);

  return { query, rows, open, activeIndex, update, close, onKeyDown, setOpen };
}
