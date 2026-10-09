/**
 * COURSE2d-D2 — seed course 64 draft with Full Stack dummy body.
 * Run: SEED_COURSE64=1 pnpm exec vitest run src/features/programs-courses/seed-course64-fullstack.seed.test.ts
 * Skips unless SEED_COURSE64=1. Does not publish. Does not copy Surgery Week lab fixture.
 */
import { createClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { buildFullStackBootcampDummyBody } from "./full-stack-bootcamp-dummy";

const shouldSeed = process.env.SEED_COURSE64 === "1";

describe.runIf(shouldSeed)("seed course 64 Full Stack dummy draft", () => {
  it("inserts a catalog_draft_revisions row", async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    expect(url && key, "Supabase env required").toBeTruthy();

    const supabase = createClient(url!, key!, { auth: { persistSession: false } });
    const COURSE_ID = 64;
    const detailBody = buildFullStackBootcampDummyBody(String(COURSE_ID));

    const { data: live, error: liveError } = await supabase.from("courses").select("*").eq("id", COURSE_ID).maybeSingle();
    expect(liveError, liveError?.message).toBeNull();
    expect(live).toBeTruthy();

    const { data: latest } = await supabase
      .from("catalog_draft_revisions")
      .select("id, values, tag_ids, created_by")
      .eq("entity_type", "courses")
      .eq("entity_id", COURSE_ID)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const baseValues = {
      ...(live as Record<string, unknown>),
      ...(latest?.values && typeof latest.values === "object" ? (latest.values as Record<string, unknown>) : {})
    };
    delete baseValues.published;

    const values = {
      ...baseValues,
      title: "FULL STACK WEB DEVELOPMENT BOOTCAMP JAN 2026",
      short_description: detailBody.partnership,
      description: detailBody.programDescription.body,
      duration: detailBody.durationValue,
      mode: "At-Campus",
      starts_on: "2026-01-15",
      ends_on: "2026-02-28",
      detail_template: "courses",
      detail_body: detailBody,
      booking_url: detailBody.bookingUrl || null
    };

    const { data: draft, error } = await supabase
      .from("catalog_draft_revisions")
      .insert({
        entity_type: "courses",
        entity_id: COURSE_ID,
        values,
        tag_ids: Array.isArray(latest?.tag_ids) ? latest.tag_ids : [],
        revision_note: "COURSE2d-D2 Full Stack dummy body for Preview QC (not lab fixture)",
        created_by: latest?.created_by ?? (live as { created_by?: string | null }).created_by ?? null
      })
      .select("id")
      .single();

    expect(error, error?.message).toBeNull();
    expect(draft?.id).toBeTruthy();
    // eslint-disable-next-line no-console
    console.log(`Preview: /ops/cms/courses/preview/64?revision=${draft!.id}`);
  }, 30_000);
});
