/**
 * About Us — The #PGS Ecosystem — A11.
 * Desktop `17057:14392` · Mobile `517:5964`.
 */
import { ABOUT_ECOSYSTEM } from "./content";
import "./about-ecosystem.css";

type EcoItem = (typeof ABOUT_ECOSYSTEM.left)[number];

function EcoRow({ item }: { item: EcoItem }) {
  return (
    <li className="about-eco__item">
      <div className="about-eco__title-row">
        <span className="about-eco__box" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="about-eco__tick"
          src={ABOUT_ECOSYSTEM.tickSrc}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
        <p className="about-eco__item-title">{item.title}</p>
      </div>
      <p className="about-eco__item-body">{item.body}</p>
    </li>
  );
}

export function AboutEcosystem() {
  const c = ABOUT_ECOSYSTEM;

  return (
    <section
      className="about-eco"
      data-pgs-module="about-ecosystem"
      data-block-gate="a11"
      data-figma-desktop="17057:14392"
      data-figma-mobile="517:5964"
      aria-labelledby="about-eco-title"
    >
      <div className="about-eco__inner">
        <header className="about-eco__header">
          <h2 id="about-eco-title" className="about-eco__title">
            {c.title}
          </h2>
          <p className="about-eco__subtitle">{c.subtitle}</p>
        </header>

        <div className="about-eco__cols">
          <ul className="about-eco__col">
            {c.left.map((item) => (
              <EcoRow key={item.title} item={item} />
            ))}
          </ul>
          <ul className="about-eco__col">
            {c.right.map((item) => (
              <EcoRow key={item.title} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
