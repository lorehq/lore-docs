---
title: Working with Lore
---

# Working with Lore

## Core Principle

**You direct, Lore captures.** Each session builds on the last. You don't need to set anything up, create roadmaps, or plan ahead — just start working. Hooks prompt knowledge capture as you go. Use `/lore-capture` after substantive work to ensure nothing was missed.

## Just Start Working

Tell Lore what you need — it figures out tools, agents, and APIs on its own:

```
"Connect us to Jira and pull all open INFRA tickets."
"The VPN endpoint is 10.0.1.1 and the Azure tenant ID is abc-123 — remember that."
"Set up a CI pipeline for the auth service repo."
```

Skills and agents emerge from demonstrated need, not upfront planning.

## Do This

| Action | Example |
|--------|---------|
| **Ask for work** | "Connect us to Jira and pull all open INFRA tickets" |
| **Share context** | "The API endpoint is at https://api.example.com/v2" |
| **Request documentation** | "Document the architecture decisions we just made" |
| **Ask questions** | "What agents do we have available?" |

## Tips

| Approach | Why |
|----------|-----|
| Work naturally, let skills emerge | Skills are best when they capture real gotchas from actual work |
| Work in a domain, let agents emerge | Agents form around demonstrated need, not upfront planning |
| Break compound work into branches | Independent branches can run in parallel subagents; dependency chains stay sequential |
| Bring your own skills and agents | Drop them in and tell Lore to capture — it'll update registries |
| Let Lore maintain registries | Registries, nav, and cross-references are where consistency matters most |

## Roadmaps, Plans & Brainstorms

For longer initiatives, ask Lore to create roadmaps (strategic arc), plans (tactical work), or brainstorms (ideas worth keeping). Active items appear in every session's startup output. Lore asks before updating any roadmap or plan.

See [Roadmaps & Plans](roadmaps-and-plans.md) for format details.
