var socket = io();

(function () {
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

	// init for input name
	$("#inputName").popover({
		placement : 'top',
		content : '이름을 입력하세요.',
		trigger : 'manual'
	});

	$('#inputNameModal').on('shown.bs.modal', function() {
		$("#inputName").focus();
		$("#inputName").popover('hide');
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
})();


socket.on('connect', function(){
	$('#inputNameModal').modal({backdrop: 'static', keyboard: false});
	$('#inputNameModal').modal('show');
});

socket.on('waitForPlayer2', function () {
	console.log('플레이어 2의 접속을 기다리는 중입니다.');
	$('#inputNameModal > div.modal-dialog > div > div.modal-body > div.wrap')
		.html("<p>다른 플레이어의<br> 접속을 기다리는 중입니다.</p><span class='glyphicon glyphicon-refresh glyphicon-refresh-animate loading'></span>");
});

socket.on('player2Connected', function (p1Name, p2Name){
	console.log("플레이어 2 접속");
	socket.emit("sendStart", p1Name, p2Name);
});

socket.on("gameStart", function (p1Name, p2Name) {
	console.log("게임이 시작됩니다.");
	$('#inputNameModal > div.modal-dialog > div > div.modal-body > div.wrap')
		.html("<p>게임이 시작됩니다.</p>");
	gc.changePlayerName(p1Name, p2Name)
	setTimeout(function() {
		$('#inputNameModal').modal('hide');
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

socket.on('counterDisconnected', function(){
	console.log('상대방이 채팅방을 나갔습니다. 연결이 끊어집니다.');
});

// game controller
var gc = {
	changePlayerName : function (p1Name, p2Name) {
		document.querySelector('.player1Name').innerHTML = p1Name;
		document.querySelector('.player2Name').innerHTML = p2Name;
	},
	setFirstPlayer : function () {
		document.querySelector('.attackOrder span').className = 'first';
	},
	setLastPlayer : function () {
		document.querySelector('.attackOrder span').className = 'last';
	},
	deactivatePointInput : function () {
		var inputPointEl = document.getElementById('inputPoint');
		inputPointEl.setAttribute("disabled", "");
		inputPointEl.setAttribute("placeholder", "입력을 기다리는 중.");
	},
	activatePointInput : function () {
		var inputPointEl = document.getElementById('inputPoint');
		inputPointEl.removeAttribute('disabled');
		inputPointEl.setAttribute('placeholder', '포인트를 입력하세요.');
		$("#inputPoint").focus();
		// inputPointEl.focus();
	},
	setRemainingTime : function (remainingTime) {
		var remainingTimeEl = document.querySelector('.remainingTime');
		remainingTimeEl.innerHTML = remainingTime;

		if (remainingTime < 15) {
			remainingTimeEl.style.color = '#d9534f';
		} else{
			remainingTimeEl.style.color = '#ebebeb';
		}
	},
	setRemainingPoint : function (remainingPoint) {
		var remainingPointEl = document.querySelector('.remainingPoint');
		remainingPointEl.innerHTML = remainingPoint;
		remainingPointEl.setAttribute('style', 'width:'+remainingPoint+'%;')
	},
	showInvalidPointPopover : function () {
		$("#inputPoint").popover('show');
		setTimeout (function () {
			$("#inputPoint").popover('hide');
		}, 1000);
		$('#inputPoint').val('');
	}
}

