npm install mysql 

//step1
var mysql = require('mysql');
//step2
//어느 디비를 사용할 것인지 
var conn = mysql.createConnection(){
	host:"localhost",
	user: "root",
	password: "",
	database: "gameusers"
};

then using the connection object,pass the query and add a callback wth error&result
//step3 sql query 만들기
var queryString = "select * from users order by score desc";
conn.query(queryString, function(error, results){
	//consists of number of rows, log all the result on console
	if(error){
	throw error;
	}
	else{
	console.log(results);
	}
}
//to stop the connection
conn.end;
)

//creating mysql connection pool
var conn = mysql.createPool(){
	host:"localhost",
	user: "root",
	password: "",
	database: "gameusers"
};

pool.getConnection(function(error, conn){
	var queryString = "select * from users order by score desc";
	conn.query(queryString, function(error, results){
	
	if(error){
	throw error;
	}
	else{
	console.log(results);
	}
}
	)
	conn.release();
});











