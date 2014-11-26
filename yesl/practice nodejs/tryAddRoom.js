사람들이 들어오면 커넥션
2명이 들어오면 방 만들기
rooms안에 object push pop

socket.join하면 emit의 내용이 그 특정 상대한테만.
leave 

var express = require('express');
var app = express();
var http = require(http);
var server= http.createServer(app);
var io = require('socket.io').listen(server);

var rooms = [];
var room;
var i=1;

io.on('connection', function(socket){
	var isFirstPlayer = true;
	if(isFirstPlayer ===true){
		socket.join(rooms.push("room"+i));
		isFirstPlayer=false;
	}
	else{
		socket.join("room"+i);
		i++;
	}
	
});

var socket = io('mynamespace');

var nsp = io.of('/my-namespace');
nsp.on('connection', function(socket){
  console.log('someone connected'):
});
nsp.emit('hi', 'everyone!');

io.to('room1').emit('chatting창에 쓴 내용?'):
