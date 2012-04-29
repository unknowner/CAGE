tool('Monster');

tools.Monster.settings = function() {

	tools.Assister.runtimeUpdate();
	tools.Settings.heading(language.monsterSetName);
	tools.Settings.text('');
	tools.Settings.onoff(language.monsterSetCloseInstant, tools.Monster.runtime.closeInstant, 'cageMonsterCloseInstant', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetTransparent, tools.Monster.runtime.transparent, 'cageMonsterTransparent', tools.Monster.runtimeUpdate);
	tools.Settings.text(language.monsterSetDescMonster);
	tools.Settings.onoff(language.monsterSetMonster, tools.Monster.runtime.toCheck.monster, 'cageMonsterMonster', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetFestival1, tools.Monster.runtime.toCheck.festival1, 'cageMonsterFestival1', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetFestival2, tools.Monster.runtime.toCheck.festival2, 'cageMonsterFestival2', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetRaid, tools.Monster.runtime.toCheck.raid, 'cageMonsterRaid', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetConquest, tools.Monster.runtime.toCheck.conquest, 'cageMonsterConquest', tools.Monster.runtimeUpdate);
};
tools.Monster.runtimeUpdate = function() {

	tools.Monster.runtime = {
		listFilled : tools.Monster.runtime ? tools.Monster.runtime.listFilled : false,
		closeInstant : item.get('cageMonsterCloseInstant', false),
		transparent : item.get('cageMonsterTransparent', false),
		toCheck : {
			festival1 : item.get('cageMonsterFestival1', true),
			festival2 : item.get('cageMonsterFestival2', true),
			monster : item.get('cageMonsterMonster', true),
			raid : item.get('cageMonsterRaid', true),
			conquest : item.get('cageMonsterConquest', true)
		},
		conquestLands : item.get('cageMonsterConquestLands', {})
	};
	$('#cageMonsterContainer').css('opacity', tools.Monster.runtime.transparent ? 0.7 : 1);
};
tools.Monster.init = function() {
	$('#cageContainer').append('<div id="cageMonsterContainer" class="ui-corner-bottom ui-widget-content"></div>');
	tools.Sidebar.button.add('cageMonsterStart', language.monsterButton, function() {
		tools.Sidebar.button.disable('cageMonsterStart');
		tools.Monster.start();
	});
	tools.Monster.runtimeUpdate();
};
tools.Monster.start = function() {
	if(!tools.Monster.runtime.listFilled) {
		tools.Monster.runtime.listFilled = true;
		$('#cageMonsterContainer').empty().append('<span id="cageMonsterReload">Loading...</span>').append($('<img id="cageMonsterClose" src="http://image4.castleagegame.com/graphics/popup_close_button.png">').click(tools.Monster.done));
		tools.Monster.runtime.checkFor = [];
		$.each(tools.Monster.runtime.toCheck, function(_i, _e) {
			if(_e === true) {
				tools.Monster.runtime.checkFor.push(_i);
			}
		});
		tools.Monster.checkFor();
	}
	$('#cageMonsterContainer').show().animate({
		'top' : 80
	}, 'slow');

};
tools.Monster.checkFor = function() {
	if(tools.Monster.runtime.checkFor !== undefined && tools.Monster.runtime.checkFor.length > 0) {
		setTimeout(tools.Monster[tools.Monster.runtime.checkFor.shift()], 100);
	} else {
		$('#cageMonsterReload').text('Reload').click(function() {
			tools.Monster.runtime.listFilled = false;
			tools.Monster.start();
		});
	}
};
tools.Monster.monster = function() {
	signedGet('player_monster_list.php', function(_monster) {
		_monster = $(noSrc(_monster));
		$('table.layout:first div[style="padding:0 0 15px 0;"] > div', _monster).each(function(_i, _e) {
			var _e = $(_e);
			var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', 'url(' + _e.find('img:first').attr('nosrc') + ')');
			var _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if(_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(1) > div:first > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(2) form')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/monster_button_yourmonster_on.jpg">');
			$('#cageMonsterContainer').append(noNoSrc(_img));
			$('div.cageMonsterListItem:last').show();
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.festival1 = function() {
	signedGet('festival_tower.php?tab=monster', function(_festMonster) {
		_festMonster = $(noSrc(_festMonster));
		$('#listDiv > div:not(:last)', _festMonster).each(function(_i, _e) {
			var _e = $(_e);
			var _img = _e.find('> div:eq(1)').attr('style', '').find('div[style*="background-image"]:first').addClass('cageMonsterListItem ui-corner-all').hide().empty().unwrap();
			var _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if(_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(2) > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/festival_monstertag_tower.gif">');
			$('#cageMonsterContainer').append(noNoSrc(_img));
			$('div.cageMonsterListItem:last').show();
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.festival2 = function() {
	signedGet('festival_tower2.php?tab=monster', function(_festMonster) {
		_festMonster = $(noSrc(_festMonster));
		$('#listDiv > div:not(:last)', _festMonster).each(function(_i, _e) {
			var _e = $(_e);
			var _img = _e.find('> div:eq(1)').attr('style', '').find('div[style*="background-image"]:first').addClass('cageMonsterListItem ui-corner-all').hide().empty().unwrap();
			var _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if(_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(2) > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/festival_monstertag2_tower.gif">');
			$('#cageMonsterContainer').append(noNoSrc(_img));
			$('div.cageMonsterListItem:last').show();
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.raid = function() {
	signedGet('raid.php', function(_raids) {
		_raids = $(noSrc(_raids));
		$('table.layout span', _raids).parent().parent().parent().each(function(_i, _e) {
			var _e = $(_e);
			if(_e.text().trim() !== '[START THIS CAMPAIGN]') {
				console.log(_e.find('> div:eq(1) > div:first').css('backgroundImage'));
				var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', _e.find('> div:eq(1) > div:first').css('backgroundImage'));
				_img.append('<div class="cageMonsterName">' + $(_e).find('span').text().split(' ')[0] + '</div>');
				_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
				$('#cageMonsterContainer').append(noNoSrc(_img));
				$('div.cageMonsterListItem:last').show();
			}
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.conquest = function() {
	$.each(tools.Monster.runtime.conquestLands, function(_i, _e) {
		if(_e == true) {
			signedGet(_i, function(_monster) {
				_monster = $(noSrc(_monster));
				$('#guildv2_monster_list_body div[style="padding:10px 0 0 20px;"] > div', _monster).each(function(_i, _e) {
					var _e = $(_e);
					var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', 'url(' + _e.find('img:first').attr('nosrc') + ')');
					_img.append('<div class="cageMonsterName">' + $('div[id="guildv2_monster_list_top"]:first', _monster).text() + '</div>');
					_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(2) a')));
					_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/war_battle_guildbtllands_on.jpg">');
					$('#cageMonsterContainer').append(noNoSrc(_img));
					$('div.cageMonsterListItem:last').show();
				});
			});
		}
	});
	tools.Monster.checkFor();
};
tools.Monster.closeInstant = function() {
	if(tools.Monster.runtime.closeInstant) {
		tools.Monster.done();
	}
};
tools.Monster.done = function() {
	console.log('done:', $('#cageMonsterContainer').height());
	$('#cageMonsterContainer').animate({
		'top' : -119 - $('#cageMonsterContainer').height() + 10,
	}, 'slow', function() {
		$(this).hide
	});
	tools.Sidebar.button.enable('cageMonsterStart');

};

tools.Monster.battleAdditons = function() {
	tools.Monster.battleCTA();
	tools.Monster.battleStats();
	tools.Monster.monsterSiege();
	tools.Monster.battleResult(tools.Monster.monsterBars(), tools.Monster.defense(), tools.Monster.stun_bar());
};
tools.Monster.monsterSiege = function() {
	var _sieges = [];
	$('img[src*="_siege_small"]').each(function() {
		_sieges.push($(this).parent().parent().text().trim().replace(/\s/g, '').replace(/,/g, '').replace(/dmg/g, '').split('-'))
	});
	console.log(_sieges);
};
tools.Monster.monsterBars = function() {
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
	return _monstername !== null ? _monstername.text() : '';
};
tools.Monster.defense = function() {
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
tools.Monster.stun_bar = function() {
	// add percentage to Cripple...
	var _stun = $('#app_body div > img[src$="nm_stun_bar.gif"]:first');
	if(_stun.length > 0) {
		var _text = _stun.parent().next().children('div:first'), _ret;
		_stun = _stun[0].style.width.substr(0, 5);
		_ret = _text.text() + ': ' + _stun + (_stun.indexOf('%') > -1 ? '' : '%').replace('Need ', '').replace('Fill to ', '').toLowerCase();
		_text.text(_text.text() + ' ' + _stun + (_stun.indexOf('%') > -1 ? '' : '%'));
		return _ret;
	}
	return '';
}
tools.Monster.battleStats = function() {
	// monster stats
	//@formatter:off
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
		 	'\\/monster_(?!health)\\w+.jpg',
		 	'\\w+_dead.jpg'
	 	].join('|')), _img = false;
	//@formatter:on
	$('#app_body table.layout td > div:gt(2) div:not([id][alt][title]) > img:only-child').each(function() {
		if(_bossReg.exec($(this).attr('src')) !== null) {
			$(this).parent('div:first').css('position', 'relative').append('<div id="cageMonsterStats">');
			return false;
		}
	});
	var $this, _attackers = 0, _temp = '', _max, _levels, _hod, $stats = $('#cageMonsterStats'), _ownDamage = null, _dmgType = null, _allDamage = {
		Activity : 0,
		dmg : 0,
		def : 0
	};
	if(_dmgType === null) {
		if($('td.dragonContainer table tr td:eq(1) table tr:eq(0)').find('td:last').text().trim().indexOf('dmg') > -1) {
			_dmgType = 'dmg'
		} else {
			_dmgType = 'Activity'
		}
	}
	$('td.dragonContainer table tr td:eq(1) table tr').each(function() {
		$this = $(this);
		if($this.text() !== '') {
			var _line = $this.find('td:last').text().trim();
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
					_max = /\[(\d+)\s+max\]/.exec($this.text());
					_max = _max !== null ? '/' + _max[1] : '';
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
		$stats.before($('<div class="cageMonsterActivity"><span style="display:inline-block;font-weight:bold;width:80px;">My activity</span><span style="display:inline-block;float:right;text-align:right;">' + _ownDamage + '</span></div>').css('bottom', $stats.find('div').length * 13 + 61));
	}
	$stats.before($('<div class="cageMonsterActivity"><span style="display:inline-block;font-weight:bold;width:80px;">Activity</span><span style="display:inline-block;float:right;text-align:right;">' + _allDamage[_dmgType].toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + (_dmgType === 'dmg' ? ' dmg / ' + _allDamage.def.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + ' def' : '') + '</span></div>').css('bottom', $stats.find('div').length * 13 + 25));

	if($('span.target_monster_info').length > 0) {
		var _div = $('span.target_monster_info:first').parent();
		_div.css({
			'top' : -2,
			'zIndex' : 1
		}).parent().parent().prepend(_div);
	}

};
tools.Monster.battleResult = function(_monstername, _defText, _stun) {
	// rearrange attack result
	if($('div.result').length > 0) {
		//resize Elite Guard boxes
		$('div.result div:textEquals("Elite Guard")').parent().find('div[style*="height:84px"]').css('height', 68);
		$('img[alt="Call to Elite Guard"]').parent().css({
			'height' : 68,
			'overflow' : 'hidden'
		});
		// add monster damage/health/... to result
		$('div.result:has(img[src*="graphics/button_monster_attack_again.gif"]) span.result_body div:last, div.result:contains(" Again!")').append('<div id="MonsterResultDamage"><div>' + _monstername + '</div><div>' + _defText + '</div><div>Your Damage/Activity: ' + $('td.dragonContainer tr:has(a[href*="' + CastleAge.userId + '"]) > td:last').text().trim() + '<div style="text-transform: capitalize;">' + _stun + '</div></div></div>');
		if($('div.result:contains(" Again!")').length > 0) {
			$('#MonsterResultDamage').css('float', 'none');
		}
	}
}
tools.Monster.battleCTA = function() {
	// answer CTA
	if($('form:has(input[alt="Ask for help"]):first').length == 1) {
		var _form = $('#app_body form:has(input[alt="Ask for help"])').clone();
		_form.find('input[name="bqh"]').remove();
		$('#app_body form:has(input[alt="Ask for help"])').parent().parent().find('img[src*="siege"]:last').parent().append('<a href="http://apps.facebook.com/castle_age/festival_battle_monster.php?' + _form.serialize() + '&action=doObjective"><img id="cageSummonCTA" src="http://image4.castleagegame.com/graphics/mp_button_summon.gif"></a>').unbind('click').click(function() {
			tools.Page.loadPage('festival_battle_monster.php?' + $('form:has(div.imgButton > input[alt="Ask for help"]):first').serialize() + '&action=doObjective');
			return false;
		});
	}
}