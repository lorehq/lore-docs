---
title: Field Repair
---

# Field Repair

When something breaks — a hook error, a script crash, bad agent behavior — your agent has a structured workflow to diagnose it, fix it in the Lore source repo, test it in your instance, and sync the verified fix back.

Tell your agent the symptom, or say `/lore-field-repair` for the guided workflow.

## When to Use

- A hook throws an error or produces wrong output
- A script crashes or behaves unexpectedly
- Agent behavior degrades (missed captures, wrong rules loading, broken delegation)
- Another deployed instance reports a failure

Field repair is for harness bugs — not feature requests, config changes, or application code.

## How It Works

Your agent follows the **field-repair rule** (`docs/context/rules/field-repair.md`) — a 7-step workflow that every Lore instance ships with:

1. **Reproduce** — recreate the failure in the current instance before touching the Lore source repo. The agent will ask you to describe what you see — terminal output, UI behavior, error messages. You're its eyes for anything that isn't visible through tool output.
2. **Isolate** — instrument the failing path with temporary debug output (written to `/tmp`, never stderr — stderr corrupts hook responses). The agent triggers the failure, reads the debug output, and forms a hypothesis. It removes all instrumentation before moving on.
3. **Fix in the Lore source repo** — the agent identifies which repo owns the broken code (see [Repo Ownership](#repo-ownership) below), clones or navigates to it, and writes the fix there. Fixes always go in source — never patch the instance directly.
4. **Test in your instance** — the agent copies the fixed file(s) into your local instance, then asks you to trigger the failing path again. You confirm whether the fix works. The agent reverts the copies after confirmation — the sync path delivers the real fix.
5. **Push and sync** — the agent commits and pushes in the source repo, then runs an update from your instance to pull the fix through the official sync path. It verifies one final time that the fix survived the sync.
6. **Report** — the agent opens a GitHub issue documenting the root cause and fix, so other instances and maintainers know about it.
7. **Capture** — the agent turns the fix into reusable knowledge: a fieldnote for non-obvious failures, an environment doc for new facts, or a runbook update for affected procedures.

## The Operator-Agent Feedback Loop

Field repair is collaborative. The agent can read code, write fixes, and run commands — but it can't see your terminal, your editor UI, or platform-specific behavior that doesn't surface through tool output.

Throughout the workflow, the agent will ask you to:

- **Describe what you see** — error messages, unexpected UI state, terminal output
- **Trigger the failing path** — reproduce the bug so the agent can observe the result
- **Confirm fixes** — verify that the behavior changed after the agent patches your instance

Be precise. "It doesn't work" is hard to act on. "The hook fires but the output is empty" gives the agent something to trace.

## Key Principles

- **Fix in the Lore source repo, not your instance.** Patching the instance directly creates drift. The fix goes in [`lorehq/lore`](https://github.com/lorehq/lore) (or whichever repo owns the code) and reaches your instance through the update path.
- **Debug to `/tmp`, never stderr.** Stderr output corrupts hook responses on all platforms.
- **Sync through the official path.** The agent uses the update command from your instance — never ad-hoc sync scripts.

## Repo Ownership

The Lore ecosystem spans four repos. When the agent asks which one likely owns the issue:

| Repo | What it owns |
|------|-------------|
| [**lorehq/lore**](https://github.com/lorehq/lore) | Hooks, lib modules, scripts, skills, rules, templates — the harness itself |
| [**lorehq/create-lore**](https://github.com/lorehq/create-lore) | Installer, `npx create-lore` entry point |
| [**lorehq/lore-docker**](https://github.com/lorehq/lore-docker) | Docker image, semantic search API, docs UI, filesystem watcher |
| [**lorehq/lore-docs**](https://github.com/lorehq/lore-docs) | Public documentation site |

Most harness bugs live in `lorehq/lore`. The rule includes this table so the agent routes to the right repo without guessing.

## Every Instance Ships the Full Workflow

The field-repair rule and the `/lore-field-repair` skill are part of the Lore harness — every instance created with `npx create-lore` has them. This means every deployed instance has detailed instructions for properly diagnosing bugs, fixing them in source, and contributing verified fixes back. The agent doesn't improvise; it follows a tested, structured procedure.

## The Bigger Picture

Field repair today is a single-instance workflow — your agent fixes a bug in your instance and pushes it to the Lore source repo. But the architecture is designed for something more ambitious.

Every Lore instance encounters its own cross-platform nuances, edge cases, and environment-specific failures. Each fix represents hard-won knowledge. The goal is a **field fix contribution pipeline** where deployed instances automatically package fixes with structured metadata — root cause, affected platforms, reproduction steps — and submit them to the source repo as PRs. AI triage on the source side classifies, deduplicates, and groups incoming fixes. Maintainer intervention becomes review and approval, not discovery and implementation.

The result is a self-evolving ecosystem: the more instances deployed across different platforms and environments, the faster the framework improves — with fixes flowing from the field to source and back out to all instances through normal updates. Every deployed instance becomes a contributor.

## See Also

- [Troubleshooting](../reference/troubleshooting.md) — pre-agent installation fixes and worker tier configuration
- [Upgrading](upgrading.md) — how fixes reach your instance after they're merged
- [Commands](../reference/commands.md) — `/lore-field-repair` and other commands
