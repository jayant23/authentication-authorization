const { parentPort } = require('worker_threads');

// Listen for messages from the main thread
parentPort.on('message', (message) => {
  console.log(`Received message from main thread: ${message}`);
  
  // Send a response back to the main thread
  parentPort.postMessage('Hi, worker thread!');
});
