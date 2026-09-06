/**
 * Student #feed premium entitlement strings — UI contract for CMS/backend later.
 * Premium = entitlement (`premium_entitlement`), not a role.
 *
 * Identity card (locked): no green title; badge = “Yet to Unlock Full Access”.
 * Identity card (entitled): green + badge = "#purplePremium".
 */

export const STUDENT_FEED_PREMIUM_LABEL_ACTIVE = "#purplePremium";

/** @deprecated Locked identity no longer shows this green title — badge is Yet to Unlock. */
export const STUDENT_FEED_PREMIUM_LABEL_INACTIVE = "purplepremium not active yet";

export function studentFeedPremiumLabel(premiumActive: boolean): string {
  return premiumActive
    ? STUDENT_FEED_PREMIUM_LABEL_ACTIVE
    : STUDENT_FEED_PREMIUM_LABEL_INACTIVE;
}

export function isStudentFeedPremiumActive(
  stateKind: string | null | undefined
): boolean {
  return stateKind === "authenticated_premium";
}
