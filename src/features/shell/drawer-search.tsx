"use client";

/**
 * SR-2a — drawer search field + results card (React). Same markup/classes as
 * before (locked look, decision 37); `search-control` kept as autocomplete hook.
 */
import { useRef } from "react";
import { SearchResults } from "@/features/shell/search-results";
import { useSearchResults } from "@/features/shell/use-search-results";

export function DrawerSearch() {
  const rootRef = useRef<HTMLDivElement>(null);
  const s = useSearchResults(rootRef);
  const listId = "pgs-search-results-drawer";
  return (
    <div className="pgs-drawer-search search-box" ref={rootRef}>
      <div className="pgs-search__group">
        <span className="pgs-search__icon">
          <i className="bi bi-search" />
        </span>
        <input
          type="search"
          className="pgs-search__input search-control"
          placeholder="Search"
          autoComplete="off"
          aria-label="Search programs, courses, and events"
          role="combobox"
          aria-expanded={s.open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={s.activeIndex >= 0 ? `${listId}-${s.activeIndex}` : undefined}
          value={s.query}
          onChange={(e) => s.update(e.target.value)}
          onFocus={() => s.rows.length && s.setOpen(true)}
          onKeyDown={s.onKeyDown}
        />
      </div>
      <SearchResults
        results={s.rows}
        open={s.open}
        activeIndex={s.activeIndex}
        listId={listId}
      />
    </div>
  );
}
