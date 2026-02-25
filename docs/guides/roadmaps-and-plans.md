---
title: Roadmaps & Plans
---

# Roadmaps, Plans, Notes & Brainstorms

Lore tracks strategic and tactical work through **roadmaps** (multi-phase initiatives), **plans** (specific implementation tasks), **notes** (lightweight quick capture), and **brainstorms** (exploratory discussions and decision records). All are operator-initiated — Lore maintains them but asks before updating.

## Comparison

| Aspect | Roadmap | Plan | Note | Brainstorm |
|--------|---------|------|------|------------|
| **Scope** | Strategic initiative (weeks-months) | Tactical task (days-weeks) | Single observation or idea | Exploratory discussion or ADR |
| **Purpose** | Track overall progress across phases | Describe implementation approach | Quick capture during deep work | Document thinking and trade-offs |
| **Structure** | Folder with `index.md` | Folder with `index.md` | Single flat file | Folder with `index.md` |
| **Banner** | Active/on-hold shown | Active/on-hold shown | Not shown | Not shown |
| **Creation** | `/lore-create-roadmap` | `/lore-create-plan` | `/lore-create-note` | `/lore-create-brainstorm` |

## Format

See [Example Roadmap](../examples/roadmap.md), [Example Plan](../examples/plan.md), [Example Note](../examples/note.md), and [Example Brainstorm](../examples/brainstorm.md) for templates with full YAML frontmatter.

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

Use these four values in frontmatter: `active`, `on-hold`, `completed`, `cancelled`. Note: `archived` is a folder location, not a status value. The harness reads `active` and `on-hold` for banner display. `completed` and `cancelled` are conventions for archiving workflows, not validated by harness logic.

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

## Brainstorms

Brainstorms capture exploratory discussions, architectural decisions, and design trade-offs for future reference. They document thinking — not work progress. Each brainstorm is a folder in `docs/work/brainstorms/` with an `index.md`. Brainstorms are always standalone — never nested under roadmaps.

Use brainstorms for:

- Architectural decision records (ADRs)
- Design trade-off analysis before committing to an approach
- Exploratory discussions worth preserving for context

Brainstorms have no `status` field and don't appear in the session banner. They're reference material, not tracked work.

See [Example Brainstorm](../examples/brainstorm.md) for the template.
