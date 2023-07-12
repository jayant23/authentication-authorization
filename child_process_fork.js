const { fork } = require('child_process');

// Fork a new Node.js process
const child = fork('child.js');

// Send a message to the child process
child.send({ message: 'Hello from parent' });

// Listen for messages from the child process
child.on('message', (message) => {
  console.log(`Received message from child: ${message}`);
});

// Terminate the child process
child.on('exit', (code) => {
  console.log(`Child process exited with code ${code}`);
});
