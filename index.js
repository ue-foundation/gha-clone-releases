const core = require('@actions/core');

async function run() {
  const token = core.getInput('token');
  const destToken = core.getInput('dest_token');

  console.log(`Source token: ${token}`);
  console.log(`Destination token: ${destToken}`);
}

run();