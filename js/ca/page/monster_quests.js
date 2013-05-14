// monsterquests
tools.Page.pages['monster_quests.php'] = function() {

	console.log('Page: monster_quests.php');
	// Add XP/Eng ratio to quests
	var _xp = $('div.qd_2 > b, div.qd_2_sub > b');
	$('div.quest_req, div.quest_req_sub').each(function(_i, _e) {
		var _ratio = parseInt($(_xp[_i]).text()) / parseInt($('div b', _e).text());
		$('> div:first', _e).append('<span style="color:#000;"> - Ratio: ' + _ratio.toString().substr(0, 4) + '</span>');
	});
	// Add button to faster switch generals
	$('div.quest_act_gen:not(:has(img[src*="nogen.gif"]))').each(function() {
		if (tools.General.runtime.general[$(this).find('img[title]:first').attr('title')]) {
			$(this).append($('<img class="cageQuestSwitchGeneral" src="http://image4.castleagegame.com/graphics/quick_switch_button.gif">').click(function() {
				var _img = $(this);
				_img.fadeOut();
				tools.General.setByName(_img.prevAll('img').attr('title'), function() {
					_img.fadeIn();
				});
			})).find('img:first').unwrap();
		}
	});

	/*
	 * Hide complete quests
	 */

	function showHideQuests(_hide) {
		if (_hide) {
			$('div.quests_background, div.quests_background_sub').each(function(_i, _e) {
				var _influence = /INFLUENCE: (\d+)%/g.exec($(_e).text());
				if (_influence.length === 2 && _influence[1] === '100') {
					$(_e).hide();
				}
			});
		} else {
			$('div.quests_background, div.quests_background_sub').show();
		}
	}
	// Add hide/show checkbox
	$('table.quests_layout').prepend($('<div id="cagePageQuestsHide" style="margin-left: 31px;" class="cageAlchemyButtons"><img src="http://image4.castleagegame.com/graphics/boss_lotus_help2.gif"><span></span><span>Hide completed quests</span></div>').toggle(function() {
		$('#cagePageQuestsHide').find('span:first').html('&#10003').end().children('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help3.gif');
		item.set('cage.Page.monster_quests.hide', true);
		showHideQuests(true);
	}, function() {
		$('#cagePageQuestsHide').find('span:first').html('').end().children('img').attr('src', 'http://image4.castleagegame.com/graphics/boss_lotus_help2.gif');
		item.set('cage.Page.monster_quests.hide', false);
		showHideQuests(false);
	}));

	if (item.get('cage.Page.monster_quests.hide', false) === true) {
		$('#cagePageQuestsHide').click();
	}

	// remove some ugly space ;)
	$('table.quests_layout tr').find('div[style="width: 730px; height: 28px;"]').remove();

};
