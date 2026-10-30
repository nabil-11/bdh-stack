---
description: Search for the agents a project needs beyond its team, from its concept, theme or task, and write a brief for each. Use when work needs knowledge nobody on the team has.
argument-hint: "[the concept, theme or task]"
---

# Hire

Need: $ARGUMENTS

There is no list of specialists, and you must not work from one you remember. Every agent comes from what this work needs, and from what the search finds.

## 1. List what the work needs

Read `.bdh-stack/project.md` and `.bdh-stack/team.md` if they exist, then list the decisions and work this need involves. Think about the audience, the subject, the content, where it ships, the laws and rules that apply, and the craft a real team would bring.

## 2. Find the gaps

For each item, ask whether someone in `team.md` can own it. If so, drop it. What is left are the gaps.

If there are no gaps, say so and stop. Most tasks have none, and stopping here costs almost nothing.

## 3. Search

Give all the gaps to one `bdh-stack:researcher` agent, even if `researcher` is not in `team.md`. Ask it to search the web and answer for each gap:

- Which profession does this work on real projects of this kind?
- Which standards, methods or laws do they work from? Give sources and dates.
- What do they catch that others miss?
- What must a real professional still sign off?

## 4. Decide

Keep a gap only if a named decision or task needs it and the search covered it. Merge any that overlap. Keep the three that would hurt most if missing, because each agent costs tokens, and you can hire again later.

Give each agent one type:

- **`advisor`:** judges and sets requirements, and cannot edit.
- **`maker`:** produces work.

And one or more moments:

- **`before start`:** listen to them before any work begins.
- **`each sprint`:** they join sprint planning.
- **`on <topic>`:** only when the work touches that topic.
- **`before release`:** they must agree before shipping.

## 5. Get the user's OK

Show a table: agent, type, the decision or task that needs it, what the search found, and when it joins. Also show which gaps you dropped and why. Wait for the user's OK. The user can add, remove or change anyone.

## 6. Write the agents

Add a row to `.bdh-stack/team.md`, and write `.bdh-stack/specialists/<role>.md`:

```markdown
# <Role>

You own: <what they decide or produce>
You do not own: <what belongs to other roles>
Standards: <what the search found, with sources and dates>
Listen for: <what they catch that others miss>
Real expert: <what a professional must still sign off>
Report: <the form of the answer>
```

Each agent runs as `bdh-stack:advisor` or `bdh-stack:maker` with its brief, so it works right away, with no restart.

Answer in the user's language.
