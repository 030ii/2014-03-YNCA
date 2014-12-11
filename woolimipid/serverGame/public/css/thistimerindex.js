var interval;
var x = 0;
$(function(){
	var c1 = 'red';
	$('#progress').html('<span></span><strong>'+x+'</strong>');
	start();
})

function start(){
	interval = setInterval(function(){
		x++;
		if(x == 100){
			 clearInterval(interval);
			 setTimeout(function(){
				 x = 0;
			 	start();
			 },1000)
		}
		
		var top = x*(525-105)/100;
		
		$('#progress').css({
			'background-position':'0px -'+top+'px'
		});
		
		var deg = x*360/100;
		
		$('#progress span').css({
			'-webkit-transform': 'rotate('+deg+'deg)',
			'-moz-transform': 'rotate('+deg+'deg)',
			'-ms-transform':' rotate('+deg+'deg)',
			'-o-transform': 'rotate('+deg+'deg)',
			'transform': 'rotate('+deg+'deg)',
		})
		
		$('#progress strong').html(x);
	},200)
}