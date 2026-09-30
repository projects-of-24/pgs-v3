import { describe, expect, it } from "vitest";

import {
  FACE_LAYOUT_CATALOG,
  FACE_LAYOUT_IDS,
  getFaceLayout,
  IN_PROGRESS_FACE_LAYOUTS,
  PENDING_FACE_LAYOUTS,
  PGS_FACECARDS_FIGMA
} from "./face-layouts";

describe("face-layouts inventory", () => {
  it("lists v1 listing layouts + calendar_session + compact sm + sm_desk + photo", () => {
    expect([...FACE_LAYOUT_IDS]).toEqual([
      "event_session",
      "cvready",
      "program_full",
      "program_compact",
      "program_compact_sm",
      "program_compact_sm_desk",
      "promo",
      "internship",
      "calendar_session",
      "calendar_session_photo"
    ]);
    expect(FACE_LAYOUT_CATALOG).toHaveLength(10);
  });

  it("points at canonical pgs-facecards Figma", () => {
    expect(PGS_FACECARDS_FIGMA.fileKey).toBe("reEbIrfkffyoIzXQyVm09z");
  });

  it("marks all face pairs locked including Pair 11", () => {
    expect(getFaceLayout("event_session").status).toBe("locked");
    expect(getFaceLayout("cvready").status).toBe("locked");
    expect(getFaceLayout("program_full").status).toBe("locked");
    expect(getFaceLayout("internship").status).toBe("locked");
    expect(getFaceLayout("promo").status).toBe("locked");
    expect(getFaceLayout("program_compact").status).toBe("locked");
    expect(getFaceLayout("program_compact_sm").status).toBe("locked");
    expect(getFaceLayout("program_compact_sm").figmaPair).toBe(9);
    expect(getFaceLayout("program_compact_sm_desk").status).toBe("locked");
    expect(getFaceLayout("program_compact_sm_desk").figmaPair).toBe(10);
    expect(getFaceLayout("calendar_session").status).toBe("locked");
    expect(getFaceLayout("calendar_session").surface).toBe("calendar");
    expect(getFaceLayout("calendar_session_photo").status).toBe("locked");
    expect(getFaceLayout("calendar_session_photo").figmaPair).toBe(11);
    expect(getFaceLayout("calendar_session_photo").surface).toBe("calendar");
    expect(IN_PROGRESS_FACE_LAYOUTS.map((row) => row.id)).toEqual([]);
    expect(PENDING_FACE_LAYOUTS.map((row) => row.id)).toEqual([]);
  });

  it("records calendar_session pair 7 desk+mob from pgs-facecards", () => {
    expect(getFaceLayout("calendar_session").figmaDesk).toBe("4:376");
    expect(getFaceLayout("calendar_session").figmaDeskOpen).toBe("4:377");
    expect(getFaceLayout("calendar_session").figmaDeskClosed).toBe("4:387");
    expect(getFaceLayout("calendar_session").artboardDesk).toBe("309×240");
    expect(getFaceLayout("calendar_session").figmaMob).toBe("4:375");
    expect(getFaceLayout("calendar_session").figmaMobOpen).toBe("4:305");
    expect(getFaceLayout("calendar_session").figmaMobClosed).toBe("4:364");
    expect(getFaceLayout("calendar_session").artboardMob).toBe("206×160");
  });

  it("records program_compact pair 6 desk+mob from pgs-facecards", () => {
    expect(getFaceLayout("program_compact").figmaDesk).toBe("1:2148");
    expect(getFaceLayout("program_compact").figmaDeskOpen).toBe("1:2150");
    expect(getFaceLayout("program_compact").figmaDeskClosed).toBe("1:2151");
    expect(getFaceLayout("program_compact").artboardDesk).toBe("304×461");
    expect(getFaceLayout("program_compact").figmaMob).toBe("1:2731");
    expect(getFaceLayout("program_compact").figmaMobOpen).toBe("1:3032");
    expect(getFaceLayout("program_compact").figmaMobClosed).toBe("1:2992");
    expect(getFaceLayout("program_compact").artboardMob).toBe("171×260");
  });

  it("records program_compact_sm pair 9 as Pair 6 shell @ 80%", () => {
    expect(getFaceLayout("program_compact_sm").artboardDesk).toBe("243×369");
    expect(getFaceLayout("program_compact_sm").artboardMob).toBe("164×250");
    expect(getFaceLayout("program_compact_sm").figmaDeskOpen).toBe("1:2150");
  });

  it("records program_compact_sm_desk pair 10 as Pair 9 desk + Pair 6 mob", () => {
    const row = getFaceLayout("program_compact_sm_desk");
    expect(row.artboardDesk).toBe("243×474");
    expect(row.artboardMob).toBe("171×260");
    expect(row.figmaDeskOpen).toBe("1:2150");
    expect(row.figmaMobOpen).toBe("1:3032");
  });

  it("records program_full pair 3 own mob from cas-v6 (not Pair 2)", () => {
    const row = getFaceLayout("program_full");
    expect(row.mobSharedWith).toBeUndefined();
    expect(row.figmaMob).toBe("91:2908");
    expect(row.figmaMobOpen).toBe("91:2908");
    expect(row.artboardMob).toBe("283×389");
    expect(row.figmaDeskOpen).toBe("1:1830");
  });

  it("points Learn More fixtures at preview detail labs", () => {
    expect(getFaceLayout("event_session").fixtureLearnMoreHref).toBe(
      "/preview/purpleevents-lite"
    );
    expect(getFaceLayout("cvready").fixtureLearnMoreHref).toBe(
      "/preview/programs-courses"
    );
    expect(getFaceLayout("program_full").fixtureLearnMoreHref).toBe(
      "/preview/programs-courses"
    );
    expect(getFaceLayout("program_compact").fixtureLearnMoreHref).toBe(
      "/preview/programs-courses"
    );
    expect(getFaceLayout("program_compact_sm").fixtureLearnMoreHref).toBe(
      "/preview/programs-courses"
    );
    expect(getFaceLayout("program_compact_sm_desk").fixtureLearnMoreHref).toBe(
      "/preview/programs-courses"
    );
    expect(getFaceLayout("promo").fixtureLearnMoreHref).toBe(
      "/preview/programs-courses"
    );
    expect(getFaceLayout("internship").fixtureLearnMoreHref).toBe(
      "/preview/programs-courses"
    );
    expect(getFaceLayout("calendar_session").fixtureLearnMoreHref).toBe(
      "/preview/student-feed"
    );
  });

  it("marks listing surfaces vs calendar surface", () => {
    expect(getFaceLayout("event_session").surface).toBe("listing");
    expect(getFaceLayout("program_compact_sm").surface).toBe("listing");
    expect(getFaceLayout("program_compact_sm_desk").surface).toBe("listing");
    expect(getFaceLayout("calendar_session").surface).toBe("calendar");
    expect(getFaceLayout("calendar_session_photo").surface).toBe("calendar");
  });
});
