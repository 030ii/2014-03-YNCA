var socket = io();

socket.on('connect', function(){
	socket.emit('inputPlayerName', 'asdf');
});

socket.on('gameStart', function(){
	console.log(arguments);
});

socket.on('counterDisconnected', function(){
	console.log('상대방이 채팅방을 나갔습니다. 연결이 끊어집니다.');
});
