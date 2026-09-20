import { describe, expect, it } from "vitest";
import { applySharedPublicHeader } from "./public-header";

/** Minimal country-page shell — legacy full HTML fixtures were removed in the modular cutover. */
const countryPageFixture = `
<header class="old-header"><nav>old</nav></header>
<section class="countriesUSA"><h1>Australia</h1></section>
<!-- Drawer -->
<div id="drawer"><div class="old-drawer">old drawer</div></div>
`;

/** Minimal non-country shell without countriesUSA landmark. */
const aboutPageFixture = `
<header class="old-header"><nav>old</nav></header>
<!-- AboutUs -->
<section class="about-body"><h1>About</h1></section>
<!-- Drawer -->
<div id="drawer"><div class="old-drawer">old drawer</div></div>
`;

describe("applySharedPublicHeader", () => {
  it("swaps header + drawer on country pages (countriesUSA landmark)", () => {
    const out = applySharedPublicHeader(countryPageFixture);
    expect(out).toContain('class="pgs-figma-header"');
    expect(out).toContain('class="pgs-header-bell');
    expect(out).toContain('id="drawer"');
    expect(out).toContain('class="countriesUSA"');
    // Old Hostinger toggle should not remain as the live menu control in the Figma bar.
    expect(out).toContain("pgs-header-menu");
  });

  it("swaps header + drawer on non-country pages without countriesUSA", () => {
    expect(aboutPageFixture).not.toContain("countriesUSA");
    const out = applySharedPublicHeader(aboutPageFixture);
    expect(out).toContain('class="pgs-figma-header"');
    expect(out).toContain('id="drawer"');
    expect(out).toContain("pgs-header-bell");
    expect(out).toContain("<!-- AboutUs -->");
  });

  it("includes drawer #univMeet + search above blue nav (mobile Figma v1)", () => {
    const out = applySharedPublicHeader(countryPageFixture);
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
