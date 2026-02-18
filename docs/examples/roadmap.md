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
- [<Plan Name>](../plans/<slug>/index.md)

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

**YAML Frontmatter** — machine-readable metadata parsed by the session start hook. Active roadmaps display at session start.

**Status values:** `active` (shown at startup), `on-hold`, `completed`, `cancelled` (archived).

**Nested plans** — plans can nest under roadmaps in folder structure, or reference via frontmatter `roadmap:` field.

**Supporting docs** — each roadmap gets its own folder. Research, diagrams, and decision records live alongside `index.md`.

## Creating Roadmaps

```
/lore-create-roadmap "<Initiative Name>"
```

## See Also

- [Roadmaps & Plans Guide](../guides/roadmaps-and-plans.md)
- [Example Plan](plan.md)
- [Example Brainstorm](brainstorm.md)
