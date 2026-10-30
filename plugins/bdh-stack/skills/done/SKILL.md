---
description: Close a finished task or sprint. Saves the work, then picks /clear or /compact for what comes next. Use when a task, sprint or feature is finished.
argument-hint: "[what comes next]"
---

# Done

What comes next: $ARGUMENTS

You cannot run `/clear` or `/compact`; only the user can. Your job is to leave nothing important only in this conversation, pick one command, and give the exact line to run.

## 1. Save

- If `.bdh-stack/tasks.md` exists, tick what is finished and add any new task you found.
- Run `git status`. Say plainly what is uncommitted and on which branch. Do not commit.
- If nothing was given above, take the next step from the board's first open task. If the board has none, treat it as nothing next.

If this closes a sprint, also compare what shipped with the sprint's goal, and check `.bdh-stack/team.md` against the next sprint. Propose who can stop, and edit `team.md` only after the user's OK. If the next sprint needs knowledge nobody has, run `/bdh-stack:hire` with its goal. A role with no work in the next sprint costs nothing while it stays out of the tasks.

## 2. Pick

Use the first row that fits:

| Situation | Pick |
| --- | --- |
| This attempt failed and should be dropped | `/rewind` |
| The next work is unrelated, or nothing is next | `/clear`, no handoff |
| The same work continues, and the next step fits in a short handoff | Handoff, then `/clear` |
| The same work continues, and it depends on too much to write down, such as a bug hunt in progress | `/compact` with a focus |

`/clear` costs nothing, and `/compact` has to read the conversation to summarize it, so prefer `/clear` when both would work. Never suggest clearing the prompt cache: it makes each turn cheaper.

## 3. Handoff

Only for the handoff row. Write `.bdh-stack/handoff.md`, under 30 lines:

```markdown
# Handoff

Goal: <what this work is for>
Done: <what is finished>
Next step: <the first thing to do>
Decisions: <what was decided, and why>
Read first: <file:line>
Do not redo: <what was tried and failed>
```

Use `file:line` instead of code or logs. Never write a secret's value. On any other row, delete an old `handoff.md` if there is one, because it comes back after the next `/clear`.

## Answer

- **Closed:** what finished, in one line.
- **Uncommitted:** the files and branch, or "nothing".
- **Next:** the one line to run, in a code block. For `/compact`, write the focus into the line: `/compact Keep <what the next step needs>`.

After a handoff, say that it comes back on its own after `/clear`. Answer in the user's language.
