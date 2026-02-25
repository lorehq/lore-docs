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
| **Ask questions** | "What workers do we have available?" |

Skills emerge from demonstrated need, not upfront planning.

## Tips

| Approach | Why |
|----------|-----|
| Work naturally, let skills emerge | Skills are best when they capture real gotchas from actual work |
| Let workers handle complex tasks | The orchestrator delegates to ephemeral workers with curated skills and conventions |
| Break compound work into branches | Independent branches can run in parallel subagents; dependency chains stay sequential |
| Bring your own skills | Copy them in, run `/lore-capture` — see below |
| Let Lore maintain registries | Registries, nav, and cross-references are where consistency matters most |

## Bringing Existing Skills

If you have skills from other projects or custom markdown files you've been copying between repos, Lore can absorb them.

**What to do:**

1. Copy your skill files into `.lore/skills/<skill-name>/SKILL.md`
2. Each skill should have YAML frontmatter with `name` and `description` (recommended — skills without a `name` field are silently excluded from the banner skill listing):

    ```yaml
    ---
    name: my-api-quirk
    description: One-line summary of what this skill captures
    ---
    ```

3. Run `/lore-capture` — it updates registries and syncs to all platforms

**After import, sharing is automatic.** Once skills are in your Lore hub, every [linked repo](cross-repo-workflow.md#ide-workflow-lore-link) gets them. No more copying between projects.

## Roadmaps, Plans, Notes & Brainstorms

See [Roadmaps, Plans & Notes](roadmaps-and-plans.md).

## Command Reference

Commands are slash-invoked skills.

**`/lore-capture`** — Review session work, capture skills, update registries, validate consistency. Primary end-of-session command. See [Conventions](conventions.md).

**`/lore-consolidate`** — Deep health check: find stale items, semantic overlaps, knowledge drift. See [Conventions](conventions.md).

**`/lore-status`** — Show Lore version, hook health, skill counts, worker tiers, and active work.

**`/lore-update`** — Pull latest harness files from GitHub without touching operator content. See [Platform Overview: Sync Boundaries](platforms/index.md#sync-boundaries).

**`/lore-link <target>`** — Link a work repo so hooks fire from the hub. See [Cross-Repo Workflow](cross-repo-workflow.md) for the full flag reference.

**`/lore-docker`** — Start, stop, or check the local Docker sidecar for semantic search and a live MkDocs UI. See [Docs UI & Semantic Search](docs-ui.md).

**`/lore-create-note`** — Create a lightweight note for quick capture. See [Roadmaps, Plans & Notes](roadmaps-and-plans.md#notes).

**`/lore-create-roadmap`** — Create a strategic roadmap. See [Roadmaps, Plans & Notes](roadmaps-and-plans.md).

**`/lore-create-plan`** — Create a tactical plan. See [Roadmaps, Plans & Notes](roadmaps-and-plans.md).

**`/lore-create-brainstorm`** — Save a brainstorm for future reference. See [Roadmaps, Plans & Notes](roadmaps-and-plans.md).
