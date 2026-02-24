# Knowledge

The `knowledge/` directory is where Lore stores everything discovered during sessions: environment facts, reusable runbooks, and operator-local preferences. Unlike `context/`, knowledge files are written by the agent as it learns — not pre-authored upfront.

**Don't pre-structure this directory.** Let the agent populate it during [first-session setup](../guides/first-session/index.md), then run the knowledge defrag runbook to organize by content. Manually pre-creating folders produces empty placeholders that the defrag will remove anyway.

- [Environment](environment/index.md)
- [Runbooks](runbooks/index.md)
