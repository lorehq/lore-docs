---
title: Roadmaps & Plans
---

# Roadmaps, Plans, Notes & Brainstorms

Lore tracks strategic and tactical work through **roadmaps** (multi-phase initiatives), **plans** (specific implementation tasks), **notes** (lightweight quick capture), and **brainstorms** (exploratory discussions and decision records). All are operator-initiated — Lore maintains them but asks before updating.

For a comparison table of roadmaps vs. plans vs. notes vs. brainstorms, see [Configuration Reference](../reference/configuration.md).

## Creating

Ask Lore to create work items conversationally:

- *"Create a roadmap for cloud migration"*
- *"Create a plan for the networking setup"* — Lore will determine whether to nest it under a roadmap or keep it standalone
- *"Start a brainstorm about auth options"* — for exploratory discussions and ADRs

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

## Archiving

To archive: move the folder to the parent's `archive/` subdirectory — `docs/work/roadmaps/<slug>/archive/` for roadmap plans, `docs/work/plans/archive/` for standalone plans. `/lore-capture` prompts this step.

For the full status workflow spec (`active → on-hold → archived`), see [Configuration Reference](../reference/configuration.md).

## Notes

Use notes for:

- Bugs hit during deep work that you'll come back to later
- Ideas or observations worth preserving but not worth a plan
- Quick "I saw this, recording it" captures

Notes use two status values: `open` (default) and `resolved`. Resolved notes stay in place for searchable context — don't delete them.

See [Example Note](../reference/examples/note.md) for the template.

## Brainstorms

Use brainstorms for:

- Architectural decision records (ADRs)
- Design trade-off analysis before committing to an approach
- Exploratory discussions worth preserving for context

See [Example Brainstorm](../reference/examples/brainstorm.md) for the template.

## See Also

- [Configuration Reference](../reference/configuration.md) — comparison table, status workflow spec, and frontmatter field reference
- [Working with Lore](working-with-lore.md) — day-to-day interaction patterns
- [Command Reference](../reference/commands.md) — `/lore-create-roadmap`, `/lore-create-plan`, `/lore-create-note`, `/lore-create-brainstorm`
