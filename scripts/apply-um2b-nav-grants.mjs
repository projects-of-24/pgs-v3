/**
 * Apply UM2b nav-grants SQL to the linked Postgres URL (DATABASE_URL or DIRECT_URL).
 * Does not print secrets.
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
  process.exit(1);
}

const files = [
  "supabase/migrations/20261001183000_um2b_staff_nav_grants.sql",
  "supabase/migrations/20261001184500_um2b_common_nav_not_grantable.sql"
];

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  for (const file of files) {
    const sql = readFileSync(resolve(process.cwd(), file), "utf8");
    console.log("Applying", file);
    await client.query(sql);
    console.log("OK", file);
  }
} finally {
  await client.end();
}
