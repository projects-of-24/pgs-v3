// TEMPORARY QC screenshot helper (Claude, 2026-10-02). Dev only. Delete before commit.
import { mkdir } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (process.env.NODE_ENV !== "development") return new Response("not found", { status: 404 });
  const u = new URL(req.url);
  const target = u.searchParams.get("path") || "/preview/purpleusmle";
  // Dev-only helper: stay on local same-origin paths (no open redirect / SSRF).
  if (!target.startsWith("/") || target.startsWith("//") || target.includes("://")) {
    return new Response("bad path", { status: 400 });
  }
  const w = Number(u.searchParams.get("w") || 1000);
  const out = (u.searchParams.get("out") || "shot").replace(/[^a-z0-9_-]/gi, "");
  const dir = path.join(process.cwd(), ".qc-shots");
  await mkdir(dir, { recursive: true });
  const mod = "@playwright/test";
  const { chromium } = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ mod);
  const browser = await chromium.launch().catch(() => chromium.launch({ channel: "chrome" }));
  try {
    const page = await browser.newPage({ viewport: { width: w, height: 1300 } });
    await page.goto(`http://localhost:7100${target}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const file = path.join(dir, `${out}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const rects = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".premium-usmle-preview-shell__body > *")).map((el) => {
        const r = el.getBoundingClientRect();
        return [el.className.toString().split(" ")[0], Math.round(r.top + window.scrollY), Math.round(r.bottom + window.scrollY)];
      }),
    );
    const kids = page.locator(".premium-usmle-preview-shell__body > *");
    const n = await kids.count();
    for (let i = 0; i < n; i++) {
      const k = kids.nth(i);
      if ((await k.boundingBox())?.height) await k.screenshot({ path: path.join(dir, `${out}-s${String(i).padStart(2, "0")}.png`) });
    }
    const sw = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    const probe = await page.evaluate((q: string | null) => q ? q.split("|").map((sel: string) => Array.from(document.querySelectorAll(sel)).slice(0, 6).map((el) => { const r = el.getBoundingClientRect(); return [sel, Math.round((r.left) * 10) / 10, Math.round((r.top + window.scrollY) * 10) / 10, Math.round(r.right * 10) / 10, Math.round((r.bottom + window.scrollY) * 10) / 10]; })) : [], u.searchParams.get("probe"));
    return Response.json({ ok: true, file, h, sw, rects, probe });
  } finally {
    await browser.close();
  }
}
