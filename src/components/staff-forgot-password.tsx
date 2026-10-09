"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { operationsRoboto } from "@/lib/operations-font";
import type { StaffLoginSurface } from "@/components/studio-login";
import styles from "./studio-login.module.css";

type Props = {
  surface: StaffLoginSurface;
};

/**
 * Staff forgot-password (Studio / Workspace) — not the student `/forgot_password` page.
 * Same Auth recovery API; surface-matched chrome + back to the matching login.
 */
export function StaffForgotPassword({ surface }: Props) {
  const isWorkspace = surface === "workspace";
  const loginHref = isWorkspace ? "/workspace/login" : "/studio/login";
  const titleId = isWorkspace ? "workspace-forgot-title" : "studio-forgot-title";
  const brandId = isWorkspace ? "workspace-forgot-brand" : "studio-forgot-brand";
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: form.get("email") })
    });
    const result = (await response.json()) as { message?: string };
    setSubmitting(false);
    if (!response.ok) {
      setMessage(result.message ?? "Unable to request a reset link.");
      return;
    }
    setSent(true);
    setMessage(
      result.message ?? "If an account exists, a secure reset link has been sent."
    );
  }

  const formCard = (
    <div className={styles.card}>
      <h2 id={titleId}>
        {isWorkspace ? "Reset Workspace password" : "Reset Studio password"}
      </h2>
      <p className={styles.cardLead}>
        Enter your staff email. We will send a reset link if an account exists.
      </p>

      {!isWorkspace ? (
        <div className={styles.warning} role="status">
          <Lock aria-hidden="true" className={styles.warningIcon} />
          <div>
            <strong>Staff accounts only</strong>
            <span>Students use the student Forgot password page from /login.</span>
          </div>
        </div>
      ) : null}

      <form onSubmit={(event) => void submit(event)} className={styles.form}>
        <label className={styles.field}>
          <span>Email</span>
          <span className={styles.inputWrap}>
            <Mail aria-hidden="true" className={styles.inputIcon} />
            <input
              name="email"
              type="email"
              autoComplete="username"
              placeholder="Enter your staff email"
              required
              disabled={submitting || sent}
            />
          </span>
        </label>

        <p className={styles.message} role={message ? "alert" : "status"} aria-live="polite">
          {message}
        </p>

        <button type="submit" className={styles.submit} disabled={submitting || sent}>
          {submitting ? "Sending…" : sent ? "Link sent" : "Send reset link →"}
        </button>
      </form>

      <p className={styles.forgot}>
        <Link href={loginHref}>← Back to {isWorkspace ? "Workspace" : "Studio"} sign in</Link>
      </p>

      {isWorkspace ? (
        <div className={styles.warning} role="status">
          <Lock aria-hidden="true" className={styles.warningIcon} />
          <div>
            <strong>Staff accounts only</strong>
            <span>Students use the student Forgot password page from /login.</span>
          </div>
        </div>
      ) : (
        <div className={styles.footer}>
          <span>{isWorkspace ? "PGS Workspace" : "PGS Staff Portal"}</span>
          <small>Empowering education together</small>
        </div>
      )}
    </div>
  );

  if (isWorkspace) {
    return (
      <main className={`${styles.page} ${styles.pageWorkspace} ${operationsRoboto.variable}`}>
        <div className={styles.workspaceStack}>
          <header className={styles.workspaceHero} aria-labelledby={brandId}>
            <div className={styles.brandMark}>
              <strong>PGS</strong>
              <span>PurpleGuide Study</span>
            </div>
            <h1 id={brandId}>Mentor-Student Workspace</h1>
            <p className={styles.lead}>Reset access for your staff Workspace account.</p>
          </header>
          <div className={styles.formPane} aria-labelledby={titleId} role="region">
            {formCard}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`${styles.page} ${operationsRoboto.variable}`}>
      <div className={styles.shell}>
        <div className={styles.formPane} aria-labelledby={titleId} role="region">
          {formCard}
        </div>
        <div className={styles.brandPane} aria-labelledby={brandId} role="region">
          <div className={styles.brandMark}>
            <strong>PGS</strong>
            <span>Purple Guide Study</span>
          </div>
          <h1 id={brandId}>Staff password recovery</h1>
          <p className={styles.lead}>
            Use the same staff email you sign in with at Studio. Students recover passwords from the
            public login door.
          </p>
        </div>
      </div>
    </main>
  );
}
