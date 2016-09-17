/**
 * Defines a simple node JS server.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');

const PORT = 5858;

var server = http.createServer(function(request, response) {
    var filePath = './dist' + request.url;
    
    if (filePath == './dist/') {
        filePath = './dist/index.htm';
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.ts':
            contentType = 'text/typescript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
});