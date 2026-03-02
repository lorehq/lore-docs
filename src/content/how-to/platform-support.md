---
title: Platform Support
---

# Platform Support

Lore supports three coding-agent platforms: Claude Code, Cursor, and OpenCode.

The knowledge base is shared across all three. Skills, agents, context docs, and work tracking all persist across platforms.

## Feature Matrix

| Feature | Claude Code | Cursor | OpenCode |
|---------|:-----------:|:------:|:--------:|
| Session banner | Yes | Yes | Yes |
| Per-prompt reinforcement | Yes (conversation history) | No (compensated by MCP tools) | Yes (system prompt, compact reminder) |
| MCP tools | No | Yes (`lore_check_in`, `lore_context`, `lore_write_guard`) | No |
| MEMORY.md guard | Yes | Yes | Yes |
| Knowledge capture reminders | Yes | Yes | Yes |
| Bash escalation tracking | Yes | Yes | Yes |
| Context path guide | Yes | No | Yes |
| Compaction resilience | SessionStart re-fires | Flag + re-orientation on next cmd/MCP | Compacting event re-injects |

## Hook Directories

```
hooks/              → Claude Code (subprocess per event)
.cursor/hooks/      → Cursor (subprocess per event)
.cursor/mcp/        → Cursor MCP server (long-lived process)
.opencode/plugins/  → OpenCode (long-lived ESM modules)
lib/                → Shared logic (all platforms)
```

### Claude Code

- **Config:** `.claude/settings.json`
- **Events:** `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`

`SessionStart` re-fires after compaction, so the full banner is always present.

### Cursor

- **Config:** `.cursor/hooks.json` + `.cursor/mcp.json`
- **Events:** `sessionStart`, `beforeShellExecution`, `preCompact`, `postToolUseFailure`, `afterFileEdit`, `beforeReadFile`, `preToolUse`
- **MCP tools:** `lore_check_in` (nudges), `lore_context` (knowledge map), `lore_write_guard` (rule reminders)

Cursor does not display output from `afterFileEdit`, `postToolUseFailure`, or `preCompact` to the agent. Those hooks write state to disk; `beforeShellExecution` and the MCP server read the state back when they fire.

### OpenCode

- **Config:** `opencode.json` + `.opencode/plugins/`
- **Events:** `SessionInit`, `experimental.chat.system.transform`, `experimental.session.compacting`, `tool.execute.before`, `tool.execute.after`

`chat.system.transform` runs on every LLM call. The first call injects the full banner; subsequent calls inject a compact one-line reminder. Full banner re-injects after context compaction.

## Behavior Notes

- Subagents are intentionally scoped and do not receive full orchestrator banner context. They load `docs/context/agent-rules.md`, `docs/context/rules/`, and relevant skills before implementation.
- Per-turn reminders nudge delegation plus planning: task list for multi-step work, parallel subagents for independent branches, sequential flow for dependencies.
- OpenCode slash menu entries come from `.opencode/commands/` (not from `.lore/skills/` directly).

## Linked Repos

`/lore-link` generates lightweight configs in work repos that point hooks back to the hub via `LORE_HUB` env var. Generated files are added to `.gitignore` automatically. All three platforms have full parity in linked repos.

See [Working Across Repos: IDE Workflow](working-across-repos.md#ide-workflow-lore-link) for usage and generated files.

## Source of Truth

For decision history and rationale, see:

- `docs/knowledge/environment/platform-support.md`
