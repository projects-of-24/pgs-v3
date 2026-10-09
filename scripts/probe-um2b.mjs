/**
 * UM2b probe — Edit Permissions UI (checkboxes + actions; Save may need migration).
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
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
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}

loadEnv(".env.local");
loadEnv(".env");

const password = process.env.PGS_PREVIEW_FIXTURE_PASSWORD;
const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:7000").replace(/\/$/, "");
if (!password) throw new Error("Need PGS_PREVIEW_FIXTURE_PASSWORD");

mkdirSync(resolve(process.cwd(), "public/preview/ops-user-management"), { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
const errors = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

await page.goto(`${baseUrl}/studio/login?redirect=%2Fops%2Fadmin%2Fusers&surface=studio`, {
  waitUntil: "domcontentloaded",
  timeout: 60000
});
await page.getByLabel(/email or username/i).fill("pgs-v3-fixture+super-admin@example.test");
await page.getByLabel(/^password$/i).fill(password);
await page.getByRole("button", { name: /sign in/i }).click();
await page.waitForURL(/\/ops\/admin\/users/, { timeout: 90000 });
await page.getByRole("link", { name: /edit permissions/i }).first().click();
await page.waitForURL(/\/ops\/admin\/users\/.+\/permissions/, { timeout: 60000 });
await page.waitForTimeout(1500);

const topIdentity = await page.locator(".ops-um2-identity").count();
const detailPanel = await page.locator(".ops-um2-detail-panel").count();
const saveMenus = await page.getByRole("button", { name: /save menus/i }).count();
const changeRole = await page.getByRole("button", { name: /change role/i }).count();
const suspend = await page.getByRole("button", { name: /suspend staff/i }).count();
const checkbox = page.locator(".ops-um2-tree-check input").nth(3);
const before = await checkbox.isChecked();
await checkbox.click({ force: true });
await page.waitForTimeout(200);
const after = await checkbox.isChecked();

console.log("url", page.url());
console.log("h1", await page.locator("h1").first().textContent());
console.log("top_identity_count", topIdentity);
console.log("detail_panel_count", detailPanel);
console.log("save_menus", saveMenus, "change_role", changeRole, "suspend", suspend);
console.log("checkbox_toggled", before, "->", after);
console.log("ERRORS_COUNT", errors.length);
for (const e of errors.slice(0, 15)) console.log("---", e);

await page.screenshot({
  path: resolve(process.cwd(), "public/preview/ops-user-management/um2b-probe.png"),
  fullPage: true
});
await browser.close();
