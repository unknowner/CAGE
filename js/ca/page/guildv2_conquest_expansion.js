// Conquest battle
tools.Page.pages['guildv2_conquest_expansion.php'] = function() {

	console.log('Page: guildv2_conquest_expansion.php');
	/* Mist land conquest battle */
	if ($('#your_guild_member_list_1').length > 0) {
		console.log('Mist land conquest battle');

		var _defenderHealth = 0, _actions = parseInt(/\d+/.exec($('#app_body div:contains("ACTIONS LEFT:"):last').text()), 10);

		$('#your_guild_member_list_1 > div').each(function(_i, _e) {
			_defenderHealth += parseInt(/(\d+)(?:\/)/.exec($(this).text())[1], 10);
			$(_e, 'div > div').append('<div style="clear:both;"></div>');
			$(_e, 'div > div').append('<span class="GuildNum">' + (_i + 1) + '<span>');
		});
		if (_defenderHealth > 0) {
			$('#app_body div[style*="/graphics/war_art24.jpg"]:last').prepend('<div id="cageHealthAction">Health/Action: ' + (_defenderHealth / _actions).toFixed(0) + '</div>');
		}

		// Saved filter settings
		var _storedClass = item.get('cagePageConquestBattleClass', 'All');
		var _storedStatus = item.get('cagePageConquestBattleStatus', 'All');
		var _storedPoints = item.get('cagePageConquestBattlePoints', 'All');

		// gate filter
		function filterGate() {
			var _class = new RegExp($('#cageGateClassFilter').val());
			var _state = new RegExp($('#cageGateStatusFilter').val());
			var _points = $('#cageGatePointsFilter').val();
			var _count = 0;
			var _myLevel = $('a[href*="keep.php"] > div[style="color:#ffffff"]').text().match(/\d+/);
			var myLevel = Number(_myLevel[0]);
			$('#your_guild_member_list_1 > div').each(function(_i, _e) {
				var _text = $(_e).text().trim(), _health, _maxHealth, _fullhealth, _eClass;

				/* enemy class */
				_eClass = $(_e).find('img[title="Cleric"], img[title="Mage"], img[title="Warrior"], img[title="Rogue"]').attr("title");

				/* enemy full health */
				_health = /(\d+)\//.exec(_text)[1];
				_maxHealth = /\/(\d+)/.exec(_text)[1];
				if ((_maxHealth - _health) === 0) {
					_fullhealth = true;
				} else {
					_fullhealth = false;
				}

				if (_class.test(_eClass) && (_state.test(_text) || (_state.test('FullHealth') && _fullhealth))) {
					if (_points !== 'All') {
						if (/Level: \d+/.test(_text)) {
							var targetLevel = parseInt(/(?:Level: )(\d+)/g.exec(_text)[1]);
							var _showTarget = false;
							switch (_points) {
								case '50':
									if (targetLevel > 900) {
										_showTarget = true;
									}
									break;
								case '40':
									if ((targetLevel > 600) && (targetLevel <= 900)) {
										_showTarget = true;
									}
									break;
								case '30':
									if ((targetLevel > 300) && (targetLevel <= 600)) {
										_showTarget = true;
									}
									break;
								case '20':
									if ((targetLevel > 100) && (targetLevel <= 300)) {
										_showTarget = true;
									}
									break;
								case '10':
									if (targetLevel <= 100) {
										_showTarget = true;
									}
									break;
								default:
									_showTarget = true;
							}
							if (_showTarget) {
								$(_e).show();
								_count += 1;
							} else {
								$(_e).hide();
							}
						} else {
							console.log('Error in points filter!');
							$(_e).show();
							_count += 1;
						}
					} else {
						$(_e).show();
						_count += 1;
					}
				} else {
					$(_e).hide();
				}
			});
			$('#app_body div[id="cageHealthAction"]:last').html($('#app_body div[id="cageHealthAction"]:last').html().replace(/.*Health\/Action:/, 'Health/Action:').replace('Health/Action:', 'Filtered: ' + _count + '<br/>Health/Action:'));
		}

		// class filter
		var filterClass = {
			'All' : '\.',
			'Cleric' : 'Cleric',
			'Mage' : 'Mage',
			'Rogue' : 'Rogue',
			'Warrior' : 'Warrior'
		}, filterStatus = {
			'All' : '\.',
			'Full health' : 'FullHealth',
			'Got health' : '[^0]\/',
			'Healthy' : 'Healthy',
			'Good' : 'Good',
			'Fair' : 'Fair',
			'Weakened' : 'Weakened',
			'Stunned' : 'Stunned'
		}, filterPoints = {
			'All' : 'All',
			'50' : '50',
			'40' : '40',
			'30' : '30',
			'20' : '20',
			'10' : '10'
		};
		$('body > ul.ui-selectmenu-menu').remove();
		$('#your_guild_member_list_1').before('<div id="cageConquestBattleFilter" class="ui-state-default"></div>');
		var _cCBF = $('#cageConquestBattleFilter');
		// Battle activity points filter
		_cCBF.prepend('<span class="cageGateFilterTitle ui-state-default"> Points </span><select id="cageGatePointsFilter" class="cagegatefiltertitle">');
		_sel = $('#cageGatePointsFilter');
		$.each(filterPoints, function(_i, _e) {
			_sel.append('<option value="' + _e + '" ' + (_storedPoints == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
		});
		_sel.change(function() {
			_storedPoints = $(this).find("option:selected").text();
			item.set('cagePageConquestBattlePoints', _storedPoints);
			filterGate();
		});
		// status filter
		_cCBF.prepend('<span class="cageGateFilterTitle ui-state-default"> Status </span><select id="cageGateStatusFilter" class="cagegatefiltertitle">');
		_sel = $('#cageGateStatusFilter');
		$.each(filterStatus, function(_i, _e) {
			_sel.append('<option value="' + _e + '" ' + (_storedStatus == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
		});
		_sel.change(function() {
			_storedStatus = $(this).find("option:selected").text();
			item.set('cagePageConquestBattleStatus', _storedStatus);
			filterGate();
		});
		// Class filter
		_cCBF.prepend('<span class="cageGateFilterTitle ui-state-default"> Class </span><select id="cageGateClassFilter" class="cagegatefiltertitle">');
		_sel = $('#cageGateClassFilter');
		$.each(filterClass, function(_i, _e) {
			_sel.append('<option value="' + _e + '" ' + (_storedClass == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
		});
		_sel.change(function() {
			_storedClass = $(this).find("option:selected").text();
			item.set('cagePageConquestBattleClass', _storedClass);
			filterGate();
		});
		// Clear filters
		_cCBF.prepend($('<button>Clear filters</button>').button().css({
			'position' : 'relative !important',
			'left' : 9,
			'top' : 3,
			'fontSize' : 12,
			'height' : 25,
			'borderRadius' : 0,
			'float' : 'left'
		}).click(function() {
			$('span.ui-selectmenu-status').text('All');
			$('#cageGateClassFilter, #cageGateStatusFilter, #cageGatePointsFilter').val('All');
			_storedClass = _storedStatus = _storedPoints = 'All';
			item.set('cagePageConquestBattleClass', 'All');
			item.set('cagePageConquestBattleStatus', 'All');
			item.set('cagePageConquestBattlePoints', 'All');
			filterGate();
		}));
		window.setTimeout(function() {
			filterGate();
		}, 10);
	}

};
