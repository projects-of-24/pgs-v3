import { LegacyPage } from "@/components/legacy-page";
import { ContentPreviewBanner } from "@/components/content-preview-banner";
import { StaffPreviewBanner } from "@/components/staff-preview-banner";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { applyPublicContent, getPublicContent, type PublicContentSlug } from "@/lib/public-content";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import { keepPurpleBoardPublic } from "@/lib/student-legacy-navigation";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { resolveActorContext } from "@/lib/actor-context";
import { resolveStudentExperience, studentExperienceAvatarUrl } from "@/lib/student-experience";
import { applyFeaturedCatalogCards, applyPublishedCatalogCards, applyPublishedCatalogDetail, applyPublishedEventDetail, applyPublishedEvents, getPublicCatalogCards, getPublicCatalogDetail, getPublicEvent, getPublicEvents } from "@/lib/public-catalog";

type Props<TSlug extends PublicContentSlug> = {
  slug: TSlug;
  html: string;
  catalogDetail?:{kind:"programs"|"courses";id:number};
  eventId?:number;
  authenticatedActorFallback?:boolean;
};

export async function PublicLegacyPage<TSlug extends PublicContentSlug>({ slug, html, catalogDetail, eventId, authenticatedActorFallback=false }: Props<TSlug>) {
  const content = await getPublicContent(slug);
  let rendered = applyPublicContent(slug, html, content);
  rendered = keepPurpleBoardPublic(rendered, slug === "purpleboard");
  const state = await resolveStudentExperience();
  const studentState=state?.kind??"anonymous";
  if(slug==="cvreadyprogram"||slug==="purpleboard"){
    const kind=slug==="cvreadyprogram"?"programs":"courses";
    const studentId=state&&state.kind!=="anonymous"?state.user.id:undefined;
    const cards=await getPublicCatalogCards(kind,studentId);
    rendered=applyPublishedCatalogCards(rendered,kind,cards);
    if(slug==="cvreadyprogram"){
      const [featuredCourses,featuredPrograms]=await Promise.all([
        getPublicCatalogCards("courses",studentId,true),
        getPublicCatalogCards("programs",studentId,true)
      ]);
      rendered=applyFeaturedCatalogCards(rendered,"courses",featuredCourses);
      rendered=applyFeaturedCatalogCards(rendered,"programs",featuredPrograms);
    }
  }
  if(catalogDetail){const detail=await getPublicCatalogDetail(catalogDetail.kind,catalogDetail.id,state&&state.kind!=="anonymous"?state.user.id:undefined);if(detail)rendered=applyPublishedCatalogDetail(rendered,detail);}
  if(slug==="purpleevents"||slug==="purpleevents-session"){rendered=applyPublishedEvents(rendered,await getPublicEvents());}
  if(slug==="purpleevents-session"&&eventId){const event=await getPublicEvent(eventId);if(event)rendered=applyPublishedEventDetail(rendered,event);}
  if (state&&state.kind!=="anonymous") {
    const avatarUrl = await studentExperienceAvatarUrl(state);
    rendered = applyAuthenticatedShell(rendered, {
      name: state.name,
      unreadCount: state.unreadCount,
      premium: state.kind === "authenticated_premium",
      notifications: state.notifications,
      notificationReadOnly: Boolean(state.preview)
    });
    rendered = applyStudentIdentity(rendered, state, avatarUrl);
  } else if (!state && authenticatedActorFallback) {
    const actor=await resolveActorContext();
    if(actor.authenticated){
      // No Ops bridges from public/student chrome — home only.
      rendered=applyAuthenticatedShell(rendered,{
        name:actor.staff?.displayName||actor.user.email||"Signed-in account",
        unreadCount:0,
        accountHref:"/",
        profileHref:"/",
        savedHref:"/"
      });
    }
  }
  rendered = applyPremiumBusinessRule(rendered);
  return (
    <>
      <ContentPreviewBanner />
      {state && state.kind !== "anonymous" && state.preview ? (
        <StaffPreviewBanner actorName={state.preview.actorName} mode="student" targetName={state.preview.targetName} />
      ) : null}
      <LegacyPage page={slug} html={rendered} studentState={studentState} />
    </>
  );
}
