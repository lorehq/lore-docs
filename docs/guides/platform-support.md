---
title: Platform Support
---

# Platform Support

Lore supports three coding agent platforms. All share the same knowledge base — skills, agents, docs, and work tracking persist across platforms.

Behavior is intentionally not identical. Lore keeps the same outcomes (orientation, capture nudges, memory guardrails) while adapting to each platform's hook surface.

## Feature Matrix

| Feature | Description | Claude Code | Cursor | OpenCode |
|---------|-------------|:-----------:|:------:|:--------:|
| Session banner | Project identity + delegation info on startup | Yes | Yes | Yes |
| Per-prompt reminder | One-line nudge for delegation and parallel task planning | Yes | Yes | Yes |
| MEMORY.md guard | Blocks access, redirects to Lore routes | Yes | Reads only | Yes |
| Knowledge capture reminders | Flags new knowledge after edits and commands | Yes | Yes | Yes |
| Bash escalation tracking | Warns when shell commands bypass tool safety | Yes | Yes | Yes |
| Context path guide | Shows directory tree before docs writes | Yes | No | Yes |
| Banner survives compaction | Re-injects banner when context is trimmed | Yes | Condensed pre-turn reinjection | Yes |
| Skills & agents | Shared skill and agent definitions | Yes | Yes | Yes |
| Work tracking | Roadmaps, plans, brainstorms | Yes | Yes | Yes |
| Linked repo support | Hub knowledge accessible from work repos | Yes | Yes | Yes |
| Instructions file | Platform-specific instructions path | `CLAUDE.md` | `.cursorrules` | `.lore/instructions.md` |

## How Hooks Work

Each platform has thin adapter scripts that call shared logic in `lib/`. The adapters handle platform-specific wire formats; the core behavior is identical.

```
hooks/              → Claude Code hooks (subprocess per event)
.cursor/hooks/      → Cursor hooks (subprocess per event)
.opencode/plugins/  → OpenCode plugins (long-lived ESM modules)
lib/                → Shared logic (all platforms)
```

### Claude Code

Full hook coverage. Hooks fire as subprocesses on every lifecycle event — session start, prompt submit, pre/post tool use.

- **Config:** `.claude/settings.json`
- **Events:** `SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `PostToolUseFailure`
- **Wire format:** JSON on stdin, JSON on stdout (`{ "decision": "block" }` to block)

`SessionStart` fires on startup, resume, and after context compaction — the session banner is re-injected automatically when the context window is trimmed.

### Cursor

Hook support via `.cursor/hooks.json` (v1.7+). Covers session start, prompt injection, file read blocking, post-edit tracking, and shell command tracking.

- **Config:** `.cursor/hooks.json`
- **Events:** `sessionStart`, `beforeSubmitPrompt`, `beforeReadFile`, `afterFileEdit`, `afterShellExecution`
- **Wire format:** JSON on stdin, JSON on stdout (`{ "continue": false }` to block)

Cursor ignores output from `afterFileEdit` and `afterShellExecution`, so knowledge capture reminders and bash escalation warnings use a read-back pattern: the after-hooks write state to disk, and `beforeSubmitPrompt` reads it back on the next turn.

Cursor has no compaction event, so `beforeSubmitPrompt` also injects a condensed banner on every turn — delegation, active work, repo boundary, and conventions pointer. This keeps the agent oriented after context trimming, but the full banner (knowledge map, project description, convention text) is only available from `sessionStart` at the beginning of the session.

**Known gaps:**

- No write blocking — `beforeReadFile` exists but no `beforeWriteFile`, so MEMORY.md writes can't be intercepted
- No context path guide — no pre-write hook to show directory tree before docs edits

### OpenCode

Plugin support via long-lived ESM modules. Covers session lifecycle, tool blocking, and post-tool tracking.

- **Config:** `opencode.json` (points to instruction files)
- **Events:** `session.created`, `experimental.session.compacting`, `experimental.chat.system.transform`, `tool.execute.before`, `tool.execute.after`
- **Wire format:** Function calls with input/output objects; throw to block

OpenCode behavior is split by purpose:

- `session.created` injects the full session banner (`=== LORE ...`)
- `experimental.session.compacting` re-injects the full banner after trimming
- `experimental.chat.system.transform` injects a small per-turn reminder only

This avoids full-banner token overhead on every turn while preserving full Lore context at startup and after compaction.

OpenCode slash menu entries are provided by `.opencode/commands/`; skills in `.lore/skills/` do not auto-populate the OpenCode command menu.

## Setup

All platforms activate automatically after `npx create-lore`. No manual configuration needed. For linked repos, run `/lore-link <target>` from the hub to generate platform configs — see [Linked Repos](#linked-repos) below.

| Platform | What loads automatically |
|----------|------------------------|
| **Claude Code** | `CLAUDE.md` + `.claude/settings.json` (hooks) |
| **Cursor** | `.cursorrules` + `.cursor/hooks.json` (hooks) + `.cursor/rules/` (rules) |
| **OpenCode** | `opencode.json` (instructions), `.opencode/plugins/` (hooks), `.opencode/commands/` (slash menu) |

`CLAUDE.md` and `.cursorrules` are generated copies of `.lore/instructions.md`. Run `bash scripts/sync-platform-skills.sh` after editing instructions to keep them in sync.

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
| **Cursor** | `.cursor/hooks.json` + `.cursor/rules/lore.mdc` — hooks and instructions pointing to hub |
| **OpenCode** | `.opencode/plugins/` wrappers + `.opencode/commands/` + `opencode.json` — delegating to hub plugins and exposing slash commands |
| **All** | `CLAUDE.md`, `.cursorrules` — instruction copies from hub |
| **All** | `.lore` marker file recording the hub path and link timestamp |

All generated files are added to the target's `.gitignore` automatically. Existing configs are backed up to `.bak` before overwriting.

After running `/lore-update` on the hub, run `/lore-link --refresh` to regenerate configs in all linked repos with the latest hooks.
