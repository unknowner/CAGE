// Conquest battle
tools.Page.pages['guildv2_conquest_expansion.php'] = function() {

	console.log('Page: guildv2_conquest_expansion.php');
	var _defenderHealth = 0, _actions = parseInt(/\d+/.exec($('#app_body div:contains("ACTIONS LEFT:"):last').text()), 10);
	$('#your_guild_member_list_1 > div').each(function() {
		_defenderHealth += parseInt(/(\d+)(?:\/)/.exec($(this).text())[1], 10);
	});
	if(_defenderHealth > 0) {
		$('#app_body div[style*="/graphics/war_art24.jpg"]:last').prepend('<div id="cageHealthAction">Health/Action: ' + (_defenderHealth / _actions).toFixed(0) + '</div>');
	}

};
