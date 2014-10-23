var BNH2 = {
	round : 1,
	TOTAL_ROUND : 9,
	INIT_POINT : 99,
	INIT_SCORE : 0,

	// param method : 콘솔게임 함수나, 그래픽게임 함수를 넘김.
	start : function (method, totalRound, initPoint) {
		this.TOTAL_ROUND = totalRound || 9;
		this.INIT_POINT = initPoint || 99;
		this.initialize();

		this.method = new method();
		this.method.doSomething(this.progress);
		this.progress ++;
	},
	// 초기화
	initialize : function (player1Id, player2Id) {
		this.round = 1;
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
		player.usingPoint = point;
		player.point -= point;
	},
	// 플레이어의 점수 정보를 넘김 	
	getPlayerInfomation : function (player) {
		var info = {};
		// 제시한 포인트가 있을때 흑, 백 정보를 포함해서 리턴
		if (player.usingPoint) {
			info.color = this.getBlackOrWhite(player.usingPoint);
		}

		info.pointRange = this.getPointRange(player.point);

		return info;
	},
	getBlackOrWhite : function (point) {
		if (point > 9) {
			return "White";
		} else {
			return "Black";
		}
	},
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
		} else if (firstPlayerPoint > lastPlayerPoint) {
			this.winner = this.firstPlayer;
			this.winner.score++;
		// 비기면 후공이 선공이 됨.
		} else {
			this.winner = this.firstPlayer.otherPlayer;
		}

		// 사용포인트 초기화
		this.player1.usingPoint = null;
		this.player2.usingPoint = null;
	},
	// 게임이 끝났으면 위너를 넘기고, 비겼으면 "Draw"를, 안끝났으면 null을 넘김.
	isOver : function () {
		var winScore = this.TOTAL_ROUND/2 + 0.5;
		if (this.player1.score == winScore) {
			return this.player1;
		} else if (this.player2.score == winScore) {
			return this.player2;
		} else if (this.round == this.TOTAL_ROUND) {
			if (this.player1.score > this.player2.score) {
				return this.player1;
			} else{
				return this.player2;
			}
			return "Draw";
		}

		return null;
	},
	// progress : 	0 = Game Start
	// 				1 = Input Player1 Name
	// 				2 = Input Player2 Name
	// 				3 = 선공
	// 				4 = 후공
	// 				5 = 게임 끝
	progress : 0,
	inputSomething : function () {
		var content = this.method.getInputContent();
		var playerInfo;

		switch (this.progress) {
		    case 1:
		    	this.inputPlayer1Id(content);
		    	this.method.doSomething(this.progress);
		    	this.progress ++;
		        break;
		    case 2:
		    	this.inputPlayer2Id(content);
		    	playerInfo = this.getPlayerInfomation(this.firstPlayer.otherPlayer);
		    	this.method.doSomething(this.progress, playerInfo);
		    	this.progress ++;
		        break;
		    case 3:
		    	this.proceedRound(content);
		    	playerInfo = this.getPlayerInfomation(this.firstPlayer);
				this.method.doSomething(this.progress, playerInfo);
		    	this.progress ++;
		        break;
		    case 4:
		    	this.proceedRound(content);
		    	playerInfo = this.getPlayerInfomation(this.firstPlayer);
				this.method.doSomething(this.progress, playerInfo);
		    	this.progress --;
		        break;
		}
	},
	inputPlayer1Id : function (id) {
		this.player1.id = id;
	},
	inputPlayer2Id : function (id) {
		this.player2.id = id;
		this.setFirstPlayer();
	},
	proceedRound : function (content) {
		// 선공
		if (this.progress == 3) {
			this.inputPoint(this.firstPlayer, content);
		// 후공
		} else if (this.progress == 4) {
			this.inputPoint(this.firstPlayer.otherPlayer, content);
			this.setWinner();

			// 게임이 안 끝났으면
			if (!this.isOver()) {
				this.round ++;
				this.setFirstPlayer();
			// 게임이 비기거나 끝났으면
			} else {
				// 비기는거 아직 처리안함
				this.progress ++;
				this.lastWinner = this.isOver();
			};
		}
	}
}