import "server-only";

import { createClient } from "@supabase/supabase-js";
import { matchesCardSurface } from "@/features/admin-cms/lib/card-surfaces";
import { marketingMediaUrl, type MarketingMedia } from "@/lib/media-url";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { courseToUsmleExploreCard } from "./course-to-usmle-explore-card";
import type { UsmleExploreCourseCards } from "./usmle-explore-types";

export type { UsmleExploreCourseCards };

/**
 * Published courses opted into the USMLE Rotation explore surface.
 * Dedicated surface — does not inherit purpleboard / CV Ready sharing.
 * Sort: latest updated first.
 */
export async function getUsmleRotationExploreCourses(): Promise<
  UsmleExploreCourseCards[]
> {
  const config = getSupabasePublicConfig();
  if (!config) return [];

  const client = createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client
    .from("courses")
    .select(
      [
        "id",
        "title",
        "short_description",
        "description",
        "published",
        "featured",
        "card_surfaces",
        "badge",
        "badge_color",
        "badge_text_color",
        "location",
        "duration",
        "mode",
        "program_type",
        "tags_text",
        "card_dates_rail",
        "card_promo_title",
        "card_promo_subtitle",
        "card_promo_date",
        "card_cta_label",
        "starts_on",
        "ends_on",
        "updated_at",
        "highlight_1",
        "image_asset_id",
        "media_assets!courses_image_asset_id_fkey(bucket,path,alt_text)",
      ].join(","),
    )
    .eq("published", true)
    .order("updated_at", { ascending: false })
    .limit(60);

  if (error || !data) return [];

  const rows = data as unknown as Array<Record<string, unknown>>;

  return rows
    .filter((row) => matchesCardSurface(row, "usmlerotation"))
    .map((row) => {
      const media = row.media_assets as MarketingMedia | undefined;
      const imageUrl = marketingMediaUrl(media);
      const draft: Record<string, unknown> = {
        ...row,
        image_url: imageUrl || undefined,
      };
      return {
        id: String(row.id),
        card: courseToUsmleExploreCard(draft),
      };
    });
}
