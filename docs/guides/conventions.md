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

## Adding Custom Conventions

Tell your agent you want a new convention and describe the rules. For example: "Create a diagrams convention: prefer Mermaid over images, label every node and edge, store diagram source alongside rendered output."

One thing worth knowing: the file name becomes the convention's identity — the agent uses it to decide when to load the convention automatically. Prefer self-explanatory names (`email-drafting`, `api-design`) over vague ones (`comms`). Mention your preferred name when you ask.

## See Also

- [Configuration Reference](../reference/configuration.md) — path-routing table and default conventions list
- [Platform Overview](../reference/platforms/index.md) — how convention enforcement differs per agent
- [Working with Lore](working-with-lore.md) — day-to-day interaction patterns
