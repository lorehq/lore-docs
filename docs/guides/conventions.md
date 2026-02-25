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

Convention enforcement works on all three platforms. See [Platform Overview](platforms/index.md) for the mechanism comparison.

## Default Conventions

Every new Lore instance ships with conventions across two ownership tiers:

### Operator Conventions (seed files)

Created from seed templates on first install. You own these — the harness never overwrites them. On `/lore-update`, Lore compares seed templates to your versions and offers opt-in adoption of any changes.

| Convention | What it corrects |
|---|---|
| **Coding** | Over-engineering, speculative features, unrelated changes, unverified work |
| **Documentation** | Duplication, sprawl, doc rot, unsolicited docs, vague references |
| **Security** | Secrets in version control, excessive privileges, missing boundary validation |

### System Conventions (`system/` subdirectory)

Harness-owned — overwritten on every `/lore-update`. Live in `docs/context/conventions/system/`. To override a system convention, create a file with the same name in the parent directory.

| Convention | What it corrects |
|---|---|
| **Knowledge Capture** | Scattered facts, one-page-per-tiny-thing proliferation, high update cost |
| **Knowledge Base Structure** | Poor file naming, deep nesting, weak retrieval, missing frontmatter |
| **Work Items** | Inconsistent formatting in plans, roadmaps, and brainstorms |

Operator files take precedence over system files with the same name.

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
- **File name** becomes the menu label. Use descriptive kebab-case: `api-design.md`, `email-drafting.md`, `diagrams.md`. The agent uses the file name to decide whether to load the convention, so prefer self-explanatory names (`email-drafting.md`) over vague ones (`comms.md`).

Default conventions (both operator and system) have hardcoded path routing — their bold principles are injected automatically before writes to matching paths. The guard checks the parent directory first, then falls back to `system/`. Custom conventions appear as a menu listing at write-time.
