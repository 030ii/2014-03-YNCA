var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// routing
app.use(express.static(__dirname));


var Setup = {
	init: function(){
		this.rooms = [];

		for (var room = 1; room <= 20; room++){
			this.rooms.push('room' + room);
		}

		this.roomName = rooms.pop();
		this.tempGameStatus;
	}
}

Setup.init();

io.on('connection', function (socket) {
	socket.emit('welcome', 'chang');

	socket.on('enter',function(){
		
		socket.join(roomName);

		var numOfPlayer = Object.size(io.sockets.adapter.rooms[roomName]);
		console.log(numOfPlayer);
		
		// socket.player = new player();

		if(numOfPlayer == 2){
			socket.player.order = 2;  	// 두번째 들어온 사람
			console.log(roomName);
			socket.gameStatus = tempGameStatus;	// 두 명이 공유하는 변수
			gameStart();
			roomName = rooms.pop();		
		}
		else{
			socket.player.order = 1; 	// 첫번째 들어온 사람
			socket.gameStatus = new gameStatus();
			tempGameStatus = socket.gameStatus;
		}
	});


	function gameStart(){
		io.sockets.in(roomName).emit('gameMsg',"game이 시작되었습니다");

		socket.gameStatus.turn = 1;
		io.to().emit('gameMsg',"당신이 선공입니다. 숫자를 입력해주세요.");
		}
	};

	socket.on('input', function(inputNum){

		// 입력받은 숫자를 받고, 각 플레이어 inputNumber로 저장
		// 0~99 사이인지 에러 체크(에러면 다시 input받기)
		// 점수 게이지 바꾸기
		// 색깔이랑 점수판 조정 후 보여주기

		if(playerOrder === 1){
			socket.emit('gameMsg',"player1 input 받음");

			// 숫자가 잘못 입력되었을 경우
			if(inputNum < 0 || inputNum > 99){
				socket.emit('gameMsg',"잘못입력하셨습니다. 다시 입력해 주세요.");
			}
			else{
				// 정상 입력 시, 숫자 저장
				//socket.player1Point = inputNum;
				socket.emit('gameMsg',"정상적으로 입력되었습니다.");
			}

		}	
		else {
			socket.emit('gameMsg',"player2 input 완료");
		}	
	});

});


// var player = function(name){
// 	this.name = name;
// };

// var gameStatus = function(){
// 	this.player1 = new player();
// 	this.player2 = new player();
// };


function Player(name){
	this.name = name;
};

function GameStatus(){
	this.player1 = new Player();
	this.player2 = new Player();
	// this.playerList = [];
	// this.addPlayer = function(player){
	// 	this.playerList.push(player);
	// }
};



function objectSize(obj){
	var count = 0;
	for (var i in obj){
		count++;
	}
	return count;
};





http.listen(1234);