/**
 * Published #univMeet slots for public strip + drawer.
 * Table: university_meeting_slots (CMS → Admin → #univMeet Dates).
 */
import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export type UnivMeetChip = {
  day: string;
  /** Hostinger live format: "Aug 29" (month abbr + day) */
  monthLine: string;
};

export type UnivMeetPublic = {
  chips: UnivMeetChip[];
  href: string;
};

/** Legacy hardcoded chips when CMS has no published slots. */
export const UNIVMEET_FALLBACK_CHIPS: UnivMeetChip[] = [
  { day: "20", monthLine: "Aug 26" },
  { day: "29", monthLine: "Aug 29" },
];

const DEFAULT_HREF = "/Programsfull";
const CHIP_LIMIT = 2;

function formatChip(startsAt: string | null | undefined): UnivMeetChip | null {
  if (!startsAt) return null;
  const d = new Date(String(startsAt));
  if (Number.isNaN(d.getTime())) return null;
  const day = String(d.getDate());
  const mon = d.toLocaleString("en-GB", { month: "short" });
  return { day, monthLine: `${mon} ${day}` };
}

export async function getPublishedUnivMeet(): Promise<UnivMeetPublic> {
  const config = getSupabasePublicConfig();
  if (!config) {
    return { chips: UNIVMEET_FALLBACK_CHIPS, href: DEFAULT_HREF };
  }

  try {
    const client = createClient(config.url, config.key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await client
      .from("university_meeting_slots")
      .select("starts_at, booking_url, display_order")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .limit(CHIP_LIMIT);

    if (error || !data?.length) {
      return { chips: UNIVMEET_FALLBACK_CHIPS, href: DEFAULT_HREF };
    }

    const chips: UnivMeetChip[] = [];
    let href = DEFAULT_HREF;
    for (const row of data) {
      const chip = formatChip(
        row.starts_at == null ? null : String(row.starts_at),
      );
      if (chip) chips.push(chip);
      const url = row.booking_url == null ? "" : String(row.booking_url).trim();
      if (url && href === DEFAULT_HREF) href = url;
    }

    if (!chips.length) {
      return { chips: UNIVMEET_FALLBACK_CHIPS, href };
    }
    return { chips, href };
  } catch {
    return { chips: UNIVMEET_FALLBACK_CHIPS, href: DEFAULT_HREF };
  }
}
