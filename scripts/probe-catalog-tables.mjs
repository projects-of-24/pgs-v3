/**
 * Read-only: list whether catalog tables exist on the connected Supabase project.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

console.log("project_host:", new URL(url).host);

const supabase = createClient(url, key, { auth: { persistSession: false } });
const names = ["courses", "events", "universities", "programs", "catalog_draft_revisions", "media_assets"];

for (const name of names) {
  const { error, count } = await supabase.from(name).select("*", { count: "exact", head: true });
  if (error) console.log(`${name}: MISSING — ${error.message}`);
  else console.log(`${name}: OK (count≈${count ?? "?"})`);
}
