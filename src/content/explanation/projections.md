---
title: "Platform Projections"
---

# Platform Projections

The projector transforms canonical Lore content (rules, skills, and agents from `.lore/`) into platform-native formats. Write once in `.lore/`, and the projector generates `CLAUDE.md`, `.cursor/rules/*.mdc`, `GEMINI.md`, `.windsurfrules`, `.clinerules`, and OpenCode configs automatically.

## How It Works

The projector (`projector.js`) runs via `sync-platform-skills.sh`. It reads from two sources:

1. **The global directory** (`~/.lore/`) — machine-global rules, skills, and agents
2. **The Project** (`.lore/`) — project-local overrides

It then writes to platform target directories based on each platform's capabilities.

## What Gets Projected

### Mandate Files

Platforms that support mandates get a single file containing `instructions.md` + the static banner (rules, skills, fieldnote names, runbook names, active work):

| Platform | File |
|----------|------|
| Claude Code | `CLAUDE.md` |
| Gemini CLI | `GEMINI.md` |
| Windsurf | `.windsurfrules` |
| Roo Code | `.clinerules` |

### Skills

For platforms with skill support (currently Claude Code), each skill gets its own directory under `.claude/skills/<skill-name>/SKILL.md`. The projector enriches each skill with:

- **Domain rules** — if the skill has `domain: docs`, the documentation rules are prepended

### Agents

For platforms with agent support (currently Claude Code), user-defined agents from `.lore/agents/` are projected to `.claude/agents/`. Lore does not ship built-in agents — this projection only runs when the user has created agent definitions.

### MDC Rules

Cursor gets rules in `.cursor/rules/lore-core.mdc` format — a single file containing instructions + the static banner, wrapped in MDC frontmatter (`alwaysApply: true`).

### Hook Configs

Platforms with hook support get a settings file generated from templates:

| Platform | File | Source Template |
|----------|------|-----------------|
| Claude Code | `.claude/settings.json` | `.lore/harness/templates/.claude/settings.json` |
| Gemini CLI | `.gemini/settings.json` | `.lore/harness/templates/.gemini/settings.json` |

The `LORE_TOKEN_PLACEHOLDER` string in templates is replaced with the actual token during projection.

## Domain-Based Rule Aggregation

Rules have a `domain` frontmatter field. The projector groups them by domain and injects the matching set into each skill:

```
skill domain: "docs" → gets documentation.md rules
skill domain: "code" → gets coding.md rules
skill domain: "general" (default) → gets no domain-specific injection
```

Security rules are always injected regardless of domain.

## One-Way Sync

Projections are **generated output** — never edit them directly. Changes to `.claude/skills/`, `CLAUDE.md`, `.cursor/rules/`, etc. will be overwritten on the next sync. Always edit the canonical source in `.lore/`.

## Running the Projector

```bash
# Full projection (instructions + skills + hooks)
bash .lore/harness/scripts/sync-platform-skills.sh

# Validate projections match source
bash .lore/harness/scripts/validate-consistency.sh
```

Run both after any structural change to `.lore/`.
