console.log(global);
setTimeout(() => {
    console.log("in the settimeout")
}, 3000);
setInterval(() => {
    console.log("set interval")
}, 3000);

console.log(__dirname)
console.log(__filename)