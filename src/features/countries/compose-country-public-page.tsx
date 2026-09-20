/**
 * Shared public country page compose — slug/route driven, not UK-special.
 *
 * header → strip (univMeet CMS) → hero (CMS) → CountryBodyShell → footer
 *
 * Add a country: map route in `country-public-hero.ts` + content slug + CMS row.
 * Premium application modals omitted on purpose (`applyPremiumBusinessRule`).
 * Track C (popups/payments) owns future surfaces.
 */
import type { ReactElement } from "react";
import { ContentPreviewBanner } from "@/components/content-preview-banner";
import { LegacyPage } from "@/components/legacy-page";
import { StaffPreviewBanner } from "@/components/staff-preview-banner";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import {
  countrySlugFromPublicRoute,
  getPublishedCountryHeroFigma,
  type PublicCountryRoute,
} from "@/features/countries/country-public-hero";
import type { CountryPageContent } from "@/features/countries/content";
import type { CountryHeroFigmaImages } from "@/features/countries/country-hero-figma";
import {
  applyUnivMeetToHeaderHtml,
  buildPublicStripHtml,
} from "@/features/shell/public-strip";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import {
  applyPublicContent,
  getPublicContent,
  type DestinationContent,
  type PublicContentSlug,
} from "@/lib/public-content";
import {
  applySharedHelloAspirant,
  HELLO_ASPIRANT_DEFAULT_AVATAR,
} from "@/legacy/pages/hello-aspirant";
import { getPublicFooterHtml } from "@/legacy/pages/public-footer";
import { getPublicHeaderHtml } from "@/legacy/pages/public-header";
import { applySharedPublicSidebar } from "@/legacy/pages/public-sidebar";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl,
} from "@/lib/student-experience";

import "@/features/shell/legacy-header-breakpoints.css";

export type CountryPhotoshopParts = {
  /** This country's own body. Do not pass another country's shell. */
  Body: (props: { content: CountryPageContent }) => ReactElement;
  getContent: (slug: string) => CountryPageContent | null;
  buildHero: (images?: Partial<CountryHeroFigmaImages>) => string;
};

function applyChrome(
  html: string,
  contentSlug: PublicContentSlug,
  studentState: "anonymous" | "authenticated_standard" | "authenticated_premium",
  state: Awaited<ReturnType<typeof resolveStudentExperience>>,
  helloAvatar: string,
  publicContent: DestinationContent,
): string {
  let next = applySharedPublicSidebar(html, studentState, {
    name: state && state.kind !== "anonymous" ? state.name : "User",
  });
  next = applySharedHelloAspirant(next, studentState, {
    name: state && state.kind !== "anonymous" ? state.name : "Aspirant",
    avatarUrl: helloAvatar,
  });
  next = applyPublicContent(contentSlug, next, publicContent);
  if (state && state.kind !== "anonymous") {
    next = applyAuthenticatedShell(next, {
      name: state.name,
      unreadCount: state.unreadCount,
      premium: state.kind === "authenticated_premium",
      notifications: state.notifications,
      notificationReadOnly: Boolean(state.preview),
    });
    next = applyStudentIdentity(next, state, helloAvatar);
  }
  return applyPremiumBusinessRule(next);
}

export async function composeCountryPublicPage(
  route: PublicCountryRoute,
  parts: CountryPhotoshopParts,
) {
  const countrySlug = countrySlugFromPublicRoute(route);
  if (!countrySlug) {
    throw new Error(`Unknown country public route: ${route}`);
  }

  const contentSlug = route as PublicContentSlug;

  const [publicContent, state, univMeet] = await Promise.all([
    getPublicContent(contentSlug),
    resolveStudentExperience(),
    getPublishedUnivMeet(),
  ]);

  if (!publicContent) {
    throw new Error(`Missing public content defaults for ${route}`);
  }

  const dest = publicContent as DestinationContent;
  const destinationName = dest.destinationName || countrySlug;
  const hero = await getPublishedCountryHeroFigma(route, destinationName);

  const base = parts.getContent(countrySlug);
  if (!base) {
    throw new Error(
      `Missing CountryPage content for slug ${countrySlug} (${route})`,
    );
  }

  const bodyContent = {
    ...base,
    intro: {
      ...base.intro,
      titleLine1: dest.titleLineOne,
      titleLine2: dest.titleLineTwo,
      subtitle: dest.subtitle,
      tagline: dest.kicker,
      ctaLabel: dest.contactCta,
      ctaHref: base.intro.ctaHref,
    },
  };

  const studentState = state?.kind ?? "anonymous";
  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

  // No country premium-application modal HTML: `applyPremiumBusinessRule` always
  // removes #countriesUsaJoinPremiumModal. Track C (popups/payments) owns future surfaces.
  let topHtml = [
    applyUnivMeetToHeaderHtml(getPublicHeaderHtml(), univMeet),
    buildPublicStripHtml(univMeet),
    parts.buildHero(hero),
  ].join("");
  let bottomHtml = getPublicFooterHtml();

  topHtml = applyChrome(
    topHtml,
    contentSlug,
    studentState,
    state,
    helloAvatar,
    dest,
  );
  bottomHtml = applyChrome(
    bottomHtml,
    contentSlug,
    studentState,
    state,
    helloAvatar,
    dest,
  );

  return (
    <>
      <ContentPreviewBanner />
      {state && state.kind !== "anonymous" && state.preview ? (
        <StaffPreviewBanner
          actorName={state.preview.actorName}
          mode="student"
          targetName={state.preview.targetName}
        />
      ) : null}
      <LegacyPage page={route} studentState={studentState}>
        <div
          dangerouslySetInnerHTML={{ __html: topHtml }}
          suppressHydrationWarning
        />
        <parts.Body content={bodyContent} />
        <div
          dangerouslySetInnerHTML={{ __html: bottomHtml }}
          suppressHydrationWarning
        />
      </LegacyPage>
    </>
  );
}
