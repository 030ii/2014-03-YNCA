/*
createServer
make it listen

when connected, upload the basic html page// app.get

app.post(record the number of visitors in html)

app.get// connect to a new page which shows the number of total visitors
-----------

이러한 string 형태로 가는 것을"a=1&b=3&adsf=4"
bodyparser이 아래와 같은 json형태로 변환시켜준다. 그러면 key값에 대응하는 value값을 찾기 더 수월해진다.
var param = {
	"a" : 1,
	"b" : 3,
	"asdf" :4
}

param.b로 찾으면 되니깐 
*/


var app = require('express')();
var bodyParser = require('body-parser');
//http에서 request보낼 때 body부분에 들어가는 string을 json으로 parse
//(submit했을 때 보내는 값들. for example, form안의 input) 
app.use(bodyParser());

var fs = require('fs');
app.set('views', __dirname);
app.set('view engine', 'jade');

app.listen(8888, function(request, response){
	console.log("hi	");
});

app.get("/", function(req, res){
	fs.readFile("countVisitors.html", function(err, data){
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(data);
	});
});
//get, /count로 바꾸면 get으로 보내는것도 가능 (html에서도 action, method바꾸면...)

app.post("/some", function(req, res){
	var number = req.param('num');
	//form (element)으로 보내는 것의 이름을 param안에 넣음. (num이란 이름의...)
	//client name값이랑 param이랑 같아야.. 
	console.log(number);
	number++;

	res.render("countVisitors", {
		num: number
	});
});
