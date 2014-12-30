var socket = io();

var InputBtn = function (input, btn, f) {
	btnEl.on('click', fn);
	inputEl.bind("keypress", {}, function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		    if (code == 13) { //Enter keycode                        
		    	e.preventDefault();
		    	fn();
		    }
		});
}

InputBtn($("#inputName"), $('#inputNameBtn'), function () {
	if ($("#inputName").val()) {
		socket.emit('inputPlayerName', $("#inputName").val());
		$('#inputName').val('');
	} else {
		
	}
});

InputBtn($("#inputPoint"), $('.inputPointBtn'), function () {
	if ($("#inputPoint").val()) {
		socket.emit('inputPoint', $("#inputPoint").val());
		$('#inputPoint').val('');
	} else {

	}
});

InputBtn($("#inputMsg"), $('.inputMsgBtn'), function () {
	socket.emit('inputMsg', $("#inputMsg").val());
	$('#inputMsg').val('');
});

/*
socket.on
*/
    /*
    커넥되면 콘솔에 확인 차 출력
    모달을 내린다
    */

    socket.on('connect', function(){
    	console.log('connect !');
    	document.getElementById('inputNameModal').style.visibility = 'visible';
    });

    document.getElementById("nameSend").addEventListener("click", function(){
    	document.getElementById('inputNameModal').style.visibility = 'hidden';
    	socket.emit('pName', document.getElementById('yourName').value);
    	document.getElementById("yourName").value = '';
    });

    /*
    플레이어 1이 플레이어 2를 기다리는 동안, '기다리시오!' 모달을 보여준다.
    */
    socket.on('waitingP2', function () {
    	console.log('두번째 입장자를 기다리고 있어요. 잠시만 기다려주세요.');
    	document.getElementsByClassName('global-modal-header')[0].childNodes[3].innerText = "플레이어 2를 기다리고 있어요. 잠시만 기다려주세요.";
    	document.getElementById('inputNameModal').style.visibility = 'visible';
    });

    socket.on('gameMsg', function (msg){
    	console.log('두번째 입장자를 기다리고 있어요. 잠시만 기다려주세요.');
    	document.getElementById('#notiModal').[0].childNodes[3].innerText = msg;
    	document.getElementById('#notiModal').style.visibility = 'visible';
    })

    /*
    플레이어 2도 커넥되면
    - gameInfo 에는 player Name 이 없어서, 이 부분에서 player Name 을 화면에 표시해줘야함
    */
    socket.on('p2Connect', function(p1Name, p2Name){
    	console.log('플레이어 2까지 접속 완료되었습니다. 게임을 시작합니다.');
    	document.getElementsByClassName('playerNickname')[0].innerText = p1Name;
    	document.getElementsByClassName('playerNickname')[1].innerText = p2Name;
    	// document.getElementsByClassName('notiMessage')[0].innerText = p1Name + "vs" + p2Name;
    	document.getElementById('#notiModal').[0].childNodes[3].innerText = p1Name + "vs" + p2Name;
    	socket.emit('sendStart');
    });

/*
return {
	  round : round,
	  TOTAL_ROUND : TOTAL_ROUND,
	  p1Point : player1.point,
	  p2Point : player2.point,
	  p1Score : player1.score,
	  p2Score : player2.score,
	  p1Gauge : getGaugeFromPlayer(player1),
	  p2Gauge : getGaugeFromPlayer(player2)
	}
	*/

/*
서버에서 이밋
io.sockets.in(socket.room.roomName).emit('gameStart', gameObject.start());
gameObject.start() 를 인자로 받는데, start함수에서 게임정보를 Object 로 리턴해준다.
*/
socket.on("gameStart", function (gameInfo) {
	console.log("게임이 시작됩니다.");
	//document.getElementsByClassName('notiMessage')[0].innerText = "게임이 시작됩니다.";
	document.getElementById('#notiModal').[0].childNodes[3].innerText = "게임이 시작됩니다.";

	// 라운드
	document.getElementsByClassName('roundNum').innerText = 'ROUND ' + gameInfo.round;

	// 색 리셋

	// 점수
	document.getElementsByClassName('score')[0].innerText = gameInfo.p1Score;
	document.getElementsByClassName('score')[1].innerText = gameInfo.p2Score;

	// 포인트 게이지
	var GaugeTable = document.getElementsByClassName('pointGauge');

	// 남은 포인트
	document.getElementsByClassName('possiblePoint').innerText = gameInfo.remainingPoint;

	setTimeout(function() {
		document.getElementById('notiModal').style.visibility = 'hidden';
	}, 1000);
});

socket.on('updatePointGaugeANDBlockPointInput', function (point) {
	document.getElementsByClassName('possiblePoint').innerText = point;
	
	var inputPointEl = document.getElementById('#inputPoint');
	inputPointEl.setAttribute("disabled", "");
	inputPointEl.setAttribute("placeholder", "not your turn");
});

socket.on('gameMsg', function(msg){
	document.getElementById('#notiModal').innerText = msg;
});

/*
returnObj.roundInfo = {
  round : round,
  winner : roundWinner,
  p1Score : player1.score,
  p2Score : player2,score
}
*/
socket.on('Draw', function(roundInfo){
	setTimeout(function () {
		/* draw game start */
	}, 2000);
});

socket.on('firstPlayerSetting', function(){
	/* 추가 */
	var inputPointEl = document.getElementById('inputPoint');
	inputPointEl.removeAttribute('disabled');
	inputPointEl.setAttribute('placeholder', 'Enter the Point !');
	inputPointEl.focus();
});

socket.on('secondPlayerSetting', function(){
	/* 추가 */
	var inputPointEl = document.getElementById('inputPoint');
	inputPointEl.setAttribute("disabled", "");
	inputPointEl.setAttribute("placeholder", "Not your Turn !");
});

/* 블락처리 해둔거 없애기 */
socket.on('deletedBlock', function(){

});

socket.on('setRemainingTime', function(){

});

socket.on('inputTimeout', function(){
	document.getElementsByClassName('notiMessage')[0].innerText = '입력시간이 초과되었습니다. 0이 입력됩니다.';
});

socket.on('nextRound', function(){

});
