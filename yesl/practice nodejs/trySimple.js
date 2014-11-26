// var http = require('http');
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

//createServer,
//make it listen, ready to receive request
app.listen(8888,function(){
	console.log("server is running");
});

//post/put/delete (data가 body있을)때 recieve the input
//get은 url에 붙어서 감. ?num=1...
app.use(bodyParser());
//string 을 json으로 바꿔주는
//.json이랑 차이는==>version 차이인듯..

//get html file and show 
// app.get('/', function(req, res){
//   res.sendfile(__dirname + '/trySimple.html');
//   res.end(data);
// });
app.get("/", function(request, response, next){
	//왜 여기선 인자가 error, data==>readFile api

	// jade 사용하기.
	fs.readFile("trySimple.html", function(error, data){
		if(err) throw err;

		response.writeHead(200, {"Content-Type": "text/html"});
		response.end(data);
	});
	next();
});

//post는 input을 받고 응답받은 page로 이동.
app.post("/increment", function(request, response){
	var num = request.param('num');
	// 여기에 id를 쓰는 것? name? class?
	num++;
	var html = '<h1> sum is now' + num + '.</h1>';
	// jade 사용하기.
	response.send(html);
});