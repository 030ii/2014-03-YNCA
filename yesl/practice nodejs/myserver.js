//express 프로젝트 생성, mysql연결
var express= require('express');
var routes= require('./routes');
var user=require('./routes/user');
var http=require('http');
var path=require('path');
var mysql=require('mysql');

http.createServer(function(request, response){

});
var connection=mysql.createConnection({
host: 'localhost',
port: 3306,
user: 'root',
password:'ynca',
database: 'ynca'
});


connection.connect(function(err){
if(err){
console.error('mysql connection error');
console.error(err);
throw err;
}
});
