/**
 * Apply Ops staff avatar Storage bucket (service role).
 * SQL (column + RPC + policy) still requires Dashboard SQL or DB URL —
 * this script prints that step after creating the bucket.
 *
 * Usage: node scripts/apply-ops-staff-avatar.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

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
    if (!(k in process.env)) process.env[k] = v;
  }
}

load(".env.local");
load(".env");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  throw new Error("Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
}

const admin = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const existing = await admin.storage.getBucket("staff-avatars");
if (existing.error && !/not found/i.test(existing.error.message)) {
  throw existing.error;
}

if (existing.data) {
  console.log("Bucket staff-avatars already exists.");
} else {
  const created = await admin.storage.createBucket("staff-avatars", {
    public: false,
    fileSizeLimit: 5242880,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"]
  });
  if (created.error) throw created.error;
  console.log("Created private bucket staff-avatars.");
}

const col = await admin.from("staff_profiles").select("avatar_path").limit(1);
const rpc = await admin.rpc("update_staff_avatar_path", {
  target_avatar_path: "00000000-0000-4000-8000-000000000000/probe.jpg"
});

console.log(
  JSON.stringify(
    {
      bucketReady: true,
      avatarColumnReady: !col.error,
      avatarColumnError: col.error?.message ?? null,
      rpcReady: !rpc.error || !/Could not find the function/i.test(rpc.error.message),
      rpcProbeNote: rpc.error?.message ?? "rpc reachable"
    },
    null,
    2
  )
);

if (col.error || (rpc.error && /Could not find the function/i.test(rpc.error.message))) {
  console.log(`
SQL STILL REQUIRED (Supabase Dashboard → SQL → Run):
  supabase/migrations/20261001143000_ops_staff_avatar.sql

Photo upload cannot finish until avatar_path + update_staff_avatar_path exist.
`);
  process.exitCode = 2;
}
