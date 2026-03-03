---
title: "Hooks"
---

Hooks are Node.js scripts in `.lore/harness/hooks/` that fire at platform lifecycle events. They read JSON from stdin, write JSON or plain text to stdout, and exit. The Claude Code hook configuration lives in `.claude/settings.json`, projected from `.lore/harness/templates/.claude/settings.json`.

## Lifecycle events

| Event | When it fires | Hooks |
|-------|---------------|-------|
| `SessionStart` | Session begins | session-init |
| `UserPromptSubmit` | Before each user message is processed | prompt-preamble |
| `PreToolUse` | Before a tool executes (can allow/deny) | harness-guard, protect-memory, search-guard |
| `PostToolUse` | After a tool executes successfully | knowledge-tracker |
| `PostToolUseFailure` | After a tool execution fails | knowledge-tracker |

## Hook reference

### session-init

| | |
|---|---|
| **File** | `hooks/session-init.js` |
| **Event** | `SessionStart` |
| **Matcher** | (all) |
| **Profile gating** | None. Runs in all profiles. |

Ensures sticky files exist (e.g. `memory.local.md`), seeds runbook templates, then builds and prints the dynamic session banner (operator profile, session memory). Output is plain text to stdout.

### prompt-preamble

| | |
|---|---|
| **File** | `hooks/prompt-preamble.js` |
| **Event** | `UserPromptSubmit` |
| **Matcher** | (all) |
| **Profile gating** | Skipped in `minimal`. |

Emits a static protocol reminder (search strategy, capture, security) on every user prompt. Reads stdin JSON `{ "prompt": "..." }` and scans for ambiguous input patterns (relative time, vague quantities, open-ended scope). Appends an ambiguity warning if matches are found. Output is plain text to stdout.

### harness-guard

| | |
|---|---|
| **File** | `hooks/harness-guard.js` |
| **Event** | `PreToolUse` |
| **Matcher** | `Write\|Edit` |
| **Profile gating** | None. Runs in all profiles. |

Blocks writes to the global directory (`~/.lore/`). Reads stdin JSON `{ "tool_name": "...", "tool_input": { "file_path": "..." } }`. If the resolved path starts with the global directory path, outputs a deny decision (`permissionDecision: "deny"`). Otherwise exits silently.

### protect-memory

| | |
|---|---|
| **File** | `hooks/protect-memory.js` |
| **Event** | `PreToolUse` |
| **Matcher** | `Edit\|Write\|Read` |
| **Profile gating** | None. Runs in all profiles. |

Blocks all access to `MEMORY.md` at the project root and redirects to `.lore/memory.local.md`. Read attempts get a redirect message. Write attempts get routing guidance: snags to fieldnotes, knowledge to the global directory (`~/.lore/knowledge-base/`), temporary to `memory.local.md`.

### search-guard

| | |
|---|---|
| **File** | `hooks/search-guard.js` |
| **Event** | `PreToolUse` |
| **Matcher** | `Read\|Glob` |
| **Profile gating** | Skipped in `minimal`. |

Nudges the agent to use semantic search before filesystem search when targeting indexed paths (`docs/`, `.lore/harness/skills/`, `.lore/skills/`, `.lore/rules/`). Non-blocking — always allows the tool to proceed (`permissionDecision: "allow"` with `additionalContext`). Reads stdin JSON with `toolName` and `arguments.path`. Messages are prefixed with cyan `[■ LORE-SEARCH]`.

### knowledge-tracker

| | |
|---|---|
| **File** | `hooks/knowledge-tracker.js` |
| **Event** | `PostToolUse`, `PostToolUseFailure` |
| **Matcher** | (all) |
| **Profile gating** | Skipped in `minimal`. |

Adaptive capture reminders after tool use. Tracks consecutive bash command count in `.git/lore-tracker-<hash>.json`. Behavior:

- Read-only tools (`read`, `grep`, `glob`): silent.
- Knowledge-path writes: silent (already capturing).
- First bash in a sequence: capture reminder.
- Bash count hits `nudgeThreshold`: checkpoint message.
- Bash count hits `warnThreshold` (and every multiple): escalated warning.
- Tool failures: always emits a failure review message.
- Writes to `memory.local.md`: graduation reminder.

Also pings the Docker sidecar `/activity` endpoint for knowledge-path file access (via `lib/activity-ping.js`), recording heat data in the hot cache. Each access increments the fact's heat score and resets the decay timer, driving the graduation logic in `/lore-memprint`.

## Hook logging

Enabled by `LORE_HOOK_LOG=1`. Writes JSONL to `.git/lore-hook-events.jsonl` (falls back to OS temp dir if `.git/` does not exist). Each line:

```json
{ "ts": 1709312400000, "platform": "claude", "hook": "harness-guard", "event": "PreToolUse", "output_size": 142, "state": { "path": ".lore/harness/lib/banner.js" } }
```

Analyze with `bash scripts/analyze-hook-logs.sh`. Reset with `rm .git/lore-hook-events.jsonl`.

## Color system

Hook output uses three ANSI colors to signal severity. Each message is prefixed with a colored tag in the format `\x1b[NNm[■ LORE-TAG]\x1b[0m`:

| Color | ANSI code | Tags | Hooks |
|-------|-----------|------|-------|
| Red | `\x1b[91m` | `LORE-FAILURE` | knowledge-tracker |
| Yellow | `\x1b[93m` | `LORE-PROTOCOL`, `LORE-CAPTURE`, `LORE-CHECKPOINT`, `LORE-MEMORY` | prompt-preamble, knowledge-tracker |
| Cyan | `\x1b[96m` | `LORE-SEARCH` | search-guard |
