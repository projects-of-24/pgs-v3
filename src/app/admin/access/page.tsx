import Link from "next/link";
import {
  StaffAccessControls,
  type AssignmentHistoryItem,
  type PremiumHistoryItem
} from "@/components/staff-access-controls";
import { humanFacingName, identityLabel, resolveIdentityLabels } from "@/lib/identity-labels";
import { requireStaffPermission } from "@/lib/staff-auth";
import { redirectMentorPreviewAwayFromPrivilegedPages } from "@/lib/staff-preview-server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function formatWhen(value: string): string {
  return new Date(value).toLocaleString("en-GB");
}

export default async function AccessPage() {
  await redirectMentorPreviewAwayFromPrivilegedPages();
  await requireStaffPermission("premium.manage");
  const supabase = await createSupabaseServerClient();
  const [{ data: profiles }, { data: handlers }, { data: plans }, { data: events }, { data: assignments }] =
    await Promise.all([
      supabase.from("profiles").select("id,full_name").order("full_name"),
      supabase.rpc("staff_registry_mentor_options"),
      supabase.from("premium_plans").select("code,label,duration_months").eq("is_active", true).order("sort_order"),
      supabase
        .from("premium_entitlement_events")
        .select(
          "id,student_id,resulting_status,source,actor_id,reason,occurred_at,plan_code,duration_months,starts_at,ends_at"
        )
        .order("occurred_at", { ascending: false })
        .limit(100),
      supabase
        .from("mentor_assignments")
        .select("id,student_id,mentor_id,status,assigned_at,ended_at,reason")
        .order("assigned_at", { ascending: false })
        .limit(100)
    ]);

  const handlerRows = (handlers ?? []) as Array<{ id: string; display_name: string | null }>;
  const ids = [
    ...(profiles ?? []).map((profile) => profile.id),
    ...handlerRows.map((handler) => handler.id),
    ...(events ?? []).flatMap((event) => [event.student_id, event.actor_id]),
    ...(assignments ?? []).flatMap((assignment) => [assignment.student_id, assignment.mentor_id])
  ];
  const labels = await resolveIdentityLabels(ids);

  const premiumHistory: PremiumHistoryItem[] = (events ?? []).map((event) => ({
    id: event.id,
    status: event.resulting_status,
    title: `${event.source.replaceAll("_", " ")} · ${event.plan_code?.replaceAll("_", " ") ?? "legacy period"}`,
    studentLabel: identityLabel(labels, event.student_id),
    actorLabel: event.actor_id ? identityLabel(labels, event.actor_id) : null,
    rangeLabel:
      event.starts_at && event.ends_at
        ? `${formatWhen(event.starts_at)} → ${formatWhen(event.ends_at)} · ${event.duration_months} calendar month${
            event.duration_months === 1 ? "" : "s"
          }`
        : null,
    occurredLabel: formatWhen(event.occurred_at),
    reason: event.reason || "No reason supplied"
  }));

  const assignmentHistory: AssignmentHistoryItem[] = (assignments ?? []).map((assignment) => ({
    id: assignment.id,
    status: assignment.status,
    mentorLabel: identityLabel(labels, assignment.mentor_id),
    studentLabel: identityLabel(labels, assignment.student_id),
    occurredLabel: formatWhen(assignment.assigned_at),
    reason: assignment.reason || "No reason supplied"
  }));

  return (
    <div className="ops-acc-page" data-ops-acc-pass="acc1">
      <header className="ops-acc-page-header">
        <nav className="ops-acc-breadcrumb" aria-label="Breadcrumb">
          <Link href="/ops/students">Students</Link>
          <span className="ops-acc-breadcrumb-sep" aria-hidden="true">
            /
          </span>
          <span aria-current="page">Access</span>
        </nav>
        <Link className="ops-acc-back" href="/ops/students">
          ← Back to Students
        </Link>
        <h1>Premium plans and mentor assignments</h1>
        <p>
          Premium is a time-bounded entitlement. A new grant starts immediately at its authoritative server approval
          time; every action and expiry is audited.
        </p>
      </header>

      <StaffAccessControls
        students={(profiles ?? []).map((profile) => ({
          id: profile.id,
          label: humanFacingName(profile.full_name, "Student")
        }))}
        mentors={handlerRows.map((handler) => ({
          id: handler.id,
          label: humanFacingName(handler.display_name, "Staff")
        }))}
        plans={(plans ?? []).map((plan) => ({
          code: plan.code,
          label: plan.label,
          durationMonths: plan.duration_months
        }))}
        premiumHistory={premiumHistory}
        assignmentHistory={assignmentHistory}
      />
    </div>
  );
}
