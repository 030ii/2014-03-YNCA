var http = require('http');
var app = require('express')();
var bodyParser = require('body-parser');
var fs = require('fs');
var jade = require('jade');


http.createServer(app).listen(8888, function(){
	console.log("server is running!");
});

app.get("/", function(request, response){
 fs.readFile("trySimple.html",function(err,data){
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end(data);
 });
});

app.use(bodyParser());

// app.post("/increment", function(request, response){
// 	var num = request.param('num');
// 	num++;

// 	fs.readFile("end.html", function(err, data){
		
// 		var result = data.replace("{{param}}", num);
// 		result = result.replace("{{param2}}", num++);
// 		result = result.replace("{{param3}}", num++);
// 		//num을 html로 넘기기 위해서 jade사용
// 		response.end(result);
// 	});
// // 	var jad = h1 |"The number is now" + num;               

// // 	response.send(jad);
// });


app.post("/increment", function(request, response){
	var num = request.param('num');
	num++;

	fs.readFile("end.jade", function(err, data){

		var fn = jade.compile(data);

		response.writeHead(200, {'Content-Type':"text/html"});
		response.end(fn({
			"param" : num,
			"param2" : num,
			"param3" : num
		}));

	});
// 	var jad = h1 |"The number is now" + num;               

// 	response.send(jad);
});

///////아래의 것도 같은 것. 근데 이것은 jade, express 연동한 것  
app.post("/increment", function(request, response){
	var num = request.param('num');
	num++;

	response.render("end",{
		"param" : num,
		"param2" : num,
		"param3" : num
	});
});


