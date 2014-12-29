var interval;

function stopCountDown() {
	clearInterval(interval);
	$('#progress').html('');
}

function startCountDown(){
	var x = 60;
	var c1 = 'red';

	$('#progress').html('<span></span><strong>'+x+'</strong>');
	
	interval = setInterval(function(){
		x--;
		if(x == 0){
			$('#progress').removeClass('seconds');

			 stopCountDown();
		}

		if(x == 15){
			$('#progress').addClass('seconds');
		}
		
		var top = x*(525-105)/100;
		
		$('#progress').css({
			'background-position':'0px -'+top+'px'
		});
		
		var deg = (60 - x)*360/60;
		
		$('#progress span').css({
			'-webkit-transform': 'rotate('+deg+'deg)',
			'-moz-transform': 'rotate('+deg+'deg)',
			'-ms-transform':' rotate('+deg+'deg)',
			'-o-transform': 'rotate('+deg+'deg)',
			'transform': 'rotate('+deg+'deg)',
		})
		
		$('#progress strong').html(x);
	},1000)
}