"use client";

/**
 * S-R — page strip under the header as React (owner GO AHEAD 2026-09-27).
 * Same DOM / ids / classes as the `buildPublicStripHtml` string so the
 * LOCKED chrome CSS (globals / owned split) and legacy-page.tsx wiring
 * (#toggleBtn ↔ #sidebar, login popup, gated links) keep working untouched.
 *
 * Dropped on purpose: the Hello Aspirant avatar box (owner removed it; the
 * string only kept it hidden). Sidebar and search mount inline — no portals.
 * `public-strip.ts` (string) stays for live pages until each flips at H-R;
 * this file is named `-react` only because that `.ts` owns the bare import path.
 */
import { useRef } from "react";
import { PublicSidebar, type PublicSidebarProps } from "@/features/shell/public-sidebar";
import { SearchResults } from "@/features/shell/search-results";
import { useSearchResults } from "@/features/shell/use-search-results";
import type { UnivMeetPublic } from "@/features/shell/univmeet-slots";
import { UNIVMEET_FALLBACK_CHIPS } from "@/features/shell/univmeet-slots";
import "@/features/shell/public-strip.css";

export type PublicStripProps = {
  univMeet?: UnivMeetPublic | { href: string; chips: Array<{ day: string; monthLine: string }> };
  signedIn: boolean;
  name?: string | null;
  loginHref?: string;
  sidebarRows?: PublicSidebarProps["rows"];
};

function StripSearch() {
  const rootRef = useRef<HTMLDivElement>(null);
  const s = useSearchResults(rootRef);
  const listId = "pgs-search-results-strip";
  return (
    <div className="pgs-search search-box" ref={rootRef}>
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
      <SearchResults results={s.rows} open={s.open} activeIndex={s.activeIndex} listId={listId} />
    </div>
  );
}

export function PublicStrip({ univMeet, signedIn, name, loginHref = "/Login", sidebarRows }: PublicStripProps) {
  const chips = (univMeet?.chips?.length ? univMeet.chips : UNIVMEET_FALLBACK_CHIPS).slice(0, 2);
  const meetHref = univMeet?.href || "/Programsfull";
  return (
    <>
      <div className="overlay" id="overlay" />

      <div className="pgs-login-popup-overlay" id="pgsLoginPopup">
        <div
          className="pgs-login-popup-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pgsLoginPopupTitle"
        >
          <button type="button" className="pgs-login-popup-close" aria-label="Close">
            ×
          </button>
          <div className="pgs-login-popup-icon">
            <i className="bi bi-lock-fill" />
          </div>
          <h4 id="pgsLoginPopupTitle">Login Required</h4>
          <p>Please login to access this option.</p>
          <a href={loginHref} className="pgs-login-popup-btn">
            Login Now
          </a>
        </div>
      </div>

      <section className="pt-1 pb-0 mobile-frame-sidebar">
        <div className="container-fluid px-4">
          <PublicSidebar signedIn={signedIn} name={name} loginHref={loginHref} rows={sidebarRows} />

          <div className="row g-4" style={{ alignItems: "flex-start", justifyContent: "space-evenly" }}>
            <div className="col-xl-1 col-lg-1">
              <div className="arrow-box" id="toggleBtn">
                <i className="bi bi-arrow-right-square-fill" />
              </div>
            </div>

            {/* Hello Aspirant avatar box removed (owner). */}

            <div className="col-xl-5 mt-0 col-lg-5 d-flex align-items-center mobile-tags-scrolling" />

            <div
              className="col-xl-4 justify-content-end col-lg-4 d-flex gap-7 mobile-none"
              style={{ width: "37%" }}
            >
              <div className="d-flex align-items-start gap-3 pgs-strip-tools">
                <a href={meetHref} className="pgs-univmeet" id="univMeet">
                  <h5 className="pgs-univmeet__label">#univMeet</h5>
                  {chips.map((c, i) => (
                    <div className="pgs-univmeet__chip" key={`${c.day}-${c.monthLine}-${i}`}>
                      <span className="pgs-univmeet__day">{c.day}</span>
                      <span className="pgs-univmeet__month">{c.monthLine}</span>
                    </div>
                  ))}
                </a>
                <StripSearch />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
