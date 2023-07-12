process.on('message', (message) => {
    console.log(`Received message from parent: ${message.greeting}`);
    
    // Send a response to the parent process
    process.send('Hi, parent!');
  });
  
  // Simulate some long-running task in the child process
  setTimeout(() => {
    console.log('Child process task completed.');
  }, 2000);
  