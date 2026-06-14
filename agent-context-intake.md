# Agent Context Intake Playbook

Purpose: guide an agent from a vague human request such as "I want to build X, use this process" to a complete-enough starting context, with the right amount of rigor for the work and the human's technical comfort.

This playbook is the first artifact an agent should read when starting a new initiative. It does not replace the PRD, Release Target, Execution Brief, Architecture Map, ADRs, or PR Task Packets. It tells the agent how to collect the context needed to create only the artifacts that are actually useful.

## Operating Rule

The agent owns the context-gathering workflow. The human owns product intent, risk tolerance, business constraints, and final tradeoffs.

Do not ask the human to fill every template manually. Interview, infer, summarize, and ask for confirmation. Use the repository, existing docs, product screenshots, issue trackers, logs, and linked systems when available.

## Adaptive Intake Flow

```text
Human request
  -> Understand the desired outcome
  -> Assess human interaction level
  -> Classify work type and risk mode
  -> Gather missing context in focused rounds
  -> Draft required artifacts or summaries
  -> Confirm assumptions and blocking decisions
  -> Recommend the next phase
```

## Human Interaction Levels

Assess the human's preferred interaction level early. Do not make this feel like a test.

| Level | Use When | Agent Behavior |
| --- | --- | --- |
| Novice or PM-level | Human knows the product outcome but not implementation details | Explain tradeoffs plainly, recommend defaults, ask fewer technical questions, infer technical details from the repo, surface decisions in business terms |
| Technical collaborator | Human can discuss architecture and constraints | Ask targeted technical questions, offer options, invite correction, document chosen tradeoffs |
| Expert driver | Human already has architecture or implementation preferences | Be concise, verify assumptions, challenge risky choices with evidence, avoid over-explaining basics |

Opening assessment questions:

- How technical do you want this collaboration to be: mostly product-level, mixed product and technical, or deeply technical?
- Should I make reasonable technical decisions and bring you tradeoffs, or do you want to approve architecture choices directly?
- How often do you want checkpoints: only at major decisions, after each planning artifact, or before every risky step?

If the human does not answer, default to mixed product and technical, with the agent making routine technical judgments and asking before high-impact choices.

## Question Strategy

Ask questions in rounds, not as a giant form.

Round 1: outcome and constraints.

- What are we trying to build or change?
- Who is it for?
- What does success look like?
- What is out of scope or explicitly unwanted?
- Is there a deadline, budget, or launch pressure?

Round 2: current state and risk.

- Is this greenfield or an existing repo/product?
- What systems, users, data, or workflows could be affected?
- Does this touch authentication, authorization, payments, customer data, regulated data, infrastructure, integrations, migrations, or public APIs?
- What would be painful if it broke?

Round 3: execution preferences.

- Do you prefer the smallest useful release, a polished first release, or an architecture foundation first?
- Should the agent optimize for speed, safety, cost, maintainability, or learning?
- What task or planning system should this work use: Linear, GitHub Issues, Jira, Markdown files, another tool, or none?
- Should the Task Graph remain the source of truth, or should the external tracker be the source of truth?
- Are there team, project, label, milestone, cycle, or issue-template preferences to record in `process.config.json`?
- Are there approved or forbidden technologies, vendors, services, or deployment targets?
- What level of human review is expected before coding starts?

Round 4: confirmation.

- Here is what I understand.
- Here are assumptions I can proceed with.
- Here are decisions only you can make.
- Here are the artifacts I think we need and the ones we should skip.
- Here is what must be true before coding starts.
- Here is the recommended next step.

## What The Agent Should Infer

Infer these when the repo or linked material makes them clear:

- Language, framework, package manager, test commands, build commands.
- Existing architecture patterns and module boundaries.
- Current dependencies and deployment hints.
- Existing CI, lint, formatting, and test conventions.
- Obvious affected files or likely integration points.
- Whether a change is probably lightweight, standard, deep, or enterprise.

Ask before deciding these:

- Business priority, success metrics, target users, and launch scope.
- Risk tolerance, rollback expectations, and acceptable tradeoffs.
- New vendors, paid services, cloud services, frameworks, databases, queues, auth providers, telemetry, or deployment models.
- Anything involving money, permissions, privacy, customer data, regulated data, security posture, or public commitments.

## Artifact Selection

Use the smallest artifact set that preserves safety and reviewability.

| Mode | Create Before Coding | Skip Unless Triggered |
| --- | --- | --- |
| Lightweight | Mini PR Task Packet | PRD, Roadmap, ADR, full Architecture Map |
| Standard | Short PRD or Execution Brief, Task Graph, PR Task Packet | Vision/Strategy/Methods, full Technology Strategy, ADRs without real tradeoffs |
| Deep | Vision/Strategy/Methods if initiative-level, PRD, Release Target, Roadmap, Technology Strategy, Execution Brief, Architecture Map, ADR review, ADRs when triggered, Task Graph, PR Task Packets, Runbook | Threat Model and Access Review unless security/data triggers apply |
| Enterprise | Deep artifacts plus Threat Model, Access Review, Security Test Plan, Adversarial Review, Incident/Rollback Plan | Nothing required by the risk gate |

## Ready-To-Proceed Packet

At the end of intake, produce this concise packet for the human.

```md
# Ready-To-Proceed Packet: <Initiative>

## Human Interaction Level
- Level:
- Collaboration preference:
- Checkpoint preference:

## Objective
- What we are building or changing:
- User/business outcome:
- Success signal:

## Current Understanding
- Current state:
- Relevant repo/docs:
- Constraints:
- Non-goals:

## Classification
- Scale mode: Lightweight | Standard | Deep | Enterprise
- Work types:
- Why this classification:

## Recommended Artifact Set
- Create:
- Skip:
- Conditional:

## Definition Of Ready
- Product intent clear:
- Risk mode accepted:
- Required artifacts:
- Task system and source of truth:
- Required human approvals:
- Checks or evidence expected:

## Key Assumptions
- Assumption:
- Confidence:
- How we will validate:

## Human Decisions Needed
- Decision:
- Why it matters:
- Recommended default:

## Risks
- Risk:
- Mitigation:
- Owner:

## Recommended Next Step
- Agent recommendation:
- Human approval needed: yes/no
```

The next phase may start when blocking decisions are resolved, assumptions are explicit, and the human agrees with the recommended artifact set.

## Exception Handling

If the human asks to move faster than the recommended process, the agent may proceed only when the shortcut is explicit.

Record:

- What is being skipped.
- Why it is acceptable.
- Who accepts the risk.
- What evidence still must be collected.
- When the skipped artifact or decision must be revisited.

Never skip security, privacy, data, payment, permission, infrastructure, or rollback gates silently.

## Anti-Patterns

- Asking the human to manually complete every template.
- Treating a non-technical human's silence as approval for architecture, vendors, or security risk.
- Treating an expert human as if they need every basic concept explained.
- Generating full Deep or Enterprise artifacts for simple work.
- Starting implementation while product intent, risk mode, or stop conditions are unclear.
- Asking technical questions that can be answered by reading the repo.
- Hiding uncertainty behind confident implementation plans.
