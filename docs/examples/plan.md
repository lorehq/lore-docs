---
title: Example Plan
---

# Example Plan

Plans are tactical documents describing how to accomplish a specific task, feature, or phase of work (days to weeks).

## Template

**File:** `docs/work/plans/<slug>/index.md`

```yaml
---
title: <Plan Name>
status: active
created: 2026-02-01
updated: 2026-02-06
summary: <one-liner shown in session banner>
target: 2026-02-28
---
```

```markdown
# <Plan Name>

## Goal

<1-2 sentences: what this plan accomplishes.>

## Context

<Why this work is needed. Link to parent roadmap if applicable.>

## Approach

### 1. <Step Name>

<What to do, technical details, configuration.>

### 2. <Step Name>

<What to do, decisions made, rationale.>

### 3. <Step Name>

<What to do, dependencies, expected output.>

## Implementation Steps

1. <Completed step>
2. <In progress step>
3. <Pending step>
4. <Pending step>

## Test Plan

- [ ] <Verification step>
- [ ] <Verification step>
- [ ] <Performance target>

## Success Criteria

- <Measurable outcome>
- <Measurable outcome>

## Blockers

None currently.

## Notes

<Decisions, caveats, things to revisit later.>
```

## Key Concepts

**YAML Frontmatter** — `summary` is shown in the session banner (keep under 60 chars). See [Roadmaps & Plans: Hierarchy](../guides/roadmaps-and-plans.md#hierarchy) for nesting and frontmatter linking.

**Archiving** — completed or cancelled plans move to `docs/work/plans/archive/<slug>/`. See [Roadmaps & Plans](../guides/roadmaps-and-plans.md) for the full status workflow.

## Creating Plans

Ask Lore to create a plan — for example: *"Create a plan for the networking setup."* Specify which roadmap it belongs to, if any, and Lore will create the appropriate folder structure.

## See Also

- [Roadmaps & Plans Guide](../guides/roadmaps-and-plans.md)
- [Example Roadmap](roadmap.md)
- [Example Brainstorm](brainstorm.md)
