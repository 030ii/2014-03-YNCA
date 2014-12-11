var socket = io();

(function (changeDOM){
	// 인서트 부분과 버튼 누르는 버튼 연결
	var utilizeInsertBtn = function (insertElement, btnElement, fn){
		btnElement.on('click', fn);
		insertElement.bind('keypress', {}, function(e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			if (code == 13) {
				e.preventDefault();
				fn();
			}
		});
	}

	$('#myModal').modal({backdrop : 'static', keyboard : false});

	utilizeInsertBtn($('#insertName'), $('#insertNameBtn'), function () {
		if ($('#insertName').val()) {
			socket.emit('inputPlayerName', $('#insertName').val());
			$('#insertName').val('');
		}
	});

	utilizeInsertBtn($('#insertPoint'), $('.insertPointBtn'), function () {
		if ($('#insertPoint').val()){
			socket.emit('insertPoint', $('#insertPoint').val());
			$('#insertPoint').val('');
		}
	});

	utilizeInsertBtn($('#insertMessage'), $('.insertMessageBtn'), function () {
		socket.emit('insertMessage', $('#insertMessage').val());
		$('#insertMessage').val('');
	});

	$('#notification .close').on('click', function (){
		$('#notification').addClass('displayNone');
	});
})(changeDOM);

socket.on('connect', function() {
	changeDOM.mainModal();
	$('#insertName').focus();
});

socket.on('waitingPlayer2', function (){
	console.log('Player2 waiting ...');
	changeDOM.changeModal("Player2 waiting... ");
});

socket.on('player2Connect', function (player1Name, player2Name){
	console.log("Now, Player 2 Connect");
	socket.emit('sendStart', player1Name, player2Name);
});

socket.on('gameStart', function(gameBasis) {
	console.log("GAME START");
	changeDOM.changeModal("Game Start !");

	gameBasis.wholeRound = gameBasis.wholeRound || 9;
	gameBasis.initRound = gameBasis.initRound || 1;
	gameBasis.initPoint = gameBasis.initPoint || 99;
	gameBasis.initScore = gameBasis.initScore || 0;
	gameBasis.initPointRange = gameBasis.initPointRange || 5;

	changeDOM.changePlayerName(gameBasis.player1Name, gameBasis.player2Name);
	
	changeDOM.settingRound(gameBasis.initRound);
	document.styleSheets[0].addRule('.statusField .round:after', "content: 'R/"+gameInfo.totalRound+"R';");

	changeDOM.settingScore(gameBasis.initScore, gameBasis.initScore);

	changeDOM.settingPointRange(gameBasis.pointRange);

	changeDOM.settingRemainingPoint(gameBasis.initPoint);

	setTimeout(function() {
		var insertPointElement = $('#insertPoint');
		changeDOM.hide_mainModal();
	}, 1000);
});

/*
emit - on

1 플레이어 이름 확인
2 선공 세팅 - firstplayer
3 후공 세팅 - secondPlayer
4 후공의 포인트 입력 스타트
5 라운드가 끝나면 알림
6 모달 보이기 및 숨기기
7 라운드마다 포인트 업뎃
8 상대 플레이어의 포인트 범위 변경
9 라운드 진행
10 비겼을 때 처리
11 채팅 
12 게임 끝났을 때, 최종 위너와 루저 알림
13 연결이 끊어졌을 때 처리

*/

socket.on('confirmMyName', function (className, playerName){
	changeDOM.myName = playerName;
	$('className').classList.add('playerMe');
});

socket.on('firstPlayerSet', function (){
	changeDOM.settingFirstPlayer();
	changeDOM.startPointInput();
});

socket.on('secondPlayerSet', function (){
	changeDOM.settingSecondPlayer();
	changeDOM.blockPointInput();
});

socket.on('insertPointStart', function(){
	changeDOM.insertPointStart();
});

socket.on('showRoundInfoPopup', function(round, text){
	changeDOM.changeModal('Current Round ' + round + text + 'Go Next Round !');
	changeDOM.mainModal();
});

socket.on('notiPopup', function (message){
	changeDOM.notiPopup(message);
});

socket.on('hidenotiPopup', function() {
	changeDOM.hidenotiPopup();
});

socket.on('resetPoint', function (point){
	changeDOM.settingRemainingPoint(point);
	changeDOM.blockPointInput();
});

socket.on('setEnemyInfo', function (enemyInfo){
	changeDOM.settingPointRange(enemyInfo.pointRange);
	/*changeDom.setBlackAndWhite(enemyInfo.color);
	changeDom.setPrevBlackAndWhite(enemyInfo.round, enemyInfo.color);*/
});

socket.on('goingRound', function(roundInfo){
	changeDOM.hide_mainModal();
	changeDOM.settingRound(roundInfo.round);
	changeDOM.settingScore(roundInfo.player1Score, roundInfo.player2Score);
});

socket.on('gameOverDraw', function() {
	changeDOM.changeModal('Draw !');
	changeDOM.mainModal();
});

socket.on('resetChatRoom', function (name, message){
	changeDOM.updateMessage(name, message);
});

socket.on('finalWinner', function (playerName){
	changeDOM.changeModal('Player ' + playerName +' `s VICTORY !');
	changeDOM.mainModal();
});

socket.on('finalLoser', function (playerName){
	changeDOM.changeModal('Player ' + playerName + '`s DEFEAT !');
	changeDOM.mainModal();

	setTimeout(function (){
		window.location.reload(true);
	}, 2000);
});

socket.on('Disconnected', function(){
	changeDOM.changeModal('Opponent Disconnect ! Reloading ... ');
	changeDOM.mainModal();

	setTimeout(function (){
		window.location.reload(true);
	}, 2000);
});