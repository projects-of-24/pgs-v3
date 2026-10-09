/**
 * Capture current /ops scoreboard full-page screenshots for all staff fixture roles.
 * Output: public/preview/ops-scoreboard-by-role/<role>.png + index.md
 *
 * Usage: node scripts/capture-ops-scoreboard-by-role.mjs
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

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

const sharedPassword = process.env.PGS_PREVIEW_FIXTURE_PASSWORD;
const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:7000").replace(/\/$/, "");
const outDir = resolve(process.cwd(), "public/preview/ops-scoreboard-by-role");

const roles = [
  { slug: "super-admin", label: "Super Admin", email: "pgs-v3-fixture+super-admin@example.test" },
  { slug: "admin", label: "Admin", email: "pgs-v3-fixture+admin@example.test" },
  { slug: "mentor", label: "Mentor", email: "pgs-v3-fixture+mentor-a@example.test" },
  { slug: "read-only-staff", label: "Read-only Staff", email: "pgs-v3-fixture+viewer@example.test" }
];

if (!sharedPassword || sharedPassword.length < 16) {
  throw new Error("Need PGS_PREVIEW_FIXTURE_PASSWORD (16+ chars) in .env.local");
}

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const role of roles) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1100 },
      deviceScaleFactor: 1
    });
    const page = await context.newPage();
    const password = process.env[`PGS_PREVIEW_${role.slug.toUpperCase().replace(/-/g, "_")}_PASSWORD`] ?? sharedPassword;

    console.log(`Capturing ${role.label} → ${role.email}`);
    await page.goto(`${baseUrl}/studio/login?redirect=%2Fops&surface=studio`, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    await page.getByLabel(/email or username/i).fill(role.email);
    await page.getByLabel(/^password$/i).fill(password);
    await page.getByRole("button", { name: /sign in/i }).click();

    await page.waitForURL(/\/ops(\/|$|\?)/, { timeout: 60000 }).catch(() => null);
    // Allow scoreboard RPCs to settle
    await page.waitForTimeout(2500);

    const url = page.url();
    const fileName = `${role.slug}.png`;
    const filePath = resolve(outDir, fileName);
    await page.screenshot({ path: filePath, fullPage: true });

    results.push({
      ...role,
      url,
      fileName,
      ok: url.includes("/ops")
    });
    console.log(`  saved ${fileName} (url=${url})`);
    await context.close();
  }
} finally {
  await browser.close();
}

const md = `# Ops scoreboard captures by role (baseline before dashboard UI pass)

Captured **${new Date().toISOString().slice(0, 10)}** from live \`/ops\` with fixture logins.  
Owner will supply target screenshots next; these are **current** baselines only.

| Role | Fixture email | Capture | Landed on /ops |
|---|---|---|---|
${results
  .map(
    (r) =>
      `| ${r.label} | \`${r.email}\` | [\`${r.fileName}\`](./${r.fileName}) | ${r.ok ? "yes" : `NO (${r.url})`} |`
  )
  .join("\n")}

## Preview

- [Super Admin](/preview/ops-scoreboard-by-role/super-admin.png)
- [Admin](/preview/ops-scoreboard-by-role/admin.png)
- [Mentor](/preview/ops-scoreboard-by-role/mentor.png)
- [Read-only Staff](/preview/ops-scoreboard-by-role/read-only-staff.png)

Do **not** implement dashboard UI until owner provides target screenshots + \`GO AHEAD\`.
`;

writeFileSync(resolve(outDir, "README.md"), md, "utf8");
console.log(`\nWrote ${outDir}/README.md`);
