/**
 * Courses template — C11 Enrollment Fee.
 * Desk frame `17072:11555` · C11a `17072:11558` · C11b `17072:11577`.
 * Mob plate `551:10579` · intro `551:10580` · breakdowns `551:10600`.
 * Owned CSS. Fixtures only. iPad deferred.
 */
import type { ProgramsCoursesView } from "./courses-template-view";
import "./programs-courses-enroll.css";

function BreakdownItem({
  text,
  bold,
  icon
}: {
  text: string;
  bold?: string;
  icon: string;
}) {
  return (
    <li className="pc-enroll__check">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="pc-enroll__check-icon"
        src={icon}
        alt=""
        width={29}
        height={29}
        decoding="async"
      />
      <span className="pc-enroll__check-label">
        {text}
        {bold ? <strong className="pc-enroll__check-bold">{bold}</strong> : null}
      </span>
    </li>
  );
}

type ProgramsCoursesEnrollProps = {
  data: ProgramsCoursesView["enroll"];
};

export function ProgramsCoursesEnroll({ data: e }: ProgramsCoursesEnrollProps) {  const ctaIsLink = Boolean(e.ctaHref);

  return (
    <section
      id="pc-c11"
      className="pc-enroll"
      data-block-gate="c11"
      data-figma-desktop="17072:11555"
      data-figma-mobile="551:10579"
      aria-labelledby="pc-c11-title"
    >
      <div className="pc-enroll__plate">
        {/* C11a */}
        <div className="pc-enroll__hero">
          <div className="pc-enroll__intro">
            <h2 id="pc-c11-title" className="pc-enroll__title">
              {e.title}
            </h2>
            <p className="pc-enroll__subtitle">{e.subtitle}</p>
          </div>

          <div className="pc-enroll__price-card">
            <div className="pc-enroll__price-row">
              <div className="pc-enroll__price-stack">
                <p className="pc-enroll__amount">{e.price}</p>
                {ctaIsLink ? (
                  <a className="pc-enroll__cta" href={e.ctaHref}>
                    {e.ctaLabel}
                  </a>
                ) : (
                  <button type="button" className="pc-enroll__cta">
                    {e.ctaLabel}
                  </button>
                )}
              </div>
              <div className="pc-enroll__meta">
                <p className="pc-enroll__badge">{e.accessBadge}</p>
                <p className="pc-enroll__early">{e.earlyBird}</p>
              </div>
            </div>
          </div>
        </div>

        {/* C11b · `17072:11577` */}
        <div className="pc-enroll__breakdown">
          <h3 className="pc-enroll__breakdown-title">{e.breakdownTitle}</h3>
          <div className="pc-enroll__breakdown-body">
            <ul className="pc-enroll__checks pc-enroll__checks--left">
              {e.breakdownLeft.map((item) => (
                <BreakdownItem
                  key={item.text}
                  text={item.text}
                  bold={item.bold}
                  icon={e.checkIcon}
                />
              ))}
            </ul>
            <ul className="pc-enroll__checks pc-enroll__checks--right">
              {e.breakdownRight.map((item) => (
                <BreakdownItem
                  key={item.text}
                  text={item.text}
                  bold={item.bold}
                  icon={e.checkIcon}
                />
              ))}
            </ul>
            <div className="pc-enroll__extras">
              <div className="pc-enroll__extra">
                <p className="pc-enroll__extra-title">{e.otherExpensesTitle}</p>
                <div className="pc-enroll__housing">
                  <p className="pc-enroll__housing-label">{e.housingLabel}</p>
                  <div className="pc-enroll__housing-row">
                    <p className="pc-enroll__housing-price">{e.housingPrice}</p>
                    <p className="pc-enroll__housing-approx">{e.housingApprox}</p>
                  </div>
                </div>
              </div>
              <div className="pc-enroll__extra">
                <p className="pc-enroll__extra-title">{e.paymentTitle}</p>
                <div className="pc-enroll__payment">
                  <p className="pc-enroll__payment-body">{e.paymentBody}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
