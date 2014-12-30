function updateNotiMessage(message){
	document.getElementById("notiMessage").innerHTML = message;
}

function updateRound(round){
	document.getElementById("roundNum").innerHTML = round;
}

function updateBNW(ele, color) {
	if (color =='B') {
		ele.style.backgroundColor = "black";
	} else {
		ele.style.backgroundColor = "white";
	}
}

// function updateBNW(ele, color) {
// 	if (ele == '상대방'){
// 		if (color =='B') {
// 			document.getElementById('urColor').style.backgroundColor = "black";
// 		}
// 		else {
// 			document.getElementById('urColor').style.backgroundColor = "white";
// 		}
// 	}

// 	if (ele == '나'){
// 		if (color =='B') {
// 			document.getElementById('myColor').style.backgroundColor = "black";
// 		}
// 		else {
// 			document.getElementById('myColor').style.backgroundColor = "white";
// 		}
// 	}
// }

function updateBNWbyRound(ele, round, color) {
	if (color == 'B') {
		ele.querySelector('td:nth-child(' + round + ')').style.backgroundColor  = "black";	
	} else {
		ele.querySelector('td:nth-child(' + round + ')').style.backgroundColor  = "white";
	}
}

// function updateBNWbyRound(ele, round, color) {
// 	if (ele == '상대방'){
// 		if (color =='B') {
// 			document.querySelector('#urBNWbyRound td:nth-child(' + round + ')').style.backgroundColor  = "black";
// 		}
// 		else {
// 			document.querySelector('#urBNWbyRound td:nth-child(' + round + ')').style.backgroundColor  = "white";
// 		}
// 	}

// 	if (ele == '나'){
// 		if (color =='B') {
// 			document.querySelector('#myBNWbyRound td:nth-child(' + round + ')').style.backgroundColor  = "black";
// 		}
// 		else {
// 			document.querySelector('#myBNWbyRound td:nth-child(' + round + ')').style.backgroundColor  = "white";
// 		}
// 	}
// }