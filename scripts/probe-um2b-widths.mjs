import { existsSync, readFileSync } from "node:fs";
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
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
await page.goto("http://localhost:7000/studio/login?redirect=%2Fops%2Fadmin%2Fusers&surface=studio", {
  waitUntil: "domcontentloaded",
  timeout: 60000
});
await page.getByLabel(/email or username/i).fill("pgs-v3-fixture+super-admin@example.test");
await page.getByLabel(/^password$/i).fill(password);
await page.getByRole("button", { name: /sign in/i }).click();
await page.waitForURL(/\/ops\/admin\/users/, { timeout: 90000 });
await page.getByRole("link", { name: /edit permissions/i }).first().click();
await page.waitForURL(/\/ops\/admin\/users\/.+\/permissions/, { timeout: 60000 });
await page.waitForTimeout(1200);

const m = await page.evaluate(() => {
  const row = document.querySelector(".ops-um2-tree-row");
  const check = document.querySelector(".ops-um2-tree-check");
  const span = check?.querySelector("span");
  const panel = document.querySelector(".ops-um2-tree-panel");
  const cs = span ? getComputedStyle(span) : null;
  const checkCs = check ? getComputedStyle(check) : null;
  return {
    panelW: panel?.getBoundingClientRect().width,
    rowW: row?.getBoundingClientRect().width,
    checkW: check?.getBoundingClientRect().width,
    spanW: span?.getBoundingClientRect().width,
    spanH: span?.getBoundingClientRect().height,
    spanText: span?.textContent,
    whiteSpace: cs?.whiteSpace,
    writingMode: cs?.writingMode,
    wordBreak: cs?.wordBreak,
    checkDisplay: checkCs?.display,
    checkFlexDir: checkCs?.flexDirection
  };
});
console.log(JSON.stringify(m, null, 2));
await page.locator(".ops-um2-main").screenshot({
  path: resolve(process.cwd(), "public/preview/ops-user-management/um2b-tree-fix.png")
});
await browser.close();
