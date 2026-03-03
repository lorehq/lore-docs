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
| **PostToolUse** | After a tool executes | knowledge-tracker |

## Hook Reference

### session-init

Fires at session start. Creates sticky files (`memory.local.md`) and seeds runbook templates. Emits the dynamic session banner (operator profile + session memory). Static content (rules, skills, fieldnotes) is handled by platform projections, not this hook.

**Profile gating:** Runs in all profiles.

### prompt-preamble

Fires before every user message. Emits a one-line protocol reminder (search-first, capture, security) and scans the user's input for ambiguous language (relative dates, vague quantities). Ambiguity triggers a clarification note.

**Profile gating:** Skipped in `minimal` profile.

### knowledge-tracker

Fires after every tool use. Tracks consecutive bash commands and emits graduated capture reminders:

- **First bash:** Gentle capture reminder
- **At nudge threshold** (default 15): Pause point — any discoveries?
- **At warn threshold** (default 30): Stronger prompt to stop and capture
- **On failure:** Immediate capture prompt (failures are high-signal)
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

Fires before search tool use. Nudges agents toward semantic search (when the Docker sidecar is running) instead of raw filesystem Glob/Grep on indexed paths. Falls back silently when no sidecar is configured.

**Profile gating:** Skipped in `minimal` profile.

## Color System

Hook messages use a three-tier ANSI color system to signal severity at a glance. The tiers exist so agents (and operators reading logs) can distinguish "stop and think" from "keep this in mind" without parsing the message body.

| Tier | ANSI Code | Color | Swatch | Use |
|------|-----------|-------|--------|-----|
| Security | `\x1b[91m` | Bright Red | <span style="background-color: #dc322f; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | Tool execution failures |
| Protocol | `\x1b[93m` | Bright Yellow | <span style="background-color: #b58900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | Search-first, capture reminders, checkpoints |
| Guidance | `\x1b[96m` | Bright Cyan | <span style="background-color: #2aa198; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | Search nudges |

Each message is prefixed with a colored tag that identifies its source:

| Tag | Color | Swatch | Hook |
|-----|-------|--------|------|
| `[■ LORE-FAILURE]` | Red | <span style="background-color: #dc322f; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | knowledge-tracker (on failure) |
| `[■ LORE-PROTOCOL]` | Yellow | <span style="background-color: #b58900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | prompt-preamble |
| `[■ LORE-CAPTURE]` | Yellow | <span style="background-color: #b58900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | knowledge-tracker |
| `[■ LORE-CHECKPOINT]` | Yellow | <span style="background-color: #b58900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | knowledge-tracker (escalated) |
| `[■ LORE-MEMORY]` | Yellow | <span style="background-color: #b58900; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | knowledge-tracker (memory write) |
| `[■ LORE-SEARCH]` | Cyan | <span style="background-color: #2aa198; width: 12px; height: 12px; display: inline-block; border-radius: 2px; vertical-align: middle;"></span> | search-guard |

Red is reserved for genuine safety concerns — currently only tool execution failures. Yellow covers protocol reminders and capture nudges. Cyan is informational guidance (search strategy).

## Hook Logging

All hooks log events to `.git/lore-hook-events.jsonl` via `lib/hook-logger.js`. Each entry records the platform, hook name, event type, output size, and timestamp. This file is gitignored and used for debugging and context cost tracking.

## Profiles and Hook Gating

The `profile` field in `.lore/config.json` controls which hooks fire:

| Profile | Behavior |
|---------|----------|
| `standard` | All hooks active |
| `minimal` | Only structural guards (harness-guard, protect-memory). No capture nudges, no search guidance. |
| `discovery` | All hooks active + lower thresholds (nudge at 5, warn at 10) for aggressive capture |
