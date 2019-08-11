#!/usr/bin/env node

const Octokit = require("@octokit/rest");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { TOKEN, USERNAME, DIRECTORY, PWD } = process.env;

let dir = DIRECTORY || PWD;

if (!TOKEN) {
  console.error("TOKEN is blank");
  process.exit(1);
}
if (!USERNAME) {
  console.error("USERNAME is blank");
  process.exit(1);
}

function log(str) {
  const ts = new Date().toLocaleString();
  console.log(`${ts} ${str}`);
}

function cloneOrPull({ full_name, output, url }) {
  return `echo ${full_name}
  if cd ${output}; then
    git fetch && git reset --hard origin/master > /dev/null
    cd - > /dev/null
  else
    git clone ${url} ${output}
  fi`;
}

async function main() {
  const client = new Octokit({
    auth: `token ${TOKEN}`
  });

  const repos = await client.paginate(
    "GET /user/repos?affiliation=owner,collaborator"
  );

  const commands = repos.map(({ full_name }) => {
    const output = `${dir}/${full_name}`;
    const url = `https://${TOKEN}@github.com/${full_name}`;
    return cloneOrPull({ full_name, output, url });
  });

  for (const cmd of commands) {
    const { stdout, stderr } = await exec(cmd);
    stdout && log(`stdout: ${stdout}`);
    stderr && log(`stderr: ${stderr}`);
  }

  log(`Done`);
}

main();
