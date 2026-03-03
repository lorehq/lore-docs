---
title: "Platform Support"
---

Platform support is defined in `.lore/harness/lib/manifest.json`. The projector (`lib/projector.js`) reads this manifest and generates platform-native files. All platforms share the same knowledge base, rules, skills, and agents in `.lore/`.

## Capability matrix

| Platform | Mandates | Hooks | MDC Rules | Skills | Agents | MCP | Maturity |
|----------|----------|-------|-----------|--------|--------|-----|----------|
| Claude Code | yes | yes | — | yes | yes | yes | Primary |
| Gemini CLI | yes | yes | — | — | — | yes | Active |
| Cursor | — | — | yes | — | — | yes | Active |
| Windsurf | yes | — | — | — | — | — | Basic |
| Roo Code | yes | — | — | — | — | yes | Basic |
| OpenCode | — | yes | — | — | — | — | Basic |

## Generated files per platform

### Claude Code

| Capability | Output path |
|------------|-------------|
| Mandate file | `CLAUDE.md` |
| Hook config | `.claude/settings.json` |
| Skills | `.claude/skills/<name>/SKILL.md` |
| Agents | `.claude/agents/<name>.md` |
| MCP config | Embedded in `.claude/settings.json` |

Instructions and the static banner are concatenated into `CLAUDE.md`. Hook configuration is projected from `.lore/harness/templates/.claude/settings.json`. The `LORE_TOKEN_PLACEHOLDER` string in the template is replaced with the project's lore token at projection time.

### Gemini CLI

| Capability | Output path |
|------------|-------------|
| Mandate file | `GEMINI.md` |
| Hook config | `.gemini/settings.json` |
| MCP config | Embedded in `.gemini/settings.json` |

Hook configuration is projected from `.lore/harness/templates/.gemini/settings.json`.

### Cursor

| Capability | Output path |
|------------|-------------|
| MDC rules | `.cursor/rules/lore-core.mdc` |

MDC rules are generated with `alwaysApply: true` frontmatter. Instructions and the static banner are combined into a single `lore-core.mdc` file.

### Windsurf

| Capability | Output path |
|------------|-------------|
| Mandate file | `.windsurfrules` |

Mandate-only platform. Instructions and the static banner are written to `.windsurfrules`.

### Roo Code

| Capability | Output path |
|------------|-------------|
| Mandate file | `.clinerules` |

Mandate-only platform with MCP support. Instructions and the static banner are written to `.clinerules`.

### OpenCode

| Capability | Output path |
|------------|-------------|
| Hook config | Platform-native plugin system |

Hooks are implemented as ESM plugins that import shared libraries from `.lore/harness/lib/`.

## Manifest overrides

The `manifest` field in `config.json` is deep-merged over the base manifest. This allows adding capabilities or changing output paths per project:

```json
{
  "manifest": {
    "platforms": {
      "cursor": {
        "capabilities": ["mdc", "mcp", "skills"]
      }
    }
  }
}
```

## Projection

Run the projector to regenerate all platform files:

```bash
bash .lore/harness/scripts/sync-platform-skills.sh
```

The projector reads instructions from `.lore/instructions.md`, builds the static banner, scans domain-tagged rules, then writes platform-specific files. It is idempotent -- files are only written when content changes.
