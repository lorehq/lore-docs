---
title: "Hooks"
---

# Hooks

The `lore` CLI binary is the hook handler for all platforms. Platform configs point to `lore hook <name>`, which reads JSON from stdin and writes JSON or plain text to stdout. No scripts are copied into projects — the globally-installed binary handles everything.

## Lifecycle Events

| Event | When | Hook logic |
|-------|------|------------|
| **PreToolUse** | Before a tool executes (can allow/deny) | harness-guard, memory-guard, search-nudge |
| **PostToolUse** | After a tool executes | adaptive bash counter, capture nudges |
| **PromptSubmit** | Before each user message is processed | ambiguity scanner |

Platform-specific event names are mapped internally. For example, Claude uses `PreToolUse`, Copilot uses `preToolUse`, Gemini uses `BeforeTool`, and Cursor uses `preToolUse`.

## Hook Logic

### Pre-tool-use

Three guards run in sequence:

**Harness guard** — blocks writes to the global directory (`~/.lore/`). Project-level `.lore/` paths are allowed. Runs in all profiles.

**Memory guard** — blocks access to `MEMORY.md` at the project root and redirects to `.lore/MEMORY.md`. Runs in all profiles.

**Search nudge** — nudges agents toward semantic search instead of raw Glob/Grep on indexed paths. Non-blocking — always allows the tool to proceed. Skipped in `minimal` profile.

### Post-tool-use

Adaptive memory nudges after tool use. Tracks consecutive bash command count in `.git/lore-bash-count-<hash>.json`:

- Read-only tools (Read, Grep, Glob): silent
- Knowledge-path writes: silent (already capturing)
- First bash in a sequence: gentle memory nudge
- At **nudge threshold** (default 15): reminder to capture findings
- At **warn threshold** (default 30): stronger nudge to pause and capture (repeats every multiple)

Skipped in `minimal` profile.

### Prompt-submit

Scans the user's input for ambiguous language patterns (relative dates, vague quantities, open-ended scope). Appends a clarification note if matches are found. Skipped in `minimal` profile.

## Color System

Hook messages use ANSI colors to distinguish message types at a glance.

| Tag | ANSI Code | Color | Swatch | Hook |
|-----|-----------|-------|--------|------|
| `[■ LORE-MEMORY]` | `\x1b[92m` | Bright Green | <span style="background-color: #859900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | post-tool-use (capture nudges) |
| `[AMBIGUITY]` | `\x1b[93m` | Bright Yellow | <span style="background-color: #b58900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | prompt-submit (ambiguity scanner) |

Green is encouragement to capture snags, decisions, and context. Yellow flags ambiguous input. Pre-tool-use guards output uncolored tags (`[HARNESS-GUARD]`, `[MEMORY-GUARD]`, `[LORE-MEMORY]`).

## Hook Logging

Set `LORE_HOOK_LOG=1` to enable logging. Events are written to `.git/lore-hook-events.jsonl` (gitignored). Each entry records the platform, hook name, event type, output size, and timestamp.

## Profiles and Hook Gating

The `profile` field in `.lore/config.json` controls which hooks fire:

| Profile | Behavior |
|---------|----------|
| `standard` | All hooks active |
| `minimal` | Only structural guards (harness-guard, memory-guard). No capture nudges, no search guidance. |
| `discovery` | All hooks active + lower thresholds (nudge at 5, warn at 10) for aggressive capture |
