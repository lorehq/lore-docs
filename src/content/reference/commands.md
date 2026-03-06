---
title: "Commands"
---

Slash commands are skills with `user-invocable: true` in their SKILL.md frontmatter. They live in `.lore/AGENTIC/SKILLS/<name>/SKILL.md` and are projected into platform-native formats by `lore generate`.

## Available commands

All commands are subcommands of `/lore`:

| Command | Description |
|---------|-------------|
| `/lore` | Show available subcommands. |
| `/lore status` | Show instance health — version, hooks, skills, fieldnotes, active work. |
| `/lore memory` | Start/stop the local Docker memory engine (semantic search + hot memory). |
| `/lore memory burn` | Promote hot cache facts to the persistent databank. |

## CLI commands

These are run directly from the terminal, not as slash commands:

| Command | Description |
|---------|-------------|
| `lore` | Launch the TUI dashboard. |
| `lore init [name]` | Scaffold a new Lore project. |
| `lore generate [--platforms <list>] [--destructive]` | Run composition and projection (merge AGENTIC content → platform files). Reads enabled platforms from config if `--platforms` omitted. `--destructive` force-overwrites harness content and removes stale entries. |
| `lore memory [start\|stop\|status]` | Docker memory engine lifecycle. |
| `lore status` | Instance health check. |
| `lore hook <name>` | Hook handler (called by platforms, not users). |
| `lore version` | Print version. |
| `lore help` | Print help. |

## Commands requiring Docker memory engine

`lore memory` manages the memory engine directly (`~/.lore/docker-compose.yml`). `/lore memory burn` reads from the hot cache. `/lore status` reports memory engine health.

## System skills

System skills (prefixed `lore-*`) ship in `~/.lore/.harness/SKILLS/` and are managed by the binary. They are idempotent — created on first run, not overwritten on subsequent runs (allowing operator customization). Use `lore generate --destructive` to reset to binary defaults.

| Skill | Description |
|-------|-------------|
| `lore` | Unified `/lore` slash command — routes to status, memory, burn, defrag, repair. |
| `lore-delegate` | Delegation protocol — the Subagent Envelope Contract for upward intelligence flow. |
| `lore-databank-create-fieldnote` | Create a fieldnote for a non-obvious environmental snag. |
| `lore-databank-create-runbook` | Create a multi-step operational runbook. |
| `lore-databank-create-brainstorm` | Create a brainstorm draft (folder-per-brainstorm). |
| `lore-databank-create-note` | Create a quick note (single file). |
| `lore-databank-create-initiative` | Create a strategic initiative (top-level work item). |
| `lore-databank-create-epic` | Create an epic nested under an initiative. |
| `lore-databank-create-item` | Create a deliverable item nested under an epic. |
| `lore-databank-archive` | Archive session logs to `MEMORY/DATABANK/workspace/projects/`. |
| `lore-semantic-search` | Query semantic search endpoints when Fetch/WebFetch blocks localhost. |

## Example skills

These operator-managed skills are generated from the template on `lore init` as examples. They live in `~/.lore/AGENTIC/SKILLS/` and can be modified or removed freely.

| Skill | Description |
|-------|-------------|
| `prompt-engineering-principles` | Hardened prompt engineering principles for writing agent prompts. |
| `coding-principles` | Coding principles — surface confusion early, write less code, prove it works. |
| `documentation-principles` | Documentation principles — don't duplicate, keep it short, don't let docs rot. |

## System agents

| Agent | Description |
|-------|-------------|
| `lore-databank-agent` | DATABANK gatekeeper — enforces structure, routes content, creates with schema. |
