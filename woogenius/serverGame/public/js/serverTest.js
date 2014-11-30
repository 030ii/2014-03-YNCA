var socket = io();

(function (gc) {
	var bindInputAndBtn = function (inputEl, btnEl, fn) {
		btnEl.on('click', fn);

		inputEl.bind("keypress", {}, function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
		    if (code == 13) { //Enter keycode                        
		    	e.preventDefault();
		    	fn();
		    }
		});
	}

	// init for noti Modal
	$('#notiModal').modal({backdrop: 'static', keyboard: false});

	// init for input name
	$("#inputName").popover({
		placement : 'top',
		content : '이름을 입력하세요.',
		trigger : 'manual'
	});

	bindInputAndBtn($("#inputName"), $('#inputNameBtn'), function () {
		if ($("#inputName").val()) {
			socket.emit('inputPlayerName', $("#inputName").val());
			$('#inputName').val('');
		} else {
			$("#inputName").popover('show');
		}
	});

	// init for input point
	$("#inputPoint").popover({
		placement : 'top',
		content : '적절하지 않습니다. 다시 입력하세요.',
		trigger : 'manual'
	});

	bindInputAndBtn($("#inputPoint"), $('.inputPointBtn'), function () {
		if ($("#inputPoint").val()) {
			socket.emit('inputPoint', $("#inputPoint").val());
			$('#inputPoint').val('');
		} else {
			gc.showInvalidPointPopover();
		}
	});

	// init for notification
	$('#notification .close').on('click', function () {
		$('#notification').addClass('displayNone');
	});
})(gc);


socket.on('connect', function(){	
	gc.showNotiModal();
	$("#inputName").focus();
	$("#inputName").popover('hide');
});

socket.on('waitForPlayer2', function () {
	console.log('플레이어 2의 접속을 기다리는 중입니다.');
	gc.changeNotiModal("<p>다른 플레이어의<br> 접속을 기다리는 중입니다.</p><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate loading'></span>");
});

socket.on('player2Connected', function (p1Name, p2Name){
	console.log("플레이어 2 접속");
	socket.emit("sendStart", p1Name, p2Name);
});

socket.on("gameStart", function (p1Name, p2Name) {
	console.log("게임이 시작됩니다.");
	gc.changeNotiModal("<p>게임이 시작됩니다.</p>");
	gc.changePlayerName(p1Name, p2Name)
	setTimeout(function() {
		gc.hideNotiModal();
	}, 1000);
});

socket.on('firstPlayerSetting', function () {
	gc.setFirstPlayer();
	gc.activatePointInput();
});

socket.on('lastPlayerSetting', function () {
	gc.setLastPlayer();
	gc.deactivatePointInput();
});

socket.on('setRemainingTime', function (time) {
	gc.setRemainingTime(time);
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
});

socket.on('showNotification', function (message) {
	gc.showNotification(message);
});

socket.on('hideNotification', function () {
	gc.hideNotification();
});

socket.on('showRoundInfoByNotiModal', function (round, text) {
	gc.changeNotiModal('<h1>라운드'+round+"</h1><span class='bigFont'>"+text+"</span><br><br>3초 후 다음라운드로 진행합니다.");
	gc.showNotiModal();
});

socket.on('proceedRound', function (roundInfo) {
	gc.hideNotiModal();
	gc.setRound(roundInfo.round);
	gc.setScore(roundInfo.p1Score, roundInfo.p2Score);
});

socket.on('setCounterInfo', function (counterInfo) {
	gc.setPointRange(counterInfo.pointRange);
	gc.setBlackAndWhite(counterInfo.color);
	gc.setPrevBlackAndWhite(counterInfo.round, counterInfo.color);
});

socket.on('inputTimeout', function () {
	gc.showNotification('입력시간이 초과되었습니다. 0이 입력됩니다.');
	socket.emit('inputPoint', 0);
});

socket.on('gameOverWinner', function () {
	gc.changeNotiModal("<span class='bigFont'>이겼습니다!</span>");
	gc.showNotiModal();
});

socket.on('gameOverLoser', function () {
	gc.changeNotiModal("<span class='bigFont'>졌습니다.</span>");
	gc.showNotiModal();
});

socket.on('counterDisconnected', function(){
	console.log('상대방이 채팅방을 나갔습니다. 연결이 끊어집니다.');
});


