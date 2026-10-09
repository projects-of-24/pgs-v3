/**
 * UM2 probe — SA login → Edit Permissions page for first non-SA staff row.
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
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
});

await page.goto(`${baseUrl}/studio/login?redirect=%2Fops%2Fadmin%2Fusers&surface=studio`, {
  waitUntil: "domcontentloaded",
  timeout: 60000
});
await page.getByLabel(/email or username/i).fill("pgs-v3-fixture+super-admin@example.test");
await page.getByLabel(/^password$/i).fill(password);
await page.getByRole("button", { name: /sign in/i }).click();
await page.waitForURL(/\/ops\/admin\/users/, { timeout: 90000 });
await page.waitForTimeout(1500);

const edit = page.getByRole("link", { name: /edit permissions/i }).first();
await edit.click();
await page.waitForURL(/\/ops\/admin\/users\/.+\/permissions/, { timeout: 60000 });
await page.waitForTimeout(2000);

console.log("url", page.url());
console.log("h1", await page.locator("h1").first().textContent());
console.log("save", await page.getByRole("button", { name: /save permissions/i }).count());
console.log("role", await page.locator(".ops-um2-role-field select").inputValue().catch(() => null));
console.log("BODY_SNIP", (await page.locator("body").innerText()).slice(0, 900).replace(/\s+/g, " "));
console.log("ERRORS_COUNT", errors.length);
for (const e of errors.slice(0, 20)) console.log("---", e);

await page.screenshot({
  path: resolve(process.cwd(), "public/preview/ops-user-management/um2-probe.png"),
  fullPage: true
});
await browser.close();
