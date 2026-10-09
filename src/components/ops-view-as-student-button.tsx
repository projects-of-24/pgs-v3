"use client";

import { useState } from "react";

/**
 * FEED-VAS — View as Student from student detail (and reusable elsewhere).
 * Opens the real student feed in a new tab with the preview cookie.
 */
export function OpsViewAsStudentButton({
  studentId,
  previewConfigured,
  className = "ops-stu2-view-as-student"
}: {
  studentId: string;
  previewConfigured: boolean;
  className?: string;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function startPreview() {
    setPending(true);
    setError("");
    const previewTab = window.open("about:blank", "_blank");
    const response = await fetch("/api/staff/preview", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode: "student", target_id: studentId })
    });
    const result = (await response.json()) as { ok?: boolean; redirect?: string; message?: string };
    if (!response.ok) {
      previewTab?.close();
      setPending(false);
      setError(result.message ?? "Unable to start student preview.");
      return;
    }
    const href = new URL(result.redirect ?? "/student/dashboard", window.location.origin).href;
    if (previewTab) {
      previewTab.location.href = href;
      setPending(false);
      return;
    }
    setPending(false);
    setError("Allow pop-ups for this site so View as Student can open in a new tab.");
  }

  return (
    <div className="ops-view-as-student">
      <button
        type="button"
        className={className}
        disabled={pending || !previewConfigured}
        onClick={() => void startPreview()}
      >
        {pending ? "Opening…" : "View as Student"}
      </button>
      {!previewConfigured ? (
        <p className="ops-view-as-student__hint" role="status">
          View as Student is not configured on this deployment.
        </p>
      ) : null}
      {error ? (
        <p className="ops-view-as-student__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
