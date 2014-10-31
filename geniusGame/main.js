document.addEventListener("onload", function(){
	var player = new Player(1);
	var player2 = new Player(2);
	var dealer = new Dealer();
	
	for(i=0; i<9;i++){
		player.inputNum();
		player.showCandG();
		player2.inputNum();
		player2.showCandG();
		dealer.compareNum(player, player2);
	}
	dealer.finalWinner(player, player2);
});