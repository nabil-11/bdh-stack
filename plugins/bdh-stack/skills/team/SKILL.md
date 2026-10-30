---
description: Run the BDH-STACK team. With no request, scan the project and give each role its own tasks. With a request, send it through only the roles it needs.
argument-hint: "[request]"
disable-model-invocation: true
---

# Team

Request: $ARGUMENTS

Load the `bdh-stack:project-context` skill first. You run the team from the main session, because agents cannot launch each other. Use the full agent names, such as `bdh-stack:team-lead`.

| Agent | Separate job |
| --- | --- |
| `bdh-stack:ceo` | Whether to build, priority, scope |
| `bdh-stack:commercial` | Revenue, adoption, pricing, announcements |
| `bdh-stack:team-lead` | Tasks, owners, order, review against plan |
| `bdh-stack:researcher` | Facts, options, root causes |
| `bdh-stack:designer` | Front end, UX, copy |
| `bdh-stack:backend` | Server code, migrations, app integrations |
| `bdh-stack:qa` | Tests and readiness |
| `bdh-stack:security` | Security review |
| `bdh-stack:release` | CI, deploy, rollback, merge readiness |

Each task has one owner. If two roles seem to share a task, split it.

## No request: scan the project

Do this yourself with read-only tools. Do not launch the agents.

1. Read the manifests, routes, modules, tests, CI files, docs and recent `git log`.
2. Look for evidence for each role:
   - **CEO:** unfinished direction, unmigrated apps, decisions blocking work.
   - **Commercial:** money and booking flows, and adoption gaps.
   - **Team lead:** missing project rules, stale setup, work with no owner.
   - **Researcher:** facts nobody has confirmed.
   - **Designer:** rule breaks, oversized pages, missing states.
   - **Backend:** integrations and server work still to do.
   - **QA:** untested flows and missing test types.
   - **Security:** tracked secrets, unguarded routes, sensitive flows with no tests. Never print a secret's value.
   - **Release:** CI gaps, stale scripts, docs that disagree with the pipeline.
3. Verify each finding before listing it. Do not invent work to fill a role: if a role has nothing, say so.
4. Save the board to `.claude/bdh-stack/tasks.md`, keeping tasks already marked done:

```markdown
# Team board

Updated: <date>

## <Role>
- [ ] <task> — evidence: <file:line or command> — blocked by: <task or nothing>
```

5. Show the board, with the first task to do.

## With a request: route it

Use only the roles it needs. A small fix goes straight to its owner.

1. **A real choice to make** (a color, a name, a design, an approach): run `/bdh-stack:devil` first.
2. **New feature or real cost:** `commercial`, then `ceo`. Stop on a no-go.
3. **Facts missing:** `researcher`.
4. **More than a couple of files:** `team-lead` writes the tasks. Add them to the board.
5. **Build:** run `designer`, `backend` and `release` tasks in the plan's order. Use `isolation: "worktree"` for tasks that run in parallel, and give each agent the contract it depends on.
6. **Check:** `qa` for every code change. `security` for any change to sign-in, tokens, sessions, permissions, webhooks, payments or secrets.
7. **Before a merge:** `release`, then `team-lead` reviews against the plan.

Fix anything a check reports through its owner, then run that check again.

Report the outcome by role: what each did, the test results, what is still open, and what the user must decide. Do not commit, push, merge or deploy unless the user asks.
