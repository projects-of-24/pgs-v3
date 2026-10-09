/**
 * WS-FILL-3 — Premium #FEED Top picks from mentor assignments.
 * Empty → caller may fall back to fixture (preview) or show empty (live).
 */
import "server-only";

import {
  STUDENT_FEED_TOP_PICK_THUMB,
  type StudentFeedTopPick,
  type StudentFeedTopPickStatus
} from "@/features/student-feed/student-feed-top-picks";
import { marketingMediaUrl, type MarketingMedia } from "@/lib/media-url";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AssignmentRow = {
  id: string;
  status: string;
  sort_order: number;
  created_at: string;
  courses: {
    id: number;
    title: string;
    published: boolean;
    media_assets: MarketingMedia | MarketingMedia[] | null;
  } | null;
};

function asOne<T>(value: T | T[] | null | undefined): T | null {
  if (value == null) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function mapStatus(value: string): StudentFeedTopPickStatus {
  return value === "FileldUp" ? "FileldUp" : "InProgress";
}

export async function loadFeedTopPicks(studentId: string): Promise<StudentFeedTopPick[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("student_feed_top_picks")
    .select(
      "id,status,sort_order,created_at,courses!inner(id,title,published,media_assets!courses_image_asset_id_fkey(bucket,path,alt_text))"
    )
    .eq("student_id", studentId)
    .eq("courses.published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(60);

  if (error || !data) return [];

  const picks: StudentFeedTopPick[] = [];
  for (const row of data as unknown as AssignmentRow[]) {
    const course = row.courses;
    if (!course) continue;
    const media = asOne(course.media_assets);
    picks.push({
      id: row.id,
      title: course.title,
      status: mapStatus(row.status),
      tag: "COURSE",
      tagColor: "#00abbd",
      imageUrl: marketingMediaUrl(media) || STUDENT_FEED_TOP_PICK_THUMB,
      href: `/programsfull/program/${course.id}`,
      createdAt: row.created_at
    });
  }
  return picks;
}
