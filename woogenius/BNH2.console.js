BNH2.consoleGame = function () {
	// progress : 	0 = Game Start
	// 				1 = Input Player1 Id
	// 				2 = Input Player2 Id
	// 				3 = 선공
	// 				4 = 후공
	// 				5 = 게임 끝
	// 입력 후 콘솔창에 출력하는 함수
	this.doSomething = function (progress, info) {
		switch (progress) {
		    case 0:
		    	start();
		        break;
		    case 1:
		    	inputPlayer2Id();
		        break;
		    case 2:
		    	firstStrike(info);
		        break;
		    case 3:
		    	lastStrike(info);
		        break;
		    case 4:
		    	printWinner();
		    	firstStrike(info);
		        break;
		    case 5:
		    	gameOver();
		        break;
		}
	}

	this.getInputContent = function () {
		var content = document.querySelector("#inputField").value;
		document.querySelector("#inputField").value = "";

		return content;
	}

	var start = function () {
		console.log("흑과백2 게임을 시작합니다.");
		console.log("Player 1 ID를 입력하세요.");
	}

	var inputPlayer2Id = function () {
		console.log("Player 2 ID를 입력하세요.");
	}

	var firstStrike = function (info) {
		var fp = BNH2.firstPlayer;
		var lp = BNH2.firstPlayer.otherPlayer;
		console.log("%c" + "스코어 : " + BNH2.player1.score + " : " + BNH2.player2.score , 'background: #222; color: #bada55');
		console.log("선공 : " + fp.id + " " + "후공 : " + lp.id);
		console.log("상대방 점수범위 : " + getPointRange(info.pointRange));
		console.log(fp.id + " 선공입니다. 포인트를 입력하세요. (남은포인트 : " + fp.point + ")");
	}

	var printWinner = function () {
		console.log("%c" + BNH2.winner.id + " 승리!", 'background: #222; color: #bada55');
	}

	var lastStrike = function (info) {
		var lp = BNH2.firstPlayer.otherPlayer;
		console.log("상대방 점수범위 : " + getPointRange(info.pointRange));
		console.log("상대방 색깔 : " + info.color);
		console.log(lp.id + " 후공입니다. 포인트를 입력하세요. (남은포인트 : " + lp.point + ")");
	}

	var gameOver = function () {
		console.log("게임 끝");
		console.log("승자는 " + BNH2.lastWinner.id + "입니다.");
	}

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
}
