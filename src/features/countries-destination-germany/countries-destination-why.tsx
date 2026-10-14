/**
 * Country destination — lead copy block.
 * Study 101 Why: C4 · Figma `26:2840`.
 * Study Cost Budgeting: CS2 · Figma `29:4803`.
 * Short-Term intro: ST2 · Figma `33:5809`.
 * Scholarships intro: SC2 · Figma `34:6281` (paras only · no title).
 * Tracks intro: PT2 · Figma `35:6829` (paras only · no title).
 */
import {
  USA_DESTINATION_WHY,
  type CountriesDestinationWhyContent
} from "./content";
import "./countries-destination-why.css";

type Props = {
  content?: CountriesDestinationWhyContent;
  id?: string;
  blockGate?: string;
  figmaIpad?: string;
  titleId?: string;
  /** Used when content has no title (aria-label). */
  ariaLabel?: string;
};

export function CountriesDestinationWhy({
  content = USA_DESTINATION_WHY,
  id = "cd-why",
  blockGate = "c4",
  figmaIpad = "26:2840",
  titleId = "countries-destination-why-title",
  ariaLabel
}: Props) {
  const c = content;
  const hasTitle = Boolean(c.title);

  return (
    <section
      id={id}
      className={
        hasTitle
          ? "countries-destination-why"
          : "countries-destination-why countries-destination-why--no-title"
      }
      data-pgs-module="countries-destination-why"
      data-block-gate={blockGate}
      data-figma-ipad={figmaIpad}
      {...(hasTitle
        ? { "aria-labelledby": titleId }
        : { "aria-label": ariaLabel ?? "Scholarship intro" })}
    >
      {hasTitle ? (
        <h2 id={titleId} className="countries-destination-why__title">
          {c.title}
        </h2>
      ) : null}
      <div className="countries-destination-why__body">
        {c.paragraphs.map((p) => (
          <p key={p.slice(0, 48)} className="countries-destination-why__p">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
