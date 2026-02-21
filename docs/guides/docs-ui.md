# Docs UI & Semantic Search

A single Docker container that runs locally alongside the agent, providing semantic search over your knowledge base and a live-reloading docs site.

## What You Get

### Semantic Search

A local HTTP API that indexes all knowledge files, skills, work items, and agents. Agents query by topic or meaning — not just filename — and get back ranked file paths. Hooks use the API automatically when the container is running.

Without Docker, agents fall back to Grep/Glob (keyword search). That works fine for small knowledge bases and degrades as content grows.

### MkDocs UI

A live-reloading site at `localhost:PORT` that renders your full knowledge base as a browsable site. Useful for seeing exactly what the agent sees, verifying conventions, and navigating large knowledge bases without opening individual files.

## Setup

**Prerequisite:** Docker (Docker Desktop or Docker Engine).

```bash
/lore-docker          # start
/lore-docker stop     # stop
/lore-docker status   # health check
```

On first start, Docker pulls the image (`lorehq/lore-docker:latest`) and loads the semantic models — allow 1–3 minutes. The docs site comes up first; semantic search becomes available once model loading completes (~30–60s after the site is up). Subsequent starts are fast — image and volumes are cached.

## Ports & Configuration

Ports are auto-computed per project (hash of project name, range 9001–9999) so multiple projects never collide. Semantic search runs on docs port + 1000.

Override in `.lore/config.json`:

```json
{
  "docker": {
    "site":   { "port": 9010 },
    "search": { "port": 10010 }
  }
}
```

`/lore-docker start` writes the resolved ports to `.lore/config.json` automatically after the first successful start.

## Without Docker

Agents fall back to Grep/Glob silently — no configuration needed. The fallback works reliably for small-to-medium knowledge bases. If queries start missing relevant content or you want the visual docs site, start the container.

## Gotchas

- Model loading takes 30–60s on first start. The docs site appears before semantic search is ready. `/lore-docker status` reports semantic search health separately from site health.
- During bulk file edits, the file watcher may crash (editor temp files cause a race condition). Restart the container after bulk edits complete.
- The container creates a named Docker volume per project for the search index. First start triggers a full index build; subsequent starts are fast.
