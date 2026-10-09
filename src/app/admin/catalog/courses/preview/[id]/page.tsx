/**
 * COURSE2c — staff Ops Courses template preview.
 * URL: /ops/cms/courses/preview/:id (rewrite → this page).
 * Renders Programs Courses body from CMS draft. Never public /purpleboard.
 */
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { coursesCmsDraftToTemplate } from "@/features/programs-courses/courses-cms-preview-map";
import { coursesDetailBodyToFixture } from "@/features/programs-courses/courses-detail-validation";
import { ProgramsCoursesPreviewShell } from "@/features/programs-courses/programs-courses-preview-shell";
import {
  getCatalogDraftRevision,
  getCatalogPreviewDraft
} from "@/lib/content-preview";
import { marketingMediaAlt, marketingMediaUrl } from "@/lib/media-url";
import { getStaffContext, StaffAuthorizationError } from "@/lib/staff-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validUuid } from "@/lib/http";
import "./courses-ops-preview.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ revision?: string }>;
};

export default async function CoursesOpsTemplatePreviewPage({ params, searchParams }: PageProps) {
  const context = await getStaffContext();
  if (!context) {
    const { id: idRaw } = await params;
    const { revision: revisionParam } = await searchParams;
    const rev = typeof revisionParam === "string" && revisionParam ? `?revision=${revisionParam}` : "";
    redirect(
      `/studio/login?redirect=${encodeURIComponent(`/ops/cms/courses/preview/${idRaw}${rev}`)}&surface=studio`
    );
  }
  if (!context.permissions.has("catalog.read")) {
    throw new StaffAuthorizationError(403, "You do not have permission for this operation.");
  }
  const { id: idRaw } = await params;
  const { revision: revisionParam } = await searchParams;
  const entityId = Number(idRaw);
  if (!Number.isSafeInteger(entityId) || entityId <= 0) notFound();

  let draft =
    typeof revisionParam === "string" && validUuid(revisionParam)
      ? await getCatalogDraftRevision("courses", entityId, revisionParam)
      : null;

  if (!draft) {
    const cookieDraft = await getCatalogPreviewDraft("courses");
    if (cookieDraft && cookieDraft.entityId === entityId) draft = cookieDraft;
  }

  if (!draft) notFound();

  const supabase = await createSupabaseServerClient();

  function mediaIdFrom(value: unknown): string | null {
    return typeof value === "string" && /^[0-9a-f-]{36}$/i.test(value.trim()) ? value.trim() : null;
  }

  // Only the draft’s Image field — never fall back to a live/old photo (that showed the wrong hero).
  const imageId = mediaIdFrom(draft.values.image_asset_id);
  const brochureId = mediaIdFrom(draft.values.brochure_asset_id);
  const mediaIds = [imageId, brochureId].filter((value): value is string => Boolean(value));

  const mediaById = new Map<string, { bucket: string | null; path: string | null; alt_text: string | null }>();
  if (mediaIds.length) {
    const { data: mediaRows } = await supabase
      .from("media_assets")
      .select("id,bucket,path,alt_text")
      .in("id", mediaIds);
    for (const row of mediaRows ?? []) {
      mediaById.set(String(row.id), row);
    }
  }

  let tagNames: string[] = [];
  if (draft.tagIds.length) {
    const { data: tags } = await supabase.from("catalog_tags").select("id,name").in("id", draft.tagIds);
    const byId = new Map((tags ?? []).map((tag) => [Number(tag.id), String(tag.name ?? "")]));
    tagNames = draft.tagIds.map((tagId) => byId.get(tagId) ?? "").filter(Boolean);
  }

  const imageMedia = imageId ? mediaById.get(imageId) ?? null : null;
  const brochureMedia = brochureId ? mediaById.get(brochureId) ?? null : null;
  const imageUrl = marketingMediaUrl(imageMedia);
  const brochureUrl = marketingMediaUrl(brochureMedia);
  const imageLabel =
    (imageMedia?.alt_text && imageMedia.alt_text.trim()) ||
    (imageMedia?.path ? imageMedia.path.split("/").pop() : "") ||
    "";
  const course = coursesCmsDraftToTemplate({
    id: entityId,
    values: draft.values,
    tagNames,
    imageUrl,
    imageAlt: marketingMediaAlt(imageMedia, String(draft.values.title ?? "Course")),
    brochureUrl
  });

  const hasDetailBody = coursesDetailBodyToFixture(draft.values.detail_body) !== null;
  const title = typeof draft.values.title === "string" ? draft.values.title : `Course #${entityId}`;

  return (
    <main className="ops-page ops-courses-preview">
      <aside className="ops-courses-preview__banner" role="status" aria-label="Courses draft preview">
        <div>
          <strong>Courses template preview</strong>
          <span>
            Draft #{entityId} · {title}. Staff only — not a public page.{" "}
            {hasDetailBody
              ? "Rendering the saved C1–C13 detail body."
              : "No valid detail body saved — flat CMS fields mapped only."}{" "}
            {imageUrl
              ? `Hero image: ${imageLabel || "attached"}.`
              : "No hero image on this draft — open Image dropdown, pick fullstack1.jpg (or re-upload), Save Draft, then Preview."}
          </span>
        </div>
        <div className="ops-courses-preview__banner-actions">
          <Link className="ops-courses-preview__link" href="/ops/cms/courses">
            Back to Courses
          </Link>
          <form action="/api/admin/preview/exit" method="post">
            <button type="submit">Exit preview</button>
          </form>
        </div>
      </aside>
      <div className="ops-courses-preview__frame" data-courses-ops-preview="true">
        <ProgramsCoursesPreviewShell
          course={course}
          cmsFlatPreview={!hasDetailBody}
          hideEmptySections={hasDetailBody}
        />
      </div>
    </main>
  );
}
