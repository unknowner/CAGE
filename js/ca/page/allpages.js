// All Pages
tools['Page'].runtime['allPages'] = function() {

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

		// move results in container for better handling
	if($('div.results').length > 0) {
		$('#results_container').show().removeClass('results_container').addClass('cageResults').html($('#results_main_wrapper').html()).prepend('<img id="cageCloseResult" src="http://image4.castleagegame.com/graphics/help_close_x.gif">');
		$('#cageCloseResult').click(function() {
			$(this).css({
				'height' : 18,
				'margin-Left' : 34
			}).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
			$('#results_container').fadeOut('slow', function() {
				$(this).remove();
			});
		});
		$('#results_main_wrapper').remove();
		$('div.results').removeClass('results').addClass('blankedResults').attr('style', '').css('width', 728);
		// remove some stuff
		$('span.result_body > div:last:contains("Increase quest efficiency and battle prowess by growing your army")').prev().remove().end().prev().remove().end().remove();
		//fix some results eg out of stamina general image
		$('span.result_body:contains("Allocate skill points to Max") img:first').css('width', 160);
		// closing results
		$('div.blankedResults:has(img[src$="help_close_x.gif"])').each(function(_index, _element) {
			var $_element = $(_element);
			var $_img = $('img[src$="help_close_x.gif"]', _element);
			var _close = /(?:, ')(.+?close_result=.+?)(')/.exec($_img.parent('a').attr('onclick'))[1];
			console.log(_close);
			$_img.remove();
			$('#cageCloseResult').click(function() {
				$(this).css({
					'height' : 18,
					'margin-Left' : 34
				}).attr('src', 'http://image4.castleagegame.com/graphics/shield_wait.gif');
				$.post(_close + '&signed_request=' + CastleAge.signed_request, function() {
					$_element.fadeOut('slow', function() {
						$_element.remove();
						$('#results_container').hide();
					});
				});
			}).css('cursor', 'pointer');
		});
	}

};
