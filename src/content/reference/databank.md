---
title: "Databank"
---

# Databank

The databank at `~/.lore/MEMORY/DATABANK/` stores persistent knowledge that agents discover at runtime via the session banner and semantic search. Unlike rules, skills, and agents, databank content is not projected into platform files.

## Fieldnotes

Captured snags, gotchas, and patterns from real work. Fieldnotes are the primary output of the knowledge capture process — when an agent hits a non-obvious issue, it becomes a fieldnote so the same mistake isn't repeated.

| Property | Value |
|----------|-------|
| Location | `~/.lore/MEMORY/DATABANK/fieldnotes/<name>/FIELDNOTE.md` |
| Discovery | Banner name list + semantic search |
| Scope | Global |

**Frontmatter:**
```yaml
---
name: eslint-10-node-18-crash
description: ESLint 10 crashes on Node 18 due to missing structuredClone
captured: 2025-03-15
tags: [eslint, node, compatibility]
---
```

High-heat facts graduate to fieldnotes via `/lore memory burn`. The operator reviews hot cache entries and promotes reusable snags to permanent fieldnotes.

## Runbooks

Multi-step guides for complex operations. Runbooks provide structured autonomy with explicit checkpoints and branching.

| Property | Value |
|----------|-------|
| Location | `~/.lore/MEMORY/DATABANK/runbooks/**/*.md` |
| Discovery | Banner list + semantic search |
| Scope | Global |

**Frontmatter:**
```yaml
---
name: first-session
description: Guided first session setup for a new project
type: guided
---
```

## Structure

The databank has 7 root folders organized into three layers. No loose files at root.

### Identity Layer

| Directory | Purpose |
|-----------|---------|
| `operator/` | Operator identity and preferences. Contains `operator-profile.md` (sticky — auto-created if missing) and supporting docs (org identity, accounts, working style). |
| `machine/` | This host's specs. Contains `machine-profile.md` (sticky — auto-created if missing) and supporting docs (runtimes, network, local config). |

### Knowledge Layer

| Directory | Purpose |
|-----------|---------|
| `environment/` | External world: services, endpoints, platforms, tooling config. Agent-organized — free structure within. |
| `fieldnotes/` | Captured snags and gotchas. One folder per fieldnote (`{name}/FIELDNOTE.md`). |
| `runbooks/` | Multi-step operational procedures. Subcategories: `system/`, `first-session/`, and topic-based. |

### Work Layer

| Directory | Purpose |
|-----------|---------|
| `workspace/drafts/brainstorms/` | Design explorations. Folder-per-brainstorm (no loose files) — each contains `index.md` plus supporting material. |
| `workspace/drafts/notes/` | Quick notes. Single files only (no folders). |
| `workspace/projects/` | Session log archives — per-project session history managed by the `lore-databank-agent`. |
| `workspace/work-items/initiatives/` | Jira-like 3-tier hierarchy. Initiatives contain epics, epics contain items. Nested only — path encodes lineage. |

### Staging

| Directory | Purpose |
|-----------|---------|
| `imports/` | Unsorted incoming docs. Temporary staging — sort into proper areas promptly. |

### Strict Children Rules

Some paths have fixed children — creating anything else is forbidden:

- `workspace/` — only `drafts/`, `projects/`, `work-items/`
- `workspace/drafts/` — only `brainstorms/`, `notes/`
- `workspace/work-items/` — only `initiatives/` (entry point is always an initiative)

## How Agents Discover Knowledge

1. **Banner** — fieldnote and runbook names are listed in the session banner at startup, giving agents awareness of what's available
2. **Semantic search** — the Docker memory engine indexes all databank files, enabling natural-language queries via the `lore_search` MCP tool
3. **Direct reads** — agents can read any databank file directly once they know its path

Databank writes are guarded — agents propose changes, the operator approves. The harness-guard hook gates agent writes to `~/.lore/`, prompting the operator for approval.
