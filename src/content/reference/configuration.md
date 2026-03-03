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
| `nudgeThreshold` | number | `15` (discovery: `5`) | Consecutive bash commands before the first capture checkpoint. |
| `warnThreshold` | number | `30` (discovery: `10`) | Consecutive bash commands before the escalated capture warning. Repeats every `warnThreshold` commands thereafter. |
| `treeDepth` | number | `5` | Maximum directory depth for ASCII trees in banners. |
| `docker.search.address` | string | — | Hostname of the Docker sidecar (e.g. `"localhost"`). |
| `docker.search.port` | number | — | Port of the Docker sidecar (e.g. `9185`). |
| `docker.semantic.defaultK` | number | `8` | Default number of results returned by semantic search. |
| `docker.semantic.maxK` | number | `20` | Maximum allowed `k` for semantic search queries. |
| `docker.semantic.maxChunkChars` | number | `1000` | Maximum characters per indexed chunk. |
| `docker.semantic.snippetChars` | number | `200` | Characters shown in search result snippets. |
| `docker.semantic.resultMode` | string | `"paths_min"` | Default result format for search responses. |
| `docker.semantic.model` | string | `"BAAI/bge-small-en-v1.5"` | Embedding model used by the sidecar. |
| `manifest` | object | `{}` | Platform capability overrides. Deep-merged over the base manifest in `lib/manifest.json`. |

## Profiles

| Behavior | `minimal` | `standard` | `discovery` |
|----------|-----------|------------|-------------|
| Safety hooks (harness-guard, protect-memory) | active | active | active |
| prompt-preamble | off | active | active |
| search-guard | off | active | active |
| knowledge-tracker | off | active | active |
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
  "treeDepth": 5,
  "nudgeThreshold": 15,
  "warnThreshold": 30,
  "docker": {
    "search": { "address": "localhost", "port": 9185 }
  }
}
```
