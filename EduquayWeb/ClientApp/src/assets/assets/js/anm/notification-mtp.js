$('.modal-body').scroll(function() {
	var navWrap = 0;
	var subPopId = '';
	var y = $(this).scrollTop();
	if($(this).parent().attr('id') === 'modal-xl4'){
		navWrap = $('#tblBasicInfo14').offset().top;
		subPopId = "#showhidediv-pndt";
	}
	else if($(this).parent().attr('id') === 'modal-xl5'){
		navWrap = $('#tblBasicInfo15').offset().top;
		subPopId = "#showhidediv-mtp";
	}
	//console.log(y + ' : - : '+ navWrap);
	//console.log($('.modal-body').width());
	//console.log($(this).offset().top);
	var modalWidth = $(this).width();
	if (y > navWrap) {
		$(subPopId).fadeIn(100);
		$(subPopId).css('margin-left', '0px').css('width',	modalWidth-16 + 'px').css('top',($(this).offset().top) -16);
	}
	else{
		$(subPopId).fadeOut();
	}

});