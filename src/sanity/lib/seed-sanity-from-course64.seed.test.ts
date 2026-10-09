/**
 * Copy course 64 Ops preview content into Sanity document (parallel trial).
 *
 * Run (dev server should be up for /assets image uploads):
 *   SEED_SANITY_COURSE64=1 pnpm exec vitest run src/sanity/lib/seed-sanity-from-course64.seed.test.ts
 *
 * Env: NEXT_PUBLIC_SANITY_* , SANITY_API_WRITE_TOKEN , optional SANITY_COURSE_DOCUMENT_ID
 */
import { describe, expect, it } from "vitest";
import { seedSanityCourseFromCourse64 } from "./seed-sanity-from-course64";

const shouldSeed = process.env.SEED_SANITY_COURSE64 === "1";

describe.runIf(shouldSeed)("seed Sanity course from Ops course 64", () => {
  it("writes the Full Stack / latest draft body to Sanity", async () => {
    const result = await seedSanityCourseFromCourse64();
    expect(result.documentId).toBeTruthy();
    // eslint-disable-next-line no-console
    console.log(`Sanity doc: ${result.documentId}`);
    // eslint-disable-next-line no-console
    console.log(`Preview: http://localhost:7000${result.previewUrl}`);
  }, 120_000);
});
