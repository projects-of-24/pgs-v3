/**
 * Study 101 Why lead — Figma module.
 * Live: `/countriesuk` via CountryUkBodyShell. Preview: `/preview/country-study101-why`
 *
 * Figma: all-pages-v6 · desktop body frame `18753:11567`
 *   heading `18753:11570` · body `18753:11571`
 */
import "./country-study101-why-figma-france.css";

export type CountryStudy101WhyContent = {
  title: string;
  paragraphs: string[];
};

export const COUNTRY_STUDY101_WHY_USA_DEFAULTS: CountryStudy101WhyContent = {
  title: "Why Study in USA as an Indian Student?",
  paragraphs: [
    "With over 1.1 million international students, the USA has emerged as the number one study destination over the years. One of the major reasons for students flocking to study in USA is the excellent reputation that US universities and degrees hold.",
    "Diversity is another distinguishing factor that attracts students to pursue higher studies in USA. The country also provides ample work opportunities to the students during and after completion of their academic courses.",
    "Overall, USA is one of the most favorable places in the world for those who wish to turn their study abroad dream into reality."
  ]
};

type CountryStudy101WhyFigmaProps = {
  content?: Partial<CountryStudy101WhyContent>;
};

export function CountryStudy101WhyFigma({ content }: CountryStudy101WhyFigmaProps) {
  const data = { ...COUNTRY_STUDY101_WHY_USA_DEFAULTS, ...content };
  const paragraphs =
    content?.paragraphs ?? COUNTRY_STUDY101_WHY_USA_DEFAULTS.paragraphs;

  return (
    <div
      className="country-study101-why-figma-france"
      data-pgs-module="country-study101-why-figma-france"
      data-band="desktop"
      role="region"
      aria-labelledby="country-study101-why-title"
    >
      <div className="country-study101-why-figma-france__inner">
        <h2
          id="country-study101-why-title"
          className="country-study101-why-figma-france__title"
        >
          {data.title}
        </h2>
        <div className="country-study101-why-figma-france__body">
          {paragraphs.map((p) => (
            <p className="country-study101-why-figma-france__p" key={p.slice(0, 48)}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
