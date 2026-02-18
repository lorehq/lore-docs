---
title: Configuration
---

# Configuration

Lore reads settings from `.lore-config` (JSON) at the root of your instance and from environment variables.

## `.lore-config`

A JSON file with optional fields. Create it manually or let `create-lore` generate one during setup.

```json
{
  "version": "0.5.0",
  "treeDepth": 5,
  "nudgeThreshold": 3,
  "warnThreshold": 5
}
```

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `version` | string | — | Displayed in the session banner (`=== LORE v0.5.0 ===`) |
| `treeDepth` | number | `5` | Max directory depth in the knowledge map tree |
| `nudgeThreshold` | number | `3` | Bash commands before a gentle capture reminder |
| `warnThreshold` | number | `5` | Bash commands before a strong capture warning |

All fields are optional. Missing fields fall back to their defaults.

**Metadata fields** — `.lore-config` may also contain `name`, `created`, and `level`. These are informational metadata set during instance creation and are not used by framework logic.

### `treeDepth`

Controls how deep the ASCII directory tree goes in the session banner's KNOWLEDGE MAP and in the context path guide hook. Lower values keep the banner compact for large instances; higher values show more structure.

```json title="Compact tree"
{ "treeDepth": 2 }
```

```json title="Deep tree"
{ "treeDepth": 8 }
```

### `nudgeThreshold` and `warnThreshold`

The bash-tracking hook counts consecutive Bash tool calls. When the count hits `nudgeThreshold`, a gentle reminder appears suggesting a capture pass. At `warnThreshold`, the reminder is stronger. Both reset after a capture command runs.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `LORE_DEBUG=1` | Enable debug logging to stderr — shows hook execution details |
| `LORE_HUB` | Internal. Set by `lore-link` to point cross-repo hooks back to the hub instance |

`LORE_DEBUG` is useful when troubleshooting hooks. Set it before launching your agent session:

```bash
LORE_DEBUG=1 claude
```
