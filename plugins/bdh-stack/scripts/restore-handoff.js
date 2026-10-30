// Prints the saved handoff once, so a later /clear starts empty.
const fs = require('fs');
const path = require('path');

const dir = path.join(process.env.CLAUDE_PROJECT_DIR || process.cwd(), '.claude', 'bdh-stack');
const handoff = path.join(dir, 'handoff.md');

if (fs.existsSync(handoff)) {
  console.log(`Continue from this handoff, saved before /clear:\n\n${fs.readFileSync(handoff, 'utf8')}`);
  fs.renameSync(handoff, path.join(dir, 'handoff.last.md'));
}
