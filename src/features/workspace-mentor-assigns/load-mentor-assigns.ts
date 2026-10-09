/**
 * FTP-B7b — load shared Mentor Assigns tips + resources.
 */
import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type MentorTipRow = {
  id: string;
  label: string;
  body: string;
  sortOrder: number;
};

export type MentorResourceRow = {
  id: string;
  label: string;
  url: string;
  sortOrder: number;
};

export type MentorAssignsLoad = {
  tips: MentorTipRow[];
  resources: MentorResourceRow[];
  wired: boolean;
};

export async function loadMentorAssigns(): Promise<MentorAssignsLoad> {
  const supabase = await createSupabaseServerClient();
  const [tipsResult, resourcesResult] = await Promise.all([
    supabase
      .from("progress_tips")
      .select("id,label,body,sort_order,active")
      .eq("active", true)
      .order("sort_order")
      .order("created_at"),
    supabase
      .from("progress_resources")
      .select("id,label,url,sort_order,active")
      .eq("active", true)
      .order("sort_order")
      .order("created_at")
  ]);

  if (tipsResult.error || resourcesResult.error) {
    // Table missing / not applied → fail closed for editor (empty + not wired).
    return { tips: [], resources: [], wired: false };
  }

  return {
    wired: true,
    tips: (tipsResult.data ?? []).map((row) => ({
      id: row.id as string,
      label: String(row.label ?? ""),
      body: String(row.body ?? ""),
      sortOrder: Number(row.sort_order ?? 0)
    })),
    resources: (resourcesResult.data ?? []).map((row) => ({
      id: row.id as string,
      label: String(row.label ?? ""),
      url: String(row.url ?? ""),
      sortOrder: Number(row.sort_order ?? 0)
    }))
  };
}
