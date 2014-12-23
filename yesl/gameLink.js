var express = require('express');
var app = express();
var fs = require('fs');
var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);

// app.listen('3000', function(){
// 	console.log("Listening on 3000");
// });

// app.get('/', function(req, res){
//  // fs.readFile('gameui.html', function(err, data){
// 	//  res.writeHead(200, {'Content-Type':'text/html'});
// 	//  res.end(data);
// 	//  });
//  	res.sendFile(__dirname + '/gameui.html');
// });

app.use(express.static(__dirname));

var socketid = null;

io.sockets.on('connection', function(clientSocket){
	if (!socketid) {
		socketid = clientSocket.id;
	}

	clientSocket.on('num', function(data){
		var newNum = 100 - data;
		//socket.emit으로 특정 사람한테 보내기 
		clientSocket.emit('processedNum', newNum);
		io.emit('firstPlayer');

		if (socketid) {
			console.log(socketid);
			io.to(socketid).emit('firstPlayer');
		}
	});


});

// io.sockets.on('processedNum', function(newData){
// 	io.sockets.connected[id].emit('leftNum',newdata);
// 	//다른 아이디에게도 emit은 어떻게??
// 	});
// });


// function processedNum(data){
// 	num= 100-data;
// 	return num;
// }

// });

