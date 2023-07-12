const { fork } = require('child_process');

// Fork a new Node.js process
const child = fork('child.js');

// Send a message to the child process
child.send({ greeting: 'Hello from parent' });

// Listen for messages from the child process
child.on('message', (message) => {
  console.log(`Received message from child: ${message}`);
});

// Terminate the child process after 3 seconds
setTimeout(() => {
  child.kill();
}, 3000);
