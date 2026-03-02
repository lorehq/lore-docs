---
title: Docs UI & Semantic Search
---

# Docs UI & Semantic Search

A single Docker container that runs locally alongside the agent, providing semantic search over your knowledge base and a live-reloading docs site.

=== "Light"

    ![Docs UI in light mode](../assets/docs-ui-light.png)

=== "Dark"

    ![Docs UI in dark mode](../assets/docs-ui-dark.png)

## What You Get

### Semantic Search

A local HTTP API that indexes all knowledge files, skills, work items, and agents. Agents query by topic or meaning — not just filename — and get back ranked file paths. Hooks use the API automatically when the container is running.

### MkDocs UI

A live-reloading site at `localhost:PORT` that renders your full knowledge base as a browsable site. Useful for seeing exactly what the agent sees, verifying rules and fieldnotes, and navigating large knowledge bases without opening individual files.

## Setup

**Prerequisite:** Docker (Docker Desktop or Docker Engine).

Tell your agent to start the docs sidecar. On first start, Docker pulls the image (`lorehq/lore-docker:latest`) and loads the semantic models — allow 1–3 minutes. The docs site comes up first; semantic search becomes available after model loading completes. Subsequent starts are fast — image and volumes are cached.

You can also ask your agent for a status check, or tell it to stop the sidecar when you're done.

## Ports & Configuration

Ports are auto-computed per project (hash of project name, docs port range 9001–9999). Semantic search runs on docs port + 1000.

If you need specific ports, tell your agent which ports to use — it will update the config. The config looks like this:

```json
{
  "docker": {
    "site":   { "port": 9010 },
    "search": { "port": 10010 }
  }
}
```

The agent writes the resolved ports to `.lore/config.json` automatically after the first successful start.

## Without Docker

Agents fall back to Grep/Glob silently — no configuration needed. The fallback works reliably for small-to-medium knowledge bases; for a brand-new project with minimal docs, it's fine. Once you have more than a few dozen knowledge files, the sidecar provides meaningfully better retrieval quality.

For environment variable options and known issues, see [Configuration Reference](../reference/configuration.md).

## See Also

- [Configuration Reference](../reference/configuration.md) — environment variables, CLAUDE.md auto-regeneration details, and known issues
- [Troubleshooting](../reference/troubleshooting.md) — fix-by-symptom table for Docker issues
