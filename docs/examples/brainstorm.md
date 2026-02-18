---
title: Example Brainstorm
---

# Example Brainstorm

Brainstorms are conversation artifacts that capture exploratory discussions, architectural decisions, and design trade-offs for future reference.

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

## Key Concepts

**Not a roadmap or plan** — brainstorms are reference artifacts. They document the thinking process, not work progress.

**Decision record** — captures options considered, trade-offs weighed, and rationale for any choice made. Not all brainstorms reach a decision — omit the decision sections if the discussion is still open.

**Follow-up links** — connect brainstorms to the roadmaps/plans they informed.

**Good use cases:** architectural decisions, technology selection, strategy discussions, design explorations.

**Not needed for:** quick questions, routine implementation, information retrieval.

## Creating Brainstorms

Ask Lore to create a brainstorm — for example: *"Start a brainstorm about auth options."* Lore handles the folder structure and frontmatter.

## See Also

- [Example Roadmap](roadmap.md)
- [Example Plan](plan.md)
- [Roadmaps & Plans Guide](../guides/roadmaps-and-plans.md)
