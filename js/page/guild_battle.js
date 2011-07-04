// Guild battle
tools['Page'].runtime['guild_battle.php'] = function () {
	console.log('Page: guild_battle.php');
	// add percentage to health bars
	var _your = (1 - ($('div[style*="/guild_battle_bar_you.gif"]').width() / $('div[style*="/guild_battle_bar_you.gif"]').parent().width())) * 100;
	var _enemy = (1 - ($('div[style*="/guild_battle_bar_enemy.gif"]').width() / $('div[style*="/guild_battle_bar_enemy.gif"]').parent().width())) * 100;
	var $_your = $('span:contains("YOUR GUILD")');
	var $_enemy = $('span:contains("ENEMY\'S GUILD")');
	$_your.html($_your.html() + ' (' + _your.toFixed(1) + '%)');
	$_enemy.html($_enemy.html() + ' (' + _enemy.toFixed(1) + '%)');
	$_enemy = $('span.result_body div[style*="width: 285px;"]:last');
	if ($_enemy.length > 0) {
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
	// fix gate reseting when attacking with duel button
	var _gate = /\d/.exec($('#enemy_guild_battle_section_battle_list').attr('class'));
	$('#results_main_wrapper form').append('<input type="hidden" name="sel_pos" value="' + _gate + '">');
};
