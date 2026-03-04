---
title: "Configuration"
---

## File locations

| Scope   | Path                          |
|---------|-------------------------------|
| Global  | `~/.lore/config.json`         |
| Project | `<project>/.lore/config.json` |

The project config is deep-merged over the global config. Project values override global values. Objects are merged recursively; scalars and arrays are replaced outright. Both files support `//` line comments and `/* */` block comments (stripped before parsing).

The merge is performed by `getConfig()` in `.lore/harness/lib/config.js`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | string | — | Project name. |
| `version` | string | — | Lore version string (e.g. `"0.15.0"`). |
| `created` | string | — | ISO date when the instance was created (e.g. `"2026-02-14"`). |
| `profile` | string | `"standard"` | Hook verbosity profile. One of `"minimal"`, `"standard"`, `"discovery"`. |
| `platforms` | string[] | all 6 | Active platforms. Restricts which platform files the projector generates. Valid values: `"claude"`, `"gemini"`, `"windsurf"`, `"cursor"`, `"opencode"`, `"roocode"`. Missing or empty = all platforms active (backwards compatible). |
| `nudgeThreshold` | number | `15` (discovery: `5`) | Consecutive bash commands before the first capture checkpoint. |
| `warnThreshold` | number | `30` (discovery: `10`) | Consecutive bash commands before the escalated capture warning. Repeats every `warnThreshold` commands thereafter. |
| `treeDepth` | number | `5` | Maximum directory depth for ASCII trees in banners. |
| `globalStructureVersion` | number | `0` | Global config only. Tracks which structural migrations have been applied to `~/.lore/`. Managed automatically by the migration system — do not edit manually. |
| `sidecarPort` | number | `9185` | Global config only. Port the Lore sidecar listens on. Override if `9185` conflicts with another service. The sidecar's `docker-compose.yml` in `~/.lore/` must match. |
| `manifest` | object | `{}` | Platform capability overrides. Deep-merged over the base manifest in `lib/manifest.json`. |

## Profiles

| Behavior | `minimal` | `standard` | `discovery` |
|----------|-----------|------------|-------------|
| Safety hooks (harness-guard, protect-memory) | active | active | active |
| prompt-preamble | off | active | active |
| search-guard | off | active | active |
| memory-nudge | off | active | active |
| Nudge threshold | — | 15 | 5 |
| Warn threshold | — | 30 | 10 |
| Banner profile tag | `[MINIMAL]` | (none) | `[DISCOVERY]` |

Hooks gated by profile check `getProfile(hubDir) === 'minimal'` and exit early if true. Safety hooks (harness-guard, protect-memory) run unconditionally in all profiles.

## Example

```json
{
  "name": "my-project",
  "version": "0.15.0",
  "created": "2026-02-14",
  "profile": "standard",
  "platforms": ["claude", "cursor"],
  "treeDepth": 5,
  "nudgeThreshold": 15,
  "warnThreshold": 30
}
```
