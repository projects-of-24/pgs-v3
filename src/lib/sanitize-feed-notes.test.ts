import { describe, expect, it } from "vitest";
import {
  FEED_NOTES_MAX_LENGTH,
  sanitizeFeedNotesBody
} from "@/lib/sanitize-feed-notes";

describe("sanitizeFeedNotesBody", () => {
  it("allows empty (fixture on read)", () => {
    expect(sanitizeFeedNotesBody("")).toBe("");
    expect(sanitizeFeedNotesBody("   ")).toBe("");
  });

  it("keeps newlines for multi-paragraph Notes", () => {
    expect(sanitizeFeedNotesBody("Line one\n\nLine two")).toBe("Line one\n\nLine two");
  });

  it("strips HTML / script before store", () => {
    expect(sanitizeFeedNotesBody("<p>Hello</p><script>alert(1)</script>")).toBe("Hello");
    expect(sanitizeFeedNotesBody('<img src=x onerror="alert(1)">bad')).toBe("bad");
  });

  it("rejects oversized Notes", () => {
    expect(() => sanitizeFeedNotesBody("x".repeat(FEED_NOTES_MAX_LENGTH + 1))).toThrow(/at most/);
  });
});
