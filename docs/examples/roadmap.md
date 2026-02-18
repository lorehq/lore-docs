---
title: Example Roadmap
---

# Example Roadmap

Roadmaps are strategic progress-tracking documents for multi-phase initiatives spanning weeks to months.

## Template

**File:** `docs/work/roadmaps/<slug>/index.md`

```yaml
---
title: <Initiative Name>
status: active
created: 2026-01-15
updated: 2026-02-06
phase: 2/3
summary: <Current phase name>
target: 2026-06-30
---
```

```markdown
# <Initiative Name>

## Overview

<1-2 sentences: what this initiative accomplishes and why.>

## Phases

### Phase 1: <Name>
**Status:** Completed (2026-01-15 to 2026-01-31)
- <Completed deliverable>
- <Completed deliverable>

### Phase 2: <Name>
**Status:** In Progress (2026-02-01 to 2026-03-31)
- <Work item>
- <Work item>

**Plans:**
- [<Plan Name>](plans/<slug>/index.md)

### Phase 3: <Name>
**Status:** Planned (2026-04-01 to 2026-06-30)
- <Work item>
- <Work item>

## Success Criteria

- <Measurable outcome>
- <Measurable outcome>

## Risks

| Risk | Mitigation |
|------|------------|
| <What could go wrong> | <How to prevent or recover> |
```

## Key Concepts

**YAML Frontmatter** — machine-readable metadata parsed by the session start hook. Active and on-hold roadmaps display at session start.

**Status values:** `active` (shown at startup), `on-hold` (shown at startup with `[ON HOLD]` suffix). Completed or cancelled items are archived by moving their folder to the parent's `archive/` directory.

**Nested plans** — plans nest under roadmaps in folder structure (`docs/work/roadmaps/<slug>/plans/<plan-slug>/`). Standalone plans can optionally reference a roadmap via the `roadmap:` frontmatter field.

**Supporting docs** — each roadmap gets its own folder. Research, diagrams, and decision records live alongside `index.md`.

## Creating Roadmaps

Ask Lore to create a roadmap — for example: *"Create a roadmap for cloud migration."* Lore handles the folder structure, frontmatter, and validation.

## See Also

- [Roadmaps & Plans Guide](../guides/roadmaps-and-plans.md)
- [Example Plan](plan.md)
- [Example Brainstorm](brainstorm.md)
