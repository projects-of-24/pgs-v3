/**
 * Header lab fixture — real desk PublicHeader for visual QC.
 */
import { PublicHeader } from "@/features/shell/public-header";

export function OwnedCssHeaderFixture() {
  return (
    <div data-owned-css-block="header">
      <p className="owned-css-lab__block-label">Header · desk bar</p>
      <PublicHeader labFakeAuth unreadCount={2} />
    </div>
  );
}
