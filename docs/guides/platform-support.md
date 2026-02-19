---
title: Platform Support
---

# Platform Support

Lore supports three coding agent platforms. All share the same knowledge base — skills, agents, docs, and work tracking persist across platforms.

Behavior adapts to each platform's hook surface while keeping the same outcomes: orientation, capture nudges, and memory guardrails.

## Feature Matrix

| Feature | Claude Code | Cursor | OpenCode |
|---------|:-----------:|:------:|:--------:|
| Session banner | Yes | Yes | Yes |
| Per-prompt reinforcement | Yes (conversation history) | No | Yes (system prompt, zero accumulation) |
| MCP tools | No | Yes (`lore_check_in`, `lore_context`) | No |
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

All hooks call shared `lib/` functions. Adapters are thin — they translate between each platform's wire format and the shared core. See [How It Works: Hook Architecture](../how-it-works.md#hook-architecture) for the full module layout and lifecycle diagrams.

### Claude Code

Full hook coverage across all lifecycle events.

- **Config:** `.claude/settings.json`
- **5 hooks:** session banner, per-prompt reminder, context path guide, memory guard, knowledge tracker
- **Events:** `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`

`SessionStart` re-fires after compaction, so the full banner is always present.

### Cursor

Hooks plus an MCP server to compensate for missing per-prompt events.

- **Config:** `.cursor/hooks.json` + `.cursor/mcp.json`
- **6 hooks:** session banner, capture nudge (beforeShellExecution), compaction flag, failure tracker, knowledge tracker, memory guard
- **Events:** `sessionStart`, `beforeShellExecution`, `preCompact`, `postToolUseFailure`, `afterFileEdit`, `beforeReadFile`, `preToolUse`
- **MCP tools:** `lore_check_in` (nudges, every 2-3 commands), `lore_context` (knowledge map, on-demand)

Cursor ignores output from `afterFileEdit`, `postToolUseFailure`, and `preCompact`. These hooks write state to disk; `beforeShellExecution` and the MCP server read it back when they fire.

**Gaps:** No per-prompt hook, no context path guide.

### OpenCode

Long-lived ESM plugins with system prompt injection.

- **Config:** `opencode.json` + `.opencode/plugins/`
- **4 plugins:** session banner + system transform, context path guide, memory guard, knowledge tracker
- **Events:** `SessionInit`, `experimental.chat.system.transform`, `experimental.session.compacting`, `tool.execute.before`, `tool.execute.after`

`chat.system.transform` pushes the full banner into the system prompt on every LLM call. This replaces rather than accumulates — zero token growth regardless of conversation length.

## Setup

All platforms activate automatically after `npx create-lore`.

| Platform | What loads |
|----------|-----------|
| **Claude Code** | `CLAUDE.md` + `.claude/settings.json` |
| **Cursor** | `.cursor/rules/lore-*.mdc` + `.cursor/hooks.json` + `.cursor/mcp.json` |
| **OpenCode** | `opencode.json` + `.opencode/plugins/` + `.opencode/commands/` |

`CLAUDE.md` and `.cursor/rules/lore-*.mdc` are generated from `.lore/instructions.md`. Run `bash scripts/sync-platform-skills.sh` after editing instructions to keep them in sync.

## Sync Boundaries

`/lore-update` and `sync-framework.sh` only overwrite **framework-owned** content (the `lore-*` prefix). Operator content is never touched.

| Category | Synced | Operator-owned |
|----------|:------:|:--------------:|
| `lore-*` skills/agents | Yes | — |
| Operator skills/agents | — | Yes |
| `hooks/`, `lib/`, `scripts/` | Yes | — |
| `docs/`, `mkdocs.yml`, `.lore-config` | — | Yes |

Agent platform copies (`.claude/agents/`) resolve per-platform model fields at sync time. See [Configuration: subagentDefaults](configuration.md#subagentdefaults).

## Linked Repos

`/lore-link` generates lightweight configs in work repos that point hooks back to the hub.

| Platform | Generated files |
|----------|----------------|
| **Claude Code** | `.claude/settings.json` with `LORE_HUB` |
| **Cursor** | `.cursor/hooks.json` + `.cursor/mcp.json` + `.cursor/rules/lore-*.mdc` |
| **OpenCode** | `.opencode/plugins/` wrappers + `.opencode/commands/` + `opencode.json` |
| **All** | `CLAUDE.md`, `.cursorrules`, `.lore` marker |

Generated files are added to `.gitignore` automatically. Run `/lore-link --refresh` after `/lore-update` to regenerate with the latest hooks. See [Working Across Repos](cross-repo-workflow.md#ide-workflow-lore-link) for full details.
