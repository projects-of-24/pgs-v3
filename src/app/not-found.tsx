/**
 * Next.js not-found boundary — same modular 404 body as `/error_404`.
 * Hostinger `error404Html` is not served after cutover.
 */
import { composeError404Page } from "@/features/error-404/compose-error-404-page";

export const dynamic = "force-dynamic";

export default async function NotFoundPage() {
  return composeError404Page({
    live: true,
    page: "error-404",
    authenticatedActorFallback: true
  });
}
