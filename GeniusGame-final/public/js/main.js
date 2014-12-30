var socket = io();
var modal = new Modal();

window.onload = function () {
	$('.exit').on('click', function () {
		window.location.reload(true);
	});

	gc.showNotiModal({
		title : '<img src="./img/logo.png" width="200px" alt="" />',
		content: '이름을 입력하세요.<br /><input type="text" id="inputName" /><button id="inputNameBtn">입력</button>'
	});
	$("#inputName").focus();

	function bindInputAndBtn (inputEl, btnEl, fn) {
		btnEl.on('click', fn);

		inputEl.bind("keypress", {}, function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
		    if (code == 13) { //Enter keycode
		    	e.preventDefault();
		    	fn();
		    }
		});
	}

	bindInputAndBtn($("#inputName"), $('#inputNameBtn'), function () {
		if ($("#inputName").val()) {
			socket.emit('inputPlayerName', $("#inputName").val());
			$('#inputName').val('');
		} else {
			$("#inputName").attr('placeholder', '공백은 안돼요.');
		}
	});

	// inputPointBtn -> sendButton 으로 수정
	bindInputAndBtn($("#inputPoint"), $('.inputPointBtn'), function () {
		if ($("#inputPoint").val()) {
			socket.emit('inputPoint', $("#inputPoint").val());
			gc.stopCount();
			$('#inputPoint').val('');
		} else {
			gc.showInvalidPointPopover();
		}
	});

	// init for chatting
	bindInputAndBtn($('.inputText'), $('.inputTextBtn'), function () {
		socket.emit('inputMsg', $('.inputText').val());
		$('.inputText').val('');
	});

	// init for notification
	$('#notification .close').on('click', function () {
		$('#notification').addClass('displayNone');
	});

	// modal binding Event
	$('#notiModal').on('hidden.bs.modal', function () {
		var inputPointEl = document.getElementById('inputPoint');

		if(!inputPointEl.hasAttribute('disabled')) {
			// 포커스가 안먹는 부분
			$("#inputPoint").focus();
		}
	});

	var inputEl = document.querySelector('#inputPoint');
	inputEl.addEventListener('webkitAnimationEnd', function(e){
	    this.classList.remove('shake');
	}, false);

	var bubbleEl = document.querySelector('.bubble');
	bubbleEl.addEventListener('webkitTransitionEnd', function(e){
	    this.classList.remove('visible');
	}, false);
};

socket.on('connect', function(){

});

socket.on('waitForPlayer2', function () {
	gc.myNum = 1;
	console.log('플레이어 2의 접속을 기다리는 중입니다.');
	gc.showNotiModal({
		content: "<p>다른 플레이어의<br> 접속을 기다리는 중입니다.</p><img class=\"rotating\" width=\"50px\" src=\"./img/loader.png\" alt=\"\" />"});
});

socket.on('player2Connected', function (p1Name, p2Name){
	socket.emit("sendStart", p1Name, p2Name);
});

/* gameInfo : Object {
	p1Name : player 1 name,
	p2Name : player 2 name,
	totalRound : total round,
	initRound : round for init,
	initPoint : point for init,
	initScore : score for init,
	initPointRange : point range for init
}*/
socket.on("gameStart", function (gameInfo, roomName) {
	console.log("게임이 시작됩니다.");

	if (!gc.conference) {
		gc.connectToRoom(roomName);
	}

	gc.showNotiModal({
		content: "<p>게임이 시작됩니다.</p>"});

	// default setting
	gameInfo.totalRound = gameInfo.totalRound || 9;
	gameInfo.initRound = gameInfo.initRound || 1;
	gameInfo.initPoint = gameInfo.initPoint || 99;
	gameInfo.initScore = gameInfo.initScore || 0;
	gameInfo.initPointRange = gameInfo.initPointRange || 5;

	// name setting
	gc.changePlayerName(gameInfo.p1Name, gameInfo.p2Name);

	// round setting
	gc.setRound(gameInfo.initRound);

	// prev round setting
	gc.resetColor();

	// score setting
	gc.setScore(gameInfo.initScore, gameInfo.initScore);

	// point range setting
	gc.setPointRange(gameInfo.initPointRange, 1);
	gc.setPointRange(gameInfo.initPointRange, 2);

	// point setting
	gc.setRemainingPoint(gameInfo.initPoint);

	setTimeout(function() {
		modal.hide();
	}, 1000);
});

// className : .player1Name or .player2Name
socket.on('checkMyName', function (className, playerNum) {
	gc.myNum = playerNum;
});

socket.on('firstPlayerSetting', function () {
	gc.setFirstPlayer();
	gc.activatePointInput();
	gc.startCount();
});

socket.on('lastPlayerSetting', function () {
	gc.setLastPlayer();
	gc.deactivatePointInput();
});

socket.on('invalidPointInput', function () {
	gc.showInvalidPointPopover();
});

socket.on('updatePointAndBlockPointInput', function (point) {
	gc.setRemainingPoint(point);
	gc.deactivatePointInput();
});

socket.on('activatePointInput', function () {
	gc.activatePointInput();
	gc.startCount();
});

socket.on('showNotification', function (message) {
	gc.showNotiModal({
		content: message
	});

	setTimeout(function() {
		gc.hideNotiModal();
	}, 2000)
});

// var methods = ['activatePointInput', 'showNotification', 'hideNotification'];

// for (var i = 0; i < methods.length; i++) {
// 	// (function (method) {
// 		socket.on(method, function (message) {
// 			gc[method[i]](message);
// 		}
// 	// })(methods[i]);
// };

socket.on('showRoundInfoByNotiModal', function (round, text) {
	setTimeout(function () {
		gc.showNotiModal({
			title: 'Round '+round,
			content: "<span class='bigFont'>"+text+"</span><br>3초 후 다음 라운드로 진행합니다."
		});
	}, 1000);

	gc.stopCount();
});

socket.on('reduceVideoBlur', function (playerNum) {
	gc.reduceVideoBlur(playerNum);
});

socket.on('proceedRound', function (roundInfo) {
	setTimeout(function () {
		gc.hideNotiModal();
	}, 1000);
	gc.resetBlackAndWhite();
	gc.setRound(roundInfo.round);
	gc.setScore(roundInfo.p1Score, roundInfo.p2Score);
});

socket.on('setCounterInfo', function (counterInfo, playerNum) {
	gc.setPointRange(counterInfo.pointRange, playerNum);
	gc.setBlackAndWhite(playerNum, counterInfo.color);
	gc.setPrevBlackAndWhite(playerNum, counterInfo.round, counterInfo.color);
});

socket.on('inputTimeout', function () {
	gc.showNotiModal({
		content:'입력시간이 초과되었습니다. <br /> 0이 입력됩니다.'
	});

	setTimeout(function() {
		gc.hideNotiModal();
	}, 2000)

	socket.emit('inputPoint', 0);
});

socket.on('gameOverWinner', function (playerName) {
	gc.showNotiModal({
		content : playerName+"<br><span class='bigFont'>승리!</span><br><br> 3초 후에 Reload 됩니다."
	});

	setTimeout(function () {
		window.location.reload(true);
	}, 3000);
});

socket.on('gameOverLoser', function (playerName) {
	gc.showNotiModal({
		content : playerName+"<br><span class='bigFont'>패배!</span><br><br> 3초 후에 Reload 됩니다."
	});

	setTimeout(function () {
		window.location.reload(true);
	}, 3000);
});

socket.on('gameOverDraw', function () {
	gc.showNotiModal({
		content : "<span class='bigFont'>비김!</span><br><br>3초 후에 추가게임이 시작됩니다."
	});

	gc.stopCount();
});

socket.on('updatechat', function (num, msg) {
	gc.appendMessage(num, msg);
});

socket.on('counterDisconnected', function(){
	gc.showNotiModal({
		content : "상대방이 나갔습니다. <br> 3초 후에 Reload 됩니다."
	});

	setTimeout(function () {
		window.location.reload(true);
	}, 3000);
});


