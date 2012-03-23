// symbolquests
tools['Page'].runtime['symbolquests.php'] = function() {

	// Add XP/Eng ratio to quests
	var _xp = $('div.qd_2 > b, div.qd_2_sub > b');
	$('div.quest_req, div.quest_req_sub').each(function(_i, _e) {
		var _ratio = parseInt($(_xp[_i]).text()) / parseInt($('div b', _e).text());
		$('> div:first', _e).append('<span style="color:#000;"> - Ratio: ' + _ratio.toString().substr(0, 4) + '</span>');
	});

	$('div.quest_act_gen:not(:has(img[src*="nogen.gif"]))').each(function() {
		$(this).append($('<img class="cageQuestSwitchGeneral" src="http://image4.castleagegame.com/graphics/quick_switch_button.gif">').click(function() {
			var _img = $(this);
			_img.fadeOut();
			tools['General'].setByName(_img.prevAll('img').attr('title'), function() {
				_img.fadeIn();
			});
		})).find('img:first').unwrap();
	});
	// Add sano to subquests
	if(tools.General.runtime.general.Sano) {
		$('div.quest_start:not(:last)').prepend($('<img class="cageQuestSanoSwitch" src="http://image4.castleagegame.com/graphics/hero_sano.jpg">').click(function() {
			tools.General.setByName('Sano');
		}));
	}
};
