---
description: Run the BDH-STACK team. With no request, scan the project and fill the board. With a request, send it through only the roles it needs.
argument-hint: "[request]"
disable-model-invocation: true
---

# Team

Request: $ARGUMENTS

You run the team from the main session, because agents cannot launch each other. Use the full agent names, such as `bdh-stack:team-lead`. Each agent loads the project context itself.

Read `.bdh-stack/team.md`: it lists this project's roles, and only those roles work here. If it is missing, use the core roles for now, and say once that `/bdh-stack:start` builds a team for this project.

If `.bdh-stack/project.md` is missing, write a short one before anything else, with no agent and no questions. Take `Concept`, `Stack` and `## Checks` from the README and the manifests, in the format `/bdh-stack:start` uses, and leave out what they do not show.

| Core role | Separate job |
| --- | --- |
| `bdh-stack:ceo` | Whether to build, priority, scope |
| `bdh-stack:commercial` | Revenue, adoption, pricing, announcements |
| `bdh-stack:team-lead` | Tasks, sprints, owners, order, review against plan |
| `bdh-stack:researcher` | Facts, options, root causes |
| `bdh-stack:designer` | Front end, UX, copy |
| `bdh-stack:backend` | Server code, migrations, integrations |
| `bdh-stack:qa` | Tests and readiness |
| `bdh-stack:security` | Security review |
| `bdh-stack:release` | CI, deploy, rollback, readiness to ship |

Specialists run as `bdh-stack:advisor` (read-only) or `bdh-stack:maker` (can edit). Name the specialist and its brief in the task: `.bdh-stack/specialists/<role>.md`.

Each task has one owner. If two roles seem to share a task, split it.

## The board

Save it to `.bdh-stack/tasks.md`, keeping tasks already marked done:

```markdown
# Team board

Updated: <date>

## Sprint <n>: <goal>
Ships: <what comes out of this sprint>
- [ ] <task> — owner: <role> — evidence: <file:line or command> — blocked by: <task or nothing>

## Backlog
- [ ] <task> — owner: <role> — evidence: <file:line or command> — blocked by: <task or nothing>
```

## No request: scan the project

Launch `bdh-stack:team-lead` once for steps 1 to 3, and ask for the findings as its report, so the reading stays out of this session. Do not launch the other agents.

1. Read the manifests, routes, modules, tests, CI files, docs and recent `git log`.
2. Look for evidence for each role in `team.md`:
   - **CEO:** unfinished direction, decisions blocking work.
   - **Commercial:** money flows and adoption gaps.
   - **Team lead:** missing project rules, stale setup, work with no owner.
   - **Researcher:** facts nobody has confirmed.
   - **Designer:** rule breaks, oversized pages, missing states.
   - **Backend:** integrations and server work still to do.
   - **QA:** untested flows and missing test types.
   - **Security:** tracked secrets, unguarded routes, sensitive flows with no tests. Never print a secret's value.
   - **Release:** CI gaps, stale scripts, docs that disagree with the pipeline.
   - **Specialists:** what their brief says to check.
3. Verify each finding before listing it. Do not invent work to fill a role: if a role has nothing, say so. If a finding needs knowledge nobody on the team has, name the gap.
4. Add the findings to the board's backlog.
5. Show the board, with the first task to do. For any gap, run `/bdh-stack:hire` with that gap.

## With a request: route it

Pick the size yourself, without launching an agent:

| Size | What it looks like | Route |
| --- | --- | --- |
| Small | A clear change in one area, outside the sensitive list in step 8 | Launch its owner, and ask for the fast check only. Skip the steps below. |
| Medium | One feature, or several small changes | Only the steps below that apply. |
| Large | Several features, or more than one sprint | The same, for one sprint per request. |

For a large request, stop after the sprint, unless the user asked for all of them. Show what changed, so a wrong direction costs one sprint.

Use only the roles the request needs. At every size, the owner's agent does the work: never edit project files from this session. Each agent starts empty, so give it only its task, the files and the contract, never the whole conversation.

1. **A real choice to make** (a color, a name, a design, an approach): run `/bdh-stack:devil` first.
2. **New feature or real cost:** `commercial`, then `ceo`. Stop on a no-go.
3. **Facts missing:** `researcher`.
4. **Check the team:** if this task needs knowledge nobody in `team.md` has, run `/bdh-stack:hire` with the task. Skip this for a small fix.
5. **Listen first:** run the specialists whose `When` in `team.md` matches this work, before anyone builds. Add their requirements to the tasks.
6. **More than a couple of files:** `team-lead` writes the tasks. Add them to the board.
7. **Build:** run the tasks in the plan's order. Use `isolation: "worktree"` for tasks that run in parallel, and give each agent the contract it depends on.
8. **Check:** once, after the last build task. `qa` for every code change. `security` for any change to sign-in, tokens, sessions, permissions, webhooks, payments, personal data or secrets.
9. **Before shipping:** `release`, then the specialists marked `before release`, then `team-lead` reviews against the plan.

Fix anything a check reports through its owner, then run only that check again.

If an agent hits its turn limit, its work comes back partial. Resume it once with `SendMessage`, and tell it to finish and report. If it stops again, show the user what is done and what is left.

Report the outcome by role: what each did, the test results, what is still open, and what the user must decide. Do not commit, push, merge or deploy unless the user asks.

When the request is finished, run `/bdh-stack:done`.
