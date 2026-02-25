---
title: Commands
---

# Commands

Commands are things you say to your agent. They trigger specialized routines for common operations. You can also use natural language — the commands below are shortcuts, not the only way.

## Command Reference

| Command | What it does | Natural language equivalent |
|---------|-------------|----------------------------|
| `/lore-capture` | Reviews session work, captures skills, updates registries, validates consistency. | "Run a capture pass" |
| `/lore-consolidate` | Deep health check — finds stale items, semantic overlaps, knowledge drift. | "Do a deep health check on the knowledge base" |
| `/lore-status` | Shows Lore version, hook health, skill counts, worker tiers, and active work. | "What's the current status?" |
| `/lore-update` | Pulls latest harness files from GitHub without touching your content. | "Update Lore to the latest version" |
| `/lore-link <target>` | Links a work repo so hooks fire from the hub. | "Link my-app repo to this hub" |
| `/lore-docker` | Starts, stops, or checks the local Docker sidecar for semantic search and docs UI. | "Start the docs UI" |

!!! tip
    You don't need to memorize these. Describe what you want and the agent routes to the right command. These exist for speed, not necessity.
