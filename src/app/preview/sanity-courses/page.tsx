/**
 * Parallel Sanity trial — course list.
 * URL: /preview/sanity-courses
 * Does not use Ops CMS / Supabase drafts.
 */
import Link from "next/link";
import { sanityClient } from "@/sanity/client";
import { SanitySetupNotice } from "@/sanity/components/sanity-setup-notice";
import { isSanityConfigured } from "@/sanity/env";
import { courseSlugsQuery } from "@/sanity/lib/queries";
import "./sanity-courses-preview.css";

export const dynamic = "force-dynamic";

type CourseRow = { _id: string; title: string | null; slug: string | null };

export default async function SanityCoursesIndexPage() {
  if (!isSanityConfigured()) {
    return <SanitySetupNotice />;
  }

  let courses: CourseRow[] = [];
  let errorMessage = "";
  try {
    courses = await sanityClient.fetch<CourseRow[]>(courseSlugsQuery);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Failed to load Sanity courses.";
  }

  return (
    <main className="sanity-trial">
      <header className="sanity-trial__banner" role="status">
        <div>
          <strong>Sanity trial preview index</strong>
          <span>Parallel path only — content lives in Sanity Cloud, not Supabase.</span>
        </div>
      </header>

      {errorMessage ? (
        <p className="sanity-trial__error" role="alert">
          {errorMessage}. Check project id, dataset, and CORS for <code>http://localhost:7000</code>.
        </p>
      ) : null}

      {!errorMessage && courses.length === 0 ? (
        <p className="sanity-trial__empty">
          No published courses yet. Create and publish a Course in the Sanity trial project, then refresh
          this page.
        </p>
      ) : null}

      <ul className="sanity-trial__list">
        {courses.map((course) => {
          const slug = course.slug?.trim();
          if (!slug) return null;
          return (
            <li key={course._id}>
              <Link href={`/preview/sanity-courses/${encodeURIComponent(slug)}`}>
                {course.title?.trim() || slug}
              </Link>
              <span className="sanity-trial__slug">/preview/sanity-courses/{slug}</span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
