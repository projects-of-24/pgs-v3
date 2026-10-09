"use client";

import { useMemo, useState } from "react";
import { Funnel, Plus, Search, X } from "lucide-react";
import type { MediaOption, RelationOptions, TagOption } from "@/components/admin-crud-manager";
import type { AdminEntity, AdminField } from "@/lib/admin-registry";

type Row = Record<string, unknown>;
type View = "list" | "create" | "edit";

const PAGE_SIZE = 10;
const ENDPOINT = "/api/admin/catalog/universities";

function shown(key: string, value: unknown): string {
  if (typeof value === "boolean") {
    if (key === "published") return value ? "Published" : "Draft";
    return value ? "Yes" : "No";
  }
  if (value == null || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function publicationStatus(livePublished: boolean, hasDraft: boolean): string {
  if (livePublished && hasDraft) return "Published · Draft changes";
  if (livePublished) return "Published";
  return "Draft";
}

function FieldControl({
  field,
  editing,
  mediaAssets,
  relationOptions,
  locked,
  placeholder
}: {
  field: AdminField;
  editing: Row | null;
  mediaAssets: MediaOption[];
  relationOptions: RelationOptions;
  locked: boolean;
  placeholder?: string;
}) {
  const current = editing?.[field.key];
  if (field.media) {
    return (
      <div className="ops-uni1-media">
        <select
          className="ops-uni1-control"
          name={field.key}
          defaultValue={String(current ?? "")}
          disabled={locked}
          aria-label={field.label}
        >
          <option value="">No media</option>
          {mediaAssets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {(asset.alt_text || asset.path).slice(0, 80)} ({asset.mime_type})
            </option>
          ))}
        </select>
        {!locked ? (
          <label className="ops-uni1-upload">
            <span>Upload new file</span>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.gif,.pdf,.mp4"
              onChange={async (event) => {
                const file = event.currentTarget.files?.[0];
                const select = event.currentTarget.form?.elements.namedItem(field.key);
                if (!file || !(select instanceof HTMLSelectElement)) return;
                const data = new FormData();
                data.set("file", file);
                data.set("bucket", "marketing-public");
                data.set("alt_text", file.name.replace(/\.[^.]+$/, "").slice(0, 500));
                const response = await fetch("/api/admin/media", { method: "POST", body: data });
                const result = (await response.json()) as { id?: string; message?: string };
                if (!response.ok || !result.id) {
                  event.currentTarget.setCustomValidity(result.message ?? "Unable to upload.");
                  event.currentTarget.reportValidity();
                  return;
                }
                select.add(new Option(file.name, result.id, true, true));
              }}
            />
          </label>
        ) : null}
      </div>
    );
  }
  if (field.relation) {
    const options = relationOptions[field.relation] ?? [];
    return (
      <select
        className="ops-uni1-control"
        name={field.key}
        required={field.required}
        defaultValue={String(current ?? "")}
        disabled={locked}
      >
        <option value="">None</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "textarea") {
    return (
      <textarea
        className="ops-uni1-control ops-uni1-textarea"
        name={field.key}
        maxLength={field.max}
        required={field.required}
        defaultValue={String(current ?? "")}
        rows={3}
        disabled={locked}
        placeholder={placeholder}
      />
    );
  }
  return (
    <input
      className="ops-uni1-control"
      name={field.key}
      type={field.type === "url" ? "url" : "text"}
      required={field.required}
      maxLength={field.max}
      defaultValue={String(current ?? "")}
      disabled={locked}
      placeholder={placeholder}
    />
  );
}

export function AdminUniversitiesManager({
  entity,
  rows,
  canManage,
  canPublish,
  mediaAssets,
  relationOptions,
  tagOptions,
  initialQuery,
  initialState
}: {
  entity: AdminEntity;
  rows: Row[];
  canManage: boolean;
  canPublish: boolean;
  mediaAssets: MediaOption[];
  relationOptions: RelationOptions;
  tagOptions: TagOption[];
  initialQuery: string;
  initialState: string;
}) {
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<Row | null>(null);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [listNeedsRefresh, setListNeedsRefresh] = useState(false);

  const countryLabel = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of relationOptions.countries ?? []) {
      map.set(String(option.id), option.label);
    }
    return map;
  }, [relationOptions.countries]);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE) || 1);
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);
  const showingFrom = rows.length === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + PAGE_SIZE, rows.length);

  const publishedLock =
    Boolean(editing && editing._live_published === true && !canPublish) && view === "edit";

  const editorFields = entity.fields.filter((field) => field.key !== "published");

  function openCreate() {
    setEditing(null);
    setMessage("");
    setView("create");
  }

  function openEdit(row: Row) {
    setEditing(row);
    setMessage("");
    setView("edit");
  }

  function closeEditor() {
    setView("list");
    setEditing(null);
    setMessage("");
    if (listNeedsRefresh) window.location.reload();
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (publishedLock) {
      setMessage("catalog.publish is required to change published catalog content.");
      return;
    }
    setMessage("Saving…");
    const data = new FormData(event.currentTarget);
    const values: Row = { action: "save-draft" };
    for (const field of editorFields) {
      values[field.key] = data.get(field.key) ?? "";
    }
    values.tag_ids = data.getAll("tag_ids").map(Number);
    values.revision_note = data.get("revision_note") ?? "";
    if (editing) values.id = editing[entity.idKey];

    const response = await fetch(`${ENDPOINT}/drafts`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values)
    });
    const result = (await response.json()) as { message?: string; id?: string | number; revision_id?: string };
    if (!response.ok) {
      setMessage(result.message ?? "Unable to save.");
      return;
    }
    const savedId = result.id ?? editing?.[entity.idKey];
    setEditing({
      ...(editing ?? {}),
      ...Object.fromEntries(editorFields.map((field) => [field.key, values[field.key]])),
      [entity.idKey]: savedId,
      _draft_id: result.revision_id ?? editing?._draft_id,
      _live_published: editing?._live_published === true,
      _tag_ids: Array.isArray(values.tag_ids) ? values.tag_ids : editing?._tag_ids
    });
    setListNeedsRefresh(true);
    setView("edit");
    setMessage("Draft saved. Public visitors still see published content.");
  }

  async function publication(row: Row, action: "publish" | "unpublish") {
    setMessage(action === "publish" ? "Publishing approved draft…" : "Hiding public content…");
    const response = await fetch(`${ENDPOINT}/drafts`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(
        action === "publish" ? { action, revision_id: row._draft_id } : { action, id: row[entity.idKey] }
      )
    });
    const result = (await response.json()) as { message?: string };
    if (!response.ok) {
      setMessage(result.message ?? "Unable to change publication.");
      return;
    }
    window.location.reload();
  }

  async function remove(row: Row) {
    if (
      !window.confirm(
        "Delete this universities record? Published or referenced records must be unpublished first."
      )
    ) {
      return;
    }
    const response = await fetch(ENDPOINT, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: row[entity.idKey] })
    });
    const result = (await response.json()) as { message?: string };
    if (!response.ok) {
      setMessage(result.message ?? "Unable to delete.");
      return;
    }
    window.location.reload();
  }

  function countryCell(row: Row): string {
    const id = row.country_id;
    if (id == null || id === "") return "—";
    return countryLabel.get(String(id)) ?? shown("country_id", id);
  }

  if (view === "create" || view === "edit") {
    const isCreate = view === "create";
    return (
      <div className="ops-uni1-page" data-ops-uni-pass="uni1">
        <form className="ops-uni1-editor" onSubmit={(event) => void save(event)}>
          <header className="ops-uni1-editor-header">
            <div>
              {isCreate ? (
                <h1>Create University</h1>
              ) : (
                <>
                  <p className="ops-uni1-eyebrow">Edit</p>
                  <h1>Universities</h1>
                  <p className="ops-uni1-editor-status">
                    {publicationStatus(editing?._live_published === true, Boolean(editing?._draft_id))}
                  </p>
                </>
              )}
            </div>
            <button type="button" className="ops-uni1-close" aria-label="Close editor" onClick={closeEditor}>
              <X aria-hidden="true" />
            </button>
          </header>

          <p className="ops-uni1-note" role="note">
            Save Draft keeps this editor open. Preview opens the real public page in a new tab. Publish is the only
            action that changes what visitors see.
          </p>

          {publishedLock ? (
            <p className="ops-uni1-note" role="status">
              This record is published. catalog.publish is required to change public catalog content.
            </p>
          ) : null}
          {!canPublish && isCreate ? (
            <p className="ops-uni1-note">You can create drafts. Publishing requires catalog.publish.</p>
          ) : null}

          <div className="ops-uni1-form ops-uni1-form--create">
            {editorFields.map((field) => {
              const placeholders: Record<string, string> = {
                name: "Enter university name",
                slug: "Enter slug",
                location: "Enter location",
                summary: "Enter summary about the university"
              };
              return (
                <label
                  key={`${String(editing?.[entity.idKey] ?? "new")}-${field.key}`}
                  className={
                    field.type === "textarea" || field.media
                      ? "ops-uni1-field ops-uni1-field--full"
                      : "ops-uni1-field"
                  }
                >
                  <span>
                    {field.label}
                    {field.required ? " *" : ""}
                  </span>
                  <FieldControl
                    field={field}
                    editing={editing}
                    mediaAssets={mediaAssets}
                    relationOptions={relationOptions}
                    locked={publishedLock}
                    placeholder={placeholders[field.key]}
                  />
                </label>
              );
            })}

            {tagOptions.length ? (
              <fieldset className="ops-uni1-field ops-uni1-field--full ops-uni1-tags">
                <legend>Tags</legend>
                <div className="ops-uni1-tag-list">
                  {tagOptions.map((tag) => (
                    <label key={tag.id} className="ops-uni1-tag">
                      <input
                        name="tag_ids"
                        type="checkbox"
                        value={tag.id}
                        defaultChecked={Array.isArray(editing?._tag_ids) && editing._tag_ids.includes(tag.id)}
                        disabled={publishedLock}
                      />
                      <span>{tag.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            <label className="ops-uni1-field ops-uni1-field--full">
              <span>Revision note</span>
              <input
                className="ops-uni1-control"
                name="revision_note"
                maxLength={500}
                placeholder="Enter revision note (optional)"
                disabled={publishedLock}
              />
            </label>
          </div>

          {message ? (
            <p className="ops-uni1-status" role="status">
              {message}
            </p>
          ) : null}

          <footer className="ops-uni1-editor-footer">
            <div className="ops-uni1-editor-actions">
              <button className="ops-uni1-btn ops-uni1-btn--primary" disabled={publishedLock} type="submit">
                Save Draft
              </button>
              {canPublish ? (
                <button
                  type="button"
                  className="ops-uni1-btn ops-uni1-btn--outline"
                  disabled={!editing?._draft_id}
                  onClick={() => editing && void publication(editing, "publish")}
                >
                  Publish
                </button>
              ) : null}
            </div>
            <button type="button" className="ops-uni1-btn ops-uni1-btn--cancel" onClick={closeEditor}>
              Cancel
            </button>
          </footer>
        </form>
      </div>
    );
  }

  return (
    <div className="ops-uni1-page" data-ops-uni-pass="uni1">
      <header className="ops-uni1-page-header">
        <div className="ops-uni1-page-heading">
          <div>
            <p className="ops-uni1-eyebrow">Catalog</p>
            <h1>{entity.label}</h1>
            <p>{entity.description}</p>
          </div>
          {canManage ? (
            <button type="button" className="ops-uni1-btn ops-uni1-btn--primary" onClick={openCreate}>
              <Plus aria-hidden="true" />
              Create
            </button>
          ) : null}
        </div>
      </header>

      <section className="ops-uni1-panel" aria-labelledby="ops-uni1-list-heading">
        <h2 id="ops-uni1-list-heading" className="ops-um-visually-hidden">
          University records
        </h2>

        <form className="ops-uni1-toolbar ops-uni1-toolbar--row" method="get" role="search">
          <label className="ops-uni1-search">
            <Search aria-hidden="true" />
            <span className="ops-um-visually-hidden">Search universities</span>
            <input
              className="ops-uni1-control"
              name="q"
              type="search"
              placeholder="Search universities..."
              defaultValue={initialQuery}
            />
          </label>
          <label className="ops-uni1-state">
            <span className="ops-um-visually-hidden">Publication filter</span>
            <select className="ops-uni1-control" name="state" defaultValue={initialState}>
              <option value="">All states</option>
              <option value="published">Published / active</option>
              <option value="draft">Draft / inactive</option>
            </select>
          </label>
          <button className="ops-uni1-btn ops-uni1-btn--filter" type="submit">
            <Funnel aria-hidden="true" />
            Filter
          </button>
        </form>

        {message ? (
          <p className="ops-uni1-status" role="status">
            {message}
          </p>
        ) : null}

        <div className="ops-uni1-table-scroll" tabIndex={0} role="region" aria-label="Universities table">
          <table className="ops-uni1-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Country</th>
                <th scope="col">Name</th>
                <th scope="col">Slug</th>
                <th scope="col">Location</th>
                {canManage ? <th scope="col">Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={String(row[entity.idKey])}>
                  <td>{shown("id", row[entity.idKey])}</td>
                  <td>{countryCell(row)}</td>
                  <td>{shown("name", row.name)}</td>
                  <td>{shown("slug", row.slug)}</td>
                  <td>{shown("location", row.location)}</td>
                  {canManage ? (
                    <td>
                      <div className="ops-uni1-row-actions">
                        <button type="button" className="ops-uni1-action" onClick={() => openEdit(row)}>
                          Edit
                        </button>
                        {row._draft_id && canPublish ? (
                          <button
                            type="button"
                            className="ops-uni1-action"
                            onClick={() => void publication(row, "publish")}
                          >
                            Publish
                          </button>
                        ) : null}
                        {canPublish && row._live_published === true ? (
                          <button
                            type="button"
                            className="ops-uni1-action"
                            onClick={() => void publication(row, "unpublish")}
                          >
                            Hide from public
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className="ops-uni1-action ops-uni1-action--danger"
                          onClick={() => void remove(row)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
              {!pageRows.length ? (
                <tr>
                  <td className="ops-uni1-empty" colSpan={canManage ? 6 : 5}>
                    No records found. Adjust the filters or create the first university.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <nav className="ops-uni1-pagination" aria-label="Universities pagination">
          <p>
            Showing {showingFrom} to {showingTo} of {rows.length} universities
          </p>
          <div className="ops-uni1-pagination-controls">
            <button
              type="button"
              className="ops-uni1-page-btn"
              disabled={safePage <= 1}
              aria-label="Previous page"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            >
              ‹
            </button>
            <button
              type="button"
              className="ops-uni1-page-btn ops-uni1-page-btn--active"
              aria-label={`Page ${safePage}`}
              aria-current="page"
            >
              {safePage}
            </button>
            <button
              type="button"
              className="ops-uni1-page-btn"
              disabled={safePage >= pageCount}
              aria-label="Next page"
              onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
            >
              ›
            </button>
          </div>
        </nav>
      </section>
    </div>
  );
}
