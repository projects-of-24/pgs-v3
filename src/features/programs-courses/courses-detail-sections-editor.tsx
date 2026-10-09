"use client";

/**
 * COURSE2d — Ops Courses editor: C1–C9 + C11 section fieldsets (controlled).
 * Lives inside the COURSE1 editor form (`ops-uni1-*` classes). Values are lifted to the manager,
 * which builds the full `CoursesTemplateBodyV1` on Save Draft (see courses-detail-body-builder.ts).
 * C1–C13 section fields (COURSE2d-D4).
 * C7 logo/photo use the same marketing-public upload picker as the course Image field.
 */
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { MediaOption } from "@/components/admin-crud-manager";
import { marketingMediaUrl } from "@/lib/media-url";
import type { CoursesSectionsForm } from "./courses-detail-body-builder";

type Props = {
  value: CoursesSectionsForm;
  onChange: (next: CoursesSectionsForm) => void;
  locked: boolean;
  mediaAssets: MediaOption[];
};

const IMAGE_ACCEPT = ".jpg,.jpeg,.png,.webp,.gif";
const KEEP_SAVED = "__keep__";

function isImageAsset(asset: MediaOption): boolean {
  return asset.mime_type.startsWith("image/");
}

function TextField({
  label,
  value,
  onChange,
  locked,
  full = false,
  placeholder,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  locked: boolean;
  full?: boolean;
  placeholder?: string;
  type?: "text" | "url";
}) {
  return (
    <label className={full ? "ops-uni1-field ops-uni1-field--full" : "ops-uni1-field"}>
      <span>{label}</span>
      <input
        className="ops-uni1-control"
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={locked}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function AreaField({
  label,
  value,
  onChange,
  locked,
  hint,
  rows = 3
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  locked: boolean;
  hint?: string;
  rows?: number;
}) {
  return (
    <label className="ops-uni1-field ops-uni1-field--full">
      <span>
        {label}
        {hint ? <small className="ops-uni1-hint"> — {hint}</small> : null}
      </span>
      <textarea
        className="ops-uni1-control ops-uni1-textarea ops-uni1-textarea--sections"
        rows={rows}
        value={value}
        disabled={locked}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Section({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="ops-uni1-field ops-uni1-field--full ops-uni1-section">
      <legend>{legend}</legend>
      <div className="ops-uni1-section-grid">{children}</div>
    </fieldset>
  );
}

function AddButton({ label, onClick, locked }: { label: string; onClick: () => void; locked: boolean }) {
  return (
    <button type="button" className="ops-uni1-action" onClick={onClick} disabled={locked}>
      <Plus aria-hidden="true" />
      {label}
    </button>
  );
}

/** Same select + upload pattern as COURSE1 Image — writes the public marketing URL into the body. */
function MediaImagePicker({
  label,
  url,
  alt,
  locked,
  mediaAssets,
  onChange
}: {
  label: string;
  url: string;
  alt: string;
  locked: boolean;
  mediaAssets: MediaOption[];
  onChange: (next: { url: string; alt: string }) => void;
}) {
  const [assets, setAssets] = useState(() => mediaAssets.filter(isImageAsset));
  useEffect(() => {
    setAssets((prev) => {
      const fromProps = mediaAssets.filter(isImageAsset);
      const extras = prev.filter((asset) => !fromProps.some((item) => item.id === asset.id));
      return [...fromProps, ...extras];
    });
  }, [mediaAssets]);

  const matchedId = assets.find((asset) => marketingMediaUrl(asset) === url.trim())?.id ?? "";
  const selectValue = matchedId || (url.trim() ? KEEP_SAVED : "");

  return (
    <div className="ops-uni1-media-row ops-uni1-field--full">
      <label className="ops-uni1-field">
        <span>{label}</span>
        <select
          className="ops-uni1-control"
          value={selectValue}
          disabled={locked}
          aria-label={label}
          onChange={(event) => {
            const next = event.target.value;
            if (!next) {
              onChange({ url: "", alt });
              return;
            }
            if (next === KEEP_SAVED) return;
            const asset = assets.find((item) => item.id === next);
            if (!asset) return;
            onChange({
              url: marketingMediaUrl(asset),
              alt: alt.trim() || (asset.alt_text ?? "").trim()
            });
          }}
        >
          <option value="">No media</option>
          {url.trim() && !matchedId ? <option value={KEEP_SAVED}>Current saved image</option> : null}
          {assets.map((asset) => (
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
            accept={IMAGE_ACCEPT}
            aria-label={`Upload ${label}`}
            onChange={async (event) => {
              const input = event.currentTarget;
              const file = input.files?.[0];
              if (!file) return;
              const data = new FormData();
              data.set("file", file);
              data.set("bucket", "marketing-public");
              const defaultAlt = file.name.replace(/\.[^.]+$/, "").slice(0, 500);
              data.set("alt_text", defaultAlt);
              const response = await fetch("/api/admin/media", { method: "POST", body: data });
              const result = (await response.json()) as { id?: string; path?: string; message?: string };
              if (!response.ok || !result.id || !result.path) {
                input.setCustomValidity(result.message ?? "Unable to upload.");
                input.reportValidity();
                return;
              }
              const uploaded: MediaOption = {
                id: result.id,
                path: result.path,
                alt_text: defaultAlt,
                mime_type: file.type || "image/jpeg",
                bucket: "marketing-public"
              };
              setAssets((prev) => (prev.some((item) => item.id === uploaded.id) ? prev : [...prev, uploaded]));
              onChange({
                url: marketingMediaUrl(uploaded),
                alt: alt.trim() || defaultAlt
              });
              input.value = "";
            }}
          />
        </label>
      ) : (
        <div className="ops-uni1-field" aria-hidden="true" />
      )}
    </div>
  );
}

function RemoveButton({ label, onClick, locked }: { label: string; onClick: () => void; locked: boolean }) {
  return (
    <button
      type="button"
      className="ops-uni1-action ops-uni1-action--danger"
      aria-label={label}
      onClick={onClick}
      disabled={locked}
    >
      <Trash2 aria-hidden="true" />
      Remove
    </button>
  );
}

/** Repeating single-line rows (e.g. highlights, checklist). */
function StringRows({
  noun,
  items,
  onChange,
  locked,
  numbered = false
}: {
  noun: string;
  items: string[];
  onChange: (items: string[]) => void;
  locked: boolean;
  numbered?: boolean;
}) {
  return (
    <div className="ops-uni1-field ops-uni1-field--full ops-uni1-rows">
      {items.map((item, index) => (
        <div className="ops-uni1-row" key={index}>
          <label className="ops-uni1-field">
            <span>
              {noun} {index + 1}
              {numbered ? ` (shown as ${String(index + 1).padStart(2, "0")})` : ""}
            </span>
            <textarea
              className="ops-uni1-control ops-uni1-textarea ops-uni1-textarea--sections"
              rows={2}
              value={item}
              disabled={locked}
              onChange={(event) => onChange(items.map((current, i) => (i === index ? event.target.value : current)))}
            />
          </label>
          <RemoveButton
            label={`Remove ${noun.toLowerCase()} ${index + 1}`}
            locked={locked}
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          />
        </div>
      ))}
      <div>
        <AddButton label={`Add ${noun.toLowerCase()}`} locked={locked} onClick={() => onChange([...items, ""])} />
      </div>
    </div>
  );
}

export function CoursesDetailSectionsEditor({ value, onChange, locked, mediaAssets }: Props) {
  function patch<K extends keyof CoursesSectionsForm>(key: K, part: Partial<CoursesSectionsForm[K]>) {
    onChange({ ...value, [key]: { ...value[key], ...part } });
  }

  return (
    <>
      <Section legend="C1 · Hero details">
        <TextField label="Who is it for (subhead)" full value={value.c1.whoIsItFor} locked={locked} onChange={(v) => patch("c1", { whoIsItFor: v })} />
        <TextField label="Who-for note" full value={value.c1.whoForNote} locked={locked} onChange={(v) => patch("c1", { whoForNote: v })} />
        <TextField label="Type value" value={value.c1.typeValue} locked={locked} placeholder="e.g. Certificate" onChange={(v) => patch("c1", { typeValue: v })} />
        <TextField label="Filling badge" value={value.c1.fillingBadge} locked={locked} placeholder="e.g. Filling Fast" onChange={(v) => patch("c1", { fillingBadge: v })} />
        <TextField label="Location note" full value={value.c1.locationNote} locked={locked} onChange={(v) => patch("c1", { locationNote: v })} />
        <TextField label="Booking URL" type="url" full value={value.c1.bookingUrl} locked={locked} placeholder="https://…" onChange={(v) => patch("c1", { bookingUrl: v })} />
        <p className="ops-uni1-note ops-uni1-field--full">
          Partner logo sits left of the hero photo (under Filling Fast). Upload or pick from the media library.
        </p>
        <MediaImagePicker
          label="Partner logo (left of photo)"
          url={value.c1.partnerLogo}
          alt=""
          locked={locked}
          mediaAssets={mediaAssets}
          onChange={({ url }) => patch("c1", { partnerLogo: url })}
        />
      </Section>

      <Section legend="C2 · Who's it for / Topics">
        <TextField label="Left title" value={value.c2.leftTitle} locked={locked} onChange={(v) => patch("c2", { leftTitle: v })} />
        <TextField label="Right title" value={value.c2.rightTitle} locked={locked} onChange={(v) => patch("c2", { rightTitle: v })} />
        <AreaField label="Left bodies" hint="one per line" value={value.c2.leftBodies} locked={locked} onChange={(v) => patch("c2", { leftBodies: v })} />
        <AreaField label="Right bodies" hint="one per line" value={value.c2.rightBodies} locked={locked} onChange={(v) => patch("c2", { rightBodies: v })} />
      </Section>

      <Section legend="C3 · Program description">
        <p className="ops-uni1-note ops-uni1-field--full">
          Uses the Description field above — no separate copy. Saved into the Program Description card.
        </p>
      </Section>

      <Section legend="C4 · Program highlights">
        <TextField label="Section title" full value={value.c4.title} locked={locked} onChange={(v) => patch("c4", { title: v })} />
        <StringRows noun="Highlight" numbered items={value.c4.items} locked={locked} onChange={(items) => patch("c4", { items })} />
      </Section>

      <Section legend="C5 · Checklist">
        <TextField label="Chip text" full value={value.c5.chip} locked={locked} onChange={(v) => patch("c5", { chip: v })} />
        <StringRows noun="Check" items={value.c5.items} locked={locked} onChange={(items) => patch("c5", { items })} />
      </Section>

      <Section legend="C6 · Brochure">
        <p className="ops-uni1-note ops-uni1-field--full">
          Fill the title to show the download plate. Choose File / brochure above for a working Download button;
          without a PDF the button stays disabled (same as the lab).
        </p>
        <TextField label="Title" value={value.c6.title} locked={locked} onChange={(v) => patch("c6", { title: v })} />
        <TextField label="Subtitle" value={value.c6.subtitle} locked={locked} onChange={(v) => patch("c6", { subtitle: v })} />
        <TextField label="Button label" value={value.c6.ctaLabel} locked={locked} onChange={(v) => patch("c6", { ctaLabel: v })} />
        <TextField label="Badge label" value={value.c6.badgeLabel} locked={locked} onChange={(v) => patch("c6", { badgeLabel: v })} />
      </Section>

      <Section legend="C7 · Awarding body">
        <TextField label="Title" full value={value.c7.title} locked={locked} onChange={(v) => patch("c7", { title: v })} />
        <AreaField label="Body" value={value.c7.body} locked={locked} onChange={(v) => patch("c7", { body: v })} />
        <p className="ops-uni1-note ops-uni1-field--full">
          Pictures: left small box = Logo · right pink area = Photo. Upload or pick from the media library (same as
          Image above). Save Draft, then Preview.
        </p>
        <MediaImagePicker
          label="Logo (left box)"
          url={value.c7.logoUrl}
          alt={value.c7.logoAlt}
          locked={locked}
          mediaAssets={mediaAssets}
          onChange={({ url, alt }) => patch("c7", { logoUrl: url, logoAlt: alt })}
        />
        <TextField
          label="Logo alt text"
          full
          value={value.c7.logoAlt}
          locked={locked}
          placeholder="Partner / college logo"
          onChange={(v) => patch("c7", { logoAlt: v })}
        />
        <MediaImagePicker
          label="Photo (right pink area)"
          url={value.c7.photoUrl}
          alt={value.c7.photoAlt}
          locked={locked}
          mediaAssets={mediaAssets}
          onChange={({ url, alt }) => patch("c7", { photoUrl: url, photoAlt: alt })}
        />
        <TextField
          label="Photo alt text"
          full
          value={value.c7.photoAlt}
          locked={locked}
          placeholder="People or campus photo"
          onChange={(v) => patch("c7", { photoAlt: v })}
        />
        <div className="ops-uni1-field ops-uni1-field--full ops-uni1-rows">
          {value.c7.facts.map((fact, index) => (
            <div className="ops-uni1-row ops-uni1-row--wide" key={index}>
              <TextField
                label={`Fact ${index + 1} title`}
                value={fact.title}
                locked={locked}
                onChange={(v) => patch("c7", { facts: value.c7.facts.map((f, i) => (i === index ? { ...f, title: v } : f)) })}
              />
              <TextField
                label={`Fact ${index + 1} body (optional)`}
                value={fact.body}
                locked={locked}
                onChange={(v) => patch("c7", { facts: value.c7.facts.map((f, i) => (i === index ? { ...f, body: v } : f)) })}
              />
              <RemoveButton
                label={`Remove fact ${index + 1}`}
                locked={locked}
                onClick={() => patch("c7", { facts: value.c7.facts.filter((_, i) => i !== index) })}
              />
            </div>
          ))}
          <div>
            <AddButton label="Add fact" locked={locked} onClick={() => patch("c7", { facts: [...value.c7.facts, { title: "", body: "" }] })} />
          </div>
        </div>
        <AreaField label="Rankings title lines" hint="one per line" rows={2} value={value.c7.rankingTitleLines} locked={locked} onChange={(v) => patch("c7", { rankingTitleLines: v })} />
        <AreaField label="Rankings bodies" hint="one per line" value={value.c7.rankingBodies} locked={locked} onChange={(v) => patch("c7", { rankingBodies: v })} />
        <AreaField label="Accreditation title lines" hint="one per line" rows={2} value={value.c7.accreditationTitleLines} locked={locked} onChange={(v) => patch("c7", { accreditationTitleLines: v })} />
        <p className="ops-uni1-note ops-uni1-field--full">Accreditation logos (up to 6). Upload each mark.</p>
        {value.c7.accreditationLogos.map((logo, index) => (
          <div className="ops-uni1-field ops-uni1-field--full" key={index}>
            <MediaImagePicker
              label={`Accreditation logo ${index + 1}`}
              url={logo.url}
              alt={logo.alt}
              locked={locked}
              mediaAssets={mediaAssets}
              onChange={({ url, alt }) =>
                patch("c7", {
                  accreditationLogos: value.c7.accreditationLogos.map((row, i) => (i === index ? { url, alt } : row))
                })
              }
            />
            <TextField
              label={`Logo ${index + 1} alt`}
              full
              value={logo.alt}
              locked={locked}
              onChange={(v) =>
                patch("c7", {
                  accreditationLogos: value.c7.accreditationLogos.map((row, i) => (i === index ? { ...row, alt: v } : row))
                })
              }
            />
            <RemoveButton
              label={`Remove logo ${index + 1}`}
              locked={locked}
              onClick={() => patch("c7", { accreditationLogos: value.c7.accreditationLogos.filter((_, i) => i !== index) })}
            />
          </div>
        ))}
        {value.c7.accreditationLogos.length < 6 ? (
          <div>
            <AddButton
              label="Add accreditation logo"
              locked={locked}
              onClick={() => patch("c7", { accreditationLogos: [...value.c7.accreditationLogos, { url: "", alt: "" }] })}
            />
          </div>
        ) : null}
      </Section>

      <Section legend="C8 · How to apply">
        <TextField label="Title" value={value.c8.title} locked={locked} onChange={(v) => patch("c8", { title: v })} />
        <TextField label="Subtitle" value={value.c8.subtitle} locked={locked} onChange={(v) => patch("c8", { subtitle: v })} />
        <AreaField label="Eligibility chips" hint="one per line" value={value.c8.eligibilityChips} locked={locked} onChange={(v) => patch("c8", { eligibilityChips: v })} />
        <div className="ops-uni1-field ops-uni1-field--full ops-uni1-rows">
          {value.c8.steps.map((step, index) => {
            const setStep = (part: Partial<typeof step>) =>
              patch("c8", { steps: value.c8.steps.map((s, i) => (i === index ? { ...s, ...part } : s)) });
            return (
              <div className="ops-uni1-row ops-uni1-row--wide" key={index}>
                <TextField label={`Option 1 step ${index + 1} title`} value={step.title} locked={locked} onChange={(v) => setStep({ title: v })} />
                <TextField label={`Step ${index + 1} body (text before link)`} value={step.body} locked={locked} onChange={(v) => setStep({ body: v })} />
                <TextField label={`Step ${index + 1} link text (optional)`} value={step.linkText} locked={locked} onChange={(v) => setStep({ linkText: v })} />
                <TextField label={`Step ${index + 1} link URL`} value={step.linkHref} locked={locked} placeholder="https://… or #anchor" onChange={(v) => setStep({ linkHref: v })} />
                <TextField label={`Step ${index + 1} text after link`} value={step.bodyAfter} locked={locked} onChange={(v) => setStep({ bodyAfter: v })} />
                <RemoveButton
                  label={`Remove step ${index + 1}`}
                  locked={locked}
                  onClick={() => patch("c8", { steps: value.c8.steps.filter((_, i) => i !== index) })}
                />
              </div>
            );
          })}
          <div>
            <AddButton
              label="Add step"
              locked={locked}
              onClick={() =>
                patch("c8", {
                  steps: [...value.c8.steps, { title: "", body: "", linkText: "", linkHref: "", bodyAfter: "" }]
                })
              }
            />
          </div>
        </div>
        <TextField label="Option 2 title" full value={value.c8.option2.title} locked={locked} onChange={(v) => patch("c8", { option2: { ...value.c8.option2, title: v } })} />
        <TextField label="Option 2 text before link" value={value.c8.option2.bodyBefore} locked={locked} onChange={(v) => patch("c8", { option2: { ...value.c8.option2, bodyBefore: v } })} />
        <TextField label="Option 2 link text" value={value.c8.option2.linkText} locked={locked} onChange={(v) => patch("c8", { option2: { ...value.c8.option2, linkText: v } })} />
        <TextField label="Option 2 link URL" value={value.c8.option2.linkHref} locked={locked} placeholder="https://… or #anchor" onChange={(v) => patch("c8", { option2: { ...value.c8.option2, linkHref: v } })} />
        <TextField label="Option 2 text after link" value={value.c8.option2.bodyAfter} locked={locked} onChange={(v) => patch("c8", { option2: { ...value.c8.option2, bodyAfter: v } })} />
      </Section>

      <Section legend="C9 · Certificate">
        <TextField label="Headline" full value={value.c9.headline} locked={locked} onChange={(v) => patch("c9", { headline: v })} />
        <AreaField label="Why it matters checks" hint="one per line" value={value.c9.checks} locked={locked} onChange={(v) => patch("c9", { checks: v })} />
        <p className="ops-uni1-note ops-uni1-field--full">Mock certificate card (right side of C9).</p>
        <TextField label="Ticket label" value={value.c9.mockTicket} locked={locked} onChange={(v) => patch("c9", { mockTicket: v })} />
        <TextField label="Program title on card" full value={value.c9.mockProgramTitle} locked={locked} onChange={(v) => patch("c9", { mockProgramTitle: v })} />
        <TextField label="Name label" value={value.c9.mockNameLabel} locked={locked} onChange={(v) => patch("c9", { mockNameLabel: v })} />
        <TextField label="Name value" value={value.c9.mockNameValue} locked={locked} onChange={(v) => patch("c9", { mockNameValue: v })} />
        <TextField label="Date label" value={value.c9.mockDateLabel} locked={locked} onChange={(v) => patch("c9", { mockDateLabel: v })} />
        <TextField label="Date value" value={value.c9.mockDateValue} locked={locked} onChange={(v) => patch("c9", { mockDateValue: v })} />
        <TextField label="Awarding label" value={value.c9.mockAwardingLabel} locked={locked} onChange={(v) => patch("c9", { mockAwardingLabel: v })} />
        <TextField label="Awarding value" value={value.c9.mockAwardingValue} locked={locked} onChange={(v) => patch("c9", { mockAwardingValue: v })} />
        <MediaImagePicker
          label="Seal image"
          url={value.c9.mockSealUrl}
          alt="Certificate seal"
          locked={locked}
          mediaAssets={mediaAssets}
          onChange={({ url }) => patch("c9", { mockSealUrl: url })}
        />
      </Section>

      <Section legend="C10 · #higlights (photo strip)">
        <p className="ops-uni1-note ops-uni1-field--full">
          Up to 7 photos in one horizontal strip (lab design). Preview usually fits about 4 on screen — scroll the
          photo row right to see the rest. Empty slots are skipped.
        </p>
        <TextField label="Title" full value={value.c10.title} locked={locked} placeholder="#higlights" onChange={(v) => patch("c10", { title: v })} />
        <AreaField label="Lead lines" hint="up to 4 lines" rows={4} value={value.c10.leadLines} locked={locked} onChange={(v) => patch("c10", { leadLines: v })} />
        <TextField label="Place" full value={value.c10.place} locked={locked} placeholder="e.g. Washington, D.C." onChange={(v) => patch("c10", { place: v })} />
        <AreaField label="Note" rows={3} value={value.c10.note} locked={locked} onChange={(v) => patch("c10", { note: v })} />
        {value.c10.photos.map((photo, index) => (
          <div className="ops-uni1-field ops-uni1-field--full" key={index}>
            <MediaImagePicker
              label={`Photo ${index + 1} of 7`}
              url={photo.url}
              alt={photo.alt}
              locked={locked}
              mediaAssets={mediaAssets}
              onChange={({ url, alt }) =>
                patch("c10", {
                  photos: value.c10.photos.map((row, i) => (i === index ? { url, alt } : row))
                })
              }
            />
            <TextField
              label={`Photo ${index + 1} alt`}
              full
              value={photo.alt}
              locked={locked}
              onChange={(v) =>
                patch("c10", {
                  photos: value.c10.photos.map((row, i) => (i === index ? { ...row, alt: v } : row))
                })
              }
            />
          </div>
        ))}
      </Section>

      <Section legend="C11 · Enrollment fee">
        <TextField label="Title" value={value.c11.title} locked={locked} onChange={(v) => patch("c11", { title: v })} />
        <TextField label="Subtitle" value={value.c11.subtitle} locked={locked} onChange={(v) => patch("c11", { subtitle: v })} />
        <TextField label="Price" value={value.c11.price} locked={locked} placeholder="e.g. GBP 1500" onChange={(v) => patch("c11", { price: v })} />
        <TextField label="Access badge" value={value.c11.accessBadge} locked={locked} onChange={(v) => patch("c11", { accessBadge: v })} />
        <TextField label="Early bird" full value={value.c11.earlyBird} locked={locked} onChange={(v) => patch("c11", { earlyBird: v })} />
        <AreaField label="Breakdown — left column" hint="one per line; add ' || bold tail' to bold the end" value={value.c11.breakdownLeft} locked={locked} onChange={(v) => patch("c11", { breakdownLeft: v })} />
        <AreaField label="Breakdown — right column" hint="one per line" value={value.c11.breakdownRight} locked={locked} onChange={(v) => patch("c11", { breakdownRight: v })} />
        <TextField label="Housing label" value={value.c11.housingLabel} locked={locked} onChange={(v) => patch("c11", { housingLabel: v })} />
        <TextField label="Housing price" value={value.c11.housingPrice} locked={locked} onChange={(v) => patch("c11", { housingPrice: v })} />
        <TextField label="Housing note" value={value.c11.housingApprox} locked={locked} onChange={(v) => patch("c11", { housingApprox: v })} />
        <TextField label="Payment title" value={value.c11.paymentTitle} locked={locked} onChange={(v) => patch("c11", { paymentTitle: v })} />
        <AreaField label="Payment body" rows={2} value={value.c11.paymentBody} locked={locked} onChange={(v) => patch("c11", { paymentBody: v })} />
      </Section>

      <Section legend="C12 · Learner testimonials">
        <TextField label="Lead" value={value.c12.lead} locked={locked} onChange={(v) => patch("c12", { lead: v })} />
        <TextField label="Badge" value={value.c12.badge} locked={locked} onChange={(v) => patch("c12", { badge: v })} />
        <TextField label="Intro before bold" full value={value.c12.bodyBefore} locked={locked} onChange={(v) => patch("c12", { bodyBefore: v })} />
        <TextField label="Bold #PGS" value={value.c12.bodyBoldPgs} locked={locked} onChange={(v) => patch("c12", { bodyBoldPgs: v })} />
        <TextField label="Intro mid" full value={value.c12.bodyMid} locked={locked} onChange={(v) => patch("c12", { bodyMid: v })} />
        <TextField label="Bold 3x line" full value={value.c12.bodyBold3x} locked={locked} onChange={(v) => patch("c12", { bodyBold3x: v })} />
        <TextField label="And" value={value.c12.bodyAnd} locked={locked} onChange={(v) => patch("c12", { bodyAnd: v })} />
        <TextField label="Bold skills" full value={value.c12.bodyBoldSkills} locked={locked} onChange={(v) => patch("c12", { bodyBoldSkills: v })} />
        <TextField label="Intro after" full value={value.c12.bodyAfter} locked={locked} onChange={(v) => patch("c12", { bodyAfter: v })} />
        <MediaImagePicker
          label="Learner photo (shared on cards)"
          url={value.c12.photoUrl}
          alt={value.c12.photoAlt}
          locked={locked}
          mediaAssets={mediaAssets}
          onChange={({ url, alt }) => patch("c12", { photoUrl: url, photoAlt: alt })}
        />
        <TextField label="Photo alt" full value={value.c12.photoAlt} locked={locked} onChange={(v) => patch("c12", { photoAlt: v })} />
        <AreaField label="Mobile quote (shared)" rows={3} value={value.c12.quoteMob} locked={locked} onChange={(v) => patch("c12", { quoteMob: v })} />
        {value.c12.quotes.map((quote, index) => (
          <AreaField
            key={index}
            label={`Card ${index + 1} desk quote`}
            rows={3}
            value={quote}
            locked={locked}
            onChange={(v) => patch("c12", { quotes: value.c12.quotes.map((q, i) => (i === index ? v : q)) })}
          />
        ))}
        <TextField label="Bio name" value={value.c12.bioName} locked={locked} onChange={(v) => patch("c12", { bioName: v })} />
        <TextField label="Bio role" value={value.c12.bioRole} locked={locked} onChange={(v) => patch("c12", { bioRole: v })} />
        <TextField label="Bio location" value={value.c12.bioLocation} locked={locked} onChange={(v) => patch("c12", { bioLocation: v })} />
      </Section>

      <Section legend="C13 · FAQ">
        <TextField label="Heading" full value={value.c13.heading} locked={locked} onChange={(v) => patch("c13", { heading: v })} />
        {value.c13.tabs.map((tab, tabIndex) => (
          <div className="ops-uni1-field ops-uni1-field--full ops-uni1-rows" key={tab.id}>
            <TextField
              label={`Tab ${tabIndex + 1} label`}
              full
              value={tab.label}
              locked={locked}
              onChange={(v) =>
                patch("c13", {
                  tabs: value.c13.tabs.map((t, i) => (i === tabIndex ? { ...t, label: v } : t))
                })
              }
            />
            {tab.items.map((item, itemIndex) => (
              <div className="ops-uni1-row ops-uni1-row--wide" key={itemIndex}>
                <TextField
                  label={`Q${itemIndex + 1}`}
                  full
                  value={item.question}
                  locked={locked}
                  onChange={(v) =>
                    patch("c13", {
                      tabs: value.c13.tabs.map((t, i) =>
                        i === tabIndex
                          ? {
                              ...t,
                              items: t.items.map((it, j) => (j === itemIndex ? { ...it, question: v } : it))
                            }
                          : t
                      )
                    })
                  }
                />
                <AreaField
                  label={`A${itemIndex + 1}`}
                  rows={2}
                  value={item.answer}
                  locked={locked}
                  onChange={(v) =>
                    patch("c13", {
                      tabs: value.c13.tabs.map((t, i) =>
                        i === tabIndex
                          ? {
                              ...t,
                              items: t.items.map((it, j) => (j === itemIndex ? { ...it, answer: v } : it))
                            }
                          : t
                      )
                    })
                  }
                />
                <RemoveButton
                  label={`Remove Q${itemIndex + 1}`}
                  locked={locked}
                  onClick={() =>
                    patch("c13", {
                      tabs: value.c13.tabs.map((t, i) =>
                        i === tabIndex ? { ...t, items: t.items.filter((_, j) => j !== itemIndex) } : t
                      )
                    })
                  }
                />
              </div>
            ))}
            <div>
              <AddButton
                label={`Add question to ${tab.label || `tab ${tabIndex + 1}`}`}
                locked={locked}
                onClick={() =>
                  patch("c13", {
                    tabs: value.c13.tabs.map((t, i) =>
                      i === tabIndex ? { ...t, items: [...t.items, { question: "", answer: "" }] } : t
                    )
                  })
                }
              />
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
