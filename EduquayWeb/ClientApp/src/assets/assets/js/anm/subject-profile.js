$(document).scroll(function () {
	var y = $(this).scrollTop();
	var navWrap = $('#tblBasicInfo').offset().top - 100;
	
	console.log(y + ' - '+ navWrap);
	if (y > navWrap) {
		$('#showhidediv').fadeIn(100);
	}
	else{
		$('#showhidediv').fadeOut();
	}
});



function isFormValid(){
	return true;
}