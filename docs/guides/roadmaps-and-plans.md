---
title: Roadmaps & Plans
---

# Roadmaps, Plans & Notes

Lore tracks strategic and tactical work through **roadmaps** (multi-phase initiatives), **plans** (specific implementation tasks), and **notes** (lightweight quick capture). All are operator-initiated — Lore maintains them but asks before updating.

## Comparison

| Aspect | Roadmap | Plan | Note |
|--------|---------|------|------|
| **Scope** | Strategic initiative (weeks-months) | Tactical task (days-weeks) | Single observation or idea |
| **Purpose** | Track overall progress across phases | Describe implementation approach | Quick capture during deep work |
| **Structure** | Folder with `index.md` | Folder with `index.md` | Single flat file |
| **Banner** | Active/on-hold shown | Active/on-hold shown | Not shown |
| **Creation** | `/lore-create-roadmap` | `/lore-create-plan` | `/lore-create-note` |

## Format

See [Example Roadmap](../examples/roadmap.md), [Example Plan](../examples/plan.md), and [Example Note](../examples/note.md) for templates with full YAML frontmatter.

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

Only for standalone plans that reference a roadmap — not for plans nested under a roadmap folder.

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

Use these four values in frontmatter: `active`, `on-hold`, `completed`, `cancelled`. Note: `archived` is a folder location, not a status value. The framework reads `active` and `on-hold` for banner display. `completed` and `cancelled` are conventions for archiving workflows, not validated by framework logic.

## Archiving

To archive: move the folder to the parent's `archive/` subdirectory — `docs/work/roadmaps/<slug>/archive/` for roadmap plans, `docs/work/plans/archive/` for standalone plans. `/lore-capture` prompts this step.

## Notes

Notes are lightweight capture — a single markdown file in `docs/work/notes/` with minimal frontmatter (`title`, `status`, `created`). No folder structure, no banner inclusion.

Use notes for:

- Bugs hit during deep work that you'll come back to later
- Ideas or observations worth preserving but not worth a plan
- Quick "I saw this, recording it" captures

Notes use two status values: `open` (default) and `resolved`. Resolved notes stay in place for searchable context — don't delete them.

See [Example Note](../examples/note.md) for the template.

See also: [Example Brainstorm](../examples/brainstorm.md)
