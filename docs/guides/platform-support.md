---
title: Platform Support
---

# Platform Support

Lore supports three coding agent platforms. All share the same knowledge base — skills, agents, docs, and work tracking persist across platforms.

Behavior is intentionally not identical. Lore keeps the same outcomes (orientation, capture nudges, memory guardrails) while adapting to each platform's hook surface.

## Feature Matrix

| Feature | Description | Claude Code | Cursor | OpenCode |
|---------|-------------|:-----------:|:------:|:--------:|
| Session banner | Full project context on startup | Yes | Yes | Yes |
| Per-prompt reminder | Delegation + capture nudge on every interaction | Yes | No (MCP on-demand) | Yes (system prompt) |
| MCP tools | On-demand check-in and context retrieval | No | Yes (`lore_check_in`, `lore_context`) | No |
| MEMORY.md guard | Blocks access, redirects to Lore routes | Yes | Yes (reads + writes) | Yes |
| Knowledge capture reminders | Flags new knowledge after edits and commands | Yes | Yes | Yes |
| Bash escalation tracking | Warns when shell commands bypass tool safety | Yes | Yes | Yes |
| Context path guide | Shows directory tree before docs writes | Yes | No | Yes |
| Banner survives compaction | Re-injects banner when context is trimmed | Yes (SessionStart re-fires) | Flag + re-orientation on next shell cmd or MCP call | Yes (compacting event) |
| Skills & agents | Shared skill and agent definitions | Yes | Yes | Yes |
| Work tracking | Roadmaps, plans, brainstorms | Yes | Yes | Yes |
| Linked repo support | Hub knowledge accessible from work repos | Yes | Yes | Yes |
| Hook event logging | Structured JSONL logging of all hook fires | Yes | Yes | Yes |
| Instructions file | Platform-specific instructions path | `CLAUDE.md` | `.cursor/rules/lore-*.mdc` | `.lore/instructions.md` |

## How Hooks Work

Each platform has thin adapter scripts that call shared logic in `lib/`. The adapters handle platform-specific wire formats; the core behavior is identical.

```
hooks/              → Claude Code hooks (subprocess per event)
.cursor/hooks/      → Cursor hooks (subprocess per event)
.cursor/mcp/        → Cursor MCP server (long-lived process)
.opencode/plugins/  → OpenCode plugins (long-lived ESM modules)
lib/                → Shared logic (all platforms)
```

All hooks are instrumented with `lib/hook-logger.js`. Set `LORE_HOOK_LOG=1` to record every hook fire to `.git/lore-hook-events.jsonl` — useful for validating wiring across platforms and measuring context accumulation. See [Configuration: Hook Event Logging](configuration.md#hook-event-logging) for details.

### Claude Code

Full hook coverage. Hooks fire as subprocesses on every lifecycle event — session start, prompt submit, pre/post tool use.

- **Config:** `.claude/settings.json`
- **Events:** `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`
- **Wire format:** JSON on stdin, JSON on stdout (`{ "decision": "block" }` to block)

`SessionStart` fires on startup, resume, and after context compaction — the session banner is re-injected automatically when the context window is trimmed.

=== "Hooks"

    | Hook | Event | Purpose | Accumulates |
    |------|-------|---------|:-----------:|
    | `session-init.js` | `SessionStart` | Full session banner (version, delegation, knowledge map, conventions, project context, active work) | One-time |
    | `prompt-preamble.js` | `UserPromptSubmit` | Per-prompt nudge: delegation domains, capture reminder | Yes |
    | `context-path-guide.js` | `PreToolUse` | ASCII directory tree before docs writes | Yes |
    | `protect-memory.js` | `PreToolUse` | Blocks MEMORY.md access, redirects to Lore routes | Can block |
    | `knowledge-tracker.js` | `PostToolUse` / `PostToolUseFailure` | Capture reminders, bash counting, nav-dirty flag | Yes |

### Cursor

Hook support via `.cursor/hooks.json` (v1.7+). Cursor's hook surface has no per-prompt event (`beforeSubmitPrompt` does not exist), so Lore uses a distributed state pattern: fire-and-forget hooks write state to disk, and `beforeShellExecution` reads it back on the next shell command. An MCP server provides on-demand context retrieval as a second channel.

- **Config:** `.cursor/hooks.json` (hooks) + `.cursor/mcp.json` (MCP)
- **Events:** `sessionStart`, `beforeShellExecution`, `preCompact`, `postToolUseFailure`, `afterFileEdit`, `beforeReadFile`, `preToolUse`
- **Wire format:** JSON on stdin, JSON on stdout

=== "Hooks"

    | Hook | Event | Purpose | Output |
    |------|-------|---------|--------|
    | `session-init.js` | `sessionStart` | Full session banner via `additional_context` | One-time |
    | `capture-nudge.js` | `beforeShellExecution` | Capture nudges, bash escalation, error patterns, compaction re-orientation | `agent_message` (accumulates) |
    | `compaction-flag.js` | `preCompact` | Sets flag file for post-compaction detection | None (Cursor ignores preCompact output) |
    | `failure-tracker.js` | `postToolUseFailure` | Records failure in shared state | None (Cursor ignores postToolUseFailure output) |
    | `knowledge-tracker.js` | `afterFileEdit` | Sets nav-dirty flag, resets bash counter | None (Cursor ignores afterFileEdit output) |
    | `protect-memory.js` | `beforeReadFile` + `preToolUse` | Blocks MEMORY.md reads and writes | `permission: deny` / `decision: deny` |

=== "MCP Server"

    The MCP server (`lore-server.js` in `.cursor/mcp/`) exposes two tools:

    | Tool | Purpose |
    |------|---------|
    | `lore_check_in` | Capture nudges, failure notes, compaction re-orientation. Instructions tell the agent to call this every 2-3 shell commands. |
    | `lore_context` | Full knowledge map, active work, delegation domains. For navigation and post-compaction recovery. |

    The MCP server provides the same information as hooks but on-demand — the agent calls tools when it needs orientation rather than receiving injections on every prompt.

**Compaction flow:** `preCompact` sets a flag file → on the next shell command, `capture-nudge.js` reads the flag and emits a re-orientation message (`[COMPACTED] Lore <version> | Delegate: <domains> | Re-read .cursor/rules/ and project context`). The MCP `lore_check_in` tool also detects the flag.

**Distributed state pattern:** Cursor ignores output from `afterFileEdit`, `postToolUseFailure`, and `preCompact`. These hooks instead write state to disk (nav-dirty flags, failure records, compaction flags). The `beforeShellExecution` hook and MCP tools read this state back when they fire.

**Known gaps:**

- No per-prompt hook — `beforeShellExecution` and MCP tools are the only per-interaction injection points
- No context path guide — no pre-write hook equivalent to Claude Code's `PreToolUse` for showing directory trees

### OpenCode

Plugin support via long-lived ESM modules. Covers session lifecycle, tool blocking, and post-tool tracking.

- **Config:** `opencode.json` (points to instruction files)
- **Events:** `SessionInit`, `experimental.session.compacting`, `experimental.chat.system.transform`, `tool.execute.before`, `tool.execute.after`
- **Wire format:** Function calls with input/output objects; throw to block

=== "Plugins"

    | Plugin | Event | Purpose |
    |--------|-------|---------|
    | `session-init.js` | `SessionInit` + `experimental.chat.system.transform` + `experimental.session.compacting` | Full banner on startup, system prompt injection every LLM call, banner re-injection on compaction |
    | `context-path-guide.js` | `tool.execute.before` | ASCII directory tree before docs writes |
    | `protect-memory.js` | `tool.execute.before` | Blocks MEMORY.md access (throws to block) |
    | `knowledge-tracker.js` | `tool.execute.after` | Capture reminders, bash counting, nav-dirty flag |

`experimental.chat.system.transform` fires on every LLM call and pushes the **full** session banner into the system prompt. This is a system prompt replacement, not conversation history — there is zero accumulation cost. The banner is the same fixed size regardless of conversation length.

`SessionInit` fires once on startup and logs the banner via `client.app.log()`. `experimental.session.compacting` fires on compaction and pushes the banner into `output.context`.

Subagents are intentionally scoped and do not receive full orchestrator banner context. They are expected to load `docs/context/agent-rules.md` and relevant files under `docs/context/conventions/` before implementation.

OpenCode slash menu entries are provided by `.opencode/commands/`; skills in `.lore/skills/` do not auto-populate the OpenCode command menu.

## Setup

All platforms activate automatically after `npx create-lore`. No manual configuration needed. For linked repos, run `/lore-link <target>` from the hub to generate platform configs — see [Linked Repos](#linked-repos) below.

| Platform | What loads automatically |
|----------|------------------------|
| **Claude Code** | `CLAUDE.md` + `.claude/settings.json` (hooks) |
| **Cursor** | `.cursor/rules/lore-*.mdc` (rules) + `.cursor/hooks.json` (hooks) + `.cursor/mcp.json` (MCP) |
| **OpenCode** | `opencode.json` (instructions), `.opencode/plugins/` (hooks), `.opencode/commands/` (slash menu) |

`CLAUDE.md` and `.cursor/rules/lore-*.mdc` are generated from `.lore/instructions.md`. Run `bash scripts/sync-platform-skills.sh` after editing instructions to keep them in sync.

## Sync Boundaries

`/lore-update` and `sync-framework.sh` only overwrite **framework-owned** content — items with the `lore-*` prefix. Operator-created skills, agents, docs, and work items are never touched.

| Category | Synced by `/lore-update` | Operator-owned |
|----------|:-----------------------:|:--------------:|
| `lore-*` skills | Yes | — |
| `lore-*` agents | Yes | — |
| Operator skills (no prefix) | — | Yes |
| Operator agents (no prefix) | — | Yes |
| `hooks/`, `lib/`, `scripts/` | Yes | — |
| `docs/`, `mkdocs.yml` | — | Yes |
| `.lore-config`, registries | — | Yes |

Agent platform copies (`.claude/agents/`) are transformed at sync time — per-platform model fields are resolved into a single `model` field for the target platform. See [Configuration: subagentDefaults](configuration.md#subagentdefaults) for the resolution cascade.

## Using Multiple Platforms

You can use different platforms on the same Lore project. The knowledge base is shared — a skill captured in Claude Code is available in Cursor and OpenCode on the next session.

The only platform-specific files are hook configs, rules, and generated instruction copies. These coexist without conflict.

## Linked Repos

When you [link a work repo](cross-repo-workflow.md#ide-workflow-lore-link), `/lore-link` generates per-platform configs in the target:

| Platform | Generated files |
|----------|----------------|
| **Claude Code** | `.claude/settings.json` — hooks with `LORE_HUB` pointing to hub |
| **Cursor** | `.cursor/hooks.json` + `.cursor/mcp.json` + `.cursor/rules/lore-*.mdc` — hooks, MCP, and instructions pointing to hub |
| **OpenCode** | `.opencode/plugins/` wrappers + `.opencode/commands/` + `opencode.json` — delegating to hub plugins and exposing slash commands |
| **All** | `CLAUDE.md`, `.cursorrules` — instruction copies from hub |
| **All** | `.lore` marker file recording the hub path and link timestamp |

All generated files are added to the target's `.gitignore` automatically. Existing configs are backed up to `.bak` before overwriting.

After running `/lore-update` on the hub, run `/lore-link --refresh` to regenerate configs in all linked repos with the latest hooks.
