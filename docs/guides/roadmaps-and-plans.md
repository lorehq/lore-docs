---
title: Roadmaps & Plans
---

# Roadmaps & Plans

Lore tracks strategic and tactical work through **roadmaps** (multi-phase initiatives) and **plans** (specific implementation tasks). Both are operator-initiated — Lore maintains them but asks before updating.

## Roadmaps vs Plans

| Aspect | Roadmap | Plan |
|--------|---------|------|
| **Scope** | Strategic initiative (weeks-months) | Tactical task (days-weeks) |
| **Purpose** | Track overall progress across phases | Describe implementation approach |
| **Quantity** | One per initiative | Many per roadmap, or standalone |

## Roadmap Format

```yaml
---
title: <Initiative Name>
status: active        # active | completed | on-hold | cancelled
phase: 2/3
summary: <Current Phase>
target: 2026-06-30
---
```

See [Example Roadmap](../examples/roadmap.md)

## Plan Format

```yaml
---
title: <Plan Name>
status: active        # active | completed | on-hold | cancelled
roadmap: <roadmap-slug>   # optional
target: 2026-02-28
---
```

See [Example Plan](../examples/plan.md)

## Hierarchy

Plans can nest under roadmaps in two ways:

**Folder nesting** (location implies relationship):
```
docs/work/roadmaps/<initiative>/plans/<plan>/index.md
```

**Frontmatter link** (standalone plan referencing a roadmap):
```yaml
roadmap: <roadmap-slug>
```

## Creating

```
/lore-create-roadmap "<Initiative Name>"
/lore-create-plan "<Plan Name>"          # Lore asks if it belongs to a roadmap
/lore-create-brainstorm "<Topic>"        # Exploratory discussions, ADRs
```

## Status Workflow

```
active → completed
       ↘ on-hold → active (resumed)
       ↘ cancelled
```

- **active**: Shown in session startup output every session
- **on-hold**: Shown but marked as paused
- **completed / cancelled**: Archived, no longer shown at startup

## Session Startup Integration

Active roadmaps and plans appear automatically at session start, giving Lore immediate context without operator prompting.

## Archiving

When status reaches `completed` or `cancelled`, Lore asks if you'd like to archive. Roadmap plans archive with their roadmap. Standalone plans move to `plans/archive/`.

See also: [Example Brainstorm](../examples/brainstorm.md)
