"use client";

/**
 * Shared country body shell (slug-agnostic).
 * Layout: `country-body-layout.css` · Study 101 Why: Figma module.
 * Hero rendered outside by the route (modular CountryHeroFigma HTML).
 */
import { CountryPage } from "./CountryPage";
import { CountryStudy101WhyFigma } from "./country-study101-why-figma";
import type { CountryPageContent } from "./content";
import "./country-body-layout.css";
import "./country-study101-why-figma-others.css";

type Props = {
  content: CountryPageContent;
};

export function CountryBodyShell({ content }: Props) {
  const study101 = content.tabs.find((t) => t.id === "study101");

  return (
    <CountryPage
      content={content}
      hideHero
      className="country-body-shell-others"
      study101Lead={
        study101 && study101.id === "study101" ? (
          <CountryStudy101WhyFigma
            content={{
              title: study101.sidebarLinks[0]?.label,
              paragraphs: study101.whyParagraphs,
            }}
          />
        ) : null
      }
    />
  );
}

/** @deprecated Use `CountryBodyShell` — UK is not special. */
export const CountryUkBodyShell = CountryBodyShell;
