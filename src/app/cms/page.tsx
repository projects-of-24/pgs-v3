import { notFound } from "next/navigation";

/** Legacy CMS shortcut — removed. Staff enter via /studio/login → Ops CMS. */
export default function CmsPage() {
  notFound();
}
