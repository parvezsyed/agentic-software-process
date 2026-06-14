# Agentic Software Delivery Process

This project contains a practical, human-and-agent-readable process for starting, planning, building, verifying, and shipping software with agentic coding systems.

## How To Use

Give an agent this repository and a goal.

### Recommended Orchestrator Prompt

Use this when you want the agent to own intake, classify the work, create the right packets, split tasks, and hand off bounded implementation only after the process is ready.

```text
Use /Users/pms88/projects/agentic-software-process as the process.

You are acting as the Orchestrator. Read AGENT-ENTRYPOINT.md first, follow the process, and start intake for this goal:

<goal>

Do not implement until the required intake packet and task packet/task graph exist. Create checkpoints using knowledge/checkpointing.md when context or tokens are at risk.
```

### Minimal Start Prompt

Use this for lightweight/general sessions, or when the agent should infer its role from the repository and conversation.

```text
Use /Users/pms88/projects/agentic-software-process as the process for this project.

Read AGENT-ENTRYPOINT.md first, follow the process, and start intake for this goal:

<goal>
```

The agent should start with `AGENT-ENTRYPOINT.md`, then `agent-context-intake.md`. It should classify the work by risk, collect enough context, and recommend the smallest useful artifact set before coding begins. Do not load the full manual unless the risk or ambiguity justifies it.

## Files

- `agent-context-intake.md` - first-read playbook for adaptive context gathering.
- `agentic-software-delivery-process.md` - human-readable operating manual.
- `agentic-software-delivery-process.json` - machine-readable workflow and schema.
- `AGENT-ENTRYPOINT.md` - compact first-read guide for agents.
- `process.config.example.json` - optional task-system and artifact preference config.
- `knowledge/` - OKF-style Markdown policies and playbooks with frontmatter, indexes, and logs.
- `schema/` - JSON Schemas for machine-validated packets and task graphs.
- `examples/` - completed packet and durable-knowledge examples for agents and humans.
- `scripts/validate.mjs` - local validation for examples and lifecycle metadata.

## Validate

```sh
npm test
```

## Checkpoint

Use the lightest process that preserves reviewability, safety, and enough durable context for future humans and agents.

## Contributing

Contributions are welcome. The best ways to contribute:

- **New examples** — lightweight, standard, or heavy packets for different project types (see `examples/`).
- **New schemas** — JSON Schema for artifacts not yet covered.
- **Better recipes** — brownfield discovery, dependency mapping, or language-specific patterns (see `knowledge/`).
- **Process improvements** — see `knowledge/self-dogfooding.md` for how to propose changes to the process itself.

Open a PR with your change. For larger ideas, open an issue first to discuss fit.

---

If this methodology actually helps you ship without losing your mind (or your tokens), consider throwing a tip my way on [Ko-fi](https://ko-fi.com/parvezsyed). It helps fund more interesting (and probably over-engineered) experiments for everyone.
