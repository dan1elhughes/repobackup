#!/usr/bin/env node

const Octokit = require("@octokit/rest");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { TOKEN, USERNAME } = process.env;

if (!TOKEN) {
  console.error("TOKEN is blank");
  process.exit(1);
}
if (!USERNAME) {
  console.error("USERNAME is blank");
  process.exit(1);
}

function cloneOrPull({ full_name, dir, url }) {
  return `echo ${full_name}
  if cd ${dir}; then
    git pull | grep -v "up to date"
    cd - > /dev/null
  else
    git clone ${url} ${dir}
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
    const dir = `/mirror/${full_name}`;
    const url = `https://${TOKEN}@github.com/${full_name}`;
    return cloneOrPull({ full_name, dir, url });
  });

  for (const cmd of commands) {
    const { stdout, stderr } = await exec(cmd);
    stdout && console.log("stdout:", stdout);
    stderr && console.log("stderr:", stderr);
  }

  console.log("Done");
}

main();
