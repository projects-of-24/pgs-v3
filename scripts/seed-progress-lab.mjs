/**
 * Seed Track Progress Premium lab pair: 1 Super Admin + 1 Premium student, linked.
 * Fixed UUIDs match src/lib/progress-lab.ts.
 * Does NOT touch Loopboard lab or real aspirants/staff.
 *
 * Usage:
 *   PROGRESS_LAB_SEED=I_UNDERSTAND_LAB_ONLY \
 *   PGS_PREVIEW_PROJECT_REF=<project-ref> \
 *   PGS_PREVIEW_FIXTURE_PASSWORD='…16+ chars…' \
 *   pnpm lab:progress-seed
 *
 * Loads .env.local when present (Next-style).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(name) {
  const path = resolve(process.cwd(), name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const STUDENT_ID = "c1000000-0000-4000-8000-000000000001";
const SUPER_ADMIN_ID = "c2000000-0000-4000-8000-000000000002";
const STUDENT_EMAIL = "progress-lab-premium@pgs.lab";
const SUPER_ADMIN_EMAIL = "progress-lab-superadmin@pgs.lab";
const STUDENT_NAME = "Progress Lab Premium";
const SUPER_ADMIN_NAME = "Progress Lab Super Admin";

if (process.env.PROGRESS_LAB_SEED !== "I_UNDERSTAND_LAB_ONLY") {
  throw new Error("Set PROGRESS_LAB_SEED=I_UNDERSTAND_LAB_ONLY to run this seed.");
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const password = process.env.PGS_PREVIEW_FIXTURE_PASSWORD || process.env.PROGRESS_LAB_PASSWORD;

if (!url || !serviceKey || !password || password.length < 16) {
  throw new Error(
    "Need NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and a 16+ char password."
  );
}

const host = new URL(url).hostname;
const local = /^(127\.0\.0\.1|localhost)$/.test(host);
const projectRef = host.split(".")[0];
if (!local && process.env.PGS_PREVIEW_PROJECT_REF !== projectRef) {
  throw new Error("Refusing non-local seed without exact PGS_PREVIEW_PROJECT_REF match.");
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function ensureUser({ id, email, context, fullName }) {
  const listed = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listed.error) throw listed.error;
  const byEmail = listed.data.users.find((u) => u.email === email);
  const byId = listed.data.users.find((u) => u.id === id);
  const metadata = { full_name: fullName, pgs_context: context };

  if (byEmail && byEmail.id !== id) {
    throw new Error(`Email ${email} already exists as ${byEmail.id}, expected ${id}.`);
  }
  if (byId && byId.email !== email) {
    throw new Error(`UUID ${id} already used by ${byId.email}.`);
  }

  if (byId || byEmail) {
    const user = byId || byEmail;
    const updated = await admin.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
      user_metadata: metadata
    });
    if (updated.error) throw updated.error;
    return updated.data.user;
  }

  const created = await admin.auth.admin.createUser({
    id,
    email,
    password,
    email_confirm: true,
    user_metadata: metadata
  });
  if (created.error) throw created.error;
  return created.data.user;
}

const student = await ensureUser({
  id: STUDENT_ID,
  email: STUDENT_EMAIL,
  context: "student",
  fullName: STUDENT_NAME
});
const superAdmin = await ensureUser({
  id: SUPER_ADMIN_ID,
  email: SUPER_ADMIN_EMAIL,
  context: "staff",
  fullName: SUPER_ADMIN_NAME
});

if (student.id !== STUDENT_ID || superAdmin.id !== SUPER_ADMIN_ID) {
  throw new Error("Lab user IDs drifted from locked constants.");
}

const profile = await admin.from("profiles").upsert(
  {
    id: STUDENT_ID,
    full_name: STUDENT_NAME
  },
  { onConflict: "id" }
);
if (profile.error) throw profile.error;

const superAdminRole = await admin
  .from("staff_roles")
  .select("id")
  .eq("key", "super_admin")
  .single();
if (superAdminRole.error) throw superAdminRole.error;

const staffProfile = await admin.from("staff_profiles").upsert(
  {
    user_id: SUPER_ADMIN_ID,
    role: "super_admin",
    display_name: SUPER_ADMIN_NAME,
    status: "active"
  },
  { onConflict: "user_id" }
);
if (staffProfile.error) throw staffProfile.error;

const existingRole = await admin
  .from("staff_role_assignments")
  .select("id")
  .eq("staff_user_id", SUPER_ADMIN_ID)
  .eq("role_id", superAdminRole.data.id)
  .is("revoked_at", null)
  .maybeSingle();
if (existingRole.error) throw existingRole.error;
if (!existingRole.data) {
  const inserted = await admin.from("staff_role_assignments").insert({
    staff_user_id: SUPER_ADMIN_ID,
    role_id: superAdminRole.data.id,
    assigned_by: null,
    reason: "Progress lab Super Admin bootstrap"
  });
  if (inserted.error) throw inserted.error;
}

const now = new Date();
const ends = new Date(now);
ends.setFullYear(ends.getFullYear() + 1);

const existingEntitlement = await admin
  .from("premium_entitlements")
  .select("id,status")
  .eq("student_id", STUDENT_ID)
  .maybeSingle();
if (existingEntitlement.error) throw existingEntitlement.error;

if (!existingEntitlement.data) {
  const entitlement = await admin.from("premium_entitlements").insert({
    student_id: STUDENT_ID,
    status: "active",
    source: "admin_grant",
    plan_code: "12_month",
    duration_months: 12,
    approved_at: now.toISOString(),
    starts_at: now.toISOString(),
    ends_at: ends.toISOString()
  });
  if (entitlement.error) throw entitlement.error;
} else if (existingEntitlement.data.status !== "active") {
  const updated = await admin
    .from("premium_entitlements")
    .update({
      status: "active",
      starts_at: now.toISOString(),
      ends_at: ends.toISOString(),
      revoked_at: null
    })
    .eq("student_id", STUDENT_ID);
  if (updated.error) throw updated.error;
}

await admin.from("premium_workspace_profiles").upsert(
  {
    student_id: STUDENT_ID,
    pathway_label: "Progress Lab Premium"
  },
  { onConflict: "student_id" }
);

const activeAssign = await admin
  .from("mentor_assignments")
  .select("id,mentor_id")
  .eq("student_id", STUDENT_ID)
  .eq("status", "active")
  .maybeSingle();
if (activeAssign.error) throw activeAssign.error;
if (!activeAssign.data) {
  const assigned = await admin.from("mentor_assignments").insert({
    mentor_id: SUPER_ADMIN_ID,
    student_id: STUDENT_ID,
    assigned_by: SUPER_ADMIN_ID,
    status: "active",
    reason: "Progress lab Premium linked pair"
  });
  if (assigned.error) throw assigned.error;
} else if (activeAssign.data.mentor_id !== SUPER_ADMIN_ID) {
  throw new Error(
    `Progress lab student already has a different active mentor: ${activeAssign.data.mentor_id}`
  );
}

// Important Alerts lab fixtures (max 3 active — DB trigger).
const cleared = await admin.from("student_alerts").delete().eq("student_id", STUDENT_ID);
if (cleared.error) throw cleared.error;

const alertRows = [
  { text: "LOR is pending", sort_order: 0 },
  { text: "Two UNIs have proved CAS!", sort_order: 1 },
  { text: "Submit application by 28 June 2025", sort_order: 2 }
];
for (const row of alertRows) {
  const inserted = await admin.from("student_alerts").insert({
    student_id: STUDENT_ID,
    alert_text: row.text,
    severity: "important",
    active: true,
    sort_order: row.sort_order,
    created_by: SUPER_ADMIN_ID,
    updated_by: SUPER_ADMIN_ID
  });
  if (inserted.error) throw inserted.error;
}

console.log(
  JSON.stringify(
    {
      ok: true,
      student_id: STUDENT_ID,
      super_admin_id: SUPER_ADMIN_ID,
      student_email: STUDENT_EMAIL,
      super_admin_email: SUPER_ADMIN_EMAIL,
      alerts: alertRows.length,
      note: "Login student for Premium preview; Super Admin for Ops workspace QC."
    },
    null,
    2
  )
);
