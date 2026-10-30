---
description: Shared rules for every BDH-STACK role. Load before running a BDH-STACK role or skill.
user-invocable: false
---

# Project context

The project is in `${CLAUDE_PROJECT_DIR}`. Every `.bdh-stack/` path starts there, not in the plugin's folder.

Read `.bdh-stack/project.md` before you start. It holds this project's concept, audience, stack, release, and any rules for your role. Follow it. If it disagrees with the code on a fact, the code wins. If it is missing, work from the code and say so in your report.

## Keep it small

- The repo's `CLAUDE.md` is already loaded for the roles that need it. Do not read it again.
- Search first, then read only the part you need.
- Run the narrow test first. Show only what failed.
- Keep your report short. Cite `file:line`, and never paste code, diffs or logs. The main session carries your report for the rest of the conversation.
