// Guild battle
tools.Page.pages['guild_battle.php'] = function() {

	console.log('Page: guild_battle.php');

	// fix gate reseting when attacking with duel button
	var _gate = /\d/.exec($('#enemy_guild_battle_section_battle_list, #your_guild_battle_section_battle_list').attr('class'));
	$('#results_main_wrapper form, #enemy_guild_member_list form, #your_guild_member_list form').append('<input type="hidden" name="sel_pos" value="' + _gate + '">');

	// add percentage to health bars
	var _your = (1 - ($('div[style*="/guild_battle_bar_you.gif"]').width() / $('div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
	var _enemy = (1 - ($('div[style*="/guild_battle_bar_enemy.gif"]').width() / $('div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
	var $_your = $('span:contains("YOUR GUILD")');
	var $_enemy = $('span:contains("ENEMY\'S GUILD")');
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
	var _storedClass = item.get('cagePageGuildBattleClass', 'All');
	var _storedActivity = item.get('cagePageGuildBattleActivity', 'All');
	var _storedStatus = item.get('cagePageGuildBattleStatus', 'All');
	var _storedPoints = item.get('cagePageGuildBattlePoints', 'All');

	// gate filter
	function filterGate() {
		var _class = $('#cageGateClassFilter').val();
		var _activ = new RegExp($('#cageGateActivityFilter').val(), "g");
		var _state = $('#cageGateStatusFilter').val();
		var _points = $('#cageGatePointsFilter').val();
		var _count = 0;
		$('#your_guild_member_list > div > div, #enemy_guild_member_list > div > div').each(function(_i, _e) {

			var _text = $(_e).text().trim(), _stateTest = true;
			switch (_state) {
				case 'FullHealth':
					var _test = /(\d+)\/(\d+)/g.exec(_text);
					_stateTest = (_test.length === 3 && _test[1] === _test[2]) ? true : false;
					break;
				case 'GotHealth':
					var _test = /(\d+)\/(\d+)/g.exec(_text);
					_stateTest = (_test.length === 3 && !(eval(_test[1]) === 0)) ? true : false;
					break;
				case 'NoHealth':
					var _test = /(\d+)\/(\d+)/g.exec(_text);
					_stateTest = (_test.length === 3 && eval(_test[1]) === 0) ? true : false;
					break;
				default:
					var _test = new RegExp(_state, "g");
					_stateTest = _test.test(_text);
			}

			var _classTest = _class === 'all' ? 1 : $(_e).find('img[src*="/graphics/class_' + _class + '.gif"]').length;
			var _pointTest = _points === 'all' ? 1 : $(_e).find('img[title="Battle Points for Victory: ' + _points + '"]').length;
			if (_classTest > 0 && _activ.test(_text) && _pointTest > 0 && _stateTest === true) {
				$(_e).show();
				_count += 1;
			} else {
				$(_e).hide();
			}

		});
		var _gateNum = $('#enemy_guild_battle_section_battle_list, #your_guild_battle_section_battle_list').attr('class').match(/\d/)[0];
		var _gate = $('#enemy_guild_tab_' + _gateNum + ' > div, #your_guild_tab_' + _gateNum + ' > div');
		_gate.html(_gate.html().replace(/\).*/, ')').replace(')', ')<br/><span style="font-size:14px;font-weight:bold;">Filtered: ' + _count + '</span>'));
	}

	// class filter
	var filterClass = {
		'All' : 'all',
		'Cleric' : 'cleric',
		'Mage' : 'mage',
		'Rogue' : 'rogue',
		'Warrior' : 'warrior'
	}, filterActivity = {
		'All' : '\.',
		'Active' : 'Battle Points: [^0]',
		'Inactive' : 'Battle Points: 0'
	}, filterStatus = {
		'All' : '\.',
		'Full health' : 'FullHealth',
		'Got health' : 'GotHealth',
		'No health' : 'NoHealth',
		'Healthy' : 'Healthy',
		'Good' : 'Good',
		'Fair' : 'Fair',
		'Weakened' : 'Weakened',
		'Stunned' : 'Stunned'
	}, filterPoints = {
		'All' : 'all',
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
		item.set('cagePageGuildBattleClass', 'All');
		item.set('cagePageGuildBattleActivity', 'All');
		item.set('cagePageGuildBattleStatus', 'All');
		item.set('cagePageGuildBattlePoints', 'All');
		filterGate();
	}));
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Class </span><select id="cageGateClassFilter" class="cagegatefiltertitle">');
	_sel = $('#cageGateClassFilter');
	$.each(filterClass, function(_i, _e) {
		_sel.append('<option value="' + _e + '" ' + (_storedClass == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		_storedClass = $(this).find("option:selected").text();
		item.set('cagePageGuildBattleClass', _storedClass);
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
		item.set('cagePageGuildBattleActivity', _storedActivity);
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
		item.set('cagePageGuildBattleStatus', _storedStatus);
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
		item.set('cagePageGuildBattlePoints', _storedPoints);
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
