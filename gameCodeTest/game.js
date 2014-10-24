
var target = document.getElementById("startButton");

target.addEventListener("click", function(){

	game.initialize(); // 플레이어 2명 만들기 및 게임 초기화

	for ( game.round = 1; game.round < 10; game.round++ ) {
		var result;

		if (game.player1.score == 5 || game.player2.score == 5){
			break;
		}

		game.setFirstPlayer();

		console.log("player1님 숫자를 입력해주세요.");
		game.inputNum(game.firstPlayer);
		game.calculate(game.firstPlayer);

		console.log("player2님 숫자를 입력해주세요.");
		game.inputNum(game.secondPlayer);
		game.calculate(game.secondPlayer);

		result = game.whoIsWinner(game.player1, game.player2);
		console.log("이번 라운드 승자는" + result + "입니다.");
	}
	game.whoIsFinalWinner(game.player1, game.player2);
	game.gameOver();
}, false);