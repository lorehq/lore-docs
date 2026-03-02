---
title: "Customization"
---

# Customization

## Agent Rules

`docs/context/agent-rules.md` is injected into every agent session as the PROJECT context. Put your project identity, behavior rules, and coding standards here.

The file is **sticky** — if deleted, the session hook recreates it with a skeleton template on next startup. Customize the template sections (About, Agent Behavior, Rules, Coding Rules) to match your project.

This replaces what you'd normally put in `CLAUDE.md` or `agents.md` — but lives in docs where it's browsable and version-controlled.

## Rules

`docs/context/rules/` holds behavioral rules the agent follows when writing files. Each `.md` file is one rule. Rule names are listed before every user message to keep them discoverable, and a write-time guard reinforces relevant principles before every file write based on the target path — security fires on every write, docs fires for `docs/` paths, and so on. Remaining rules are listed as a menu so the agent can self-serve.

To add a custom rule, drop a markdown file in the directory. Use bold principle lines (`**Like this.**`) — the guard extracts these for write-time reminders. No hook changes needed.

## Context vs Knowledge

`docs/context/` holds rules and rules injected every session (agent-rules, coding standards). `docs/knowledge/` holds reference material loaded on-demand (environment details, runbooks, scratch notes).

Both directories are yours to organize — the default structures are starting points, not constraints.

**Adding a section:** Create a directory with markdown files. Run `bash scripts/generate-nav.sh` and it appears in nav automatically. Use kebab-case for directory names — the nav generator converts them to Title Case.

**Removing a section:** Delete the directory and regenerate nav.

**Auto-scaffold:** Directories with markdown files but no `index.md` get one created automatically during nav generation, so every section gets an Overview link.

## Local Notes

The `docs/knowledge/local/` directory is gitignored. Use it for scratch notes, credentials references, or anything you don't want committed. It's sticky — recreated on session start if deleted.

## Nav Generation

Run `bash scripts/generate-nav.sh` to regenerate navigation. A PostToolUse hook detects `docs/` changes and reminds the agent to run this automatically.
