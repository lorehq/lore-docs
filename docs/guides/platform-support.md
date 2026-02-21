---
title: Platform Support
---

# Platform Support

Lore supports three coding agent platforms. All share the same knowledge base — skills, agents, docs, and work tracking persist across platforms.

## Feature Matrix

| Feature | Claude Code | Cursor | OpenCode |
|---------|:-----------:|:------:|:--------:|
| Session banner | Yes | Yes | Yes |
| Per-prompt reinforcement | Yes (conversation history) | No (compensated by MCP tools) | Yes (system prompt, zero accumulation) |
| MCP tools | No | Yes (`lore_check_in`, `lore_context`, `lore_write_guard`) | No |
| MEMORY.md guard | Yes | Yes | Yes |
| Knowledge capture reminders | Yes | Yes | Yes |
| Bash escalation tracking | Yes | Yes | Yes |
| Context path guide | Yes | No | Yes |
| Compaction resilience | SessionStart re-fires | Flag + re-orientation on next cmd/MCP | Compacting event re-injects |
| Hook event logging | Yes | Yes | Yes |
| Instructions | `CLAUDE.md` | `.cursor/rules/lore-*.mdc` | `.lore/instructions.md` |

## Hook Directories

```
hooks/              → Claude Code (subprocess per event)
.cursor/hooks/      → Cursor (subprocess per event)
.cursor/mcp/        → Cursor MCP server (long-lived process)
.opencode/plugins/  → OpenCode (long-lived ESM modules)
lib/                → Shared logic (all platforms)
```

See [Hook Architecture](hook-architecture.md) for module layout and lifecycle diagrams.

### Claude Code

Full hook coverage across all lifecycle events.

- **Config:** `.claude/settings.json`
- **7 hooks:** session banner, per-prompt reminder, context path guide, memory guard, convention guard, framework guard, knowledge tracker

See [Hook Architecture](hook-architecture.md) for the full event reference.

`SessionStart` re-fires after compaction, so the full banner is always present.

### Cursor

Hooks plus an MCP server to compensate for missing per-prompt events.

- **Config:** `.cursor/hooks.json` + `.cursor/mcp.json`
- **6 hooks:** session banner, capture nudge (beforeShellExecution), compaction flag, failure tracker, knowledge tracker, memory guard
- **MCP tools:** `lore_check_in` (nudges), `lore_context` (knowledge map), `lore_write_guard` (convention reminders)

See [Hook Architecture](hook-architecture.md) for the full event reference.

Cursor does not display output from `afterFileEdit`, `postToolUseFailure`, or `preCompact` to the agent. Those hooks write state to disk; `beforeShellExecution` and the MCP server read the state back when they fire.

**Gaps:** No per-prompt hook, no context path guide.

### OpenCode

Long-lived ESM plugins with system prompt injection.

- **Config:** `opencode.json` + `.opencode/plugins/`
- **6 plugins:** session banner + system transform, context path guide, memory guard, convention guard, framework guard, knowledge tracker

See [Hook Architecture](hook-architecture.md) for the full event reference.

`chat.system.transform` fires on every LLM call. The first call injects the full banner (~14K chars); subsequent calls inject a compact reminder (~200 chars). After context compaction, the full banner is restored on the next call.

## Setup

All platforms activate automatically after `npx create-lore`.

| Platform | What loads |
|----------|-----------|
| **Claude Code** | `CLAUDE.md` + `.claude/settings.json` |
| **Cursor** | `.cursor/rules/lore-*.mdc` + `.cursor/hooks.json` + `.cursor/mcp.json` |
| **OpenCode** | `opencode.json` + `.opencode/plugins/` + `.opencode/commands/` |

`CLAUDE.md` is generated from `.lore/instructions.md`. Cursor `.mdc` rules are generated from multiple sources (instructions, agent-rules, conventions, agent-registry). Run `bash .lore/scripts/sync-platform-skills.sh` after editing any of those source files to keep platform copies in sync.

## Sync Boundaries

`/lore-update` and `sync-framework.sh` overwrite framework infrastructure (`.lore/hooks/`, `.lore/lib/`, `.lore/scripts/`, `.opencode/`, `.cursor/hooks/`) and `lore-*` prefixed skills/agents. Operator content is never touched.

| Category | Synced | Operator-owned |
|----------|:------:|:--------------:|
| `lore-*` skills/agents | Yes | — |
| Operator skills/agents | — | Yes |
| `.lore/hooks/`, `.lore/lib/`, `.lore/scripts/` | Yes | — |
| `docs/`, `mkdocs.yml`, `.lore/config.json` | — | Yes |

`.lore/config.json` controls subagent model defaults — see [Configuration: subagentDefaults](configuration.md#subagentdefaults).

See [Cross-Repo Workflow](cross-repo-workflow.md) for how `/lore-link` generates and gitignores config files in work repos.
