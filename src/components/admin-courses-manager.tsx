"use client";

import { useMemo, useState } from "react";
import {
  ExternalLink,
  EyeOff,
  Funnel,
  Pencil,
  Plus,
  Search,
  Trash2,
  X
} from "lucide-react";
import type { MediaOption, RelationOptions, TagOption } from "@/components/admin-crud-manager";
import type { AdminEntity, AdminField } from "@/lib/admin-registry";
import {
  bodyToSectionsForm,
  buildCoursesDetailBody,
  parseCoursesDetailBody,
  safeBodyUrl,
  type CoursesSectionsForm
} from "@/features/programs-courses/courses-detail-body-builder";
import { CoursesDetailSectionsEditor } from "@/features/programs-courses/courses-detail-sections-editor";
import { coursesDetailBodyToFixture } from "@/features/programs-courses/courses-detail-validation";
import { ProgramsCoursesPreviewShell } from "@/features/programs-courses/programs-courses-preview-shell";
import { marketingMediaUrl } from "@/lib/media-url";

type Row = Record<string, unknown>;
type View = "list" | "create" | "edit";

const PAGE_SIZE = 10;
const ENDPOINT = "/api/admin/catalog/courses";

function shown(value: unknown): string {
  if (value == null || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function publicationStatus(livePublished: boolean, hasDraft: boolean): string {
  if (livePublished && hasDraft) return "Published · Draft changes";
  if (livePublished) return "Published";
  return "Draft";
}

function previewHref(entityId: unknown, revisionId: unknown): string | null {
  if (entityId == null || typeof revisionId !== "string" || !revisionId) return null;
  return `/api/admin/catalog/preview?entity=courses&id=${entityId}&revision=${revisionId}`;
}

/** Staff Ops preview URL for iframe / new-tab (PREVIEW B). */
function opsPreviewPath(entityId: unknown, revisionId: unknown): string | null {
  if (entityId == null || typeof revisionId !== "string" || !revisionId) return null;
  return `/ops/cms/courses/preview/${entityId}?revision=${revisionId}`;
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
      <div className="ops-uni1-media-row">
        <label className="ops-uni1-field">
          <span>{field.label}</span>
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
        </label>
        {!locked ? (
          <label className="ops-uni1-field">
            <span>Upload new file</span>
            <input
              className="ops-uni1-file"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.gif,.pdf,.mp4"
              aria-label={`Upload ${field.label}`}
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
                select.value = result.id;
                select.dispatchEvent(new Event("change", { bubbles: true }));
              }}
            />
          </label>
        ) : (
          <div className="ops-uni1-field" aria-hidden="true" />
        )}
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
        rows={field.key === "description" ? 3 : 2}
        disabled={locked}
        placeholder={placeholder}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="ops-uni1-check">
        <input name={field.key} type="checkbox" defaultChecked={current === true} disabled={locked} />
        <span>{field.label}</span>
      </label>
    );
  }

  const inputType = field.type === "date" ? "date" : field.type === "number" ? "number" : field.type === "url" ? "url" : "text";
  return (
    <input
      className="ops-uni1-control"
      name={field.key}
      type={inputType}
      required={field.required}
      maxLength={field.max}
      defaultValue={String(current ?? (field.type === "number" ? "0" : ""))}
      disabled={locked}
      placeholder={placeholder}
    />
  );
}

export function AdminCoursesManager({
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
  // COURSE2d — detail template + C1–C9/C11 section fields (body is built on Save Draft).
  const [detailTemplate, setDetailTemplate] = useState<"" | "courses">("");
  const [sections, setSections] = useState<CoursesSectionsForm>(() => bodyToSectionsForm(null));

  const categoryLabel = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of relationOptions.course_categories ?? []) map.set(String(option.id), option.label);
    return map;
  }, [relationOptions.course_categories]);

  const universityLabel = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of relationOptions.universities ?? []) map.set(String(option.id), option.label);
    return map;
  }, [relationOptions.universities]);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE) || 1);
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);
  const showingFrom = rows.length === 0 ? 0 : start + 1;
  const showingTo = Math.min(start + PAGE_SIZE, rows.length);

  const publishedLock =
    Boolean(editing && editing._live_published === true && !canPublish) && view === "edit";
  const editorFields = entity.fields.filter((field) => field.key !== "published");

  /** COURSE2c-side — live Programs Courses shell from current section state + last-saved flat fields. */
  const liveSidePreview = useMemo(() => {
    if (detailTemplate !== "courses") {
      return { course: null as ReturnType<typeof coursesDetailBodyToFixture>, error: "" };
    }
    try {
      const tagIds = Array.isArray(editing?._tag_ids) ? (editing._tag_ids as number[]) : [];
      const tagNames = tagIds
        .map((id) => tagOptions.find((tag) => tag.id === id)?.label ?? "")
        .filter(Boolean);
      const imageId = typeof editing?.image_asset_id === "string" ? editing.image_asset_id : "";
      const brochureId = typeof editing?.brochure_asset_id === "string" ? editing.brochure_asset_id : "";
      const imageAsset = mediaAssets.find((asset) => asset.id === imageId);
      const brochureAsset = mediaAssets.find((asset) => asset.id === brochureId);
      const body = buildCoursesDetailBody({
        id: String(editing?.[entity.idKey] ?? "new"),
        previous: editing?.detail_body,
        flat: {
          title: editing?.title,
          short_description: editing?.short_description,
          description: editing?.description,
          duration: editing?.duration,
          mode: editing?.mode,
          starts_on: editing?.starts_on,
          ends_on: editing?.ends_on,
          tagNames
        },
        sections
      });
      if (imageAsset) {
        body.heroImage = marketingMediaUrl(imageAsset);
        body.heroImageAlt = imageAsset.alt_text?.trim() || body.heroImageAlt;
      }
      if (brochureAsset) {
        body.brochure = {
          ...body.brochure,
          downloadUrl: marketingMediaUrl(brochureAsset)
        };
      }
      return { course: coursesDetailBodyToFixture(body), error: "" };
    } catch (error) {
      return {
        course: null,
        error: error instanceof Error ? error.message : "Unable to build live preview."
      };
    }
  }, [detailTemplate, editing, entity.idKey, mediaAssets, sections, tagOptions]);

  function loadDetail(row: Row | null) {
    // Row already merges live columns with the latest draft values, so draft detail_body wins.
    const body = row ? parseCoursesDetailBody(row.detail_body) : null;
    setDetailTemplate(row?.detail_template === "courses" || body ? "courses" : "");
    setSections(bodyToSectionsForm(body, row?.booking_url));
  }

  function openCreate() {
    setEditing(null);
    loadDetail(null);
    setMessage("");
    setView("create");
  }

  function openEdit(row: Row) {
    setEditing(row);
    loadDetail(row);
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
      if (field.type === "boolean") values[field.key] = data.get(field.key) === "on";
      else values[field.key] = data.get(field.key) ?? "";
    }
    values.tag_ids = data.getAll("tag_ids").map(Number);
    values.revision_note = data.get("revision_note") ?? "";
    if (editing) values.id = editing[entity.idKey];

    // COURSE2d — build the complete detail_body (strict CoursesTemplateBodyV1) for the draft.
    let savedDetail: Row = {};
    if (detailTemplate === "courses") {
      const bookingUrl = sections.c1.bookingUrl.trim();
      if (bookingUrl && (bookingUrl.startsWith("#") || !safeBodyUrl(bookingUrl))) {
        setMessage("Booking URL must start with https:// or /.");
        return;
      }
      const tagIds = (values.tag_ids as number[]) ?? [];
      const tagNames = tagIds
        .map((id) => tagOptions.find((tag) => tag.id === id)?.label ?? "")
        .filter(Boolean);
      try {
        const body = buildCoursesDetailBody({
          id: String(editing?.[entity.idKey] ?? "new"),
          previous: editing?.detail_body,
          flat: {
            title: values.title,
            short_description: values.short_description,
            description: values.description,
            duration: values.duration,
            mode: values.mode,
            starts_on: values.starts_on,
            ends_on: values.ends_on,
            tagNames
          },
          sections
        });
        savedDetail = { detail_template: "courses", detail_body: body, booking_url: body.bookingUrl };
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to build the course detail sections.");
        return;
      }
    } else if (editing && (editing.detail_template === "courses" || parseCoursesDetailBody(editing.detail_body))) {
      // Switched back to the legacy layout: clear the saved template + body.
      savedDetail = { detail_template: "", detail_body: {} };
    }
    Object.assign(values, savedDetail);

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
      ...(savedDetail.detail_template === "courses"
        ? savedDetail
        : "detail_template" in savedDetail
          ? { detail_template: null, detail_body: {} }
          : {}),
      [entity.idKey]: savedId,
      _draft_id: result.revision_id ?? editing?._draft_id,
      _live_published: editing?._live_published === true,
      _tag_ids: Array.isArray(values.tag_ids) ? values.tag_ids : editing?._tag_ids
    });
    setListNeedsRefresh(true);
    setView("edit");
    setMessage(
      values.image_asset_id
        ? "Draft saved (image included). Click Preview to check the hero photo."
        : "Draft saved. Public visitors still see published content. Tip: choose Image, then Save Draft again for the hero photo."
    );
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
        "Delete this courses record? Published or referenced records must be unpublished first."
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

  function renderEditorField(field: AdminField) {
    const placeholders: Record<string, string> = {
      title: "Enter course title",
      slug: "Enter slug",
      short_description: "Enter short description",
      description: "Enter description",
      duration: "e.g. 7 Days",
      mode: "e.g. #inCampus"
    };

    if (field.media) {
      return (
        <div key={`${String(editing?.[entity.idKey] ?? "new")}-${field.key}`} className="ops-uni1-field ops-uni1-field--full">
          <FieldControl
            field={field}
            editing={editing}
            mediaAssets={mediaAssets}
            relationOptions={relationOptions}
            locked={publishedLock}
          />
        </div>
      );
    }

    if (field.type === "boolean") {
      return (
        <div key={`${String(editing?.[entity.idKey] ?? "new")}-${field.key}`} className="ops-uni1-field">
          <FieldControl
            field={field}
            editing={editing}
            mediaAssets={mediaAssets}
            relationOptions={relationOptions}
            locked={publishedLock}
          />
        </div>
      );
    }

    return (
      <label
        key={`${String(editing?.[entity.idKey] ?? "new")}-${field.key}`}
        className={field.type === "textarea" ? "ops-uni1-field ops-uni1-field--full" : "ops-uni1-field"}
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
  }

  if (view === "create" || view === "edit") {
    const isCreate = view === "create";
    const href = previewHref(editing?.[entity.idKey], editing?._draft_id);
    const opsPath = opsPreviewPath(editing?.[entity.idKey], editing?._draft_id);

    return (
      <div className="ops-uni1-page ops-uni1-page--course-side" data-ops-course-pass="course1" data-course2c-side="true">
        <form className="ops-uni1-editor ops-uni1-editor--course-side" onSubmit={(event) => void save(event)}>
          <header className="ops-uni1-editor-header">
            <div>
              <p className="ops-uni1-eyebrow">{isCreate ? "Create" : "Edit"}</p>
              <h1>Courses</h1>
              <p className="ops-uni1-editor-status">
                {publicationStatus(editing?._live_published === true, Boolean(editing?._draft_id))}
              </p>
            </div>
            <button type="button" className="ops-uni1-close" aria-label="Close editor" onClick={closeEditor}>
              <X aria-hidden="true" />
            </button>
          </header>

          <p className="ops-uni1-note" role="note">
            Left: edit fields. Right: live Programs Courses template (C1–C13). Save Draft keeps this editor open.
            Preview opens the full Ops template in a new tab. Publish is the only action that changes what visitors
            see.
          </p>

          {publishedLock ? (
            <p className="ops-uni1-note" role="status">
              This record is published. catalog.publish is required to change public catalog content.
            </p>
          ) : null}

          <div className="ops-course-side">
            <div className="ops-course-side__form">
              <div className="ops-uni1-form ops-uni1-form--create ops-uni1-form--courses">
                <label className="ops-uni1-field ops-uni1-field--full ops-uni1-field--template">
                  <span>Detail template</span>
                  <select
                    className="ops-uni1-control"
                    value={detailTemplate}
                    disabled={publishedLock}
                    aria-describedby="ops-course-template-hint"
                    onChange={(event) => setDetailTemplate(event.target.value === "courses" ? "courses" : "")}
                  >
                    <option value="">Empty (legacy) — flat fields only</option>
                    <option value="courses">Courses — full Programs Courses sections (C1–C13)</option>
                  </select>
                  <small id="ops-course-template-hint" className="ops-uni1-hint">
                    Core fields below (title, dates…) are always saved. Choose <strong>Courses</strong> to unlock
                    C1–C13 — the live pane on the right updates as you edit sections. Save Draft to persist, then
                    Preview for the full Ops tab.
                  </small>
                </label>

                {editorFields.map((field) => renderEditorField(field))}

                {detailTemplate === "courses" ? (
                  <CoursesDetailSectionsEditor
                    value={sections}
                    onChange={setSections}
                    locked={publishedLock}
                    mediaAssets={mediaAssets}
                  />
                ) : null}

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
            </div>

            <aside className="ops-course-side__preview" aria-label="Live Programs Courses template preview">
              <div className="ops-course-side__preview-head">
                <div>
                  <strong>Live template</strong>
                  <span className="ops-course-side__preview-hint">
                    {detailTemplate === "courses"
                      ? "C1–C13 sections update this pane as you type. Title/dates/image refresh after Save Draft."
                      : "Choose Detail template = Courses to show the Programs Courses shell here."}
                  </span>
                </div>
                {href ? (
                  <a className="ops-course-side__preview-link" href={href} target="_blank" rel="noopener noreferrer">
                    Full Preview <ExternalLink aria-hidden="true" size={14} />
                  </a>
                ) : null}
              </div>
              <div className="ops-course-side__preview-body">
                {liveSidePreview.error ? (
                  <p className="ops-course-side__preview-empty" role="status">
                    {liveSidePreview.error}
                  </p>
                ) : liveSidePreview.course ? (
                  <div className="ops-course-side__canvas" data-courses-ops-side-preview="true">
                    <ProgramsCoursesPreviewShell course={liveSidePreview.course} hideEmptySections />
                  </div>
                ) : (
                  <p className="ops-course-side__preview-empty" role="status">
                    Select <strong>Courses</strong> as the detail template to see the live body preview.
                    {opsPath ? (
                      <>
                        {" "}
                        Or open{" "}
                        <a href={opsPath} target="_blank" rel="noopener noreferrer">
                          full Ops preview
                        </a>{" "}
                        after Save Draft.
                      </>
                    ) : null}
                  </p>
                )}
              </div>
            </aside>
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
              {href ? (
                <a className="ops-uni1-btn ops-uni1-btn--outline" href={href} target="_blank" rel="noopener noreferrer">
                  Preview <ExternalLink aria-hidden="true" />
                </a>
              ) : (
                <button type="button" className="ops-uni1-btn ops-uni1-btn--outline" disabled>
                  Preview
                </button>
              )}
              {canPublish ? (
                <button
                  type="button"
                  className="ops-uni1-btn ops-uni1-btn--primary"
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
    <div className="ops-uni1-page" data-ops-course-pass="course1">
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

      <section className="ops-uni1-panel" aria-labelledby="ops-course1-list-heading">
        <h2 id="ops-course1-list-heading" className="ops-um-visually-hidden">
          Course records
        </h2>

        <form className="ops-uni1-toolbar ops-uni1-toolbar--row" method="get" role="search">
          <label className="ops-uni1-search">
            <Search aria-hidden="true" />
            <span className="ops-um-visually-hidden">Search courses</span>
            <input
              className="ops-uni1-control"
              name="q"
              type="search"
              placeholder="Search courses..."
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

        <div className="ops-uni1-table-scroll" tabIndex={0} role="region" aria-label="Courses table">
          <table className="ops-uni1-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category</th>
                <th scope="col">University</th>
                <th scope="col">Title</th>
                <th scope="col">Slug</th>
                {canManage ? <th scope="col">Actions</th> : null}
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => {
                const href = previewHref(row[entity.idKey], row._draft_id);
                return (
                  <tr key={String(row[entity.idKey])}>
                    <td>{shown(row[entity.idKey])}</td>
                    <td>
                      {row.category_id == null || row.category_id === ""
                        ? "—"
                        : (categoryLabel.get(String(row.category_id)) ?? shown(row.category_id))}
                    </td>
                    <td>
                      {row.university_id == null || row.university_id === ""
                        ? "—"
                        : (universityLabel.get(String(row.university_id)) ?? shown(row.university_id))}
                    </td>
                    <td>
                      <strong>{shown(row.title)}</strong>
                    </td>
                    <td>{shown(row.slug)}</td>
                    {canManage ? (
                      <td>
                        <div className="ops-uni1-row-actions">
                          <button type="button" className="ops-uni1-action ops-uni1-action--accent" onClick={() => openEdit(row)}>
                            <Pencil aria-hidden="true" />
                            Edit
                          </button>
                          {href ? (
                            <a className="ops-uni1-action ops-uni1-action--accent" href={href} target="_blank" rel="noopener noreferrer">
                              <ExternalLink aria-hidden="true" />
                              Preview
                            </a>
                          ) : null}
                          {row._draft_id && canPublish ? (
                            <button type="button" className="ops-uni1-action" onClick={() => void publication(row, "publish")}>
                              Publish
                            </button>
                          ) : null}
                          {canPublish && row._live_published === true ? (
                            <button type="button" className="ops-uni1-action" onClick={() => void publication(row, "unpublish")}>
                              <EyeOff aria-hidden="true" />
                              Hide from public
                            </button>
                          ) : null}
                          <button
                            type="button"
                            className="ops-uni1-action ops-uni1-action--danger"
                            onClick={() => void remove(row)}
                          >
                            <Trash2 aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
              {!pageRows.length ? (
                <tr>
                  <td className="ops-uni1-empty" colSpan={canManage ? 6 : 5}>
                    No records found. Adjust the filters or create the first course.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <nav className="ops-uni1-pagination" aria-label="Courses pagination">
          <p>
            Showing {showingFrom} to {showingTo} of {rows.length} courses
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
