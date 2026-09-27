"use client";

/**
 * SR-1 — search results card (owned). Figma `search bar UI` 19075:13657.
 * One UI on all bands: white card under the field, title + faint type label.
 * Sizes per band live in pgs-search-results.css. No fetching here (SR-2).
 */
import type { SearchResultRow } from "@/features/shell/search-results-fixtures";
import "@/features/shell/pgs-search-results.css";

export type SearchResultsProps = {
  results: SearchResultRow[];
  open: boolean;
  activeIndex?: number;
  listId?: string;
  onSelect?: (row: SearchResultRow) => void;
};

export function SearchResults({
  results,
  open,
  activeIndex = -1,
  listId = "pgs-search-results",
  onSelect
}: SearchResultsProps) {
  if (!open || results.length === 0) return null;
  return (
    <ul className="pgs-search-results" id={listId} role="listbox">
      {results.map((row, index) => (
        <li
          key={row.id}
          role="option"
          aria-selected={index === activeIndex}
          className={`pgs-search-results__row${
            index === activeIndex ? " is-active" : ""
          }`}
        >
          <a
            className="pgs-search-results__link"
            href={row.href}
            onClick={onSelect ? () => onSelect(row) : undefined}
          >
            <span className="pgs-search-results__title">{row.title}</span>
            <span className="pgs-search-results__type">{row.type}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
