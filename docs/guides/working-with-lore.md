---
title: Working with Lore
---

# Working with Lore

**You direct, Lore captures.** Each session builds on the last. You don't need to set anything up, create roadmaps, or plan ahead — just start working. Hooks prompt knowledge capture as you go.

## Just Work

| Action | Example |
|--------|---------|
| **Ask for work** | "Connect us to Jira and pull all open INFRA tickets" |
| **Share context** | "The VPN endpoint is 10.0.1.1 and the Azure tenant ID is abc-123 — remember that" |
| **Request documentation** | "Document the architecture decisions we just made" |
| **Ask questions** | "What workers do we have available?" |
| **Capture knowledge** | "Run a capture pass" or `/lore-capture` |
| **Create work items** | "Let's create a roadmap for the API migration" |

Skills emerge from demonstrated need, not upfront planning.

## Tips

| Approach | Why |
|----------|-----|
| Work naturally, let skills emerge | Skills are best when they capture real gotchas from actual work |
| Let workers handle complex tasks | The orchestrator delegates to ephemeral workers with curated skills and conventions |
| Break compound work into branches | Independent branches can run in parallel subagents; dependency chains stay sequential |
| Let Lore maintain registries | Registries, nav, and cross-references are where consistency matters most |

## Bringing Existing Skills

If you have skills from other projects or custom markdown files you've been copying between repos, tell your agent to import them. Point it at the files or directory and it handles naming, frontmatter, and registry updates.

Once skills are in your Lore hub, every [linked repo](working-across-repos.md#ide-workflow-lore-link) gets them automatically.

## Roadmaps, Plans, Notes & Brainstorms

All work tracking is conversational. Tell your agent what you want:

- "Let's create a roadmap for the infrastructure overhaul"
- "Start a plan for the auth refactor"
- "Capture that as a note"
- "Archive the completed migration plan"

The agent handles file structure, frontmatter, and status tracking. See [Roadmaps & Plans](roadmaps-and-plans.md) for how the system works conceptually.

## See Also

- [Working Across Repos](working-across-repos.md) — using Lore as a hub for multiple repositories
- [Roadmaps & Plans](roadmaps-and-plans.md) — tracking work across sessions
- [Commands](../reference/commands.md) — command shortcuts
