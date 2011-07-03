// All Pages

tools['Page'].runtime['allPages'] = function() {

	// New results closing
	$('div.results img[src$="help_close_x.gif"]').each(function(_index, _element){
		var _href = $(this).parent().attr('href');
		$(_element).click(function(){
			$.post(_href);
			$(this).parents('div.results:first').hide('slow', function(){
				$(this).remove();
			});
			$(this).parents('div.results:first').next('br').hide();
		}).css('cursor', 'pointer');
		$(_element).unwrap();
	});

	//$('#main_sts').hide();
	//$('#nvbar').hide();
	$('#main_bntp').hide();
	$('#main_bn').hide();
	$('#main_bn_container').hide();
	
};
