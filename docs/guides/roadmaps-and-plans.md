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

## Format

See [Example Roadmap](../examples/roadmap.md) and [Example Plan](../examples/plan.md) for templates with full YAML frontmatter.

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

Only for standalone plans that reference a roadmap — not for plans nested under a roadmap folder (the folder location already implies the relationship).

## Creating

Ask Lore to create work items conversationally:

- *"Create a roadmap for cloud migration"*
- *"Create a plan for the networking setup"* — Lore will determine whether to nest it under a roadmap or keep it standalone
- *"Start a brainstorm about auth options"* — for exploratory discussions and ADRs

## Status Workflow

```
active → on-hold → active (resumed)
       ↘ archived (move folder to archive/)
```

- **active**: Shown in the session banner every session
- **on-hold**: Shown in the session banner with `[ON HOLD]` suffix
- **completed**: Finished; keep `status: completed` and move folder to `archive/`
- **cancelled**: Stopped/abandoned; keep `status: cancelled` and move folder to `archive/`

### Allowed Status Values

Use exactly these values for roadmap/plan frontmatter:

- `active`
- `on-hold`
- `completed`
- `cancelled`

`archived` is a folder location, not a status value.

## Archiving

To archive: move the folder to the parent's `archive/` subdirectory — `docs/work/roadmaps/<slug>/archive/` for roadmap plans, `docs/work/plans/archive/` for standalone plans. `/lore-capture` prompts this step.

See also: [Example Brainstorm](../examples/brainstorm.md)
