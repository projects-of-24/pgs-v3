import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: async () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null })
        })
      })
    })
  })
}));

import { loadFeedNotesBody } from "./load-feed-notes";
import { STUDENT_FEED_NOTES_BODY } from "./feed-notes-default";

describe("loadFeedNotesBody", () => {
  it("returns fixture default when no student", async () => {
    const result = await loadFeedNotesBody(null);
    expect(result).toEqual({ body: STUDENT_FEED_NOTES_BODY, isDefault: true });
  });

  it("returns fixture when profile row missing", async () => {
    const result = await loadFeedNotesBody("00000000-0000-4000-8000-000000000001");
    expect(result).toEqual({ body: STUDENT_FEED_NOTES_BODY, isDefault: true });
  });
});
