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
status: active        # active | on-hold
created: 2026-01-15
updated: 2026-02-06
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
status: active        # active | on-hold
created: 2026-02-01
updated: 2026-02-06
summary: <one-liner>      # optional — shown in session banner
roadmap: <roadmap-slug>   # optional — standalone plans only
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

Ask Lore to create work items conversationally:

- *"Create a roadmap for cloud migration"*
- *"Create a plan for the networking setup"* — Lore will determine whether to nest it under a roadmap or keep it standalone
- *"Start a brainstorm about auth options"* — for exploratory discussions and ADRs

## Status Workflow

```
active → on-hold → active (resumed)
       ↘ archived (move folder to archive/)
```

- **active**: Shown in session startup output every session
- **on-hold**: Shown at startup with `[ON HOLD]` suffix
- **completed**: Finished; keep `status: completed` and move folder to `archive/`
- **cancelled**: Stopped/abandoned; keep `status: cancelled` and move folder to `archive/`

### Allowed Status Values

Use exactly these values for roadmap/plan frontmatter:

- `active`
- `on-hold`
- `completed`
- `cancelled`

`archived` is a folder location, not a status value.

## Session Startup Integration

Active and on-hold roadmaps and plans appear in the session banner at startup. The agent sees them at the start of every session without the operator needing to repeat them.

## Archiving

To archive a completed or cancelled item, move its folder to the parent's `archive/` subdirectory. `/lore-capture` checks for completed items and suggests archiving as part of its review. Roadmap plans archive with their roadmap. Standalone plans move to `plans/archive/`.

See also: [Example Brainstorm](../examples/brainstorm.md)
