var http = require('http');
fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode){
	if (!responseCode) responseCode = 200;
	fs.readFile(__dirname+path,function(err,data){
		if(err){
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end('500 error');
		}else{
			res.writeHead(responseCode, {'Content-Type':contentType});
			res.end(data);
		}
	});
}

http.createServer(function (req, res) {
	//normalize url by removing querystring, optional trailing slash, and make it lowercase
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	switch(path){
		case '':
			serveStaticFile(res, '/public/home.html', 'text/html');
			break;
		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');
			break;
		case '/img/logo.png':
			serveStaticFile(res, '/public/img/logo.png');
			break;
		default:
			serveStaticFile(res, '/public/404.html', 'text/html', 404);
			break;
	}
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');