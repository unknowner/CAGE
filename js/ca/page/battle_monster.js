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
	var _defense = $('img[src*="bar_dispel.gif"],[src*="nm_green.jpg"],[src*="seamonster_ship_health.jpg"]').parent()[0],
			_defRegs = [
				'^Castle Defense$',
				'^Ragnarok\'s Glacial Armor$',
				'^Your Ship\'s Defense$',
				'^Illvasa, Plateau City\'s Defense$',
				'^Skaar\'s Mana Forcefield$',
				'^Party Health.Strength$'
			], 
			_defText = $('#app_body div:containsRegex(/' + _defRegs.join('|') + '/):first');
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
	var _form = $('form:has(div.imgButton > input[alt="Ask for help"]):first').clone();
	_form.find('input[name="bqh"]').remove();
	if($('form:has(div.imgButton > input[alt="Ask for help"]):first').length == 1) {
		$('div > img[src*="siege"]:last').parent().append('<a href="http://apps.facebook.com/castle_age/battle_monster.php?' + _form.serialize() + '&action=doObjective"><img id="cageSummonCTA" src="http://image4.castleagegame.com/graphics/mp_button_summon.gif"></a>').unbind('click').click(function() {
			tools.Page.loadPage('battle_monster.php?' + $('form:has(div.imgButton > input[alt="Ask for help"]):first').serialize() + '&action=doObjective');
			return false;
		});
	}
	
	// monster stats
	var _bossReg = new RegExp([
		'monster_\\w+_large.jpg',
		'boss_\\w+_large.jpg',
		'boss_\\w+_big.jpg',
		'nm_\\w+_large.jpg',
		'nm_\\w+_large2.jpg',
		'monster_\\w+_large_ca.jpg',
		'seamonster_(?!ship_health)\\w*.jpg',
		'seamonster_dead.jpg',
		'dragon_monster_\\w+.jpg',
		'boss_\\w+.jpg',
		'\\w+_large.jpg',
	].join('|')), _img = false;
	$('#app_body div > img:first-child').each(function(){
		if(_bossReg.exec($(this).attr('src')) !== null){
			_img = $(this);
			return false;
		}
	});
	if(_img !== false){
		_img.parent('div:first').css('position', 'relative').append('<div id="cageMonsterStats">');
		var $this, _attackers = 0, _temp = '', _max, _levels, _hod, $stats = $('#cageMonsterStats');
		$('td.dragonContainer table tr td:eq(1) table tr').each(function(){
			$this = $(this);
			if($this.text() !== ''){
				if(/Levels|Heart of Darkness/.test($this.text()) === true){
					if(_temp !== ''){
						$stats.append(_temp + _attackers + '</span>' + _max +'</div>');
						_attackers = 0;
						_temp = '';
						_max = '';
					}
					_attackers = 0;
					_hod = 'Levels ';
					if(/Levels/.test($this.text()) === true){
						_max = '/' + /\[(\d+)\s+max\]/.exec($this.text())[1];
						_levels = $this.text().match(/\d+-\d+|\d+\+|\d+/);
					} else {
						_hod = 'Heart of Darkness ';
						_levels = '';
						_max = '';
					}
					_temp = '<div><span style="display:inline-block;font-weight:bold;width:125px;">'+ _hod + _levels + '</span><span style="display:inline-block;width:25px;text-align:right;">';
					
				} else {
					_attackers += 1;
				}
			}
		});
		if(_temp !== ''){
			$stats.append(_temp + _attackers + '</span>' + _max +'</div>');
		} else {
			$stats.append('<div><span style="display:inline-block;font-weight:bold;width:125px;">Attackers: </span><span style="display:inline-block;width:25px;text-align:right;">' + _attackers + '</span></div>')
		}
	}
};
