---
title: Example Skill
---

# Example Skill

Skills capture gotchas — workarounds, parameter tricks, and auth quirks that aren't obvious from docs alone.

## Template

**File:** `.lore/skills/<name>/SKILL.md`

```yaml
---
name: <service>-<action>-<object>
description: <one-line summary of the gotcha>
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

## See Also

- [Example Plan](plan.md)
- [Example Roadmap](roadmap.md)
- [Example Brainstorm](brainstorm.md)
