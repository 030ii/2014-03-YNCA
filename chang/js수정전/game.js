var mode = 0;
var target = document.getElementById("startButton");

target.addEventListener("click", function(){

	game.initialize(); 	// 플레이어 2명 만들기 및 게임 초기화

	var Ele = document.getElementById("input");
	Ele.addEventListener("click", function(){

		if ( mode % 2 === 0) { // 선공
			console.log("   = " + game.firstPlayer.name + "님의 결과는");
			game.inputNum(game.firstPlayer);
			game.calculate(game.firstPlayer);

			console.log(game.secondPlayer.name + "님 숫자를 입력해주세요.");	// 후공 안내 메세지

			mode++;
		}

		else {	// 후공
			console.log("   = " + game.secondPlayer.name + "님의 결과는");
			game.inputNum(game.secondPlayer);
			game.calculate(game.secondPlayer);

			mode++;

			/* 라운드별 승자 알림 */
			var resultRound;
			resultRound = game.whoIsWinner(game.player1, game.player2);
			console.log("===" + game.round + "라운드 결과");
			console.log("===이번 라운드 승자는 " + resultRound.name + "입니다.");
			console.log("===[score] player1 : " + game.player1.score + "점 / player2 : " + game.player2.score + "점");

			/* 최종 승자 알림 */
			if (game.player1.score >= 5 || game.player2.score >= 5 || game.round >= 9){
				var resultFinal;
				resultFinal = game.whoIsFinalWinner(game.player1, game.player2);
				console.log("[라운드 종료]");
				console.log("최종 승자는" + resultFinal.name + "입니다.");
				game.gameOver();
			}

			else {
				game.printRound();	// 다음 라운드로
			}	
		}
	},false);
},false);
		

		// 비길경우 (3라운드 보너스)
		// 예외 처리
		//    (0미만, 99이상 쓸경우. 
		//     남아있는 수 보다 높은 수를 입력한 경우.)
