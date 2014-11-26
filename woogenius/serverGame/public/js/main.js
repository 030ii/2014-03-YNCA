var socket = io();

socket.on('connect', function(){
	// socket.emit('adduser', prompt("What's your name?"));
});

socket.on('updatechat', function (roomName) {
	console.log('you join ' + roomName);
});

socket.on('counterDisconnected', function(){
	console.log('상대방이 채팅방을 나갔습니다. 연결이 끊어집니다.');
});

var BNW2 = {
	changeRound : function (round) {
		var roundDiv = document.getElementsByClassName('round')[0];
		roundDiv.innerHTML = round;
	},
	changeScore : function (p1Score, p2Score) {
		var p1ScoreDiv = document.getElementsByClassName('score')[0];
		var p2ScoreDiv = document.getElementsByClassName('score')[1];

		p1ScoreDiv.innerHTML = p1Score;
		p2ScoreDiv.innerHTML = p2Score;
	},
	changeP1Name : function (p1Name) {
		var p1NameDiv = document.getElementsByClassName('player1Name')[0];
		p1NameDiv.innerHTML = p1Name;
	},
	changeP2Name : function (p2Name) {
		var p2NameDiv = document.getElementsByClassName('player2Name')[0];
		p2NameDiv.innerHTML = p2Name;
	},

}