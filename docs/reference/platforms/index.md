---
title: Platform Overview
---

# Platform Overview

Lore supports five coding agent platforms. All share the same knowledge base — skills, agents, docs, and work tracking persist across platforms.

## Platform Maturity

| Platform | Integration | Maturity |
|----------|-------------|----------|
| **Claude Code** | Hooks + `CLAUDE.md` + MCP | **Supported** — fully tested, cost/token evidence applies |
| **Gemini CLI** | Hooks + `GEMINI.md` + MCP | **Supported** — comprehensive hook parity |
| **Cursor** | Hooks + MCP server + `.mdc` rules | **Experimental** — core features work, undergoing optimization |
| **Windsurf** | `.windsurfrules` file | **Experimental** — relies on passive enforcement rules |
| **OpenCode** | ESM plugins + `opencode.json` | **Experimental** — core features work, uses experimental API hooks |

!!! info "What experimental means"
    Cursor and OpenCode integrations deliver the same core harness functions — session banner, knowledge capture, rule enforcement, delegation. They are marked experimental because:

    - **Cursor** compensates for missing hook events via an MCP server; this architecture is functional but undergoing optimization.
    - **OpenCode** uses experimental plugin API hooks (`experimental.chat.system.transform`, `experimental.session.compacting`) that may change in future OpenCode releases.

    The [cost evidence](../../evidence/index.md) was measured on Claude Code only. Cursor and OpenCode should see similar benefits from delegation and knowledge reuse, but this has not been independently verified.

## Feature Matrix

| Feature | Claude Code | Gemini CLI | Cursor | Windsurf | OpenCode |
|---------|:-----------:|:----------:|:------:|:--------:|:--------:|
| Session banner | Yes | Yes | Yes | Yes | Yes |
| Per-prompt reinforcement | Yes (conversation history) | Yes | No (compensated by `.mdc` rules and MCP tools) | No (compensated by `.windsurfrules`) | Yes (system prompt, zero accumulation) |
| MCP tools | Yes (`lore_search`, `lore_read`, `lore_health` via `.mcp.json`) | Yes (`lore_search`, `lore-cursor` via `.gemini/settings.json`) | Yes (`lore_check_in`, `lore_context`, `lore_write_guard`) | No | No |
| MEMORY.md guard | Yes | Yes | Yes | No | Yes |
| Knowledge capture reminders | Yes | Yes | Yes | No | Yes |
| Bash escalation tracking | Yes | Yes | Yes | No | Yes |
| Context path guide | Yes | Yes | No | No | Yes |
| Search guard | Yes | Yes | Yes (via `.mdc`) | Yes (via `.windsurfrules`) | Yes |
| Compaction resilience | SessionStart re-fires | PreCompress hook | Flag + re-orientation on next cmd/MCP | N/A (Cascade Flow) | Compacting event re-injects |
| Hook event logging | Yes | Yes | Yes | No | Yes |
| Instructions | `CLAUDE.md` | `GEMINI.md` | `.cursor/rules/lore-*.mdc` | `.windsurfrules` | `.lore/instructions.md` |

## Shared Architecture

Common infrastructure:

    .lore/lib/          → Shared logic (all platforms)
    .lore/hooks/        → Claude Code (subprocess per event)
    .gemini/settings.json → Gemini CLI (native hooks)
    .cursor/hooks/      → Cursor (subprocess per event)
    .cursor/mcp/        → Cursor MCP server (long-lived process)
    .opencode/plugins/  → OpenCode (long-lived ESM modules)

See [Hook Architecture](../../concepts/hook-architecture.md) for the shared lib reference, module layout, and lifecycle diagrams.

## Setup

All platforms activate automatically after `npx create-lore`.

| Platform | What loads |
|----------|-----------|
| **Claude Code** | `CLAUDE.md` + `.claude/settings.json` |
| **Gemini CLI** | `GEMINI.md` + `.gemini/settings.json` |
| **Cursor** | `.cursor/rules/lore-*.mdc` + `.cursor/hooks.json` + `.cursor/mcp.json` |
| **Windsurf** | `.windsurfrules` |
| **OpenCode** | `opencode.json` + `.opencode/plugins/` + `.opencode/commands/` |

`CLAUDE.md` and `GEMINI.md` are generated from `.lore/instructions.md`. Cursor `.mdc` rules are generated from multiple sources (instructions, agent-rules, rules, agent-registry). Your agent keeps platform copies in sync automatically — a capture pass handles this.

## Sync Boundaries

`/lore-update` and `sync-harness.sh` overwrite harness infrastructure (`.lore/hooks/`, `.lore/lib/`, `.lore/scripts/`, `.opencode/`, `.cursor/hooks/`) and `lore-*` prefixed skills/agents. Operator content is never touched.

| Category | Synced | Operator-owned |
|----------|:------:|:--------------:|
| `lore-*` skills/agents | Yes | — |
| Operator skills/agents | — | Yes |
| `.lore/hooks/`, `.lore/lib/`, `.lore/scripts/` | Yes | — |
| `docs/context/rules/system/` | Yes | — |
| `docs/knowledge/runbooks/system/` | Yes | — |
| `docs/` (except `system/` subdirs), `mkdocs.yml`, `.lore/config.json` | — | Yes |

`.lore/config.json` controls subagent model defaults — see [Configuration: subagentDefaults](../configuration.md#subagentdefaults).

See [Cross-Repo Workflow](../../guides/working-across-repos.md) for how `/lore-link` generates and gitignores config files in work repos.

## Per-Platform Details

- [Claude Code](claude-code.md) — 8 hooks, full lifecycle coverage, cost evidence baseline
- [Gemini CLI](gemini-cli.md) — 8 hooks, full lifecycle coverage, native MCP
- [Cursor](cursor.md) — 6 hooks + MCP server, dual architecture
- [Windsurf](windsurf.md) — single file global rules
- [OpenCode](opencode.md) — 7 ESM plugins, experimental API hooks
