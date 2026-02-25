---
title: Raw Session Data
---

# A/B Test Raw Data — All Sessions

Full token, cache, model, and cost breakdown for all 50 sessions across 5 conditions.

- **Date:** 2026-02-22
- **Task:** Inventory fulfillment check against mock APIs with deliberate gotchas
- **Timing:** Execution time from `durationMs` system events (Claude Code's per-turn active processing timer). Answer/capture split at first Write/Edit to skills, environment docs, or runbooks.
- **Cost split:** Answer = before first Write to skills/knowledge/runbooks. Capture = after.

**Pricing (per MTok):**

| Model | Input | Output | Cache Read | Cache Create |
|-------|-------|--------|------------|---------------|
| Opus 4.6 | $5.00 | $25.00 | $0.50 | $6.25 |
| Sonnet 4.6 | $1.50 | $7.50 | $0.15 | $1.875 |
| Haiku 4.5 | $1.00 | $5.00 | $0.10 | $1.25 |

---

## Raw Cold (N=10)

All Opus 4.6. No framework, no delegation, no subagents.

### raw-01 — `78305df4`

Exec: 1m 46s (answer: 1m 46s | capture: 0m 0s) | Answer: $0.5728 | Capture: — | **Total: $0.5728**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 29 | 674 | 4,099 | 721,208 | 17,019 | $0.5728 |

### raw-02 — `a4f657e1`

Exec: 1m 4s (answer: 1m 4s | capture: 0m 0s) | Answer: $0.3528 | Capture: — | **Total: $0.3528**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 20 | 665 | 1,870 | 466,015 | 11,147 | $0.3528 |

### raw-03 — `c303951a`

Exec: 1m 21s (answer: 1m 21s | capture: 0m 0s) | Answer: $0.5787 | Capture: — | **Total: $0.5787**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 29 | 676 | 4,145 | 712,610 | 18,460 | $0.5787 |

### raw-04 — `f8a90f6b`

Exec: 1m 4s (answer: 1m 4s | capture: 0m 0s) | Answer: $0.4194 | Capture: — | **Total: $0.4194**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 23 | 668 | 3,092 | 545,218 | 10,583 | $0.4194 |

### raw-05 — `55ab9e1b`

Exec: 0m 53s (answer: 0m 53s | capture: 0m 0s) | Answer: $0.3547 | Capture: — | **Total: $0.3547**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 20 | 28 | 1,932 | 459,324 | 12,261 | $0.3547 |

### raw-06 — `1bbbe906`

Exec: 0m 47s (answer: 0m 47s | capture: 0m 0s) | Answer: $0.3318 | Capture: — | **Total: $0.3318**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 18 | 665 | 2,004 | 410,228 | 11,718 | $0.3318 |

### raw-07 — `0950896f`

Exec: 1m 56s (answer: 1m 56s | capture: 0m 0s) | Answer: $0.6080 | Capture: — | **Total: $0.6080**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 32 | 679 | 3,970 | 792,779 | 17,427 | $0.6080 |

### raw-08 — `961dfd61`

Exec: 1m 46s (answer: 1m 46s | capture: 0m 0s) | Answer: $0.5354 | Capture: — | **Total: $0.5354**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 27 | 35 | 4,005 | 656,899 | 17,057 | $0.5354 |

### raw-09 — `9369ee3d`

Exec: 0m 45s (answer: 0m 45s | capture: 0m 0s) | Answer: $0.3017 | Capture: — | **Total: $0.3017**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 17 | 664 | 1,518 | 385,753 | 10,809 | $0.3017 |

### raw-10 — `e086874f`

Exec: 1m 28s (answer: 1m 28s | capture: 0m 0s) | Answer: $0.4869 | Capture: — | **Total: $0.4869**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 26 | 34 | 3,402 | 619,605 | 14,702 | $0.4869 |

**Stats:** answer mean=$0.4542 median=$0.4532 std=$0.1098 | exec median=1m 12s

---

## Lore Cold (N=10)

Clean knowledge base. Capture = skills + environment docs written at end of session.

### cold-01 — `59849a93`

Exec: 1m 26s (answer: 1m 22s | capture: 0m 4s) | Answer: $0.3253 | Capture: $0.0599 | **Total: $0.3852**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 11 | 23 | 1,955 | 275,704 | 20,262 | $0.3135 |
| Agent | Haiku 4.5 | 6 | 23 | 21 | 85,490 | 19,429 | $0.0330 |
| Agent | Haiku 4.5 | 14 | 57 | 28 | 248,836 | 10,944 | $0.0388 |

### cold-02 — `61b89faf`

Exec: 2m 28s (answer: 1m 55s | capture: 0m 33s) | Answer: $0.6398 | Capture: $0.1189 | **Total: $0.7587**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 26 | 50 | 3,364 | 719,703 | 40,094 | $0.6948 |
| Agent | Haiku 4.5 | 17 | 58 | 160 | 290,366 | 7,864 | $0.0397 |
| Agent | Haiku 4.5 | 8 | 37 | 14 | 131,325 | 8,750 | $0.0242 |

### cold-03 — `04f9e43f`

Exec: 1m 20s (answer: 1m 16s | capture: 0m 4s) | Answer: $0.1919 | Capture: $0.0328 | **Total: $0.2247**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 6 | 12 | 49 | 145,759 | 11,930 | $0.1487 |
| Agent | Haiku 4.5 | 16 | 77 | 29 | 303,639 | 12,880 | $0.0467 |
| Agent | Haiku 4.5 | 10 | 33 | 21 | 171,428 | 9,590 | $0.0293 |

### cold-04 — `7b3eb266`

Exec: 2m 41s (answer: 1m 47s | capture: 0m 53s) | Answer: $0.3198 | Capture: $0.0831 | **Total: $0.4029**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 9 | 15 | 897 | 215,143 | 23,486 | $0.2769 |
| Agent | Haiku 4.5 | 11 | 48 | 16 | 195,148 | 11,247 | $0.0337 |
| Agent | Haiku 4.5 | 7 | 25 | 16 | 119,404 | 8,912 | $0.0232 |
| Agent | Haiku 4.5 | 8 | 34 | 19 | 142,573 | 10,047 | $0.0269 |
| Agent | Haiku 4.5 | 7 | 25 | 14 | 115,162 | 8,411 | $0.0221 |
| Agent | Haiku 4.5 | 6 | 26 | 22 | 99,831 | 8,009 | $0.0201 |

### cold-05 — `6040f218`

Exec: 0m 52s (answer: 0m 48s | capture: 0m 3s) | Answer: $0.2316 | Capture: $0.0522 | **Total: $0.2838**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 10 | 16 | 929 | 258,996 | 12,896 | $0.2334 |
| Agent | Haiku 4.5 | 10 | 41 | 25 | 173,692 | 9,280 | $0.0291 |
| Agent | Haiku 4.5 | 7 | 30 | 13 | 112,755 | 7,877 | $0.0212 |

### cold-06 — `a251de04`

Exec: 2m 2s (answer: 1m 26s | capture: 0m 36s) | Answer: $0.2073 | Capture: $0.1313 | **Total: $0.3386**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 12 | 24 | 2,673 | 327,784 | 7,493 | $0.2777 |
| Agent | Haiku 4.5 | 11 | 52 | 23 | 195,230 | 10,851 | $0.0333 |
| Agent | Haiku 4.5 | 8 | 29 | 15 | 138,618 | 11,000 | $0.0277 |

### cold-07 — `a54bbad1`

Exec: 2m 9s (answer: 1m 22s | capture: 0m 47s) | Answer: $0.3395 | Capture: $0.1294 | **Total: $0.4689**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 15 | 23 | 3,634 | 404,431 | 18,864 | $0.4111 |
| Agent | Haiku 4.5 | 12 | 50 | 23 | 206,549 | 8,385 | $0.0313 |
| Agent | Haiku 4.5 | 8 | 36 | 11 | 137,464 | 10,151 | $0.0265 |

### cold-08 — `5f33d142`

Exec: 3m 45s (answer: 3m 5s | capture: 0m 41s) | Answer: $0.6417 | Capture: $0.0722 | **Total: $0.7139**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 21 | 39 | 2,116 | 562,341 | 42,848 | $0.6021 |
| Agent | Haiku 4.5 | 10 | 44 | 15 | 168,328 | 7,764 | $0.0267 |
| Agent | Haiku 4.5 | 6 | 21 | 14 | 95,339 | 8,066 | $0.0197 |
| Agent | Haiku 4.5 | 7 | 22 | 11 | 123,317 | 11,487 | $0.0268 |
| Agent | Haiku 4.5 | 15 | 56 | 29 | 268,298 | 9,349 | $0.0387 |

### cold-09 — `496157a6`

Exec: 2m 0s (answer: 1m 9s | capture: 0m 51s) | Answer: $0.3466 | Capture: $0.0968 | **Total: $0.4434**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 13 | 31 | 2,770 | 345,428 | 17,903 | $0.3540 |
| Agent | Haiku 4.5 | 6 | 24 | 13 | 98,090 | 7,505 | $0.0193 |
| Agent | Haiku 4.5 | 21 | 71 | 199 | 368,926 | 8,248 | $0.0483 |
| Agent | Haiku 4.5 | 7 | 20 | 12 | 114,471 | 8,270 | $0.0219 |

### cold-10 — `0110ccad`

Exec: 1m 40s (answer: 1m 8s | capture: 0m 32s) | Answer: $0.2519 | Capture: $0.0376 | **Total: $0.2895**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 7 | 15 | 1,302 | 171,492 | 13,060 | $0.2000 |
| Agent | Haiku 4.5 | 6 | 22 | 10 | 94,548 | 7,461 | $0.0189 |
| Agent | Haiku 4.5 | 6 | 19 | 13 | 96,215 | 6,934 | $0.0184 |
| Agent | Haiku 4.5 | 6 | 18 | 11 | 95,255 | 6,680 | $0.0179 |
| Agent | Haiku 4.5 | 12 | 56 | 30 | 215,024 | 10,116 | $0.0344 |

**Stats:** answer mean=$0.3495 median=$0.3226 std=$0.1548 | capture mean=$0.0814 | answer median=1m 22s | exec median=2m 1s | vs Raw Cold: answer -29%

---

## Lore Warm (N=10)

Knowledge from cold persists. Most sessions have zero capture.

### warm-01 — `a56aad87`

Exec: 1m 24s (answer: 1m 2s | capture: 0m 21s) | Answer: $0.2768 | Capture: $0.0869 | **Total: $0.3636**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 15 | 29 | 2,068 | 387,320 | 18,902 | $0.3636 |

### warm-02 — `49c9b532`

Exec: 1m 34s (answer: 1m 34s | capture: 0m 0s) | Answer: $0.2105 | Capture: — | **Total: $0.2105**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 4 | 8 | 685 | 82,514 | 20,381 | $0.1858 |
| Agent | Haiku 4.5 | 8 | 31 | 15 | 134,423 | 8,892 | $0.0247 |

### warm-03 — `2540858f`

Exec: 0m 59s (answer: 0m 59s | capture: 0m 0s) | Answer: $0.1032 | Capture: — | **Total: $0.1032**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 5 | 7 | 29 | 124,659 | 3,642 | $0.0859 |
| Agent | Haiku 4.5 | 5 | 20 | 9 | 78,485 | 7,535 | $0.0173 |

### warm-04 — `94f0e63d`

Exec: 1m 23s (answer: 1m 23s | capture: 0m 0s) | Answer: $0.2449 | Capture: — | **Total: $0.2449**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 5 | 9 | 663 | 109,909 | 22,779 | $0.2139 |
| Agent | Haiku 4.5 | 4 | 12 | 9 | 60,435 | 7,392 | $0.0153 |
| Agent | Haiku 4.5 | 4 | 16 | 6 | 63,740 | 7,358 | $0.0156 |

### warm-05 — `deb1e4e2`

Exec: 0m 59s (answer: 0m 59s | capture: 0m 0s) | Answer: $0.2550 | Capture: — | **Total: $0.2550**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 6 | 10 | 1,900 | 131,729 | 19,750 | $0.2369 |
| Agent | Haiku 4.5 | 5 | 19 | 12 | 79,745 | 8,055 | $0.0181 |

### warm-06 — `32cd5836`

Exec: 1m 38s (answer: 1m 38s | capture: 0m 0s) | Answer: $0.2945 | Capture: — | **Total: $0.2945**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 6 | 12 | 2,300 | 138,495 | 21,735 | $0.2627 |
| Agent | Haiku 4.5 | 4 | 16 | 12 | 60,876 | 7,556 | $0.0156 |
| Agent | Haiku 4.5 | 5 | 21 | 13 | 79,064 | 6,564 | $0.0162 |

### warm-07 — `b4f83d69`

Exec: 1m 6s (answer: 1m 6s | capture: 0m 0s) | Answer: $0.2569 | Capture: — | **Total: $0.2569**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 7 | 11 | 2,086 | 171,307 | 14,421 | $0.2280 |
| Agent | Haiku 4.5 | 3 | 13 | 9 | 45,077 | 6,095 | $0.0122 |
| Agent | Haiku 4.5 | 4 | 12 | 14 | 62,881 | 8,247 | $0.0167 |

### warm-08 — `7633bc19`

Exec: 0m 47s (answer: 0m 47s | capture: 0m 0s) | Answer: $0.2210 | Capture: — | **Total: $0.2210**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 6 | 8 | 1,330 | 139,964 | 13,994 | $0.1907 |
| Agent | Haiku 4.5 | 5 | 16 | 12 | 76,616 | 7,060 | $0.0166 |
| Agent | Haiku 4.5 | 4 | 16 | 7 | 61,444 | 5,997 | $0.0137 |

### warm-09 — `d56a5218`

Exec: 1m 5s (answer: 1m 5s | capture: 0m 0s) | Answer: $0.1802 | Capture: — | **Total: $0.1802**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 5 | 7 | 944 | 116,452 | 11,487 | $0.1537 |
| Agent | Sonnet 4.6 | 5 | 8 | 5 | 79,906 | 7,761 | $0.0266 |

### warm-10 — `7b81175c`

Exec: 0m 56s (answer: 0m 56s | capture: 0m 0s) | Answer: $0.2408 | Capture: — | **Total: $0.2408**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 6 | 10 | 1,503 | 130,993 | 19,251 | $0.2234 |
| Agent | Haiku 4.5 | 5 | 20 | 16 | 78,297 | 7,549 | $0.0174 |

**Stats:** answer mean=$0.2284 median=$0.2429 std=$0.0520 | capture mean=$0.0087 | answer median=1m 4s | exec median=1m 5s | vs Raw Cold: answer -46%, answer time -11%

---

## Lore Hot (N=10)

Knowledge from cold+warm persists. Runbook capture at end of each session.

### hot-01 — `02f985ce`

Exec: 1m 28s (answer: 0m 56s | capture: 0m 32s) | Answer: $0.4570 | Capture: $0.0790 | **Total: $0.5360**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 16 | 1,998 | 2,080 | 397,337 | 39,661 | $0.5085 |
| Agent | Sonnet 4.6 | 5 | 8 | 31 | 79,883 | 8,101 | $0.0274 |

### hot-02 — `0f15b664`

Exec: 1m 4s (answer: 0m 54s | capture: 0m 9s) | Answer: $0.2346 | Capture: $0.0830 | **Total: $0.3176**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 13 | 21 | 2,562 | 349,376 | 9,330 | $0.2972 |
| Agent | Haiku 4.5 | 6 | 26 | 9 | 102,110 | 8,104 | $0.0204 |

### hot-03 — `36952c96`

Exec: 1m 25s (answer: 0m 53s | capture: 0m 32s) | Answer: $0.2871 | Capture: $0.0826 | **Total: $0.3697**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 17 | 23 | 1,390 | 466,628 | 13,196 | $0.3507 |
| Agent | Haiku 4.5 | 6 | 24 | 8 | 99,392 | 7,244 | $0.0191 |

### hot-04 — `f3fb3cf2`

Exec: 1m 17s (answer: 1m 12s | capture: 0m 5s) | Answer: $0.2500 | Capture: $0.0711 | **Total: $0.3211**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 12 | 24 | 2,093 | 347,483 | 10,960 | $0.2947 |
| Agent | Haiku 4.5 | 3 | 10 | 11 | 46,020 | 7,055 | $0.0135 |
| Agent | Haiku 4.5 | 3 | 10 | 11 | 45,518 | 6,643 | $0.0129 |

### hot-05 — `82803ac5`

Exec: 1m 52s (answer: 1m 0s | capture: 0m 52s) | Answer: $0.2376 | Capture: $0.0698 | **Total: $0.3074**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 11 | 15 | 2,210 | 303,927 | 11,505 | $0.2792 |
| Agent | Haiku 4.5 | 4 | 15 | 12 | 61,328 | 6,077 | $0.0138 |
| Agent | Haiku 4.5 | 4 | 15 | 8 | 62,014 | 6,489 | $0.0144 |

### hot-06 — `11a63df3`

Exec: 1m 39s (answer: 1m 2s | capture: 0m 37s) | Answer: $0.1951 | Capture: $0.0641 | **Total: $0.2592**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 11 | 20 | 1,343 | 297,506 | 7,910 | $0.2319 |
| Agent | Haiku 4.5 | 5 | 23 | 11 | 79,475 | 6,518 | $0.0162 |
| Agent | Haiku 4.5 | 3 | 10 | 10 | 44,240 | 5,378 | $0.0112 |

### hot-07 — `40fa668d`

Exec: 1m 31s (answer: 0m 52s | capture: 0m 39s) | Answer: $0.2200 | Capture: $0.1290 | **Total: $0.3490**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 13 | 21 | 2,156 | 376,386 | 12,420 | $0.3198 |
| Agent | Haiku 4.5 | 4 | 16 | 10 | 61,939 | 6,484 | $0.0144 |
| Agent | Haiku 4.5 | 4 | 16 | 7 | 62,552 | 6,807 | $0.0148 |

### hot-08 — `8a040b7b`

Exec: 1m 33s (answer: 0m 52s | capture: 0m 41s) | Answer: $0.2804 | Capture: $0.0649 | **Total: $0.3453**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 14 | 23 | 3,081 | 374,561 | 8,588 | $0.3181 |
| Agent | Haiku 4.5 | 4 | 15 | 10 | 61,098 | 5,867 | $0.0135 |
| Agent | Haiku 4.5 | 4 | 16 | 14 | 61,321 | 5,957 | $0.0137 |

### hot-09 — `3a97e75b`

Exec: 1m 55s (answer: 1m 19s | capture: 0m 37s) | Answer: $0.3276 | Capture: $0.0584 | **Total: $0.3860**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 16 | 26 | 2,256 | 443,712 | 12,778 | $0.3582 |
| Agent | Haiku 4.5 | 9 | 35 | 20 | 156,266 | 9,566 | $0.0277 |

### hot-10 — `943f51f0`

Exec: 1m 58s (answer: 0m 59s | capture: 0m 59s) | Answer: $0.2391 | Capture: $0.0933 | **Total: $0.3324**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 12 | 16 | 2,312 | 333,184 | 14,183 | $0.3131 |
| Agent | Haiku 4.5 | 6 | 23 | 9 | 97,504 | 7,603 | $0.0193 |

**Stats:** answer mean=$0.2728 median=$0.2446 std=$0.0710 | capture mean=$0.0795 | answer median=0m 57s | exec median=1m 32s | vs Raw Cold: answer -46%, answer time -21%

---

## Lore Runbook (N=10)

Full knowledge + runbook. Zero capture. This is the steady-state cost.

### rb-01 — `fc5c75ca`

Exec: 0m 43s (answer: 0m 43s | capture: 0m 0s) | Answer: $0.1875 | Capture: — | **Total: $0.1875**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 7 | 11 | 1,269 | 170,198 | 4,169 | $0.1429 |
| Agent | Sonnet 4.6 | 5 | 8 | 10 | 69,150 | 18,209 | $0.0446 |

### rb-02 — `f1135ff7`

Exec: 0m 54s (answer: 0m 54s | capture: 0m 0s) | Answer: $0.1431 | Capture: — | **Total: $0.1431**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 4 | 6 | 55 | 90,043 | 10,337 | $0.1110 |
| Agent | Haiku 4.5 | 10 | 23 | 15 | 178,054 | 11,306 | $0.0320 |

### rb-03 — `a1321b23`

Exec: 0m 33s (answer: 0m 33s | capture: 0m 0s) | Answer: $0.1865 | Capture: — | **Total: $0.1865**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 6 | 8 | 914 | 138,480 | 12,723 | $0.1716 |
| Agent | Haiku 4.5 | 4 | 14 | 6 | 60,910 | 6,940 | $0.0148 |

### rb-04 — `c4b3a286`

Exec: N/A | Answer: $0.1733 | Capture: — | **Total: $0.1733**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 6 | 12 | 52 | 142,560 | 11,861 | $0.1468 |
| Agent | Haiku 4.5 | 3 | 10 | 11 | 45,285 | 6,374 | $0.0126 |
| Agent | Haiku 4.5 | 3 | 10 | 10 | 44,364 | 7,582 | $0.0140 |

### rb-05 — `90864df6`

Exec: 0m 37s (answer: 0m 37s | capture: 0m 0s) | Answer: $0.1987 | Capture: — | **Total: $0.1987**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 6 | 10 | 589 | 141,109 | 13,357 | $0.1688 |
| Agent | Haiku 4.5 | 4 | 15 | 12 | 60,093 | 6,956 | $0.0148 |
| Agent | Haiku 4.5 | 4 | 19 | 8 | 62,214 | 7,089 | $0.0151 |

### rb-06 — `ccdbfae0`

Exec: 0m 40s (answer: 0m 40s | capture: 0m 0s) | Answer: $0.2111 | Capture: — | **Total: $0.2111**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 7 | 9 | 868 | 166,531 | 12,980 | $0.1861 |
| Agent | Haiku 4.5 | 3 | 10 | 7 | 44,677 | 5,828 | $0.0118 |
| Agent | Haiku 4.5 | 3 | 10 | 5 | 43,718 | 6,996 | $0.0132 |

### rb-07 — `8ada3fd4`

Exec: 0m 33s (answer: 0m 33s | capture: 0m 0s) | Answer: $0.1487 | Capture: — | **Total: $0.1487**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 4 | 6 | 112 | 90,771 | 11,684 | $0.1212 |
| Agent | Haiku 4.5 | 3 | 10 | 7 | 43,883 | 7,102 | $0.0133 |
| Agent | Haiku 4.5 | 4 | 12 | 9 | 61,403 | 6,345 | $0.0141 |

### rb-08 — `e1ced351`

Exec: 0m 34s (answer: 0m 34s | capture: 0m 0s) | Answer: $0.2696 | Capture: — | **Total: $0.2696**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 7 | 13 | 1,245 | 156,197 | 20,016 | $0.2344 |
| Agent | Haiku 4.5 | 5 | 21 | 8 | 80,505 | 7,983 | $0.0181 |
| Agent | Haiku 4.5 | 4 | 16 | 7 | 62,528 | 8,630 | $0.0171 |

### rb-09 — `0c48b2e7`

Exec: 0m 48s (answer: 0m 48s | capture: 0m 0s) | Answer: $0.2689 | Capture: — | **Total: $0.2689**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 8 | 16 | 1,116 | 182,544 | 19,916 | $0.2437 |
| Agent | Haiku 4.5 | 7 | 31 | 11 | 122,219 | 10,258 | $0.0251 |

### rb-10 — `fccd82a5`

Exec: 0m 40s (answer: 0m 40s | capture: 0m 0s) | Answer: $0.1638 | Capture: — | **Total: $0.1638**

| Role | Model | Req | Input | Output | Cache Read | Cache Create | Cost |
|------|-------|-----|-------|--------|------------|--------------|------|
| Orch | Opus 4.6 | 5 | 7 | 793 | 114,087 | 11,166 | $0.1467 |
| Agent | Haiku 4.5 | 5 | 17 | 12 | 77,941 | 7,367 | $0.0171 |

**Stats:** answer mean=$0.1951 median=$0.1870 std=$0.0421 | exec median=0m 40s | vs Raw Cold: answer -59%, answer time -44%
