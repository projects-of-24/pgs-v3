"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { requestStaffWorkspace } from "@/components/staff-workspace-request";
import {
  mergeDocumentsTracker,
  partitionDocumentsTracker,
  WYS_DEFAULT_DOCUMENT_LABELS,
  WYS_DEFAULT_FEEDBACK_ITEMS,
  WYS_DEFAULT_FEEDBACK_TITLE,
  WYS_DEFAULT_ONBOARDING,
  WYS_DEFAULT_SHORTLIST_LABELS
} from "@/features/student-feed/feed-where-you-stand-defaults";
import { crmStageLabel, type StudentCrmProfile } from "@/lib/operations-student-crm";
import type { PremiumWorkspace, PremiumWorkspaceProfile } from "@/lib/premium-workspace";
import { FEED_NOTES_MAX_LENGTH } from "@/lib/sanitize-feed-notes";
import styles from "./workspace-desk-dashboard-data.module.css";

type ChecklistRow = { text: string; checked: boolean };
type TrackerRow = { label: string; count: number; pending?: boolean };
type UniversityOption = { id: number; name: string };
type UniversitySelection = PremiumWorkspace["universities"][number];
type DashSubTab = "details" | "notes" | "stand" | "picks";
/** Desk task badge → stored as text prefix for #FEED cards. */
type TaskBadge = "" | "URGENT" | "IMP";
type TaskItem = { id: string; badge: TaskBadge; text: string };

const DASH_SUB_TABS: Array<{ id: DashSubTab; label: string }> = [
  { id: "details", label: "Details" },
  { id: "notes", label: "Mentor Notes" },
  { id: "stand", label: "Where You Stand" },
  { id: "picks", label: "Top Picks" }
];

type Props = {
  studentId: string;
  crm: StudentCrmProfile;
  canManage: boolean;
  premiumProfile: PremiumWorkspaceProfile | null;
  hasPremiumWorkspace: boolean;
  /** WS-FILL-4B — published CMS universities for Finalized assign. */
  universityOptions?: UniversityOption[];
  /** Current student university selections (all stages). */
  universitySelections?: UniversitySelection[];
  /** WS-FILL-3 Top Picks panel (or empty-state node). */
  topPicks?: ReactNode;
};

/**
 * WS-FILL-1 + WS-FILL-2 + WS-FILL-3 + WS-FILL-4 / 4B — Desk Dashboard Data.
 * Sub-tabs: Details (Preview + Quick) · Mentor Notes · Where You Stand · Top Picks.
 */
export function WorkspaceDeskDashboardData({
  studentId,
  crm,
  canManage,
  premiumProfile,
  hasPremiumWorkspace,
  universityOptions = [],
  universitySelections = [],
  topPicks = null
}: Props) {
  const [subTab, setSubTab] = useState<DashSubTab>("details");
  const [quickMessage, setQuickMessage] = useState("");
  const [notesMessage, setNotesMessage] = useState("");
  const [wysMessage, setWysMessage] = useState("");
  const [uniMessage, setUniMessage] = useState("");
  const [quickBusy, setQuickBusy] = useState(false);
  const [notesBusy, setNotesBusy] = useState(false);
  const [wysBusy, setWysBusy] = useState(false);
  const [uniBusy, setUniBusy] = useState(false);
  const [finalizeUniversityId, setFinalizeUniversityId] = useState("");
  const notesFromServer = typeof premiumProfile?.notes_html === "string" ? premiumProfile.notes_html : "";
  const [feedLiveNote, setFeedLiveNote] = useState(notesFromServer);
  /** Compose box — never primed from server (refresh stays empty after clear-on-save). */
  const [notesText, setNotesText] = useState("");

  const seeded = seedWysEditor(premiumProfile);
  const [onboardingPct, setOnboardingPct] = useState(
    seeded.onboardingPercentage == null ? "" : String(seeded.onboardingPercentage)
  );
  const [onboardingChecklist, setOnboardingChecklist] = useState<ChecklistRow[]>(seeded.onboardingChecklist);
  const [feedbackTitle, setFeedbackTitle] = useState(seeded.feedbackTitle);
  const [feedbackItems, setFeedbackItems] = useState<ChecklistRow[]>(seeded.feedbackItems);
  const [documents, setDocuments] = useState<TrackerRow[]>(seeded.documents);
  const [shortlist, setShortlist] = useState<TrackerRow[]>(seeded.shortlist);
  const [workingOnTasks, setWorkingOnTasks] = useState<TaskItem[]>(() =>
    parseStoredTasks(seeded.workingOn)
  );
  const [futureTasks, setFutureTasks] = useState<TaskItem[]>(() =>
    parseStoredTasks(seeded.futureTasks)
  );

  const tags = [
    crm.plan === "Premium" ? "#PurplePremium" : "#Standard",
    crm.stream ? `#${crm.stream}` : null,
    crm.targetYear ? `#${crm.targetYear}` : null,
    ...crm.tags.map((tag) => `#${tag.name}`)
  ].filter(Boolean) as string[];

  const finalizedSelections = universitySelections.filter((row) => row.stage === "finalized");
  const finalizeOptions = universityOptions.filter(
    (option) => !finalizedSelections.some((row) => row.universities?.id === option.id)
  );

  async function saveQuickDashboard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canManage || !hasPremiumWorkspace) return;
    setQuickBusy(true);
    setQuickMessage("Saving…");
    const data = new FormData(event.currentTarget);
    const tuitionRaw = String(data.get("tuition_receipt_uploaded") ?? "");
    const error = await requestStaffWorkspace(studentId, "profile", "PATCH", {
      universities_applied: Number(data.get("universities_applied") || 0),
      offers_received: Number(data.get("offers_received") || 0),
      visa_status: String(data.get("visa_status") || "not_applied"),
      tuition_receipt_uploaded: tuitionRaw === "" ? null : tuitionRaw === "true"
      // notes_html + WYS omitted — API leaves them alone
    });
    if (error) {
      setQuickBusy(false);
      setQuickMessage(error);
    }
  }

  async function saveMentorNotes(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canManage || !hasPremiumWorkspace) return;
    setNotesBusy(true);
    setNotesMessage("Saving…");
    const error = await requestStaffWorkspace(
      studentId,
      "profile",
      "PATCH",
      { notes_html: notesText },
      { reload: false }
    );
    setNotesBusy(false);
    if (error) {
      setNotesMessage(error);
      return;
    }
    setFeedLiveNote(notesText);
    setNotesText("");
    setNotesMessage("Notes saved. Box cleared — #FEED keeps the text above.");
  }

  async function saveWhereYouStand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canManage || !hasPremiumWorkspace) return;
    setWysBusy(true);
    setWysMessage("Saving…");
    const pctRaw = onboardingPct.trim();
    const onboarding_percentage = pctRaw === "" ? null : Number(pctRaw);
    if (pctRaw !== "" && (!Number.isSafeInteger(onboarding_percentage) || onboarding_percentage! < 0 || onboarding_percentage! > 100)) {
      setWysBusy(false);
      setWysMessage("Onboarding % must be a whole number from 0 to 100.");
      return;
    }
    const error = await requestStaffWorkspace(studentId, "profile", "PATCH", {
      onboarding_percentage,
      onboarding_checklist: onboardingChecklist.map((row) => ({
        text: row.text.trim(),
        checked: row.checked
      })).filter((row) => row.text),
      feedback_session_title: feedbackTitle.trim().slice(0, 180),
      feedback_session_items: feedbackItems.map((row) => ({
        text: row.text.trim(),
        checked: row.checked
      })).filter((row) => row.text),
      documents_tracker: mergeDocumentsTracker(documents, shortlist),
      currently_working_on: encodeTasks(workingOnTasks),
      future_tasks: encodeTasks(futureTasks)
    });
    if (error) {
      setWysBusy(false);
      setWysMessage(error);
    }
  }

  async function finalizeUniversity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canManage || !hasPremiumWorkspace || !finalizeUniversityId) return;
    const universityId = Number(finalizeUniversityId);
    if (!Number.isSafeInteger(universityId) || universityId <= 0) {
      setUniMessage("Choose a university.");
      return;
    }
    setUniBusy(true);
    setUniMessage("Saving…");
    const existing = universitySelections.find((row) => row.universities?.id === universityId);
    const error = existing
      ? await requestStaffWorkspace(studentId, "universities", "PATCH", {
          id: existing.id,
          stage: "finalized"
        })
      : await requestStaffWorkspace(studentId, "universities", "POST", {
          university_id: universityId,
          stage: "finalized"
        });
    if (error) {
      setUniBusy(false);
      setUniMessage(error);
      return;
    }
    setFinalizeUniversityId("");
  }

  async function removeFinalized(selectionId: string) {
    if (!canManage || !hasPremiumWorkspace) return;
    setUniBusy(true);
    setUniMessage("Removing…");
    const error = await requestStaffWorkspace(studentId, "universities", "DELETE", {
      id: selectionId
    });
    if (error) {
      setUniBusy(false);
      setUniMessage(error);
    }
  }

  return (
    <div className={styles.root} data-ws-body-scroll>
      <div className={styles.subTablist} role="tablist" aria-label="Dashboard Data sections">
        {DASH_SUB_TABS.map((item) => {
          const active = subTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`ws-dash-subtab-${item.id}`}
              className={active ? `${styles.subTab} ${styles.subTabActive}` : styles.subTab}
              aria-selected={active}
              aria-controls={`ws-dash-panel-${item.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSubTab(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="ws-dash-panel-details"
        role="tabpanel"
        aria-labelledby="ws-dash-subtab-details"
        hidden={subTab !== "details"}
        className={styles.subPanel}
      >
      <section className={styles.card} aria-labelledby="ws-fill-preview-heading">
        <div className={styles.cardHead}>
          <h2 id="ws-fill-preview-heading">Student Preview</h2>
          <span className={styles.badgeRead}>Read only</span>
        </div>
        <div className={styles.preview}>
          <div className={styles.avatar} aria-hidden="true">
            {initials(crm.fullName)}
          </div>
          <div className={styles.previewBody}>
            <strong className={styles.previewName}>{crm.fullName}</strong>
            <p className={styles.previewMeta}>
              {crm.pgsCode ? `PGS ${crm.pgsCode}` : "No PGS ID"} · {crm.plan} · Stage: {crmStageLabel(crm.stage)}
            </p>
            <p className={styles.previewMeta}>
              Mentor: {crm.mentorName}
              {crm.stream ? ` · Stream: ${crm.stream}` : ""}
              {crm.targetYear ? ` · Year: ${crm.targetYear}` : ""}
              {crm.preferredStudyCountry ? ` · ${crm.preferredStudyCountry}` : ""}
            </p>
            {tags.length ? (
              <ul className={styles.tags} aria-label="Student tags">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      <section className={styles.card} aria-labelledby="ws-fill-quick-heading">
        <div className={styles.cardHead}>
          <h2 id="ws-fill-quick-heading">Quick Dashboard</h2>
          <span className={styles.badgeFeed}>Feeds to #FEED</span>
        </div>
        {!hasPremiumWorkspace ? (
          <p className={styles.empty} role="status">
            Premium workspace is not open for this student yet. CRM preview above still works.
          </p>
        ) : (
          <form className={styles.quickForm} onSubmit={(event) => void saveQuickDashboard(event)}>
            <div className={styles.quickGrid}>
              <label className={styles.field}>
                <span>Uni Applied</span>
                <input
                  name="universities_applied"
                  type="number"
                  min={0}
                  defaultValue={premiumProfile?.universities_applied ?? 0}
                  disabled={!canManage || quickBusy}
                />
              </label>
              <label className={styles.field}>
                <span>Offers Received</span>
                <input
                  name="offers_received"
                  type="number"
                  min={0}
                  defaultValue={premiumProfile?.offers_received ?? 0}
                  disabled={!canManage || quickBusy}
                />
              </label>
              <label className={styles.field}>
                <span>Tuition Receipt Uploaded</span>
                <select
                  name="tuition_receipt_uploaded"
                  defaultValue={
                    premiumProfile?.tuition_receipt_uploaded == null
                      ? ""
                      : String(premiumProfile.tuition_receipt_uploaded)
                  }
                  disabled={!canManage || quickBusy}
                >
                  <option value="">Not set</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>Visa Applied</span>
                <select
                  name="visa_status"
                  defaultValue={premiumProfile?.visa_status || "not_applied"}
                  disabled={!canManage || quickBusy}
                >
                  <option value="not_applied">Not applied</option>
                  <option value="applied">Applied</option>
                </select>
              </label>
            </div>
            {canManage ? (
              <div className={styles.actions}>
                <button type="submit" disabled={quickBusy}>
                  {quickBusy ? "Saving…" : "Save Quick Dashboard"}
                </button>
                <span className={styles.status} role="status">
                  {quickMessage}
                </span>
              </div>
            ) : (
              <p className={styles.note} role="status">
                You can inspect these values. Mutations are disabled for your role.
              </p>
            )}
          </form>
        )}
      </section>
      </div>

      <div
        id="ws-dash-panel-notes"
        role="tabpanel"
        aria-labelledby="ws-dash-subtab-notes"
        hidden={subTab !== "notes"}
        className={styles.subPanel}
      >
      <section className={styles.card} aria-labelledby="ws-fill-notes-heading">
        <div className={styles.cardHead}>
          <h2 id="ws-fill-notes-heading">Mentor Notes</h2>
          <span className={styles.badgeFeed}>Student visible · #FEED</span>
        </div>
        {!hasPremiumWorkspace ? (
          <p className={styles.empty} role="status">
            Premium workspace required before Mentor Notes can feed the student #FEED.
          </p>
        ) : (
          <form className={styles.notesForm} onSubmit={(event) => void saveMentorNotes(event)}>
            <div className={styles.feedLiveNote} aria-label="Current note on student feed">
              <p className={styles.notesHint}>
                <strong>Currently on #FEED</strong>
                {feedLiveNote.trim() ? "" : " — empty (student sees default fixture until you save)."}
              </p>
              {feedLiveNote.trim() ? (
                <p className={styles.feedLiveNoteBody}>{feedLiveNote}</p>
              ) : null}
            </div>
            {canManage ? (
              <>
                <label className={styles.notesField}>
                  <span>Write a new note (replaces #FEED on Save)</span>
                  <textarea
                    name="notes_html"
                    rows={8}
                    maxLength={FEED_NOTES_MAX_LENGTH}
                    value={notesText}
                    onChange={(event) => setNotesText(event.target.value)}
                    disabled={notesBusy}
                    placeholder="Type here… Save updates #FEED, then this box clears. Refresh stays empty."
                  />
                </label>
                <p className={styles.notesHint}>
                  Plain text only (max {FEED_NOTES_MAX_LENGTH.toLocaleString()} characters). Choose → Save →
                  box clears; repeat to replace again.
                </p>
                <div className={styles.actions}>
                  <button type="submit" disabled={notesBusy || !notesText.trim()}>
                    {notesBusy ? "Saving…" : "Save Notes"}
                  </button>
                  <span className={styles.status} role="status">
                    {notesMessage}
                  </span>
                </div>
              </>
            ) : (
              <p className={styles.note} role="status">
                You can read the live #FEED note above. Mutations are disabled for your role.
              </p>
            )}
          </form>
        )}
      </section>
      </div>

      <div
        id="ws-dash-panel-stand"
        role="tabpanel"
        aria-labelledby="ws-dash-subtab-stand"
        hidden={subTab !== "stand"}
        className={styles.subPanel}
      >
      <section className={styles.card} aria-labelledby="ws-fill-stand-heading">
        <div className={styles.cardHead}>
          <h2 id="ws-fill-stand-heading">Where You Stand</h2>
          <span className={styles.badgeFeed}>Feeds to #FEED · Prep</span>
        </div>
        {!hasPremiumWorkspace ? (
          <p className={styles.empty} role="status">
            Premium workspace required before Where You Stand can feed the student #FEED.
          </p>
        ) : (
          <form className={styles.wysForm} onSubmit={(event) => void saveWhereYouStand(event)}>
            <p className={styles.notesHint}>
              Mentor fills Prep cards + task lists below. Finalized Uni List is a separate control under
              this card (CMS universities). Campus image comes from that university’s CMS logo — set it
              under CMS → Universities if missing.
            </p>

            <label className={styles.field}>
              <span>Onboarding % (0–100)</span>
              <input
                type="number"
                min={0}
                max={100}
                value={onboardingPct}
                onChange={(event) => setOnboardingPct(event.target.value)}
                disabled={!canManage || wysBusy}
                inputMode="numeric"
              />
            </label>

            <fieldset className={styles.wysFieldset}>
              <legend>Onboarding Checklist</legend>
              <ul className={styles.wysCheckList}>
                {onboardingChecklist.map((row, index) => (
                  <li key={`onb-${index}`}>
                    <label className={styles.wysCheckRow}>
                      <input
                        type="checkbox"
                        checked={row.checked}
                        disabled={!canManage || wysBusy}
                        onChange={(event) => {
                          const next = [...onboardingChecklist];
                          next[index] = { ...row, checked: event.target.checked };
                          setOnboardingChecklist(next);
                        }}
                      />
                      <span>{row.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <label className={styles.field}>
              <span>Feedback session title</span>
              <input
                type="text"
                maxLength={180}
                value={feedbackTitle}
                onChange={(event) => setFeedbackTitle(event.target.value)}
                disabled={!canManage || wysBusy}
              />
            </label>

            <fieldset className={styles.wysFieldset}>
              <legend>Feedback session items</legend>
              <ul className={styles.wysCheckList}>
                {feedbackItems.map((row, index) => (
                  <li key={`fb-${index}`}>
                    <label className={styles.wysCheckRow}>
                      <input
                        type="checkbox"
                        checked={row.checked}
                        disabled={!canManage || wysBusy}
                        onChange={(event) => {
                          const next = [...feedbackItems];
                          next[index] = { ...row, checked: event.target.checked };
                          setFeedbackItems(next);
                        }}
                      />
                      <span>{row.text}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className={styles.wysFieldset}>
              <legend>Documents Tracker</legend>
              <ul className={styles.wysTrackerList}>
                {documents.map((row, index) => (
                  <li key={`doc-${row.label}`} className={styles.wysTrackerRow}>
                    <span className={styles.wysTrackerLabel}>{row.label}</span>
                    <label className={styles.wysTrackerCount}>
                      <span className={styles.srOnly}>Count for {row.label}</span>
                      <input
                        type="number"
                        min={0}
                        max={99}
                        value={row.count}
                        disabled={!canManage || wysBusy}
                        onChange={(event) => {
                          const next = [...documents];
                          next[index] = { ...row, count: Number(event.target.value) || 0 };
                          setDocuments(next);
                        }}
                      />
                    </label>
                    <label className={styles.wysPending}>
                      <input
                        type="checkbox"
                        checked={row.pending === true}
                        disabled={!canManage || wysBusy}
                        onChange={(event) => {
                          const next = [...documents];
                          next[index] = { ...row, pending: event.target.checked };
                          setDocuments(next);
                        }}
                      />
                      <span>Red / pending</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <fieldset className={styles.wysFieldset}>
              <legend>Uni Shortlist counts</legend>
              <ul className={styles.wysTrackerList}>
                {shortlist.map((row, index) => (
                  <li key={`sl-${row.label}`} className={styles.wysTrackerRow}>
                    <span className={styles.wysTrackerLabel}>{row.label}</span>
                    <label className={styles.wysTrackerCount}>
                      <span className={styles.srOnly}>Count for {row.label}</span>
                      <input
                        type="number"
                        min={0}
                        max={99}
                        value={row.count}
                        disabled={!canManage || wysBusy}
                        onChange={(event) => {
                          const next = [...shortlist];
                          next[index] = { ...row, count: Number(event.target.value) || 0 };
                          setShortlist(next);
                        }}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>

            <WysTaskListEditor
              title="Currently working on"
              hint="Pick a type, type the task, click Add. Each row = one #FEED card."
              items={workingOnTasks}
              onChange={setWorkingOnTasks}
              canManage={canManage}
              busy={wysBusy}
            />

            <WysTaskListEditor
              title="Future tasks"
              hint="Same as above — use URGENT or IMP when the student should see a red badge."
              items={futureTasks}
              onChange={setFutureTasks}
              canManage={canManage}
              busy={wysBusy}
            />

            {canManage ? (
              <div className={styles.actions}>
                <button type="submit" disabled={wysBusy}>
                  {wysBusy ? "Saving…" : "Save Where You Stand"}
                </button>
                <span className={styles.status} role="status">
                  {wysMessage}
                </span>
              </div>
            ) : (
              <p className={styles.note} role="status">
                You can inspect these values. Mutations are disabled for your role.
              </p>
            )}
          </form>
        )}

        {hasPremiumWorkspace ? (
          <div className={styles.wysFinalized}>
            <h3 className={styles.wysFinalizedTitle}>Finalized Uni List</h3>
            <p className={styles.notesHint}>
              Pick a published CMS university → Finalize. Student #FEED shows name + CMS campus image
              (fixture image if the university has no logo yet).
            </p>
            {canManage ? (
              <form className={styles.assignRow} onSubmit={(event) => void finalizeUniversity(event)}>
                <label className={styles.assignSelectWrap}>
                  <span className={styles.srOnly}>University to finalize</span>
                  <select
                    className={styles.assignSelect}
                    value={finalizeUniversityId}
                    onChange={(event) => setFinalizeUniversityId(event.target.value)}
                    disabled={uniBusy || !finalizeOptions.length}
                  >
                    <option value="">
                      {finalizeOptions.length ? "Choose university…" : "No more universities to add"}
                    </option>
                    {finalizeOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className={styles.assignButton}
                  disabled={uniBusy || !finalizeUniversityId}
                >
                  {uniBusy ? "Saving…" : "Finalize"}
                </button>
              </form>
            ) : null}
            {finalizedSelections.length ? (
              <ul className={styles.picksList} aria-label="Finalized universities">
                {finalizedSelections.map((selection) => (
                  <li key={selection.id} className={styles.picksItem}>
                    <div className={styles.picksCopy}>
                      <p className={styles.picksTitle}>
                        {selection.universities?.name ?? "University"}
                      </p>
                      <p className={styles.notesHint}>stage: finalized</p>
                    </div>
                    {canManage ? (
                      <button
                        type="button"
                        className={styles.picksRemove}
                        disabled={uniBusy}
                        onClick={() => void removeFinalized(selection.id)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty} role="status">
                No universities finalized yet — student #FEED shows 00 until you Finalize one.
              </p>
            )}
            {uniMessage ? (
              <p className={styles.status} role="status">
                {uniMessage}
              </p>
            ) : null}
            {!canManage ? (
              <p className={styles.note} role="status">
                You can inspect finalized universities. Mutations are disabled for your role.
              </p>
            ) : null}
          </div>
        ) : null}
      </section>
      </div>

      <div
        id="ws-dash-panel-picks"
        role="tabpanel"
        aria-labelledby="ws-dash-subtab-picks"
        hidden={subTab !== "picks"}
        className={styles.subPanel}
      >
        {topPicks}
      </div>
    </div>
  );
}

let taskIdSeq = 0;
function nextTaskId(): string {
  taskIdSeq += 1;
  return `wys-task-${taskIdSeq}-${Date.now()}`;
}

function parseStoredTasks(stored: readonly string[]): TaskItem[] {
  const out: TaskItem[] = [];
  for (const raw of stored) {
    for (const part of String(raw).split(/\r?\n/)) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      const match = /^(?:\[?(URGENT|IMP|IMPORTANT)\]?\s*[:|–-]?\s*)(.+)$/i.exec(trimmed);
      if (match) {
        const kind = match[1].toUpperCase();
        out.push({
          id: nextTaskId(),
          badge: kind === "URGENT" ? "URGENT" : "IMP",
          text: match[2].trim() || trimmed
        });
      } else {
        out.push({ id: nextTaskId(), badge: "", text: trimmed });
      }
    }
  }
  return out.slice(0, 30);
}

function encodeTasks(items: readonly TaskItem[]): string[] {
  return items
    .map((item) => {
      const text = item.text.trim();
      if (!text) return "";
      if (item.badge === "URGENT") return `URGENT ${text}`;
      if (item.badge === "IMP") return `IMP ${text}`;
      return text;
    })
    .filter(Boolean)
    .slice(0, 30);
}

type WysTaskListEditorProps = {
  title: string;
  hint: string;
  items: TaskItem[];
  onChange: (next: TaskItem[]) => void;
  canManage: boolean;
  busy: boolean;
};

function WysTaskListEditor({
  title,
  hint,
  items,
  onChange,
  canManage,
  busy
}: WysTaskListEditorProps) {
  const baseId = useId();
  const [badge, setBadge] = useState<TaskBadge>("");
  const [draft, setDraft] = useState("");

  function addTask() {
    const text = draft.trim();
    if (!text || items.length >= 30) return;
    onChange([...items, { id: nextTaskId(), badge, text }]);
    setDraft("");
    setBadge("");
  }

  return (
    <fieldset className={styles.wysFieldset} disabled={!canManage || busy}>
      <legend>{title}</legend>
      <p className={styles.notesHint}>{hint}</p>

      {items.length ? (
        <ul className={styles.wysTaskList} aria-label={title}>
          {items.map((item) => (
            <li key={item.id} className={styles.wysTaskItem}>
              <div className={styles.wysTaskCopy}>
                {item.badge ? (
                  <span className={styles.wysTaskBadge}>{item.badge}</span>
                ) : null}
                <span className={styles.wysTaskText}>{item.text}</span>
              </div>
              {canManage ? (
                <button
                  type="button"
                  className={styles.picksRemove}
                  disabled={busy}
                  onClick={() => onChange(items.filter((row) => row.id !== item.id))}
                >
                  Remove
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty} role="status">
          No tasks yet — add one below.
        </p>
      )}

      {canManage ? (
        <div className={styles.wysTaskAdd}>
          <label className={styles.wysTaskType} htmlFor={`${baseId}-type`}>
            <span>Type</span>
            <select
              id={`${baseId}-type`}
              value={badge}
              onChange={(event) => setBadge(event.target.value as TaskBadge)}
              disabled={busy}
            >
              <option value="">None</option>
              <option value="URGENT">URGENT</option>
              <option value="IMP">IMP</option>
            </select>
          </label>
          <label className={styles.wysTaskDraft} htmlFor={`${baseId}-text`}>
            <span className={styles.srOnly}>Task text</span>
            <input
              id={`${baseId}-text`}
              type="text"
              maxLength={255}
              value={draft}
              placeholder="Task text…"
              disabled={busy || items.length >= 30}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addTask();
                }
              }}
            />
          </label>
          <button
            type="button"
            className={styles.assignButton}
            disabled={busy || !draft.trim() || items.length >= 30}
            onClick={addTask}
          >
            Add
          </button>
        </div>
      ) : null}
    </fieldset>
  );
}

function seedChecklist(
  stored: ChecklistRow[] | undefined,
  defaults: readonly string[]
): ChecklistRow[] {
  if (stored?.length) {
    return stored.map((row) => ({ text: row.text, checked: row.checked === true }));
  }
  return defaults.map((text) => ({ text, checked: false }));
}

function seedTrackerRows(
  stored: TrackerRow[],
  defaults: readonly string[],
  pendingLabel?: string
): TrackerRow[] {
  const defaultSet = new Set<string>(defaults);
  if (stored.length) {
    const byLabel = new Map(stored.map((row) => [row.label, row]));
    const ordered = defaults.map((label) => {
      const existing = byLabel.get(label);
      if (existing) return existing;
      return { label, count: 0, pending: pendingLabel === label };
    });
    for (const row of stored) {
      if (!defaultSet.has(row.label)) ordered.push(row);
    }
    return ordered;
  }
  return defaults.map((label) => ({
    label,
    count: 0,
    pending: pendingLabel === label
  }));
}

function seedWysEditor(premiumProfile: PremiumWorkspaceProfile | null) {
  const partitioned = partitionDocumentsTracker(premiumProfile?.documents_tracker);
  return {
    onboardingPercentage: premiumProfile?.onboarding_percentage ?? null,
    onboardingChecklist: seedChecklist(premiumProfile?.onboarding_checklist, WYS_DEFAULT_ONBOARDING),
    feedbackTitle:
      premiumProfile?.feedback_session_title?.trim() || WYS_DEFAULT_FEEDBACK_TITLE,
    feedbackItems: seedChecklist(premiumProfile?.feedback_session_items, WYS_DEFAULT_FEEDBACK_ITEMS),
    documents: seedTrackerRows(partitioned.documents, WYS_DEFAULT_DOCUMENT_LABELS, "Pending Documents*"),
    shortlist: seedTrackerRows(partitioned.shortlist, WYS_DEFAULT_SHORTLIST_LABELS),
    workingOn: premiumProfile?.currently_working_on ?? [],
    futureTasks: premiumProfile?.future_tasks ?? []
  };
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
