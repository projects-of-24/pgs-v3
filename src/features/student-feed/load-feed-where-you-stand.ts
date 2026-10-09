/**
 * Where You Stand — Premium #FEED reader (WS-FILL-4 / 4B).
 * Prep + tasks: `premium_workspace_profiles`
 * Finalized unis: `student_university_selections` stage=finalized + CMS media (4B)
 * Uni Shortlist counts: mentor labels in `documents_tracker` (1A)
 */
import "server-only";

import { marketingMediaUrl, type MarketingMedia } from "@/lib/media-url";
import { previewAwareSupabaseClient } from "@/lib/staff-preview-server";
import {
  partitionDocumentsTracker,
  WYS_DEFAULT_FEEDBACK_TITLE,
  WYS_UNI_IMAGE,
  type WysTrackerRow
} from "./feed-where-you-stand-defaults";

export type FeedWysChecklistItem = { text: string; checked: boolean };
export type FeedWysFinalizedUni = {
  id: string;
  name: string;
  tag: string;
  imageSrc: string;
};

export type FeedWhereYouStandData = {
  /** true = live store (may be empty); omit/false = caller should use fixtures */
  fromStore: boolean;
  onboardingPercentage: number | null;
  onboardingChecklist: FeedWysChecklistItem[];
  feedbackSessionTitle: string;
  feedbackSessionItems: FeedWysChecklistItem[];
  documents: WysTrackerRow[];
  shortlist: WysTrackerRow[];
  finalizedUnis: FeedWysFinalizedUni[];
  currentlyWorkingOn: string[];
  futureTasks: string[];
};

export const FEED_WHERE_YOU_STAND_EMPTY: FeedWhereYouStandData = {
  fromStore: true,
  onboardingPercentage: null,
  onboardingChecklist: [],
  feedbackSessionTitle: "",
  feedbackSessionItems: [],
  documents: [],
  shortlist: [],
  finalizedUnis: [],
  currentlyWorkingOn: [],
  futureTasks: []
};

type UniRelation = {
  id: number;
  name: string;
  slug: string;
  media_assets: MarketingMedia | MarketingMedia[] | null;
};

function asOne<T>(value: T | T[] | null | undefined): T | null {
  if (value == null) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function asChecklist(value: unknown): FeedWysChecklistItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const text = typeof row.text === "string" ? row.text.trim() : "";
      if (!text) return null;
      return { text, checked: row.checked === true };
    })
    .filter((item): item is FeedWysChecklistItem => item != null);
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function asTracker(value: unknown): Record<string, { count: number; is_red?: boolean }> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const out: Record<string, { count: number; is_red?: boolean }> = {};
  for (const [name, item] of Object.entries(value as Record<string, unknown>)) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const row = item as Record<string, unknown>;
    const count = typeof row.count === "number" ? row.count : Number(row.count);
    out[name] = {
      count: Number.isFinite(count) && count >= 0 ? Math.trunc(count) : 0,
      is_red: row.is_red === true
    };
  }
  return out;
}

export async function loadFeedWhereYouStand(
  studentId: string | null | undefined
): Promise<FeedWhereYouStandData> {
  if (!studentId) return { ...FEED_WHERE_YOU_STAND_EMPTY, fromStore: false };

  const supabase = await previewAwareSupabaseClient(studentId);
  const [profileResult, unisResult] = await Promise.all([
    supabase
      .from("premium_workspace_profiles")
      .select(
        "onboarding_percentage,onboarding_checklist,feedback_session_title,feedback_session_items,documents_tracker,currently_working_on,future_tasks"
      )
      .eq("student_id", studentId)
      .maybeSingle(),
    supabase
      .from("student_university_selections")
      .select(
        "id,stage,sort_order,universities(id,name,slug,media_assets!universities_image_asset_id_fkey(bucket,path,alt_text))"
      )
      .eq("student_id", studentId)
      .eq("stage", "finalized")
      .order("sort_order")
  ]);

  const profile = profileResult.data;
  const { documents, shortlist } = partitionDocumentsTracker(
    asTracker(profile?.documents_tracker)
  );

  const finalizedUnis: FeedWysFinalizedUni[] = (unisResult.data ?? []).map((selection) => {
    const uni = asOne(selection.universities as unknown as UniRelation | UniRelation[] | null);
    const media = asOne(uni?.media_assets ?? null);
    return {
      id: selection.id,
      name: uni?.name?.trim() || "University",
      tag: "#USA",
      imageSrc: marketingMediaUrl(media) || WYS_UNI_IMAGE
    };
  });

  return {
    fromStore: true,
    onboardingPercentage:
      typeof profile?.onboarding_percentage === "number" ? profile.onboarding_percentage : null,
    onboardingChecklist: asChecklist(profile?.onboarding_checklist),
    feedbackSessionTitle:
      typeof profile?.feedback_session_title === "string" && profile.feedback_session_title.trim()
        ? profile.feedback_session_title.trim()
        : WYS_DEFAULT_FEEDBACK_TITLE,
    feedbackSessionItems: asChecklist(profile?.feedback_session_items),
    documents,
    shortlist,
    finalizedUnis,
    currentlyWorkingOn: asStringList(profile?.currently_working_on),
    futureTasks: asStringList(profile?.future_tasks)
  };
}
