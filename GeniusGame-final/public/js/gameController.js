// game controller
var	 gc = {
	myNum: null,
	changePlayerName : function (p1Name, p2Name) {
		if (this.myNum == 1) {
			$('.nickname')[1].innerHTML = p1Name;
			$('.nickname')[0].innerHTML = p2Name;
		} else {
			$('.nickname')[0].innerHTML = p1Name;
			$('.nickname')[1].innerHTML = p2Name;
		}
	},
	setFirstPlayer : function () {
		document.querySelector('#notiMessage').textContent = '선공입니다.';
	},
	setLastPlayer : function () {
		document.querySelector('#notiMessage').textContent = '후공입니다.';
	},
	setRemainingPoint : function (point) {
		document.querySelector('.possiblePoint').textContent = point;
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
	},
	startCount : function (){
		var x = 60;
		var c1 = 'red';

		$('#progress').html('<span></span><strong>'+x+'</strong>');

		this.interval = setInterval(function(){
			x--;
			if(x == 0){
				$('#progress').removeClass('seconds');

				this.stopCount();
			}

			if(x == 15){
				$('#progress').addClass('seconds');
			}

			var top = x*(525-105)/100;

			$('#progress').css({
				'background-position':'0px -'+top+'px'
			});

			var deg = (60 - x)*360/60;

			$('#progress span').css({
				'-webkit-transform': 'rotate('+deg+'deg)',
				'-moz-transform': 'rotate('+deg+'deg)',
				'-ms-transform':' rotate('+deg+'deg)',
				'-o-transform': 'rotate('+deg+'deg)',
				'transform': 'rotate('+deg+'deg)',
			})

			$('#progress strong').html(x);
		}.bind(this),1000)
	},
	stopCount : function () {
		clearInterval(this.interval);
		$('#progress').html('');
	},
	showInvalidPointPopover : function () {
		var inputEl = document.querySelector('#inputPoint');
		var msg = "잘못된 입력, 다시 입력하여 주세요";

		function vibrate(el){
			el.classList.add('shake');
		}
		function alertMsg(el, msg) {
			setMessage(el, msg);
			debugger;
			el.classList.add('visible');
		}

		function setMessage(el, msg) {
			el.innerText = msg;
		}

		var bubbleEl = document.querySelector('.bubble');
		vibrate(inputEl);
		alertMsg(bubbleEl, msg);
	},
	showNotiModal : function (oInfo) {
		if (!oInfo.title) {
			oInfo.title = '<img src="./img/logo.png" width="200px" alt="" />'
		}
		modal.show(oInfo);
	},
	hideNotiModal : function () {
		modal.hide();
	},
	setRound : function (round) {
		var roundEl = document.querySelector('#roundNum');
		roundEl.textContent = round;
	},
	setScore : function (p1Score, p2Score) {
		if (this.myNum == 1) {
			var p1ScoreEl = document.querySelector('#myScore');
			var p2ScoreEl = document.querySelector('#urScore');
		} else{
			var p1ScoreEl = document.querySelector('#urScore');
			var p2ScoreEl = document.querySelector('#myScore');
		}
		p1ScoreEl.textContent = p1Score;
		p2ScoreEl.textContent = p2Score;
	},
	setPointRange : function (num, playerNum) {
		if (playerNum == this.myNum) {
			var elGaugeBoard = document.querySelectorAll('.pointGauge')[1];
		} else{
			var elGaugeBoard = document.querySelectorAll('.pointGauge')[0];
		}

		var pointRangeEl = elGaugeBoard.querySelectorAll('td');
		var length = pointRangeEl.length;
		var startingPoint = 5 - num;
		for (var i = 0; i < length; i++) {
			if (i < startingPoint) {
				puffCell(pointRangeEl[i]);
			} else {
				pointRangeEl[i].style.display = 'table-cell';
			}
		};

		function animatePuff(elPuff) {
			var bgTop = 0,
			frame = 0,
			frames = 6,
			frameSize = 32,
			frameRate = 80;
			var animate = function(){
				if(frame < frames){
					elPuff.style.backgroundPosition = "0 "+bgTop+"px"
					bgTop = bgTop - frameSize;
					frame++;
					setTimeout(animate, frameRate);
				}
			};
			animate();
			setTimeout(function() {
				elPuff.parentElement.style.display = 'none';
				elPuff.parentElement.removeChild(elPuff);
			}, frames * frameRate);
		}

		function puffCell (elCell) {
			elCell.style.position = 'relative';
			var elPuff = document.createElement('div');
			elPuff.classList.add('puff');
			elCell.appendChild(elPuff);
			animatePuff(elPuff);
		}
	},
	setBlackAndWhite : function (playerNum, bw) {
		if(playerNum === this.myNum) {
			var colorEl = document.querySelectorAll('.flip-container')[1];
		} else {
			var colorEl = document.querySelectorAll('.flip-container')[0];
		}

		if (bw === 'B') {
			colorEl.querySelector('.back').style.backgroundColor = 'black';
			colorEl.classList.add('hover');
		} else if (bw === 'W') {
			colorEl.querySelector('.back').style.backgroundColor = 'white';
			colorEl.classList.add('hover');
		}
	},
	resetBlackAndWhite : function () {
		var colorEl = document.querySelectorAll('.flip-container');

		for (var i = 0; i < colorEl.length; i++) {
			colorEl[i].classList.remove('hover');
		}
	},
	resetColor : function () {
		this.resetPrevBlackAndWhite();
		this.resetBlackAndWhite();
	},
	setPrevBlackAndWhite : function (playerNum, round, bw) {
		if(round == 9)
			return;

		if(playerNum === this.myNum) {
			var aPrevColorEl = document.querySelectorAll('#myBNWbyRound td');
		} else {
			var aPrevColorEl = document.querySelectorAll('#urBNWbyRound td');
		}
		if (bw === 'B') {
			aPrevColorEl[round-1].style.backgroundColor = 'black';
		} else if (bw === 'W') {
			aPrevColorEl[round-1].style.backgroundColor = 'white';
		}
	},
	resetPrevBlackAndWhite : function () {
		var myPrevColorEl = document.querySelectorAll('#myBNWbyRound td');
		var urPrevColorEl = document.querySelectorAll('#urBNWbyRound td');

		for (var i = 0; i < myPrevColorEl.length; i++) {
			myPrevColorEl[i].style.backgroundColor = '#ffd541';
		}

		for (var i = 0; i < urPrevColorEl.length; i++) {
			urPrevColorEl[i].style.backgroundColor = '#ffd541';
		}
	},
	appendMessage : function (playerNum, message) {
		if (!message) {
			return;
		}

		var chatMsgEl = $('#chatMsg')[0];
		var chatMsgListEl = $('#chatMsg ul')[0];
		if(playerNum === this.myNum) {
			var inputString = "<li class='myMessage'><span>" + message + "</span></li>";
		} else {
			var inputString = "<li><span>" + message + "</span></li>";
		}
		chatMsgListEl.innerHTML += inputString;
		chatMsgEl.scrollTop = chatMsgEl.scrollHeight;
	},
	reduceBlurVideo: function (playerNum) {
		if (document.querySelectorAll('video').length < 2) {
			return;
		}

		var videoEl;
		if (this.myNum == playerNum) {
			videoEl = document.querySelectorAll('video')[1];
		} else {
			videoEl = document.querySelectorAll('video')[0];
		}

		if (videoEl.classList.length == 2) {
			videoEl.classList.add('blur3');
			return;
		}

		var blurClass = videoEl.classList[2];
		var blurNum = blurClass.slice(-1);

		if (blurNum >=1 ) {
			videoEl.classList.remove(blurClass);
			var newBlurClass = "blur" + (--blurNum);
			videoEl.classList.add(newBlurClass);
		}

	},
	connectToRoom : function (room) {
		this.conference = RTC({
			constraints: {
					video: true,
					audio: false
				},
		    signaller: 'https://switchboard.rtc.io',

				ice: [
					{ url: 'stun:stun1.l.google.com:19302' },
					{ url: 'stun:stun2.l.google.com:19302' },
					{ url: 'stun:stun3.l.google.com:19302' },
					{ url: 'stun:stun4.l.google.com:19302' }
				],

			room: 'bnw2online:' + room
		});
		console.log('bnw2online:' + room);
	}
}
