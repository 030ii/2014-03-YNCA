// var mode = 0;
var EleBtnStart = document.getElementById("startButton");	// 게임 시작 버튼
var EleBtnInput = document.getElementById("input");				// 숫자 입력 버튼

/* 게임 시작 버튼을 누를 때 */
EleBtnStart.addEventListener("click", function(){
	game.initialize(); 	// 플레이어 2명 만들기 및 게임 초기화
	game.mode = 1;
},false);


/* 숫자 입력 버튼을 누를 때 */
EleBtnInput.addEventListener("click", function(){
	/*
	mode 0 = 게임 시작 전
	mode 1 = 선공 input
	mode 2 = 후공 input
	*/

	/* 선공 input */
	if ( game.mode === 1) {
		game.inputNum(game.firstPlayer);
	}

	/* 후공 input */
	if ( game.mode === 2 ) {
		game.inputNum(game.secondPlayer);
	}
},false);


		// 비길경우 (3라운드 보너스)
		// 예외 처리