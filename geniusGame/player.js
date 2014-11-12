function Player(type){
	this.flag = type;
	this.numOfToken = 99;
	this.myNum = 0;
	this.score = 0;
	this.color = "something";
	this.gauge = 5;
}

Player.prototype.inputPreProcess = function() {
	console.log("Input a number");
	document.querySelector("#putNum").value="";
};

Player.prototype.inputNum = function(){
	console.log("player" + this.flag + " turn:");

	var myNum = document.querySelector("#putNum").value;
	console.log("myNum : " + myNum);
	if(myNum > this.numOfToken){
		console.log("You don't have enough tokens. Please input another number");
		return -1;
	}
	this.setMyNum(myNum);
	return 1;
};

Player.prototype.setMyNum = function(myNum){
	this.myNum = myNum;
	this.setColor();
	this.setGauge();
}

Player.prototype.setColor = function(){
	if(this.myNum<10){
		this.color="black";
	}
	else{
		this.color="white";
	}
};

Player.prototype.setGauge = function(){
	console.log(this);
	this.numOfToken = this.numOfToken-this.myNum;
	console.log(this.numOfToken);
	if(this.numOfToken>79){
		this.gauge=5;
		console.log(this.gauge);
		return;}
	else if(this.numOfToken>59){
		this.gauge=4;
		console.log(this.gauge);
		return;}
	else if(this.numOfToken>39){
		this.gauge=3;
		console.log(this.gauge);
		return;}
	else if(this.numOfToken>19){
		this.gauge=2;
		console.log(this.gauge);
		return;}
	else{
		this.gauge=1;
		console.log(this.gauge);
		return;}
};

Player.prototype.showCandG =function(){
	console.log("color is" + this.color);
	console.log("gauge is" + this.gauge);
};