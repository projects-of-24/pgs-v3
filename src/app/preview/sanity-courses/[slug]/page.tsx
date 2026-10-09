/**
 * Parallel Sanity trial — single course preview on Programs Courses shell.
 * URL: /preview/sanity-courses/[slug]
 */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgramsCoursesPreviewShell } from "@/features/programs-courses/programs-courses-preview-shell";
import { sanityClient } from "@/sanity/client";
import { SanitySetupNotice } from "@/sanity/components/sanity-setup-notice";
import { isSanityConfigured } from "@/sanity/env";
import { mapSanityCourseToTemplate, type SanityCourseDoc } from "@/sanity/lib/map-course-to-template";
import { courseBySlugQuery } from "@/sanity/lib/queries";
import "../sanity-courses-preview.css";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SanityCoursePreviewPage({ params }: PageProps) {
  if (!isSanityConfigured()) {
    return <SanitySetupNotice />;
  }

  const { slug: slugRaw } = await params;
  const slug = decodeURIComponent(slugRaw || "").trim();
  if (!slug) notFound();

  let doc: SanityCourseDoc | null = null;
  let errorMessage = "";
  try {
    doc = await sanityClient.fetch<SanityCourseDoc | null>(courseBySlugQuery, { slug });
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Failed to load course from Sanity.";
  }

  if (!errorMessage && !doc) notFound();

  const course = doc ? mapSanityCourseToTemplate(doc) : null;
  const title = course?.titleLines.join(" ") || slug;

  return (
    <main className="sanity-trial">
      <header className="sanity-trial__banner" role="status">
        <div>
          <strong>Sanity trial course preview</strong>
          <span>
            Rendering <em>{title}</em> from Sanity Cloud (slug <code>{slug}</code>). Not Ops CMS. Not
            Supabase.
          </span>
        </div>
        <div className="sanity-trial__actions">
          <Link className="sanity-trial__link" href="/preview/sanity-courses">
            All Sanity courses
          </Link>
        </div>
      </header>

      {errorMessage ? (
        <p className="sanity-trial__error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {course ? (
        <div className="sanity-trial__frame" data-sanity-courses-preview="true">
          <ProgramsCoursesPreviewShell course={course} hideEmptySections />
        </div>
      ) : null}
    </main>
  );
}
