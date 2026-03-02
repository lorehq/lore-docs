---
title: Rules
---

# Rules

Rules are behavioral standards that shape how your agent writes code, docs, and knowledge entries. They live in `docs/context/rules/` as markdown files — one file per domain.

## How They Work

Rules reach your agent through four channels:

1. **Session start** — all rule files load into the session banner.
2. **Per-prompt reminder** — a hook lists rule names before every user message (e.g. `Rules: coding, docs, security`).
3. **Write-time reinforcement** — a guard fires before every file write or edit, injecting relevant rule principles based on the target path.
4. **Agent initiative** — the agent can read any rule file at any time.

The guard reads bold principle lines (`**Like this.**`) from the rule files.

For the path-routing table and default rule details, see [Configuration Reference](../reference/configuration.md).

### Platform Support

Rule enforcement works on all three platforms. See [Platform Overview](../reference/platforms/index.md) for the mechanism comparison.

## Adding Custom Rules

Tell your agent you want a new rule and describe the standards. For example: "Create a diagrams rule: prefer Mermaid over images, label every node and edge, store diagram source alongside rendered output."

One thing worth knowing: the file name becomes the rule's identity — the agent uses it to decide when to load the rule automatically. Prefer self-explanatory names (`email-drafting`, `api-design`) over vague ones (`comms`). Mention your preferred name when you ask.

## See Also

- [Configuration Reference](../reference/configuration.md) — path-routing table and default rules list
- [Platform Overview](../reference/platforms/index.md) — how rule enforcement differs per agent
- [Working with Lore](working-with-lore.md) — day-to-day interaction patterns
