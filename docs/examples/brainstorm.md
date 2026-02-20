---
title: Example Brainstorm
---

# Example Brainstorm

Brainstorms capture exploratory discussions, architectural decisions, and design trade-offs for future reference. They document thinking — not work progress. Each brainstorm serves as a decision record: options considered, trade-offs, and rationale. Ask Lore to create one — for example: *"Start a brainstorm about auth options."* Lore handles the folder structure and frontmatter.

## Template

**File:** `docs/work/brainstorms/<slug>/index.md`

```yaml
---
title: <Topic>
created: 2026-01-10
---
```

```markdown
# <Topic>

## Context

<What prompted this discussion. Key questions to answer.>

## Approaches Considered

### Option 1: <Name>

**Approach:** <How it works.>

**Pros:**
- <Advantage>
- <Advantage>

**Cons:**
- <Disadvantage>
- <Disadvantage>

**Effort:** <Estimate>

---

### Option 2: <Name>

**Approach:** <How it works.>

**Pros:**
- <Advantage>
- <Advantage>

**Cons:**
- <Disadvantage>
- <Disadvantage>

**Effort:** <Estimate>

## Recommended Approach

**Selected:** <Option name>

**Rationale:**
- <Why this option>
- <Key factors>

## Decision

<Clear statement of what was decided and first steps.>

## Follow-Up

This brainstorm informed:
- [<Roadmap or Plan Name>](../path/to/index.md)
```

## See Also

- [Example Roadmap](roadmap.md)
- [Example Plan](plan.md)
- [Roadmaps & Plans Guide](../guides/roadmaps-and-plans.md)
