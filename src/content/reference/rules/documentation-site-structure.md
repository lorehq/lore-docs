---
title: "Documentation Site Structure"
---

# Documentation Site Structure

How to organize navigation and content for the public documentation site (MkDocs Material).

## 1. Use Diátaxis as a Writing Discipline

**Every page serves one purpose: tutorial, how-to, reference, or explanation. Don't mix them.**

- **Tutorials** teach. The author leads, the reader follows. "Build your first X" — learning-oriented, step-by-step, always involves doing something concrete.
- **How-to guides** solve. The reader has a goal, the guide assists. "How to deploy to production" — assumes competence, task-oriented, no hand-holding.
- **Reference** describes. Exhaustive, factual, austere. Parameters, return types, defaults, examples. Consulted, not read.
- **Explanation** clarifies. Background, architecture, design decisions, "why." Deepens understanding without prescribing action.

When a page feels bloated, you're mixing types. A how-to guide that stops to explain architecture should link to an explanation page instead. A tutorial that lists every config option should link to the reference.

## 2. Organize Navigation for the Reader, Not the Codebase

**Users navigate by task and intent, not by your internal file structure.**

- Top-level sections map to user intent: "I'm new" (Getting Started), "I need to do X" (Guides), "I need the spec" (Reference), "I want to understand why" (Concepts).
- Don't mirror your source tree, team structure, or module hierarchy in navigation. These force users to learn your internals before finding content.
- Group by what users are trying to accomplish, not by what component implements it.

Standard top-level sections, in order:

| Section | Diátaxis Type | Content |
|---------|---------------|---------|
| Getting Started | Tutorial | Installation, first working example, core workflow. Under 5 minutes to "aha." |
| Guides | How-to | Task-oriented walkthroughs. One guide per goal. Assumes the reader finished Getting Started. |
| Concepts | Explanation | Architecture, design decisions, mental models. No steps — just understanding. |
| Reference | Reference | CLI commands, configuration options, API surface. Mirrors the structure of the thing it describes. |

Add sections only when the content doesn't fit the four above. Changelog, migration guides, and troubleshooting are common additions. Don't invent sections preemptively.

## 3. Keep the Sidebar Shallow

**Two sidebar levels. Three at most. Beyond that, users lose orientation.**

- Use MkDocs Material's `navigation.tabs` to render top-level sections as horizontal tabs. This adds one navigation level without deepening the sidebar.
- Within each tab, the sidebar should be scannable at a glance — no scrolling to see the full list. If it scrolls, the section is too large; split it.
- Group sidebar items into 5–8 item clusters using section headers. A wall of 30+ ungrouped links overwhelms.
- Never nest deeper than 3 levels total (tab → section → page). Use section index pages to add breadth instead of depth.

## 4. Give Every Section a Landing Page

**Clicking a section should orient, not dump the reader on the first child page.**

- Every `nav` section gets an `index.md` that explains what's in the section and links to key pages.
- Landing pages surface the 20% of pages that serve 80% of visits. Put the most-used links at the top.
- Use MkDocs Material's `navigation.indexes` feature to attach index pages to sections.

## 5. Size Pages for Comprehension

**One topic per page. 800–3,000 words. Enough to be useful, short enough to finish.**

- If a page covers two unrelated things, split it. If two pages cover the same thing, merge and redirect.
- Under 800 words usually means the page is a fragment that should be folded into a parent page.
- Over 3,000 words usually means the page mixes Diátaxis types or covers multiple topics.
- Link aggressively. Every mention of a concept, command, or component that has its own page should be a link.
- End pages with "Next steps" or related links. Users should always know where to go from here.

## 6. Make Getting Started Ruthlessly Short

**One "aha moment." Under 5 minutes. Nothing else.**

- Installation, one working example, done. The quickstart is not a feature tour.
- Cut prerequisites to the minimum. If the reader needs three tools installed before starting, provide a single copy-paste block.
- Defer everything that isn't required for the first success: configuration options, advanced features, architecture explanations. Link to them.
- Test the quickstart on a clean machine. If any step fails or confuses, fix it before publishing anything else.

## 7. Structure Reference to Mirror the System

**Reference architecture follows the thing it describes, not the reader's workflow.**

- CLI reference mirrors the command tree. Config reference mirrors the config file structure. API reference mirrors the endpoint hierarchy.
- Every entry: name, description, parameters/options, defaults, types, one example. Consistent format across all entries.
- Don't narrate. Reference is looked up, not read. Save the storytelling for explanation pages.
- Keep reference auto-generated where possible. Hand-written reference drifts from the source.

## 8. Configure MkDocs Material for This

**Use the theme features that support this structure. Skip the ones that fight it.**

Enable:

- `navigation.tabs` + `navigation.tabs.sticky` — top-level sections as persistent horizontal tabs.
- `navigation.sections` — visual grouping in the sidebar.
- `navigation.indexes` — section landing pages.
- `navigation.path` — breadcrumbs for orientation in deep structures.
- `navigation.instant` — SPA-like page transitions (requires `site_url`).
- `navigation.prune` — only render visible nav items. Essential past 100 pages.
- `toc.follow` — auto-scroll the table of contents to the active heading.

Avoid:

- `navigation.expand` — auto-expands all sidebar sections. Defeats scanability on sites with more than a handful of pages.
- `toc.integrate` — moves the table of contents into the sidebar. Incompatible with section indexes and clutters the nav.
