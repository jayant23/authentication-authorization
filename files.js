const fs  = require('fs');
fs.readFile('./docs/text.txt',(err, data) =>{
if(err){
    console.log(err);
}
console.log(data.toString());
})
console.log("this line")


fs.writeFile('./docs/sample.txt','Hello workd',()=>{
console.log('file was written')
})

if(!fs.existsSync('./asset')){
    fs.mkdir('./asset',(err,data)=>{
        if(err){
            console.log(err);
        }
        console.log(data);
    })
}
else{
    fs.rmdir('./asset',(err,data)=>{
        if(err){
            console.log(err);
        }
        console.log('folder deleted');
    })
}


// delete files
if(fs.existsSync('./docs/text.txt')){
   fs.unlink('./docs/text.txt',(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log("file deleted");
   })
    console.log("file deleted");
}