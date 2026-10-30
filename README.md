# BDH-STACK

A Claude Code plugin that gives the TravelTodo apps a virtual team. Each role has its own job, so tasks stay separate.

| Command | What it does |
| --- | --- |
| `/bdh-stack:devil <choice>` | Argues the opposite side, finds bugs, and gives the best solution |
| `/bdh-stack:team` | Scans the project and gives each role its tasks |
| `/bdh-stack:team <request>` | Sends a request through only the roles it needs |

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

The board is saved to `.claude/bdh-stack/tasks.md` in each project.

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

Check your changes with `claude plugin validate C:/laragon/www/bdh-stack`.
