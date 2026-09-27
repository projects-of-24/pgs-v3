/**
 * DEPRECATED — wrong shape (UK-specific).
 * Use generic lab: /preview/owned-css
 */
import { redirect } from "next/navigation";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CountriesUkOwnedCssPreviewRedirect({
  searchParams,
}: PageProps) {
  const params = (await searchParams) ?? {};
  const raw = params.block;
  const block = Array.isArray(raw) ? raw[0] : raw;
  if (typeof block === "string" && block.length > 0) {
    redirect(`/preview/owned-css?block=${encodeURIComponent(block)}`);
  }
  redirect("/preview/owned-css");
}
