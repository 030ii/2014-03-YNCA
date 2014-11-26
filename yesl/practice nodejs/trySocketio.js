var socketio = require('socket.io');
var fs = require('fs');
var app = require('express')();
var jade = require('jade');

var server = app.listen(8888, function(){
	console.log("server ON!");
	fs.readFile("HTMLpage.jade", function(err, data){
	var fn = jade.compile(data);

	response.writeHead(200, ){"Content-Type": "text/html"};
	response.end(fn());
	});
});

var io = socketio.listen(server);
io.sockets.on('connection', function(socket){

});