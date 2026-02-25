---
title: Security
---

# Security

Security in Lore isn't a feature you enable — it's part of the agent's identity from the first session.

## The Problem

Coding agents generate files. Those files get committed, pushed, shared, and sometimes leaked. An agent that treats a database connection string like any other string is one `git push` away from a credential exposure. Telling the agent "be careful with secrets" in a single prompt doesn't stick — the instruction falls out of context as the session progresses.

Lore solves this with layered reinforcement: security rules are baked into the agent's core identity, enforced by hooks at every write, and self-heal if removed.

## Three Layers

### 1. Core Identity

The agent's instructions (`instructions.md`) define it as a **security gatekeeper** — not as an afterthought, but as one of its primary roles. This isn't a tip buried in a long document. It's a top-level identity trait that shapes how the agent approaches every task.

The security convention itself is a concise set of principles:

- **Reference, don't embed** — store vault paths and env var names, never secret values
- **Sanitize what you generate** — use obviously fake placeholders in examples and configs
- **Validate at boundaries** — trust internal code, verify external input
- **Escalate uncertainty** — when unsure if data is sensitive, ask before writing

These principles load into the session banner at startup, so the agent sees them before its first action.

### 2. Write-Time Reinforcement

Knowing the rules at session start isn't enough. Context windows are long, sessions are longer, and instructions drift out of attention. Lore's **convention guard** hook fires before every file write or edit, injecting a security checkpoint at the moment it matters most — right before content hits disk.

The checkpoint forces a decision:

> *Security checkpoint — assess this write. Does it contain secrets, credentials, or sensitive values? Replace with references (env var names, vault paths) or escalate to the operator. When uncertain, ask before writing.*

This isn't a passive list of principles. It's a gate that makes the agent stop and evaluate every write: is this value sensitive? If yes, redact it with a reference or escalate. If uncertain, ask. If clean, proceed.

Other conventions (docs, work items) are path-scoped. Security fires for *every* write to *any* file.

### 3. Self-Healing Convention

The security convention is a **sticky file**. If it's missing when a session starts, Lore regenerates it from the shipped seed template. This covers accidental deletion, bad merges, or clean installs.

But what if the file is deleted *during* a session? The convention guard handles that too — if it detects the security convention is gone, it regenerates from the seed before continuing. Security enforcement doesn't wait for the next session.

Operator modifications are always preserved. The self-heal only triggers when the file is truly missing, not when the operator has customized it.

## What This Means in Practice

A typical write in a Lore session looks like this:

1. Agent decides to write a config file
2. Convention guard fires: *"Security checkpoint — assess this write..."*
3. Agent evaluates the content, decides `DATABASE_URL` is sensitive, writes `DATABASE_URL=<your-connection-string>` instead of a real credential
4. Capture reminder fires, prompting the agent to note the env var in environment docs

No manual intervention. No per-session reminders. Every write passes through a security checkpoint.

## Delegated Workers

Security enforcement extends to delegated workers. When the orchestrator spawns a worker agent, the worker's process includes an explicit write-assessment step — before writing or editing any file, the worker checks for sensitive content and verifies the file is within the scope the orchestrator assigned. If either check fails, the worker stops and returns to the orchestrator for guidance rather than proceeding.

This means security enforcement doesn't depend on the orchestrator reviewing every write after the fact. Workers carry the same security awareness as the orchestrator — assess every write, replace sensitive values with references, and escalate uncertainty.

## Customization

The security convention lives at `docs/context/conventions/security.md`. You own it — Lore never overwrites your modifications. Edit the principles to match your organization's security posture, and the hooks automatically enforce your version.

To learn more about conventions, see the [Conventions guide](../guides/conventions.md). For hook mechanics, see [Hook Architecture](hook-architecture.md).

## Supply Chain

Lore has zero npm runtime dependencies. For the full supply chain analysis and trust model, see [Production Readiness: Security and Trust Model](production-readiness.md#security-and-trust-model).

## See Also

- [Production Readiness](production-readiness.md) — trust model, audit instructions, supply chain details
- [Hook Architecture](hook-architecture.md) — how convention-guard fires and integrates with the lifecycle
- [Conventions guide](../guides/conventions.md) — how to customize the security convention
