// Festival battle
tools['Page'].runtime['festival_guild_battle.php'] = function() {

	console.log('Reworking data: festival_guild_battle');

	// add percentage to health bars
	var _your = (1 - ($('div[style*="/guild_battle_bar_you.gif"]').width() / $('div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
	var _enemy = (1 - ($('div[style*="/guild_battle_bar_enemy.gif"]').width() / $('div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
	var $_your = $('#guild_battle_health span:contains("/"):first');
	var $_enemy = $('#guild_battle_health span:contains("/"):last');
	if($('#guild_battle_health span:contains("/")').length === 2) {
		$_your.html($_your.html() + ' (' + _your.toFixed(1) + '%)');
	}
	$_enemy.html($_enemy.html() + ' (' + _enemy.toFixed(1) + '%)');
	$_enemy = $('span.result_body div[style*="width: 285px;"]:last');
	if($_enemy.length > 0) {
		var _target = $('span.result_body input[name="target_id"]').attr('value');
		var _health = /Health:\s*(\d+)\/\d+/.exec($('#enemy_guild_battle_section_battle_list  *[uid="' + _target + '"]').parents().eq(3).text())[1];
		$_enemy.html($_enemy.html() + ' (' + _health + ')');
	}

	// add current tokens to result
	var _tokens = $('div.result div:contains("-1 Battle Tokens"):last');
	_tokens.text(_tokens.text() + ' (' + $('#guild_token_current_value').text() + ' left)');

	// fix gate reseting when attacking with duel button
	var _gate = /\d/.exec($('#enemy_guild_battle_section_battle_list').attr('class'));
	$('#results_container form').append('<input type="hidden" name="attacking_position" value="' + _gate + '">');
	
	//gate filter
	function filterGate() {
		var _class = new RegExp($('#cageGateClassFilter').val());
		var _activ = new RegExp($('#cageGateActivityFilter').val());
		var _state = new RegExp($('#cageGateStatusFilter').val());
		$('#your_guild_member_list > div > div, #enemy_guild_member_list > div > div').each(function(_i, _e) {
			var _text = $(_e).text();
			console.log(_class.exec(_text) + '-' + _activ.exec(_text) + '-' + _state.exec(_text));
			if(_text.match(_class) && _text.match(_activ) && _text.match(_state)) {
				$(_e).show();
			} else {
				$(_e).hide();
			}
		});
	}

	//class filter
	var filterClass = {
		'All' : 'Cleric|Mage|Rogue|Warrior',
		'Cleric' : 'Cleric',
		'Mage' : 'Mage',
		'Rogue' : 'Rogue',
		'Warrior' : 'Warrior'
	}, filterActivity = {
		'All' : 'Festival Activity Points:',
		'Active' : 'Festival Activity Points: [^0]',
		'Inactive' : 'Festival Activity Points: 0'
	}, filterStatus = {
		'All' : 'Healthy|Stunned|Weakened|Good',
		'Healthy' : 'Healthy',
		'Good' : 'Good',
		'Weakened' : 'Weakened',
		'Stunned' : 'Stunned'
	};
	// Class filter
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Class </span><select id="cageGateClassFilter">');
	_sel = $('#cageGateClassFilter');
	$.each(filterClass, function(_i, _e) {
		_sel.append('<option value="' + _e + '">' + _i + '</option>');
	});
	_sel.change(filterGate).selectmenu();
	// Activity filter
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Activity </span><select id="cageGateActivityFilter">');
	_sel = $('#cageGateActivityFilter');
	$.each(filterActivity, function(_i, _e) {
		_sel.append('<option value="' + _e + '">' + _i + '</option>');
	});
	_sel.change(filterGate).selectmenu();
	// status filter
	$('#guild_battle_health').append('<span class="cageGateFilterTitle ui-state-default"> Status </span><select id="cageGateStatusFilter">');
	_sel = $('#cageGateStatusFilter');
	$.each(filterStatus, function(_i, _e) {
		_sel.append('<option value="' + _e + '">' + _i + '</option>');
	});
	_sel.change(filterGate).selectmenu();

	//reduce gate size and add number
	$('#enemy_guild_member_list > div > div, #your_guild_member_list > div > div').each(function(_i, _e) {
		$(_e).find('img[src*="guild_class_upgrades"]').each(function(_i, _e) {

		});
		$(_e).addClass('GuildList').append('<span class="GuildNum">' + (_i + 1) + '<span>')
	});
};
