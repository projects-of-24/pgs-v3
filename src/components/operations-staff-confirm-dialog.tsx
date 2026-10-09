"use client";

import { useState } from "react";
import { Info, Mail, Send, UserRoundPlus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OperationsStaffAccessSummary } from "@/components/operations-staff-access-summary";
import {
  isPrivilegeBroadening,
  normalizeStaffEmail,
  privilegeBroadeningWarning,
  type StaffDirectoryRole,
  type StaffSurfaceAccess
} from "@/lib/operations-staff-access";

export function OperationsStaffConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  beforeAccess,
  afterAccess,
  warning,
  confirmLabel,
  destructive = false,
  requireEmail,
  currentEmail,
  previousRole,
  nextRole,
  pending,
  error,
  onConfirm,
  variant = "default"
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  beforeAccess?: StaffSurfaceAccess;
  afterAccess?: StaffSurfaceAccess;
  warning?: string;
  confirmLabel: string;
  destructive?: boolean;
  requireEmail?: boolean;
  currentEmail?: string | null;
  previousRole?: string | null;
  nextRole?: StaffDirectoryRole;
  pending?: boolean;
  error?: string;
  onConfirm: () => void;
  variant?: "default" | "confirm1";
}) {
  const [typedEmail, setTypedEmail] = useState("");
  const needsTypedEmail = Boolean(
    requireEmail || (nextRole && isPrivilegeBroadening(previousRole ?? null, nextRole))
  );
  const emailMatches =
    !needsTypedEmail ||
    (currentEmail && normalizeStaffEmail(typedEmail) === normalizeStaffEmail(currentEmail));
  const showAccess = variant !== "confirm1";
  const broadeningCopy =
    nextRole && isPrivilegeBroadening(previousRole ?? null, nextRole)
      ? privilegeBroadeningWarning(previousRole ?? null, nextRole)
      : null;

  if (variant === "confirm1") {
    return (
      <AlertDialog
        open={open}
        onOpenChange={(next) => {
          if (!next) setTypedEmail("");
          onOpenChange(next);
        }}
      >
        <AlertDialogContent className="ops-confirm1-dialog">
          <button
            type="button"
            className="ops-confirm1-close"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
          >
            <X aria-hidden="true" />
          </button>

          <AlertDialogHeader className="ops-confirm1-header">
            <span className="ops-confirm1-hero" aria-hidden="true">
              <UserRoundPlus />
            </span>
            <AlertDialogTitle className="ops-confirm1-title">{title}</AlertDialogTitle>
            <AlertDialogDescription className="ops-confirm1-desc">{description}</AlertDialogDescription>
          </AlertDialogHeader>

          {warning ? (
            <div className="ops-confirm1-info" role="status">
              <Info aria-hidden="true" />
              <p>{warning}</p>
            </div>
          ) : null}

          {broadeningCopy ? (
            <div className="ops-confirm1-info" role="status">
              <Info aria-hidden="true" />
              <div>
                <p>{broadeningCopy.replace(/\s*Confirm by typing this staff member[’']s email\.?$/i, "")}</p>
                {needsTypedEmail ? (
                  <p className="ops-confirm1-info-sub">Confirm by typing this staff member&apos;s email.</p>
                ) : null}
              </div>
            </div>
          ) : null}

          {needsTypedEmail ? (
            <label className="ops-confirm1-field">
              <span>Type this staff member&apos;s email to confirm</span>
              <span className="ops-confirm1-input-wrap">
                <Mail aria-hidden="true" />
                <input
                  autoComplete="off"
                  className="ops-confirm1-input"
                  name="confirmation_email"
                  placeholder="Enter staff member's email address"
                  type="email"
                  value={typedEmail}
                  onChange={(event) => setTypedEmail(event.target.value)}
                />
              </span>
            </label>
          ) : null}

          {error ? (
            <p className="ops-confirm1-error" role="alert">
              {error}
            </p>
          ) : null}

          <AlertDialogFooter className="ops-confirm1-footer">
            <AlertDialogCancel className="ops-confirm1-cancel">Cancel</AlertDialogCancel>
            <button
              type="button"
              className="ops-confirm1-send"
              disabled={pending || !emailMatches}
              onClick={onConfirm}
            >
              <Send aria-hidden="true" />
              {confirmLabel}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setTypedEmail("");
        onOpenChange(next);
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {showAccess && beforeAccess ? (
          <OperationsStaffAccessSummary access={beforeAccess} heading="Current access" />
        ) : null}
        {showAccess && afterAccess ? (
          <OperationsStaffAccessSummary access={afterAccess} heading="Access after this change" />
        ) : null}
        {warning ? (
          <p className="ops-team-warning" role="status">
            {warning}
          </p>
        ) : null}
        {broadeningCopy ? (
          <p className="ops-team-warning" role="status">
            {broadeningCopy}
          </p>
        ) : null}
        {needsTypedEmail ? (
          <label className="ops-team-field">
            <span>Type this staff member’s email to confirm</span>
            <Input
              autoComplete="off"
              name="confirmation_email"
              type="email"
              value={typedEmail}
              onChange={(event) => setTypedEmail(event.target.value)}
            />
          </label>
        ) : null}
        {error ? (
          <p className="ops-team-error" role="alert">
            {error}
          </p>
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel className="ops:inline-flex ops:h-11 ops:items-center ops:justify-center ops:rounded-md ops:border ops:border-border ops:bg-card ops:px-4 ops:text-sm ops:font-medium">
            Cancel
          </AlertDialogCancel>
          <Button
            className={destructive ? "ops-team-destructive" : undefined}
            disabled={pending || !emailMatches}
            onClick={onConfirm}
            type="button"
          >
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
