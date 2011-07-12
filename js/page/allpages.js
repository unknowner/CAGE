// All Pages
tools['Page'].runtime['allPages'] = function () {
	// New results closing
	$('div.results img[src$="help_close_x.gif"]').each( function (_index, _element) {
		var $_that = $(this);
		$(_element).click( function () {
			var $_this = $(this);
			$_that.css('height', 18).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
			$.get($('#PageURL').val() + '?close_result=global_top&signed_request=' + CastleAge.signed_request, function () {
				$_this.parents('div.results:first').hide('slow', function () {
					$_this.remove();
				});
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