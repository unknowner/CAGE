// Guild battle
tools['Page'].runtime['guild_battle.php'] = function() {

	console.log('Page: guild_battle.php');

	// fix gate reseting when attacking with duel button
	var _gate = /\d/.exec($('#enemy_guild_battle_section_battle_list').attr('class'));
	console.log('gate:' + _gate);
	$('span.result_body form').append('<input type="hidden" name="sel_pos" value="' + _gate + '">');

	// add percentage to health bars
	var _your = (1 - ($('div[style*="/guild_battle_bar_you.gif"]').width() / $('div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
	var _enemy = (1 - ($('div[style*="/guild_battle_bar_enemy.gif"]').width() / $('div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
	var $_your = $('span:contains("YOUR GUILD")');
	var $_enemy = $('span:contains("ENEMY\'S GUILD")');
	$_your.html($_your.html() + ' (' + _your.toFixed(1) + '%)');
	$_enemy.html($_enemy.html() + ' (' + _enemy.toFixed(1) + '%)');
	$_enemy = $('span.result_body div[style*="width: 285px;"]:last');
	if($_enemy.length > 0) {
		var _target = $('span.result_body input[name="target_id"]').attr('value');
		var _health = /Health:\s*(\d+)\/\d+/.exec($('#enemy_guild_battle_section_battle_list  *[uid="' + _target + '"]').parents().eq(3).text())[1];
		$_enemy.html($_enemy.html() + ' (' + _health + ')');
	}

	// resize top image
	$('#guild_battle_banner_section').css('height', 190).find('div').eq(5).css('marginTop', 0);
	$('div:contains("The Battle Between"):last').parent().css('marginTop', 20);
	$('input[src*="collect_reward_button2.jpg"]').parents('div:eq(2)').css('marginTop', 0);

	// add current tokens to result
	var _tokens = $('div.result div:contains("-1 Battle Tokens"):last');
	_tokens.text(_tokens.text() + ' (' + $('#guild_token_current_value').text() + ' left)');

	//gate filter
	function filterGate() {
		var _class = new RegExp($('#cageGateClassFilter').val());
		var _activ = new RegExp($('#cageGateActivityFilter').val());
		var _state = new RegExp($('#cageGateStatusFilter').val());
		$('#your_guild_member_list > div > div, #enemy_guild_member_list > div > div').each(function(_i, _e) {
			var _text = $(_e).text();
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
		'All' : 'Battle Activity Points:',
		'Active' : 'Battle Activity Points: [^0]',
		'Inactive' : 'Battle Activity Points: 0'
	}, filterStatus = {
		'All' : 'Healthy|Stunned|Weakened|Good',
		'Healthy' : 'Healthy',
		'Good' : 'Good',
		'Fair' : 'Fair',
		'Weakened' : 'Weakened',
		'Stunned' : 'Stunned'
	};
	// Class filter
	$('body > ul.ui-selectmenu-menu').remove();
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
