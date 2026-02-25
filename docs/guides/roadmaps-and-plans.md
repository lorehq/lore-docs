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

**Folder nesting** — location implies relationship. A plan folder placed inside a roadmap folder is automatically associated with that roadmap.

**Frontmatter link** — a standalone plan can reference a roadmap by slug. This is for plans that live in the standalone plans directory but belong to a roadmap conceptually.

Tell your agent which approach you want — it handles the structure.

## Archiving

When a roadmap or plan is complete, tell your agent to archive it. It will move the folder to the appropriate `archive/` subdirectory and update the status.

For the full status workflow spec (`active → on-hold → archived`), see [Configuration Reference](../reference/configuration.md).

## Notes

Use notes for:

- Bugs hit during deep work that you'll come back to later
- Ideas or observations worth preserving but not worth a plan
- Quick "I saw this, recording it" captures

Notes use two status values: `open` (default) and `resolved`. Resolved notes stay in place for searchable context — don't delete them.

## Brainstorms

Use brainstorms for:

- Architectural decision records (ADRs)
- Design trade-off analysis before committing to an approach
- Exploratory discussions worth preserving for context

## See Also

- [Configuration Reference](../reference/configuration.md) — comparison table, status workflow spec, and frontmatter field reference
- [Working with Lore](working-with-lore.md) — day-to-day interaction patterns
