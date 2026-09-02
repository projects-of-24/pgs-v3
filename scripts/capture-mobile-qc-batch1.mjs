/**
 * Owner review batch 1 — desktop + mobile screenshots for Proceed/Fix gate.
 * Run: node scripts/capture-mobile-qc-batch1.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";
const outDir = join(process.cwd(), "public/previews/mobile-qc-batch1");

const routes = [
  { id: "01-home-guest", label: "Home — guest", path: "/" },
  { id: "02-usa", label: "Study in USA", path: "/countriesusa" },
  { id: "03-scholarship", label: "Scholarship", path: "/scholarship" },
  { id: "04-usmlerotation", label: "USMLE Rotation", path: "/usmlerotation" },
  { id: "05-purpleevents", label: "Purple Events / webinars", path: "/purpleevents" },
  { id: "06-purplepremium", label: "Purple Premium landing", path: "/purplepremiumhome" },
  { id: "07-login", label: "Login", path: "/login" },
  { id: "08-explore-countries", label: "Explore countries", path: "/explorecountries" }
];

const viewports = [
  { suffix: "desktop", width: 1440, height: 1000, fullPage: false },
  { suffix: "mobile", width: 390, height: 844, fullPage: true }
];

async function waitReady(page) {
  await page.goto(page.url(), { waitUntil: "domcontentloaded" }).catch(() => undefined);
  const legacy = page.locator("[data-legacy-page]");
  if (await legacy.count()) {
    await legacy.first().waitFor({ state: "attached", timeout: 30_000 });
    await page
      .waitForFunction(
        () => document.querySelector("[data-legacy-page]")?.getAttribute("data-interactions-ready") === "true",
        undefined,
        { timeout: 30_000 }
      )
      .catch(() => undefined);
  }
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function captureModal(page, routeId, suffix) {
  const triggers = [
    page.locator(".btn-join-premium, .join-premium-btn, [data-open-modal='joinPremiumModal']").first(),
    page.getByRole("button", { name: /apply|join|premium|get started/i }).first(),
    page.locator("a.premium-unlock-link").first()
  ];
  for (const trigger of triggers) {
    if (!(await trigger.count())) continue;
    if (!(await trigger.isVisible().catch(() => false))) continue;
    await trigger.click({ timeout: 5000 }).catch(() => undefined);
    await page.waitForTimeout(600);
    const modal = page.locator("#joinPremiumModal, #SCHOapplicantPremiumModal, #USMLapplicantPremiumModal, .premium-modal-overlay").first();
    if (await modal.isVisible().catch(() => false)) {
      await page.screenshot({
        path: join(outDir, `${routeId}-modal-${suffix}.png`),
        animations: "disabled"
      });
      await page.keyboard.press("Escape").catch(() => undefined);
      return true;
    }
  }
  return false;
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const manifest = [];

for (const route of routes) {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.suffix === "mobile" ? 2 : 1,
      ...(vp.suffix === "mobile" ? devices["iPhone 13"] : {})
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}${route.path}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await waitReady(page);

    const foldPath = join(outDir, `${route.id}-${vp.suffix}-fold.png`);
    await page.screenshot({ path: foldPath, fullPage: false, animations: "disabled" });

    if (vp.fullPage) {
      const fullPath = join(outDir, `${route.id}-${vp.suffix}-full.png`);
      await page.screenshot({ path: fullPath, fullPage: true, animations: "disabled" });
      manifest.push({ route: route.label, viewport: vp.suffix, file: `${route.id}-${vp.suffix}-full.png`, type: "full-page" });
    }

    manifest.push({ route: route.label, viewport: vp.suffix, file: `${route.id}-${vp.suffix}-fold.png`, type: "first-fold" });

    if (vp.suffix === "mobile" && ["/scholarship", "/usmlerotation", "/countriesusa"].includes(route.path)) {
      const modalCaptured = await captureModal(page, route.id, vp.suffix);
      if (modalCaptured) {
        manifest.push({ route: route.label, viewport: vp.suffix, file: `${route.id}-modal-${vp.suffix}.png`, type: "modal" });
      }
    }

    await context.close();
  }
}

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>PGS Mobile QC — Batch 1</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 24px; background: #f5f5f5; color: #111; }
    h1 { font-size: 1.25rem; }
    .note { max-width: 720px; margin-bottom: 24px; line-height: 1.5; }
    section { margin-bottom: 32px; background: #fff; padding: 16px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
    h2 { font-size: 1rem; margin: 0 0 12px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
    figure { margin: 0; }
    figcaption { font-size: 12px; color: #555; margin-top: 4px; }
    img { max-width: 100%; border: 1px solid #ddd; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Mobile QC — Batch 1 (owner review)</h1>
  <p class="note">Reply in chat: <strong>Proceed</strong>, <strong>Fix: …</strong>, or <strong>Skip</strong> per section. Nothing links to production until you approve.</p>
  ${routes
    .map(
      (r) => `<section>
    <h2>${r.label} <code>${r.path}</code></h2>
    <div class="grid">
      ${manifest
        .filter((m) => m.route === r.label)
        .map(
          (m) => `<figure><img src="${m.file}" alt="${m.route} ${m.type}" loading="lazy" /><figcaption>${m.viewport} — ${m.type}</figcaption></figure>`
        )
        .join("")}
    </div>
  </section>`
    )
    .join("")}
</body>
</html>`;

await writeFile(join(outDir, "index.html"), indexHtml);
await writeFile(join(outDir, "manifest.json"), JSON.stringify({ generatedAt: new Date().toISOString(), baseURL, items: manifest }, null, 2));

console.log(`Captured ${manifest.length} screenshots → ${outDir}`);
await browser.close();
