/**
 * Desk bar (H1–H5) + H6a iPad compact bar / hamburger drawer extras.
 * Owner side margin on bar (40px) — do not revert.
 * Drawer open/close = LegacyPage (pgs-header-menu / btn-toggle-mobile).
 */
import { HEADER_NAV } from "@/features/shell/header-nav";
import { AuthNavControl } from "@/features/shell/auth-nav-control";
import { CvMedicalNavDrop } from "@/features/shell/cv-medical-nav-drop";
import { CvReadyNavDrop } from "@/features/shell/cv-ready-nav-drop";
import { MeNavDrop } from "@/features/shell/me-nav-drop";
import { NotificationNavDrop } from "@/features/shell/notification-nav-drop";
import { PremiumNavDrop } from "@/features/shell/premium-nav-drop";
import { StudyAbroadNavDrop } from "@/features/shell/study-abroad-nav-drop";
import { SearchResults } from "@/features/shell/search-results";
import type { SearchResultRow } from "@/features/shell/search-results-fixtures";
import type { UnivMeetPublic } from "@/features/shell/univmeet-slots";
import { UNIVMEET_FALLBACK_CHIPS } from "@/features/shell/univmeet-slots";
/* DSIH / legacy bar helpers + H6a drawer reset (via breakpoints @import) */
import "@/features/shell/legacy-header-breakpoints.css";
/* React header recipes only — OWN conversion barrel stays UNLINKED (OWN-UNLINK) */
import "@/features/shell/public-header.css";
import "@/features/shell/pgs-univmeet-search.css";

export type PublicHeaderProps = {
  loginHref?: string;
  avatarUrl?: string | null;
  unreadCount?: number;
  /** Preview lab fake logged-in — Logout toggles lab state only */
  labFakeAuth?: boolean;
  univMeet?: UnivMeetPublic | { href: string; chips: Array<{ day: string; monthLine: string }> };
  /** SR-1 lab only: rows to show open under the drawer search field (fixtures). SR-2 wires live results. */
  labSearchResults?: SearchResultRow[];
};

function BrandMark() {
  return (
    <svg
      className="default-logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 176.12 27.04"
      width={173}
      height={32}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <text
        fill="#231f20"
        fontFamily="Roboto, Arial, Helvetica, sans-serif"
        fontSize="24"
        fontWeight="400"
        transform="translate(0 20.53)"
      >
        #purpleGuide
      </text>
      <text
        fill="#231f20"
        fontFamily="Roboto, Arial, Helvetica, sans-serif"
        fontSize="12"
        fontWeight="400"
        transform="translate(143.78 11.98)"
      >
        .study
      </text>
    </svg>
  );
}

function DrawerUnivMeet({
  univMeet,
}: {
  univMeet?: PublicHeaderProps["univMeet"];
}) {
  const chips = (
    univMeet?.chips?.length ? univMeet.chips : UNIVMEET_FALLBACK_CHIPS
  ).slice(0, 2);
  const href = univMeet?.href || "/Programsfull";

  return (
    <a
      href={href}
      className="pgs-drawer-univmeet"
      style={{ textDecoration: "none", cursor: "pointer" }}
    >
      <span className="pgs-drawer-univmeet__label">#univMeet</span>
      {chips.map((chip) => (
        <span
          key={`${chip.day}-${chip.monthLine}`}
          className="pgs-drawer-univmeet__date"
          aria-hidden="true"
        >
          <span className="pgs-drawer-univmeet__day">{chip.day}</span>
          <span className="pgs-drawer-univmeet__month">{chip.monthLine}</span>
        </span>
      ))}
    </a>
  );
}

function DrawerLinkList({
  items,
  variant,
}: {
  items: readonly { label: string; href: string; stub?: boolean }[];
  /** Match desk: premium yellow · panel white · study white+underline */
  variant: "premium" | "panel" | "study";
}) {
  return (
    <ul className={`pgs-drawer-sub pgs-drawer-sub--${variant}`}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="pp-mobile-link"
            data-stub={item.stub ? "true" : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PublicHeader({
  loginHref = HEADER_NAV.login.href,
  avatarUrl = null,
  unreadCount = 0,
  labFakeAuth = false,
  univMeet,
  labSearchResults,
}: PublicHeaderProps) {
  return (
    <>
      <header className="pgs-figma-header" data-pgs-header-gate="h6a-ipad">
        <div className="mobile-none">
          <nav className="pgs-header-bar" aria-label="Primary">
            <div className="pgs-header-left">
              <a
                className="pgs-header-brand"
                href={HEADER_NAV.brandHref}
                aria-label="#purpleGuide.study"
              >
                <BrandMark />
              </a>

              <ul className="header-tab-top">
                <li>
                  <a
                    href={HEADER_NAV.feed.href}
                    className="tab-button text-black"
                  >
                    {HEADER_NAV.feed.label}
                  </a>
                </li>
                <PremiumNavDrop />
                <CvReadyNavDrop />
                <CvMedicalNavDrop />
              </ul>
            </div>

            <div className="pgs-header-right">
              <MeNavDrop />
              <StudyAbroadNavDrop />

              <a
                href={HEADER_NAV.joinPgs.href}
                className="pgs-header-join"
                data-stub={HEADER_NAV.joinPgs.stub ? "true" : undefined}
                aria-label={HEADER_NAV.joinPgs.label}
              >
                <img
                  src={HEADER_NAV.joinPgs.heartSrc}
                  alt=""
                  width={23}
                  height={25}
                  className="pgs-header-join__heart"
                  data-no-retina=""
                />
                <span>{HEADER_NAV.joinPgs.label}</span>
              </a>

              <NotificationNavDrop unreadCount={unreadCount} />

              <AuthNavControl
                loginHref={loginHref}
                avatarUrl={avatarUrl}
                labFakeAuth={labFakeAuth}
              />

              {/*
                Desk >1366: hidden. H6a ≤1366: compact bar hamburger.
                Open/close wired by LegacyPage (pgs-header-menu / drawer close).
              */}
              <button
                type="button"
                className="pgs-header-menu"
                aria-label="Open menu"
                aria-controls="drawer"
                aria-expanded={false}
              >
                <img
                  className="pgs-menu-tablet"
                  src="/assets/img/figma-header/menu-tablet.svg"
                  alt=""
                  width={34}
                  height={34}
                  data-no-retina=""
                />
                <img
                  className="pgs-menu-mobile"
                  src="/assets/img/figma-header/menu-mobile.svg"
                  alt=""
                  width={20}
                  height={20}
                  data-no-retina=""
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/*
        H6a drawer — current chrome + Figma 19094:13341 extras.
        Fonts stay 18px nav labels; reference layout only (smaller chrome).
        Opens like a mac menu (legacy-page.tsx + pgs-header-chrome-reset.css).
        Default open: #studyAbroad + #me (owner 2026-09-26).
      */}
      <div className="drawer pgs-header-drawer" id="drawer">
        <div className="d-flex d-flex-space justify-content-space">
          <div>
            <a href={HEADER_NAV.brandHref}>
              <img
                src="/assets/img/white-logo.png"
                data-no-retina=""
                style={{ width: 120 }}
                alt="#purpleGuide.study"
              />
            </a>
          </div>
          <div className="d-flex d-flex-space justify-content-space">
            <button
              type="button"
              className="btn-toggle-mobile text-end pgs-drawer-close"
              aria-label="Close menu"
            >
              <img
                className="pgs-drawer-close__icon"
                src="/assets/img/figma-header/drawer-close.svg"
                width={25}
                height={22}
                alt=""
                data-no-retina=""
              />
            </button>
          </div>
        </div>

        <div className="pgs-drawer-tools">
          <DrawerUnivMeet univMeet={univMeet} />
          <div className="pgs-drawer-search search-box">
            <div className="pgs-search__group">
              <span className="pgs-search__icon">
                <i className="bi bi-search" />
              </span>
              <input
                type="search"
                className="pgs-search__input search-control"
                placeholder="Search"
                data-autocomplete-endpoint="/Search/autocomplete"
                autoComplete="off"
                aria-label="Search programs, courses, and events"
              />
            </div>
            {labSearchResults ? (
              <SearchResults
                results={labSearchResults}
                open
                listId="pgs-search-results-drawer"
              />
            ) : null}
          </div>
        </div>

        <a
          href={HEADER_NAV.joinPgs.href}
          className="pgs-drawer-join"
          data-stub={HEADER_NAV.joinPgs.stub ? "true" : undefined}
        >
          <img
            src={HEADER_NAV.joinPgs.heartSrc}
            alt=""
            width={23}
            height={25}
            className="pgs-drawer-join__heart"
            data-no-retina=""
          />
          <span>{HEADER_NAV.joinPgs.label}</span>
        </a>

        <ul className="pgs-drawer-nav">
          <li>
            <details open>
              <summary className="tab-button text-black">
                {HEADER_NAV.studyAbroad.label}
                <span className="pgs-drawer-arrow" aria-hidden="true">
                  ▼
                </span>
              </summary>
              <DrawerLinkList
                items={HEADER_NAV.studyAbroad.items}
                variant="study"
              />
            </details>
          </li>

          <li>
            <details>
              <summary className="tab-button text-black">
                {HEADER_NAV.premium.label}
                <span className="pgs-drawer-arrow" aria-hidden="true">
                  ▼
                </span>
              </summary>
              <DrawerLinkList
                items={HEADER_NAV.premium.items}
                variant="premium"
              />
            </details>
          </li>

          <li>
            <details>
              <summary className="tab-button text-black">
                {HEADER_NAV.cvReady.label}
                <span className="pgs-drawer-arrow" aria-hidden="true">
                  ▼
                </span>
              </summary>
              <DrawerLinkList
                items={HEADER_NAV.cvReady.items}
                variant="panel"
              />
            </details>
          </li>

          <li>
            <details>
              <summary className="tab-button text-black">
                {HEADER_NAV.cvMedical.label}
                <span className="pgs-drawer-arrow" aria-hidden="true">
                  ▼
                </span>
              </summary>
              <DrawerLinkList
                items={HEADER_NAV.cvMedical.items}
                variant="panel"
              />
            </details>
          </li>

          <li>
            <details open>
              <summary className="tab-button text-black">
                {HEADER_NAV.me.label}
                <span className="pgs-drawer-arrow" aria-hidden="true">
                  ▼
                </span>
              </summary>
              {/* Figma 19094:13356 — index · title · badge (drawer is outside header) */}
              <div className="pgs-drawer-me-panel">
                <p className="pgs-drawer-me-panel__title">
                  {HEADER_NAV.me.title}
                </p>
                <ul className="pgs-drawer-me-list">
                  {HEADER_NAV.me.fixtures.map((row) => (
                    <li key={`${row.index}-${row.href}`}>
                      <a
                        href={row.href}
                        className="pgs-drawer-me-row"
                        data-stub={row.stub ? "true" : undefined}
                      >
                        <span className="pgs-drawer-me-index">{row.index}</span>
                        <span className="pgs-drawer-me-row__title">
                          {row.title}
                        </span>
                        <span
                          className={`pgs-drawer-me-badge pgs-drawer-me-badge--${row.badgeTone}`}
                        >
                          {row.badge}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </li>
        </ul>
      </div>
    </>
  );
}
