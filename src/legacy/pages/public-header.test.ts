import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { applySharedPublicHeader } from "./public-header";

describe("applySharedPublicHeader", () => {
  it("swaps header + drawer on country pages (countriesUSA landmark)", () => {
    const html = readFileSync(join(process.cwd(), "src/legacy/pages/countriesaus.html"), "utf8");
    const out = applySharedPublicHeader(html);
    expect(out).toContain('class="pgs-figma-header"');
    expect(out).toContain('class="pgs-header-bell');
    expect(out).toContain('id="drawer"');
    expect(out).toContain('class="countriesUSA"');
    // Old Hostinger toggle should not remain as the live menu control in the Figma bar.
    expect(out).toContain("pgs-header-menu");
  });

  it("swaps header + drawer on non-country pages without countriesUSA", () => {
    const html = readFileSync(join(process.cwd(), "src/legacy/pages/about.html"), "utf8");
    expect(html).not.toContain("countriesUSA");
    const out = applySharedPublicHeader(html);
    expect(out).toContain('class="pgs-figma-header"');
    expect(out).toContain('id="drawer"');
    expect(out).toContain("pgs-header-bell");
    expect(out).toContain("<!-- AboutUs -->");
  });

  it("includes drawer #univMeet + search above blue nav (mobile Figma v1)", () => {
    const html = readFileSync(join(process.cwd(), "src/legacy/pages/countriesaus.html"), "utf8");
    const out = applySharedPublicHeader(html);
    const toolsAt = out.indexOf("pgs-drawer-tools");
    const navAt = out.indexOf('class="header-tab-top d-block"');
    expect(toolsAt).toBeGreaterThan(-1);
    expect(navAt).toBeGreaterThan(toolsAt);
    expect(out).toContain("pgs-drawer-univmeet");
    expect(out).toContain("pgs-drawer-search");
    expect(out).toContain('data-autocomplete-endpoint="/Search/autocomplete"');
    expect(out).toContain("pgs-drawer-close");
    expect(out).toContain("/assets/img/figma-header/drawer-close.svg");
    expect(out).not.toContain("cdn.vectorstock.com");
    expect(out).not.toContain("bi-x-lg");
  });
});
