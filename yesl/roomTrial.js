var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname));

io.sockets.on('connection', function(clientSocket){

	var roomIdx = 1;

	clientSocket.on('joinRoom', function(){
		// 2번째 유저 들어옴
		// 방에는 1명 -> 째낌
		if(countPlayerInRoom('room' + roomIdx) >= 2) {
			roomIdx++;
			console.log('방이 다 차서, room' + roomIdx + '을 새로 생성합니다~!');
		}

		// 2번째 유저가 방에 들어옴.
		clientSocket.join('room' + roomIdx);
		
		// 방에는 2명의 유저 -> 들어감.
		clientSocket.emit('joinedRoom', 'room' + roomIdx + '에 입장!');
		clientSocket.broadcast.to('room' + roomIdx).emit('joinedRoom', 'Someone is here');
		if(countPlayerInRoom('room' + roomIdx) >= 2) {
			startGame('room' + roomIdx);
		}
		
	});

	clientSocket.on('input', function gameLogic(num){

		switch(turn){
			case 1:
				firstPlayer.inputNum= parseInt(num);
				//inputType.value ="";

				//checkInput
				if(firstPlayer.inputNum > firstPlayer.numOfToken){
					console.log("Invalid input. Please try again");
					break;
				}
				firstPlayer.numOfToken = firstPlayer.numOfToken - firstPlayer.inputNum;
				console.log("left amount: "+ firstPlayer.numOfToken);   
				after();
				break;

			case 2:
				// var input = document.getElementById('input');
				firstPlayer.otherPlayer.inputNum= parseInt(num);
				//inputType.value ="";
				//checkInput
				if(firstPlayer.otherPlayer.inputNum > firstPlayer.otherPlayer.numOfToken){
					console.log("Invalid input. Please try again");
					break;
				}
				firstPlayer.otherPlayer.numOfToken = firstPlayer.otherPlayer.numOfToken - firstPlayer.otherPlayer.inputNum;
				console.log("left amount: "+ firstPlayer.otherPlayer.numOfToken);  
				firstPlayer.otherPlayer.setColor();
				firstPlayer.otherPlayer.setGauge();
				firstPlayer.otherPlayer.showCandG();

				if(firstPlayer.inputNum > firstPlayer.otherPlayer.inputNum){
					console.log("winner is first player");
					firstPlayer.point++;
				}
				else if (firstPlayer.inputNum == firstPlayer.otherPlayer.inputNum){
					console.log("It's a tie!");
				}
				else{
					console.log("winner is second player");
					firstPlayer= firstPlayer.otherPlayer;
					firstPlayer.point++;
				}
				
				round++;
				
				if(round>10){
					console.log("end of game");
					if(player1.score> player2.score){
						console.log("player1 is winnner");
					}
					else 
						console.log("player2 is winner");
					break;
				}
				before();
				break;
		}

		//선공하기 전까지의 준비
		function before(){
			console.log("This round: " + round);
			console.log("Current score" + player1.point + " : " + player2.point);
			turn =1;
			console.log("선공은 " +firstPlayer.name);
			console.log("First player input your number");

		};

		//후공하기 전까지의 준비
		function after(){
			firstPlayer.setColor();
			firstPlayer.setGauge();
			firstPlayer.showCandG();
			turn=2;
			console.log("후공");
			console.log("Second player, input your number");
		};
});

});

function startGame(roomName) {
	//player들의 socket id가 key로 들어있는 object, value는 true/false...
	var room = io.sockets.adapter.rooms[roomName];

	io.sockets.in(roomName).emit('gameStatus', 'game start!');
	var random = Math.floor((Math.random() * 2)); // 0,1

	//room안에 있는 모든 player에게 각각 숫자를 하나씩 할당하고 그 사람에게 num과 함께 보내기


	var num1, num2;

	while(num1 === num2){
		num1 = Math.floor((Math.random() * 2)); // 0,1
		num2 = Math.floor((Math.random() * 2)); // 0,1
	}

	for(var player in room) {
		if(playerSocket1){
			var playerSocket2 = io.sockets.connected[player];
			gameSet(playerSocket2, num2);
		}
		else{
			var playerSocket1 = io.sockets.connected[player];
			gameSet(playerSocket1, num1);
		}
	}
}

function countPlayerInRoom(roomName){
	var count = 0;
	//room = 그 방에 있는 사람들의 소켓아이디를 key로 담고 있는 오브젝, value= true/false 
	var room = io.sockets.adapter.rooms[roomName];
	//player가 key값. room object안에 있는 key 갯수 세는 로직 
	for(var player in room){
		//그 오브젝 안에 값이 있을 때 true를 리턴 
		if (room.hasOwnProperty(player)) {
			++count;
		}
	}
	return count;
}

function gameSet(player, num){

	if (num==1){
		// console.log("you will start first");
		player.emit('gameStatus', "you will start first");
		// this = firstPlayer;
	}
	else{
		// console.log("you will start second");
		player.emit('gameStatus', "you will start second");
	}

	round = 1;
	turn = 1;

	player1 = {
		name: "최초 시작 사람",
		numOfToken:99,
		inputNum:0,
		point:0,
		color:"black",
		gauge:5,
		setColor : function(){
			if(player1.inputNum < 10){
				this.color="black";
			}
			else
				this.color="white";
			},

		setGauge : function(){
			
			if(player1.numOfToken>79){
				this.gauge=5;
				return;
			}
			else if(player1.numOfToken>59){
				this.gauge=4;
				return;
			}
			else if(player1.numOfToken>39){
				this.gauge=3;
				return;
			}
			else if(player1.numOfToken>19){
				this.gauge=2;
				return;
			}
			else{
				this.gauge=1;
				return;
			}
		},

		showCandG : function(){
				console.log(this.color);
				console.log(this.gauge);
		}
	}


	player2 ={
		name: "최초 시작 때 두번째로 한 사람",
		numOfToken:99,
		inputNum:0,
		point:0,
		color:"black",
		gauge:5,
		setColor : function(){
			if(player2.inputNum < 10){
				this.color="black";
			}
			else
				this.color="white";
		},

		setGauge : function(){
			
			if(player2.numOfToken>79){
				this.gauge=5;
				return;
			}
			else if(player2.numOfToken>59){
				this.gauge=4;
				return;
			}
			else if(player2.numOfToken>39){
				this.gauge=3;
				return;
			}
			else if(player2.numOfToken>19){
				this.gauge=2;
				return;
			}
			else{
				this.gauge=1;
				return;
			}
		},

		showCandG : function(){
				console.log(this.color);
				console.log(this.gauge);
		}
	}

	firstPlayer = player1;

	player1.otherPlayer = player2;
	player2.otherPlayer = player1;
}
