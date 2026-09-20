/**
 * Site-wide Upcoming Events for student #feed.
 * ADOPT junior `listFeedUpcomingEvents` — published `events` only.
 * ADAPT: V3 has no `lifecycle_phase`; filter `published = true`.
 * DEFERRED: per-student Dash CMS `upcoming_events` pin list (backend/CMS backlog).
 */
import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import type { FeedUpcomingEvent } from "./feed-upcoming-event";

export type { FeedUpcomingEvent } from "./feed-upcoming-event";
export { FEED_UPCOMING_CHIP_LIMIT } from "./feed-upcoming-event";

function feedChipDate(iso: string | null): { date: string; time: string } {
  if (!iso) return { date: "TBA", time: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "TBA", time: "" };
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const time = d.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
  return { date: `${month} ${day}`, time };
}

/** Published events for feed calendar + chips (site-wide default). */
export async function listFeedUpcomingEvents(): Promise<FeedUpcomingEvent[]> {
  const config = getSupabasePublicConfig();
  if (!config) return [];

  const supabase = createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const { data, error } = await supabase
    .from("events")
    .select("id, title, starts_at, summary, mode, host, top_label, display_order")
    .eq("published", true)
    .order("starts_at", { ascending: true, nullsFirst: false })
    .order("display_order", { ascending: true });

  if (error || !data) return [];

  return data.map((row) => {
    const startsAt = typeof row.starts_at === "string" ? row.starts_at : null;
    const chip = feedChipDate(startsAt);
    const summary = typeof row.summary === "string" ? row.summary : "";
    const topLabel = typeof row.top_label === "string" ? row.top_label : "";
    const host = typeof row.host === "string" ? row.host : "";
    const mode = typeof row.mode === "string" ? row.mode : "";
    return {
      id: String(row.id),
      title: String(row.title ?? "Event"),
      date: chip.date,
      time: chip.time,
      blurb: summary || topLabel || host || "",
      mode: mode || "Online",
      startsAt
    };
  });
}
