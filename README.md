# BDH-STACK

A [Claude Code](https://code.claude.com) plugin that builds a virtual team for each project.

Most AI teams are a fixed list of roles. BDH-STACK works in two steps:

1. **Necessary team:** it keeps only the core roles your project gives real work.
2. **Search:** it lists what your concept, theme or task needs, removes what the team already covers, and searches the web for who handles the rest on real projects. There is no list of specialists to pick from.

Tasks, sprints and the release are planned for that project too.

## Install

You need Claude Code, with the `claude` command on your PATH. The handoff after `/clear` also needs Node.

```bash
claude plugin install bdh-stack --marketplace nabil-11/bdh-stack
```

Restart Claude Code to load it. To get a new version later:

```bash
claude plugin update bdh-stack@bdh
```

## Quick start

Open Claude Code in your project folder, then give it your concept:

```text
/bdh-stack:start a reading app for children aged 6 to 8
```

It then:

1. Reads the project and asks at most three questions.
2. Builds the necessary team.
3. Searches for the other agents the concept needs.
4. Shows you the whole team and waits for your OK. You can add, remove or change anyone.
5. Hears the agents marked `before start`, and turns their requirements into project rules.
6. Plans the first sprint and the release.

Then work through the board:

```text
/bdh-stack:team add the first reading exercise
```

It picks a size first:

| Size | Example | What runs |
| --- | --- | --- |
| Small | One clear change | Its owner, with the fast check |
| Medium | One feature | Only the roles the feature needs |
| Large | Several sprints | One sprint, then it stops and shows you the result |

To run every sprint in one go, say so in your request. When the work is finished, it closes with `/bdh-stack:done`, which tells you what to run next.

## Commands

| Command | What it does |
| --- | --- |
| `/bdh-stack:start <concept>` | Builds the team, hears the specialists, and plans the first sprint and the release |
| `/bdh-stack:team` | Scans the project and adds tasks to the board |
| `/bdh-stack:team <request>` | Sends a request through only the roles it needs |
| `/bdh-stack:hire <concept, theme or task>` | Searches for an agent the work needs, then adds it to the team |
| `/bdh-stack:devil <choice>` | Argues the opposite side, finds bugs, and gives the best solution |
| `/bdh-stack:done [what comes next]` | Closes a task or sprint, then tells you to run `/clear` or `/compact` |

To call one role directly, use `@agent-bdh-stack:<role>`.

## The team

| Role | Job | Can edit |
| --- | --- | --- |
| `ceo` | Whether to build, priority, scope | No |
| `commercial` | Revenue, adoption, pricing, announcements | No |
| `team-lead` | Tasks, sprints, owners, review against plan | No |
| `researcher` | Facts, options, root causes | No |
| `designer` | Front end, UX, copy | Yes |
| `backend` | Server code, migrations, integrations | Yes |
| `qa` | Tests and readiness | Tests only |
| `security` | Security review | No |
| `release` | CI, deploy, rollback, readiness to ship | Yes |
| `advisor` | Runs any hired agent that sets requirements, from its brief | No |
| `maker` | Runs any hired agent that produces work, from its brief | Yes |

Each task has one owner. Hired agents work right away, with no restart.

Agents are AI, not qualified professionals. Each brief names what a real professional must still sign off.

## Hire agents at any time

The search is not only for the start:

- `/bdh-stack:team <request>` runs it when a task needs knowledge nobody on the team has.
- `/bdh-stack:done` runs it when the next sprint does.
- You can run `/bdh-stack:hire` yourself.

If the team already covers the work, it stops without searching. A new agent joins only after your OK, and each search adds at most three.

## Your project's files

Each project keeps its own files in `.bdh-stack/`:

| File | What it holds |
| --- | --- |
| `project.md` | Concept, audience, stack, rules and release |
| `team.md` | Who is on the team, why, and when they join |
| `specialists/<role>.md` | The brief for each hired agent |
| `tasks.md` | The board: sprints, tasks and owners |
| `handoff.md` | A short note that comes back once after `/clear` |

Commit these files so the team stays with the project, and add `.bdh-stack/handoff*.md` to `.gitignore`.

## Finish a task or sprint

`/bdh-stack:done` updates the board, reports uncommitted work, and gives you one line to run. You run that line yourself, because a plugin cannot run `/clear` or `/compact`.

| What comes next | What to run |
| --- | --- |
| Failed attempt to drop | `/rewind` |
| Unrelated work, or nothing | `/clear` |
| Same work, fits in a short handoff | `/clear`, and the handoff comes back on its own |
| Same work, too much to write down | `/compact Keep ...` |

## How it saves tokens

- Only the roles a request needs are used.
- Roles and hired agents run on Sonnet, except `security` on Opus.
- Each agent starts empty, and gets only its task, its files and the contract.
- Agents keep reports short, with no pasted code or logs.
- The project scan runs in a separate agent, so the reading stays out of your main session.
- Clearing between tasks keeps the conversation small.

Do not clear the prompt cache: cached reads make each turn cheaper.

## How it stays fast

Waiting for checks usually takes longer than the team's planning, so every role follows the same rule:

- Finish the edits first, then check them together.
- Use the fast check while working: one test file, or one screen at one size.
- Run the full check once, after the last edit.
- Test other sizes, languages and themes only in that full check, and only on the screens that changed.

Set your project's two checks under `## Checks` in `.bdh-stack/project.md`:

```markdown
## Checks
Fast: npx vitest run src/theme
Full: npx tsc --noEmit && npx vitest run && npx eslint src
```

## Change it

| What | Where |
| --- | --- |
| Rules for every role | `plugins/bdh-stack/skills/project-context/SKILL.md` |
| Roles, models and effort | `plugins/bdh-stack/agents/` |
| Commands | `plugins/bdh-stack/skills/` |
| Starting facts for your own repos | `plugins/bdh-stack/skills/start/profiles/` |
| Hooks | `plugins/bdh-stack/hooks/` |

To work from a local copy, run `claude plugin marketplace add <path to your copy>`. Edits take effect at the next session, or after `/reload-plugins`.

Check your changes with `claude plugin validate <path to your copy>`. People who install from GitHub get a new release only when `version` in `plugins/bdh-stack/.claude-plugin/plugin.json` changes.
