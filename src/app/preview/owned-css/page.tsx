/**
 * Generic owned-CSS lab.
 * Main barrel (all blocks): @/features/owned-css/pgs-owned-css.css
 * Empty shell; ?block= mounts one fixture. Live pages do not import the barrel.
 */
import { LegacyPage } from "@/components/legacy-page";
import {
  isOwnedCssBlockId,
  type OwnedCssBlockId,
} from "@/features/owned-css/owned-css-blocks";
import { OwnedCssLabShell } from "@/features/owned-css/owned-css-lab-shell";
import "@/features/owned-css/pgs-owned-css.css";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function loadFixture(block: OwnedCssBlockId) {
  switch (block) {
    case "header": {
      const { OwnedCssHeaderFixture } = await import(
        "@/features/owned-css/fixtures/owned-css-header-fixture"
      );
      return <OwnedCssHeaderFixture />;
    }
    case "strip": {
      const { OwnedCssStripFixture } = await import(
        "@/features/owned-css/fixtures/owned-css-strip-fixture"
      );
      return <OwnedCssStripFixture />;
    }
    case "footer": {
      const { OwnedCssFooterFixture } = await import(
        "@/features/owned-css/fixtures/owned-css-footer-fixture"
      );
      return <OwnedCssFooterFixture />;
    }
  }
}

export default async function OwnedCssPreviewPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const raw = params.block;
  const blockParam = Array.isArray(raw) ? raw[0] : raw;
  const block =
    typeof blockParam === "string" && isOwnedCssBlockId(blockParam)
      ? blockParam
      : null;

  const children = block ? await loadFixture(block) : null;

  return (
    <LegacyPage page="preview-owned-css" studentState="anonymous">
      <OwnedCssLabShell block={block}>{children}</OwnedCssLabShell>
    </LegacyPage>
  );
}
