var path = require('path');
var session = require('express-session');
var express = require('express');
var gameLibrary = require('./gameLogic.js');
var gameObject = gameLibrary.initialize();

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

var gameResource = {
  INIT_TIME : 60,
  MAX_ROOM_NUM : 20,
  isPlayer1 : true,
  tempRoom : null,
  rooms : [],
  
  initRooms : function () {
    for (var i = 1; i <= this.MAX_ROOM_NUM; i++) {
      this.rooms.push({roomName : 'room' + i});
    }
  }
};

gameResource.initRooms();

var tempSocketId;

io.on('connection', function (socket) {
  
  /* 플레이어 이름 입력받으면, 2명씩 방에 넣어주는 부분 - 예전 코드랑 똑같다 */
	socket.on('inputPlayerName', function(playerName){
    if(gameResource.isPlayer1 === true){
      socket.room = gameResource.rooms.pop();
      socket.player = gameObject.player1;
      socket.player.name = playerName;
      
      tempRoom = socket.room;
      socket.join(socket.room.roomName);
      
      console.log(playerName + 'join' + socket.room.roomName);
      
      socket.emit('gameMsg','Player 2 Waiting...');
      
      gameResource.isPlayer1 = false;
    }
    else {
      if(!io.sockets.adapter.rooms[tempRoom.roomName]) {
        gameResource.isPlayer1 = true;
        socekt.emit('gameMsg','counterDisconnected');
        return;
      }
      
      socket.room = tempRoom;
      socket.player = gameObject.player2;
      socket.player.name = playerName;
      socket.player.num = 2;
      
      gameObject.initializePlayerSocketId(tempSocketId, socket.id);
      socket.join(socket.room.roomName);
      
      socket.broadcast.to(socket.room.roomName).emit('gameMsg','player2 Connect');
      
      console.log(playerName + 'join' + socket.room.roomName);
      
      gameResource.isPlayer1 = true; 
    }
	});
  
  socket.on('sendStart', function() {
    var firstPlayer = gameObject.getFirstPlayer();

    /* 게임을 시작하는 곳 */
    io.sockets.in(socket.room.roomName).emit('gameStart', gameObject.start());

    /* 각 라운드의 선공과 후공을 세팅하는 곳 */
    settingFirstPlayer(firstPlayer);

  });
  
  socket.on('inputPoint', function (point) {
    
    var result = gameObject.inputPoint(socket.player, point);

    /*
    고칠부분 - 에러 따로따로 처리하기
    */
    if (result.status >= 400) {
      socket.emit('inputError');
      return;
    }
    
    /* 선공 플레이어 오브젝트를 gameObject 함수의 인자로 넘겨준다 */
    var inputResult = result.inputResult;
    
    /* 타이머를 멈춘다 */
    clearInterval(socket.room.timer);

    /* 전체 플레이어에게 현재 플레이어의 정보를 넘겨준다 */
    io.sockets.in(socket.room.roomName).emit('OpponentColorAndGauge', inputResult.color, inputResult.gauge);
    
    /*
    고칠부분 - 포인트 입력창 블록처리하도록 emit 추가
    */
    /* 포인트 게이지를 업데이트 / 포인트 입력창을 Block 처리한다 */
    socket.emit('updateRemainingPoint', inputResult.remainingPoint);
    socket.emit('BlockPointInput', socket.player.point);

    /* 포인트 입력 플레이어가 선공일 때 */
    var firstPlayer = gameObject.getFirstPlayer();
    if (socket.player == firstPlayer) {
      // 후공을 선정해주고, 후공을 세팅해주는 함수를 호출한다. -인자로 후공 플레이어를 넘겨준다.
      settingSecondPlayer(gameObject.getOpponent(firstPlayer));
    }
    else {  /* 포인트 입력 플레이어가 후공일 때 */
      // 게임이 안 끝났으면, 정보를 보낸다.
      
      /*
      고칠부분 - 에러, 위너 처리
      */
      var roundInfo = gameObject.getRoundInfo();

      // 게임이 끝났으면, 위너를 리턴한다.
      var isFinish = gameObject.isFinished();

      // 한 라운드가 끝났다면,

      /*
      고칠부분 - Proceed Round 사용하기
      */
      if (!isFinish){
        sendRoundResult(winner, gameObject.round++);

        wait2SecondsAndProceedRound(gameObject.getRoundInfo);
      // 비겼으면,
      } else if (isFinish == 'D') {
        io.sockets.in(socket.room.roomName).emit('gameMsg','Draw');
        gameObject.initializeDrawGame();

        /*
        고칠부분 - start로 리턴받은 오브젝트를 두 플레이어에게 보내줘서 새로 세팅
        */
        gameObject.start();

        var drawFirstPlayer = gameObject.getFirstPlayer();
        
        // 2초 후에 시작
        setTimeout(function() {
          io.sockets.in(socket.room.roomName).emit('Draw', gameObject.getRoundInfo());
          settingFirstPlayer(drawFirstPlayer);

        },2000);

      // 게임이 끝났다면,
      } else {
        io.to(isFinish.socketId).emit('gameMsg','Game Over! You win!');
        io.to(gameObject.getOpponent(isFinish).socketId).emit('gameMsg', 'Game Over! You lose!');
      }

    }
  });
  
  /* 추가시킨 부분 
  채팅 on
  */
  socket.on('inputMsg', function (msg) {
    io.sockets.in(socket.room.roomName).emit('updatechat', socket.player.num, msg);
  })

  /* 플레이어 중 한명이 서버를 나갈 시에 수행되는 부분 */
  socket.on('disconnect', function () {
    console.log('someone is disconnected.');
  });
  
  /* 선공 세팅 */
  /* sendStart 가 on 되고, 각 라운드의 선공/후공 세팅하는 부분에서,
  선공을 세팅하는 함수를 호출하면 실행되는 곳 */
  function settingFirstPlayer(firstPlayer) {
    io.to(firstPlayer.socketId).emit('firstPlayerSetting');
    io.to(firstPlayer.socketId).emit('gameMsg', 'It`s your turn. Input the Point.');
    
    io.sockets.in(socket.room.roomName).emit('setRemainingTime', gameResource.INIT_TIME);
    
    settingTimer(firstPlayer);
    
    io.to(gameObjcet.getOpponent(firstPlayer).socketId).emit('secondPlayerSetting');
    io.to(gameObjcet.getOpponent(firstPlayer).socketId).emit('gameMsg','You are second player');
 
  }

  /* 후공 세팅 */
  function settingSecondPlayer(secondPlayer) {
    io.to(secondPlayer.socketId).emit('gameMsg', 'It`s your turn. Input the Point.');
    io.to(secondPlayer.socketId).emit('deletedBlock');

    settingTimer(secondPlayer);
  }
  
  /* 라운드마다 각 플레이어의 타이머를 설정하는 함수 */
  function settingTimer(player){
    socket.room.remainingTime = gameResource.INIT_TIME;
    socket.room.timer = setInterval(function(){
      if(socket.room !== null) {
        clearInterval(socket.room.timer);
        return;
      }
      
      if(socket.room.remainingTime >= 0) {
        io.to(player.socketId).emit('setRemainigTime', socket.room.remainingTime);
      }
      else {
        io.to(player.socketId).emit('inputTimeout');
        clearInterval(socket.room.timer);
      }
      socket.room.remainingTime -= 1;
    }, 1000);
  }
  
  /* 라운드가 끝난 뒤, 라운드의 정보를 보내는 함수 */
  function sendRoundResult (winner, round){
    io.to(winner.socketId).emit('gameMsg','Round' + round + ' : You win!');
    io.to(gameObjcet.getOpponent(winner).socketId).emit('gameMsg','Round' + ' : You lose!');
  }

  /* 2초를 기다리고 라운드를 진행하는 함수 */
  function wait2SecondsAndProceedRound(roundInfo){
    setTimeout(function(){
      io.sockets.in(socket.room.roomName).emit('nextRound', roundInfo);

      var firstPlayer = gameObject.getFirstPlayer();
      settingFirstPlayer(firstPlayer);
    },2000);
  }
});

http.listen(3000, function () {
	console.log('Express server listening on port 3000');
});