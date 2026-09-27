/** S4 Study 101 — mounts only when ?block=study101. */
import "../uk-owned-study101.css";

export function UkOwnedStudy101Block() {
  return (
    <div data-uk-owned-block="study101">
      <p className="uk-owned-css-lab__block-label">S4 · Study 101 Why</p>
      <p className="uk-owned-css-lab__fixture">
        Fixture only. Fill <code>owned-css/uk-owned-study101.css</code> when
        BAKE-UK-STUDY101 starts.
      </p>
    </div>
  );
}
