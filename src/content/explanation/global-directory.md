---
title: "Global and Project Directories"
---

# Global and Project Directories

Lore separates machine-global knowledge (the `~/.lore/` directory) from project instances. This separation keeps private context out of project repositories while sharing it across every project on the machine.

## The Global Directory (~/.lore/)

The global directory is a Git repository in your home folder. It stores knowledge that applies across all your projects:

```
~/.lore/
├── config.json
├── skills/              ─┐
├── rules/               ─┤ Behavioral spec
├── agents/              ─┘ (optional, user-defined)
├── knowledge-base/      ── Persistent KB (write-guarded)
│   ├── fieldnotes/          Captured snags and gotchas
│   ├── runbooks/            Multi-step procedures
│   ├── operator-profile.md  Operator identity & preferences
│   ├── work-items/          Initiatives, epics, items
│   ├── drafts/              Brainstorms, notes, collaboration scratch
│   └── environment/         Host machine, services, endpoints, network topology
└── redis-data/          ── Hot Cache persistence (Docker mount)
```

The global directory is operator-managed. You maintain it with Git like any other repo. The harness-guard hook blocks direct agent writes to `~/.lore/`. Agents read freely; writes to the Knowledge Base go through operator-gated processes like `/lore-memprint`. The only unguarded writes are to the Hot Cache (Redis), which agents use as working memory.

### What the Global Directory Contains

The global directory has three conceptual layers:

**Rules, Skills, and Agents** — The three standard components of the agentic framework. Rules govern behavior, skills provide capabilities, and agents define specialized personas. These are version-controlled, operator-managed, and projected into platform-native formats. See [What Lore Manages](../reference/managed-content.md) for details.

**The Knowledge Base** — Structured markdown files with write-guard protection. Contains: `fieldnotes/` (captured snags and gotchas), `runbooks/` (multi-step procedures), `operator-profile.md` (injected at session start), `work-items/` (Jira-aligned tracking), `drafts/` (brainstorms and notes), and `environment/` (host machine info, service endpoints, network topology). Agents propose changes via memprint; the operator approves.

**Hot Cache Data** — Redis persistence directory (`redis-data/`), mounted by the Docker sidecar. Stores transient session facts with heat-based decay. Data survives container restarts because it lives in the global `~/.lore/` filesystem, not the container.

## Project Instances

Each project repository carries its own `.lore/` directory with project-specific content:

```
my-project/
├── .lore/
│   ├── config.json      # Project config (overrides global)
│   ├── instructions.md  # Core protocol
│   ├── harness/         # Hooks, scripts, templates
│   ├── skills/          # Project-specific skills
│   ├── rules/           # Project-specific rules
│   └── memory.local.md  # Session scratchpad (gitignored)
├── docs/
│   └── context/         # Project identity and context
├── src/                     # Project codebase
└── CLAUDE.md            # Generated platform projection
```

## Merge Behavior

At runtime, the harness merges global and project content. The project takes precedence:

| Content | Merge Strategy |
|---------|---------------|
| **Config** | Deep merge. Project fields override global fields. |
| **Rules** | Both loaded. Global rules + project rules, deduplicated by filename. |
| **Skills** | Both scanned. Project skills appear alongside global skills. |
| **Fieldnotes** | Global only (`~/.lore/knowledge-base/fieldnotes/`). |
| **Runbooks** | Global only (`~/.lore/knowledge-base/runbooks/`). |

The merge happens in `banner.js` (for session banners) and `projector.js` (for platform projections). There is no file copying — the harness reads from both directories at runtime.

## What Goes Where

| Content | Location | Why |
|---------|----------|-----|
| Snag you'll hit in any project | `~/.lore/knowledge-base/fieldnotes/` | Cross-project knowledge |
| Deployment procedure | `~/.lore/knowledge-base/runbooks/` | Reusable across projects |
| Your coding standards | `~/.lore/rules/coding.md` | Apply everywhere |
| Project-specific lint config | `.lore/rules/` | Only this project's conventions |
| Docker sidecar config | `.lore/config.json` (docker section) | Per-project ports |
| Operator profile | `~/.lore/knowledge-base/operator-profile.md` | Personal, cross-project |
| Service endpoints, host info | `~/.lore/knowledge-base/environment/` | Machine-specific facts |

## Global Directory Setup

The global directory is not created automatically by `create-lore`. To set one up:

```bash
mkdir -p ~/.lore/{skills,rules,knowledge-base/{fieldnotes,runbooks,environment}}
cd ~/.lore && git init
```

Without a global `~/.lore/` directory, the harness works fine — all rules, skills, and agents come from the project's `.lore/` directory. The global directory adds cross-project persistence.

## Versioning

The global directory is a standard Git repo. Commit after adding fieldnotes, updating rules, or changing your operator profile. This gives you a history of your machine-global knowledge and the ability to recover from mistakes.

Project `.lore/` files are part of the project repo and follow its commit history.
