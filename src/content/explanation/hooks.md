---
title: "Hooks"
---

# Hooks

Hooks are plain JavaScript files that fire at specific points in the agent lifecycle. They inject context, enforce guards, and nudge knowledge capture — all without network requests or shell execution.

## Lifecycle Events

| Event | When | Hooks |
|-------|------|-------|
| **SessionStart** | Agent session begins | session-init |
| **UserPromptSubmit** | Before each user message | prompt-preamble |
| **PreToolUse** | Before a tool executes | harness-guard, protect-memory, search-guard |
| **PostToolUse** | After a tool executes | memory-nudge |

## Hook Reference

### session-init

Fires at session start. Creates sticky files (`memory.local.md`) and seeds runbook templates. Emits the dynamic session banner (operator profile + session memory). Static content (rules, skills, fieldnotes) is handled by platform projections, not this hook.

**Profile gating:** Runs in all profiles.

### prompt-preamble

Fires before every user message. Emits a one-line protocol reminder (search-first, capture, security) and scans the user's input for ambiguous language (relative dates, vague quantities). Ambiguity triggers a clarification note.

**Profile gating:** Skipped in `minimal` profile.

### memory-nudge

Fires after every tool use. Tracks consecutive bash commands and emits graduated memory nudges:

- **First bash:** Gentle nudge to capture snags or decisions
- **At nudge threshold** (default 15): Any findings worth a note?
- **At warn threshold** (default 30): Pause and capture findings before continuing
- **On failure:** Capture prompt (failures are high-signal)
- **On memory write:** Graduation prompt for reusable fixes

Read-only tools (Read, Grep, Glob) and knowledge-path writes are silent.

**Profile gating:** Skipped in `minimal` profile.

### harness-guard

Fires before writes. Blocks modifications to the global directory (`~/.lore/`). Project-level `.lore/` paths are allowed.

**Profile gating:** Runs in all profiles.

### protect-memory

Fires before reads and writes to `MEMORY.md`. Blocks access and redirects to `.lore/memory.local.md` (the gitignored session scratchpad). Nested `MEMORY.md` files and `MEMORY.local.md` are allowed.

**Profile gating:** Runs in all profiles.

### search-guard

Fires before search tool use. Nudges agents toward semantic search instead of raw filesystem Glob/Grep on indexed paths. Always allows the tool to proceed — guidance only, never blocking.

**Profile gating:** Skipped in `minimal` profile.

## Color System

Hook messages use ANSI colors to distinguish message types at a glance.

| Tag | ANSI Code | Color | Swatch | Hook |
|-----|-----------|-------|--------|------|
| `[■ LORE-MEMORY]` | `\x1b[92m` | Bright Green | <span style="background-color: #859900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | memory-nudge (all nudges) |
| `[■ LORE-PROTOCOL]` | `\x1b[93m` | Bright Yellow | <span style="background-color: #b58900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | prompt-preamble |
| `[■ LORE-SEARCH]` | `\x1b[96m` | Bright Cyan | <span style="background-color: #2aa198; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | search-guard |

Green is encouragement to write notes freely — capture snags, decisions, and context. Yellow is protocol reminders (search-first, security). Cyan is informational guidance (search strategy).

## Hook Logging

All hooks log events to `.git/lore-hook-events.jsonl` via `lib/hook-logger.js`. Each entry records the platform, hook name, event type, output size, and timestamp. This file is gitignored and used for debugging and context cost tracking.

## Profiles and Hook Gating

The `profile` field in `.lore/config.json` controls which hooks fire:

| Profile | Behavior |
|---------|----------|
| `standard` | All hooks active |
| `minimal` | Only structural guards (harness-guard, protect-memory). No capture nudges, no search guidance. |
| `discovery` | All hooks active + lower thresholds (nudge at 5, warn at 10) for aggressive capture |
