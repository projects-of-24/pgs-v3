/**
 * WS-COMMENTS-2 — student #FEED Comments from `workspace_comments`
 * (same truth as Desk Comments). Student sees student_visible only.
 */
import "server-only";

import { previewAwareSupabaseClient } from "@/lib/staff-preview-server";

export type FeedCommentRow = {
  id: string;
  parentId: string | null;
  authorId: string;
  authorName: string;
  isStudent: boolean;
  body: string;
  createdAt: string;
};

export type FeedCommentsData = {
  studentId: string;
  studentName: string;
  comments: FeedCommentRow[];
  fromStore: true;
};

export async function loadFeedComments(
  studentId: string | null | undefined,
  studentName: string
): Promise<FeedCommentsData | null> {
  if (!studentId) return null;

  const supabase = await previewAwareSupabaseClient(studentId);
  const { data, error } = await supabase
    .from("workspace_comments")
    .select("id,parent_id,author_id,body,created_at")
    .eq("student_id", studentId)
    .eq("visibility", "student_visible")
    .order("created_at", { ascending: true });

  if (error) {
    return {
      studentId,
      studentName,
      comments: [],
      fromStore: true
    };
  }

  const rows = data ?? [];
  const authorIds = [...new Set(rows.map((row) => row.author_id).filter(Boolean))];

  const [{ data: staffNames }, { data: profileNames }] = authorIds.length
    ? await Promise.all([
        supabase.from("staff_profiles").select("user_id,display_name").in("user_id", authorIds),
        supabase.from("profiles").select("id,full_name").in("id", authorIds)
      ])
    : [{ data: [] }, { data: [] }];

  const labels: Record<string, string> = {};
  for (const row of profileNames ?? []) {
    if (row.full_name) labels[row.id] = row.full_name;
  }
  for (const row of staffNames ?? []) {
    if (row.display_name) labels[row.user_id] = row.display_name;
  }
  if (studentName) labels[studentId] = studentName;

  return {
    studentId,
    studentName,
    comments: rows.map((row) => {
      const isStudent = row.author_id === studentId;
      return {
        id: row.id,
        parentId: row.parent_id,
        authorId: row.author_id,
        authorName: labels[row.author_id] ?? (isStudent ? studentName : "PGS Team"),
        isStudent,
        body: row.body,
        createdAt: row.created_at
      };
    }),
    fromStore: true
  };
}
