/**
 * Quick UM1 error probe — login SA then open /ops/admin/users
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
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
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
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}\n${err.stack ?? ""}`));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
});
page.on("response", (res) => {
  if (res.status() >= 400 && !res.url().includes("favicon")) {
    errors.push(`http ${res.status()} ${res.url()}`);
  }
});

await page.goto(`${baseUrl}/studio/login?redirect=%2Fops&surface=studio`, {
  waitUntil: "domcontentloaded",
  timeout: 60000
});
await page.getByLabel(/email or username/i).fill("pgs-v3-fixture+super-admin@example.test");
await page.getByLabel(/^password$/i).fill(password);
await page.getByRole("button", { name: /sign in/i }).click();
await page.waitForURL(/\/ops(\/|$|\?)/, { timeout: 90000 });
console.log("logged in", page.url());

await page.goto(`${baseUrl}/ops/admin/users`, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(3500);
console.log("um url", page.url());
console.log("title", await page.title());
const h1 = await page.locator("h1").first().textContent().catch(() => null);
console.log("h1", h1);
const body = await page.locator("body").innerText();
console.log("BODY_SNIP", body.slice(0, 1500).replace(/\s+/g, " "));
console.log("ERRORS_COUNT", errors.length);
for (const e of errors.slice(0, 40)) console.log("---", e);

await page.screenshot({
  path: resolve(process.cwd(), "public/preview/ops-user-management/um1-probe.png"),
  fullPage: true
});
await page.screenshot({
  path: resolve(process.cwd(), "public/preview/ops-user-management/um1-qc-spacing.png"),
  fullPage: true
});
await browser.close();
