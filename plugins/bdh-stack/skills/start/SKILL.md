---
description: Start or re-plan a project. Builds the necessary team, searches for the other agents its concept needs, listens to them first, then plans the first sprint and the release.
argument-hint: "[the concept, audience and goal]"
disable-model-invocation: true
---

# Start

Concept: $ARGUMENTS

The team comes from the project. Nothing is fixed: not the roles, the sprints or the release. Everything you write goes in `.bdh-stack/`. If those files exist, update them instead of starting over.

## 1. Understand the project

Read what exists: manifests, docs, code and `git log`. If the concept is still unclear, ask at most three short questions:

- Who is it for?
- What should they be able to do or feel?
- What is the first thing to ship, and where?

Do not ask what the repo already answers. If an older board exists at `.claude/bdh-stack/tasks.md`, carry its open tasks into `.bdh-stack/tasks.md`.

If this repo is a TravelTodo app (workspace, booking backend, website or RH), use `${CLAUDE_SKILL_DIR}/profiles/traveltodo.md` as the base for `project.md`, and keep only the parts for this app.

## 2. Build the necessary team

From the core roles, keep only those this project gives real work: `ceo`, `commercial`, `team-lead`, `researcher`, `designer`, `backend`, `qa`, `security`, `release`. A static blog has no use for `backend`.

## 3. Search for the agents it needs

Follow `/bdh-stack:hire` with this project's concept and theme, up to its step 4. Measure the gaps against the necessary team from step 2, because `team.md` does not exist yet.

## 4. Get the user's OK

Show the whole team as one table: the necessary roles first, then the agents the search found, each with its reason. Say who you left out and why. Wait for the user's OK, then continue. The user can add, remove or change anyone.

## 5. Write the project files

`project.md`:

```markdown
# <Project>

Concept: <what it is and why>
Audience: <who, in detail>
Stack: <tools, or "not chosen yet">
Language and tone: <how it speaks to the audience>

## Rules
<rules for every role>

## Rules by role
<only what is special to this project>

## Release
Ships to: <store, website, server, print>
Done means: <what must be true>
Must agree: <who, from team.md>
Steps: <how it ships, and how to undo it>
```

`team.md`:

```markdown
# Team

| Role | Agent | Why | When |
| --- | --- | --- | --- |
| <role> | <agent> | <reason> | <when> |

Left out: <role>: <reason>
```

For each agent from the search, write its brief as `/bdh-stack:hire` step 6 shows.

If you cannot write these files, stop and tell the user why. Specialists need their briefs, so do not run them without one.

## 6. Listen first

Run each `before start` specialist, one agent per specialist, with its brief, and wait for all of them. Ask for requirements the team can test. Then:

- Add the requirements to `## Rules` in `project.md`.
- Tell the user what a real expert must still check.

If two specialists disagree, show the conflict and let the user decide. Do not plan around a question that is still open.

## 7. Plan the first sprint

Ask `team-lead` for the smallest first sprint that delivers something real, using only the roles in `team.md`. Save it in `tasks.md`, in the format from `/bdh-stack:team`.

## Answer

- **Project:** the concept, in one line.
- **Team:** who is in, and why.
- **Heard before start:** the requirements that changed the plan.
- **Real expert needed:** what an AI cannot sign off.
- **Sprint 1:** the goal, and the first task.
- **Release:** where it ships, and who must agree.

Answer in the user's language. Do not commit, push or deploy.
