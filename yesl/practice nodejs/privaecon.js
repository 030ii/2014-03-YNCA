var id = 0;
var app = require('express')();
var server = require('http').createServer(app).listen(8000);
var io = require('socket.io').listen(server);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/trysioapp_practice.html");
});

io.sockets.on('connection', function(clientSocket){
	// console.log(clientSocket.id);
	id = clientSocket.id;

	//server socket인 sockets가 연결되어 있고,

	//clientSocket에서 보내는 것 받아서,(.on 받을 준비가 된..)
	//clientㅉ뽁에서는 이렇게 써있음. socket.emit('rint',"문자열");
	clientSocket.on('rint', function(data){
		io.sockets.connected[id].emit('smart', data);

		//client쪽에서는 smart받을 준비를 이렇게 함 
		//socket.on('smart', function(data){
		//	data 갖고 처리할 로직..});
		// clientSocket.broadcast.emit('smart', data);
	});
});
 