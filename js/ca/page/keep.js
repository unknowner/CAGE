// Keep
tools.Page.runtime['keep.php'] = function() {

	// Update potions
	tools.PotionStamina.work();
	tools.PotionEnergy.work();
	// folding units, items ...
	$('div.statsT2:has(div.statsTTitle)').css({
		'height' : 30,
		'overflow' : 'hidden',
		'cursor' : 'pointer'
	});
	// Collapsed items/untits ...
	$('div.statsTTitle').toggle(function() {
		$(this).parents('div.statsT2:first').css({
			'height' : '100%'
		});
	}, function() {
		$(this).parents('div.statsT2:first').css({
			'height' : 30
		});
	});
	// Calulate devine power
	var _divPow = 0, _divItems = [], _divine = {
		'general' : {
			'Aegea' : 45,
			'Agamemnon' : 20,
			'Alyzia' : 5,
			'Amon' : 45,
			'Aurelius' : 20,
			'Axxon' : 45,
			'Dexter the Drunk' : 15,
			'Ender' : 50,
			'Esmeralda' : 30,
			'Isidra' : 45,
			'Jaelle' : 20,
			'Jahanna' : 20,
			'Kothas' : 30,
			'Tyrant' : 30
		},
		'weapon' : {
			'Heart of the Woods' : 120,
			'Hammer of Storms' : 40
		},
		'offhand' : {
			'Warrior Unbound' : 180,
			'Aegis of Kings' : 120,
			'Aegis of Stone' : 40
		},
		'helmet' : {
			'Helm of the Deep' : 180,
			'Helm of Arcane Energies' : 120
		},
		'armor' : {
			'Retribution Armor' : 10,
			'Armor of Redemption' : 180,
			'Trisoul Plate' : 160,
			'Glacial Plate' : 40,
			'Krakenhide Armor' : 40,
			'Tempest Plate' : 10,
			'Moonfall Battlegear' : 10
		},
		'amulet' : {
			'Keeper of Chaos' : 180,
			'Force of Nature' : 80,
			'Juggernaut Medallion' : 10,
			'Lionheart Seal' : 10
		},
		'magic' : {
			'Molten Core' : 70,
			'Lava Inferno' : 40
		},
		'glove' : {
			'Dragonform Claw' : 100
		}
	};
	$('div.statsTMain:eq(0) img').each(function(_i, _e) {
		var _d = /(.+), Divine Power/.exec($(_e).attr('title'));
		if(_d !== null) {
			_divItems.push(_d[1]);
		}
	});
	console.log(_divItems);
	if(_divItems.length > 0) {
		$.each(_divine, function(_i, _type) {
			var _temp = 0;
			$.each(_type, function(_item, _val) {
				if(_divItems.indexOf(_item) !== -1) {
					_temp = _temp > _val ? _temp : _val;
				}
			});
			_divPow += _temp
		});
	}
	_divItems = _divine = undefined;

	// Some more stats, like BSI, LSI... keep_data.attribute_section
	var _data = {};
	_data.lvl = $('#st_5 div:contains("Level"):last').text();
	_data.stats = $('div.keep_attribute_section');
	if(_data.lvl && _data.stats.length > 0) {
		_data.lvl = parseInt(_data.lvl.match(/\d+/)[0], 10);
		//stats
		_data.stats = $('div.attribute_stat_container', _data.stats);
		_data.eng = parseInt(_data.stats.eq(0).text(), 10);
		_data.sta = parseInt(_data.stats.eq(1).text(), 10);
		_data.att = /(\d+)(?:\s\((.\d+)?\))?/.exec(_data.stats.eq(2).text());
		_data.att = parseInt(_data.att[1], 10) + (_data.att[2] == null ? 0 : parseInt(_data.att[2], 10));
		//_data.def = parseInt(_data.stats.eq(3).text(), 10);
		_data.def = /(\d+)(?:\s\((.\d+)?\))?/.exec(_data.stats.eq(3).text());
		_data.def = parseInt(_data.def[1], 10) + (_data.def[2] == null ? 0 : parseInt(_data.def[2], 10));
		//calculated stats
		_data.eAt = _data.att + _data.def * 0.7;
		_data.eDe = _data.def + _data.att * 0.7;
		_data.bsi = Math.round((_data.att + _data.def) / _data.lvl * 100) / 100;
		_data.lsi = Math.round((_data.eng + _data.sta * 2) / _data.lvl * 100) / 100;
		_data.tsi = _data.bsi + _data.lsi;
		$('div.keep_healer_section').prepend($('<div id="cageKeepStats">').append('<div>eAtt: ' + _data.eAt.toFixed(2) + '</div><div style="font-size:9px;">Effective Attack</div>').append('<div>eDef: ' + _data.eDe.toFixed(2) + '</div><div style="font-size:9px;">Effective Defense</div>').append('<div>BSI: ' + _data.bsi.toFixed(2) + '</div><div style="font-size:9px;">Battle Strength Index</div>').append('<div>LSI: ' + _data.lsi.toFixed(2) + '</div><div style="font-size:9px;">Levelling Speed Index</div>').append('<div>TSI: ' + _data.tsi.toFixed(2) + '</div><div style="font-size:9px;">Total Skillpoints per Level</div>').append('<div>Divine: ' + _divPow + '</div><div style="font-size:9px;">Calculated Divine Power</div>'));
		_data = null;
	} else {
		_data = null;
	}
	// rearrange Items
	window.setTimeout(function() {
		$('div.statUnit a img').unwrap().unwrap().addClass('ui-corner-all');
		$('div.statUnit').find('div:last:contains(X)').addClass('itemNumbers');
	}, 10);
	// Add stuff on others keep
	if($('div.keep_main_section').length === 0) {
		var _uid = $('td.statsTB > div *[uid]').attr('uid');
		if($('#keep_battle_frm1').length === 0) {
			$('td.statsTB > div:eq(1)').append($('<div id="cageArmyKeep"><button>DISMISS</button></div>').click(function() {
				$('#AjaxLoadIcon').show();
				get('army_member.php?action=delete&player_id=' + _uid, function() {
					tools.Page.loadPage('keep.php?user=' + _uid);
				});
			}));
		} else {
			tools.Facebook.CAPlayers(function(_ids) {
				if(_ids.indexOf(_uid) !== -1) {
					$('td.statsTB > div:eq(1)').append($('<div id="cageArmyKeep"><button>JOIN ARMY</button></div>').click(function() {
						$('#AjaxLoadIcon').show();
						get('party.php?twt=jneg&jneg=true&user=' + _uid + '&lka=' + _uid + '&etw=9&ref=nf', function() {
							tools.Page.loadPage('keep.php?user=' + _uid);
						});
					}));
				}
			});
		}
	}

};
