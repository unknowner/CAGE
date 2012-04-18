// Festival battle
tools.Page.runtime['festival_guild_battle.php'] = function() {

	console.log('Reworking data: festival_guild_battle');

	// add link to profile pics
	$('#enemy_guild_member_list *[uid]').each(function() {
		$(this).wrap('<a uid="' + $(this).attr('uid') + '" class="cageGuildProfileLink" onclick="ajaxLinkSend(\'globalContainer\', \'keep.php?casuser=' + $(this).attr('uid') + '\'); return false;"></a>');
	});
	// fix gate reseting when attacking with duel button
	var _gate = /\d/.exec($('#enemy_guild_battle_section_battle_list').attr('class'));
	$('#results_main_wrapper form, #enemy_guild_member_list form, #your_guild_member_list form').append('<input type="hidden" name="sel_pos" value="' + _gate + '">');

	// add percentage to health bars
	var _your = (1 - ($('div[style*="/guild_battle_bar_you.gif"]').width() / $('div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
	var _enemy = (1 - ($('div[style*="/guild_battle_bar_enemy.gif"]').width() / $('div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
	var $_your = $('#guild_battle_health span:contains("/"):first');
	var $_enemy = $('#guild_battle_health span:contains("/"):last');
	if($('#guild_battle_health span:contains("/")').length === 2) {
		$_your.html($_your.html() + ' (' + _your.toFixed(1) + '%)');
	}
	$_enemy.html($_enemy.html() + ' (' + _enemy.toFixed(1) + '%)');
	
	// enemys health added to its name in results
	$_enemy = $('span.result_body div[style*="width: 285px;"]:last');
	if($_enemy.length > 0) {
		var _target = $('span.result_body input[name="target_id"]').attr('value');
		var _health = /Health:\s*(\d+)\/\d+/.exec($('#enemy_guild_member_list > div > div:has(a[uid="' + _target + '"]').parents().eq(3).text())[1];
		$_enemy.text($_enemy.text().trim() + ' (' + _health + ')');
	}

	// add current tokens to result
	var _tokens = $('div.result div:contains("-1 Battle Tokens"):last');
	_tokens.text(_tokens.text() + ' (' + $('#guild_token_current_value').text() + ' left)');

	//reduce gate size and add number
	if($('#enemy_guild_member_list:contains("No Soldiers Posted In This Position!")').length == 0) {
		$('#enemy_guild_member_list > div > div, #your_guild_member_list > div > div').each(function(_i, _e) {
			$(_e).append('<span class="GuildNum">' + (_i + 1) + '<span>')
		});
	}

	//Saved filter settings
	var _storedClass = item.get('cagePageFestGuildBattleClass', 'All');
	var _storedActivity = item.get('cagePageFestGuildBattleActivity', 'All');
	var _storedStatus = item.get('cagePageFestGuildBattleStatus', 'All')

	//gate filter
	function filterGate() {
		var _class = new RegExp($('#cageGateClassFilter').val());
		var _activ = new RegExp($('#cageGateActivityFilter').val());
		var _state = new RegExp($('#cageGateStatusFilter').val());
		var _count = 0;
		$('#your_guild_member_list > div > div, #enemy_guild_member_list > div > div').each(function(_i, _e) {
			var _text = $(_e).text();
			if(_text.match(_class) && _text.match(_activ) && _text.match(_state)) {
				$(_e).show();
				_count += 1;
			} else {
				$(_e).hide();
			}
		});
		var _gateNum = $('#enemy_guild_battle_section_battle_list, #your_guild_battle_section_battle_list').attr('class').match(/\d/)[0];
		var _gate = $('#enemy_arena_tab_' + _gateNum + ' > div, #your_arena_tab_' + _gateNum + ' > div');
		_gate.html(_gate.html().replace(/\).*/, ')').replace(')', ')<br/><span style="font-size:11px;font-weight:bold;">Filtered: ' + _count + '</span>'));
	}

	//class filter
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
		'Got health' : 'Health: [^0]',
		'No health' : 'Health: 0/',
		'Healthy' : 'Healthy',
		'Good' : 'Good',
		'Fair' : 'Fair',
		'Weakened' : 'Weakened',
		'Stunned' : 'Stunned'
	};
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
		$('#cageGateClassFilter, #cageGateActivityFilter, #cageGateStatusFilter').val('All');
		_storedClass = 'All';
		item.set('cagePageFestGuildBattleClass', _storedClass);
		_storedActivity = 'All';
		item.set('cagePageFestGuildBattleActivity', _storedActivity);
		_storedStatus = 'All';
		item.set('cagePageFestGuildBattleStatus', _storedStatus);
		filterGate();
	}));
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Class </span><select id="cageGateClassFilter">');
	_sel = $('#cageGateClassFilter');
	$.each(filterClass, function(_i, _e) {
		_sel.append('<option value="' + _e + '" ' + (_storedClass == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		_storedClass = $(this).find("option:selected").text();
		item.set('cagePageFestGuildBattleClass', _storedClass);
		filterGate();
	}).selectmenu();
	// Activity filter
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Activity </span><select id="cageGateActivityFilter">');
	_sel = $('#cageGateActivityFilter');
	$.each(filterActivity, function(_i, _e) {
		_sel.append('<option value="' + _e + '" ' + (_storedActivity == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		_storedActivity = $(this).find("option:selected").text();
		item.set('cagePageFestGuildBattleActivity', _storedActivity);
		filterGate();
	}).selectmenu();
	// status filter
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Status </span><select id="cageGateStatusFilter">');
	_sel = $('#cageGateStatusFilter');
	$.each(filterStatus, function(_i, _e) {
		_sel.append('<option value="' + _e + '" ' + (_storedStatus == _i ? 'selected = "selected"' : '') + ' >' + _i + '</option>');
	});
	_sel.change(function() {
		_storedStatus = $(this).find("option:selected").text();
		item.set('cagePageFestGuildBattleStatus', _storedStatus);
		filterGate();
	}).selectmenu();
	filterGate();

};
