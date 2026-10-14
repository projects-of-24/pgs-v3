/**
 * ARCHIVED — not a route (2026-10-10 template cutover).
 * Prior live `/countriesuk` page before CountriesDestinationPreviewShell.
 * Rollback / content reference only. Served route: `src/app/countriesuk/page.tsx`.
 *
 * ---
 * /countriesuk — own Photoshop file at src/features/countries-uk.
 * Shared header/footer HTML · strip HTML · CountryUkBodyShell.
 */
import { ContentPreviewBanner } from "@/components/content-preview-banner";
import { LegacyPage } from "@/components/legacy-page";
import { StaffPreviewBanner } from "@/components/staff-preview-banner";
import { buildCountryHeroFigmaHtml } from "@/features/countries-uk/country-hero-figma";
import { getPublishedCountryHeroFigma } from "@/features/countries/country-public-hero";
import { CountryUkBodyShell } from "@/features/countries-uk/country-uk-body-shell";
import { getCountryContent } from "@/features/countries-uk/content";
import "@/features/countries-uk/countries.css";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { cmsMetadata } from "@/lib/cms-metadata";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import { applyPublicContent, getPublicContent, type DestinationContent } from "@/lib/public-content";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import {
  countriesUkModalsHtml,
  countriesUkStripHtml,
} from "@/legacy/pages/countriesuk";
import { getPublicHeaderHtml } from "@/legacy/pages/public-header";
import { applySharedPublicSidebar } from "@/legacy/pages/public-sidebar";
import { applySharedHelloAspirant, HELLO_ASPIRANT_DEFAULT_AVATAR } from "@/legacy/pages/hello-aspirant";
import { getPublicFooterHtml } from "@/legacy/pages/public-footer";
import { resolveStudentExperience, studentExperienceAvatarUrl } from "@/lib/student-experience";

export async function generateMetadata() {
  return cmsMetadata("countriesuk");
}

export const dynamic = "force-dynamic";

function applyChrome(
  html: string,
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
  next = applyPublicContent("countriesuk", next, publicContent);
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

export default async function CountriesUkPage() {
  const [publicContent, state] = await Promise.all([
    getPublicContent("countriesuk"),
    resolveStudentExperience(),
  ]);
  const hero = await getPublishedCountryHeroFigma(
    "countriesuk",
    publicContent.destinationName,
  );

  const base = getCountryContent("uk");
  if (!base) {
    throw new Error("countriesuk missing CountryPage content for slug uk");
  }

  const bodyContent = {
    ...base,
    intro: {
      ...base.intro,
      titleLine1: publicContent.titleLineOne,
      titleLine2: publicContent.titleLineTwo,
      subtitle: publicContent.subtitle,
      tagline: publicContent.kicker,
      ctaLabel: publicContent.contactCta,
      ctaHref: base.intro.ctaHref,
    },
  };

  const studentState = state?.kind ?? "anonymous";
  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

  // Balanced HTML chunks only (no mid-tag React islands) — same lesson as hero wire.
  let topHtml = [
    getPublicHeaderHtml(),
    countriesUkStripHtml(),
    buildCountryHeroFigmaHtml(hero),
  ].join("");
  let bottomHtml = [countriesUkModalsHtml(), getPublicFooterHtml()].join("");

  topHtml = applyChrome(topHtml, studentState, state, helloAvatar, publicContent);
  bottomHtml = applyChrome(bottomHtml, studentState, state, helloAvatar, publicContent);

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
      <LegacyPage page="countriesuk" studentState={studentState}>
        <div dangerouslySetInnerHTML={{ __html: topHtml }} suppressHydrationWarning />
        <CountryUkBodyShell content={bodyContent} />
        <div dangerouslySetInnerHTML={{ __html: bottomHtml }} suppressHydrationWarning />
      </LegacyPage>
    </>
  );
}
