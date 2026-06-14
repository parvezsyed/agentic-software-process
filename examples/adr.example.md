---
type: ADR
title: Use Markdown Frontmatter for Durable Knowledge
description: Example ADR for adopting an OKF-compatible artifact profile.
tags: [adr, okf, knowledge]
timestamp: 2026-06-14T00:00:00Z
---

# Status

Accepted for process artifacts.

# Context

The process needs artifacts that humans can read, agents can parse, and repositories can version without a custom platform.

# Decision

Use Markdown with YAML frontmatter for durable knowledge artifacts. Use JSON only for execution contracts that need schema validation.

# Alternatives Considered

- All JSON: easier validation, worse human review.
- All Markdown: easier authoring, weaker machine checks.
- Custom database or service: unnecessary operational overhead.

# Consequences

Agents can traverse the repository through indexes and links without loading the full manual. Validators can stay focused on packet contracts.

# Citations

[1] [Open Knowledge Format article](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/)
