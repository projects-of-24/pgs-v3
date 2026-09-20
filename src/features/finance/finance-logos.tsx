/**
 * Finance partner logos — F2 + motion.
 * Figma `17041:17714` / Hostinger marquee intent (owned CSS, not Hostinger JS).
 * Images from CMS `finance_partner_logos` (+ fixture fallback). No click URL in W1.
 */
import type { FinancePartnerLogo } from "./get-finance-partner-logos";
import { FINANCE_PARTNER_LOGOS } from "./content";
import "./finance-logos.css";

type FinanceLogosProps = {
  logos?: readonly FinancePartnerLogo[];
};

function LogoSet({
  logos,
  decorative = false
}: {
  logos: readonly FinancePartnerLogo[];
  decorative?: boolean;
}) {
  /** Triple the list so each marquee half stays wider than a desktop viewport. */
  const half = [...logos, ...logos, ...logos];

  return (
    <ul
      className="finance-logos__set"
      aria-hidden={decorative ? true : undefined}
    >
      {half.map((logo, i) => (
        <li
          key={`${decorative ? "d" : "a"}-${logo.name}-${i}`}
          className="finance-logos__item"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="finance-logos__img"
            src={logo.src}
            alt={decorative ? "" : logo.name}
            width={140}
            height={40}
          />
        </li>
      ))}
    </ul>
  );
}

export function FinanceLogos({ logos }: FinanceLogosProps) {
  const list =
    logos && logos.length > 0 ? logos : FINANCE_PARTNER_LOGOS;

  return (
    <div
      className="finance-logos"
      data-pgs-module="finance-logos"
      data-block-gate="f2"
      data-motion="marquee"
      role="region"
      aria-label="Partner brands"
    >
      <div className="finance-logos__viewport">
        <div className="finance-logos__track">
          <LogoSet logos={list} />
          <LogoSet logos={list} decorative />
        </div>
      </div>
    </div>
  );
}
