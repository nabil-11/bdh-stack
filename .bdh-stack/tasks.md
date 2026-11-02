# Team board

Updated: 2026-11-01

## Backlog
- [ ] Quote the `description` value in `commercial.md`, so its frontmatter parses and it runs read-only on Sonnet — owner: backend — evidence: `plugins/bdh-stack/agents/commercial.md:3`, 3 real runs on Opus with Write and Edit — blocked by: nothing
- [ ] Add a frontmatter check that parses every agent and skill file as YAML — owner: qa — evidence: `claude plugin validate` passed with `commercial.md:3` broken — blocked by: nothing
- [ ] Run the check on every push — owner: release — evidence: no CI files in the repo — blocked by: the frontmatter check
- [ ] Test the paths no run has covered: the TravelTodo profile, a sprint closing through `/bdh-stack:done`, `hire` step 6, and Claude acting on the note restored after `/clear` — owner: qa — evidence: no test files in the repo, 0 real runs of `start` or `hire` — blocked by: nothing
- [ ] Check whether `qa` edits only test files, because that limit is only an instruction — owner: security — evidence: `plugins/bdh-stack/agents/qa.md:4` allows Edit and Write — blocked by: nothing
- [ ] Find out why `researcher` ran on Haiku in 2 runs when its file says Sonnet — owner: researcher — evidence: `plugins/bdh-stack/agents/researcher.md`, session transcripts — blocked by: nothing
- [ ] Decide whether to go public — owner: ceo — evidence: no licence, `skills/start/profiles/traveltodo.md` is tracked — blocked by: nothing
- [ ] If going public, remove the profile and its history, or move to a new repo, and reword the marketplace description — owner: release — evidence: `.claude-plugin/marketplace.json:3`, 2 commits with internal details — blocked by: the decision to go public
- [ ] If going public, add a licence — owner: release — evidence: no licence file — blocked by: the decision to go public
- [ ] Add a `.gitignore` with `.bdh-stack/handoff*.md`, as the README tells users to — owner: release — evidence: no `.gitignore`, `README.md` under Your project's files — blocked by: nothing
- [ ] Hold the LinkedIn posts with the install link until the repo can be installed by others — owner: commercial — evidence: the repo was private at the last check — blocked by: the decision to go public
