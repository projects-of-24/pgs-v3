/**
 * SR-2a — LAB search index (fake context, backend shape).
 * Rows are `PublicSearchResult` + `search_document` (stand-in for the DB
 * column the real `ilike` query matches). Ranking mirrors what SR-2b/SR-3
 * should do server-side: label prefix > label contains > document contains.
 * FLUSH at SR-2b/SR-3: every row here is a case the backend must answer.
 */
import type { PublicSearchResult } from "@/features/shell/search-contract";

export type SearchIndexRow = PublicSearchResult & { search_document: string };

const doc = (label: string, tags: string[]) => [label, ...tags].join(" ").toLowerCase();
const row = (
  id: string,
  type: PublicSearchResult["type"],
  label: string,
  url: string,
  tags: string[]
): SearchIndexRow => ({ id, type, label, url, search_document: doc(label, tags) });

export const SEARCH_INDEX: SearchIndexRow[] = [
  // events — real table `events` (search_document exists) — fixture rows
  row("ev-1", "event", "study abroad live with ANJAY", "/preview/purpleevents-lite", ["#UK", "#AUS", "webinar", "live", "masters"]),
  row("ev-2", "event", "How to get PhD approved? Lets discuss", "/preview/purpleevents-lite", ["phd", "research", "webinar"]),
  row("ev-3", "event", "Surgery Week Scotland for MBBS students", "/preview/purpleevents-lite", ["surgery", "scotland", "mbbs", "medical", "#UK"]),
  // programs — real table `programs` — fixture rows
  row("pr-harvard", "program", "HARVARD-USA internsship", "/preview/programs-courses", ["harvard", "internship", "usa", "summer"]),
  row("pr-sem", "program", "Semester Abroad for students", "/preview/programs-courses", ["semester", "exchange", "abroad"]),
  row("pr-cv", "program", "explorePrograms", "/cvreadyprogram", ["cv ready", "programs", "certificate"]),
  // courses — real table `courses` — fixture rows
  row("co-ielts", "course", "IELTS crash course", "/preview/programs-courses", ["ielts", "english", "test prep"]),
  row("co-sop", "course", "SOP & LOR writing lab", "/preview/programs-courses", ["sop", "lor", "statement of purpose", "essay"]),
  // pages — SR-3 curated route index (no table) — real routes
  row("pg-usa", "page", "countriesUSA", "/countriesusa", ["usa", "america", "study in usa", "f1"]),
  row("pg-uk", "page", "countriesUK", "/countriesuk", ["uk", "england", "london", "study in uk"]),
  row("pg-aus", "page", "countriesAUS", "/countriesaus", ["australia", "aus", "sydney", "melbourne"]),
  row("pg-can", "page", "countriesCanada", "/countriescanada", ["canada", "toronto", "pgwp"]),
  row("pg-ger", "page", "countriesGermany", "/countriesgermany", ["germany", "berlin", "free tuition", "europe"]),
  row("pg-nz", "page", "countriesNZ", "/countriesnz", ["new zealand", "nz", "auckland"]),
  row("pg-explore", "page", "exploreCountries", "/explorecountries", ["countries", "destinations", "where to study"]),
  row("pg-fin", "page", "finance", "/finance", ["loan", "education loan", "budget", "cost"]),
  row("pg-sch", "page", "scholarship", "/scholarship", ["scholarship", "funding", "grant", "merit"]),
  row("pg-about", "page", "about #purpleGuide", "/about", ["about", "team", "counsellors"]),
  // services — SR-3 curated route index — real routes
  row("sv-abroad", "service", "studyAbroad", "/explorecountries", ["counselling", "admission", "study abroad"]),
  row("sv-usmle-rot", "service", "USMLERotation", "/usmlerotation", ["usmle", "rotation", "clinical", "medical", "usa"]),
  row("sv-usmle", "service", "#purplePremium USMLE", "/purpleusmle", ["usmle", "premium", "medical", "step 1"]),
  row("sv-plab", "service", "#purplePremium PLAB", "/purpleplab", ["plab", "premium", "medical", "gmc", "uk"]),
  row("sv-amc", "service", "#purplePremium AMC", "/purpleamc", ["amc", "premium", "medical", "australia"]),
  row("sv-stem", "service", "#purplePremium STEM, MBA & Other Paths", "/purplenonmedical", ["stem", "mba", "engineering", "premium"]),
  row("sv-uni", "service", "uniTieUp", "/unitieup", ["university", "tie-up", "partner", "admission"]),
  row("sv-docs", "service", "upload your docs", "/upload_your_doc", ["documents", "upload", "passport", "transcript"])
];

/** Same limits as the backend: min 2 chars, max 8 rows (public-search.ts). */
export function searchIndex(query: string, limit = 8): PublicSearchResult[] {
  const q = query.trim().toLowerCase().slice(0, 80);
  if (q.length < 2) return [];
  const scored: Array<{ score: number; row: SearchIndexRow }> = [];
  for (const r of SEARCH_INDEX) {
    const label = r.label.toLowerCase();
    let score = 0;
    if (label.startsWith(q)) score = 3;
    else if (label.includes(q)) score = 2;
    else if (r.search_document.includes(q)) score = 1;
    if (score) scored.push({ score, row: r });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ row: { id, type, label, url } }) => ({ id, type, label, url }));
}
