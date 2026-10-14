/**
 * DEPRECATED — loaded old unscoped countries CSS (SPA bleed risk).
 * Use modular template lab: /preview/countries
 */
import { redirect } from "next/navigation";

export default function CountryStudy101WhyPreviewRedirect() {
  redirect("/preview/countries");
}
