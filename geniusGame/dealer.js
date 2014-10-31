
function Dealer(){};

	dealer.prototype.compareNum= function(player,player2){
		if(player.inputNum > player2.inputNum){5
			player1.score++;
			console.log("Player1 scored a point");
//turn = 1;
//player2에게 player1의 score 보여주는 
			return;
		}
		else if(player.inputNum === player2.inputNum){
			console.log("Tie!");
			return;
		}
		else 
			player2.score++;
			console.log("Player2 scored a point");
//turn= 2;
//player1에게 player1의 score 보여주는 
			return;
	};

	dealer.prototype.setOrder= function(round){
		if (this.round == 1) {
			var randomInt = (function getRandomInt(min, max) {
			    return Math.floor(Math.random() * (max - min + 1)) + min
			})(1,2);

			if (randomInt == 1) {
				player.setInputNum();
			} else {
				player2.setInputNum();
			}
//winner따라 순서 바꿔주
	};

	dealer.prototype.showResult= function(){
		if(player.type==1){
			player2.showColor();
			player2.showGauge();
		}
		else{
			player1.showColor();
			player1.showGauge();
		}
	}

	dealer.prototype.finalWinner= function(player, player2){
		if(player.score > player2.score){
			console.log("Player1 wins!");
	}
	else if(player.score == player2.score){
//additional 3 more games
	}
	else 
		console.log("Player2 wins!")
}