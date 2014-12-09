var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname));

io.sockets.on('connection', function(clientSocket){

	var roomIdx = 1;

	clientSocket.on('joinRoom', function(){
		// 2번째 유저 들어옴
		// 방에는 1명 -> 째낌
		if(countPlayerInRoom('room' + roomIdx) >= 2) {
			roomIdx++;
			console.log('방이 다 차서, room' + roomIdx + '을 새로 생성합니다~!');
		}

		// 2번째 유저가 방에 들어옴.
		clientSocket.join('room' + roomIdx);
		
		// 방에는 2명의 유저 -> 들어감.
		clientSocket.emit('joinedRoom', 'room' + roomIdx + '에 입장!');
		clientSocket.broadcast.to('room' + roomIdx).emit('joinedRoom', 'Someone is here');
		if(countPlayerInRoom('room' + roomIdx) >= 2) {
			startGame('room' + roomIdx);
		}
		
	});

});

function startGame(roomName) {
	//player들의 socket id가 key로 들어있는 object, value는 true/false...
	var room = io.sockets.adapter.rooms[roomName];

	io.sockets.in(roomName).emit('gameStatus', 'game start!');
	var random = Math.floor((Math.random() * 2)); // 0, 1

	//room안에 있는 모든 player에게 각각 숫자를 하나씩 할당하고 그 사람에게만 emit
	for (var player in room) {
		var playerSocket = io.sockets.connected[player];
		playerSocket.emit('gameStart', random % 2 + 1);
		random++;
	}
}

function countPlayerInRoom(roomName){
	var count = 0;
	//room = 그 방에 있는 사람들의 소켓아이디를 key로 담고 있는 오브젝, value= true/false 
	var room = io.sockets.adapter.rooms[roomName];
	//player가 key값. room object안에 있는 key 갯수 세는 로직 
	for(var player in room){
		//그 오브젝 안에 값이 있을 때 true를 리턴 
		if (room.hasOwnProperty(player)) {
			++count;
		}
	}

	return count;
}
