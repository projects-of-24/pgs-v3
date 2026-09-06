/**
 * Side-test QC — locked #feed BODY only (Part 1).
 * Live Hostinger / `/student/dashboard` unchanged.
 * No header / sidebar / footer edits — body module only.
 *
 * Open: /preview/student-feed
 *       /preview/student-feed?state=anonymous
 *       /preview/student-feed?state=standard
 */
import { StudentFeedLockedBody } from "@/features/student-feed/student-feed-locked-body";
import type { StudentFeedLockedPreviewState } from "@/features/student-feed/student-feed-locked-body";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function resolveState(raw: string | string[] | undefined): StudentFeedLockedPreviewState {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === "anonymous") return "anonymous";
  return "authenticated_standard";
}

export default async function StudentFeedLockedPreviewPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const state = resolveState(params.state);

  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "24px 16px 48px",
        background: "#ffffff",
        boxSizing: "border-box"
      }}
    >
      <h1
        style={{
          margin: "0 0 8px",
          fontFamily: "system-ui, sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: "#000"
        }}
      >
        Preview — student #feed locked BODY (Part 1)
      </h1>
      <p
        style={{
          margin: "0 0 8px",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          lineHeight: 1.4,
          color: "#333",
          maxWidth: 720
        }}
      >
        QC only. Live <code>/student/dashboard</code> (Hostinger + Premium) is untouched. No header /
        sidebar / footer in this slice. State: <strong>{state}</strong>.
      </p>
      <p
        style={{
          margin: "0 0 24px",
          fontFamily: "system-ui, sans-serif",
          fontSize: 13,
          lineHeight: 1.4,
          color: "#555"
        }}
      >
        <a href="/preview/student-feed?state=standard">standard locked</a>
        {" · "}
        <a href="/preview/student-feed?state=anonymous">anonymous locked</a>
        {" · "}
        <a href="/student/dashboard">open live feed (unchanged)</a>
      </p>
      <StudentFeedLockedBody state={state} />
    </main>
  );
}
