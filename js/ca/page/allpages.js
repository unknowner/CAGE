// All Pages
tools.Page.runtime.addOn = {}
tools.Page.runtime.allPages = function() {

	//Execute add ons from tools
	$.each(tools.Page.runtime.addOn, function(_i, _e) {
		_e();
	})
	// If found update bqh
	if($('form input[name="bqh"]:first').length > 0) {
		CastleAge.bqh = $('form input[name="bqh"]:first').val();
	}

	// remove 'more' from stats
	$('#main_ststb div:last-child::contains("more")').each(function() {
		$(this).html($(this).html().replace('more', ''));
	});
	// Favour points
	$('#cageFavorPoints > span').text($('#main_bn div[style*="persistent_bar_oracle.gif"]').text().trim());

	// Stat Points
	if($('#main_bntp a:contains("My Stats")').text().match(/\d+/g) !== null) {
		$('#cageStatPoints > span').text($('#main_bntp a:contains("My Stats")').text().match(/\d+/g)[0]);
		$('#cageStatPoints > img').attr('src', 'http://image4.castleagegame.com/graphics/keep_upgrade_orange.gif');
	} else {
		$('#cageStatPoints > span').text('');
		$('#cageStatPoints > img').attr('src', 'http://image4.castleagegame.com/graphics/keep_upgrade_green.gif');
	}

	//Stats background
	$('#main_sts').css('background', $('#main_bn').css('backgroundImage'));
	window.setTimeout(function() {
		$('#main_sts_container').css('background', $('#main_sts').css('backgroundImage'));
	}, 1000);
	// remove CA:HOD ad, etc...
	$('a[href="http://apps.facebook.com/castle_hod/?xprom=cax"]:first').parent('div:first').remove();
	if($('#globalContainer > div:first').height() == 80) {
		$('#globalContainer > div:first').hide();
	}

	// xp to next lvl
	if($('#st_2_5 strong:contains("to")').length == 0 && /\d+\/(\d+)/.exec($('#st_2_5 strong').text()) !== null) {
		$('#st_2_5 strong').text(/\d+/.exec($('#st_5').attr('title'))[0] + ' to ' + /\d+\/(\d+)/.exec($('#st_2_5 strong').text())[1]);
	}

	// reworkin results
	if($('div.results').length > 0) {
		$('div.results').attr('style', '');
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
		$('#hinvite_help, #nvbar_table').empty();
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
				post(_close, function() {
					$_element.slideUp('slow', function() {
						$_element.remove();
						$('#results_main_wrapper').hide();
					});
				});
			}).css('cursor', 'pointer');
		});
	}

	// fix loader
	$('#AjaxLoadIcon').removeClass('shield_wait');

	// Random popups (quests etc.)
	$('div.result_popup_message').css({
		'left' : '',
		'marginLeft' : 15
	});
};
