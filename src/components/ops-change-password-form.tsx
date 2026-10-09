"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, Lock } from "lucide-react";

type Strength = "empty" | "weak" | "fair" | "good" | "strong";

function passwordChecks(password: string) {
  return {
    length: password.length >= 8,
    number: /\d/.test(password),
    upper: /[A-Z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
}

function strengthFromChecks(password: string): Strength {
  if (!password) return "empty";
  const checks = passwordChecks(password);
  const score = Object.values(checks).filter(Boolean).length;
  if (score <= 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "good";
  return "strong";
}

const strengthLabel: Record<Strength, string> = {
  empty: "",
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong"
};

export function OpsChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const checks = useMemo(() => passwordChecks(password), [password]);
  const strength = useMemo(() => strengthFromChecks(password), [password]);
  const filledSegments = strength === "empty" ? 0 : strength === "weak" ? 1 : strength === "fair" ? 2 : strength === "good" ? 3 : 4;
  const passwordsMatch = confirm.length > 0 && password === confirm;
  const sameAsOld = password.length > 0 && oldPassword.length > 0 && password === oldPassword;
  const allChecksPass = checks.length && checks.number && checks.upper && checks.special;

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError(false);

    if (sameAsOld) {
      setError(true);
      setMessage("Choose a password that is different from your current password.");
      return;
    }
    if (!allChecksPass) {
      setError(true);
      setMessage("Use a stronger password that meets every requirement.");
      return;
    }
    if (password !== confirm) {
      setError(true);
      setMessage("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          surface: "studio",
          old_password: oldPassword,
          password,
          cpassword: confirm
        })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(true);
        setMessage(typeof result.message === "string" ? result.message : "Unable to change the password.");
        return;
      }
      setOldPassword("");
      setPassword("");
      setConfirm("");
      setError(false);
      setMessage(typeof result.message === "string" ? result.message : "Your password has been changed.");
    } catch {
      setError(true);
      setMessage("Unable to change the password. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="ops-card ops-change-password-form" onSubmit={save}>
      <div className="ops-change-password-intro">
        <span className="ops-change-password-icon" aria-hidden="true">
          <Lock />
        </span>
        <div>
          <strong>Change Password</strong>
          <p>Choose a strong password to protect your account.</p>
        </div>
      </div>

      <label className="ops-profile-field">
        <span className="ops-profile-label">
          Old Password <span className="ops-profile-required" aria-hidden="true">*</span>
        </span>
        <span className="ops-change-password-input-wrap">
          <input
            type={showOld ? "text" : "password"}
            name="old_password"
            autoComplete="current-password"
            required
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            disabled={busy}
          />
          <button
            type="button"
            className="ops-change-password-eye"
            aria-label={showOld ? "Hide old password" : "Show old password"}
            onClick={() => setShowOld((value) => !value)}
          >
            {showOld ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        </span>
      </label>

      <label className="ops-profile-field">
        <span className="ops-profile-label">
          New Password <span className="ops-profile-required" aria-hidden="true">*</span>
        </span>
        <span className="ops-change-password-input-wrap">
          <input
            type={showNew ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={busy}
          />
          <button
            type="button"
            className="ops-change-password-eye"
            aria-label={showNew ? "Hide new password" : "Show new password"}
            onClick={() => setShowNew((value) => !value)}
          >
            {showNew ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        </span>
        {sameAsOld ? (
          <span className="ops-change-password-match is-error" role="alert">
            Choose a password that is different from your current password.
          </span>
        ) : null}
        {password ? (
          <div className="ops-change-password-strength" aria-live="polite">
            <div className="ops-change-password-strength-row">
              <div className="ops-change-password-strength-bars" aria-hidden="true">
                {[0, 1, 2, 3].map((index) => (
                  <span
                    key={index}
                    className={
                      index < filledSegments
                        ? `ops-change-password-strength-bar is-${strength}`
                        : "ops-change-password-strength-bar"
                    }
                  />
                ))}
              </div>
              <span className={`ops-change-password-strength-label is-${strength}`}>
                {strengthLabel[strength]}
              </span>
            </div>
            <ul className="ops-change-password-checklist">
              <li className={checks.length ? "is-pass" : undefined}>
                <Check aria-hidden="true" /> At least 8 characters
              </li>
              <li className={checks.number ? "is-pass" : undefined}>
                <Check aria-hidden="true" /> Includes a number
              </li>
              <li className={checks.upper ? "is-pass" : undefined}>
                <Check aria-hidden="true" /> Includes an uppercase letter
              </li>
              <li className={checks.special ? "is-pass" : undefined}>
                <Check aria-hidden="true" /> Includes a special character
              </li>
              <li className={!sameAsOld && password.length > 0 ? "is-pass" : undefined}>
                <Check aria-hidden="true" /> Different from current password
              </li>
            </ul>
          </div>
        ) : null}
      </label>

      <label className="ops-profile-field">
        <span className="ops-profile-label">
          Confirm New Password <span className="ops-profile-required" aria-hidden="true">*</span>
        </span>
        <span className="ops-change-password-input-wrap">
          <input
            type={showConfirm ? "text" : "password"}
            name="cpassword"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            disabled={busy}
          />
          <button
            type="button"
            className="ops-change-password-eye"
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            onClick={() => setShowConfirm((value) => !value)}
          >
            {showConfirm ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
        </span>
        {confirm ? (
          <span className={passwordsMatch ? "ops-change-password-match is-pass" : "ops-change-password-match"}>
            <Check aria-hidden="true" /> {passwordsMatch ? "Passwords match" : "Passwords do not match"}
          </span>
        ) : null}
      </label>

      <div className="ops-change-password-actions">
        <p
          role="status"
          className={error ? "ops-change-password-status is-error" : "ops-change-password-status"}
        >
          {message}
        </p>
        <Link href="/studio/profile" className="ops-change-password-cancel">
          Cancel
        </Link>
        <button type="submit" className="ops-profile-save" disabled={busy}>
          {busy ? "Saving…" : "Save Change"}
        </button>
      </div>
    </form>
  );
}
