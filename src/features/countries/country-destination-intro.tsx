/**
 * Country destination intro (title + CTA + tabs).
 * Hero is owned by `CountryHeroFigma` — not emitted here.
 *
 * Visual authority (title block): existing country destination copy.
 * Layout CSS: `countries.css` at >1366 / 601–1366 / ≤600.
 */
export type CountryDestinationIntroContent = {
  titleLineOne: string;
  titleLineTwo: string;
  subtitle: string;
  kicker: string;
  contactCta: string;
};

function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Title + CTA + tabs HTML only — no Hostinger hero markup. */
export function buildCountryDestinationIntroHtml(
  content: CountryDestinationIntroContent,
  tabsAndBelowHtml: string,
): string {
  const titleLineOne = escapeText(content.titleLineOne);
  const titleLineTwo = escapeText(content.titleLineTwo);
  const subtitle = escapeText(content.subtitle);
  const kicker = escapeText(content.kicker);
  const contactCta = escapeText(content.contactCta);

  return `<div class="wrapper-content mt-4">

    <div class="w-964px m-auto">
        <section class="py-5 mobile-usa-content">
            <div class="">
                <div class="row mt-0">

                    <div class="col-md-6">
                        <h3 class="mb-2 text-black font-semibold usa-section-title fs-32 lh-35">
                            ${titleLineOne} <br/> ${titleLineTwo}
                        </h3>
                        <p class="mb-1 fs-14 lh-20 mobile-fs-14 mobile-lh-full" style="color: #000000;">
                            ${subtitle}
                        </p>
                        <p class="mb-0 usa-section-contain fs-16 mobile-fs-14 mobile-lh-full" style="color: #000000;">
                            ${kicker}
                        </p>
                    </div>
                    <div class="col-md-4 mt-2 mt-md-0 mb-8">
                        <a href="#contact" class="btn btn-custom">
                            ${contactCta}
                        </a>
                    </div>
                </div>
            </div>
        </section>
${tabsAndBelowHtml}`;
}
