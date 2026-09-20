import { describe, expect, it } from "vitest";
import {
  applyUnivMeetToHeaderHtml,
  buildPublicStripHtml,
} from "./public-strip";
import { UNIVMEET_FALLBACK_CHIPS } from "./univmeet-slots";

describe("public strip", () => {
  it("keeps locked strip selectors for chrome CSS", () => {
    const html = buildPublicStripHtml({
      chips: [
        { day: "12", monthLine: "Sep 12" },
        { day: "18", monthLine: "Sep 18" },
      ],
      href: "/Programsfull",
    });
    expect(html).toContain('id="toggleBtn"');
    expect(html).toContain("mobile-frame-sidebar");
    expect(html).toContain('class="date-box"');
    expect(html).toContain("search-box");
    expect(html).toContain("data-pgs-autocomplete");
    expect(html).toContain("Sep 12");
    expect(html).toContain("Sep 18");
  });

  it("falls back to legacy chips when empty", () => {
    const html = buildPublicStripHtml({ chips: [], href: "/Programsfull" });
    expect(html).toContain(UNIVMEET_FALLBACK_CHIPS[0].day);
    expect(html).toContain(UNIVMEET_FALLBACK_CHIPS[1].monthLine);
  });

  it("patches drawer univMeet dates", () => {
    const header = `
  <div class="pgs-drawer-tools">
    <a href="/Programsfull" class="pgs-drawer-univmeet" style="text-decoration:none;cursor:pointer;">
      <span class="pgs-drawer-univmeet__label">#univMeet</span>
      <span class="pgs-drawer-univmeet__date" aria-hidden="true">
        <span class="pgs-drawer-univmeet__day">31</span>
        <span class="pgs-drawer-univmeet__month">Dec 25</span>
      </span>
    </a>
  </div>`;
    const next = applyUnivMeetToHeaderHtml(header, {
      chips: [{ day: "5", monthLine: "Oct 5" }],
      href: "https://example.com/book",
    });
    expect(next).toContain("Oct 5");
    expect(next).toContain('href="https://example.com/book"');
    expect(next).not.toContain("Dec 25");
  });
});
