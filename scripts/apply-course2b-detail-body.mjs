/**
 * COURSE2b-migrate — apply courses detail_template / detail_body / booking_url
 * + publish_catalog_draft courses branch update.
 *
 * Usage: node scripts/apply-course2b-detail-body.mjs
 * Needs DATABASE_URL or DIRECT_URL or POSTGRES_URL in .env.local
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

function loadEnv(name) {
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
    if (!(k in process.env)) process.env[k] = v;
  }
}

loadEnv(".env.local");
loadEnv(".env");

const url = process.env.DATABASE_URL || process.env.DIRECT_URL || process.env.POSTGRES_URL;
if (!url) {
  console.error("No DATABASE_URL / DIRECT_URL / POSTGRES_URL — cannot apply migration.");
  console.error("Add the Postgres connection string to .env.local, or paste the SQL from");
  console.error("supabase/migrations/20261002100000_course2b_courses_detail_body.sql in Supabase SQL Editor.");
  process.exit(1);
}

const file = "supabase/migrations/20261002100000_course2b_courses_detail_body.sql";
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  const sql = readFileSync(resolve(process.cwd(), file), "utf8");
  console.log("Applying", file);
  await client.query(sql);
  const cols = await client.query(`
    select column_name, data_type
    from information_schema.columns
    where table_schema = 'public' and table_name = 'courses'
      and column_name in ('detail_template', 'detail_body', 'booking_url')
    order by column_name
  `);
  console.log("OK columns:", cols.rows.map((r) => `${r.column_name}:${r.data_type}`).join(", "));
} finally {
  await client.end();
}
