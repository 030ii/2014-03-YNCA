var changeDOM = {

	changePlayerName : function (player1Name, player2Name){
		$('.player1Name').innerHTML = player1Name;
		$('.player2Name').innerHTML = player2Name;
	},
	settingFirstPlayer : function (){
	},
	settingSecondPlayer : function (){
	},
	blockPointInput : function () {
		var insertP = $('#inputPoint');
		insertP.setAttribute("disabled", "");
	},
	startPointInput : function () {
		var insertP = $('#inputPoint');
		insertP.removeAttribute('disabled');
		$("#inputPoint").focus();
	},
	setRemainingPoint : function (remainingPoint) {
		var remainingPointEl = document.querySelector('.remainingPoint');
		remainingPointEl.innerHTML = remainingPoint;
		remainingPointEl.setAttribute('style', 'width:'+remainingPoint+'%;')
	},
	settingRound : function (round) {
		var roundEl = $('.round');
		roundEl.textContent = round;
	},
	settingScore : function (player1Score, player2Score) {
		var p1ScoreEl = $('.player1Score');
		var p2ScoreEl = $('.player2Score');
		p1ScoreEl.textContent = p1Score;
		p2ScoreEl.textContent = p2Score;
	},
	setPointRange : function (num) {
		var pointRangeEl = $('.pointBoard tr');
		var length = pointRangeEl.length;
		var startingPoint = 5 - num;

		for (var i = 0; i < length; i++) {
			if (i < startingPoint) {
				pointRangeEl[i].className = '';
			} else {
				pointRangeEl[i].className = 'primary';
			}
		};
	},
	mainModal : function () {
		this.changeNotiModal();
		$('#notiModal').modal('show');
		$('body').css('overflow','hidden');
		$('body').css('position','fixed');
	},
	hide_mainModal : function () {
		$('#notiModal').modal('hide');
		$('body').css('overflow','visible');
		$('body').css('position','static');
	},
	changeModal : function (text) {
		$('#notiModal > div.modal-dialog > div > div.modal-body > div.wrap').html(text);
		this.centerNotiModal();
	},
	centerNotiModal : function () {
		$('#notiModal').css('display', 'block');
		var $dialog = $('#notiModal').find(".modal-dialog");
		var offset = ($(window).height() - $dialog.height()) / 2;
		// Center modal vertically in window
		$dialog.css("margin-top", offset);
	},
	updateMessage : function (name, message) {
		var chattingMessagesEl = $('#chattingMessages');
		var chattingMessagesListEl = $('#chattingMessages ul');
		if(name === this.myName) {
			var inputString = "<li class = 'myMessage'>" + message + "</li>";
		} else {
			var inputString = "<li>" + message + "</li>";
		}
		chattingMessagesListEl.innerHTML = chattingMessagesListEl.innerHTML + inputString;	
		chattingMessagesEl.scrollTop = chattingMessagesEl.scrollHeight;
	}
}
