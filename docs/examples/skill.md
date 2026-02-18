---
title: Example Skill
---

# Example Skill

Skills capture non-obvious knowledge — gotchas, workarounds, parameter tricks — so the agent never rediscovers them. Every gotcha becomes a skill.

## Template

**File:** `.lore/skills/<name>/SKILL.md`

```yaml
---
name: <service>-<action>-<object>
description: <one-line summary of the gotcha>
domain: <agent domain or "Orchestrator">
user-invocable: false
allowed-tools: Bash, Read, etc
---
```

```markdown
# <Title>

<Brief explanation of the problem.>

## The Gotcha

<What goes wrong and why.>

## Solution

<The fix, workaround, or correct approach.>

## Detection

<How to spot this issue before it causes problems.>
```

## Real Example

This skill was captured after discovering that macOS ships Bash 3.2 and common Bash 4+ features silently break:

```yaml
---
name: bash-macos-compat
description: Avoid Bash 4+ features that break on macOS stock Bash 3.2
domain: Orchestrator
user-invocable: false
allowed-tools: Bash, Read
---
```

```markdown
# Bash macOS Compatibility

macOS ships Bash 3.2 (2007). These features require Bash 4+ and will break:

## Broken on Bash 3.2

| Feature | Bash 4+ | Portable Alternative |
|---------|---------|---------------------|
| Associative arrays | `declare -A map` | Pipe-delimited string + `case` |
| Lowercase transform | `${var,,}` | `echo "$var" | tr '[:upper:]' '[:lower:]'` |
| Key existence test | `[[ -v arr[key] ]]` | `case` pattern match |

## Pattern: Associative Array Replacement

Instead of:

    declare -A existing
    existing["${key,,}"]=1

Use delimited strings:

    existing="|"
    existing="${existing}$(echo "$key" | tr '[:upper:]' '[:lower:]')|"
    case "$existing" in *"|$lookup|"*) echo "found" ;; esac

## Detection

grep for `declare -A`, `${.*,,}`, `[[ -v`, `readarray` before shipping.
```

## Key Concepts

**Generic only** — skills contain patterns and techniques, never context data. Usernames, URLs, account IDs, and org-specific details belong in `docs/knowledge/environment/`, not in skills.

**One skill per gotcha** — if an integration has three gotchas, that's three skills, not one. Each skill should be independently useful.

**One skill per interaction method** — API gotchas and CLI gotchas are separate skills, even for the same service. Different methods have different failure modes.

**30-80 lines** — long enough to be useful, short enough to load quickly. Over 80 lines means the skill covers multiple concerns and should be split.

**Naming convention** — `<service>-<action>-<object>`. Examples: `bash-macos-compat`, `github-api-pagination`, `docker-build-cache-invalidation`. The `lore-` prefix is reserved for framework-owned skills — operator and discovered skills must not use it.

**Domain assignment** — every skill belongs to an agent domain. If the domain doesn't have an agent yet, creating the skill triggers agent creation. Skills without a clear domain use "Orchestrator".

## Before and After

**Before capture** (Session N): The agent writes a bash script using `declare -A` for a lookup table. CI passes on Linux. macOS user reports the script fails. Agent debugs, discovers Bash 3.2 incompatibility, rewrites using portable alternatives. ~30 minutes of rediscovery.

**After capture** (Session N+1): The agent loads the `bash-macos-compat` skill when writing shell scripts. Uses portable alternatives from the start. Zero rediscovery cost.

## Creating Skills

Ask Lore to create a skill — for example: *"Create a skill for the case-sensitive org name gotcha."* Or use `/lore-create-skill` directly. Lore handles the folder structure and frontmatter.

## See Also

- [Example Plan](plan.md)
- [Example Roadmap](roadmap.md)
- [Example Brainstorm](brainstorm.md)
