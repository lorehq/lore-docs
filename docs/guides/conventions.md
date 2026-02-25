---
title: Conventions
---

# Conventions

Conventions are behavioral rules that shape how your agent writes code, docs, and knowledge entries. They live in `docs/context/conventions/` as markdown files — one file per domain.

## How They Work

Conventions reach your agent through four channels:

1. **Session start** — all convention files load into the session banner.
2. **Per-prompt reminder** — a hook lists convention names before every user message (e.g. `Conventions: coding, docs, security`).
3. **Write-time reinforcement** — a guard fires before every file write or edit, injecting relevant convention principles based on the target path.
4. **Agent initiative** — the agent can read any convention file at any time.

The guard reads bold principle lines (`**Like this.**`) from the convention files.

For the path-routing table and default convention details, see [Configuration Reference](../reference/configuration.md).

### Platform Support

Convention enforcement works on all three platforms. See [Platform Overview](../reference/platforms/index.md) for the mechanism comparison.

## Creating Custom Conventions

Add a markdown file to `docs/context/conventions/`:

```markdown
# Diagrams

## 1. Keep Diagrams as Code

**Mermaid over images. Text over binaries.**

- Use Mermaid syntax for flowcharts, sequence diagrams, and architecture views.
- Only use image files when the diagram can't be expressed as code.
- Store diagram source alongside the rendered output.

## 2. Label Everything

**Unlabeled boxes are unlabeled confusion.**

- Every node, edge, and swimlane gets a descriptive label.
- Use consistent naming with the codebase (service names, API names).
```

### Format Requirements

- **Numbered sections** help scanning. Match the pattern of the default conventions.
- **File name** becomes the menu label. Use descriptive kebab-case: `api-design.md`, `email-drafting.md`, `diagrams.md`. The agent uses the file name to decide whether to load the convention, so prefer self-explanatory names (`email-drafting.md`) over vague ones (`comms.md`).

## See Also

- [Configuration Reference](../reference/configuration.md) — path-routing table and default conventions list
- [Platform Overview](../reference/platforms/index.md) — how convention enforcement differs per agent
- [Working with Lore](working-with-lore.md) — day-to-day interaction patterns
