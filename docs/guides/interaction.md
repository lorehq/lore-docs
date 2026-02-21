---
title: Working with Lore
---

# Working with Lore

**You direct, Lore captures.** Each session builds on the last. You don't need to set anything up, create roadmaps, or plan ahead — just start working. Hooks prompt knowledge capture as you go. Use `/lore-capture` after substantive work to ensure nothing was missed.

## Just Work

| Action | Example |
|--------|---------|
| **Ask for work** | "Connect us to Jira and pull all open INFRA tickets" |
| **Share context** | "The VPN endpoint is 10.0.1.1 and the Azure tenant ID is abc-123 — remember that" |
| **Request documentation** | "Document the architecture decisions we just made" |
| **Ask questions** | "What agents do we have available?" |

Skills and agents emerge from demonstrated need, not upfront planning.

## Tips

| Approach | Why |
|----------|-----|
| Work naturally, let skills emerge | Skills are best when they capture real gotchas from actual work |
| Let workers handle complex tasks | The orchestrator delegates with curated skills — no upfront agent planning |
| Break compound work into branches | Independent branches can run in parallel subagents; dependency chains stay sequential |
| Bring your own skills | Copy them in, run `/lore-capture` — see below |
| Let Lore maintain registries | Registries, nav, and cross-references are where consistency matters most |

## Bringing Existing Skills

If you have skills from other projects or custom markdown files you've been copying between repos, Lore can absorb them.

**What to do:**

1. Copy your skill files into `.lore/skills/<skill-name>/SKILL.md`
2. Each skill needs YAML frontmatter with two required fields:

    ```yaml
    ---
    name: my-api-quirk
    description: One-line summary of what this skill captures
    ---
    ```

3. Run `/lore-capture` — it updates registries and syncs to all platforms

**Workers load skills dynamically.** Don't copy agents between projects. Instead, import your skills — the orchestrator selects the right ones per-task by name and description when spawning workers. Operator agents are optional for recurring delegation patterns.

**After import, sharing is automatic.** Once skills are in your Lore hub, every [linked repo](cross-repo-workflow.md#ide-workflow-lore-link) gets them. No more copying between projects.

## Roadmaps, Plans & Brainstorms

See [Roadmaps & Plans](roadmaps-and-plans.md).

## Command Reference

Commands are slash-invoked skills.

### Knowledge Capture

| Command | What it does |
|---------|-------------|
| `/lore-capture` | Review session work, capture skills, update registries, validate consistency |
| `/lore-consolidate` | Deep health check — find stale items, semantic overlaps, knowledge drift |

`/lore-capture` is the primary end-of-session command.

### Work Management

See [Roadmaps & Plans](roadmaps-and-plans.md) for format and workflow.

### Instance Management

| Command | What it does |
|---------|-------------|
| `/lore-status` | Show Lore version, hook health, skill/agent counts, active work |
| `/lore-update` | Pull latest framework files from GitHub without touching operator content |

See [Platform Support: Sync Boundaries](platform-support.md#sync-boundaries) for what `/lore-update` does and doesn't touch.

### Cross-Repo Linking

| Command | What it does |
|---------|-------------|
| `/lore-link <target>` | Link a work repo — hooks fire from hub |

See [Cross-Repo Workflow](cross-repo-workflow.md) for full flag reference.

### Docs UI

| Command | What it does |
|---------|-------------|
| `/lore-docker` | Start, stop, or check the local Docker sidecar — provides semantic search and a live MkDocs UI. Falls back to local mkdocs if Docker is unavailable. See [Docs UI & Semantic Search](../guides/docs-ui.md). |
