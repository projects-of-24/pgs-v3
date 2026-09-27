/**
 * Owned public strip under the locked header.
 * Ports Hostinger strip DOM (#toggleBtn, #univMeet, search, sidebar slot, login popup)
 * so LOCKED globals.css chrome selectors keep working — then Hostinger strip HTML can go.
 *
 * OWN-T CSS (`pgs-owned-strip.css`) = UNLINKED workshop (OWN-UNLINK). Do not import here.
 */
import type { UnivMeetPublic } from "./univmeet-slots";
import { UNIVMEET_FALLBACK_CHIPS } from "./univmeet-slots";

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[c] ?? c,
  );
}

function escapeAttr(value: string): string {
  return escapeHtml(value);
}

function chipHtml(chips: UnivMeetPublic["chips"]): string {
  const list = chips.length ? chips : UNIVMEET_FALLBACK_CHIPS;
  return list
    .slice(0, 2)
    .map(
      (c) => `
                            <div class="pgs-univmeet__chip">
                                <span class="pgs-univmeet__day">
                                    ${escapeHtml(c.day)}
                                </span>
                                <span class="pgs-univmeet__month">
                                    ${escapeHtml(c.monthLine)}
                                </span>
                            </div>`,
    )
    .join("");
}

/**
 * Apply published chips into the shared header drawer (#univMeet).
 */
export function applyUnivMeetToHeaderHtml(
  headerHtml: string,
  univMeet: UnivMeetPublic,
): string {
  const chips = (univMeet.chips.length
    ? univMeet.chips
    : UNIVMEET_FALLBACK_CHIPS
  ).slice(0, 2);
  const href = escapeAttr(univMeet.href || "/Programsfull");

  const dates = chips
    .map(
      (c) => `
      <span class="pgs-drawer-univmeet__date" aria-hidden="true">
        <span class="pgs-drawer-univmeet__day">${escapeHtml(c.day)}</span>
        <span class="pgs-drawer-univmeet__month">${escapeHtml(c.monthLine)}</span>
      </span>`,
    )
    .join("");

  return headerHtml.replace(
    /<a\s+[^>]*class="pgs-drawer-univmeet"[^>]*>[\s\S]*?<\/a>/i,
    `<a
      href="${href}"
      class="pgs-drawer-univmeet"
    >
      <span class="pgs-drawer-univmeet__label">#univMeet</span>${dates}
    </a>`,
  );
}

/** Build the page strip HTML (same structure/IDs as the old UK Hostinger slice). */
export function buildPublicStripHtml(univMeet?: UnivMeetPublic): string {
  const meet = univMeet ?? {
    chips: UNIVMEET_FALLBACK_CHIPS,
    href: "/Programsfull",
  };
  const href = escapeAttr(meet.href || "/Programsfull");

  return `<!-- PGS-PUBLIC-STRIP -->
<style>
    .pgs-login-popup-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        z-index: 999999;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 18px;
    }

    .pgs-login-popup-overlay.show {
        display: flex;
    }

    .pgs-login-popup-box {
        width: 100%;
        max-width: 340px;
        background: #ffffff;
        border-radius: 18px;
        padding: 24px 22px 20px;
        box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
        text-align: center;
        position: relative;
        animation: pgsLoginPopupIn 0.2s ease-out;
    }

    .pgs-login-popup-close {
        position: absolute;
        top: 10px;
        right: 12px;
        border: 0;
        background: transparent;
        font-size: 24px;
        line-height: 1;
        color: #444;
        cursor: pointer;
        padding: 0;
    }

    .pgs-login-popup-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 auto 12px;
        background: #FFDE7F;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #111;
        font-size: 24px;
    }

    .pgs-login-popup-box h4 {
        margin: 0 0 8px;
        font-size: 20px;
        font-weight: 700;
        color: #111;
    }

    .pgs-login-popup-box p {
        margin: 0 0 18px;
        font-size: 14px;
        line-height: 1.5;
        color: #555;
    }

    .pgs-login-popup-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 125px;
        height: 42px;
        border-radius: 12px;
        background: #111;
        color: #ffffff !important;
        text-decoration: none;
        font-size: 14px;
        font-weight: 700;
        padding: 0 18px;
    }

    .pgs-login-popup-btn:hover {
        color: #ffffff !important;
        text-decoration: none;
    }

    @keyframes pgsLoginPopupIn {
        from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    #close_Btn {
        transition: transform 0.2s ease;
        cursor: pointer;
    }

    .arrow-box.sidebar-box.active #close_Btn {
        transform: rotate(180deg);
    }
</style>

<div class="overlay" id="overlay"></div>

<div class="pgs-login-popup-overlay" id="pgsLoginPopup">
    <div class="pgs-login-popup-box" role="dialog" aria-modal="true" aria-labelledby="pgsLoginPopupTitle">
        <button type="button" class="pgs-login-popup-close" aria-label="Close">×</button>
        <div class="pgs-login-popup-icon">
            <i class="bi bi-lock-fill"></i>
        </div>
        <h4 id="pgsLoginPopupTitle">Login Required</h4>
        <p>Please login to access this option.</p>
        <a href="/Login" class="pgs-login-popup-btn">Login Now</a>
    </div>
</div>

<section class="pt-1 pb-0 mobile-frame-sidebar">
    <div class="container-fluid px-4">
        <div class="arrow-box sidebar-box" id="sidebar">
            <div class="d-flex justify-content-space align-items-start">
                <h5 class="pt-13 text-black fs-48 fnt-family text-start">
                    Welcome <br>
                    User
                </h5>
                <img src="/assets/img/sidebar-arrow.png" id="close_Btn" class="flot-arrow-sidebar" data-no-retina="" alt="">
            </div>
            <ul class="ml-0">
                <li>
                    <a href="/studentresources">
                        <span class="fit-icon-sidebar"><img src="/assets/img/loading-icon.png" data-no-retina="" alt=""></span>
                        #datesDeadlines
                    </a>
                </li>
            </ul>
            <div class="d-flex justify-content-space mt-30">
                <a href="/Login" class="text-black fs-20">
                    <img src="/assets/img/logout.png" class="d-block" data-no-retina="" alt="">
                    Login
                </a>
            </div>
        </div>

        <div class="row g-4" style="align-items: flex-start; justify-content: space-evenly;">
            <div class="col-xl-1 col-lg-1">
                <div class="arrow-box" id="toggleBtn">
                    <i class="bi bi-arrow-right-square-fill"></i>
                </div>
            </div>

            <div class="avatar-box w-12">
                <div class="avatar-img">
                    <img src="/assets/img/default-avatar.png" alt="Avatar" data-no-retina="">
                </div>
                <div class="avatar-info">
                    <h5 class="mb-0">Hello <span>👋</span></h5>
                    <h4 class="mb-0">Aspirant</h4>
                </div>
            </div>

            <div class="col-xl-5 mt-0 col-lg-5 d-flex align-items-center mobile-tags-scrolling"></div>

            <div class="col-xl-4 justify-content-end col-lg-4 d-flex gap-7 mobile-none" style="width: 37%;">
                <div class="d-flex align-items-start gap-3 pgs-strip-tools">
                    <a href="${href}" class="pgs-univmeet" id="univMeet">
                        <h5 class="pgs-univmeet__label">#univMeet</h5>
                        ${chipHtml(meet.chips)}
                    </a>
                    <div class="pgs-search search-box">
                        <div class="pgs-search__group">
                            <span class="pgs-search__icon"><i class="bi bi-search"></i></span>
                            <input type="search" class="pgs-search__input search-control" placeholder="Search" data-autocomplete-endpoint="/Search/autocomplete" data-pgs-autocomplete="1" autocomplete="off" aria-label="Search programs, courses, and events">
                        </div>
                        <div class="pgs-autocomplete"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- PGS-PUBLIC-STRIP-END -->`;
}
