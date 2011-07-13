// All Pages
tools['Page'].runtime['allPages'] = function () {
	// New results closing $().next('br')
	$('div.results:has(img[src$="help_close_x.gif"])').each( function (_index, _element) {
		var $_element = $(_element);
		$('img[src$="help_close_x.gif"]', _element).unwrap().click( function () {
			$(this).css('height', 18).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
			$.get($('#PageURL').val() + '?close_result=global_top&signed_request=' + CastleAge.signed_request, function () {
				$_element.next('br').slideUp('slow', function() {
					$(this).remove();
				});
				$_element.slideUp('slow', function () {
					$_element.remove();
				});
			});
			//$(this).parents('div.results:first').next('br').hide();
		}).css('cursor', 'pointer');
		$(_element).unwrap();
	});
	//$('#main_sts').hide();
	//$('#nvbar').hide();
	$('#main_bntp').hide();
	$('#main_bn').hide();
	$('#main_bn_container').hide();
};