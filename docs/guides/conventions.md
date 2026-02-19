---
title: Conventions
---

# Conventions

Conventions are behavioral rules that shape how your agent writes code, docs, and knowledge entries. They live in `docs/context/conventions/` as markdown files — one file per domain.

## How They Work

Conventions reach your agent through two channels:

1. **Session start** — all convention files are concatenated into the startup banner. The agent sees them at the beginning of every session.
2. **Write-time reinforcement** — a guard fires before every file write, injecting the relevant convention principles based on the target path. This keeps rules in active attention when they matter most.

The guard reads bold principle lines (`**Like this.**`) from the actual convention files. No duplication — the files are the single source of truth.

### Path-Based Routing

| Target path | Conventions injected |
|---|---|
| Any file in the repo | Security |
| `docs/` (general) | Security + Docs |
| `docs/work/` | Security + Docs + Work Items |
| `docs/knowledge/` | Security + Docs + Knowledge Capture |

After injecting matched conventions, the guard lists any remaining conventions as a menu:

```
Other conventions: coding, diagrams — read docs/context/conventions/<name>.md if relevant
```

This lets the agent self-serve conventions that can't be path-matched (like a coding convention when writing source code, or an email-drafting convention when composing messages).

### Platform Support

| Platform | Mechanism | Automatic? |
|---|---|---|
| Claude Code | PreToolUse hook on Write/Edit | Yes |
| OpenCode | ESM plugin on `tool.execute.before` | Yes |
| Cursor | MCP tool `lore_write_guard` | Agent-initiated (instructed by cursor rule) |

## Default Conventions

Every new Lore instance ships with five conventions:

### Coding

Corrects common LLM coding failures — over-engineering, speculative features, unrelated changes, unverified work. Five principles: surface confusion early, write less code, change only what you must, prove it works, plan/execute/verify.

### Docs

Corrects LLM documentation failures — duplication, sprawl, doc rot, unsolicited docs, vague references. Five principles: don't duplicate, keep it short, don't let docs rot, don't create docs nobody asked for, be precise.

### Knowledge Capture

Prevents knowledge base sprawl — scattered facts across files, one-page-per-tiny-thing proliferation, high update cost when data changes. Five principles: one canonical location per fact, consolidate don't scatter, minimize update cost, keep it scannable, don't capture noise.

### Security

Enforces security basics on every write — no secrets in version control, treat everything as public, validate at boundaries, least privilege.

### Work Items

Formatting consistency for plans, roadmaps, and brainstorms — checkboxes, strikethrough on completed items, no emoji icons.

## Creating Custom Conventions

Add a markdown file to `docs/context/conventions/`:

```markdown
# Diagrams

## 1. Keep Diagrams as Code

**Mermaid over images. Text over binaries.**

- Use Mermaid syntax for flowcharts, sequence diagrams, and architecture views.
- Only use image files when the diagram can't be expressed as code.
- Store diagram source alongside the rendered output.

## 2. Label Everything

**Unlabeled boxes are unlabeled confusion.**

- Every node, edge, and swimlane gets a descriptive label.
- Use consistent naming with the codebase (service names, API names).
```

### Format Requirements

- **Bold principle lines** (`**Like this.**`) are what the write-time guard extracts and injects. Make them concise and actionable.
- **Numbered sections** help scanning. Match the pattern of the default conventions.
- **File name** becomes the menu label. Use descriptive kebab-case: `api-design.md`, `email-drafting.md`, `diagrams.md`.

Your convention appears automatically in:

- The session start banner (all conventions are loaded)
- The write-time menu (listed for any write where it wasn't already injected)

No hook changes, no configuration, no registration. Drop the file in and it works.

### Path-Matched vs Menu Conventions

The five default conventions have hardcoded path routing (security always fires, docs fires for `docs/` paths, etc.). Custom conventions appear in the menu — the agent sees them listed and decides whether to load them.

If your convention applies to a specific file pattern and you need automatic injection, that requires a hook change. For most conventions, the menu is sufficient — the agent sees the name on every write and can choose to read it when relevant.

## Relationship to Other Context

| File | Purpose | Loaded |
|---|---|---|
| `docs/context/agent-rules.md` | Project identity, behavior rules | Every session (banner) |
| `docs/context/conventions/*.md` | Domain-specific behavioral rules | Every session (banner) + write-time (guard) |
| `.lore/instructions.md` | Framework instructions (knowledge routing, ownership, capture) | Always (CLAUDE.md / cursor rules) |

Conventions complement instructions — instructions define the framework's mechanics (where things go, how skills are created), conventions define quality standards (how code should be written, how docs should read).
