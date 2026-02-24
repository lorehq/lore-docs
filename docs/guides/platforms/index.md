---
title: Platform Overview
---

# Platform Overview

Lore supports three coding agent platforms. All share the same knowledge base — skills, agents, docs, and work tracking persist across platforms.

## Platform Maturity

| Platform | Integration | Maturity |
|----------|-------------|----------|
| **Claude Code** | Hooks + `CLAUDE.md` + MCP | **Supported** — fully tested, cost/token evidence applies |
| **Cursor** | Hooks + MCP server + `.mdc` rules | **Experimental** — core features work, undergoing optimization |
| **OpenCode** | ESM plugins + `opencode.json` | **Experimental** — core features work, uses experimental API hooks |

!!! info "What experimental means"
    Cursor and OpenCode integrations deliver the same core harness functions — session banner, knowledge capture, convention enforcement, delegation. They are marked experimental because:

    - **Cursor** compensates for missing hook events via an MCP server; this architecture is functional but undergoing optimization.
    - **OpenCode** uses experimental plugin API hooks (`experimental.chat.system.transform`, `experimental.session.compacting`) that may change in future OpenCode releases.

    The [cost evidence](../../cost-evidence.md) was measured on Claude Code only. Cursor and OpenCode should see similar benefits from delegation and knowledge reuse, but this has not been independently verified.

## Feature Matrix

| Feature | Claude Code | Cursor | OpenCode |
|---------|:-----------:|:------:|:--------:|
| Session banner | Yes | Yes | Yes |
| Per-prompt reinforcement | Yes (conversation history) | No (compensated by MCP tools) | Yes (system prompt, zero accumulation) |
| MCP tools | Yes (`lore_search`, `lore_read`, `lore_health` via `.mcp.json`) | Yes (`lore_check_in`, `lore_context`, `lore_write_guard`) | No |
| MEMORY.md guard | Yes | Yes | Yes |
| Knowledge capture reminders | Yes | Yes | Yes |
| Bash escalation tracking | Yes | Yes | Yes |
| Context path guide | Yes | No | Yes |
| Search guard | Yes | No | No |
| Compaction resilience | SessionStart re-fires | Flag + re-orientation on next cmd/MCP | Compacting event re-injects |
| Hook event logging | Yes | Yes | Yes |
| Instructions | `CLAUDE.md` | `.cursor/rules/lore-*.mdc` | `.lore/instructions.md` |

## Shared Architecture

All platforms share common infrastructure:

- **`.lore/lib/`** — Shared JavaScript modules (banner assembly, config reader, tree builder, memory guard, tool classification, hook logging). Platform hooks are thin adapters that call into `lib/`.
- **`.lore/config.json`** — Central configuration (hook profile, subagent defaults, Docker search settings). Read by all platforms.
- **`docs/`** — Knowledge base, conventions, work tracking. Platform-agnostic.
- **`.lore/skills/`** and **`.lore/agents/`** — Canonical skill and agent definitions. Synced to platform-specific formats by `sync-platform-skills.sh`.

    .lore/lib/          → Shared logic (all platforms)
    .lore/hooks/        → Claude Code (subprocess per event)
    .cursor/hooks/      → Cursor (subprocess per event)
    .cursor/mcp/        → Cursor MCP server (long-lived process)
    .opencode/plugins/  → OpenCode (long-lived ESM modules)

See [Hook Architecture](../hook-architecture.md) for the module layout, lifecycle diagrams, and the shared lib reference.

## Setup

All platforms activate automatically after `npx create-lore`.

| Platform | What loads |
|----------|-----------|
| **Claude Code** | `CLAUDE.md` + `.claude/settings.json` |
| **Cursor** | `.cursor/rules/lore-*.mdc` + `.cursor/hooks.json` + `.cursor/mcp.json` |
| **OpenCode** | `opencode.json` + `.opencode/plugins/` + `.opencode/commands/` |

`CLAUDE.md` is generated from `.lore/instructions.md`. Cursor `.mdc` rules are generated from multiple sources (instructions, agent-rules, conventions, agent-registry). Run `bash .lore/scripts/sync-platform-skills.sh` after editing any of those source files to keep platform copies in sync.

## Sync Boundaries

`/lore-update` and `sync-harness.sh` overwrite harness infrastructure (`.lore/hooks/`, `.lore/lib/`, `.lore/scripts/`, `.opencode/`, `.cursor/hooks/`) and `lore-*` prefixed skills/agents. Operator content is never touched.

| Category | Synced | Operator-owned |
|----------|:------:|:--------------:|
| `lore-*` skills/agents | Yes | — |
| Operator skills/agents | — | Yes |
| `.lore/hooks/`, `.lore/lib/`, `.lore/scripts/` | Yes | — |
| `docs/context/conventions/system/` | Yes | — |
| `docs/knowledge/runbooks/system/` | Yes | — |
| `docs/` (except `system/` subdirs), `mkdocs.yml`, `.lore/config.json` | — | Yes |

`.lore/config.json` controls subagent model defaults — see [Configuration: subagentDefaults](../configuration.md#subagentdefaults).

See [Cross-Repo Workflow](../cross-repo-workflow.md) for how `/lore-link` generates and gitignores config files in work repos.

## Per-Platform Details

- [Claude Code](claude-code.md) — 8 hooks, full lifecycle coverage, cost evidence baseline
- [Cursor](cursor.md) — 6 hooks + MCP server, dual architecture
- [OpenCode](opencode.md) — 6 ESM plugins, experimental API hooks
