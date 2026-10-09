/**
 * Parallel Sanity Studio — http://localhost:7000/sanity
 * Separate from Ops CMS and from /studio/login.
 */
import { SanityStudio } from "@/sanity/components/sanity-studio";
import { SanitySetupNotice } from "@/sanity/components/sanity-setup-notice";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-dynamic";

export default function SanityStudioPage() {
  if (!isSanityConfigured()) {
    return <SanitySetupNotice />;
  }
  return <SanityStudio />;
}
