const cp = require('child_process');
cp.execSync(`cd ${__dirname}; yarn install --frozen-lockfile`);

const path = require('path');
const core = require('@actions/core');
const lernaChangelog = path.resolve(__dirname, 'node_modules/.bin/lerna-changelog');

const exec = (cmd) => cp.execSync(cmd).toString().trim();

const tagFrom = core.getInput('from', {
  required: true,
});
const tagTo = core.getInput('to', {
  required: true,
});

const changelog = exec(`node ${lernaChangelog} --tag-from ${tagFrom} --tag-to ${tagTo}`);

console.log(changelog);
console.log(JSON.stringify(changelog));

core.setOutput('changelog', JSON.stringify(changelog));