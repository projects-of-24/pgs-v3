/**
 * FTP-B7b — Mentor Assigns: Tips + Resource tabs with live Save.
 * Shared pack for all Premium students.
 */
"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type {
  MentorResourceRow,
  MentorTipRow
} from "@/features/workspace-mentor-assigns/load-mentor-assigns";
import styles from "./workspace-mentor-assigns.module.css";

type Tab = "tips" | "resource";

type TipDraft = { id: string; label: string; body: string };
type ResourceDraft = { id: string; label: string; url: string };

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function WorkspaceMentorAssigns({
  initialTips,
  initialResources,
  wired
}: {
  initialTips: readonly MentorTipRow[];
  initialResources: readonly MentorResourceRow[];
  wired: boolean;
}) {
  const [tab, setTab] = useState<Tab>("tips");
  const [tips, setTips] = useState<TipDraft[]>(() =>
    initialTips.map((row) => ({ id: row.id, label: row.label, body: row.body }))
  );
  const [resources, setResources] = useState<ResourceDraft[]>(() =>
    initialResources.map((row) => ({ id: row.id, label: row.label, url: row.url }))
  );
  const [message, setMessage] = useState(
    wired ? "" : "DB not applied — run migration 20261009120000_ftp_b7b_progress_tips_resources.sql"
  );
  const [saving, setSaving] = useState(false);

  async function saveTips() {
    if (!wired) {
      setMessage("Apply the FTP-B7b migration before saving.");
      return;
    }
    setSaving(true);
    setMessage("Saving tips…");
    try {
      const response = await fetch("/api/staff/mentor-assigns/tips", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tips: tips.map((tip) => ({ label: tip.label, body: tip.body }))
        })
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setMessage(result.message ?? "Unable to save tips.");
        return;
      }
      const reload = await fetch("/api/staff/mentor-assigns/tips");
      const payload = (await reload.json()) as {
        tips?: Array<{ id: string; label: string; body: string }>;
      };
      if (reload.ok && payload.tips) {
        setTips(payload.tips.map((row) => ({ id: row.id, label: row.label, body: row.body })));
      }
      setMessage("");
    } catch {
      setMessage("Unable to save tips.");
    } finally {
      setSaving(false);
    }
  }

  async function saveResources() {
    if (!wired) {
      setMessage("Apply the FTP-B7b migration before saving.");
      return;
    }
    setSaving(true);
    setMessage("Saving resources…");
    try {
      const response = await fetch("/api/staff/mentor-assigns/resources", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          resources: resources.map((item) => ({ label: item.label, url: item.url }))
        })
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        setMessage(result.message ?? "Unable to save resources.");
        return;
      }
      const reload = await fetch("/api/staff/mentor-assigns/resources");
      const payload = (await reload.json()) as {
        resources?: Array<{ id: string; label: string; url: string }>;
      };
      if (reload.ok && payload.resources) {
        setResources(
          payload.resources.map((row) => ({ id: row.id, label: row.label, url: row.url }))
        );
      }
      setMessage("Resources saved — all Premium students will see this pack.");
    } catch {
      setMessage("Unable to save resources.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={styles.root} data-ws-gate="ftp-b7b" data-ws-source="progress_library">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Mentor Assigns</p>
          <h1>Mentor Assigns</h1>
          <p className={styles.lead}>
            Shared Useful Tips + Resource Drop for <strong>all Premium students</strong>. Save once —
            every student Track Progress shows the same pack (student wire = FTP-B7c).
          </p>
        </div>
      </header>

      {message ? (
        <p className={styles.status} role="status">
          {message}
        </p>
      ) : null}

      <div className={styles.tabs} role="tablist" aria-label="Mentor Assigns sections">
        <button
          type="button"
          role="tab"
          id="ws-ma-tab-tips"
          aria-selected={tab === "tips"}
          aria-controls="ws-ma-panel-tips"
          className={tab === "tips" ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={() => setTab("tips")}
        >
          Tips
        </button>
        <button
          type="button"
          role="tab"
          id="ws-ma-tab-resource"
          aria-selected={tab === "resource"}
          aria-controls="ws-ma-panel-resource"
          className={tab === "resource" ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={() => setTab("resource")}
        >
          Resource
        </button>
      </div>

      {tab === "tips" ? (
        <section
          className={styles.panel}
          role="tabpanel"
          id="ws-ma-panel-tips"
          aria-labelledby="ws-ma-tab-tips"
        >
          <div className={styles.panelBar}>
            <p className={styles.panelLead}>Student carousel cards (badge + tip body).</p>
            <button
              type="button"
              className={styles.btnSecondary}
              disabled={saving}
              onClick={() =>
                setTips((current) => [...current, { id: newId("tip"), label: "New tip", body: "" }])
              }
            >
              <Plus aria-hidden="true" />
              Add tip
            </button>
          </div>

          <ul className={styles.cardList}>
            {!tips.length ? (
              <li className={styles.emptyCard}>No tips yet. Add a tip to publish to students.</li>
            ) : (
              tips.map((tip, index) => (
                <li key={tip.id} className={styles.card}>
                  <div className={styles.cardHead}>
                    <strong>Tip {index + 1}</strong>
                    <button
                      type="button"
                      className={styles.iconDanger}
                      aria-label={`Remove tip ${index + 1}`}
                      disabled={saving}
                      onClick={() => setTips((current) => current.filter((row) => row.id !== tip.id))}
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                  <label>
                    <span>Badge / label</span>
                    <input
                      value={tip.label}
                      disabled={saving}
                      onChange={(event) =>
                        setTips((current) =>
                          current.map((row) =>
                            row.id === tip.id ? { ...row, label: event.target.value } : row
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    <span>Tip body</span>
                    <textarea
                      rows={3}
                      value={tip.body}
                      disabled={saving}
                      onChange={(event) =>
                        setTips((current) =>
                          current.map((row) =>
                            row.id === tip.id ? { ...row, body: event.target.value } : row
                          )
                        )
                      }
                    />
                  </label>
                </li>
              ))
            )}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnPrimary}
              disabled={saving || !wired}
              onClick={() => void saveTips()}
            >
              Save tips
            </button>
          </div>
        </section>
      ) : (
        <section
          className={styles.panel}
          role="tabpanel"
          id="ws-ma-panel-resource"
          aria-labelledby="ws-ma-tab-resource"
        >
          <div className={styles.panelBar}>
            <p className={styles.panelLead}>Resource Drop rows (label + https URL).</p>
            <button
              type="button"
              className={styles.btnSecondary}
              disabled={saving}
              onClick={() =>
                setResources((current) => [
                  ...current,
                  { id: newId("res"), label: "New resource", url: "" }
                ])
              }
            >
              <Plus aria-hidden="true" />
              Add resource
            </button>
          </div>

          <ul className={styles.cardList}>
            {!resources.length ? (
              <li className={styles.emptyCard}>No resources yet. Add a row for Resource Drop.</li>
            ) : (
              resources.map((item, index) => (
                <li key={item.id} className={styles.card}>
                  <div className={styles.cardHead}>
                    <strong>Resource {index + 1}</strong>
                    <button
                      type="button"
                      className={styles.iconDanger}
                      aria-label={`Remove resource ${index + 1}`}
                      disabled={saving}
                      onClick={() =>
                        setResources((current) => current.filter((row) => row.id !== item.id))
                      }
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                  <label>
                    <span>Label</span>
                    <input
                      value={item.label}
                      disabled={saving}
                      onChange={(event) =>
                        setResources((current) =>
                          current.map((row) =>
                            row.id === item.id ? { ...row, label: event.target.value } : row
                          )
                        )
                      }
                    />
                  </label>
                  <label>
                    <span>URL</span>
                    <input
                      type="url"
                      inputMode="url"
                      placeholder="https://…"
                      value={item.url}
                      disabled={saving}
                      onChange={(event) =>
                        setResources((current) =>
                          current.map((row) =>
                            row.id === item.id ? { ...row, url: event.target.value } : row
                          )
                        )
                      }
                    />
                  </label>
                </li>
              ))
            )}
          </ul>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnPrimary}
              disabled={saving || !wired}
              onClick={() => void saveResources()}
            >
              Save resources
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
