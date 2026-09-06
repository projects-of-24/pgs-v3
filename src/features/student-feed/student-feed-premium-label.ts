/**
 * Student #feed premium entitlement label — UI contract for CMS/backend later.
 * Premium = entitlement (`premium_entitlement`), not a role.
 *
 * Active → "#purplePremium"
 * Anonymous / standard (not entitled) → "purplepremium not active yet"
 */

export const STUDENT_FEED_PREMIUM_LABEL_ACTIVE = "#purplePremium";
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
