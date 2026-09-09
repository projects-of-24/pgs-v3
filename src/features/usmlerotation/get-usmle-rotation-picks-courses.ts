import "server-only";

import { createClient } from "@supabase/supabase-js";
import { matchesCardSurface } from "@/features/admin-cms/lib/card-surfaces";
import { marketingMediaUrl, type MarketingMedia } from "@/lib/media-url";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { courseToUsmlePicksCard } from "./course-to-usmle-picks-card";
import type { UsmlePicksCourseCard } from "./usmle-picks-types";

export type { UsmlePicksCourseCard };

/**
 * Published courses opted into the #Pgs picks surface.
 * Dedicated — does not inherit purpleboard / usmlerotation / CV Ready.
 * Sort: latest updated first.
 */
export async function getUsmleRotationPicksCourses(): Promise<
  UsmlePicksCourseCard[]
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
        "published",
        "card_surfaces",
        "card_cta_label",
        "highlight_1",
        "updated_at",
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
    .filter((row) => matchesCardSurface(row, "pgs_picks"))
    .map((row) => {
      const media = row.media_assets as MarketingMedia | undefined;
      const imageUrl = marketingMediaUrl(media);
      const draft: Record<string, unknown> = {
        ...row,
        image_url: imageUrl || undefined,
      };
      return {
        id: String(row.id),
        card: courseToUsmlePicksCard(draft),
      };
    });
}
