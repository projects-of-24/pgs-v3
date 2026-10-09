/**
 * FTP-B7c — Useful Tips + Resource Drop for Track Progress Premium.
 * Same shared truth as Mentor Assigns (`progress_tips` · `progress_resources`).
 */
import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProgressTipSlide = {
  id: string;
  label: string;
  body: string;
};

export type ProgressResourceItem = {
  id: string;
  label: string;
  url: string;
};

export type ProgressTipsLoad = {
  slides: ProgressTipSlide[];
  wired: boolean;
};

export type ProgressResourcesLoad = {
  items: ProgressResourceItem[];
  wired: boolean;
};

export async function loadProgressTips(): Promise<ProgressTipsLoad> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("progress_tips")
    .select("id,label,body,sort_order")
    .eq("active", true)
    .order("sort_order")
    .order("created_at");

  if (error) {
    return { slides: [], wired: false };
  }

  const slides = (data ?? [])
    .map((row) => {
      const label = typeof row.label === "string" ? row.label.trim() : "";
      const body = typeof row.body === "string" ? row.body.trim() : "";
      if (!label || !body) return null;
      return { id: row.id as string, label, body };
    })
    .filter((row): row is ProgressTipSlide => Boolean(row));

  return { slides, wired: true };
}

export async function loadProgressResources(): Promise<ProgressResourcesLoad> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("progress_resources")
    .select("id,label,url,sort_order")
    .eq("active", true)
    .order("sort_order")
    .order("created_at");

  if (error) {
    return { items: [], wired: false };
  }

  const items = (data ?? [])
    .map((row) => {
      const label = typeof row.label === "string" ? row.label.trim() : "";
      if (!label) return null;
      return {
        id: row.id as string,
        label,
        url: typeof row.url === "string" ? row.url.trim() : ""
      };
    })
    .filter((row): row is ProgressResourceItem => Boolean(row));

  return { items, wired: true };
}
