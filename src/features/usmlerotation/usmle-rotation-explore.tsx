/**
 * explore Rotations — Figma desktop 18760:12476 · mobile 18760:11461.
 * One course → desktop + mobile layouts (same data).
 */
"use client";

import { useCardSave } from "@/features/saved/useCardSave";
import {
  UsmleExploreDesktopCard,
  UsmleExploreMobileCard,
} from "./usmle-explore-cards";
import type { UsmleExploreCourseCards } from "./usmle-explore-types";
import { USMLE_ROTATION_EXPLORE } from "./content";
import "./usmle-rotation-explore.css";

type Props = {
  courses: UsmleExploreCourseCards[];
  isLoggedIn?: boolean;
  initialSavedIds?: string[];
};

export function UsmleRotationExplore({
  courses,
  isLoggedIn = false,
  initialSavedIds = [],
}: Props) {
  const c = USMLE_ROTATION_EXPLORE;
  const { isSaved, handleToggleSave } = useCardSave(
    initialSavedIds,
    isLoggedIn,
  );

  return (
    <section
      className="usmle-explore"
      data-pgs-module="usmle-rotation-explore"
      aria-labelledby="usmle-explore-heading"
    >
      <div className="usmle-explore__inner">
        <header className="usmle-explore__header">
          <h2 id="usmle-explore-heading" className="usmle-explore__title">
            {c.heading}
          </h2>
          <a href={c.listHref} className="usmle-explore__list-btn">
            <span className="usmle-explore__list-btn-lead">{c.listCtaLead}</span>
            <span className="usmle-explore__list-btn-sub">{c.listCtaSub}</span>
          </a>
        </header>

        <div
          id="rotations-list"
          className="usmle-explore__list"
          data-relational-catalog="usmle-rotation-courses"
        >
          {courses.length === 0 ? (
            <p className="usmle-explore__empty" role="status">
              {c.emptyMessage}
            </p>
          ) : (
            <ul className="usmle-explore__cards">
              {courses.map((course) => {
                const saved = isSaved(course.id);
                const data = { ...course.card, saved };
                return (
                  <li key={course.id} className="usmle-explore__item">
                    <div className="usmle-explore__card usmle-explore__card--desktop">
                      <UsmleExploreDesktopCard
                        data={data}
                        onToggleSave={() => handleToggleSave(data)}
                      />
                    </div>
                    <div className="usmle-explore__card usmle-explore__card--mobile">
                      <UsmleExploreMobileCard
                        data={data}
                        onToggleSave={() => handleToggleSave(data)}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
