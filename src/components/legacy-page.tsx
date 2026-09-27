"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ViewportWidthOverlay } from "@/features/countries/viewport-width-overlay";
import { signOutAndNavigate } from "@/lib/logout-navigation";

type Props = {
  html?: string;
  page: string;
  studentState?: "anonymous" | "authenticated_standard" | "authenticated_premium";
  /** Hybrid pages: React islands + HTML fragments instead of one html string */
  children?: ReactNode;
};

function setOpen(element: HTMLElement | null, open: boolean) {
  if (!element) return;
  element.classList.toggle("open", open);
  element.classList.toggle("active", open);
  element.classList.toggle("show", open);
  if (element.classList.contains("pgs-modal") || element.classList.contains("premium-modal-overlay")) {
    element.style.display = open ? "flex" : "none";
  }
  if (element.classList.contains("pgs-login-popup-overlay")) {
    element.style.display = open ? "flex" : "none";
  }
  if (element.classList.contains("drawer") || element.classList.contains("overlay") || element.classList.contains("premium-modal-overlay")) {
    // Reserve scrollbar width before locking overflow so body/footer do not shift.
    if (open) {
      const pad = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
      document.documentElement.style.setProperty("--pgs-scrollbar-pad", `${pad}px`);
    } else {
      document.documentElement.style.setProperty("--pgs-scrollbar-pad", "0px");
    }
    document.body.classList.toggle("overflow-hidden", open);
  }
}

/**
 * React header drawer (#drawer.pgs-header-drawer) — mac-menu behaviour.
 * Anchored under the bar, toggles, no page lock, closes on outside click / Escape.
 * Hostinger DSIH #drawer (+ #overlay) keeps the legacy open/close path.
 */
function isHeaderPopoverDrawer(drawer: HTMLElement | null): drawer is HTMLElement {
  return !!drawer && drawer.classList.contains("pgs-header-drawer");
}

function placeHeaderDrawer(root: HTMLElement) {
  const drawer = (root.querySelector("#drawer") ?? document.querySelector("#drawer")) as HTMLElement | null;
  if (!isHeaderPopoverDrawer(drawer)) return;
  const trigger = root.querySelector<HTMLElement>(".pgs-header-menu") ?? document.querySelector<HTMLElement>(".pgs-header-menu");
  if (!trigger) return;
  const menu = trigger.getBoundingClientRect();
  // Logout card is top: calc(100% + 8px) on the avatar wrap. Match that top.
  const auth = root.querySelector<HTMLElement>(".pgs-header-auth-wrap")
    ?? document.querySelector<HTMLElement>(".pgs-header-auth-wrap");
  const anchorBottom = auth ? auth.getBoundingClientRect().bottom : menu.bottom;
  let top = anchorBottom + 8;
  let right = document.documentElement.clientWidth - menu.right;
  const apply = () => {
    drawer.style.setProperty("--pgs-drawer-top", `${Math.round(top)}px`);
    drawer.style.setProperty("--pgs-drawer-right", `${Math.round(right)}px`);
  };
  apply();
  // html{zoom:0.9} puts `right`/`top` and the button rect in different pixel spaces.
  for (let pass = 0; pass < 3; pass += 1) {
    const box = drawer.getBoundingClientRect();
    const dx = menu.right - box.right;
    const dy = anchorBottom + 8 - box.top;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) break;
    right -= dx;
    top += dy;
    apply();
  }
  drawer.style.setProperty("--pgs-drawer-max-h", `${Math.max(240, Math.round(window.innerHeight - anchorBottom - 8 - 12))}px`);
}

function setHeaderDrawerOpen(root: HTMLElement, open: boolean, returnFocus = false) {
  const drawer = (root.querySelector("#drawer") ?? document.querySelector("#drawer")) as HTMLElement | null;
  if (!isHeaderPopoverDrawer(drawer)) return;
  const trigger = (root.querySelector<HTMLElement>(".pgs-header-menu") ?? document.querySelector<HTMLElement>(".pgs-header-menu"));

  if (open) placeHeaderDrawer(root);

  drawer.classList.toggle("open", open);
  drawer.classList.toggle("active", open);
  drawer.classList.toggle("show", open);
  trigger?.setAttribute("aria-expanded", String(open));
  if (!open && returnFocus) trigger?.focus();
}

function wireHeaderDrawerPopover(root: HTMLElement, signal: AbortSignal) {
  const drawer = (root.querySelector("#drawer") ?? document.querySelector("#drawer")) as HTMLElement | null;
  if (!isHeaderPopoverDrawer(drawer)) return;
  const isOpen = () => drawer.classList.contains("open");

  document.addEventListener("mousedown", (event) => {
    if (!isOpen()) return;
    const target = event.target as HTMLElement;
    if (drawer.contains(target) || target.closest(".pgs-header-menu")) return;
    setHeaderDrawerOpen(root, false);
  }, { signal });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen()) return;
    setHeaderDrawerOpen(root, false, true);
  }, { signal });

  const placeIfOpen = () => {
    if (isOpen()) placeHeaderDrawer(root);
  };
  window.addEventListener("resize", placeIfOpen, { signal });
  window.visualViewport?.addEventListener("resize", placeIfOpen, { signal });
}

function wireRetainedSidebar(root: HTMLElement, signal: AbortSignal) {
  const syncSidebar = (open: boolean) => {
    const sidebar = root.querySelector<HTMLElement>("#sidebar");
    const toggle = root.querySelector<HTMLElement>("#toggleBtn");
    if (!sidebar || !toggle) return;
    sidebar.classList.toggle("active", open);
    sidebar.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("role", "button");
    toggle.setAttribute("tabindex", "0");
    toggle.setAttribute("aria-controls", "sidebar");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("hidenone", open);
    // Icon-font arrow flip for the string strip only. The React strip renders an
    // inline SVG (<PgsIcon/>, V-1); adding `bi-*` classes to it would draw the
    // font glyph on top of the SVG while icon.min.css is still loaded.
    const icon = toggle.querySelector("i");
    if (icon && !icon.classList.contains("pgs-icon")) {
      icon.classList.toggle("bi-arrow-right-square-fill", !open);
      icon.classList.toggle("bi-arrow-left-square-fill", open);
    }
  };

  // Do not force-close on rewire. A later effect re-run (including after the
  // cursor leaves) was wiping `.active` and looked like a Hostinger mouse-out close.
  const sidebarNow = root.querySelector<HTMLElement>("#sidebar");
  syncSidebar(sidebarNow?.classList.contains("active") ?? false);

  root.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const control = target.closest("#toggleBtn, #sidebar #close_Btn");
    if (!control || !root.contains(control)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const sidebar = root.querySelector<HTMLElement>("#sidebar");
    const nextOpen = control.id === "toggleBtn"
      ? !sidebar?.classList.contains("active")
      : false;
    syncSidebar(nextOpen);
  }, { capture: true, signal });
}

function isGuestSidebarGateLink(link: HTMLAnchorElement): boolean {
  if (!link.closest("#sidebar")) return false;
  const text = link.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const href = link.getAttribute("href") ?? "";
  if (href.includes("javascript:") && text.toLowerCase().includes("#purpleboard")) return true;
  if (link.querySelector('img[src*="profile-icon"]') && text === "Profile") return true;
  if (link.querySelector('img[src*="heart-icon"]') && text === "Saved List") return true;
  return link.hasAttribute("data-login-required");
}

function wireExploreCountrySwitcher(root: HTMLElement, signal: AbortSignal) {
  root.querySelectorAll(".vs-box-set").forEach((box) => {
    const row = box.closest(".d-flex");
    const headingSpan = row?.querySelector<HTMLElement>(".fs-75.text-white.lh-65 .fnt-family") ?? null;
    const ctaBtn = row?.querySelector<HTMLAnchorElement>(".btn-green-btn") ?? null;
    const codes = box.querySelectorAll("h1");

    const selectCode = (h1: Element) => {
      codes.forEach((other) => other.querySelector("span")?.classList.remove("bg-purple"));
      h1.querySelector("span")?.classList.add("bg-purple");
      if (headingSpan) {
        headingSpan.innerHTML = h1.getAttribute("data-country") ?? h1.querySelector("span")?.textContent ?? h1.textContent ?? "";
      }
      const href = h1.getAttribute("data-href");
      if (ctaBtn && href) ctaBtn.setAttribute("href", href);
    };

    codes.forEach((h1) => {
      const heading = h1 as HTMLElement;
      heading.style.cursor = "pointer";
      heading.addEventListener("click", () => selectCode(h1), { signal });
    });

    const preset = box.querySelector("h1 span.bg-purple");
    const initial = preset?.closest("h1") ?? codes[0];
    if (initial) selectCode(initial);
  });
}

function catalogCardMeta(card: HTMLElement) {
  const title = card.dataset.title ?? card.querySelector("h3")?.textContent?.trim() ?? "";
  const tagText = card.dataset.tags ?? [...card.querySelectorAll(".sop-tag")].map((tag) => tag.textContent?.replace(/^#/, "").trim().toLowerCase() ?? "").filter(Boolean).join(" ");
  const search = card.dataset.search ?? `${title} ${tagText} ${card.textContent ?? ""}`.toLowerCase();
  return { title, tags: tagText, search };
}

function wireCvReadyCatalogFilters(root: HTMLElement, signal: AbortSignal) {
  let currentFilter = "";
  let currentSort = "order";

  const cards = () => root.querySelectorAll<HTMLElement>(".js-program-card, .pgs-relational-catalog-card");

  const applyFilterAndSort = () => {
    const query = (root.querySelector<HTMLInputElement>("#programSearch")?.value ?? "").toLowerCase().trim();
    const filter = currentFilter.toLowerCase();
    const list = [...cards()];
    const parent = list[0]?.parentElement ?? null;
    let visible = list.filter((card) => {
      const { search, tags } = catalogCardMeta(card);
      const matchSearch = !query || search.includes(query) || tags.includes(query);
      const matchTag = !filter || tags.split(/\s+/).includes(filter);
      return matchSearch && matchTag;
    });
    if (currentSort === "title" && visible.length && parent) {
      visible = [...visible].sort((a, b) => catalogCardMeta(a).title.localeCompare(catalogCardMeta(b).title, undefined, { sensitivity: "base" }));
      visible.forEach((card) => parent.appendChild(card));
    }
    list.forEach((card) => {
      card.style.display = visible.includes(card) ? "" : "none";
    });
  };

  root.querySelectorAll<HTMLElement>(".js-filter-tag, .js-sort-tag, .js-filter-tag-box").forEach((tag) => {
    if (tag.classList.contains("js-filter-tag-box")) {
      tag.setAttribute("role", "button");
      tag.setAttribute("tabindex", "0");
      return;
    }
    tag.setAttribute("role", "button");
    tag.setAttribute("tabindex", "0");
  });

  root.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const filterTag = target.closest<HTMLElement>(".js-filter-tag");
    if (filterTag && root.contains(filterTag)) {
      event.preventDefault();
      root.querySelectorAll(".js-filter-tag").forEach((tag) => tag.classList.remove("active"));
      filterTag.classList.add("active");
      currentFilter = filterTag.dataset.filter ?? "";
      applyFilterAndSort();
      return;
    }

    const tagBox = target.closest<HTMLElement>(".js-filter-tag-box");
    if (tagBox && root.contains(tagBox)) {
      event.preventDefault();
      currentFilter = tagBox.dataset.filter ?? "";
      root.querySelectorAll(".js-filter-tag").forEach((tag) => {
        const filterTag = tag as HTMLElement;
        filterTag.classList.toggle("active", (filterTag.dataset.filter ?? "") === currentFilter);
      });
      if (!currentFilter) root.querySelector('.js-filter-tag[data-filter=""]')?.classList.add("active");
      applyFilterAndSort();
      return;
    }

    const sortTag = target.closest<HTMLElement>(".js-sort-tag");
    if (sortTag && root.contains(sortTag)) {
      event.preventDefault();
      root.querySelectorAll(".js-sort-tag").forEach((tag) => tag.classList.remove("active"));
      sortTag.classList.add("active");
      currentSort = sortTag.dataset.sort ?? "order";
      applyFilterAndSort();
    }
  }, { signal });

  root.querySelector("#programSearch")?.addEventListener("input", applyFilterAndSort, { signal });
}

const PREMIUM_DASHBOARD_STEP_IMAGES = [
  "/assets/img/restro-img.jpg",
  "/assets/img/dashboard-gif.png",
  "/assets/img/complete-notes.png",
  "/assets/img/computer.jpg",
  "/assets/img/premium-3.png"
] as const;

function wirePremiumDashboardExplorer(root: HTMLElement, signal: AbortSignal) {
  root.querySelectorAll<HTMLElement>(".line-active").forEach((line) => {
    const group = line.nextElementSibling;
    if (!(group instanceof HTMLElement) || !group.classList.contains("group-flex-items") || !group.classList.contains("mobile-scrolling-nowrap")) {
      return;
    }

    const section = line.closest("section, .col-lg-11, .mobile-p-0") ?? line.parentElement;
    const image = section?.querySelector<HTMLImageElement>(".box-img-grid-gorup img");
    if (!image) return;

    const items = [...group.querySelectorAll<HTMLElement>(":scope > .w-20")];
    if (items.length !== 5) return;

    group.classList.add("pgs-premium-explorer");
    line.classList.add("pgs-premium-progress");

    const activate = (index: number) => {
      const progress = ((index + 1) / items.length) * 100;
      line.style.setProperty("--pgs-line-progress", `${progress}%`);
      const nextSrc = items[index].dataset.pgsPremiumImage ?? PREMIUM_DASHBOARD_STEP_IMAGES[index] ?? image.getAttribute("src") ?? "";
      if (nextSrc) image.setAttribute("src", nextSrc);
      items.forEach((item, itemIndex) => {
        const active = itemIndex === index;
        item.classList.toggle("pgs-premium-step-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
    };

    items.forEach((item, index) => {
      const label = item.querySelector("h4")?.textContent?.replace(/\s+/g, " ").trim() ?? `Premium feature ${index + 1}`;
      item.dataset.pgsPremiumStep = String(index);
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-label", label);

      item.addEventListener("click", () => activate(index), { signal });
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate(index);
        }
      }, { signal });
    });

    activate(0);
  });
}

function wireLoginSignupToggle(root: HTMLElement, signal: AbortSignal) {
  const loginForm = root.querySelector<HTMLElement>("#loginForm");
  const signupForm = root.querySelector<HTMLElement>("#signupForm");
  if (!loginForm || !signupForm) return;

  const showSignup = () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
  };
  const showLogin = () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
  };

  root.querySelectorAll<HTMLButtonElement>(".mobile-login-box .btn-outline-purple").forEach((button) => {
    const label = button.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
    if (label === "sign up") {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        showSignup();
      }, { signal });
    } else if (label === "log in") {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        showLogin();
      }, { signal });
    }
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get("signup") === "1" || params.get("mode") === "signup") {
    showSignup();
  } else if (!loginForm.classList.contains("active") && !signupForm.classList.contains("active")) {
    loginForm.classList.add("active");
  }
}

function revealLegacyAnimations(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-anime]").forEach((element) => {
    element.classList.add("appear", "anime-complete");
    element.style.removeProperty("opacity");
    element.style.removeProperty("transform");
  });

  // jQuery + optional jquery.appear (vendors.min.js) — guard for Turbopack load order
  const jQuery = (window as unknown as { jQuery?: (input: HTMLElement | Document) => { find: (selector: string) => { appear?: () => unknown } } }).jQuery;
  if (!jQuery) return;
  try {
    const anime = jQuery(root).find("[data-anime]");
    if (typeof anime.appear === "function") {
      const appeared = anime.appear() as { trigger: (name: string) => void };
      appeared.trigger("resize");
    }
  } catch {
    // vendors/main may not be ready yet; CSS/class fallback above still reveals content.
  }
}

type LegacyJQuery = ((el: HTMLElement) => {
  data: (key: string) => unknown;
  isotope: (method: string) => void;
});

function destroyCountryIsotope(root: HTMLElement) {
  const $ = (window as Window & { jQuery?: LegacyJQuery }).jQuery;
  if (!$) return;
  root.querySelectorAll<HTMLElement>(".portfolio-wrapper, .shop-wrapper").forEach((wrapper) => {
    const $wrapper = $(wrapper);
    if ($wrapper.data("isotope")) {
      $wrapper.isotope("destroy");
    }
    wrapper.classList.remove("grid-loading");
    wrapper.style.removeProperty("height");
  });
}

function applyCountryPortfolioFilter(root: HTMLElement, filter: string) {
  destroyCountryIsotope(root);
  root.querySelectorAll<HTMLElement>(".grid-item").forEach((item) => {
    const show = item.matches(filter);
    item.style.display = show ? "list-item" : "none";
    if (show) {
      item.style.removeProperty("position");
      item.style.removeProperty("left");
      item.style.removeProperty("top");
      item.style.removeProperty("opacity");
      item.style.removeProperty("transform");
      item.style.removeProperty("transition-property");
      item.style.removeProperty("transition-duration");
      item.style.removeProperty("transition-delay");
      item.style.removeProperty("width");
    }
  });

  root.querySelectorAll<HTMLElement>(".portfolio-wrapper, .shop-wrapper").forEach((wrapper) => {
    wrapper.classList.remove("grid-loading");
    wrapper.style.removeProperty("height");
  });
}

function resetCountryPageLayout(root: HTMLElement) {
  destroyCountryIsotope(root);

  root.querySelectorAll<HTMLElement>(".grid-item").forEach((item) => {
    item.style.removeProperty("position");
    item.style.removeProperty("left");
    item.style.removeProperty("top");
    item.style.removeProperty("opacity");
    item.style.removeProperty("transform");
    item.style.removeProperty("transition-property");
    item.style.removeProperty("transition-duration");
    item.style.removeProperty("transition-delay");
    item.style.removeProperty("width");
  });

  const activeFilter = root.querySelector<HTMLAnchorElement>(
    ".portfolio-filter .nav.active > a, .portfolio-filter > li.active > a"
  )?.dataset.filter ?? root.querySelector<HTMLAnchorElement>(".portfolio-filter a[data-filter]")?.dataset.filter;

  if (activeFilter?.startsWith(".")) {
    applyCountryPortfolioFilter(root, activeFilter);
  }
}

function stabilizeCountryPageLayout(root: HTMLElement) {
  resetCountryPageLayout(root);
  requestAnimationFrame(() => {
    resetCountryPageLayout(root);
    window.setTimeout(() => resetCountryPageLayout(root), 0);
    window.setTimeout(() => resetCountryPageLayout(root), 500);
  });
}

function formPayload(form: HTMLFormElement): Record<string, string | string[]> {
  const payload: Record<string, string | string[]> = {};
  for (const [key, value] of new FormData(form)) {
    if (typeof value !== "string") continue;
    const existing = payload[key];
    if (existing === undefined) payload[key] = value;
    else payload[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
  }
  return payload;
}

function formEndpoint(form: HTMLFormElement, page: string): string | null {
  const identity = `${form.id} ${form.className}`.toLowerCase();
  if (page === "login") return form.id === "registerForm" ? "/api/auth/register" : "/api/auth/login";
  if (page === "forgot-password") return "/api/auth/forgot-password";
  if (page === "reset-password") return "/api/auth/reset-password";
  if (page === "change-password") return "/api/auth/change-password";
  if (identity.includes("contactform") || page === "contact") return "/api/enquiries";
  if (identity.includes("study") || identity.includes("journey")) return "/api/study-journey";
  if (page === "studentresources" || identity.includes("subscribe")) return "/api/deadline-subscriptions";
  if (/modal|applicant|premium|scholar|usml|referr/.test(identity) || form.closest(".premium-modal-overlay")) return "/api/leads";
  return null;
}

function showFormStatus(form: HTMLFormElement, message: string, success: boolean) {
  let status = form.querySelector<HTMLElement>(".form-results, [data-form-status]");
  if (!status) {
    status = document.createElement("div");
    status.dataset.formStatus = "true";
    form.appendChild(status);
  }
  status.setAttribute("role", "status");
  status.textContent = message;
  status.classList.remove("d-none");
  status.style.display = "block";
  status.style.color = success ? "#126b38" : "#a51d2d";
}

async function submitLegacyForm(form: HTMLFormElement, page: string, navigate: (path: string) => void) {
  const endpoint = formEndpoint(form, page);
  if (!endpoint) {
    showFormStatus(form, "This secure account action requires Supabase Auth configuration.", false);
    return;
  }
  if (!form.reportValidity()) {
    showFormStatus(form, "Please complete the required fields.", false);
    return;
  }
  const submit = form.querySelector<HTMLButtonElement | HTMLInputElement>('[type="submit"]');
  if (submit) submit.disabled = true;
  showFormStatus(form, "Submitting…", true);
  try {
    const payload = formPayload(form);
    if (page === "login") payload.redirect = new URLSearchParams(window.location.search).get("redirect") || "/student/dashboard";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(endpoint.startsWith("/api/auth/") ? payload : { page, form: form.id || "legacy-form", fields: payload })
    });
    const result = await response.json() as { message?: string; redirect?: string | null };
    if (!response.ok) throw new Error(result.message || "Unable to submit this form.");
    showFormStatus(form, result.message || "Thank you. Your submission has been received.", true);
    const currentModal = form.closest<HTMLElement>(".premium-modal-overlay");
    if (result.redirect) {
      navigate(result.redirect);
    } else if (currentModal) {
      const confirmation = document.querySelector<HTMLElement>(`#${currentModal.id}2`)
        ?? document.querySelector<HTMLElement>(`#${currentModal.id.replace(/Modal$/, "Modal2")}`);
      setOpen(currentModal, false);
      setOpen(confirmation, true);
    } else {
      form.reset();
    }
  } catch (error) {
    showFormStatus(form, error instanceof Error ? error.message : "Unable to submit this form.", false);
  } finally {
    if (submit) submit.disabled = false;
  }
}

function runLegacyFormSubmission(form: HTMLFormElement, page: string, navigate: (path: string) => void) {
  void submitLegacyForm(form, page, navigate).catch(() => {
    showFormStatus(form, "Unable to submit this form. Please try again.", false);
  });
}

function moveJourneyStep(button: HTMLButtonElement, direction: 1 | -1): boolean {
  const form = button.closest("form");
  if (!form) return false;
  const steps = Array.from(form.querySelectorAll<HTMLElement>(".step"));
  if (steps.length < 2) return false;
  const current = button.closest<HTMLElement>(".step") ?? steps.find((step) => !step.classList.contains("hidden"));
  if (!current) return false;
  const next = steps[steps.indexOf(current) + direction];
  if (!next) return false;
  current.classList.add("hidden");
  current.style.display = "none";
  next.classList.remove("hidden");
  next.style.removeProperty("display");
  next.querySelector<HTMLElement>("input, select, textarea")?.focus();
  return true;
}

async function submitModalPanel(modal: HTMLElement, page: string, button: HTMLButtonElement) {
  const fields: Record<string, string> = {};
  modal.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea").forEach((input, index) => {
    if (input instanceof HTMLInputElement && ["button", "submit"].includes(input.type)) return;
    const key = input.name || input.getAttribute("autocomplete") || input.id || `field_${index + 1}`;
    if (input.value.trim()) fields[key] = input.value.trim();
  });
  button.disabled = true;
  let status = modal.querySelector<HTMLElement>("[data-form-status]");
  if (!status) {
    status = document.createElement("div");
    status.dataset.formStatus = "true";
    status.setAttribute("role", "status");
    button.parentElement?.appendChild(status);
  }
  status.textContent = "Submitting…";
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ page, form: modal.id, fields })
    });
    const result = await response.json() as { message?: string };
    if (!response.ok) throw new Error(result.message || "Unable to submit this form.");
    status.textContent = result.message || "Thank you. Your submission has been received.";
    const confirmation = document.querySelector<HTMLElement>(`#${modal.id.replace(/Modal$/, "Modal2")}`);
    setOpen(modal, false);
    setOpen(confirmation, true);
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : "Unable to submit this form.";
    status.style.color = "#a51d2d";
  } finally {
    button.disabled = false;
  }
}

async function saveCatalogItem(target: HTMLElement) {
  const owner = target.closest<HTMLElement>("[data-program-id], [data-course-id], [data-save-id]") ?? target;
  const programId = owner.dataset.programId ?? (target.classList.contains("save-program") ? target.dataset.saveId : undefined);
  const courseId = owner.dataset.courseId ?? (target.classList.contains("save-course") ? target.dataset.saveId : undefined);
  const id = Number(programId ?? courseId);
  if (!Number.isSafeInteger(id) || id <= 0) return;
  const kind = programId ? "programs" : "courses";
  const saved=target.classList.contains("is-saved")||owner.classList.contains("is-saved");
  const response = await fetch(`/api/student/saved/${kind}/${id}`, {
    method: saved ? "DELETE" : "POST",
    credentials: "same-origin"
  });
  if (response.ok) {
    target.classList.toggle("is-saved",!saved);
    owner.classList.toggle("is-saved",!saved);
    target.setAttribute("aria-label", saved?"Save":"Remove from saved");
    if(target.matches("button"))target.textContent=saved?"♡":"♥";
  }
}

async function manageLegacyNotification(target: HTMLElement) {
  const open = target.closest<HTMLElement>("[data-notification-open]");
  const remove = target.closest<HTMLElement>("[data-notification-delete]");
  const clear = target.closest<HTMLElement>("[data-notification-clear]");
  if (open) {
    const destination = open.dataset.notificationDestination;
    if (open.dataset.notificationReadonly !== "true") {
      const response = await fetch(`/api/student/notifications/${open.dataset.notificationOpen}`, { method: "PATCH", credentials: "same-origin" });
      if (!response.ok) return;
      open.closest("article")?.classList.replace("is-unread", "is-read");
    }
    if (destination) window.location.assign(destination);
    return;
  }
  if (remove) {
    const response = await fetch(`/api/student/notifications/${remove.dataset.notificationDelete}`, { method: "DELETE", credentials: "same-origin" });
    if (response.ok) remove.closest("article")?.remove();
    return;
  }
  if (clear) {
    const response = await fetch("/api/student/notifications", { method: "DELETE", credentials: "same-origin" });
    if (response.ok) clear.closest(".site-notification-menu")?.querySelectorAll(".site-notification-items article").forEach((item) => item.remove());
  }
}

export function LegacyPage({ html, page, studentState="anonymous", children }: Props) {
  const router = useRouter();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const abort = new AbortController();
    const options = { signal: abort.signal };
    root.dataset.interactionsReady = "true";
    wireRetainedSidebar(root, abort.signal);
    wireHeaderDrawerPopover(root, abort.signal);

    const popupWindow = window as Window & {
      showLoginRequiredPopup?: (event: Event) => void;
    };
    popupWindow.showLoginRequiredPopup = (event: Event) => {
      event.preventDefault();
      const popup = root.querySelector<HTMLElement>("#pgsLoginPopup")
        ?? document.querySelector<HTMLElement>("#pgsLoginPopup");
      setOpen(popup, true);
    };

    root.querySelectorAll<HTMLFormElement>("form").forEach((form) => {
      form.dataset.v3SubmitReady = "true";
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        runLegacyFormSubmission(form, page, (path) => router.push(path));
      }, options);
      form.querySelectorAll<HTMLElement>('[type="submit"]').forEach((control) => {
        control.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          runLegacyFormSubmission(form, page, (path) => router.push(path));
        }, { ...options, capture: true });
      });
    });
    root.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>("a");
      const button = target.closest<HTMLButtonElement>("button");

      if (target.closest("[data-notification-open], [data-notification-delete], [data-notification-clear]")) {
        event.preventDefault();
        event.stopPropagation();
        void manageLegacyNotification(target);
        return;
      }

      if ((link?.href.includes("Googlelogins/googleLogin") || button?.classList.contains("btn-google")) && page === "login") {
        event.preventDefault();
        const next = new URLSearchParams(window.location.search).get("redirect") || "/student/dashboard";
        router.push(`/auth/google?next=${encodeURIComponent(next)}`);
        return;
      }

      if (button?.classList.contains("btn-back") && moveJourneyStep(button, -1)) {
        event.preventDefault();
        return;
      }

      if (button?.classList.contains("btn-next")) {
        const form = button.closest<HTMLFormElement>("form");
        if (button.id === "studyJourneySubmitBtn" && form) {
          event.preventDefault();
          runLegacyFormSubmission(form, page, (path) => router.push(path));
          return;
        }
        if (moveJourneyStep(button, 1)) {
          event.preventDefault();
          return;
        }
      }

      if (
        (button?.classList.contains("pgs-header-menu") ||
          button?.querySelector('img[src*="toggle-lines"]') ||
          button?.querySelector('img[src*="menu-tablet"]') ||
          button?.querySelector('img[src*="menu-mobile"]')) &&
        !button.classList.contains("mobile-notification-wrapper")
      ) {
        event.preventDefault();
        const drawer = (root.querySelector("#drawer") ?? document.querySelector("#drawer")) as HTMLElement | null;
        if (isHeaderPopoverDrawer(drawer)) {
          // mac menu: same button opens and closes; no overlay, no scroll lock.
          setHeaderDrawerOpen(root, !drawer.classList.contains("open"));
          return;
        }
        const overlay = (root.querySelector("#overlay") ?? document.querySelector("#overlay")) as HTMLElement | null;
        setOpen(drawer, true);
        setOpen(overlay, true);
        return;
      }

      if (target.closest("#drawer .btn-toggle-mobile") || target.closest("#overlay")) {
        const drawer = (root.querySelector("#drawer") ?? document.querySelector("#drawer")) as HTMLElement | null;
        if (isHeaderPopoverDrawer(drawer)) {
          setHeaderDrawerOpen(root, false, true);
          return;
        }
        const overlay = (root.querySelector("#overlay") ?? document.querySelector("#overlay")) as HTMLElement | null;
        setOpen(drawer, false);
        setOpen(overlay, false);
        return;
      }

      const notification = target.closest(".header-notification-wrapper, .mobile-notification-wrapper");
      if (notification) {
        event.preventDefault();
        const menu = notification.parentElement?.querySelector<HTMLElement>(".site-notification-menu") ?? null;
        const willOpen = !menu?.classList.contains("open");
        if (menu) {
          // Compact mobile uses position:fixed — pin under the bell so content stays on-screen.
          // Desktop/iPad: clear any leftover inline top so CSS calc(100% + 8px) wins.
          if (willOpen && window.matchMedia("(max-width: 600px)").matches) {
            const bellBottom = notification.getBoundingClientRect().bottom;
            menu.style.top = `${Math.round(bellBottom + 8)}px`;
          } else {
            menu.style.removeProperty("top");
          }
        }
        setOpen(menu, willOpen);
        return;
      }

      if (link?.textContent?.includes("#purplePremium")) {
        const dropdown = link.parentElement?.querySelector<HTMLElement>(".dropdown-menu, #mobilePpDropdown") ?? null;
        if (dropdown) {
          event.preventDefault();
          const open = dropdown.style.display !== "block";
          dropdown.style.display = open ? "block" : "none";
          setOpen(dropdown, open);
          link.setAttribute("aria-expanded", open ? "true" : "false");
          link.parentElement?.classList.toggle("is-open", open);
          return;
        }
      }

      if (link?.textContent?.includes("#exploreCountries")) {
        const dropdown = link.parentElement?.querySelector<HTMLElement>(".explore-dropdown-menu, #mobileExploreDropdown") ?? null;
        if (dropdown) {
          event.preventDefault();
          const open = dropdown.style.display !== "block";
          dropdown.style.display = open ? "block" : "none";
          setOpen(dropdown, open);
          return;
        }
      }

      const filterLink = target.closest<HTMLAnchorElement>(".portfolio-filter a[data-filter]");
      const filter = filterLink?.dataset.filter;
      if (filterLink && filter?.startsWith(".")) {
        event.preventDefault();
        event.stopPropagation();
        applyCountryPortfolioFilter(root, filter);
        root.querySelectorAll(".portfolio-filter > li").forEach((item) => item.classList.remove("active"));
        filterLink.closest("li")?.classList.add("active");
        return;
      }

      const controlledTarget = button?.dataset.bsTarget || link?.dataset.bsTarget || link?.getAttribute("data-target");
      if (controlledTarget?.startsWith("#")) {
        const controlled = document.querySelector<HTMLElement>(controlledTarget);
        if (controlled) {
          event.preventDefault();
          if (controlled.classList.contains("collapse")) {
            const open = !controlled.classList.contains("show");
            controlled.classList.toggle("show", open);
            controlled.style.display = open ? "block" : "none";
          } else {
            setOpen(controlled, true);
          }
          return;
        }
      }

      if (page === "scholarship" && target.closest(".graidant-border.cursor-pointer")) {
        event.preventDefault();
        setOpen(root.querySelector("#SCHOapplicantPremiumModal"), true);
        return;
      }

      if (target.closest(".btn-join")) {
        const modal = root.querySelector<HTMLElement>("#joinPremiumModal");
        if (modal) {
          event.preventDefault();
          setOpen(modal, true);
        }
        return;
      }

      if (target.closest('[data-text="Request it here"]')) {
        const modal = root.querySelector<HTMLElement>("#applicantPremiumModal");
        if (modal) {
          event.preventDefault();
          setOpen(modal, true);
        }
        return;
      }

      if (target.closest("[href='#contact']")) {
        event.preventDefault();
        router.push("/contact");
        return;
      }

      if (target.closest(".premium-unlock-link, [data-premium-purchase]")) {
        event.preventDefault();
        return;
      }

      if (studentState === "anonymous" && link && isGuestSidebarGateLink(link)) {
        event.preventDefault();
        setOpen(document.querySelector("#pgsLoginPopup"), true);
        return;
      }

      if (target.closest(".save-program, .save-course, .heart-icon, [data-save-id]")) {
        event.preventDefault();
        if (root.querySelector(".pgs-auth-account")) void saveCatalogItem(target);
        else setOpen(document.querySelector("#pgsLoginPopup"), true);
        return;
      }

      if (target.closest(".premium-video-play, [data-premium-video], [href='#premiumVideoOverlay']")) {
        event.preventDefault();
        setOpen(document.querySelector("#premiumVideoOverlay"), true);
        return;
      }

      const modalCta = target.closest<HTMLButtonElement>(".premium-modal-overlay .cta-btn");
      const modal = modalCta?.closest<HTMLElement>(".premium-modal-overlay");
      if (modalCta && modal) {
        event.preventDefault();
        void submitModalPanel(modal, page, modalCta);
        return;
      }

      if (
        target.closest(".premium-modal-close, .pgs-modal-close, .pgs-login-popup-close, .close-btn, [data-dismiss='modal']")
        || target.classList.contains("premium-modal-overlay")
        || target.classList.contains("pgs-login-popup-overlay")
      ) {
        setOpen(target.closest<HTMLElement>(".premium-modal-overlay, .pgs-login-popup-overlay"), false);
        return;
      }

      const rawHref = link?.getAttribute("href");
      if (link && rawHref?.toLowerCase() === "/logout") {
        event.preventDefault();
        void signOutAndNavigate().catch(() => router.push("/logout"));
        return;
      }
      if (link && rawHref?.startsWith("/") && !rawHref.startsWith("//") && !link.hasAttribute("download") && link.target !== "_blank" && event instanceof MouseEvent && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.preventDefault();
        router.push(rawHref);
      }
    }, options);

    revealLegacyAnimations(root);
    if (page.startsWith("countries")) stabilizeCountryPageLayout(root);

    if (page === "explorecountries") wireExploreCountrySwitcher(root, abort.signal);
    if (page === "cvreadyprogram") wireCvReadyCatalogFilters(root, abort.signal);
    wirePremiumDashboardExplorer(root, abort.signal);
    if (page === "login") wireLoginSignupToggle(root, abort.signal);

    return () => {
      abort.abort();
      delete popupWindow.showLoginRequiredPopup;
      delete root.dataset.interactionsReady;
    };
  }, [page, router, studentState, children, html]);

  if (children) {
    return (
      <>
        <ViewportWidthOverlay />
        <main ref={rootRef} data-legacy-page={page} data-student-state={studentState}>
          {children}
        </main>
      </>
    );
  }

  return (
    <>
      <ViewportWidthOverlay />
      <main ref={rootRef} data-legacy-page={page} data-student-state={studentState} dangerouslySetInnerHTML={{ __html: html ?? "" }} />
    </>
  );
}
