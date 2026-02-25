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

**After import, sharing is automatic.** Once skills are in your Lore hub, every [linked repo](working-across-repos.md#ide-workflow-lore-link) gets them.

## Roadmaps, Plans, Notes & Brainstorms

See [Roadmaps, Plans, Notes & Brainstorms](roadmaps-and-plans.md).

For the full list of slash commands, see [Command Reference](../reference/commands.md).

## See Also

- [Working Across Repos](working-across-repos.md) — using Lore as a hub for multiple repositories
- [Roadmaps & Plans](roadmaps-and-plans.md) — tracking work across sessions
- [Command Reference](../reference/commands.md) — full slash command list
