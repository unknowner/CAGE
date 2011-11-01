// All Pages
tools['Page'].runtime['allPages'] = function() {

	// Possible fix for framing problem
	$('body').removeClass('center_fixed_width_app');

	// If found update bqh
	if($('input[name="bqh"]:first').length > 0) {
		CastleAge.bqh = $('input[name="bqh"]:first').val();
	}

	// remove CA:HOD ad
	$('a[href="http://apps.facebook.com/castle_hod/?xprom=cax"]:first').parent('div:first').hide();
	if($('#globalContainer > div:first').height() == 80) {
		$('#globalContainer > div:first').hide();
	}
	// xp to next lvl
	$('#main_ststb > div:first').css({
		'height' : 16,
		'marginBottom' : -2
	});
	$('div.st_row_2').css('marginTop', 2);
	$('#st_5 div.lvlBr div').css('height', 13).addClass('ui-corner-all');
	$('#st_2_5 strong').text(/\d+/.exec($('#st_5').attr('title'))[0] + ' to ' + /\d+\/(\d+)/.exec($('#st_2_5 strong').text())[1]);

	// reworkin results
	if($('div.results').length > 0) {
		$('div.results').attr('style', '').css({
			'width' : 728,
			'border' : '0'
		});
		$('#results_main_wrapper').addClass('resultsmainwrapper').prepend('<img id="cageCloseResult" src="http://image4.castleagegame.com/graphics/popup_close_button.png">');
		$('#results_main_wrapper > br').remove();
		$('#cageCloseResult').click(function() {
			$(this).unbind('click').css({
				'width' : 18,
				'top' : 2,
				'right' : 3
			}).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
			$('#results_main_wrapper').slideUp('slow', function() {
				$(this).remove();
			});
		});
		// remove some stuff
		$('span.result_body > div:last:contains("Increase quest efficiency and battle prowess by growing your army")').prev().remove().end().prev().remove().end().remove();
		//fix some results eg out of stamina general image
		$('span.result_body:contains("Allocate skill points to Max") img:first').css('width', 160);
		// closing results
		$('div.results:has(img[src$="help_close_x.gif"])').each(function(_index, _element) {
			var $_element = $(_element);
			var $_img = $('img[src$="help_close_x.gif"]', _element);
			var _close = /(?:, ')(.+?close_result=.+?)(')/.exec($_img.parent('a').attr('onclick'))[1];
			$_img.remove();
			$('#cageCloseResult').click(function() {
				$(this).unbind('click').css({
					'width' : 18,
					'top' : 2,
					'right' : 3
				}).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
				$.post(_close + '&signed_request=' + CastleAge.signed_request, function() {
					$_element.slideUp('slow', function() {
						$_element.remove();
						$('#results_main_wrapper').hide();
					});
				});
			}).css('cursor', 'pointer');
		});
	} else {
		$('#results_main_wrapper').css('border', 0);
	}

};
