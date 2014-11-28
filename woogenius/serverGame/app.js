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
			socket.room.game.player1.name = playerName;

			tempRoom = socket.room;
			socket.join(socket.room);

			console.log("p1 join room" + socket.room.roomName);

			gameResources.isFirstPlayer = false;
		}
		else {
			socket.room = tempRoom;
			socket.room.game.player2.name = playerName;
			socket.join(socket.room);

			socket.broadcast.to(socket.room).emit('gameStart', socket.room.game.player1.name, socket.room.game.player2.name);

			console.log("p2 join room" + socket.room.roomName);

			gameResources.isFirstPlayer = true;
		}
	});


	socket.on('disconnect', function () {
		socket.leave(socket.room);

	});

});


http.listen(3000, function () {
	console.log('Express server listening on port 3000');
});
