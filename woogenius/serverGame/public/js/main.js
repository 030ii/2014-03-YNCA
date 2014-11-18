var socket = io();

socket.on('connect', function(){
	socket.emit('adduser', prompt("What's your name?"));
});

socket.on('updatechat', function (roomName) {
	console.log('you join ' + roomName);
});

socket.on('counterDisconnected', function(){
	console.log('상대방이 채팅방을 나갔습니다. 연결이 끊어집니다.');
});