---
title: Conventions
---

# Conventions

Conventions are behavioral rules that shape how your agent writes code, docs, and knowledge entries. They live in `docs/context/conventions/` as markdown files — one file per domain.

## How They Work

Conventions reach your agent through four channels:

1. **Session start** — all convention files load into the session banner at session start.
2. **Per-prompt reminder** — a hook lists convention names before every user message (e.g. `Conventions: coding, docs, security`).
3. **Write-time reinforcement** — a guard fires before every file write or edit, injecting relevant convention principles based on the target path.
4. **Agent initiative** — the agent can read any convention file at any time.

The guard reads bold principle lines (`**Like this.**`) from the convention files.

### Path-Based Routing

| Target path | Conventions injected |
|---|---|
| Any file in the repo | Security |
| `docs/` | Security + Docs |
| `docs/work/` | Security + Docs + Work Items |
| `docs/knowledge/` | Security + Docs + Knowledge Capture |

After injecting matched conventions, the guard lists remaining conventions as a menu so the agent can self-serve those that aren't path-matched.

### Platform Support

| Platform | Mechanism | Automatic? |
|---|---|---|
| Claude Code | PreToolUse hook on Write/Edit | Yes |
| OpenCode | ESM plugin on `tool.execute.before` | Yes |
| Cursor | MCP tool `lore_write_guard` | Agent-initiated (instructed by cursor rule) |

## Default Conventions

Every new Lore instance ships with five conventions:

| Convention | What it corrects |
|---|---|
| **Coding** | Over-engineering, speculative features, unrelated changes, unverified work |
| **Docs** | Duplication, sprawl, doc rot, unsolicited docs, vague references |
| **Knowledge Capture** | Scattered facts, one-page-per-tiny-thing proliferation, high update cost |
| **Security** | Secrets in version control, excessive privileges, missing boundary validation |
| **Work Items** | Inconsistent formatting in plans, roadmaps, and brainstorms |

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

Default conventions have hardcoded path routing — their bold principles are injected automatically before writes to matching paths. Custom conventions appear as a menu listing at write-time.

> **Tip:** The agent uses the file name to decide whether to load a custom convention — `email-drafting.md` is self-explanatory; `comms.md` is not.
