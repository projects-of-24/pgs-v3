"use client";

export function StaffPreviewBanner({
  mode,
  targetName,
  actorName
}: {
  mode: "student" | "mentor";
  targetName: string;
  actorName: string;
}) {
  const title = mode === "student" ? "VIEWING AS STUDENT" : "VIEWING AS MENTOR";

  return (
    <div className="pgs-staff-preview-banner" role="status">
      <p>
        <strong>{title}</strong>
        <span>{targetName}</span>
        <span>You are still signed in as {actorName}.</span>
      </p>
    </div>
  );
}
