/**
 * Preview QC — Error 404 modular body lab (visual-locked).
 * Same compose as live `/error_404` + `not-found` (without `live`).
 * H-R step 1: React chrome (<PublicHeader/> · <PublicStrip/> · body · <PublicFooter/>), no strings.
 * Bands: desktop >1366 · iPad 601–1366 · mobile ≤600.
 */
import { composeError404Page } from "@/features/error-404/compose-error-404-page";

export const dynamic = "force-dynamic";

export default async function Error404PreviewPage() {
  return composeError404Page({
    page: "preview-error-404",
    previewPath: "/preview/error-404",
    reactChrome: true
  });
}
