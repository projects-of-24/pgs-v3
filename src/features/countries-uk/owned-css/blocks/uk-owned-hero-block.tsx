/** S1 hero — mounts only when ?block=hero (pulls uk-owned-hero.css). */
import "../owned-css/uk-owned-hero.css";

export function UkOwnedHeroBlock() {
  return (
    <div data-uk-owned-block="hero">
      <p className="uk-owned-css-lab__block-label">S1 · hero</p>
      <p className="uk-owned-css-lab__fixture">
        Fixture only. Fill <code>owned-css/uk-owned-hero.css</code> (×0.9 bake).
        Swap in real hero markup when that pass starts.
      </p>
    </div>
  );
}
