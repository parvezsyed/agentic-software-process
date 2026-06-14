---
type: Execution Brief
title: Make the Process Repository Runnable
description: Example execution brief showing how standard-mode planning becomes concrete work.
tags: [standard, tooling, validation]
timestamp: 2026-06-14T00:00:00Z
---

# Source

This brief comes from the critique that the repository describes good process but lacks runnable validation, full examples, and a compact agent entrypoint.

# Release Scope

In scope:
- Add a local validation path.
- Add a Task Graph schema and example.
- Add a full PR Task Packet example.
- Document the artifact format policy.

Deferred:
- Hosted documentation site.
- Static graph visualizer.

# Architecture Options

| Option | Tradeoff | Recommendation |
| --- | --- | --- |
| Node built-in validator | Lower schema coverage, no install step | Choose for first pass |
| AJV dependency | Better JSON Schema coverage, requires install | Defer until needed |

# Budget

- Time budget: half day.
- Token/cost budget: small.
- Review budget: one human pass.

# Verification Strategy

Run:

```sh
npm test
```

# Required Decisions

None. This change keeps the repository vendor-neutral and local-first.

# Citations

[1] [Open Knowledge Format article](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/)
