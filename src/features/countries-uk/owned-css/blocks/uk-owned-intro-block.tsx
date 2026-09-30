/** S2 intro — mounts only when ?block=intro. */
import "../uk-owned-intro.css";

export function UkOwnedIntroBlock() {
  return (
    <div data-uk-owned-block="intro">
      <p className="uk-owned-css-lab__block-label">S2 · intro</p>
      <p className="uk-owned-css-lab__fixture">
        Fixture only. Fill <code>owned-css/uk-owned-intro.css</code> when
        BAKE-UK-INTRO starts.
      </p>
    </div>
  );
}
