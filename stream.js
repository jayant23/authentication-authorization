const fs = require('fs');
const readStream = fs.createReadStream('./docs/sample.txt');
const writeStream = fs.createWriteStream('./docs/sample1.txt')
// readStream.on('data',(chunk)=>{
// console.log('new chunk----------------');
// console.log(chunk);
// console.log(chunk.toString())

// console.log('\nNew Chunk\n');
// writeStream.write(chunk);
// })


readStream.pipe(writeStream);