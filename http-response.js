var http = require('http');

var options = {
    port: 8080,
    path: '/',
    method: 'GET'
};

http.request(options,function(res){
    console.log("Got Response, Piping it to stdout\n");
    res.pipe(process.stdout,{end:false});
}).end();