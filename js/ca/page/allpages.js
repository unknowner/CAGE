// All Pages
tools['Page'].runtime['allPages'] = function () {

	$('a[href="http://apps.facebook.com/castle_hod/?xprom=cax"]:first').parent('div:first').hide();
	if ($('#globalContainer > div:first').height() == 80) {
		$('#globalContainer > div:first').hide();
	}
	// xp to next lvl
	$('#main_ststb > div:first').css({
		'height': 16,
		'marginBottom': -2
	});
	$('div.st_row_2').css('marginTop', 2);
	$('#st_5 div.lvlBr div').css('height', 13).addClass('ui-corner-all');
	$('#st_2_5 strong').text(/\d+/.exec($('#st_5').attr('title'))[0] + ' to ' + /\d+\/(\d+)/.exec($('#st_2_5 strong').text())[1]);
	// closing results
	$('div.results:has(img[src$="help_close_x.gif"])').each( function (_index, _element) {
		var $_element = $(_element);
		var $_img = $('img[src$="help_close_x.gif"]', _element);
		var _close = /(?:, ')(.+?close_result=.+?)(')/.exec($_img.parent('a').attr('onclick'))[1];
		$_img.unwrap().click( function () {
			$(this).css('height', 18).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
			$.post(_close + '&signed_request=' + CastleAge.signed_request, function () {
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

};