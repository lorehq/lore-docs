---
title: "Commands"
---

Slash commands are skills with `user-invocable: true` in their SKILL.md frontmatter. They live in `.lore/skills/<name>/SKILL.md` and are projected into platform-native formats by the projector.

## Available commands

| Command | Description |
|---------|-------------|
| `/lore-docker` | Start, stop, or inspect the local Lore sidecar (semantic search and memory). |
| `/lore-field-repair` | Guided workflow for diagnosing and fixing harness bugs in deployed instances. |
| `/lore-memprint` | Promote hot cache facts to the persistent knowledge base. |
| `/lore-status` | Show Lore instance health -- version, hooks, skills, fieldnotes, active work. |
| `/lore-update` | Update Lore harness files to the latest version. |

## Commands requiring Docker sidecar

`/lore-docker` manages the sidecar directly. `/lore-memprint` reads from the hot cache. `/lore-status` reports sidecar status when `docker.search` is configured.

## Internal skills

The following skills are not directly invocable but are triggered by the harness or other skills:

| Skill | Description |
|-------|-------------|
| `lore-create-fieldnote` | Create a fieldnote when an operation hit a non-obvious snag. |
| `lore-delegate` | Delegation protocol enforcing the Subagent Envelope Contract. |
| `lore-semantic-search` | Query semantic search endpoints when Fetch/WebFetch blocks localhost. |
| `lore-prompt-engineering` | Hardened prompt engineering principles for writing agent prompts. |
