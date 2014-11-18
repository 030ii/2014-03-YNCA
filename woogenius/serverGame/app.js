var path = require('path');
var session = require('express-session');
var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

var count = 0;
io.on('connection', function (socket) {
	socket.join('some room');

	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.on('chat message', function (name, msg) {
		io.emit('chat message', name, msg);
	});

	count++;

	io.emit('count', count);
});

http.listen(3000, function () {
	console.log('Express server listening on port 3000');
});