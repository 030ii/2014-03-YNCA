var express= require('express');
// bodyParser는 post 요청의 parameter를 다룰 때 사용합니다.
var bodyParser = require('body-parser');
// 나중에 post 요청에 파일 달아서 업로드 할 때 쓰일 듯?
// var multer = require('multer');
// fs는 파일을 읽어줍니다.
var fs = require('fs');
var mysql = require('mysql');

// INIT
// connect할 정보
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'ynca'
});

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer); // for parsing multipart/form-data


// LISTEN
//8888 port 번호에서 요청을 듣는다. 
app.listen(8888, function() {
	console.log("SERVER START!!!!!");
});

// URL MAPPING
//이 url은 이렇게 다룰거에요 
//get요청의 / 는 function(req,res).. 로 다룰거에요 
app.get("/", function(req, res) {
	// 1. fs.readFile로 myindex.html을 읽기
	fs.readFile("myindex.html", function(error, data) {
		// 2. (옵션. 아마 설정 안 해도 될거예요)
		// response header(응답 헤더)에 "html 파일" 이란 것을 알려줌
		res.writeHead(200, {"Content-Type": "text/html"});
		//data라는 이름의 인자로 받은 myindex.html파일을 꼬리에 붙인다.
		// (원래 본문 내용은 꼬리에 붙어가요)
		res.end(data);
	});
});

app.post('/users', function(req,res){
	var user = {
		// 잠깐!! post요청의 parameter를 req.body.{html에서 설정한 name}로 받아온다.
		// '{mysql 테이블의 column 이름과 동일해야 함}': parameter
		'userid': req.body.userid,
		'name': req.body.name,
		'address': req.body.address
	};

	var str = 'insert into users set ?';
	//위의 str을 갖고 query를 만들고 실행.
	//? 자리에 user object를 넣는다 
	var query = connection.query(str, user, function(err,result) {
		if (err) {
			//!!! 여기서는 에러 메세지만 출력하고 에러 처리는 하지 않아요(빠른 테스트를 위해서!)
			console.log(err);
		}
		// console.log(query);
		//뒤에 sucess를 달고 status code는 200코드를 보낸다. 
		res.send(200, 'success');
	});

});

app.get('/userlist', function(req, res){
	var str = 'select * from users';
	var query = connection.query(str, function(err, rows){
		if(err){
			//!!! 여기서는 에러 메세지만 출력하고 에러 처리는 하지 않아요(빠른 테스트를 위해서!)
			console.log(err);
		}
		res.send(200, rows);
		// console.log(rows);
	});
});
