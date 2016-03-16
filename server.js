var http = require('http');
var util = require('util');
var fs = require('fs');
var spawn = require('child_process').spawn;
var endCalled = false;

var server = http.createServer();

server.on('request',function(request,response){
    
    //res.writeHead(200,{'Content-Type':'text/plain'});
    
    /* We can shorten it by writting the response directly in end event 
    res.write('Hello Dolly!');*/

    /* Streaming file as response
    var readStream = fs.createReadStream('Wildlife.wmv');
    readStream.pipe(res);*/
   
   /*var child = spawn('node',['child.js']);
    
   res.write("Lets wait for child\n");
    
   child.stdout.pipe(res);
    
    res.on('close',function(){
        console.log("End called");
        child.kill();
        
    });*/

    //res.end(util.inspect(req.headers));  
    
    var html =
        '<!DOCTYPE html>' +
        '<html lang="en">' +
            '<head>' +
                '<meta charset="utf-8">' +
                '<title>Chunked transfer encoding test</title>' +
            '</head>' +
            '<body>';

    response.write(html);

    html = '<h1>Chunked transfer encoding test</h1>';

    response.write(html);

    // Now imitate a long request which lasts 5 seconds.
    setTimeout(function () {
        html = '<h5>This is a chunked response after 5 seconds. The server should not close the stream before all chunks are sent to a client.</h5>';

        response.write(html);

    }, 5000);

    // this is another chunk of data sent to a client after 2 seconds before the
    // 5-second chunk is sent.
    setTimeout(function () {
        html = '<h5>This is a chunked response after 2 seconds. Should be displayed before 5-second chunk arrives.</h5>' + '\n';

        response.write(html);
    }, 2000);
    
    var child = spawn('node',['child.js']);
    
   response.write("Lets wait for child\n");
    
   child.stdout.pipe(response);
    
   child.stdout.on("end",function(){
       // since this is the last chunk, close the stream.
       if(!endCalled)
           {
                html =
                    '</body>' +
                        '</html>';

                response.end(html);
           }
       
   });
   
    response.on('close',function(){
        endCalled = true;
        console.log("End called");
        child.kill(); 
    });
    
    
    
});

server.listen(8080);