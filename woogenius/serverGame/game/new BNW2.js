var BNW2game = function (player1, player2) {
	this.static = {
		TOTAL_ROUND : 9,
		INIT_POINT : 99,
		INIT_SCORE : 0,
		DRAW_ROUND : 3,
		DRAW_POINT : 33
	};
	this.info = {
		round : 1,
		drawRound : 0,
		player1Gauge : 5,
		player2Gauge : 5
	};

	this.getFirstPlayer = function () {
		// 첫 라운드
		if (this.info.round == 1) {
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

		return this.firstPlayer;
	}

	this.isFirstPlayer = function (player) {
		if (this.firstPlayer === player) {
			return true;
		} else{
			return false;
		};
	}

	this.setWinner = function () {
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
		this.info.drawRound ++;
	}

		// 사용포인트 초기화
		this.player1.usingPoint = null;
		this.player2.usingPoint = null;
	}

	// 게임이 끝났으면 위너를 넘기고, 비겼으면 "Draw"를, 안끝났으면 null을 넘김.
	this.isOver = function () {
		var winScore = parseInt((this.TOTAL_ROUND - this.info.drawRound)/2) + 1;
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
	}

	// 플레이어의 점수 정보를 넘김 	
	this.getPlayerInfomation = function (player) {
		var info = {};
		// 제시한 포인트가 있을때 흑, 백 정보를 포함해서 리턴
		if (player.usingPoint === parseInt(player.usingPoint, 10)) {
			info.color = this.getBlackOrWhite(player.usingPoint);
		}

		info.pointRange = this.getPointRange(player.point);

		return info;
	}

	// 포인트를 입력하고 유효한 숫자이면 집어넣고 true 리턴, 아니면 false 리턴
	this.inputPoint = function (player, point) {
		if (player.point - point < 0) {
			return false;
		} else{
			player.usingPoint = parseInt(point);
			player.point -= point;
			return true;
		}
	}
	
	var getBlackOrWhite = function (point) {
		if (point > 9) {
			return "White";
		} else {
			return "Black";
		}
	}

	var getPointRange = function (point) {
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
	}
}

exports.initialize = function () {
	var newGame = new BNW2game();
	newGame.player1 = {
		point : newGame.static.INIT_POINT,
		score : newGame.static.INIT_SCORE,
		prevColor : [],
		usingPoint : null
	};
	newGame.player2 = {
		point : newGame.static.INIT_POINT,
		score : newGame.static.INIT_SCORE,
		prevColor : [],
		usingPoint : null
	};

	newGame.player1.otherPlayer = newGame.player2;
	newGame.player2.otherPlayer = newGame.player1;

	return newGame;
}