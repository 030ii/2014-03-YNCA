var path = require('path');
var session = require('express-session');
var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// routing
app.use(express.static(path.join(__dirname, 'public')));

var MAX_ROOM_NUMBER = 20;
var rooms = [];

for (var i = 0; i < MAX_ROOM_NUMBER; i++) {
	rooms.push({roomName : 'room'+ (i+1),
		idStorage : [],
		player1 : {},
		player2 : {}
	});
};

var isFirstPlayer = true;
var firstRoom;
var tempRoom;

io.on('connection', function (socket) {
	
	socket.on('adduser', function(username){
		if(isFirstPlayer === true){
			socket.room = rooms.pop();
			tempRoom = socket.room;

			socket.room.idStorage[0] = socket.id;
			socket.room.player1.username = username;

			socket.join(socket.room);
			console.log('player1 you join' + socket.room.roomName);

			isFirstPlayer = false;
		}
		else {
			socket.room = tempRoom;
			socket.room.idStorage[1] = socket.id;
			socket.room.player2.username = username;

			socket.join(socket.room);
			console.log('player2 you join' + socket.room.roomName);
			isFirstPlayer = true;
		}
		socket.emit('updatechat', socket.room.roomName);
	});


	socket.on('disconnect', function () {
		if(socket.id === socket.room.idStorage[0]){
			io.to(socket.room.idStorage[1]).emit('counterDisconnected');
		}
		else{
			io.to(socket.room.idStorage[0]).emit('counterDisconnected');
		}

		console.log('user disconnected');
	});

	socket.on('chat message', function (name, msg) {
		io.emit('chat message', name, msg);
	});

});


http.listen(3000, function () {
	console.log('Express server listening on port 3000');
});
