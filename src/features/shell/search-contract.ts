/**
 * Public search — FE contract (mirrors the backend, do not drift).
 *
 * Backend today: `src/lib/public-search.ts` → `/Search/autocomplete?q=&limit=`
 *   returns `{ results: SearchResult[] }`, SearchResult = { id, type, label, url },
 *   type ∈ program | course | event, matched with `ilike` on the DB column
 *   `search_document` of published rows.
 *
 * Figma `search bar UI` 19075:13657 also shows `page` and `service` rows.
 * SR-3 widens the backend union + adds a curated route index server-side.
 * Until then the lab index (`search-index.ts`) carries fake rows in THIS shape,
 * with a `search_document` string that stands in for the DB column, so
 * SR-2b is a fetch swap and the fake rows double as the backend checklist.
 */

export type PublicSearchResultType =
  | "program"
  | "course"
  | "event"
  | "page"    // SR-3: public route (countriesUSA, finance …)
  | "service"; // SR-3: program-family / service page (studyAbroad, USMLERotation …)

export type PublicSearchResult = {
  id: string;
  type: PublicSearchResultType;
  label: string;
  url: string;
};

export type PublicSearchResponse = { results: PublicSearchResult[]; message?: string };
