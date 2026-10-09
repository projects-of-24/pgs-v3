"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { OpsProfileWebcamCapture } from "@/components/ops-profile-webcam-capture";

function statusLabel(status: string): string {
  if (status === "active") return "Active";
  if (status === "suspended") return "Suspended";
  if (status === "ended") return "Ended";
  return status;
}

export function AdminProfileForm({
  displayName,
  email,
  avatarUrl = null,
  roleLabel,
  status
}: {
  displayName: string;
  email: string;
  avatarUrl?: string | null;
  roleLabel: string;
  status: string;
}) {
  const router = useRouter();
  const pickerId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setPreviewUrl(avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    if (!pickerOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setPickerOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPickerOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pickerOpen]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function onFilePicked(file: File | undefined) {
    if (!file) return;
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPickerOpen(false);
    setMessage("");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const data = new FormData(event.currentTarget);

    try {
      if (pendingFile) {
        const upload = new FormData();
        upload.set("avatar", pendingFile);
        const avatarResponse = await fetch("/api/admin/avatar", { method: "POST", body: upload });
        const avatarResult = await avatarResponse.json().catch(() => ({}));
        if (!avatarResponse.ok) {
          setMessage(
            typeof avatarResult.message === "string"
              ? avatarResult.message
              : "Unable to upload image."
          );
          setBusy(false);
          return;
        }
      }

      const response = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ display_name: data.get("display_name") })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        setMessage(
          typeof result.message === "string"
            ? result.message
            : pendingFile
              ? "Photo uploaded, but the display name could not be saved."
              : "Unable to save."
        );
        setBusy(false);
        return;
      }

      setPendingFile(null);
      setMessage("Profile updated.");
      router.refresh();
    } catch {
      setMessage("Unable to save the profile right now.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="ops-card ops-profile-form" onSubmit={save}>
      <div className="ops-profile-hero">
        <div ref={rootRef} className="ops-profile-avatar-wrap">
          <div className="ops-profile-avatar-frame" aria-hidden={previewUrl ? undefined : true}>
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- local preview + signed URLs
              <img src={previewUrl} alt="" className="ops-profile-avatar-image" />
            ) : (
              <span className="ops-profile-avatar-fallback">
                {displayName.slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          <button
            type="button"
            className="ops-profile-avatar-camera"
            aria-label="Change profile photo"
            aria-haspopup="menu"
            aria-expanded={pickerOpen}
            aria-controls={pickerId}
            disabled={busy}
            onClick={() => setPickerOpen((open) => !open)}
          >
            <Camera aria-hidden="true" />
          </button>
          {pickerOpen ? (
            <div id={pickerId} role="menu" aria-label="Profile photo source" className="ops-profile-photo-menu">
              <button
                type="button"
                role="menuitem"
                className="ops-profile-photo-menu-item"
                onClick={() => {
                  setPickerOpen(false);
                  setWebcamOpen(true);
                }}
              >
                Take photo
              </button>
              <button
                type="button"
                role="menuitem"
                className="ops-profile-photo-menu-item"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose from files
              </button>
            </div>
          ) : null}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="ops-profile-file-input"
            tabIndex={-1}
            onChange={(event) => {
              onFilePicked(event.target.files?.[0]);
              event.currentTarget.value = "";
            }}
          />
        </div>
        <div className="ops-profile-avatar-meta">
          <strong>{displayName}</strong>
          <span>{email}</span>
          <div className="ops-profile-pills">
            <span className="ops-profile-pill ops-profile-pill-role">{roleLabel}</span>
            <span className="ops-profile-pill ops-profile-pill-status">{statusLabel(status)}</span>
          </div>
        </div>
      </div>

      <div className="ops-profile-grid">
        <label className="ops-profile-field">
          <span className="ops-profile-label">
            Display Name <span className="ops-profile-required" aria-hidden="true">
              *
            </span>
          </span>
          <input
            name="display_name"
            required
            defaultValue={displayName}
            maxLength={255}
            disabled={busy}
          />
        </label>

        <label className="ops-profile-field">
          <span className="ops-profile-label">
            Email Address <span className="ops-profile-required" aria-hidden="true">
              *
            </span>
          </span>
          <input value={email} readOnly className="ops-profile-input-readonly" />
          <span className="ops-profile-field-hint">Email cannot be changed.</span>
        </label>
      </div>

      <div className="ops-profile-actions">
        <p role="status" className="ops-profile-status">
          {message}
        </p>
        <button type="submit" className="ops-profile-save" disabled={busy}>
          {busy ? "Saving…" : "Save Changes"}
        </button>
      </div>

      <OpsProfileWebcamCapture
        open={webcamOpen}
        onClose={() => setWebcamOpen(false)}
        onCapture={onFilePicked}
      />
    </form>
  );
}
