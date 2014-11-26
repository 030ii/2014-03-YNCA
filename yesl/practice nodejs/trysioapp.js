var express = require('express');
var app = express();
var http = require('http').createServer(app).listen(3000);
var serverSocket = require('socket.io').listen(http);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/trysioapp_practice.html");
});

serverSocket.on('connection', function(clientSocket) {
	//.on은 받는것. connection을 받는다, clientSocket이라는 인자와 함께 
	//whereas .emit은 보내는것. 
	clientSocket.on('CToServer', function(msg) {
		// console.log(msg);
		serverSocket.emit('SToClient', msg);
		//msg를 SToClient의 이름으로 보낸다.  
	});
});

