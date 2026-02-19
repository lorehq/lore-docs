---
title: Configuration
---

# Configuration

Lore reads settings from `.lore-config` (JSON) at the instance root and from environment variables.

## `.lore-config`

```json
{
  "version": "1.0.0",
  "treeDepth": 5,
  "nudgeThreshold": 3,
  "warnThreshold": 5
}
```

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `version` | string | -- | Displayed in the session banner (`=== LORE v1.0.0 ===`) |
| `treeDepth` | number | `5` | Max directory depth in the knowledge map tree |
| `nudgeThreshold` | number | `3` | Bash commands before a gentle capture reminder |
| `warnThreshold` | number | `5` | Bash commands before a strong capture warning |

All fields are optional. Missing fields fall back to defaults.

**Metadata fields** — `name` and `created` are informational, set during instance creation. Not used by framework logic.

### `subagentDefaults`

Sets default model preferences for domain agents across platforms. Agents inherit these unless they override with their own frontmatter values.

```json
{
  "subagentDefaults": {
    "claude-model": "sonnet",
    "opencode-model": "openai/gpt-4o",
    "cursor-model": null
  }
}
```

| Field | Description |
|-------|-------------|
| `claude-model` | Default model for agents spawned in Claude Code |
| `opencode-model` | Default model for agents spawned in OpenCode |
| `cursor-model` | Default model for agents spawned in Cursor (not yet supported) |

**Resolution order:** Agent frontmatter field → `subagentDefaults` → omit (platform picks its own default).

Per-platform fields use vendor-native model identifiers (`sonnet`, `openai/gpt-4o`). No translation is performed. See [How It Works: Per-Platform Model Configuration](../how-it-works.md#per-platform-model-configuration) for frontmatter format.

### `nudgeThreshold` and `warnThreshold`

The bash-tracking hook counts consecutive Bash tool calls. At `nudgeThreshold`, a gentle capture reminder appears. At `warnThreshold`, the reminder is stronger. Both reset when the agent writes to a knowledge path (`docs/`, `.lore/skills/`).

## Tuning for Large Instances

As a knowledge base grows, the session banner's main variable cost is the **knowledge map** — a directory-only tree of `docs/`, `skills/`, and `agents/`. Growth is proportional to the number of directories, not documents.

**`treeDepth`** limits how many directory levels the knowledge map displays. Default is 5. Reducing to 3 or 4 hides deep nesting while showing top-level structure.

**When to act:**

- Knowledge map exceeds ~50 lines → reduce `treeDepth` or reorganize subdirectories
- `MEMORY.local.md` exceeds ~50 lines → route content to skills or `docs/knowledge/`
- Conventions section growing → keep it focused on rules, move reference material to `docs/knowledge/`
- Many active work items → archive completed items with `/lore-capture`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `LORE_DEBUG=1` | Enable debug logging to stderr |
| `LORE_HOOK_LOG=1` | Enable structured hook event logging to `.git/lore-hook-events.jsonl` |
| `LORE_HUB` | Internal. Set by `/lore-link` to point cross-repo hooks back to the hub |

### Hook Event Logging

`LORE_HOOK_LOG` enables structured event logging for all hooks across all three platforms. Each hook fire writes a JSON line to `.git/lore-hook-events.jsonl`. Zero cost when disabled.

```bash
export LORE_HOOK_LOG=1
```

Each entry records:

```json
{"ts": 1740000000000, "platform": "cursor", "hook": "capture-nudge", "event": "beforeShellExecution", "output_size": 52, "state": {"bash": 3}}
```

| Field | Description |
|-------|-------------|
| `ts` | Unix epoch milliseconds |
| `platform` | `claude`, `cursor`, or `opencode` |
| `hook` | Hook filename (e.g., `capture-nudge`, `session-init`) |
| `event` | Platform event name (e.g., `beforeShellExecution`, `PostToolUse`) |
| `output_size` | Characters injected into the agent's context (0 for silent hooks) |
| `state` | Optional hook-specific snapshot (bash counter, flags) |

Analyze collected data:

```bash
bash scripts/analyze-hook-logs.sh
```

The report shows fires per platform, fires per hook, average output sizes, estimated accumulated context tokens, and any hooks that never fired. To reset: `rm .git/lore-hook-events.jsonl`.
