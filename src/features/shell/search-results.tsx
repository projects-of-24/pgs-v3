"use client";

/**
 * SR-1 — search results card (owned). Figma `search bar UI` 19075:13657.
 * One UI on all bands: white card under the field, label + faint type.
 * Sizes per band in pgs-search-results.css. Rows = backend contract shape.
 */
import type { PublicSearchResult } from "@/features/shell/search-contract";
import "@/features/shell/pgs-search-results.css";

export type SearchResultsProps = {
  results: PublicSearchResult[];
  open: boolean;
  activeIndex?: number;
  listId?: string;
  onSelect?: (row: PublicSearchResult) => void;
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
          id={`${listId}-${index}`}
          role="option"
          aria-selected={index === activeIndex}
          className={`pgs-search-results__row${index === activeIndex ? " is-active" : ""}`}
        >
          <a
            className="pgs-search-results__link"
            href={row.url}
            onClick={onSelect ? () => onSelect(row) : undefined}
          >
            <span className="pgs-search-results__title">{row.label}</span>
            <span className="pgs-search-results__type">{row.type}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
