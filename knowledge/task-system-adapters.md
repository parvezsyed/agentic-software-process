---
type: Process Policy
title: Task System Adapters
description: How to connect the canonical Task Graph to Linear, GitHub Issues, Jira, Markdown, or no external tracker.
tags: [task-graph, linear, integrations, config]
timestamp: 2026-06-14T00:00:00Z
---

# Policy

The Task Graph is the canonical planning contract unless the human explicitly chooses an external tracker as the canonical source. External tools are adapters.

# Intake Question

During intake, ask:

- What task or planning system should this work use: Linear, GitHub Issues, Jira, Markdown files, another tool, or none?
- Should the Task Graph remain the source of truth, or should the external tracker be the source of truth?
- What team, project, labels, milestones, or issue templates should be used?

# Default

If the human does not choose a tool, use repo-native artifacts:

- `docs/execution/task-graph-<initiative>.json`
- PR bodies or `docs/execution/pr-task-packet-<task>.json`
- `docs/evidence/<initiative-or-release>/README.md`

# Linear Adapter

When Linear is selected:

- Create one Linear issue per reviewable Task Graph task.
- Keep the Task Graph task ID in the Linear issue body or metadata.
- Link the Linear issue back to the Task Graph and source artifacts.
- Link the PR Task Packet and PR back to the Linear issue.
- Use Linear labels, project, cycle, and assignee only as execution metadata, not as a replacement for scope, non-scope, verification, stop conditions, or budget.

# Other Adapters

GitHub Issues, Jira, Markdown task lists, and other trackers follow the same rule: mirror the Task Graph into the tool, preserve links both ways, and keep validation on the packet artifacts.

# Config

Use `process.config.json` in target repos when tool preferences should persist. Start from `process.config.example.json` and validate with `schema/process-config.schema.json`.
