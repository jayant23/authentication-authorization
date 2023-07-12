const { spawn } = require('child_process');

// Spawn a child process to execute a command
const ls = spawn('ls', ['-l', '/']);

// Listen for data events from the child process's stdout
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Listen for errors or when the child process exits
ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

console.log("_____________________________________________")
