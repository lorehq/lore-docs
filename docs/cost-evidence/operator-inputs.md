---
title: Operator Inputs
---

# Operator Inputs

Exact operator messages for each condition, extracted from session JSONL transcripts. Tool approval clicks and CLI commands (`/rename`, `/exit`) are excluded — only substantive task inputs are shown.

## Raw Cold

Identical across all 10 sessions. Two operator messages per session:

**Message 1** (task prompt):
```
See if we have enough inventory to fill all orders from last week.
```

**Message 2** (service discovery — sent after the model asked for clarification or hit a dead end):
```
Orders service is at http://localhost:8787. Inventory service is at http://localhost:8791.
```

The model received no other guidance. It had to discover API versioning, required parameters, and required headers through trial and error. The static CLAUDE.md in the control workspace described a TypeScript API project (unrelated to the task) — this served as a cache-breaker to prevent cross-session prompt cache hits.

## Lore Cold

Three operator messages per session. The Lore framework's session banner and hooks inject context about the knowledge base, delegation rules, and capture conventions — but the operator's task input follows the same pattern.

**Message 1** (task prompt — identical across all 10 sessions):
```
See if we have enough inventory to fill all orders from last week.
```

**Message 2** (clarification — slight wording variation across sessions):

The model asked clarifying questions. Representative responses:

- lore-01: `1. Orders service is at http://localhost:8787. Inventory service is at http://localhost:8791. 2. LAST week. 3. duh`
- lore-05: `1: Orders service is at http://localhost:8787. Inventory service is at http://localhost:8791. 2: Last business week 3. on-hand`
- lore-10: `1. Orders service is at http://localhost:8787. Inventory service is at http://localhost:8791. 2. LAST week. 3. enough to fulfill`

All responses provide the same two service URLs. The wording of "last week" and "enough inventory" varied slightly but conveyed the same intent.

**Message 3** (capture approval):
```
yes
```

After delivering the answer, the model proposed writing environment documentation (service endpoints, required params/headers, API gotchas). The operator approved with "yes" (or "yes, write those up" in some sessions). This triggered the capture phase.

## Lore Warm

One operator message. Knowledge from the cold session persists — the model already knows the endpoints, parameters, headers, and gotchas.

**Message 1** (task prompt — identical to cold):
```
See if we have enough inventory to fill all orders from last week.
```

No clarification needed. No capture approval needed. The model used existing knowledge to answer directly.

## Lore Hot

Two operator messages. Knowledge from cold and warm persists. After answering, the operator requests a runbook.

**Message 1** (task prompt — identical):
```
See if we have enough inventory to fill all orders from last week.
```

**Message 2** (runbook creation request):
```
create a runbook for this, using the prior business week up until end of business on the previous friday from when the run occurs. Make sure the runbook includes the appropriate skills and uses delegation for the whole operation.
```

This triggers the capture phase — the model writes a step-by-step runbook to `docs/knowledge/runbooks/`.

## Lore Runbook

One operator message. Full knowledge stack persists: skills, environment docs, and the runbook from the hot session.

**Message 1** (minimal trigger):
```
fulfillment
```

A single word. The runbook is surfaced via the session banner's knowledge map. The model matches the trigger to the documented procedure and executes it without further guidance.

## Operator Input Progression

| Condition | Messages | What the operator provides |
|-----------|----------|---------------------------|
| Raw Cold | 2 | Full task prompt + service URLs after dead end |
| Lore Cold | 3 | Full task prompt + clarification + capture approval |
| Lore Warm | 1 | Full task prompt (knowledge handles the rest) |
| Lore Hot | 2 | Full task prompt + runbook creation request |
| Lore Runbook | 1 | One word ("fulfillment") |

The operator's effort decreases as knowledge accumulates. By the runbook stage, a single word triggers a complete, documented procedure.
