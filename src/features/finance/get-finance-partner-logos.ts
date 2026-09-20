/**
 * Load published Finance partner logos for the marquee.
 * CMS truth: finance_partner_logos.image_asset_id → media_assets (marketing-public).
 * Fixture fallback: if no CMS image yet, use FINANCE_PARTNER_LOGOS by name.
 */
import { FINANCE_PARTNER_LOGOS } from "@/features/finance/content";
import { marketingMediaUrl, type MarketingMedia } from "@/lib/media-url";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type FinancePartnerLogo = {
  name: string;
  src: string;
};

const fixtureByName = new Map(
  FINANCE_PARTNER_LOGOS.map((logo) => [logo.name.toLowerCase(), logo.src])
);

type LogoRow = {
  name: string;
  media_assets: MarketingMedia | MarketingMedia[] | null;
};

export async function getFinancePartnerLogos(): Promise<FinancePartnerLogo[]> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("finance_partner_logos")
      .select(
        "name,display_order,media_assets!finance_partner_logos_image_asset_id_fkey(bucket,path,alt_text)"
      )
      .eq("published", true)
      .order("display_order", { ascending: true })
      .order("id", { ascending: true });

    if (error || !data?.length) {
      return [...FINANCE_PARTNER_LOGOS];
    }

    return (data as LogoRow[]).map((row) => {
      const cmsUrl = marketingMediaUrl(row.media_assets);
      const fixture = fixtureByName.get(row.name.trim().toLowerCase());
      return {
        name: row.name,
        src: cmsUrl || fixture || FINANCE_PARTNER_LOGOS[0].src
      };
    });
  } catch {
    return [...FINANCE_PARTNER_LOGOS];
  }
}
