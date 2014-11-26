// document.getElementById('getlist').addEventListener('click', function(){
// debugger;
//select all
app.get('/users', function(req,res){
    var query = connection.query('select * from users',function(err,rows){
        console.log(rows);
        res.json(rows);
    });
    console.log(query);
});

// });

document.getElementById('enter').addEventListener('click',function(){
// insert
debugger;
app.post('insert',function(req,res){
    var user = {'userid':req.body.userid,
                'name':req.body.name,
                'address':req.body.address};
    var query = connection.query('insert into users set ?',user,function(err,result){
        if (err) {
            console.error(err);
            throw err;
        }
        console.log(query);
        res.send(200,'success');

});