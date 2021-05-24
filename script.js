#!/usr/bin/env node
require("dotenv-safe").config({ path: "/mirror/.env" });

const Octokit = require("@octokit/rest");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { TOKEN, USERNAME, PWD } = process.env;

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
    auth: TOKEN,
  });

  const repos = await client.paginate(
    "GET /user/repos?affiliation=owner,collaborator"
  );

  const commands = repos.map(({ full_name }) => {
    const output = `/mirror/${full_name}`;
    const url = `https://${USERNAME}:${TOKEN}@github.com/${full_name}`;
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
