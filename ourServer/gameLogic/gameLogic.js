var STATIC = {
  INIT_POINT : 99,
  DRAW_POINT : 33,
  INIT_SCORE : 0,
  TOTAL_ROUND : 9,
  DRAW_ROUND : 3,
  START_ROUND : 1,
  GAUGE_5 : 5,
  GAUGE_4 : 4,
  GAUGE_3 : 3,
  GAUGE_2 : 2,
  GAUGE_1 : 1,
  COLOR_BLACK : 'B',
  COLOR_WHITE : 'W',
  GAME_IS_DRAW : 'D'
}

function Game (player1, player2) {
  var round = STATIC.START_ROUND;
  var TOTAL_ROUND = STATIC.TOTAL_ROUND;
  var roundWinner = null;
  var drawRound = 0;
  var firstPlayer;
  var currentPlayer;
  
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
      return STATIC.GAUGE_5;
    }
    else if(player.point >= 60){
      return STATIC.GAUGE_4;
    }
    else if (player.point >=40){
      return STATIC.GAUGE_3;
    }
    else if(player.point >=20){
      return STATIC.GAUGE_2;
    }
    else{
      return STATIC.GAUGE_1;
    }
  }

  function getColorFromPlayer(player) {
    if (player.inputPoint > 9) {
      return COLOR_WHITE;
    } else {
      return COLOR_BLACK;
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  this.getFirstPlayer = function () {
    if(round == STATIC.START_ROUND && !firstPlayer){
      var random = getRandomInt(1,2);
      if (random == 1) {
        firstPlayer = player1;
      } else {
        firstPlayer = player2;
      }
    }

    if (!firstPlayer) {
      console.log('No First Player Error');
      return;
    }

    currentPlayer = firstPlayer;

    return firstPlayer;
  }
  
//   Return Object Detail : {
//     status : Number,
//     inputResult : Object,
//     message : String
//   }
  this.inputPoint = function (player, point) {
    var returnObj = {};

    if (currentPlayer !== player) {
      returnObj.status = 401;
      returnObj.message = 'Invalid Player';

      return returnObj;
    }

    if (!isValidPoint(player, point)) {
      returnObj.status = 400;
      returnObj.message = 'Invalid Point';

      return returnObj;
    }

    var parsedPoint = parseInt(point, 10);
    player.inputPoint(parsedPoint);

    returnObj.status = 200;
    returnObj.message = 'Success';
    returnObj.inputResult = {
      round : round,
      remainingPoint : player.point,
      color : getColorFromPlayer(player),
      gauge : getGaugeFromPlayer(player);
    }

    return returnObj;
  }
  
  function isValidPoint (player, point) {
    var parsedPoint = parseInt(point, 10);
    return (point == parsedPoint && parsedPoint >= 0 && player.point - parsedPoint >= 0);
  }
  
  this.isFinished = function () {
    var winScore = parseInt((TOTAL_ROUND - drawRound)/2) + 1;
    if (player1.score == winScore) {
      return player1;
    } else if (this.player2.score == winScore) {
      return player2;
    } else if (round == TOTAL_ROUND) {
      if (player1.score > player2.score) {
        return player1;
      } else if (player1.score < player2.score) {
        return player2;
      } else {
        return STATIC.GAME_IS_DRAW;
      }
    }

    return null;
  }
  
  this.getRoundInfo = function () {
    var returnObj = {};

    if (!currentRoundIsFinished()) {
      returnObj.status = 400;
      returnObj.message = 'Current Round is not Finished';

      return returnObj;
    }

    finishRound();

    returnObj.status = 200;
    returnObj.message = 'Round ' + round + ' is Finished';
    returnObj.roundInfo  = {
      round : round,
      winner : roundWinner,
      p1Score : player1.score,
      p2Score : player2,score
    }

    return returnObj;
  }

  function currentRoundIsFinished () {
    return player1.inputPoint && player2.inputPoint;
  }

  function finishRound () {
    if (player1.inputPoint < player2.inputPoint) {
      roundWinner = player2;
      player2.score++;
    } else if (player1.inputPoint > player2.inputPoint) {
      roundWinner = player1;
      player1.score++;
    } else {
      roundWinner = null;
      drawRound++;
    }
  }

  this.proceedRound = function () {
    // 플레이어 인풋 포인트 초기화
    player1.inputPoint = null;
    player2.inputPoint = null;

    // 다음 선공 플레이어 세팅
    if (roundWinner) {
      firstPlayer = roundWinner;
    } else {
      firstPlayer = firstPlayer.opponent;
    }

    // 라운드 위너 초기화
    roundWinner = null;

    // 라운드 진행
    round++;

    return round;
  }
  
  this.over = function () {
    for (var attr in this) delete myObject[attr];
  }

  this.initializeDrawGame = function () {
    round = STATIC.START_ROUND;
    TOTAL_ROUND = STATIC.DRAW_ROUND;
    firstPlayer = null;
    roundWinner = null;
    drawRound = 0;
    player1.setScoreAndPoint(STATIC.INIT_SCORE, STATIC.DRAW_POINT);
    player2.setScoreAndPoint(STATIC.INIT_SCORE, STATIC.DRAW_POINT);
  }

  this.getOpponent = function (player) {
    if (player == player1) {
      return player2;
    } else{
      return player1;
    }
  }
}

// Player Object Detail : {
//    score : Number,
//    point : Number,
//    opponent : Player Object,
//    socketId : String(서버에서 직접입력)
// }
function Player (score, point) {
  var INIT_SCORE = score;
  var INIT_POINT = point;

  this.score = INIT_SCORE;
  this.point = INIT_POINT;
  this.inputPoint = null;
  
  this.setScoreAndPoint = function (score, point) {
    this.score = score;
    this.point = point;
  }
  
  this.inputPoint = function (inputPoint) {
      this.inputPoint = inputPoint;
      this.point = this.point - inputPoint;
  }
}

exports.initialize = function () {
  // init player
  var player1 = new Player(STATIC.INIT_SCORE, STATIC.INIT_POINT);
  var player2 = new Player(STATIC.INIT_SCORE, STATIC.INIT_POINT);
  
  return new Game(player1, player2);
}