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
	var _guildnum = 1;
	$('#enemy_guild_member_list > div > div, #your_guild_member_list > div > div').each(function(_i, _e) {
		if ($(_e).text().trim().length > 0) {
			$(_e).append('<span class="GuildNum">' + (_guildnum) + '<span>');
			_guildnum += 1;
		} else {
			$(_e).remove();
		}
	});

	};
