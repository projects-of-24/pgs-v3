"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { BarChart3, BookOpen, Eye, EyeOff, Lock, Mail, ShieldCheck, Users } from "lucide-react";
import { operationsRoboto } from "@/lib/operations-font";
import styles from "./studio-login.module.css";

export type StaffLoginSurface = "studio" | "workspace";

export function StudioLogin({
  redirectPath = "/ops",
  initialMessage = "",
  surface = "studio",
  formTitle = "Sign in to PGS",
  formLead = "Enter your credentials to access the operations and CMS.",
  brandTitle = "One Platform for Education Management",
  brandLead = "Manage your courses, events, webinars, universities and more with a powerful CMS and operations panel.",
  footerLabel = "PGS Staff Portal"
}: {
  redirectPath?: string;
  initialMessage?: string;
  surface?: StaffLoginSurface;
  formTitle?: string;
  formLead?: string;
  brandTitle?: string;
  brandLead?: string;
  footerLabel?: string;
}) {
  const [message, setMessage] = useState(initialMessage);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isWorkspace = surface === "workspace";
  const titleId = isWorkspace ? "workspace-login-title" : "studio-login-title";
  const brandId = isWorkspace ? "workspace-brand-title" : "studio-brand-title";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    // Workspace door always lands on empty /workspace — never Ops.
    const postRedirect = isWorkspace ? "/workspace" : redirectPath;
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
        redirect: postRedirect,
        surface
      })
    });
    const result = (await response.json()) as { message?: string; redirect?: string };
    if (!response.ok || !result.redirect) {
      setMessage(result.message ?? "Unable to sign in.");
      setSubmitting(false);
      return;
    }
    const land = isWorkspace
      ? "/workspace"
      : result.redirect.startsWith("/ops") || result.redirect.startsWith("/admin") || result.redirect.startsWith("/cms")
        ? result.redirect
        : "/ops";
    window.location.assign(land);
  }

  const formFields = (
    <form onSubmit={submit} className={styles.form}>
      <label className={styles.field}>
        <span>Email or Username</span>
        <span className={styles.inputWrap}>
          <Mail aria-hidden="true" className={styles.inputIcon} />
          <input
            name="email"
            type="email"
            autoComplete="username"
            placeholder="Enter your email or username"
            required
          />
        </span>
      </label>

      <label className={styles.field}>
        <span>Password</span>
        <span className={styles.inputWrap}>
          <Lock aria-hidden="true" className={styles.inputIcon} />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className={styles.eye}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        </span>
      </label>

      <p className={styles.message} role={message ? "alert" : "status"} aria-live="polite">
        {message}
      </p>

      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? "Signing in…" : "Sign In →"}
      </button>
    </form>
  );

  /** WS-LOGIN-UI — centered card (ChatGPT mock), not Ops two-column marketing. */
  if (isWorkspace) {
    return (
      <main className={`${styles.page} ${styles.pageWorkspace} ${operationsRoboto.variable}`}>
        <div className={styles.workspaceStack}>
          <header className={styles.workspaceHero} aria-labelledby={brandId}>
            <div className={styles.brandMark}>
              <strong>PGS</strong>
              <span>PurpleGuide Study</span>
            </div>
            <h1 id={brandId}>{brandTitle}</h1>
            <p className={styles.lead}>{brandLead}</p>
          </header>

          <div className={styles.formPane} aria-labelledby={titleId} role="region">
            <div className={styles.card}>
              <h2 id={titleId}>{formTitle}</h2>
              <p className={styles.cardLead}>{formLead}</p>
              {formFields}
              <p className={styles.forgot}>
                <Link href="/workspace/forgot-password">Forgot password?</Link>
              </p>
              <div className={styles.warning} role="status">
                <Lock aria-hidden="true" className={styles.warningIcon} />
                <div>
                  <strong>Students are not allowed to login</strong>
                  <span>Access is limited to Super Admin, Admin, Mentor and Staff only.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`${styles.page} ${operationsRoboto.variable}`}>
      <div className={styles.shell}>
        <div className={styles.formPane} aria-labelledby={titleId} role="region">
          <div className={styles.card}>
            <h2 id={titleId}>{formTitle}</h2>
            <p className={styles.cardLead}>{formLead}</p>

            <div className={styles.warning} role="status">
              <Lock aria-hidden="true" className={styles.warningIcon} />
              <div>
                <strong>Students are not allowed to login</strong>
                <span>Access is limited to Super Admin, Admin, Mentor and Staff only.</span>
              </div>
            </div>

            {formFields}

            <p className={styles.forgot}>
              <Link href="/studio/forgot-password">Forgot password?</Link>
            </p>

            <div className={styles.footer}>
              <span>{footerLabel}</span>
              <small>Empowering education together</small>
            </div>
          </div>
        </div>

        <div className={styles.brandPane} aria-labelledby={brandId} role="region">
          <div className={styles.brandMark}>
            <strong>PGS</strong>
            <span>Purple Guide Study</span>
          </div>
          <h1 id={brandId}>{brandTitle}</h1>
          <p className={styles.lead}>{brandLead}</p>
          <ul className={styles.features}>
            <li>
              <span className={`${styles.featureIcon} ${styles.featureBlue}`} aria-hidden="true">
                <BookOpen />
              </span>
              <div>
                <strong>Content Management</strong>
                <span>Create and manage courses, events, webinars, universities and more.</span>
              </div>
            </li>
            <li>
              <span className={`${styles.featureIcon} ${styles.featureGreen}`} aria-hidden="true">
                <Users />
              </span>
              <div>
                <strong>User Management</strong>
                <span>Control access with roles and permissions.</span>
              </div>
            </li>
            <li>
              <span className={`${styles.featureIcon} ${styles.featureOrange}`} aria-hidden="true">
                <BarChart3 />
              </span>
              <div>
                <strong>Operations Dashboard</strong>
                <span>Track students, targets, team and activity.</span>
              </div>
            </li>
            <li>
              <span className={`${styles.featureIcon} ${styles.featureRed}`} aria-hidden="true">
                <ShieldCheck />
              </span>
              <div>
                <strong>Secure Access</strong>
                <span>Only Super Admin, Admin, Mentor and Staff can login.</span>
              </div>
            </li>
          </ul>
          <div className={styles.illustration} aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
