import { describe, expect, it } from "vitest";
import {
  STUDENT_FEED_PREMIUM_LABEL_ACTIVE,
  STUDENT_FEED_PREMIUM_LABEL_INACTIVE,
  STUDENT_FEED_PREMIUM_LABEL_INACTIVE_LINES,
  isStudentFeedPremiumActive,
  studentFeedPremiumLabel,
  studentFeedPremiumLabelLines
} from "./student-feed-premium-label";

describe("studentFeedPremiumLabel", () => {
  it("uses inactive two-line copy for anon and standard", () => {
    expect(studentFeedPremiumLabel(false)).toBe(STUDENT_FEED_PREMIUM_LABEL_INACTIVE);
    expect(studentFeedPremiumLabelLines(false)).toEqual([
      ...STUDENT_FEED_PREMIUM_LABEL_INACTIVE_LINES
    ]);
    expect(isStudentFeedPremiumActive("anonymous")).toBe(false);
    expect(isStudentFeedPremiumActive("authenticated_standard")).toBe(false);
  });

  it("uses #purplePremium when entitlement is active", () => {
    expect(studentFeedPremiumLabel(true)).toBe(STUDENT_FEED_PREMIUM_LABEL_ACTIVE);
    expect(studentFeedPremiumLabelLines(true)).toEqual([STUDENT_FEED_PREMIUM_LABEL_ACTIVE]);
    expect(isStudentFeedPremiumActive("authenticated_premium")).toBe(true);
  });
});
