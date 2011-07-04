new tool('Eliteguard');

tools['Eliteguard'].runtime = {};

tools['Eliteguard'].getUserIds = function() {

	console.log('Eliteguard: Reading guild...');
	$
	.get(
	'guild.php', function(_guild) {
		console.log('Eliteguard: got guild...');
		$('#cta_log input[name="guild_player_id"]', _guild)
		.each( function() {
			tools['Eliteguard'].runtime['id']
			.push($(this).prop('value'));
		});
		console.log('Eliteguard: Reading army...');
		FB
		.api({
			method : 'fql.query',
			query : 'SELECT uid FROM user WHERE is_app_user=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
		}, function(_response) {
			console
			.log('Eliteguard: got army...');
			if (_response.length > 0) {
				$jQ
				.each(
				_response, function(i, e) {
					tools['Eliteguard'].runtime['id']
					.push(this.uid);
				});
			}
			tools['Eliteguard'].start[com.port.castleAge]
			();
		});
	});
};
tools['Eliteguard'].start[com.port.castleAge] = function() {
	console.log('Eliteguard...');
	if (!tools['Eliteguard'].runtime['id']) {
		console.log('Eliteguard: Reading ids...');
		tools['Eliteguard'].runtime['id'] = [];
		tools['Eliteguard'].getUserIds();
	} else {
		console.log('Eliteguard: do it...');
	}

};
tools['Eliteguard'].done[com.port.castleAge] = function() {

	com.send(com.task.fbButtonEnable, com.port.facebook, 'Eliteguard');

};
tools['Eliteguard'].init[com.port.facebook] = function() {

	tools['Eliteguard'].fbButton.add('Elite guard', function() {
		tools['Eliteguard'].fbButton.disable();
		com.send(com.task.eliteGuard, com.port.castleAge, null);
	});
};