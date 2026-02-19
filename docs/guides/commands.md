---
title: Commands
---

# Commands

Lore uses slash commands to trigger common operations. Type them in your agent's chat.

In OpenCode, these commands are provided by markdown files under `.opencode/commands/`.

## Knowledge Capture

| Command | What it does |
|---------|-------------|
| `/lore-capture` | Review session work, capture skills, update registries, validate consistency |
| `/lore-consolidate` | Deep health check — find stale items, semantic overlaps, knowledge drift |

`/lore-capture` is the primary end-of-session command. It prompts the agent to extract gotchas into skills, update context docs, and run consistency checks.

Per-prompt reminders also reinforce knowledge capture (`New context? → docs/knowledge/`) and work tracking (`Active work? → update progress`).

`/lore-consolidate` is a deeper pass for periodic maintenance — finding duplicate skills, stale documentation, and opportunities to simplify.

## Work Management

Ask Lore to create roadmaps, plans, or brainstorms conversationally — for example, *"Create a roadmap for cloud migration"* or *"Start a brainstorm about auth options."* Lore handles folder structure, frontmatter, and validation.

Completed or cancelled items are archived by moving their folder to the parent's `archive/` directory.

See [Roadmaps & Plans](roadmaps-and-plans.md) for details on format and workflow.

## Instance Management

| Command | What it does |
|---------|-------------|
| `/lore-status` | Show Lore version, hook health, skill/agent counts, active work |
| `/lore-update` | Pull latest framework files from GitHub without touching operator content |

`/lore-status` is the operator's diagnostic — verify Lore is loaded and healthy.

`/lore-update` syncs hooks, scripts, and `lore-*` skills/agents from the latest release. Operator-owned content (skills and agents without the `lore-` prefix, docs, and work items) is never touched. See [Platform Support: Sync Boundaries](platform-support.md#sync-boundaries) for the full breakdown.

## Cross-Repo Linking

| Command | What it does |
|---------|-------------|
| `/lore-link <target>` | Link a work repo — hooks fire from hub |
| `/lore-link --unlink <target>` | Remove link from a work repo |
| `/lore-link --list` | Show linked repos with stale detection |
| `/lore-link --refresh` | Regenerate configs in all linked repos |

`/lore-link` lets you open a work repo in your IDE with full file tree, git, and search while Lore hooks still fire from the hub. Run `/lore-link --refresh` after `/lore-update` to regenerate configs with the latest hooks.

See [IDE Workflow: lore link](cross-repo-workflow.md#ide-workflow-lore-link) for full details.

## Docs UI

| Command | What it does |
|---------|-------------|
| `/lore-ui` | Manage docs UI lifecycle (start/stop/status), preferring Docker with local mkdocs fallback |

The docs UI lets you browse your knowledge base (skills, context docs, runbooks, work items) in a web UI.
