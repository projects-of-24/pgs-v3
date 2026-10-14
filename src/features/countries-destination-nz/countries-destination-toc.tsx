/**
 * Country destination TOC + stats — C3 / CS1 / V1 / ST1 / SC1 / PT1.
 * Study 101 · Cost · Visa · Short · Scholarships · Tracks `35:6807`.
 */
import {
  USA_DESTINATION_TOC,
  type CountriesDestinationTocContent
} from "./content";
import "./countries-destination-toc.css";

type Props = {
  content?: CountriesDestinationTocContent;
  /** Gate marker · default C3 */
  blockGate?: string;
  figmaIpad?: string;
};

export function CountriesDestinationToc({
  content = USA_DESTINATION_TOC,
  blockGate = "c3",
  figmaIpad = "26:2820"
}: Props) {
  const c = content;
  const asideBody = c.asideStyle === "body";

  return (
    <section
      className="countries-destination-toc"
      data-pgs-module="countries-destination-toc"
      data-block-gate={blockGate}
      data-figma-ipad={figmaIpad}
      data-figma-phone-cue="503:4707"
      data-figma-phone-arrow="503:4708"
      aria-label="On this page"
    >
      {/*
        Phone/iPad cue + dashed Arrow 1 — Figma `503:4707` / `503:4708`.
        Modular band only (desk >1366 uses UK body — cue stays hidden).
      */}
      <div className="countries-destination-toc__cue" aria-hidden="true">
        <img
          className="countries-destination-toc__cue-arrow"
          src="/assets/img/countries-destination/toc-scroll-arrow.png"
          alt=""
          width={71}
          height={47}
        />
        <p className="countries-destination-toc__cue-text">
          <span>Select section or</span>
          <span>scroll down.</span>
        </p>
      </div>

      <div className="countries-destination-toc__card">
        <nav className="countries-destination-toc__links" aria-label="Page sections">
          {c.links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="countries-destination-toc__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="countries-destination-toc__stats">
          <div className="countries-destination-toc__stat-box">
            {c.stats.map((stat) => (
              <div key={stat.value} className="countries-destination-toc__stat">
                <p
                  className={
                    stat.value.length > 4
                      ? "countries-destination-toc__stat-value countries-destination-toc__stat-value--compact"
                      : "countries-destination-toc__stat-value"
                  }
                >
                  {stat.value}
                </p>
                <p className="countries-destination-toc__stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
          <p
            className={
              asideBody
                ? "countries-destination-toc__stat-aside countries-destination-toc__stat-aside--body"
                : "countries-destination-toc__stat-aside"
            }
          >
            {c.aside}
          </p>
        </div>

        <p className="countries-destination-toc__footnote">{c.footnote}</p>
      </div>
    </section>
  );
}
