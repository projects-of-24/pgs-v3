"use client";

import { useEffect, useId, useRef, useState } from "react";

type OpsProfileWebcamCaptureProps = {
  open: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
};

export function OpsProfileWebcamCapture({ open, onClose, onCapture }: OpsProfileWebcamCaptureProps) {
  const titleId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const onCloseRef = useRef(onClose);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function startCamera() {
      setError("");
      setStarting(true);
      if (!navigator.mediaDevices?.getUserMedia) {
        setError("This browser cannot open the camera. Use Choose from files instead.");
        setStarting(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        if (cancelled) {
          for (const track of stream.getTracks()) track.stop();
          return;
        }
        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play().catch(() => undefined);
        }
      } catch {
        if (!cancelled) {
          setError("Camera permission denied or unavailable. Use Choose from files instead.");
        }
      } finally {
        if (!cancelled) setStarting(false);
      }
    }

    void startCamera();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }
    document.addEventListener("keydown", onKeyDown);

    const videoEl = videoRef.current;
    return () => {
      cancelled = true;
      document.removeEventListener("keydown", onKeyDown);
      const stream = streamRef.current;
      streamRef.current = null;
      if (stream) {
        for (const track of stream.getTracks()) track.stop();
      }
      if (videoEl) videoEl.srcObject = null;
    };
  }, [open]);

  if (!open) return null;

  function capture() {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      setError("Wait for the camera preview, then capture again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      setError("Unable to capture this frame.");
      return;
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Unable to capture this frame.");
          return;
        }
        onCapture(new File([blob], `staff-avatar-${Date.now()}.jpg`, { type: "image/jpeg" }));
        onClose();
      },
      "image/jpeg",
      0.92
    );
  }

  return (
    <div
      className="ops-profile-webcam-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="ops-profile-webcam-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId}>Take photo</h2>
        <p className="ops-profile-webcam-copy">Use your webcam to capture a profile photo.</p>

        <div className="ops-profile-webcam-stage">
          <video ref={videoRef} className="ops-profile-webcam-video" playsInline muted autoPlay />
          {starting ? <p className="ops-profile-webcam-status">Starting camera…</p> : null}
        </div>

        {error ? (
          <p className="ops-profile-webcam-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="ops-profile-webcam-actions">
          <button type="button" className="ops-profile-webcam-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="ops-profile-webcam-primary"
            onClick={capture}
            disabled={Boolean(error) || starting}
          >
            Capture photo
          </button>
        </div>
      </div>
    </div>
  );
}
