$(document).scroll(function () {
	var y = $(this).scrollTop();
	var navWrap = $('#tblBasicInfo').offset().top - 50;
	
	console.log(y + ' - '+ navWrap);
	if (y > navWrap) {
		$('#showhidediv').fadeIn(100);
	}
	else{
		$('#showhidediv').fadeOut();
	}
});