---
title: Configuration
---

# Configuration

Lore reads settings from `.lore-config` (JSON) at the root of your instance and from environment variables.

## `.lore-config`

A JSON file with optional fields. Create it manually or let `npx create-lore` generate one during setup.

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
| `version` | string | — | Displayed in the session banner (`=== LORE v1.0.0 ===`) |
| `treeDepth` | number | `5` | Max directory depth in the knowledge map tree |
| `nudgeThreshold` | number | `3` | Bash commands before a gentle capture reminder |
| `warnThreshold` | number | `5` | Bash commands before a strong capture warning |

All fields are optional. Missing fields fall back to their defaults.

**Metadata fields** — `.lore-config` may also contain `name` and `created`. These are informational metadata set during instance creation and are not used by framework logic.

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

These are **subagent** preferences — they control the model used when the orchestrator delegates to a domain agent, not the orchestrator model itself (which is set by your session).

Per-platform fields use vendor-native model identifiers. Claude Code agents use Claude model names (`sonnet`, `haiku`). OpenCode agents use OpenAI model names (`openai/gpt-4o`). No translation is performed — the value is passed through as-is.

Agent frontmatter can override any default:

```yaml
---
name: my-agent
domain: My Domain
claude-model: opus
opencode-model: openai/gpt-4o-mini
cursor-model: # not yet supported
---
```

### `treeDepth`

Controls how deep the ASCII directory tree goes in the session banner's KNOWLEDGE MAP and in the context path guide hook. Lower values keep the banner compact for large instances; higher values show more structure.

```json title="Compact tree"
{ "treeDepth": 2 }
```

```json title="Deep tree"
{ "treeDepth": 8 }
```

### `nudgeThreshold` and `warnThreshold`

The bash-tracking hook counts consecutive Bash tool calls. When the count hits `nudgeThreshold`, a gentle reminder appears suggesting a capture pass. At `warnThreshold`, the reminder is stronger. Both reset when the agent writes to a knowledge path (`docs/`, `.lore/skills/`).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `LORE_DEBUG=1` | Enable debug logging to stderr — shows hook execution details |
| `LORE_HOOK_LOG=1` | Enable structured hook event logging to `.git/lore-hook-events.jsonl` |
| `LORE_HUB` | Internal. Set by `lore-link` to point cross-repo hooks back to the hub instance |

`LORE_DEBUG` is useful when troubleshooting hooks. Set it before launching your agent session:

```bash
LORE_DEBUG=1 claude
```

### Hook Event Logging

`LORE_HOOK_LOG` enables structured event logging for all 15 hooks across all three platforms. Each hook fire writes a JSON line to `.git/lore-hook-events.jsonl` recording the platform, hook name, event type, output size, and hook-specific state. Zero cost when disabled — the check is an early return before any I/O.

```bash
export LORE_HOOK_LOG=1
```

Work normally for a few days, then analyze the collected data:

```bash
bash scripts/analyze-hook-logs.sh
```

The report shows fires per platform, fires per hook, average output sizes, estimated accumulated context tokens, and any hooks that never fired. Useful for validating hook wiring, measuring context cost, and tuning nudge behavior.

To reset the log:

```bash
rm .git/lore-hook-events.jsonl
```
