var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);

// app.listen('3000', function(){
// 	console.log("Listening on 3000");
// });

// app.get('/', function(req, res){
//  // fs.readFile('gameui.html', function(err, data){
// 	//  res.writeHead(200, {'Content-Type':'text/html'});
// 	//  res.end(data);
// 	//  });
//  	res.sendFile(__dirname + '/gameui.html');
// });

app.use(express.static(__dirname));

var socketid = null;

io.sockets.on('connection', function(clientSocket){
	
	if (!socketid) {
		socketid = clientSocket.id;
	}
	
	clientSocket.on('roomJoin', function(){

		console.log(socketid);

		if(socketid){
		io.socket.join('room1');
		console.log('room1');	
		}
		//두명이면은 어떻게??
		else{
		io.socket.join('room2');
		console.log("room2");
		}
	});

	clientSocket.on('sendNum', function(num){
		var data = 100-num;
		//남의 게에지와 색 조정.
	});
});


