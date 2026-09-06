/**
 * Pricing for US clinical rotations.
 * Desktop Figma 18760:12618 + blocks 1–4 · mobile type cards = snap-scroll (Steps pattern).
 */
import { USMLE_ROTATION_PRICING } from "./content";
import "./usmle-rotation-pricing.css";

const CHECK = "/assets/img/usmlerotation/premium-check.svg";

/** Prefer wrapping long ranges after the dash so they stay in the value column. */
function formatFeeValue(value: string) {
  const parts = value.split(/( – | - )/);
  if (parts.length < 3) return value;
  return (
    <>
      {parts[0]}
      {parts[1]}
      <wbr />
      {parts[2]}
    </>
  );
}

export function UsmleRotationPricing() {
  const c = USMLE_ROTATION_PRICING;

  return (
    <section
      className="usmle-price"
      data-pgs-module="usmle-rotation-pricing"
      aria-labelledby="usmle-price-heading"
    >
      <div className="usmle-price__fee-shell">
        <div className="usmle-price__intro">
          <h2 id="usmle-price-heading" className="usmle-price__title">
            {c.title}
          </h2>
          <p className="usmle-price__body">{c.body}</p>
        </div>

        <div className="usmle-price__fee-card">
          <div className="usmle-price__fee-top">
            <p className="usmle-price__fee-amount">
              <span>{c.fee.amount}</span>
              <span aria-hidden="true">{c.fee.star}</span>
            </p>
            <p className="usmle-price__fee-inr">{c.fee.inr}</p>
          </div>
          <p className="usmle-price__fee-badge">{c.fee.badge}</p>
          <div className="usmle-price__fee-notes">
            {c.fee.notes.map((note) => (
              <p key={note.slice(0, 24)} className="usmle-price__fee-note">
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="usmle-price__blocks">
        <article className="usmle-price__block" aria-label={`Pricing detail ${c.block1.n}`}>
          <p className="usmle-price__step" aria-hidden="true">
            {c.block1.n}
          </p>
          <div className="usmle-price__block-body">
            <ul className="usmle-price__fee-rows">
              {c.block1.rows.map((row) => (
                <li key={row.label} className="usmle-price__fee-row">
                  <span className="usmle-price__fee-label">{row.label}</span>
                  <span className="usmle-price__fee-value">
                    {"strike" in row && row.strike ? (
                      <>
                        $
                        <span className="usmle-price__strike">{row.strike}</span>
                        {" off"}
                      </>
                    ) : (
                      formatFeeValue(row.value)
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <p className="usmle-price__block-copy">{c.block1.body}</p>
            <p className="usmle-price__block-foot">{c.block1.footnote}</p>
          </div>
        </article>

        <article className="usmle-price__block" aria-label={`Pricing detail ${c.block2.n}`}>
          <p className="usmle-price__step" aria-hidden="true">
            {c.block2.n}
          </p>
          <div className="usmle-price__block-body">
            {c.block2.lines.map((line) => (
              <p key={line} className="usmle-price__block-line">
                {line}
              </p>
            ))}
          </div>
        </article>

        <article className="usmle-price__block" aria-label={`Pricing detail ${c.block3.n}`}>
          <p className="usmle-price__step" aria-hidden="true">
            {c.block3.n}
          </p>
          <ul className="usmle-price__checks">
            {c.block3.checks.map((item) => (
              <li key={item.text + (item.bold ?? "")} className="usmle-price__check">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CHECK} alt="" width={24} height={24} />
                <span>
                  {item.text}
                  {item.bold ? <strong>{item.bold}</strong> : null}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <div className="usmle-price__block usmle-price__block--types">
          <p className="usmle-price__step" aria-hidden="true">
            {c.block4.n}
          </p>
          <div className="usmle-price__types-wrap">
            <div className="usmle-price__table-desktop" role="region" aria-label="Rotation type pricing">
              <table className="usmle-price__table">
                <thead>
                  <tr>
                    <th scope="col">{c.block4.headers.type}</th>
                    <th scope="col">{c.block4.headers.price}</th>
                    <th scope="col">{c.block4.headers.involves}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.block4.rows.map((row) => (
                    <tr key={row.type}>
                      <th scope="row">{row.type}</th>
                      <td>{row.price}</td>
                      <td>{row.involves}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="usmle-price__types-track">
              {c.block4.rows.map((row) => (
                <article
                  key={row.type}
                  className="usmle-price__type-card-wrap"
                  aria-label={row.type}
                >
                  <table className="usmle-price__type-card">
                    <tbody>
                      <tr>
                        <th scope="row">{c.block4.headers.type}</th>
                        <td className="usmle-price__type-name">{row.type}</td>
                      </tr>
                      <tr>
                        <th scope="row">{c.block4.headers.price}</th>
                        <td>{row.price}</td>
                      </tr>
                      <tr>
                        <th scope="row">{c.block4.headers.involves}</th>
                        <td>{row.involves}</td>
                      </tr>
                    </tbody>
                  </table>
                </article>
              ))}
            </div>

            <p className="usmle-price__approx">{c.approxNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
