var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/game.html');
});

var roomIdx = 1;

io.on('connection', function(socket){
	socket.on('join', function(){
		socket.join('room' + roomIdx);

		var playerNum = Object.size(io.sockets.adapter.rooms['room'+roomIdx]);	// 특정 방에 들어온 플레이어 수

		socket.emit('join', 'Welcome to room' + roomIdx);		
		//console.log(playerNum + '명 입장!');									// 한 방에 들어간 플레이어 수
		//console.log(io.sockets.adapter.rooms['room'+ roomIdx]);	// 그 방에 있는 플레이어들의 id

		/* 한 room에서 플레이어 수가 2명이 되면 (한 방에 2명이 들어가면) */
		if (playerNum === 2){
			roomIdx++; // 방 번호를 증가하여 새로운 방 생성

			console.log('room'+ roomIdx + ' 게임 시작');
			//gameStart('room' + roomIdx);

//			io.sockets.in('room'+roomIdx).emit('gameMessage', '게임을 시작합니다.'); //에러는 없지만 안나옴
//에러		io.socket.in('room'+roomIdx).emit('gameMessage', '게임을 시작합니다.');
		}
		
//		io.sockets.in('room'+roomIdx).emit('gameMessage', '게임을 시작합니다.');

		// socket.leave('room'+roomIdx);
		// console.log(io.sockets.adapter.rooms['room'+roomIdx]);
	});		

	socket.on('input', function(inputNum){
		// ~~
		console.log(inputNum + '으로 input 받았어요~');
	});

	// 새로고침 할 때 일어남
	socket.on('disconnect', function(){
		console.log(io.sockets.adapter.rooms['room'+roomIdx]);
		console.log('방 나감');
	});

});

/* 오브젝트 길이 구하는 함수 (플레이어 수 구하는 함수)
 * io.sockets.adapter.rooms['room'+roomIdx]는 오브젝트 형태로 보여지기 때문에
 * 몇 개의 소켓이 접속했는지 알기 위해 (몇 명이 접속했는지 알기 위해)
 */
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// /* 게임을 시작하는 함수 */
// function gameStart(theRoom){

// 	// io.sockets.in(theRoom).emit('gameMessage', 'Lets play BNW game'); // 안댐
	
// 	console.log('gameStart함수 들어옴');
	
// 	var roomObj = io.sockets.adapter.rooms[theRoom];

// 	// for (var player in roomObj){
// 	// 	// 플레이어 1, 2 생성 및 초기화
// 	// }

// 	// 게임 initialize
// 	// 게임 setFirstPlayer -> 선공/후공 알림

//	// 선공에게
//	// input하시오 메세지 출력
//	// input 받기 / input 에러 체크 (0~99) 후 input 완료 메세지 출력 

//	// 게임 calculate (black/white , 숫자범위)

//	// 후공에게
//	// input하시오 메세지 출력
//	// input 받기 / input 에러 체크 (0~99) 후 input 완료 메세지 출력 

//	// 게임 calculate (black/white , 숫자범위)
// };


/* 먼저 시작하는 플레이어를 알려주는 함수
 * 1 라운드에는 랜덤으로,
 * 2~9 라운드에는 이전 승리자가 먼저 시작하는 플레이
 */
setFirstPlayer : function(){
	if (this.round == 1) {	// 1 라운드
		var random = Math.floor(Math.random() * 2);	// 0~1 랜덤

		if (random == 1){
			this.firstPlayer = this.player1;
			this.secondPlayer = this.player2;
			}
		else { // random == 0
			this.firstPlayer = this.player2;
			this.secondPlayer = this.player1;
		}
	}
	else {	// 2~9 라운드 
		this.firstPlayer = this.winner; // winner에는 이전 승리자가 저장되어 있으므
		this.secondPlayer = this.loser;	
	}

	console.log(this.firstPlayer.name + "님 숫자를 입력해주세요.");	// 선공
};

http.listen(3000, function(){
	console.log('hello 3000');
});


// 라운드 별로 어떤 정보를 주고 받는지 * 콘솔로 찍기

/* 서버 콘솔찍을거 
1. room1 게임 시작
2. 당신은 선공/후공 입니다.
3. 선공은 input하세요.
4. 선공 input완료!
5. 선공은 black/white이고, 범위는 ~~입니다.
6. 후공은 input하세요.
7. 후공 input완료!
8. 후공은 black/white이고, 범위는 ~~입니다.
9. 이번 라운드 승자는 ~~입니다.
*/