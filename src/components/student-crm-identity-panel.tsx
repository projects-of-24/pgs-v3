"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Tags, UserRound, UsersRound } from "lucide-react";
import {
  CRM_STAGES,
  CRM_STAGE_LABELS,
  CRM_STREAMS,
  crmTargetYearOptions,
  derivedCrmGroups,
  type StudentCrmProfile,
  type StudentCrmTag
} from "@/lib/operations-student-crm";
import { registryPlanTone } from "@/lib/operations-student-registry";

type Props = {
  profile: StudentCrmProfile;
  availableTags: StudentCrmTag[];
  canCreateTags: boolean;
};

export function StudentCrmIdentityPanel({ profile, availableTags, canCreateTags }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const unusedTags = availableTags.filter((tag) => !profile.tags.some((attached) => attached.id === tag.id));
  const derived = derivedCrmGroups(profile);

  async function mutate(body: Record<string, unknown>, success: string) {
    setBusy(true);
    setError(false);
    setStatus("Saving…");
    const response = await fetch(`/api/staff/students/${profile.id}/crm`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    const result = (await response.json()) as { message?: string };
    if (!response.ok) {
      setError(true);
      setStatus(result.message ?? "Unable to save CRM details.");
      setBusy(false);
      return;
    }
    setStatus(success);
    setBusy(false);
    router.refresh();
  }

  return (
    <section className="ops-stu2-card ops-stu2-crm" aria-labelledby="student-crm-heading">
      <header className="ops-stu2-card-head">
        <div className="ops-stu2-card-title">
          <span className="ops-stu2-card-icon" aria-hidden="true">
            <UserRound />
          </span>
          <h2 id="student-crm-heading">CRM identity</h2>
        </div>
        {profile.canMutate ? (
          <a className="ops-stu2-edit" href="#ops-stu2-crm-facts-form">
            <Pencil aria-hidden="true" />
            Edit
          </a>
        ) : null}
      </header>

      <dl className="ops-stu2-facts">
        <div>
          <dt>PGS ID</dt>
          <dd>
            <code className="ops-stu2-pgs">{profile.pgsCode}</code>
          </dd>
        </div>
        <div>
          <dt>Name</dt>
          <dd>{profile.fullName}</dd>
        </div>
        <div>
          <dt>Stream</dt>
          <dd>{profile.stream || "Not set"}</dd>
        </div>
        <div>
          <dt>Target year</dt>
          <dd>{profile.targetYear ?? "Not set"}</dd>
        </div>
        <div>
          <dt>Plan</dt>
          <dd>
            <span className={registryPlanTone(profile.plan) === "accent" ? "ops-stu2-pill ops-stu2-pill--accent" : "ops-stu2-pill"}>
              {profile.plan}
            </span>
          </dd>
        </div>
        <div>
          <dt>Assigned handler</dt>
          <dd>{profile.mentorName}</dd>
        </div>
        <div>
          <dt>CRM stage</dt>
          <dd>
            <span className="ops-stu2-pill">{CRM_STAGE_LABELS[profile.stage]}</span>
          </dd>
        </div>
        <div>
          <dt>Join date</dt>
          <dd>{profile.joinedAt}</dd>
        </div>
        <div>
          <dt>Join year</dt>
          <dd>{profile.joinYear}</dd>
        </div>
      </dl>

      <div className="ops-stu2-group">
        <h3>
          <UsersRound aria-hidden="true" />
          Derived groups
        </h3>
        <ul aria-label="Derived CRM groups" className="ops-stu2-tag-list">
          {derived.map((group) => (
            <li key={group}>
              <span className="ops-stu2-pill">{group}</span>
            </li>
          ))}
        </ul>
        <p className="ops-stu2-note">Premium, stream, target year, and handler groups are derived. They are not manual tags.</p>
      </div>

      <div className="ops-stu2-group">
        <h3>
          <Tags aria-hidden="true" />
          Manual tags
        </h3>
        {profile.tags.length ? (
          <ul aria-label="Manual student tags" className="ops-stu2-tag-list">
            {profile.tags.map((tag) => (
              <li key={tag.id} className="ops-stu2-tag-row">
                <span className="ops-stu2-pill">#{tag.name}</span>
                {profile.canMutate ? (
                  <button
                    className="ops-stu2-link-danger"
                    disabled={busy}
                    onClick={() => mutate({ intent: "detach", tag_id: tag.id }, `${tag.name} removed.`)}
                    type="button"
                  >
                    Remove {tag.name}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p className="ops-stu2-note">No manual tags attached.</p>
        )}
      </div>

      {profile.canMutate ? (
        <form
          id="ops-stu2-crm-facts-form"
          className="ops-stu2-form ops-stu2-form--facts"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            void mutate(
              {
                intent: "facts",
                stream: String(form.get("stream") ?? ""),
                target_year: String(form.get("target_year") ?? ""),
                stage: String(form.get("stage") ?? "")
              },
              "CRM facts saved."
            );
          }}
        >
          <label className="ops-stu2-field" htmlFor="crm-stream">
            <span>Stream</span>
            <select className="ops-stu2-control" defaultValue={profile.stream ?? ""} id="crm-stream" name="stream">
              <option value="">Not set</option>
              {CRM_STREAMS.map((stream) => (
                <option key={stream} value={stream}>
                  {stream}
                </option>
              ))}
            </select>
          </label>
          <label className="ops-stu2-field" htmlFor="crm-target-year">
            <span>Target year</span>
            <select
              className="ops-stu2-control"
              defaultValue={profile.targetYear ? String(profile.targetYear) : ""}
              id="crm-target-year"
              name="target_year"
            >
              <option value="">Not set</option>
              {crmTargetYearOptions(undefined, profile.targetYear).map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label className="ops-stu2-field" htmlFor="crm-stage">
            <span>CRM stage</span>
            <select className="ops-stu2-control" defaultValue={profile.stage} id="crm-stage" name="stage">
              {CRM_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {CRM_STAGE_LABELS[stage]}
                </option>
              ))}
            </select>
          </label>
          <button className="ops-stu2-text-action" disabled={busy} type="submit">
            Save CRM facts
          </button>
        </form>
      ) : null}

      {profile.canMutate && unusedTags.length ? (
        <form
          className="ops-stu2-form"
          onSubmit={(event) => {
            event.preventDefault();
            const tagId = String(new FormData(event.currentTarget).get("tag_id") ?? "");
            if (tagId) void mutate({ intent: "attach", tag_id: tagId }, "Tag attached.");
          }}
        >
          <label className="ops-stu2-field" htmlFor="crm-attach-tag">
            <span>Attach tag</span>
            <select className="ops-stu2-control" id="crm-attach-tag" name="tag_id" required>
              <option value="">Choose a tag</option>
              {unusedTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </label>
          <button className="ops-stu2-btn ops-stu2-btn--brand" disabled={busy} type="submit">
            Attach tag
          </button>
        </form>
      ) : null}

      {canCreateTags ? (
        <form
          className="ops-stu2-form ops-stu2-form--create-tag"
          onSubmit={(event) => {
            event.preventDefault();
            const name = String(new FormData(event.currentTarget).get("name") ?? "");
            if (name) void mutate({ intent: "create_tag", name }, `${name} created.`);
            event.currentTarget.reset();
          }}
        >
          <label className="ops-stu2-field ops-stu2-field--grow" htmlFor="crm-create-tag">
            <span className="ops-stu2-visually-hidden">Create tag</span>
            <input
              autoComplete="off"
              className="ops-stu2-control"
              id="crm-create-tag"
              maxLength={40}
              minLength={2}
              name="name"
              placeholder="Enter a tag name"
              required
              type="text"
            />
          </label>
          <button className="ops-stu2-btn ops-stu2-btn--brand" disabled={busy} type="submit">
            Create tag
          </button>
        </form>
      ) : null}

      {status ? (
        <p className={error ? "ops-stu2-status ops-stu2-status--error" : "ops-stu2-status"} role="status">
          {status}
        </p>
      ) : null}
    </section>
  );
}
