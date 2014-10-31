function Player(type){
	this.type = type;
	this.numOfToken = 99;
	this.inputNum = 0;
	this.score : 0;
	this.color : "something";
	this.gauge : 5;
	}

player.prototype.inputNum = function(){
	console.log("Input a number");
	var inputNum = document.querySelector("#inputfield").value;
//document.querySelector("#inputfield").value="";
	if(inputNum > player.numOfToken){
		console.log("You don't have enough tokens. Please input another number");
//다시 input 받
	}
	return inputNum;

};

player.prototype.showColor = function(inputNum){
	if(inputNum<10){
		this.color="black";
	}
	else
		this.color="white";
};

player.prototype.setNshowGauge = function(inputNum){
	player.numOfToken = player.numOfToken-inputNum;
	if(player.numOfToken>79){
		gauge=5;
		console.log(player.guage);
		return;}
	else if(player.numOfToken>59){
		gauge=4;
		console.log(player.guage);
		return;}
	else if(player.numOfToken>39){
		gauge=3;
		console.log(player.guage);
		return;}
	else if(player.numOfToken>19){
		gauge=2;
		console.log(player.guage);
		return;}
	else
		gauge=1;
		console.log(player.guage);
		return;};
}

var player = new Player(1);
var player2 = new Player(2);