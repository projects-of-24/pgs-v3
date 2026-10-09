# Ops Access — Premium & mentor controls — ACC1 + ACC1-T LOCKED

**LOCKED** (owner QC 2026-10-02). Do not restyle or rewire without a new named gate.

Companions: [`OPS-POST-LOGIN-UI-PASSES.md`](./OPS-POST-LOGIN-UI-PASSES.md) · [`OPS-LOCKED-PAGES.md`](./OPS-LOCKED-PAGES.md) · [`OPS-STUDENT-REGISTRY-STU1.md`](./OPS-STUDENT-REGISTRY-STU1.md) · RB-02

| Item | Value |
|---|---|
| Pass | **ACC1** + **ACC1-T** |
| Status | **LOCKED** (owner QC passed) |
| URL | **`/admin/access`** (Students → Premium & mentor controls) |
| Visual | Premium form · Mentor form · history cards |
| Tabs | **Assignments** \| **History** — tablist pinned under subtitle |
| Assignments | Natural card height · **no card scrollbar** |
| History | Cards fill remaining height · timeline scrolls **inside** only · **no pagination** |
| Height | Ops product shell **100dvh** |
| Padding | Card inset restored with `section.ops-acc-card` `!important` (Hostinger section kill) |
| Back | **← Back to Students** → `/ops/students` |
| Buttons | Confirm Premium = **Ops blue** · Save assignment = dark |
| Permission | `premium.manage` |
| APIs | Existing `/api/staff/premium` + `/api/staff/assignments` unchanged |

**Preview:** [http://localhost:7000/admin/access](http://localhost:7000/admin/access)
