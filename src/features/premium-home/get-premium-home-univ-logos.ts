/**
 * University partner logos for H7.
 * Fixture until CMS table W1 (mirror finance_partner_logos) — GO AHEAD required.
 * Callers pass the list into PremiumHomeUniv; empty → fixture.
 */
import { PREMIUM_HOME_UNIV } from "@/features/premium-home/content";

export type PremiumHomeUnivLogo = {
  name: string;
  src: string;
};

const FIXTURE: PremiumHomeUnivLogo[] = PREMIUM_HOME_UNIV.logos.map((logo) => ({
  name: logo.alt,
  src: logo.src
}));

export async function getPremiumHomeUnivLogos(): Promise<PremiumHomeUnivLogo[]> {
  return [...FIXTURE];
}
