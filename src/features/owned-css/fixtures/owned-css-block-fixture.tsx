import type { OwnedCssBlockId } from "../owned-css-blocks";

type Props = { id: OwnedCssBlockId; title: string; note: string };

export function OwnedCssBlockFixture({ id, title, note }: Props) {
  return (
    <div data-owned-css-block={id}>
      <p className="owned-css-lab__block-label">{title}</p>
      <p className="owned-css-lab__fixture">{note}</p>
    </div>
  );
}
