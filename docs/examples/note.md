---
title: Example Note
---

# Example Note

## Template

**File:** `docs/work/notes/<slug>.md`

```yaml
---
title: <Short descriptive title>
status: open
created: 2026-02-23
---
```

```markdown
Free-form markdown content. Notes are quick capture — don't over-polish.

Describe what you saw, what you tried, what to revisit. Links to relevant
files or skills are helpful but not required.
```

## Status Values

| Status | Meaning |
|--------|---------|
| `open` | Default. Needs attention or follow-up. |
| `resolved` | Done. Keep for searchable context — don't delete. |

## Key Differences from Plans

| Aspect | Note | Plan |
|--------|------|------|
| **Structure** | Single file, flat | Folder with `index.md` |
| **Frontmatter** | `title`, `status`, `created` | `title`, `status`, `created`, `updated`, `summary`, `target` |
| **Banner** | Not shown | Active/on-hold shown in banner |
| **Scope** | One observation or idea | Full implementation approach |
| **Creation** | `/lore-create-note` | `/lore-create-plan` |

See [Roadmaps & Plans](../guides/roadmaps-and-plans.md) for the full work item hierarchy.
