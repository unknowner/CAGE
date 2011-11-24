// monster stats
tools['Page'].runtime['battle_monster.php'] = function() {

	console.log('Page: battle_monster.php');

	var _monstername = null;
	// add percentage to top bars
	if($('#app_body div[style*="nm_bars.jpg"], #app_body div[style*="nm_bars_cross.jpg"]').length > 0) {
		$('img[src*="monster_health_background.jpg"], [src*="nm_red.jpg"], [src*="nm_orange.jpg"]').each(function(_i, _e) {
			_monstername = $(_e).parent().parent().find('div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
			var _health = $(_e).parent()[0];
			if(_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
				var _percentage = _health.style.width.substr(0, 5);
				_monstername.text(_monstername.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
			}
		});
	} else {
		$('img[src*="monster_health_background.jpg"], [src*="nm_red.jpg"]').each(function(_i, _e) {
			_monstername = $(_e).parent().parent().parent().parent().find('div:contains("\'s Life"):last, div:contains("\'s life"):last');
			var _health = $(_e).parent()[0];
			if(_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
				var _percentage = _health.style.width.substr(0, 5);
				_monstername.text(_monstername.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
			}
		});
	}

	// add percentage to defense/forcefield/..
	var _defense = $('img[src*="bar_dispel.gif"],[src*="nm_green.jpg"],[src*="seamonster_ship_health.jpg"]').parent()[0];
	var _defText = $('#app_body div:textEquals("Ragnarok\'s Glacial Armor "):first, div:contains("Party Health/Strength"):last, #app_body div:textEquals("Skaar\'s Mana Forcefield "):first, #app_body div:contains("Illvasa, Plateau City\'s Defense"):last, #app_body div:textEquals("Castle Defense"):first, #app_body div:textEquals("Your Ship\'s Defense"):first');
	if(_defense && _defense.style && _defense.style.width !== "" && _defText && _defText.text()) {
		var _percentage = _defense.style.width.substr(0, 5);
		_defText.css('left', 51).text(_defText.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
	}

	// rearrange attack result
	if($('div.result').length > 0) {
		//resize Elite Guard boxes
		$('div.result div:textEquals("Elite Guard")').parent().find('div[style*="height:84px"]').css('height', 68);
		$('img[alt="Call to Elite Guard"]').parent().css({
			'height' : 68,
			'overflow' : 'hidden'
		});
		// add monster damage/health/... to result
		$('div.result:has(img[src*="graphics/button_monster_attack_again.gif"]) span.result_body div:last, div.result:contains(" Again!")').append('<div id="MonsterResultDamage"><div>' + _monstername.text() + '</div><div>' + _defText.text() + '</div><div>Your Damage/Activity: ' + $('td.dragonContainer tr:has(a[href*="' + CastleAge.userId + '"]) > td:last').text().trim() + '</div></div>');
		if($('div.result:contains(" Again!")').length > 0) {
			$('#MonsterResultDamage').css('float', 'none');
		}
	}

	// answer CTA
	$('#chat_log_tab').parent().append('<div id="cageCTATab" style="" class="imgButton"><div style="padding:10px 0 0 0;">Answer CTA</div></div>').click(function() {
		tools.Page.loadPage('battle_monster.php?' + $('form:has(div.imgButton > input[alt="Ask for help"]):first').serialize() + '&action=doObjective');
	});
};
