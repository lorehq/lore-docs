---
title: "Create Fieldnote"
---

---
name: lore-create-fieldnote
description: Create a new fieldnote when an operation hit a non-obvious environmental snag (gotcha, quirk)
type: command
user-invocable: false
allowed-tools: Write, Edit, Read, Glob
---

# Create Fieldnote

**Every snag (gotcha, quirk) becomes a fieldnote. No exceptions.**

Fieldnotes capture environmental knowledge from failures — auth quirks, encoding issues, parameter tricks, platform incompatibilities. They are **MACHINE-GLOBAL** and live in `~/.lore/fieldnotes/` (copied to project `.lore/fieldnotes/` for platform projection).

## SENSITIVE INFORMATION GUARD (CRITICAL)

**Fieldnotes MUST be generic.** They are shared across all projects on this machine. You MUST NOT include:
- **IP Addresses**: Use `<node-ip>`, `<internal-ip>`, or reference `docs/knowledge/environment/`.
- **Hostnames**: Use `<host>`, `<server>`, or `<vmid>`.
- **Credentials**: No keys, tokens, passwords, or secret values. Reference their NAME only.
- **Project Data**: No customer names, specific database schemas, or proprietary logic.
- **Personal Info**: No emails, usernames, or local paths containing your name.

**PRE-SAVE SCAN**: Before writing the file, you MUST grep your own proposed content for patterns like `[0-9]{1,3}\.[0-9]{1,3}`, `http`, `key:`, `secret:`, and specific host prefixes. If found, genericize them.

## Process

### Step 1: Create Global Fieldnote

**Location**: `~/.lore/fieldnotes/<fieldnote-name>/FIELDNOTE.md` (Create directory if missing).

Keep it **30-80 lines**. Only document what's non-obvious.

```markdown
---
name: <fieldnote-name>
description: One-line description
user-invocable: false
allowed-tools: Bash, Read, etc
---
# Fieldnote Name

## Context
[2-3 lines on when this applies. Reference KB for environment facts.]

## Snags
[The actual value — what surprised you. MUST BE GENERIC.]

## Workaround
[How to fix or avoid the issue using generic placeholders.]
```

### Step 2: Copy to Project

Copy the global directory to the project-local directory (DO NOT SYMLINK):
`cp -r ~/.lore/fieldnotes/<fieldnote-name> .lore/fieldnotes/`

### Step 3: Sync Platform Copies

```bash
bash scripts/sync-platform-skills.sh
```

## Naming

Pattern: `<service>-<action>-<object>` (e.g., `eslint-10-node-18-crash`, `git-mv-gitignored-files`).

**Do not use the `lore-` prefix** — that's reserved for harness command skills.

## Splitting Rules

- ONE interaction method per fieldnote (API, CLI, MCP, SDK, UI)
- Over ~80 lines -> split by concern
- Cross-cutting policies -> separate fieldnote

## Naming

Pattern: `<service>-<action>-<object>` (e.g., `eslint-10-node-18-crash`, `git-mv-gitignored-files`).

**Do not use the `lore-` prefix** — that's reserved for harness command skills.
