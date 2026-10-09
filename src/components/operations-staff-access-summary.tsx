import { Shield } from "lucide-react";
import {
  staffStudentScopeLabel,
  type StaffSurfaceAccess
} from "@/lib/operations-staff-access";

function pillClass(value: string): string {
  const normalized = value.toLowerCase();
  if (normalized === "allowed" || normalized === "yes") return "ops-invite1-pill ops-invite1-pill--ok";
  if (normalized === "not granted" || normalized === "no" || normalized === "none") {
    return "ops-invite1-pill ops-invite1-pill--deny";
  }
  return "ops-invite1-pill ops-invite1-pill--info";
}

export function OperationsStaffAccessSummary({
  access,
  heading = "Effective access",
  variant = "default"
}: {
  access: StaffSurfaceAccess;
  heading?: string;
  variant?: "default" | "invite1";
}) {
  const rows = [
    ["Operations", access.operations],
    ["Student scope", access.studentScope || staffStudentScopeLabel("read_only_staff")],
    ["CMS", access.cms],
    ["Audit", access.audit],
    ["Staff management", access.staffManagement]
  ] as const;

  if (variant === "invite1") {
    return (
      <section className="ops-invite1-summary" aria-label={heading}>
        <header className="ops-invite1-summary-head">
          <span className="ops-invite1-summary-icon" aria-hidden="true">
            <Shield />
          </span>
          <h2>{heading}</h2>
        </header>
        <dl className="ops-invite1-summary-list">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                <span className={pillClass(value)}>{value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  return (
    <section className="ops-team-summary" aria-label={heading}>
      <h2>{heading}</h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
