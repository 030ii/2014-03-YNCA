var path = require('path');
var session = require('express-session');
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

var gameItem = {
	isFirstPlayer : true,
	tempRoom : null,
	rooms : [],

	initRooms : function (){
		for(var i = 1; i <= 30; i++){
			this.rooms.push({roomName : 'room' + i});
		};
	}
}

gameItem.initRooms();

io.on('connection', function (socket) {

	console.log('connect');
	socket.emit('connect');

	/*
	이름이 입력되면 첫번째 입장자 두번째 입장자 구분해서 하나의 방에 넣어준다.
	*/
	socket.on('pName', function(pName){

		console.log('이름 입력받았어요 서버에서');

		if(gameItem.isFirstPlayer === true){
			socket.room = gameItem.rooms.pop();
			gameItem.tempRoom = socket.room;

			socket.room.player1Name = pName;
			socket.join(socket.room);
			console.log('you(p1) join this room : ' + socket.room.roomName);

			socket.emit('waitingP2');

			gameItem.isFirstPlayer = false;
		}

		else {
			socket.room = gameItem.tempRoom;

			socket.room.player2Name = pName;

			socket.join(socket.room);
			//socket.broadcast.to(socket.room.roomName).emit('p2Connect',socket.room.player1Name, socket.room.player2Name);

			console.log('you(p2) join this room : ' + socket.room.roomName);

			gameStart(socket.room.player1Name, socket.room.player2Name);

			gameItem.isFirstPlayer = true;
		}
	});

	/*
	2번째 플레이어까지 입장되었음을 확인하고 게임을 시작한다.
	*/

	var gameStart = function(p1Name, p2Name){
		console.log('게임이 시작됩니다.' + p1Name + ' vs ' + p2Name);
	};

});

http.listen(3000, function () {
	console.log('Express server listening on port 3000');
});
