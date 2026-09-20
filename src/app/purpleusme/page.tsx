/**
 * Typo URL. The page is `/purpleusmle`.
 * Proxy also 308s this path. This redirect is the fallback if the request reaches the page.
 */
import { permanentRedirect } from "next/navigation";

export default function PurpleUsmeTypoRedirect() {
  permanentRedirect("/purpleusmle");
}
