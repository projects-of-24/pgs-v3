/**
 * Dump DOM near UM1 Add User + heading crop.
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
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

await page.goto(`${baseUrl}/studio/login?redirect=%2Fops%2Fadmin%2Fusers&surface=studio`, {
  waitUntil: "domcontentloaded",
  timeout: 60000
});
await page.getByLabel(/email or username/i).fill("pgs-v3-fixture+super-admin@example.test");
await page.getByLabel(/^password$/i).fill(password);
await page.getByRole("button", { name: /sign in/i }).click();
await page.waitForURL(/\/ops\/admin\/users/, { timeout: 90000 });
await page.waitForTimeout(2000);

console.log("HEADING_HTML", await page.locator(".ops-um-page-heading").innerHTML());

const near = await page.evaluate(() => {
  const add = document.querySelector(".ops-um-add-user");
  if (!add) return { error: "no add" };
  const r = add.getBoundingClientRect();
  const els = [...document.querySelectorAll("button,a,nav,div,span")]
    .filter((el) => {
      const b = el.getBoundingClientRect();
      if (b.width === 0 || b.height === 0) return false;
      return (
        Math.abs(b.top - r.top) < 120 &&
        b.left > r.left - 420 &&
        b.left < r.left + 220 &&
        el !== add &&
        !add.contains(el)
      );
    })
    .slice(0, 30)
    .map((el) => {
      const b = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        cls: String(el.className).slice(0, 90),
        text: (el.textContent || "").trim().slice(0, 50),
        top: Math.round(b.top),
        left: Math.round(b.left),
        w: Math.round(b.width),
        h: Math.round(b.height)
      };
    });
  return {
    add: {
      top: Math.round(r.top),
      left: Math.round(r.left),
      w: Math.round(r.width),
      h: Math.round(r.height)
    },
    near: els
  };
});
console.log(JSON.stringify(near, null, 2));
console.log("FOOT", await page.locator(".ops-um-pagination").innerText());

const addBox = await page.locator(".ops-um-add-user").boundingBox();
if (addBox) {
  await page.screenshot({
    path: resolve(process.cwd(), "public/preview/ops-user-management/um1-heading-crop.png"),
    clip: {
      x: Math.max(0, addBox.x - 220),
      y: Math.max(0, addBox.y - 80),
      width: 420,
      height: 200
    }
  });
}

await browser.close();
