/*
Using node's default module
var http = require('http');
var util = require('util');

var options = {
    host: 'www.google.com',
    post: 80,
    path: '/index.html'
};


var request = http.request(options,function(res){
    console.log("Got a response from "+options.host+" with status "+res.statusMessage);
    console.log("\nResponse headers: "+util.inspect(res.headers));
    
    res.setEncoding('utf8');
    
    res.on('data',function(chunk){
        console.log("Response chunk recieved: "+ chunk);
    });
});


request.end("Heya this is some data");
*/


/*
Using 3rd party request module*/

var request = require('request');

request('http://www.google.com:80/index.html',function(err,response, responseBody){
   console.log(response.statusCode); 
});