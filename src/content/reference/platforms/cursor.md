---
title: Cursor
---

# Cursor

!!! warning "Experimental"
    Cursor support is experimental. See [Platform Overview](index.md#platform-maturity) for what this means.

## Hooks

Six hooks plus an MCP server:

| Hook | Event | Purpose |
|------|-------|---------|
| `session-init.js` | `sessionStart` | Inject dynamic session banner |
| `capture-nudge.js` | `beforeShellExecution` | Deliver capture reminders when transitioning from failed tool use |
| `compaction-flag.js` | `preCompact` | Set flag before context compaction for re-orientation |
| `failure-tracker.js` | `postToolUseFailure` | Track tool failures for capture-nudge coordination |
| `protect-memory.js` | `beforeReadFile` + `preToolUse(Write)` | Block reads/writes to `MEMORY.md` |
| `knowledge-tracker.js` | `afterFileEdit` | Escalating capture reminders after edits |

### MCP Server

The MCP server (`lore-server.js` in `.cursor/mcp/`) provides three tools that compensate for Cursor's missing hook events:

| MCP Tool | Compensates For | Purpose |
|----------|----------------|---------|
| `lore_check_in` | No per-prompt hook | Re-orient agent after compaction, reinforce knowledge-base-first |
| `lore_context` | No context-path-guide in hooks | Show knowledge map tree on demand |
| `lore_write_guard` | No search-guard in hooks | Guard knowledge writes, suggest semantic search |

### Dual Architecture

Cursor's hook model fires hooks on specific events but cannot inject advisory context into the agent's conversation the way Claude Code's `UserPromptSubmit` can. To compensate:

1. **Hooks set state** — `failure-tracker.js` and `compaction-flag.js` write state to disk on events that Cursor silences in output.
2. **Other hooks read state** — `capture-nudge.js` reads failure state in `beforeShellExecution` to deliver capture reminders.
3. **MCP fills gaps** — the MCP server provides on-demand access to context that would otherwise require a per-prompt hook.

## Configuration

**Hooks:** `.cursor/hooks.json` — registers hook files and their events.

**MCP:** `.cursor/mcp.json` — configures the MCP server.

**Rules:** `.cursor/rules/lore-*.mdc` — generated from `.lore/instructions.md`, agent-rules, rules, and agent-registry by `sync-platform-skills.sh`.

## Passive Enforcement Rules

To compensate for the lack of `BeforeTool` hooks, Cursor uses targeted `.mdc` rules for passive enforcement:

- **`lore-ambiguity.mdc`:** Scans for vague terms and forces the agent to ask for concrete bounds.
- **`lore-search-discipline.mdc`:** Enforces the Knowledge-base-first search strategy to prevent token waste.

## Coverage Gaps

| Gap | Impact | Mitigation |
|-----|--------|------------|
| No per-prompt hook | No ambiguity scanning per turn | `lore-ambiguity.mdc` rule provides passive enforcement |
| No context-path-guide in hooks | No automatic tree display on `docs/` writes | `lore_context` MCP tool provides on-demand tree |
| No search-guard | No active hook to block speculative reads | `lore-search-discipline.mdc` rule provides passive enforcement |
