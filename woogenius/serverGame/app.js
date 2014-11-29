var path = require('path');
var session = require('express-session');
var express = require('express');
var game = require('./game/new BNW2.js');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// routing
app.use(express.static(path.join(__dirname, 'public')));

var gameResources = {
	INIT_TIME : 120,
	MAX_ROOM_NUM : 20,
	isFirstPlayer : true,
	tempRoom : null,
	rooms : [],
	initRooms : function () {
		for (var i = 0; i < this.MAX_ROOM_NUM; i++) {
			this.rooms.push({roomName : 'room'+ (i+1)});
		};
	}
}

gameResources.initRooms();

io.on('connection', function (socket) {
	socket.on('inputPlayerName', function(playerName) {
		if(gameResources.isFirstPlayer === true){
			socket.room = gameResources.rooms.pop();
			socket.room.game = game.initialize();
			socket.player = socket.room.game.player1;
			socket.player.name = playerName;
			socket.player.socketId = socket.id;

			tempRoom = socket.room;
			socket.join(socket.room.roomName);

			console.log(playerName + " join " + socket.room.roomName);

			socket.emit('waitForPlayer2');

			gameResources.isFirstPlayer = false;
		} else {
			socket.room = tempRoom;
			socket.player = socket.room.game.player2;
			socket.player.name = playerName;
			socket.player.socketId = socket.id;

			socket.join(socket.room.roomName);

			socket.broadcast.to(socket.room.roomName).emit('player2Connected');

			console.log(playerName + " join " + socket.room.roomName);

			gameResources.isFirstPlayer = true;
		}
	});

	socket.on('sendStart', function () {
		var game = socket.room.game;
		var firstPlayer = game.getFirstPlayer();

		io.to(firstPlayer.socketId).emit('firstPlayerSetting');
		io.to(firstPlayer.otherPlayer.socketId).emit('lastPlayerSetting');

		socket.room.presentPlayer = firstPlayer;
		socket.room.remaingTime = gameResources.INIT_TIME;
		socket.room.timer = setInterval(function(){
			io.to(firstPlayer.socketId).emit('setRemainingTime', socket.room.remaingTime);
			socket.room.remaingTime--;
		}, 1000);

		io.sockets.in(socket.room.roomName).emit('gameStart', game.player1.name, game.player2.name);
	});

	socket.on('inputPoint', function (point) {
		var game = socket.room.game;

		console.log(socket.player.name + " input " + point);

		if (game.inputPoint(socket.player, point)) {
			clearInterval(socket.room.timer);
			socket.emit('updatePointAndBlockPointInput', socket.player.point);

			if (game.isFirstPlayer(socket.player)) {
				// 후공으로 턴넘기기
				var lastPlayer = socket.player.otherPlayer;
				socket.room.presentPlayer = lastPlayer;
				io.to(lastPlayer.socketId).emit('activatePointInput');
				socket.room.remaingTime = gameResources.INIT_TIME;
				socket.room.timer = setInterval(function(){
					io.to(socket.room.presentPlayer.socketId).emit('setRemainingTime', socket.room.remaingTime);
					socket.room.remaingTime--;
				}, 1000);
				
			} else{
				// 승부를 가리고 라운드 넘기기
			};

		} else {
			socket.emit('invalidPointInput');
		};

	});

	socket.on('disconnect', function () {
		if(socket.room) {
			socket.leave(socket.room.roomName);
		}
	});

});


http.listen(3000, function () {
	console.log('Express server listening on port 3000');
});
