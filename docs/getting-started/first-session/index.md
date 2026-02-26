---
title: First Session Setup
---

# First Session Setup

Lore ships with first-session setup runbooks for different deployment contexts. Pick the one closest to your use case — the agent adapts from there.

| Profile | Best for |
|---------|----------|
| [**Knowledge Worker**](knowledge-worker.md) | Enterprise or professional environments — cloud infrastructure, VCS, secret stores, org wikis, multiple CLI tools |
| [**Homelab**](homelab.md) | Personal infrastructure — self-hosted services, home automation, local dev stacks, no org context |
| **Personal** *(coming soon)* | Personal productivity — notes, tasks, research, daily workflow; minimal auth complexity. Differs from Knowledge Worker: no org context, optional secret store, single GitHub account at most, simpler model config |

## How to Run

Ask your agent:

> "Walk me through first-session setup."

The agent will follow the appropriate runbook phase by phase. If you're unsure which profile fits, start with **Knowledge Worker** — it covers the broadest set of patterns and most gotchas transfer across profiles.
