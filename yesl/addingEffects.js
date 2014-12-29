function updateScore(player1, player2, score1, score2){
	if(player1){
		document.getElementById('myScore').innerHTML = score1;
	}
	else if(player2){
		document.getElementById('urScore').innerHTML = score2;
	}
}

function updateScoreGauge(point){
	var leftPoint = leftPoint - point;
	var trList = document.querySelectorAll('tr');
	var elPuff = document.querySelector('#puff');

	if (80 <= leftPoint && leftPoint < 100) {
		trList[0].style.opacity = 0;
		elPuff.style.display = "block";
		animatePoof();
	}
	else if (60 <= leftPoint &&  leftPoint <80) {
		trList[1].style.opacity = 0;
		elPuff.style.display = "block";
		animatePoof();
	}
	else if (40 <= leftPoint && leftPoint <60) {
		trList[2].style.opacity = 0;
		elPuff.style.display = "block";
		animatePoof();
	}
	else if (20 <= leftPoint && leftPoint <40) {
		trList[3].style.opacity = 0;
		elPuff.style.display = "block";
		animatePoof();
	}
	else if (0 <= leftPoint && leftPoint <20) {
		trList[4].style.opacity = 0;
		elPuff.style.display = "block";
		animatePoof();
	}
}