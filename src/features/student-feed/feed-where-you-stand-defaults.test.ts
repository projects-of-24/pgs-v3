import { describe, expect, it } from "vitest";
import {
  countToDigitPair,
  isWysShortlistLabel,
  mergeDocumentsTracker,
  partitionDocumentsTracker
} from "./feed-where-you-stand-defaults";

describe("feed-where-you-stand-defaults", () => {
  it("splits documents vs shortlist labels", () => {
    const { documents, shortlist } = partitionDocumentsTracker({
      "SOP Drafts Uploaded": { count: 10 },
      "USA - Stream Choice 1": { count: 3 },
      "Pending Documents*": { count: 2, is_red: true }
    });
    expect(documents).toHaveLength(2);
    expect(shortlist).toHaveLength(1);
    expect(shortlist[0]?.label).toBe("USA - Stream Choice 1");
    expect(documents.find((row) => row.label === "Pending Documents*")?.pending).toBe(true);
  });

  it("merges desk rows back into one tracker", () => {
    const merged = mergeDocumentsTracker(
      [{ label: "SOP Drafts Uploaded", count: 10, pending: false }],
      [{ label: "USA - Stream Choice 1", count: 3 }]
    );
    expect(merged["SOP Drafts Uploaded"]).toEqual({ count: 10, is_red: false });
    expect(merged["USA - Stream Choice 1"]).toEqual({ count: 3, is_red: false });
  });

  it("pads counts to digit pairs", () => {
    expect(countToDigitPair(10)).toEqual({ left: "1", right: "0" });
    expect(countToDigitPair(3)).toEqual({ left: "0", right: "3" });
  });

  it("detects shortlist labels", () => {
    expect(isWysShortlistLabel("USA- Stream Choice 3")).toBe(true);
    expect(isWysShortlistLabel("SOP Drafts Uploaded")).toBe(false);
  });
});
