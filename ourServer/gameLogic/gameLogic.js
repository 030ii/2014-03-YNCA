var STATIC = {
  INIT_POINT : 99,
  DRAW_POINT : 33,
  INIT_SCORE : 0,
  TOTAL_ROUND : 9,
  DRAW_ROUND : 3,
  START_ROUND : 1
}

function Game (player1, player2) {
  var round = START_ROUND;
  var TOTAL_ROUND = STATIC.TOTAL_ROUND;
  var roundWinner;
  var firstPlayer;
  
  this.initializePlayerSocketId = function (player1SocketId, player2SocketId) {
    player1.socketId = player1SocketId;
    player2.socketId = player2SocketId;
  }
  
  this.getPlayer1 = function () {
    return player1;
  }
  
  this.getPlayer2 = function () {
    return player2;
  }
  
  //   Return Object Detail : {
  //     round ; Number : 현재 라운드
  //     TOTAL_ROUND ; Number : 전체 라운드,
  //     p1Point ; Number : 플레이어 1 포인트,
  //     p2Point ; Number : 플레이어 2 포인트,
  //     p1Score ; Number : 플레이어 1 스코어,
  //     p2Score ; Number : 플레이어 2 스코어,
  //     p1Gauge ; 1 ~ 5 : 플레이어 1 포인트 게이지,
  //     p2Gauge ; 1 ~ 5 : 플레이어 2 포인트 게이지,
  //      // 1 : 0 ~ 19
  //      // 2 : 20 ~ 39
  //      // 3 : 40 ~ 59
  //      // 4 : 60 ~ 79
  //      // 5 : 80 ~ 99
  // }
  this.start = function () {
    return {
      round : round,
      TOTAL_ROUND : TOTAL_ROUND,
      p1Point : player1.point,
      p2Point : player2.point,
      p1Score : player1.score,
      p2Score : player2.score,
      p1Gauge : getGaugeFromPlayer(player1),
      p2Gauge : getGaugeFromPlayer(player2)
    }
  }

  function getGaugeFromPlayer(player) {
    if(player.point >= 80){
      return 5;
    }
    else if(player.point >= 60){
      return 4;
    }
    else if (player.point >=40){
      return 3;
    }
    else if(player.point >=20){
      return 2;
    }
    else{
      return 1;
    }
  }
  
  this.getFirstPlayer = function () {
    if( round == STATIC.START_ROUND){
      var random = (function getRandomInt(min, max) {
			  return Math.floor(Math.random() * (max - min + 1)) + min
			})(1,2);
      
      if(random==1) {
        firstPlayer = player1;
        
      }
      else {
        firstPlayer = player2;
      }
    }
    else{
      
    }
  }
  
//   Return Object Detail : {
//     status : Number,
//     inputResult : Object,
//     message : String
//   }
  this.inputPoint = function (player, point) {
    var returnObj = {};
    
    if (isValidPoint(player, point)) {
      var parsedPoint = parseInt(point, 10);
      player.inputPoint(parsedPoint);
      
    } else {
      
    }
    
    return returnObj;
  }
  
  function isValidPoint (player, point) {
    var parsedPoint = parseInt(point, 10);
		if(point == parsedPoint && parsedPoint >= 0 && player.point - parsedPoint >= 0) 
			return true;

		return false;
  }
  
  this.finishRound = function () {
    //이번 라운드에서 각 플레이어 마다 받은 포인트
    if(player1.inputPoint > player2.inputPoint){
      roundWinner = player1;
    }
    else if(player1.inputPoint==player2.inputPoint){
      return;
    }
    else{
      roundWinner = player2;
    }
    if (현 라운드 <9){
      proceedRound();
    }
  }
  
  this.isFinished = function () {
    
  }
  
  this.getRoundInfo = function () {
  
  }
  
  this.proceedRound = function () {

  }
  
  this.over = function () {
    
  }
}

// Player Object Detail : {
//    score : Number,
//    point : Number,
//    opponent : Player Object,
//    socketId : String(서버에서 직접입력)
// }
function Player (INIT_SCORE, INIT_POINT) {
  this.score = INIT_SCORE;
  this.point = INIT_POINT;
  this.inputPoint = null;
  
  this.initScore = function () {
    this.score = 0;
  }
  
  this.initPoint = function (INIT_POINT) {
    this.point = INIT_POINT;
  }
  
  this.inputPoint = function (inputPoint) {
    if(this.point - inputPoint >= 0) {
      this.inputPoint = inputPoint;
      return true;
    } else {
      return false;
    }
  }
}

exports.initialize = function () {
  // init player
  var player1 = new Player(STATIC.INIT_SCORE, STATIC.INIT_POINT);
  var player2 = new Player(STATIC.INIT_SCORE, STATIC.INIT_POINT);
  
  // opponent setting
  player1.opponent = player2;
  player2.opponent = player1;
  
  return new Game(player1, player2);
}