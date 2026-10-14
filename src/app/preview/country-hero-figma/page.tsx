/**
 * DEPRECATED — loaded old unscoped country-hero-figma CSS (SPA bleed risk).
 * Use modular template lab: /preview/countries
 */
import { redirect } from "next/navigation";

export default function CountryHeroFigmaPreviewRedirect() {
  redirect("/preview/countries");
}
