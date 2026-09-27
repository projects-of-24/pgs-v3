import { describe, expect, it } from "vitest";
import {
  countFaceFixturesByLayout,
  FACE_FIXTURES,
  FACE_FIXTURES_PER_KIND,
  listFaceFixtures
} from "./face-fixtures";
import { FACE_LAYOUT_IDS } from "./face-layouts";

describe("FACE-FIXTURES bank", () => {
  it("has 5 events + 5 courses for every face layout", () => {
    for (const layout of FACE_LAYOUT_IDS) {
      const counts = countFaceFixturesByLayout(layout);
      expect(counts.events).toBe(FACE_FIXTURES_PER_KIND);
      expect(counts.courses).toBe(FACE_FIXTURES_PER_KIND);
      expect(counts.total).toBe(FACE_FIXTURES_PER_KIND * 2);
    }
  });

  it("totals 80 fixtures (8 layouts × 10)", () => {
    expect(FACE_FIXTURES).toHaveLength(FACE_LAYOUT_IDS.length * 10);
  });

  it("keeps unique ids and wires Learn More hrefs", () => {
    const ids = new Set(FACE_FIXTURES.map((row) => row.id));
    expect(ids.size).toBe(FACE_FIXTURES.length);

    for (const row of listFaceFixtures({ face_layout: "event_session" })) {
      expect(row.card.href).toBe("/preview/purpleevents-lite");
    }
    for (const row of listFaceFixtures({ face_layout: "cvready" })) {
      expect(row.card.href).toBe("/preview/programs-courses");
    }
  });

  it("marks the 5th of each kind closed for mix exploration", () => {
    const closed = listFaceFixtures({
      face_layout: "promo",
      status: "closed"
    });
    expect(closed).toHaveLength(2);
    expect(closed.map((row) => row.kind).sort()).toEqual(["course", "event"]);
  });
});
