var round = 1;
var turn = 1;
var firstPlayer;

var player1 = {
name: "최초 시작 사람",
numOfToken:99,
inputNum:0,
point:0,
color:"black",
gauge:5,
setColor : function(){
	if(player1.inputNum < 10){
		this.color="black";
	}
	else
		this.color="white";
},

setGauge : function(){
	
	if(player1.numOfToken>79){
		this.gauge=5;
		return;
	}
	else if(player1.numOfToken>59){
		this.gauge=4;
		return;
	}
	else if(player1.numOfToken>39){
		this.gauge=3;
		return;
	}
	else if(player1.numOfToken>19){
		this.gauge=2;
		return;
	}
	else{
		this.gauge=1;
		return;
	}
},

showCandG : function(){
		console.log(this.color);
		console.log(this.gauge);
}
}

var player2 ={
name: "최초 시작 때 두번째로 한 사람",
numOfToken:99,
inputNum:0,
point:0,
color:"black",
gauge:5,
setColor : function(){
	if(player2.inputNum < 10){
		this.color="black";
	}
	else
		this.color="white";
},

setGauge : function(){
	
	if(player2.numOfToken>79){
		this.gauge=5;
		return;
	}
	else if(player2.numOfToken>59){
		this.gauge=4;
		return;
	}
	else if(player2.numOfToken>39){
		this.gauge=3;
		return;
	}
	else if(player2.numOfToken>19){
		this.gauge=2;
		return;
	}
	else{
		this.gauge=1;
		return;
	}
},

showCandG : function(){
		console.log(this.color);
		console.log(this.gauge);
}
}

player1.otherPlayer =player2;
player2.otherPlayer = player1;



document.getElementById('startbutton').addEventListener('click', function(){
	document.querySelector('#players').style.display="block";
	firstPlayer = player1;
	// debugger;
	before();
});

// var getInput = function(){
	document.getElementById('getInput').addEventListener('click',function(){
		var input = document.getElementById('input');

	switch(turn){
		case 1:
		firstPlayer.inputNum= parseInt(input.value);
		input.value ="";
		//checkInput
		if(firstPlayer.inputNum > firstPlayer.numOfToken){
			console.log("Invalid input. Please try again");
			break;
		}
		firstPlayer.numOfToken = firstPlayer.numOfToken - firstPlayer.inputNum;
		console.log("left amount: "+ firstPlayer.numOfToken);   
		after();
		break;

		case 2:
		// var input = document.getElementById('input');
		firstPlayer.otherPlayer.inputNum= parseInt(input.value);
		input.value ="";
		//checkInput
		if(firstPlayer.otherPlayer.inputNum > firstPlayer.otherPlayer.numOfToken){
			console.log("Invalid input. Please try again");
			break;
		}
		firstPlayer.otherPlayer.numOfToken = firstPlayer.otherPlayer.numOfToken - firstPlayer.otherPlayer.inputNum;
		console.log("left amount: "+ firstPlayer.otherPlayer.numOfToken);  
		firstPlayer.otherPlayer.setColor();
		firstPlayer.otherPlayer.setGauge();
		firstPlayer.otherPlayer.showCandG();

		if(firstPlayer.inputNum > firstPlayer.otherPlayer.inputNum){
			console.log("winner is first player");
			firstPlayer.point++;
		}
		else if (firstPlayer.inputNum == firstPlayer.otherPlayer.inputNum){
			console.log("It's a tie!");
		}
		else{
			console.log("winner is second player");
			firstPlayer= firstPlayer.otherPlayer;
			firstPlayer.point++;
		}
		
		round++;
		
		if(round>10){
			console.log("end of game");
			if(player1.score> player2.score){
				console.log("player1 is winnner");
			}
			else 
				console.log("player2 is winner");
			break;
		}
		before();
		break;
	}
// };
});

//선공하기 전까지의 준비
var before= function(){
console.log("This round: " + round);
console.log("Current score" + player1.point + " : " + player2.point);
turn =1;
console.log("선공은 " +firstPlayer.name);
console.log("First player input your number");

};

//후공하기 전까지의 준비
var after = function(){
	firstPlayer.setColor();
	firstPlayer.setGauge();
	firstPlayer.showCandG();
	turn=2;
	console.log("후공");
	console.log("Second player, input your number");
};