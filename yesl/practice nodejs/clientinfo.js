var fs = require('fs');
var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(8000, function(){
	console.log("Sever is running");
});

server.on('request', function(request, response){
	fs.readFile("HTMLPage.html", "utf8", function(error, data){
		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(data);
	});
});

io.sockets.on('connection', function(socket){
	//setname event 발생할 때
	socket.on('setname', function(data){
		socket.$$my = {};
		socket.$$my.name = data;
	});
	//getname event 발생할 때
	socket.on('getname', function(){
		//!!!!!!!여기서의 name?? var name과 다른 name?
		socket.emit('responsename', socket.$$my.name);
	});
});