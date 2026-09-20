/**
 * Legacy preview path — redirects to PurpleEvents Lite lab.
 * Keep so old bookmarks / `#pe-eN` links still land on the template.
 */
import { redirect } from "next/navigation";

export default function PurpleEventsSessionPreviewRedirect() {
  redirect("/preview/purpleevents-lite");
}
