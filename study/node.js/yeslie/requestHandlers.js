var querystring = require("querystring"); 

function start(response){
console.log("Request handler 'start' was called");

var body ='<html>'+'<head>'+ 
'<meta http-equiv="Content-Type" content="text/html; '+  'charset=UTF-8" />'+ 
'</head>'+ '<body>'+
'이름을 입력하세요.'+ '<br>'+ 
'<form action="/hello" method="post">'+  '<input type="text" name="text"></input>'+  '<input type="submit" value="입력" />'+  '</form>'+'</body>'+'</html>'; 

response.writeHead(200, {"Content-Type":"text/html"});
response.write(body);
response.end();

//blocking function used
// function sleep(milliSeconds){
//   var startTime = new Date().getTime();
//   while(new Date().getTime()< startTime + milliSeconds);

//nonblocking used
setTimeout(function(){
  response.writeHead(200, {"Content-Type":"text/plain"});
  response.write("Hello Start");
  response.end();
}, 10000);

// sleep(10000);
//
// return "Hello Start";
}

function hello(response, postData){

console.log("Request handler 'hello' was called");
response.writeHead(200, {"Content-Type":"text/plain"});
response.write("Hello" +querystring.parse(postData).text+ "님");
response.end();
}

exports.start = start;
exports.hello = hello;
