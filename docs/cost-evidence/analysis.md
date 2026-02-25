---
title: Analysis
---

# Analysis

Findings from 50 Claude Code sessions across 5 conditions. All figures are API-equivalent costs (tests ran on Claude Max subscription). Per-session data in [raw-data.md](raw-data.md). Test design in [methodology.md](methodology.md). Operator messages in [operator-inputs.md](operator-inputs.md).

## Summary

| Condition | N | Answer Cost | Capture Cost | Total Cost | Answer Time | Capture Time | vs Raw Cold |
|-----------|---|-------------|--------------|------------|-------------|--------------|-------------|
| Raw Cold | 10 | $0.45 | — | $0.45 | 1m 12s | — | baseline |
| Lore Cold | 10 | $0.32 | $0.08 | $0.43 | 1m 22s | 0m 35s | cost -29% |
| Lore Warm | 10 | $0.24 | ~$0.01 | $0.24 | 1m 4s | — | cost -46%, time -11% |
| Lore Hot | 10 | $0.24 | $0.08 | $0.35 | 0m 57s | 0m 37s * | cost -46%, time -21% |
| Lore Runbook | 10 | $0.19 | — | $0.19 | 0m 40s | — | cost -59%, time -44% |

!!! danger ""
    **\*** Lore Hot capture time is **operator-initiated runbook creation** — the operator explicitly asked the agent to write a runbook after getting the answer. This is not automatic framework behavior.

All values are medians except capture cost (mean — most sessions have zero capture, so median would be $0). "vs Raw Cold" compares answer cost and answer time against the Raw Cold baseline.

Key findings:

- **59% cost reduction** from raw baseline to runbook execution
- **44% faster execution** at runbook stage (answer time drops from 1m 12s to 40s)
- **Total capture investment of $0.17** pays back in less than 1 runbook run
- **Operator input drops** from 2 messages with service URLs to 1 word ("fulfillment")
- **Variance halves** — std dev drops from $0.11 (raw) to $0.04 (runbook)

---

## Cost Progression

### Answer cost by condition

The "answer cost" is the cost of getting the result — everything before the first write to skills, environment docs, or runbooks. This isolates the cost of the task itself from the knowledge capture investment.

| Condition | Mean | Median | Std Dev | Min | Max |
|-----------|------|--------|---------|-----|-----|
| Raw Cold | $0.4542 | $0.4532 | $0.1098 | $0.3017 | $0.6080 |
| Lore Cold | $0.3495 | $0.3226 | $0.1548 | $0.1919 | $0.6417 |
| Lore Warm | $0.2284 | $0.2429 | $0.0520 | $0.1032 | $0.2945 |
| Lore Hot | $0.2728 | $0.2446 | $0.0710 | $0.1951 | $0.4570 |
| Lore Runbook | $0.1951 | $0.1870 | $0.0421 | $0.1431 | $0.2696 |

**Cold → Cold (-29%):** Even on the first run with an empty knowledge base, Lore's answer cost is lower than raw Claude Code. The mechanism: Lore delegates API exploration to Haiku workers (cache reads at $0.10/MTok vs Opus at $0.50/MTok). The orchestrator reasons about the task while cheaper models do the trial-and-error HTTP calls.

**Cold → Warm (-46%):** The largest single drop. Knowledge captured during the cold session — endpoint URLs, required parameters, required headers, API gotchas — eliminates all trial and error. The model goes directly to the correct API paths on the first attempt.

**Warm → Runbook (-59%):** A documented procedure eliminates even the need for the model to reason about the task structure. One word triggers the complete operation.

### Why Lore Cold has higher variance

Lore Cold std dev ($0.15) is higher than Raw Cold ($0.11). This is expected: the cold session involves more moving parts (framework hooks, worker delegation, capture decision) and the model explores different API paths across instances. Once knowledge stabilizes the approach, variance drops sharply.

---

## Capture Investment

Capture cost is the cost of writing knowledge artifacts — skills, environment docs, and runbooks — at the end of a session. This is the investment that makes future runs cheaper.

| Condition | Sessions with Capture | Mean Capture Cost | What's Captured |
|-----------|----------------------|-------------------|-----------------|
| Lore Cold | 10/10 | $0.0814 | Skills (API gotchas) + environment docs (endpoints, params, headers) |
| Lore Warm | 1/10 | $0.0087 | Minor doc updates (lore-01 only) |
| Lore Hot | 10/10 | $0.0795 | Runbook (step-by-step procedure) |
| Lore Runbook | 0/10 | — | Nothing — pure execution |

**Total capture investment per instance:** $0.0814 + $0.0087 + $0.0795 = **$0.17**

**Savings per runbook run vs raw cold:** $0.4532 - $0.1870 = **$0.27** (median)

**Payback:** The $0.17 capture investment is recovered in **less than 1 runbook execution**. Every run after that is pure savings.

### What capture buys

The $0.17 investment produces three categories of reusable knowledge:

1. **Skills** (~$0.04): Document API gotchas — the orders endpoint requires both `from` and `to` params, the inventory endpoint requires an `X-Warehouse: primary` header, the versioned paths differ from the obvious ones. These prevent the model from repeating discovery mistakes.

2. **Environment docs** (~$0.04): Map the service topology — which URLs serve which APIs, what parameters each endpoint accepts, what headers are required. This is the reference material that makes warm sessions possible.

3. **Runbook** (~$0.08): A step-by-step procedure that codifies the complete operation — fetch orders for the date range, extract SKUs, check inventory for each, compare quantities, report shortfalls. This is what enables the single-word trigger.

---

## Execution Time

| Condition | Exec Median | Answer Median | vs Raw Cold (exec) |
|-----------|-------------|---------------|---------------------|
| Raw Cold | 1m 12s | 1m 12s | baseline |
| Lore Cold | 2m 1s | 1m 22s | +68% (slower) |
| Lore Warm | 1m 5s | 1m 4s | -10% |
| Lore Hot | 1m 32s | 0m 57s | +28% (slower) |
| Lore Runbook | 0m 40s | 0m 40s | -44% |

Execution time = sum of `durationMs` from Claude Code system events (per-turn active processing timer). See [methodology.md](methodology.md) for details.

**Cold and hot sessions are slower due to capture.** Lore Cold (+68%) and Lore Hot (+28%) include time spent writing skills, environment docs, and runbooks. Answer time alone tells a different story: Cold is only +14% slower, and Hot is actually 21% faster than raw — knowledge from prior sessions accelerates the answer even before the runbook exists.

**Runbook sessions are 44% faster.** Full knowledge plus a documented procedure eliminates trial-and-error API exploration. The model follows the runbook directly, completing in under a minute.

**Warm sessions show modest time improvement.** 10% faster overall — knowledge prevents dead-end API calls but the task is short enough that the absolute time savings are small (~7 seconds).

---

## Variance

Knowledge makes outcomes more predictable. Standard deviation of answer cost:

| Condition | Std Dev | Relative to Raw |
|-----------|---------|-----------------|
| Raw Cold | $0.1098 | baseline |
| Lore Cold | $0.1548 | 1.4x (more variable) |
| Lore Warm | $0.0520 | 0.47x |
| Lore Hot | $0.0710 | 0.65x |
| Lore Runbook | $0.0421 | 0.38x |

The coefficient of variation (std/mean) tells the same story:

| Condition | CV |
|-----------|-----|
| Raw Cold | 24% |
| Lore Cold | 44% |
| Lore Warm | 23% |
| Lore Hot | 26% |
| Lore Runbook | 22% |

Cold sessions are unpredictable — the model may find the right API path quickly or spend many turns exploring dead ends. Once knowledge captures the correct approach, the model follows a consistent path every time.

---

## Cumulative ROI

The economic case for knowledge capture depends on task recurrence. Below: cumulative cost of running the same task N times under raw cold vs the Lore progression path (cold → warm → hot → runbook → runbook → ...).

| Total Runs | Raw Cold | Lore Path | Savings |
|------------|----------|-----------|---------|
| 1 | $0.45 | $0.43 | $0.02 (5%) |
| 2 | $0.91 | $0.67 | $0.24 (26%) |
| 3 | $1.36 | $1.02 | $0.34 (25%) |
| 5 | $2.27 | $1.41 | $0.86 (38%) |
| 10 | $4.54 | $2.39 | $2.16 (47%) |
| 20 | $9.08 | $4.34 | $4.75 (52%) |

Uses mean total cost per condition: Raw Cold $0.4542, Lore Cold $0.4310, Warm $0.2371, Hot $0.3524, Runbook $0.1951.

**Break-even is immediate.** Even the first Lore cold session is slightly cheaper than raw cold (the delegation savings offset framework overhead). By 10 runs, the Lore path costs 47% less. The savings percentage asymptotically approaches 57% — the ratio of runbook cost to raw cold cost.

---

## Mechanisms

Four mechanisms drive the cost and time reductions:

### 1. Delegation to cheaper models

The orchestrator (Opus 4.6, $0.50/MTok cache reads) delegates API exploration to workers (Haiku 4.5, $0.10/MTok cache reads). This is a 5x cost reduction on cache reads, which dominate token volume in Claude Code sessions.

Raw Cold uses Opus for everything — including trial-and-error HTTP calls that don't require advanced reasoning. Lore routes these to the cheapest model that can execute them.

### 2. Cache-efficient knowledge injection

Lore's knowledge base is injected via the session banner at conversation start. This content lands in the prompt cache prefix, where it's read at cache rates (10% of input cost) for every subsequent turn. The knowledge itself is small (a few hundred tokens of endpoint/parameter documentation), but it eliminates thousands of tokens of Opus output that would otherwise be spent on API exploration.

### 3. Elimination of discovery cycles

Raw Cold sessions spend 17-32 API requests discovering the correct endpoints, parameters, and headers through trial and error. Each failed attempt costs output tokens (the model reasons about what went wrong) and input tokens (the growing context window). Knowledge-equipped sessions skip this entirely — the model knows the correct API paths from the first turn.

### 4. Operator effort reduction

| Condition | Operator Messages | Content |
|-----------|-------------------|---------|
| Raw Cold | 2 | Full task prompt + service URLs after dead end |
| Lore Cold | 3 | Full task prompt + clarification answers + capture approval |
| Lore Warm | 1 | Full task prompt |
| Lore Hot | 2 | Full task prompt + runbook creation request |
| Lore Runbook | 1 | One word ("fulfillment") |

See [operator-inputs.md](operator-inputs.md) for exact messages. The operator's cognitive load decreases with each phase: from providing service URLs and answering clarifying questions, to typing a single trigger word.

---

## Honest Observations

**Lore Cold is not strictly better than Raw Cold.** The total session cost (answer + capture) is comparable: $0.43 vs $0.45. The execution time is significantly worse: 2m 1s vs 1m 12s — the capture phase adds ~35 seconds of knowledge writing on top of a comparable answer time. The value of the cold session is the knowledge it produces, not the efficiency of that specific run.

**Lore Cold has higher variance.** The framework's multi-agent architecture introduces more variability in the exploration phase. Some sessions find the right path quickly; others spend more time coordinating workers. This variance disappears once knowledge stabilizes the approach.

**Capture cost is not free.** The $0.17 total investment is small relative to the per-run savings, but it requires operator participation — answering clarifying questions, approving capture writes, and requesting runbook creation. This is a design choice: Lore treats the operator as the authority on what knowledge to persist.

**One task type.** These results are from API exploration with mock services. Code generation, refactoring, debugging, and other task patterns may show different cost profiles. The delegation advantage (routing execution to cheaper models) should generalize; the knowledge reuse advantage depends on task recurrence.

**No cross-tool validation.** Knowledge captured in Claude Code should benefit sessions in Cursor and OpenCode — the knowledge base is tool-agnostic. This has not been tested.
