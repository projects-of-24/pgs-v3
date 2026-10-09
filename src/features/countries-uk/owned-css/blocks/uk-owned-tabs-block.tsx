/** S3 tabs — mounts only when ?block=tabs. */
import "../uk-owned-tabs.css";

export function UkOwnedTabsBlock() {
  return (
    <div data-uk-owned-block="tabs">
      <p className="uk-owned-css-lab__block-label">S3 · tabs</p>
      <p className="uk-owned-css-lab__fixture">
        Fixture only. Fill <code>owned-css/uk-owned-tabs.css</code> when
        BAKE-UK-TABS starts.
      </p>
    </div>
  );
}
