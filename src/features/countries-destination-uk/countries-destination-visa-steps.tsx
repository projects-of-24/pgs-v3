/**
 * Country destination — Step-by-Step Applying 101 — V4.
 * Same mobile `.steps` / `.step-card` structure. iPad CSS pass · Figma `30:5210`.
 */
import {
  USA_DESTINATION_VISA_STEPS,
  type CountriesDestinationVisaStepsContent
} from "./content";
import "./countries-destination-visa-steps.css";

type Props = {
  content?: CountriesDestinationVisaStepsContent;
};

export function CountriesDestinationVisaSteps({
  content = USA_DESTINATION_VISA_STEPS
}: Props) {
  const c = content;

  return (
    <section
      id="cd-visa-steps"
      className="countries-destination-visa-steps"
      data-pgs-module="countries-destination-visa-steps"
      data-block-gate="v4"
      data-figma-ipad="30:5210"
      data-figma-phone="505:6985"
      aria-labelledby="countries-destination-visa-steps-title"
    >
      <h2
        id="countries-destination-visa-steps-title"
        className="countries-destination-visa-steps__title"
      >
        {c.title}
      </h2>

      <div className="countries-destination-visa-steps__grid">
        {c.steps.map((step) => (
          <article
            key={step.stepLabel}
            className="countries-destination-visa-steps__card"
          >
            <p className="countries-destination-visa-steps__chip">{step.stepLabel}</p>
            <h3 className="countries-destination-visa-steps__card-title">
              {step.title}
            </h3>
            <p className="countries-destination-visa-steps__detail">{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
