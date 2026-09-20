import { describe, expect, it } from "vitest";
import {
  matchesCardSurface,
  parseCardSurfaces,
} from "@/features/admin-cms/lib/card-surfaces";

describe("card surfaces — usmlerotation dedicated", () => {
  it("does not share purpleboard opt-in onto usmlerotation", () => {
    const row = { card_surfaces: ["purpleboard"] };
    expect(matchesCardSurface(row, "purpleboard")).toBe(true);
    expect(matchesCardSurface(row, "cvready_programs")).toBe(true);
    expect(matchesCardSurface(row, "usmlerotation")).toBe(false);
  });

  it("matches usmlerotation only when explicitly enabled", () => {
    const row = { card_surfaces: ["usmlerotation"] };
    expect(matchesCardSurface(row, "usmlerotation")).toBe(true);
    expect(matchesCardSurface(row, "purpleboard")).toBe(false);
    expect(parseCardSurfaces(row)).toContain("usmlerotation");
  });
});

describe("card surfaces — pgs_picks dedicated", () => {
  it("does not share purpleboard or usmlerotation onto pgs_picks", () => {
    expect(
      matchesCardSurface({ card_surfaces: ["purpleboard"] }, "pgs_picks"),
    ).toBe(false);
    expect(
      matchesCardSurface({ card_surfaces: ["usmlerotation"] }, "pgs_picks"),
    ).toBe(false);
  });

  it("matches pgs_picks only when explicitly enabled", () => {
    const row = { card_surfaces: ["pgs_picks"] };
    expect(matchesCardSurface(row, "pgs_picks")).toBe(true);
    expect(matchesCardSurface(row, "usmlerotation")).toBe(false);
    expect(parseCardSurfaces(row)).toContain("pgs_picks");
  });
});
