---
type: Process Policy
title: Checkpointing
description: How to preserve orchestration state before context, budget, or human attention is exhausted.
tags: [checkpoint, handoff, continuity]
timestamp: 2026-06-14T00:00:00Z
---

# Trigger

Create a checkpoint when:

- The human says "checkpoint".
- Context window or token budget is at risk.
- Work is paused with open decisions.
- A new Orchestrator or session must continue the work.

# Location

Save checkpoints as Markdown with frontmatter:

```text
docs/intake/checkpoint-<date>.md
```

# Template

```md
---
type: Checkpoint Packet
title: Checkpoint: <Initiative>
description: Continuation state for the next Orchestrator session.
tags: [checkpoint, intake]
timestamp: <ISO-8601>
---

# Current State
- Scale mode:
- Work type:
- Artifacts created:

# Open Decisions
- Decision:
- Owner:
- Recommended default:

# Assumptions
- Assumption:
- Confidence:
- Validation path:

# Partial Artifacts
- Ready-To-Proceed Packet:
- Task Graph:
- PR Task Packet:

# Next Action
- Recommended next step:
- Files the next session must read first:
- Stop conditions:
```

# Rule

The next Orchestrator starts from the latest checkpoint, then reads only the files named in the checkpoint before opening broader context.
