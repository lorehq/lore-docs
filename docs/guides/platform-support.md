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
| MCP tools | Yes (`lore_search`, `lore_read`, `lore_health` via `.mcp.json`) | Yes (`lore_check_in`, `lore_context`, `lore_write_guard`) | No |
| MEMORY.md guard | Yes | Yes | Yes |
| Knowledge capture reminders | Yes | Yes | Yes |
| Bash escalation tracking | Yes | Yes | Yes |
| Context path guide | Yes | No | Yes |
| Compaction resilience | SessionStart re-fires | Flag + re-orientation on next cmd/MCP | Compacting event re-injects |
| Hook event logging | Yes | Yes | Yes |
| Instructions | `CLAUDE.md` | `.cursor/rules/lore-*.mdc` | `.lore/instructions.md` |

## Hook Directories

```
.lore/hooks/        → Claude Code (subprocess per event)
.cursor/hooks/      → Cursor (subprocess per event)
.cursor/mcp/        → Cursor MCP server (long-lived process)
.opencode/plugins/  → OpenCode (long-lived ESM modules)
.lore/lib/          → Shared logic (all platforms)
```

See [Hook Architecture](hook-architecture.md) for module layout, lifecycle diagrams, and the full event reference.

### Claude Code

Config: `.claude/settings.json`. Seven hooks cover all lifecycle events: session banner, per-prompt reminder, context path guide, memory guard, convention guard, framework guard, and knowledge tracker. `SessionStart` re-fires after compaction so the full banner is always present.

#### Foundry / Bedrock / Vertex Deployments

When running Claude Code through a cloud provider deployment (Microsoft Foundry, AWS Bedrock, Google Vertex), worker tier model selection requires additional env vars in `~/.claude/settings.json`. Claude Code resolves the short aliases (`haiku`, `sonnet`, `opus`) through these env vars at runtime:

```json
{
  "env": {
    "CLAUDE_CODE_USE_FOUNDRY": "1",
    "ANTHROPIC_FOUNDRY_RESOURCE": "your-resource-name",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "your-haiku-deployment-name",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "your-sonnet-deployment-name",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "your-opus-deployment-name"
  }
}
```

All three `ANTHROPIC_DEFAULT_*_MODEL` vars must be set. Without them, Claude Code uses its own hardcoded model IDs which may not match your deployment names, causing workers to either fall back to the orchestrator's model or return a 404 from the deployment API.

See [Configuration: subagentDefaults](configuration.md#subagentdefaults) for how to set matching deployment names in `.lore/config.json`.

### Cursor

Config: `.cursor/hooks.json` + `.cursor/mcp.json`. Six hooks plus an MCP server (`lore_check_in`, `lore_context`, `lore_write_guard`) that compensates for Cursor's missing per-prompt hook. Hooks that Cursor silences (`afterFileEdit`, `postToolUseFailure`, `preCompact`) write state to disk; `beforeShellExecution` and the MCP server read it back. **Gaps:** No per-prompt hook, no context path guide.

### OpenCode

Config: `opencode.json` + `.opencode/plugins/`. Six long-lived ESM plugins with system prompt injection via `chat.system.transform`. The first LLM call injects the full banner (~14K chars); subsequent calls are silent (no injection). After context compaction, the full banner is restored on the next call.

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
| `docs/context/conventions/system/` | Yes | — |
| `docs/knowledge/runbooks/system/` | Yes | — |
| `docs/` (except `system/` subdirs), `mkdocs.yml`, `.lore/config.json` | — | Yes |

`.lore/config.json` controls subagent model defaults — see [Configuration: subagentDefaults](configuration.md#subagentdefaults).

See [Cross-Repo Workflow](cross-repo-workflow.md) for how `/lore-link` generates and gitignores config files in work repos.
