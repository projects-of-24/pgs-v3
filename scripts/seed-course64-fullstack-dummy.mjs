/**
 * COURSE2d-D2 — insert a catalog_draft_revisions row for course 64 with Full Stack dummy detail_body.
 * Does NOT copy the Surgery Week lab fixture. Does NOT publish.
 *
 * 1) pnpm exec vitest run src/features/programs-courses/full-stack-bootcamp-dummy.test.ts
 * 2) node --env-file=.env.local scripts/write-fullstack-dummy-json.mjs   (optional helper)
 * Or: pnpm exec vitest run src/features/programs-courses/seed-course64-fullstack.seed.test.ts
 *
 * Preferred: use the vitest seed file below via:
 *   SEED_COURSE64=1 pnpm exec vitest run src/features/programs-courses/seed-course64-fullstack.seed.test.ts
 */
console.error("Use: SEED_COURSE64=1 pnpm exec vitest run src/features/programs-courses/seed-course64-fullstack.seed.test.ts");
process.exit(1);
