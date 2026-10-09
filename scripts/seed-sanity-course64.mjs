/**
 * Copy Ops course 64 draft into Sanity trial course (PowerShell-friendly).
 *
 * Usage (from repo root, with pnpm dev on :7000 for /assets images):
 *   node scripts/seed-sanity-course64.mjs
 *
 * Requires .env.local: NEXT_PUBLIC_SANITY_* , SANITY_API_WRITE_TOKEN
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function load(name) {
  const path = resolve(process.cwd(), name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined || process.env[k] === "") process.env[k] = v;
  }
}

load(".env.local");
load(".env");

process.env.SEED_SANITY_COURSE64 = "1";
if (!process.env.SANITY_COURSE_DOCUMENT_ID) {
  process.env.SANITY_COURSE_DOCUMENT_ID = "125ffefb-af81-47f4-8c28-f754944bdc69";
}

if (!process.env.SANITY_API_WRITE_TOKEN?.trim()) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

const result = spawnSync(
  "pnpm",
  ["exec", "vitest", "run", "src/sanity/lib/seed-sanity-from-course64.seed.test.ts"],
  { stdio: "inherit", env: process.env, shell: true }
);

process.exit(result.status ?? 1);
