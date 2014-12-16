var game = 
{
	mode : 0,
	round : 0,
	player1 : {},
	player2 : {},
	firstPlayer : {},
	secondPlayer : {},
	winner : {},
	loser : {},
	finalWinner : {},


	/* 플레이어 생성 및 초기화 함수 */
	 makePlayer : function(player){
 		player.inputNum = 0;
 		player.totalNum = 99;
 		player.score = 0;
 		player.name;
	 },

	/* 게임을 초기화하는 함수 
	 * 라운드 초기화, player1 & player2 객체 생성, 시작 메세지 출력
	 */
	initialize : function(){
		this.mode = 0;
		this.round = 0;
		this.makePlayer(this.player1);
		this.makePlayer(this.player2);

		this.player1.name = 'player1';
		this.player2.name = 'player2';
		//player1 = new player(),
		//player2 = new player();

		console.log("[Game Start]");

		this.printRound(); // round = 0인 상태
	},

	/* 라운드를 출력하는 함수
	 */
	printRound : function(){
		this.round += 1;
		console.log("************[" + this.round +"라운드]************");

		this.setFirstPlayer();
	},

	/* 먼저 시작하는 플레이어를 알려주는 함수
	 * 1 라운드에는 랜덤으로,
	 * 2~9 라운드에는 이전 승리자가 먼저 시작하는 플레이
	 */
	setFirstPlayer : function(){
		if (this.round == 1) {	// 1 라운드
			var random = Math.floor(Math.random() * 2);	// 0~1 랜덤

			if (random == 1){
				this.firstPlayer = this.player1;
				this.secondPlayer = this.player2;
				}
			else { // random == 0
				this.firstPlayer = this.player2;
				this.secondPlayer = this.player1;
			}
		}
		else {	// 2~9 라운드 
			this.firstPlayer = this.winner; // winner에는 이전 승리자가 저장되어 있으므
			this.secondPlayer = this.loser;	
		}

		console.log(this.firstPlayer.name + "님 숫자를 입력해주세요.");	// 선공
	},

	/* 숫자 입력받는 함수 */
	inputNum : function(player){
		// var Ele = document.getElementById("input");
		// Ele.addEventListener("click",function(){
			var content = document.querySelector("#inputField").value;
			document.querySelector("#inputField").value = "";

			console.log("~~~~~~~~~~~~~~~~~~~inputNum 함수 왔음~~~~~~~~~~~~~~~");

			player.inputNum = content;
		//},false);
			this.errorCheckInputNum(player);
	},

	/* 입력한 숫자 에러 체크 함수 
	 */
	errorCheckInputNum : function(player){
		if (player.inputNum < 0 || player.inputNum > 99){
			console.log(player.name + "님 숫자를 잘못입력했습니다. 다시 입력해주세요.");
			this.inputNum(player);
		}

		else if (player.inputNum > player.totalNum){
			console.log(player.name + "님 남아있는 수보다 높은 수를 입력했습니다. 다시 입력해주세요.");
			console.log("남은 수 : " + player.totalNum);
			this.inputNum(player);
		}

		else {	// 정상적인 input
			this.calculate(player);
		}
	},
	
	/* 점수를 계산하고 처리하는 함수
	 * totalNum 계산
	 * Black & White 계산 후 보여주기
	 * 점수표시등 계산 후 보여주기
	 */
	calculate : function(player){
		if( this.mode === 1 ){	// 선공
			console.log("   = " + this.firstPlayer.name + "님의 결과는");

			player.totalNum -= player.inputNum;
			console.log(this.isColor(player.inputNum));
			this.scoreBoard(player.totalNum);

			this.secondSet();
		}

		if( this.mode === 2 ){	// 후공
			console.log("   = " + this.secondPlayer.name + "님의 결과는");
			
			player.totalNum -= player.inputNum;
			console.log(this.isColor(player.inputNum));
			this.scoreBoard(player.totalNum);

		//	this.mode++;
			this.resultRound(this.player1, this.player2);
		}
	},

	/* 흑과 백을 알려주는 함수
	 * input : inputNum(입력된 값) 
	 * output : 흑 혹은 백
	 */
	isColor : function(inputNum) {
		if (inputNum < 10)	
			return "     Black";
		else	
			return "     White";
	},

	/* 남아있는 점수 구역을 보여주는 함수
	 * input : totalNum
	 * output : 1~5 구역
	 */
	 scoreBoard : function(totalNum) {
	 	if (totalNum >= 80)
	 		console.log("     숫자 범위는 80 ~ 99 입니다.");
	 		//return 5;
	 	else if (totalNum >= 60)
	 		console.log("     숫자 범위는 60 ~ 79 입니다.");
	 		//return 4;
	 	else if (totalNum >= 40)
			console.log("     숫자 범위는 40 ~ 59 입니다.");
	 		//return 3;
	 	else if (totalNum >= 20)
			console.log("     숫자 범위는 20 ~ 39 입니다.");
	 		//return 2;
	 	else if (totalNum >= 0)
			console.log("     숫자 범위는 0 ~ 19 입니다.");
	 		//return 1;
	 },

	 secondSet : function(){
		console.log(this.secondPlayer.name + "님 숫자를 입력해주세요.");	// 후공 안내 메세지
		this.mode = 2;
	 },

	/* 라운드별 승자 알림 */
	 resultRound : function(player1, player2){
		var resultWinner;
		resultWinner = this.whoIsWinner(player1, player2);
		console.log("===" + this.round + "라운드 결과");
		console.log("===이번 라운드 승자는 " + resultWinner.name + "입니다.");
		console.log("===[score] player1 : " + player1.score + "점 / player2 : " + player2.score + "점");

		/* 최종 승자 알림 */
		if (this.player1.score >= 5 || this.player2.score >= 5 || this.round >= 9){
			var resultFinal;
			resultFinal = this.whoIsFinalWinner(player1, player2);
			console.log("[라운드 종료]");
			console.log("최종 승자는" + resultFinal.name + "입니다.");
			this.gameOver();
		}

		else {
			mode = 1;
			this.printRound();	// 다음 라운드로
		}	
	},

	/* 라운드별 승리자를 알려주는 함수
	 * input : player1, player2
	 * output : winner
	 */
	whoIsWinner : function(player1, player2){
		if (player1.inputNum > player2.inputNum) {
			this.winner = player1;
			this.loser = player2;
		}
		else if (player1.inputNum < player2.inputNum) {
			this.winner = player2;
			this.loser = player1;
		}
		// else // 비길 경우

		this.winner.score++;

		return this.winner;
	},


	/* 게임 최종 승리자를 알려주는 함수
	 * input : player1, player2
	 * output : finalWinner
	*/
	whoIsFinalWinner : function(player1, player2){
		if (player1.score > player2.score)
			this.finalWinner = player1;
		else if (player1.score < player2.score) 
			this.finalWinner = player2;
		
		return this.finalWinner;
	},

	gameOver : function(){
		console.log("[Game Over]");
	}
}
