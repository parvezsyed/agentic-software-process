---
type: Process Policy
title: Artifact Format Policy
description: Canonical rules for Markdown, JSON, indexes, logs, and schema validation.
tags: [format, okf, validation]
timestamp: 2026-06-14T00:00:00Z
---

# Policy

Use Markdown with YAML frontmatter for durable knowledge artifacts that humans and agents read directly. Use JSON for execution contracts that automation must validate.

# Markdown Artifacts

Use Markdown for:
- PRDs, Execution Briefs, Architecture Maps, ADRs, runbooks, memory records, and process exceptions.
- Artifacts where prose, tradeoffs, citations, and cross-links matter more than rigid machine validation.

Each non-index Markdown artifact should start with frontmatter:

```yaml
---
type: Execution Brief
title: Example Title
description: One sentence summary.
tags: [process, example]
timestamp: 2026-06-14T00:00:00Z
---
```

# JSON Artifacts

Use JSON for:
- Ready-To-Proceed Packets.
- Mini PR Task Packets.
- Full PR Task Packets.
- Task Graphs.

JSON artifacts must validate against `schema/` before handoff.

# Indexes And Logs

Use `index.md` in directories that contain multiple artifacts so agents can inspect available context before opening individual files.

Use `log.md` for chronological changes to a directory's knowledge. Keep newest entries first and use `YYYY-MM-DD` headings.

# Strictness

Validation is strict for machine contracts. Knowledge consumption is permissive: agents should tolerate unknown frontmatter keys, unknown artifact types, and broken links while reporting them as repair opportunities.

# Citations

[1] [Open Knowledge Format article](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/)
[2] [Open Knowledge Format specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
