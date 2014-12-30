function animatePoof() {
        var bgTop = 0,
            frame = 0,
            frames = 6,
            frameSize = 32,
            frameRate = 80,
            puff = $('#puff');

        var animate = function(){
            if(frame < frames){
                puff.css({
                    backgroundPosition: "0 "+bgTop+"px"
                });
                bgTop = bgTop - frameSize;
                frame++;
                setTimeout(animate, frameRate);
            }
        };
        
        animate(); 
        setTimeout("$('#puff').hide()", frames * frameRate);
}

$(function() {
    $('td').click(function(e) {
        var xOffset = $(".main").offset().left;
        var yOffset = $(".main").offset().top + 10;
        $(this).css({
            opacity: 0
        }).show();
        

        $('#puff').css({
            left: e.pageX - xOffset + 'px',
            top: e.pageY - yOffset + 'px'
        }).show();

        animatePoof();
    });
});
