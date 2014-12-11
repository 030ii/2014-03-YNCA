var path = require('path');
var session = require('express-session');
var express = require('express');
var game = require('./game/new BNW2.js');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(path.join(__dirname, 'public')));

// 게임의 기본적인 부분들 (겜방의 최대개수 / 첫입장자 판별 변수 / 일시저장 룸 / 겜방배열 / initRoom 함수)
var gameBasisItem = {
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

// 겜방 init 함수를 실행
gameBasisItem.initRooms();

// 커넥되면 실행할 부분
io.on('connection', function (socket) {

	// 이름을 입력받으면 실행하는 함수
	socket.on('inputPlayerName', function(playerName) {

		// 첫번째 입장자이면 실행할 부분
		if(gameBasisItem.isFirstPlayer === true)
		{
			socket.room = gameBasisItem.rooms.pop();
			socket.room.game = game.initialize();
			socket.room.game.player1.name = playerName;
			tempRoom = socket.room;
			socket.join(socket.room);
			console.log("p1 join room" + socket.room.roomName);
			gameBasisItem.isFirstPlayer = false;
		}

		// 두번째 입장자이면 실행할 부분
		else
		{
			socket.room = tempRoom;
			socket.player = socket.room.game.player2;
			socket.room.game.player2.name = playerName;
			socket.player.socketId = socket.id;
			socket.join(socket.room);
			socket.broadcast.to(socket.room).emit('gameStart', socket.room.game.player1.name, socket.room.game.player2.name);
			console.log("p2 join room" + socket.room.roomName);
			gameBasisItem.isFirstPlayer = true;
		}
	});

	// 게임 스타트 부분
	socket.on('sendStart', function () {
		var game = socket.room.game;
		var firstPlayer = game. getFirstPlayerAtFirstTime();

		io.sockets.in(socket.room.roomName).emit('gameStart', game.getGameInfoForInit());

		io.to(game.player1.socketId).emit('myName', '.player1Name', game.player1.name);
		io.to(game.player2.socketId).emit('myName', '.player2Name', game.player2.name);

		gc.settingFirAttack(firstPlayer);

		game.presentPlayer = firstPlayer;
	});

	socket.on('insertPoint', function (point) {
		var game = socket.room.game;

		if(socket.player !== game.presentPlayer){
			return;
		}

		if(!game.isValidPoint(socket.player, point)){
			socket.emit('incorrectPoint');
			return;
		}

		game.insertPoint(socket.player, point);

		io.to(socket.player.enemy.socketId).emit('setEnemyInfo', game.getPlayerInfo(socket.player));

		socket.emit('resetPoint', socket.player.point);

		if (game.isFirstPlayer(socket.player)) {
			var secondPlayer = socket.player.enemy;
			changeDOM.settingSecAttack(secondPlayer);

			game.presentPlayer = secondPlayer;
		}
		else {
			var roundWinner = game.getWinner();
			var isGameOver = game.isGameOver();

			if(!isGameOver) {
				changeDOM.afterTheRound(roundWinner, game.info.round);
				game.info.round += 1;
				changeDOM.waitingTimeBeforeRound(game.getRoundInfo(), game);
			}
			else if( isGameOver === 'Draw') {
				io.sockets.in(socket.room.roomName).emit('gameOverDraw');
				game.settingDrawGame();
				var firstPlayer = game.settingFirAttack();

				setTimeout(function () {
					io.sockets.in(socket.room.roomName).emit('gameStart', game.getGameInfoForInit());
					changeDOM.settingFirAttack(firstPlayer);
					game.presentPlayer = firstPlayer;
				}, 3000);
			}
			else {
				io.to(isGameOver.socketId).emit('finalWinner', isGameOver.name);
				io.to(isGameOver.enemy.socketId).emit('finalLoser', isGameOver.enemy.name);
			}
		}
	});
	
	// 메세지
	socket.on('insertMessage', function (message) {
		io.sockets.in(socket.room.roomName).emit('resetChatRoom', socket.player.name, message);
	});

	// 한명이 서버를 나가면 실행할 부분
	socket.on('disconnect', function () {
		if(socket.room != NULL){
			if(io.sockets.adapter.rooms[socket.room.roomName] != NULL){
				var newRoom = {
					roomName : socket.room.roomName
				};
				socket.broadcast.to(socket.room.roomName).emit('Disconnected');
				gameBasisItem.rooms.push(newRoom);
				socket.leave(socket.room.roomName);
				console.log("Current Room Number : " + gameResources.rooms.length);
			}

			delete socket.room;
		}
	});

	// 클라 돔 수정 부분
	var changeDOM = {

		// 선공만 포인트를 입력할 수 있게하는 부분
		settingFirAttack : function (firstPlayer){
			io.to(firstPlayer.socketId).emit('firstPlayerSet');
			io.to(firstPlayer.socketId).emit('notiPopup', 'It`s Your Turn. Insert the Point Please.');
			io.to(firstPlayer.enemy.socketId).emit('SecondPlayerSet');
		},

		// 후공이 포인트를 입력할 수 있게하는 부분
		settingSecAttack : function (secondPlayer){
			io.to(secondPlayer.socketId).emit('notiPopup', 'It`s Your Turn. Insert the Point Please.');
			io.to(secondPlayer.socketId).emit('insertPointStart');
		},

		// 각 라운드가 끝내면 정보를 보내주는 부분
		afterTheRound : function (roundWinner, roundNum) {
			if(roundWinner != NULL)
			{
				io.to(roundWinner.socketId).emit('showRoundInfoPopup', round, '승');
				io.to(roundWinner.enemy.socketId).emit('showRoundInfoPopup', round, '패');
			}
			else
			{
				io.sockets.in(socket.room.roomName).emit('showRoundInfoPopup', round, '비김');
			}
		},

		// 라운드 진행 전에, 2초 인터발
		waitingTimeBeforeRound : function (roundInfo, game) {
			setTimeout(function () {
				io.sockets.in(socket.room.roomName).emit('goingRound', roundInfo);
				var firstPlayer = game.getFirstPlayer();
				this.settingFirAttack(firstPlayer);
				game.presentPlayer = firstPlayer;
			}.bind(this), 2000);
		}
	}
});

http.listen(3000, function () {
	console.log('Express server listening on port 3000');
});