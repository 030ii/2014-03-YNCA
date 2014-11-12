var server= require("./server"); //server파일을 찾고 그 파일 안에서 exports를 찾는다.
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle ={}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/hello"] = requestHandlers.hello;

server.start(router.route, handle);
