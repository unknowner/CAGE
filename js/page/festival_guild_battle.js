// Festival battle

tools['Page'].runtime['festival_guild_battle.php'] = function() {

	cageDbg.info('Reworking data: Guild Battle');
	var _your = (1 - ($('div[style*="/guild_battle_bar_you.gif"]').width() / $(
			'div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
	var _enemy = (1 - ($('div[style*="/guild_battle_bar_enemy.gif"]').width() / $(
			'div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
	var $_your = $('#guild_battle_health span:contains("/"):first');
	var $_enemy = $('#guild_battle_health span:contains("/"):last');
	if ($('#guild_battle_health span:contains("/")').length === 2) {
		$_your.html($_your.html() + ' (' + _your.toFixed(1) + '%)');
	}
	$_enemy.html($_enemy.html() + ' (' + _enemy.toFixed(1) + '%)');

	$_enemy = $('span.result_body div[style*="width: 285px;"]:last');
	if ($_enemy.length > 0) {
		var _target = $('span.result_body input[name="target_id"]').attr(
				'value');
		var _health = /Health:\s*(\d+)\/\d+/.exec($(
				'#enemy_guild_battle_section_battle_list  *[uid="' + _target
						+ '"]').parents().eq(3).text())[1];
		$_enemy.html($_enemy.html() + ' (' + _health + ')');
	}
	var _tokens = $('div.result div:contains("-1 Battle Tokens"):last');
	_tokens.text(_tokens.text() + ' (' + $('#guild_token_current_value').text()
			+ ' left)');

};
