# BDH-STACK

A Claude Code plugin that gives the TravelTodo apps a virtual team. Each role has its own job, so tasks stay separate.

| Command | What it does |
| --- | --- |
| `/bdh-stack:devil <choice>` | Argues the opposite side, finds bugs, and gives the best solution |
| `/bdh-stack:team` | Scans the project and gives each role its tasks |
| `/bdh-stack:team <request>` | Sends a request through only the roles it needs |
| `/bdh-stack:done [what comes next]` | Closes a task or sprint, then tells you to run `/clear` or `/compact` |

To call one role directly, use `@agent-bdh-stack:<role>`.

| Role | Job | Can edit |
| --- | --- | --- |
| `ceo` | Whether to build, priority, scope | No |
| `commercial` | Revenue, adoption, pricing, announcements | No |
| `team-lead` | Tasks, owners, order, review against plan | No |
| `researcher` | Facts, options, root causes | No |
| `designer` | Front end, UX, copy | Yes |
| `backend` | Server code, migrations, app integrations | Yes |
| `qa` | Tests and readiness | Tests only |
| `security` | Security review | No |
| `release` | CI, deploy, rollback, merge readiness | Yes |
| `devil` | Takes the opposite side, finds bugs, proposes the best solution | No |

The devil is a command, so run it with `/bdh-stack:devil <choice>`, not `@agent-bdh-stack:devil`.

The board is saved to `.claude/bdh-stack/tasks.md` in each project.

## Finish a task or sprint

`/bdh-stack:team <request>` ends with `/bdh-stack:done`. For other work, run it yourself. It updates the board, reports uncommitted work, and gives you one line to run. Only you can run that line, because skills and hooks cannot run `/clear` or `/compact`.

| What comes next | What to run |
| --- | --- |
| Failed attempt to drop | `/rewind` |
| Unrelated work, or nothing | `/clear` |
| Same work, fits in a short handoff | `/clear`. The handoff in `.claude/bdh-stack/handoff.md` comes back once on its own. This needs Node. |
| Same work, too much to write down | `/compact Keep ...` |

Do not clear the prompt cache. Cached reads make each turn cheaper, and clearing the conversation is what saves tokens.

Roles run on Sonnet, except `security` on Opus. To change this, edit `model` and `effort` in `plugins/bdh-stack/agents/`.

## Install

The `claude` command needs to be on your PATH. Replace `<owner>` with the GitHub account that holds this repo. For a private repo, you need access to it.

```bash
claude plugin marketplace add <owner>/bdh-stack
claude plugin install bdh-stack@bdh
```

To work from a local copy instead, use `claude plugin marketplace add C:/laragon/www/bdh-stack`. Edits there take effect at the next session, or after `/reload-plugins`.

People who install from GitHub get a new release only when `version` in `plugins/bdh-stack/.claude-plugin/plugin.json` changes.

## Change it

- Shared project facts: `plugins/bdh-stack/skills/project-context/SKILL.md`
- Roles: `plugins/bdh-stack/agents/`
- Commands: `plugins/bdh-stack/skills/`
- Hooks: `plugins/bdh-stack/hooks/`

Check your changes with `claude plugin validate C:/laragon/www/bdh-stack`.
