---
type: Process Policy
title: Orchestrator And Executor
description: Optional operating mode for splitting planning and bounded implementation across agents or models.
tags: [orchestrator, executor, delegation, handoff]
timestamp: 2026-06-14T00:00:00Z
---

# Policy

The Orchestrator/Executor split is optional. Use it when planning quality matters, implementation can be bounded, or a cheaper/specialized model will execute a well-scoped task.

# Orchestrator

The Orchestrator owns:

- Adaptive context intake.
- Work type and scale-mode classification.
- Artifact selection.
- Ready-To-Proceed Packets.
- Task Graphs and PR Task Packets.
- Human decisions, assumptions, and risk acceptance.
- Executor handoff packets.

The Orchestrator must not hand off implementation until the relevant packet exists and is accepted or explicitly approved.

# Executor

The Executor receives one bounded task at a time:

- One PR Task Packet, or
- One Task Graph task with enough linked context to execute safely.

The Executor does not perform intake, redefine scope, create high-level artifacts, introduce new tools, or expand write boundaries. If the packet is insufficient, the Executor stops and asks the Orchestrator for a revised packet.

# Handoff Requirements

Every Executor handoff should include:

- Goal.
- Allowed, read-only, and forbidden paths.
- Scope and non-scope.
- Definition of done.
- Verification commands and expected results.
- Stop conditions.
- Links to source artifacts.
- Budget or timebox when relevant.
