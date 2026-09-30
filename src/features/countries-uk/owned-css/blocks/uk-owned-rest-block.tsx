/** S6 rest — mounts only when ?block=rest. */
import "../uk-owned-rest.css";

export function UkOwnedRestBlock() {
  return (
    <div data-uk-owned-block="rest">
      <p className="uk-owned-css-lab__block-label">S6 · rest / #PGS</p>
      <p className="uk-owned-css-lab__fixture">
        Fixture only. Fill <code>owned-css/uk-owned-rest.css</code> when
        BAKE-UK-REST starts.
      </p>
    </div>
  );
}
