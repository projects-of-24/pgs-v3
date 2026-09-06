/**
 * Family A — anonymous feed preview.
 * Same locked body as `/preview/student-feed`; identity = owner placebo.
 * Avatar frame CSS unchanged — image src only.
 * Live `/student/dashboard` UNTOUCHED. Premium = `/preview/student-feed-premium`.
 */
import { LegacyPage } from "@/components/legacy-page";
import { listFeedUpcomingEvents } from "@/features/student-feed/list-feed-upcoming-events";
import { StudentFeedPreviewShell } from "@/features/student-feed/student-feed-preview-shell";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import {
  applySharedHelloAspirant,
  HELLO_ASPIRANT_DEFAULT_AVATAR
} from "@/legacy/pages/hello-aspirant";
import { countriesUkStripHtml } from "@/legacy/pages/countriesuk";
import { getPublicFooterHtml } from "@/legacy/pages/public-footer";
import { getPublicHeaderHtml } from "@/legacy/pages/public-header";
import { applySharedPublicSidebar } from "@/legacy/pages/public-sidebar";

export const dynamic = "force-dynamic";

export default async function StudentFeedAnonymousPreviewPage() {
  const studentState = "anonymous" as const;
  const upcomingEvents = await listFeedUpcomingEvents();

  let topHtml = [getPublicHeaderHtml(), countriesUkStripHtml()].join("");
  topHtml = applySharedPublicSidebar(topHtml, studentState, {
    name: "User"
  });
  topHtml = applySharedHelloAspirant(topHtml, studentState, {
    name: "Aspirant",
    avatarUrl: HELLO_ASPIRANT_DEFAULT_AVATAR
  });

  let footerHtml = getPublicFooterHtml();

  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  return (
    <LegacyPage page="preview-student-feed-anonymous" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <StudentFeedPreviewShell upcomingEvents={upcomingEvents} anonymous />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}
