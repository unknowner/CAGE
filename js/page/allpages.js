// All Pages
tools['Page'].runtime['allPages'] = function () {
	if ($('#globalContainer > div:first').height() == 80) {
		$('#globalContainer > div:first').remove();
	}
	$('div.results:has(img[src$="help_close_x.gif"])').each(function (_index, _element) {
		var $_element = $(_element);
		var $_img = $('img[src$="help_close_x.gif"]', _element);
		var _close = $_img.parent('a').attr('onclick').match('global_bottom') !== null ? 'global_bottom' : 'global_top';
		$_img.unwrap().click(function () {
			$(this).css('height', 18).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
			$.get($('#PageURL').val() + '?close_result=' + _close + '&signed_request=' + CastleAge.signed_request, function () {
				$_element.next('br').slideUp('slow', function () {
					$(this).remove();
				});
				$_element.slideUp('slow', function () {
					$_element.remove();
				});
			});
		}).css('cursor', 'pointer');
		$(_element).unwrap();
	});
	$('#main_bntp').hide();
	$('#main_bn').hide();
	$('#main_bn_container').hide();
};