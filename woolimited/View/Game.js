var BNH2 = {
  round : 1,
  prevDraw : 0,
  drawRound : 0,
  TOTAL_ROUND : 9,
  INIT_POINT : 99,
  INIT_SCORE : 0,

  // param method : 콘솔게임 함수나, 그래픽게임 함수를 넘김.
  start : function (method, totalRound, initPoint) {
    this.TOTAL_ROUND = totalRound || 9;
    this.INIT_POINT = initPoint || 99;
    this.progress = 0;
    this.initialize();

    this.method = new method();
    this.method.doSomething(this.progress);
    this.progress ++;
  },

  startDrawGame : function () {
    this.TOTAL_ROUND = 3;
    this.INIT_POINT = 33;

    this.initialize(this.player1.id, this.player2.id);

    this.setFirstPlayer();

    this.method.doSomething(6);
    this.progress = 3;
  },


  // 초기화
  initialize : function (player1Id, player2Id) {
    this.round = 1;
    this.prevDraw = 0;
    this.drawRound = 0;
    this.player1 = new this.generatePlayer(player1Id);
    this.player2 = new this.generatePlayer(player2Id);

    this.player1.otherPlayer = this.player2;
    this.player2.otherPlayer = this.player1;
  },
  generatePlayer : function (id) {
    this.id = id;
    this.point = BNH2.INIT_POINT;
    this.score = BNH2.INIT_SCORE;
    this.usingPoint = null;
  },
  // 첫 라운드면 랜덤으로 첫 플레이어 세팅, 첫 라운드가 아니면 이전의 승자를 첫 플레이어로 세팅하는 함수.
  setFirstPlayer : function () {
    // 첫 라운드
    if (this.round == 1) {
      var randomInt = (function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min
      })(1,2);

      if (randomInt == 1) {
        this.firstPlayer = this.player1;
      } else {
        this.firstPlayer = this.player2;
      }

    // 나머지 라운드
    } else {
      // 라운드가 진행하면 이전라운드 위너를 첫번째 플레이어로 세팅하고 초기화
      this.firstPlayer = this.winner;
    }
  },
  inputPoint : function (player, point) {
    player.usingPoint = parseInt(point);
    player.point -= point;

    if(point < 10){
      document.getElementById("scolor").style.background='black';
      //document.getElementById("colorname").value='흑';
    }
    else{
      document.getElementById("scolor").style.background='white';
      //document.getElementById("scolor").value='백';
      //document.getElementById("colorname").style.color='black';
    }

    if(player.id=='1'){
      switch(this.getPointRange(player.point)){
        case 4:
          document.getElementById("1").style.background='white';
          break;
        case 3:
          document.getElementById("2").style.background='white';
          break;
        case 2:
          document.getElementById("3").style.background='white';
          break;
        case 1:
          document.getElementById("4").style.background='white';
          break;
      }
    }
    if(player.id=='2'){
      switch(this.getPointRange(player.point)){
        case 4:
          document.getElementById("6").style.background='white';
          break;
        case 3:
          document.getElementById("7").style.background='white';
          break;
        case 2:
          document.getElementById("8").style.background='white';
          break;
        case 1:
          document.getElementById("9").style.background='white';
          break;
      }
    }
  },

  /*
  // 플레이어의 점수 정보를 넘김
  getPlayerInfomation : function (player) {
    var info = {};
    // 제시한 포인트가 있을때 흑, 백 정보를 포함해서 리턴
    if (player.usingPoint === parseInt(player.usingPoint, 10)) {
      info.color = this.getBlackOrWhite(player.usingPoint);
    }

    info.pointRange = this.getPointRange(player.point);

    return info;
  },
  */

  /*
  getBlackOrWhite : function (point) {
    if (point > 9) {
      return "White";
    } else {
      return "Black";
    }
  },
  */
  getPointRange : function (point) {
    if (point < 20) {
      return 1;	// 0 ~ 19
    } else if (point < 40) {
      return 2;	// 20 ~ 39
    } else if (point < 60) {
      return 3;	// 40 ~ 59
    } else if (point < 80) {
      return 4;	// 60 ~ 79
    } else {
      return 5;	// 80 ~ 99
    }
  },
  setWinner : function () {
    var firstPlayerPoint = this.firstPlayer.usingPoint;
    var lastPlayerPoint = this.firstPlayer.otherPlayer.usingPoint;

    // 승부가 났을때 위너를 세팅하고 스코어를 올림. 비길땐 안올림.
    if (firstPlayerPoint < lastPlayerPoint) {
      this.winner = this.firstPlayer.otherPlayer;
      this.winner.score++;
      this.prevDraw = 0;
    } else if (firstPlayerPoint > lastPlayerPoint) {
      this.winner = this.firstPlayer;
      this.winner.score++;
      this.prevDraw = 0;
    // 비기면 후공이 선공이 됨.
    } else {
      this.winner = this.firstPlayer.otherPlayer;
      this.prevDraw = 1;
      this.drawRound ++;
    }

    // 사용포인트 초기화
    this.player1.usingPoint = null;
    this.player2.usingPoint = null;
  },
  // 게임이 끝났으면 위너를 넘기고, 비겼으면 "Draw"를, 안끝났으면 null을 넘김.
  isOver : function () {
    var winScore = parseInt((this.TOTAL_ROUND - this.drawRound)/2) + 1;
    if (this.player1.score == winScore) {
      return this.player1;
    } else if (this.player2.score == winScore) {
      return this.player2;
    } else if (this.round == this.TOTAL_ROUND) {
      if (this.player1.score > this.player2.score) {
        return this.player1;
      } else if (this.player1.score < this.player2.score) {
        return this.player2;
      } else {
        return "Draw";
      }
    }

    return null;
  },
  // progress : 	0 = Game Start
  // 				1 = Input Player1 Name
  // 				2 = Input Player2 Name
  // 				3 = 선공
  // 				4 = 후공
  // 				5 = 게임 끝
  //				6 = 비김
  progress : 0,
  inputSomething : function () {
    var content = this.method.getInputContent();

    switch (this.progress) {
        case 1:
          //this.inputPlayer1Id(content);

          this.method.doSomething(this.progress);
          this.progress ++;
            break;
        case 2:
          this.inputPlayer2Id(content);
          this.method.doSomething(this.progress);
          this.progress ++;
            break;
        case 3:
          this.proceedRound(content);
            break;
        case 4:
          this.proceedRound(content);
            break;
    }
  },
  inputPlayer1Id : function (id) {
    //player1.id = '1';
    this.player1.id = id;
  },
  inputPlayer2Id : function (id) {
    this.player2.id = id;
    this.setFirstPlayer();
  },
  proceedRound : function (content) {
    // 선공
    if (this.progress == 3) {
      if (this.firstPlayer.point - content < 0) {
        this.method.retry();
      } else{
        this.inputPoint(this.firstPlayer, content);
        this.method.doSomething(this.progress);
        this.progress ++;
      };
    // 후공
    } else if (this.progress == 4) {
      if (this.firstPlayer.otherPlayer.point - content < 0) {
        this.method.retry();
      } else{
        this.inputPoint(this.firstPlayer.otherPlayer, content);
        this.setWinner();

        // 게임이 안 끝났으면
        if (!this.isOver()) {
          this.round ++;
          this.setFirstPlayer();
          this.method.doSomething(this.progress);
          this.progress --;
        // 게임이 비기거나 끝났으면
        } else {
          // 비기면
          if (this.isOver() == "Draw") {
            this.method.draw();
            this.startDrawGame();
          // 승부가 나면
          } else{
            this.progress ++;
            this.lastWinner = this.isOver();
            this.method.doSomething(this.progress);
          };
        };

      };
    }
  }
}

BNH2.consoleGame = function () {
  // progress : 	0 = Game Start
  // 				1 = Input Player1 Id
  // 				2 = Input Player2 Id
  // 				3 = 선공
  // 				4 = 후공
  // 				5 = 게임 끝
  //				6 = 비김
  // 입력 후 콘솔창에 출력하는 함수
  this.doSomething = function (progress) {
    switch (progress) {
        case 0:
          start();
            break;
        case 1:
          inputPlayer2Id();
            break;
        case 2:
          firstStrike();
            break;
        case 3:
          lastStrike();
            break;
        case 4:
          printWinner();
          firstStrike();
            break;
        case 5:
          gameOver();
            break;
        case 6:
          firstStrike();
            break;
    }
  }

  this.getInputContent = function () {
    var content = document.querySelector("#inputField").value;
    document.querySelector("#inputField").value = "";

    return content;
  }

  this.retry = function () {
    console.log("retry");
  }

  this.draw = function () {
    console.log("%c비겼습니다. 게임을 다시 시작합니다.", 'background: red; color: white');
  }

  var start = function () {
    //document.getElementById("1").style.background='white';
    document.getElementById("here").style.visibility="hidden";
    document.getElementById("timer").style.visibility="display";
    console.log("Let's start the game");
    console.log("Player 1 ID : ");
  }

  var inputPlayer2Id = function () {
    console.log("Player 2 ID : ");
  }

  var firstStrike = function () {
    var fp = BNH2.firstPlayer;
    var lp = BNH2.firstPlayer.otherPlayer;
    //var info = BNH2.getPlayerInfomation(lp);
    console.log("%c" +BNH2.round+ "Round" , 'background: blue; color: white');
    console.log("%c" + "Score " + BNH2.player1.score + " : " + BNH2.player2.score , 'background: #222; color: #bada55');
    console.log("Fir attck : " + fp.id + " " + "Sec attack : " + lp.id);
    //console.log("%c Adversary Scope: " + getPointRange(info.pointRange), 'color: blue');
    console.log(fp.id + " Your Turn. Insert the Point. ");
  }

  var printWinner = function () {
    if (BNH2.prevDraw) {
      console.log("%c비김!", 'background: #222; color: #bada55');
    } else{
      console.log("%c" + BNH2.winner.id + " Win!", 'background: #222; color: #bada55');
    };
  }

  var lastStrike = function () {
    var fp = BNH2.firstPlayer;
    var lp = BNH2.firstPlayer.otherPlayer;
    //var info = BNH2.getPlayerInfomation(fp);
    //console.log("%c Adversary Scope : " + getPointRange(info.pointRange), 'color: blue');
    //console.log("%c Adversary Color : " + info.color, 'color: blue');
    console.log(lp.id + " Your Turn. Insert the Point.");
  }

  var gameOver = function () {
    document.getElementById("here2").style.visibility='display';
    //console.log("%cGame OVER", 'background: red; color: white');
    console.log("%c" + "Score " + BNH2.player1.score + " : " + BNH2.player2.score , 'background: #222; color: #bada55');
    console.log("%cThe Winner is " + BNH2.lastWinner.id + " ! ", 'background: red; color: white');
  }

/*
  var getPointRange = function (num) {
    switch (num) {
        case 1:
          return "0 ~ 19";
            break;
        case 2:
          return "20 ~ 39";
            break;
        case 3:
          return "40 ~ 59";
            break;
        case 4:
          return "60 ~ 79";
            break;
        case 5:
          return "80 ~ 99";
          break;
    }
  }
  */
}
