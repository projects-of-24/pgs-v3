/** S5 cards — mounts only when ?block=cards. */
import "../uk-owned-cards.css";

export function UkOwnedCardsBlock() {
  return (
    <div data-uk-owned-block="cards">
      <p className="uk-owned-css-lab__block-label">S5 · cards / cost / stats</p>
      <p className="uk-owned-css-lab__fixture">
        Fixture only. Fill <code>owned-css/uk-owned-cards.css</code> when
        BAKE-UK-CARDS starts.
      </p>
    </div>
  );
}
