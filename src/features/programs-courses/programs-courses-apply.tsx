/**
 * Courses template — C8 How to Apply.
 * Desk `17072:11084` · Mob `551:10566` (stacked Option 1 · down arrows).
 * Owned CSS. Fixtures only. iPad deferred.
 */
import type { ProgramsCoursesView } from "./courses-template-view";
import "./programs-courses-apply.css";

type ProgramsCoursesApplyProps = {
  data: ProgramsCoursesView["apply"];
};

export function ProgramsCoursesApply({ data: a }: ProgramsCoursesApplyProps) {
  return (
    <section
      id="pc-c8"
      className="pc-apply"
      data-block-gate="c8"
      data-figma-desktop="17072:11084"
      data-figma-mobile="551:10566"
      data-figma-intro="17072:11085"
      data-figma-options="17072:11096"
      aria-labelledby="pc-c8-title"
    >
      <div className="pc-apply__frame">
        <div className="pc-apply__top">
          <header className="pc-apply__intro">
            <h2 id="pc-c8-title" className="pc-apply__title">
              {a.title}
            </h2>
            <p className="pc-apply__subtitle">{a.subtitle}</p>
          </header>

          <div className="pc-apply__eligibility">
            <p className="pc-apply__eligibility-label">{a.eligibilityLabel}</p>
            <ul className="pc-apply__chips">
              {a.eligibilityChips.map((chip) => (
                <li key={chip} className="pc-apply__chip">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* C8b — Option 1 + Option 2 */}
        <div className="pc-apply__options">
          <div className="pc-apply__option pc-apply__option--1">
            <div className="pc-apply__option-badge" aria-hidden="true">
              <span className="pc-apply__option-label">{a.optionLabel}</span>
              <span className="pc-apply__option-num">1</span>
            </div>
            <ol className="pc-apply__steps">
              {a.option1Steps.map((step, i) => (
                <li key={step.title} className="pc-apply__step-wrap">
                  {i > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="pc-apply__arrow"
                      src={a.arrowIcon}
                      alt=""
                      width={32}
                      height={32}
                      decoding="async"
                    />
                  ) : null}
                  <div className="pc-apply__step">
                    <p className="pc-apply__step-title">{step.title}</p>
                    <p className="pc-apply__step-body">
                      {step.body ? (
                        step.body
                      ) : (
                        <>
                          {step.bodyBefore}
                          {step.linkText ? (
                            <a
                              className="pc-apply__link"
                              href={step.linkHref || "#"}
                            >
                              {step.linkText}
                            </a>
                          ) : null}
                          {step.bodyAfter}
                        </>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="pc-apply__option pc-apply__option--2">
            <div className="pc-apply__option-badge" aria-hidden="true">
              <span className="pc-apply__option-label">{a.optionLabel}</span>
              <span className="pc-apply__option-num">2</span>
            </div>
            <div className="pc-apply__step pc-apply__step--wide">
              <p className="pc-apply__step-title">{a.option2.title}</p>
              <p className="pc-apply__step-body">
                {a.option2.bodyBefore}
                <a className="pc-apply__link" href={a.option2.linkHref}>
                  {a.option2.linkText}
                </a>
                {a.option2.bodyAfter}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
