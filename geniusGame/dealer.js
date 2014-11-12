function Dealer(){
	this.nextTurn = this.firstTurn;
	this.order = 1;
}



	Dealer.prototype.getOrder = function(player1, player2) {
		if(player1.myNum >= player2.myNum) {
			return 1;
		}
		return 0;
	}
	Dealer.prototype.getWinner = function(player1, player2) {
		if(player1.myNum > player2.myNum) {
			return player1;
		}
		else if(player1.myNum == player2.myNum) {
			return null;
		}
		return player2;
	}

	Dealer.prototype.giveScoreToWinner = function(player1,player2){

		var pWinner = this.getWinner(player1, player2);

		if(pWinner == null) {
			console.log("Tie!");
			return;
		}

		pWinner.score++;
		console.log("player " + pWinner.flag + "scored a point");
		return;

		/*

		if(player1.myNum > player2.myNum){
			player1.score++;
			flag =1;
			console.log("Player1 scored a point");
//turn = 1;
//player2에게 player1의 score 보여주는 
			return;
		}
		else if(player1.myNum === player2.myNum){
			console.log("Tie!");
			return;
		}
		else {
			player2.score++;
			flag = 2;
			console.log("Player2 scored a point");
//turn= 2;player
//player1에게 player1의 score 보여주는 
			return;
		}
		*/
	};

	Dealer.prototype.firstTurn = function(player1, player2){

		this.order = this.getOrder(player1, player2);

		var ret;
		if(this.order == 1) {
			ret = player1.inputNum();
		}
		else {
			ret = player2.inputNum();
		}

		if(ret != -1) {
			this.nextTurn = this.secondTurn;
		}

		/*
		if(player1.flag == 1){
			player1.inputNum();
		}
		else{
			player2.inputNum();
		}*/
		// if (this.round == 1) {
		// 	var randomInt = (function getRandomInt(min, max) {
		// 	    return Math.floor(Math.random() * (max - min + 1)) + min
		// 	})(1,2);
		// 	if (randomInt == 1) {
		// 		player1.setInputNum();
		// 	} 
		// 	else {
		// 		player2.setInputNum();
		// 	}
//winner따라 순서 바꿔주
	};

	Dealer.prototype.secondTurn = function(player1, player2) {

		var ret;
		if(this.order == 1) {
			ret = player2.inputNum();
		}
		else {
			ret = player1.inputNum();
		}

		if(ret != -1) {
			this.nextTurn = this.firstTurn;
		}

	}

	Dealer.prototype.showResult= function(player1, player2){
		if(player1.type==1){
			player2.showCandG();
		}
		else{
			player1.showCandG();
		}
	}

	Dealer.prototype.finalWinner= function(player1, player2){
		if(player1.score > player2.score){
			console.log("Player1 wins!");
		}
		else if(player1.score == player2.score){
//additional 3 more games

		}
		else {
		console.log("Player2 wins!");
		}
	}
