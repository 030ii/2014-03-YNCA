var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);


app.get('/',function(req,res){
	res.sendFile(__dirname + '/trial.html');
});

var info = {};
var keys =[];
var isFirst=true;

io.sockets.on('connection', function(socket){
	info[socket.id]="";

	if(isFirst){
	isFirst=false;
	}
	
	else{
		for(var key in info){
		keys.push(key);
		}

		info[keys[0]]=keys[1];
		info[keys[1]]=keys[0];
	}
	//여기까지가 각자에게 서로의 아이디와 emit해야할 상대를 정해주는 것이었다...

	socket.on('some', function(msg){
		io.sockets.connected[info[socket.id]].emit('some', "something");
	});
});