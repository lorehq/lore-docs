---
title: Gemini CLI
---

# Gemini CLI

Gemini CLI is a first-class supported platform. It combines the active interception of lifecycle hooks with the on-demand interaction of MCP tools.

## Hooks

Eight hooks intercept tool calls to shape behavior. Configured in `.gemini/settings.json`.

| Hook | Event | Purpose |
|------|-------|---------|
| `session-init.js` | `SessionStart` | Inject dynamic session banner |
| `prompt-preamble.js` | `BeforeAgent` | Reinforce knowledge-base-first and scan for ambiguity |
| `protect-memory.js` | `BeforeTool` (read_file, grep_search) | Block direct access to `MEMORY.md` |
| `context-path-guide.js`| `BeforeTool` (write_file, replace) | Guide writes to `docs/` with ASCII tree |
| `rule-guard.js` | `BeforeTool` (write_file, replace) | Reinforce domain rules before writes |
| `harness-guard.js` | `BeforeTool` (write_file, replace) | Warn when modifying harness source files |
| `search-guard.js` | `BeforeTool` (read_file, glob) | Nudge toward semantic search before filesystem reads |
| `knowledge-tracker.js`| `AfterTool` | Track "snags" and facts for knowledge capture |

## Configuration

**Instructions:** `GEMINI.md` — foundational mandates loaded automatically.

**Hooks & MCP:** `.gemini/settings.json` — maps hooks to events and configures the MCP server.

## Features

- **Ambiguity Guard:** The `BeforeAgent` hook scans user input for vague terms (like "large files" or "last week") and instructs the agent to clarify before acting.
- **Search Discipline:** Enforces a "Semantic -> Glob -> Grep" strategy, preventing redundant filesystem crawls when semantic search is available.
- **Native MCP:** The CLI natively connects to Lore's `lore-server.js` to provide `lore_check_in` and `lore_context` tools.
