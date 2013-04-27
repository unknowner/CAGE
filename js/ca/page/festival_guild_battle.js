// Festival battle
tools.Page.pages['festival_guild_battle.php'] = function() {

	console.log('Reworking data: festival_guild_battle');

	// fix gate reseting when attacking with duel button
	var _gate = /\d/.exec($('#enemy_guild_battle_section_battle_list, #your_guild_battle_section_battle_list').attr('class'));
	$('#results_main_wrapper form, #enemy_guild_member_list form, #your_guild_member_list form').append('<input type="hidden" name="sel_pos" value="' + _gate + '">');
	$('#results_main_wrapper form, #enemy_guild_member_list form, #your_guild_member_list form').append('<input type="hidden" name="attacking_position" value="' + _gate + '">');

	// add percentage to health bars
	var _your = (1 - ($('div[style*="/guild_battle_bar_you.gif"]').width() / $('div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
	var _enemy = (1 - ($('div[style*="/guild_battle_bar_enemy.gif"]').width() / $('div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
	var $_your = $('#guild_battle_health span:contains("/"):first');
	var $_enemy = $('#guild_battle_health span:contains("/"):last');
	$_your.html($_your.html() + ' (' + _your.toFixed(1) + '%)');
	$_enemy.html($_enemy.html() + ' (' + _enemy.toFixed(1) + '%)');

	// enemys health added to its name in results
	$_enemy = $('span.result_body div[style*="width: 285px;"]:last');
	if ($_enemy.length > 0) {
		var _target = $('span.result_body input[name="target_id"]').attr('value');
		var _health = /Health:\s*(\d+)\/\d+/.exec($('#enemy_guild_member_list > div > div:has(a[uid="' + _target + '"]):first').text());
		if (_health !== null) {
			$_enemy.html($_enemy.html() + ' (' + _health[1] + ')');
		}
	}

	// resize top image
	$('input[value="enter_battle"]').parents('form:first').css({
		'position' : 'relative'
	});
	$('#guild_battle_banner_section').css('height', 190).find('div:contains("VICTOR")').next().next().css('marginTop', 10).end();
	$('#guild_battle_banner_section > div:eq(2)').css('marginTop', 0);
	$('div:contains("The Battle Between"):last').parent().css('marginTop', 20);
	$('input[src*="collect_reward_button2.jpg"]').parents('div:eq(2)').css('marginTop', 0);

	// add current tokens to result
	var _tokens = $('div.result div:contains("-1 Battle Tokens"):last');
	_tokens.text(_tokens.text() + ' (' + $('#guild_token_current_value').text() + ' left)');

	// reduce gate size and add number
	if ($('#your_guild_member_list:contains("No Soldiers Posted In This Position!"), #enemy_guild_member_list:contains("No Soldiers Posted In This Position!")').length === 0) {
		$('#enemy_guild_member_list > div > div, #your_guild_member_list > div > div').each(function(_i, _e) {
			$(_e).append('<span class="GuildNum">' + (_i + 1) + '<span>');
		});
	}

	// Saved filter settings
	var _storedClass = item.get('cagePageFestGuildBattleClass', 'All');
	var _storedActivity = item.get('cagePageFestGuildBattleActivity', 'All');
	var _storedStatus = item.get('cagePageFestGuildBattleStatus', 'All');
	var _storedPoints = item.get('cagePageFestGuildBattlePoints', 'All');

	// gate filter
	function filterGate() {
		var _class = new RegExp($('#cageGateClassFilter').val());
		var _activ = new RegExp($('#cageGateActivityFilter').val());
		var _state = new RegExp($('#cageGateStatusFilter').val());
		var _points = $('#cageGatePointsFilter').val();
		var _count = 0;
		var _myLevel = $('a[href*="keep.php"] > div[style="color:#ffffff"]').text().match(/\d+/);
		var myLevel = Number(_myLevel[0]);
		$('#your_guild_member_list > div > div, #enemy_guild_member_list > div > div').each(function(_i, _e) {

			var _text = $(_e).text().trim(), _start, _end, _fullhealth;
			_start = _text.search("Health");
			_end = _text.search("Status");
			_fullhealth = _text.substr(_start, _end - _start - 28);
			_fullhealth = _fullhealth.replace(/(\d+)(?:(\/\1$))/gi, "FullHealth");

			if (_class.test(_text) && _activ.test(_text) && (_state.test(_text) || _state.test(_fullhealth))) {
				if (_points !== 'All') {
					if (/Level: \d+/.test(_text)) {
						var targetLevel = parseInt(/(?:Level: )(\d+)/g.exec(_text)[1]);
						var _showTarget = false;
						switch (_points) {
							case '240':
								if (targetLevel > myLevel * 1.2) {
									_showTarget = true;
								}
								break;
							case '200':
								if ((targetLevel > myLevel * 0.8) && (targetLevel <= myLevel * 1.2)) {
									_showTarget = true;
								}
								break;
							case '160':
								if (targetLevel <= myLevel * 0.8) {
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
		var _gateNum = $('#enemy_guild_battle_section_battle_list, #your_guild_battle_section_battle_list').attr('class').match(/\d/)[0];
		var _gate = $('#enemy_arena_tab_' + _gateNum + ' > div, #your_arena_tab_' + _gateNum + ' > div');
		_gate.html(_gate.html().replace(/\).*/, ')').replace(')', ')<br/><span style="font-size:11px;font-weight:bold;">Filtered: ' + _count + '</span>'));
	}

	// class filter
	var filterClass = {
		'All' : '\.*',
		'Cleric' : 'Cleric',
		'Mage' : 'Mage',
		'Rogue' : 'Rogue',
		'Warrior' : 'Warrior'
	}, filterActivity = {
		'All' : '\.*',
		'Active' : 'Battle Points: [^0]',
		'Inactive' : 'Battle Points: 0'
	}, filterStatus = {
		'All' : '\.*',
		'Full health' : 'FullHealth',
		'Got health' : 'Health: [^0]',
		'No health' : 'Health: 0/',
		'Healthy' : 'Healthy',
		'Good' : 'Good',
		'Fair' : 'Fair',
		'Weakened' : 'Weakened',
		'Stunned' : 'Stunned'
	}, filterPoints = {
		'All' : 'All',
		'240' : '240',
		'200' : '200',
		'160' : '160'
	};
	// Class filter
	$('body > ul.ui-selectmenu-menu').remove();
	$('#guild_battle_health').append($('<button>Clear filters</button>').button().css({
		'position' : 'relative !important',
		'left' : 9,
		'top' : 3,
		'float' : 'left',
		'fontSize' : 12,
		'height' : 25,
		'borderRadius' : 0
	}).click(function() {
		$('span.ui-selectmenu-status').text('All');
		$('#cageGateClassFilter, #cageGateActivityFilter, #cageGateStatusFilter, #cageGatePointsFilter').val('All');
		_storedClass = _storedActivity = _storedStatus = _storedPoints = 'All';
		item.set('cagePageFestGuildBattleClass', 'All');
		item.set('cagePageFestGuildBattleActivity', 'All');
		item.set('cagePageFestGuildBattleStatus', 'All');
		item.set('cagePageFestGuildBattlePoints', 'All');
		filterGate();
	}));
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Class </span><select id="cageGateClassFilter" class="cagegatefiltertitle">');
	_sel = $('#cageGateClassFilter');
	$.each(filterClass, function(_i, _e) {
		_sel.append('<option value="' + _e + '" ' + (_storedClass == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		_storedClass = $(this).find("option:selected").text();
		item.set('cagePageFestGuildBattleClass', _storedClass);
		filterGate();
	});
	// Activity filter
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Activity </span><select id="cageGateActivityFilter" class="cagegatefiltertitle">');
	_sel = $('#cageGateActivityFilter');
	$.each(filterActivity, function(_i, _e) {
		_sel.append('<option value="' + _e + '" ' + (_storedActivity == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		_storedActivity = $(this).find("option:selected").text();
		item.set('cagePageFestGuildBattleActivity', _storedActivity);
		filterGate();
	});
	// status filter
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Status </span><select id="cageGateStatusFilter" class="cagegatefiltertitle">');
	_sel = $('#cageGateStatusFilter');
	$.each(filterStatus, function(_i, _e) {
		_sel.append('<option value="' + _e + '" ' + (_storedStatus == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		_storedStatus = $(this).find("option:selected").text();
		item.set('cagePageFestGuildBattleStatus', _storedStatus);
		filterGate();
	});

	$('#cageGateStatusFilter, #cageGateClassFilter, #cageGateActivityFilter').css({
		'float' : 'left',
		'color' : '#fff',
		'height' : 25,
		'border' : '1 solid #444444',
		'backgroundColor' : '#222',
		'position' : 'relative',
		'left' : 9,
		'top' : 3
	});
	// Battle activity points filter
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Points </span><select id="cageGatePointsFilter" class="cagegatefiltertitle">');
	_sel = $('#cageGatePointsFilter');
	$.each(filterPoints, function(_i, _e) {
		_sel.append('<option value="' + _e + '" ' + (_storedPoints == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		_storedPoints = $(this).find("option:selected").text();
		item.set('cagePageFestGuildBattlePoints', _storedPoints);
		filterGate();
	});

	$('#cageGatePointsFilter, #cageGateStatusFilter, #cageGateClassFilter, #cageGateActivityFilter').css({
		'float' : 'left',
		'color' : '#fff',
		'height' : 25,
		'border' : '1 solid #444444',
		'backgroundColor' : '#222',
		'position' : 'relative',
		'left' : 9,
		'top' : 3
	});
	window.setTimeout(function() {
		filterGate();
	}, 10);
};
