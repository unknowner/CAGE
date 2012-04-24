// monster stats
tools.Page.runtime['battle_monster.php'] = function() {

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

	var _defense = tools.Page.runtime['defense'](), _stun = tools.Page.runtime['stun_bar']().replace('Need ', '');

	// rearrange attack result
	if($('div.result').length > 0) {
		//resize Elite Guard boxes
		$('div.result div:textEquals("Elite Guard")').parent().find('div[style*="height:84px"]').css('height', 68);
		$('img[alt="Call to Elite Guard"]').parent().css({
			'height' : 68,
			'overflow' : 'hidden'
		});
		// add monster damage/health/... to result
		if($('td.dragonContainer tr:has(a[href*="' + CastleAge.userId + '"]) > td:last').length > 0) {
			$('div.result:has(img[src*="graphics/button_monster_attack_again.gif"]) span.result_body div:last, div.result:contains(" Again!")').append('<div id="MonsterResultDamage"><div>' + _monstername.text() + '</div><div>' + _defense + '</div><div>' + _stun + '</div><div>Your Damage/Activity: ' + $('td.dragonContainer tr:has(a[href*="' + CastleAge.userId + '"]) > td:last').text().trim() + '</div></div>');
			if($('div.result:contains(" Again!")').length > 0) {
				$('#MonsterResultDamage').css('float', 'none');
			}
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

	tools.Page.runtime['battleStats']();

};
tools.Page.runtime['defense'] = function() {
	// add percentage to defense/forcefield/..
	var _defense = $('img[src*="bar_dispel.gif"],[src*="nm_green.jpg"],[src*="seamonster_ship_health.jpg"]').parent()[0], _defRegs = ['^Castle Defense$', '^Ragnarok\'s Glacial Armor$', '^Your Ship\'s Defense$', '^Illvasa, Plateau City\'s Defense$', '^Skaar\'s Mana Forcefield$', '^Party Health\\/Strength$'], _defText = $('#app_body div:containsRegex(/' + _defRegs.join('|') + '/):first');
	if(_defense && _defense.style && _defense.style.width !== "" && _defText && _defText.text()) {
		var _percentage = _defense.style.width.substr(0, 5);
		var _maxHealth = false;
		if(/^Party Health\/Strength$/.test(_defText.text())) {
			_maxHealth = _defText.parent().prev().find('div:first')[0].style.width.substr(0, 5);
			_defText.css('left', 51).text('Party Health ' + _percentage + (_percentage.indexOf('%') > -1 ? '' : '%') + ' / Strength ' + _maxHealth + (_maxHealth.indexOf('%') > -1 ? '' : '%'));
		} else {
			_defText.css('left', 51).text(_defText.text() + '(' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)'));
		}
		return _defText.text();
	}
	return '';
}
tools.Page.runtime['stun_bar'] = function() {
	// add percentage to Cripple...
	var _stun = $('#app_body div > img[src$="nm_stun_bar.gif"]:first');
	if(_stun.length > 0) {
		var _text = _stun.parent().next().children('div:first');
		_stun = _stun[0].style.width.substr(0, 5);
		_text.text(_text.text() + ' ' + _stun + (_stun.indexOf('%') > -1 ? '' : '%'));
		return _text.text();
	}
	return '';
}
tools.Page.runtime['battleStats'] = function() {
	// monster stats
	var _bossReg = new RegExp(['monster_\\w+_large.jpg', 'boss_\\w+_large.jpg', 'boss_\\w+_big.jpg', 'nm_\\w+_large.jpg', 'nm_\\w+_large2.jpg', 'monster_\\w+_large_ca.jpg', 'seamonster_(?!ship_health)\\w*.jpg', 'seamonster_dead.jpg', 'dragon_monster_\\w+.jpg', 'boss_\\w+.jpg', '\\w+_large.jpg', '\\/monster_(?!health)\\w+.jpg'].join('|')), _img = false;

	$('#app_body table.layout td > div:gt(2) div:not([id][alt][title]) > img:only-child').each(function() {
		if(_bossReg.exec($(this).attr('src')) !== null) {
			_img = $(this);
			return false;
		}
	});
	if(_img !== false) {
		_img.parent('div:first').css('position', 'relative').append('<div id="cageMonsterStats">');
		var $this, _attackers = 0, _temp = '', _max, _levels, _hod, $stats = $('#cageMonsterStats'), _ownDamage = null, _dmgType = null, _allDamage = {
			Activity : 0,
			dmg : 0,
			def : 0
		};
		$('td.dragonContainer table tr td:eq(1) table tr').each(function() {
			$this = $(this);
			if($this.text() !== '') {
				var _line = $this.find('td:last').text().trim();
				if(_dmgType === null) {
					if(_line === 'Activity') {
						_dmgType = 'Activity'
					} else if(_line.indexOf('dmg') > -1) {
						_dmgType = 'dmg'
					}
					console.log('_dmgType', _dmgType);
				}
				if(isNaN(parseInt(_line.replace(/\D/g, ''))) === false) {
					if(_dmgType === 'dmg') {
						_allDamage['dmg'] += parseInt(_line.split('/')[0].replace(/\D/g, ''));
						_allDamage['def'] += parseInt(_line.split('/')[1].replace(/\D/g, ''));
					} else {
						_allDamage[_dmgType] += parseInt(_line.replace(/\D/g, ''));
					}
					if($this.html().indexOf(CastleAge.userId) > -1) {
						_ownDamage = _line;
					}
				}
				if(/Levels|Heart of Darkness/.test($this.text()) === true) {
					if(_temp !== '') {
						$stats.append(_temp + _attackers + '</span>' + _max + '</div>');
						_attackers = 0;
						_temp = '';
						_max = '';
					}
					_attackers = 0;
					_hod = 'Levels ';
					if(/Levels/.test($this.text()) === true) {
						_max = '/' + /\[(\d+)\s+max\]/.exec($this.text())[1];
						_levels = $this.text().match(/\d+-\d+|\d+\+|\d+/);
					} else {
						_hod = 'Heart of Darkness ';
						_levels = '';
						_max = '';
					}
					_temp = '<div><span style="display:inline-block;font-weight:bold;width:125px;">' + _hod + _levels + '</span><span style="display:inline-block;width:25px;text-align:right;">';
				} else {
					_attackers += 1;
				}
			}
		});
		if(_temp !== '') {
			$stats.append(_temp + _attackers + '</span>' + _max + '</div>');
		} else {
			$stats.append('<div><span style="display:inline-block;font-weight:bold;width:125px;">Attackers: </span><span style="display:inline-block;width:25px;text-align:right;">' + _attackers + '</span></div>');
		}
		if(_ownDamage !== null) {
			$stats.before($('<div class="cageMonsterActivity"><span style="display:inline-block;font-weight:bold;width:80px;">My activity</span><span style="display:inline-block;float:right;text-align:right;">' + _ownDamage + '</span></div>').css('bottom', $stats.find('div').length * 13 + 59));
		}
		$stats.before($('<div class="cageMonsterActivity"><span style="display:inline-block;font-weight:bold;width:80px;">Activity</span><span style="display:inline-block;float:right;text-align:right;">' + _allDamage[_dmgType].toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + (_dmgType === 'dmg' ? ' dmg / ' + _allDamage.def.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + ' def' : '') + '</span></div>').css('bottom', $stats.find('div').length * 13 + 23));

		if($('span.target_monster_info').length > 0) {
			var _div = $('span.target_monster_info:first').parent();
			_div.css({
				'top' : -2,
				'zIndex' : 1
			}).parent().parent().prepend(_div);

		}
	}

};
