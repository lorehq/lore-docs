---
title: "Configuration"
---

## File locations

| Scope   | Path                          |
|---------|-------------------------------|
| Global  | `~/.lore/config.json`         |
| Project | `<project>/.lore/config.json` |

The global config stores machine-wide settings (`memoryEngineUrl`). The project config stores per-project settings (`platforms`, `profile`, thresholds). They are read independently — no merge occurs.

## Project fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `profile` | string | `"standard"` | Hook verbosity profile. One of `"minimal"`, `"standard"`, `"discovery"`. |
| `platforms` | object | all enabled | Platform enable/disable map. Each key is a platform name, value is `true` (enabled) or `false` (disabled). Valid keys: `"claude"`, `"copilot"`, `"cursor"`, `"gemini"`, `"windsurf"`, `"opencode"`. |
| `nudgeThreshold` | number | `15` (discovery: `5`) | Bash commands before the first memory capture nudge. |
| `warnThreshold` | number | `30` (discovery: `10`) | Bash commands before the escalated capture warning. Repeats every N commands. |

## Global-only fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `memoryEngineUrl` | string | `"http://localhost:9184"` | URL of the memory engine. Change to point at a remote instance or custom port. |

## Profiles

| Behavior | `minimal` | `standard` | `discovery` |
|----------|-----------|------------|-------------|
| Safety hooks (harness-guard, memory-guard) | active | active | active |
| prompt-submit | off | active | active |
| search-nudge | off | active | active |
| post-tool-use nudges | off | active | active |
| Nudge threshold | — | 15 | 5 |
| Warn threshold | — | 30 | 10 |

Safety hooks run unconditionally in all profiles.

## Examples

**Project config** (`.lore/config.json`):

```json
{
  "platforms": {
    "claude": true,
    "copilot": false,
    "cursor": true,
    "gemini": false,
    "windsurf": false,
    "opencode": false
  }
}
```

**Global config** (`~/.lore/config.json`):

```json
{
  "memoryEngineUrl": "http://localhost:9184"
}
```
