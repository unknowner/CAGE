new tool('Eliteguard');

tools['Eliteguard'].runtime = {};

tools['Eliteguard'].getUserIds = function () {

	console.log('Eliteguard: Reading guild...');
	$.get('guild.php?signed_request=' + CastleAge.signed_request, function (_guild) {
		console.log('Eliteguard: got guild...');
		$('#cta_log input[name="guild_player_id"]', _guild).each( function () {
			tools['Eliteguard'].runtime['id'].push($(this).prop('value'));
		});
		tools['Eliteguard'].runtime['id'] = unique(tools['Eliteguard'].runtime['id']);
		console.log('Eliteguard: Reading army...');

		customEvent('GetArmy', function() {
			var _army = $('#GetArmy').val();
			if(_army !== 'false') {
				$.each(JSON.parse(_army), function(_i, _e) {
					tools['Eliteguard'].runtime['id'].push(_e['uid']);
				});
				tools['Eliteguard'].start[com.port.castleAge]();
			} else {
				tools['Eliteguard'].start[com.port.castleAge]();
			}
		});
		addFunction( function() {
			FB.api({
				method: 'fql.query',
				query: 'SELECT uid FROM user WHERE is_app_user=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
			}, function (_response) {
				console.log('Eliteguard: got army...');
				if (_response.length > 0) {
					$('#GetArmy').val(JSON.stringify(_response));
				} else {
					$('#GetArmy').val('false');
				}
				fireGetArmy();
			});
		}, null, true, true);
	});
};
tools['Eliteguard'].start[com.port.castleAge] = function () {
	if (!tools['Eliteguard'].runtime['id']) {
		console.log('Eliteguard: Reading ids...');
		tools['Eliteguard'].runtime['id'] = [];
		tools['Eliteguard'].getUserIds();
	} else {
		console.log('Eliteguard: do it...');
		tools['Eliteguard'].work[com.port.castleAge]();
	}
};
tools['Eliteguard'].work[com.port.castleAge] = function () {

	if (tools['Eliteguard'].runtime['id'] .length > 0) {
		var _id = tools['Eliteguard'].runtime['id'].pop();
		$.get('party.php?twt=jneg&jneg=true&user=' + _id + '&lka=' + _id + '&etw=1&ref=nf&signed_request=' + CastleAge.signed_request, function(_guarddata) {
			if ($(_guarddata).text().match(/YOUR Elite Guard is FULL!/i)) {
				tools['Eliteguard'].done[com.port.castleAge]();
			} else {
				tools['Eliteguard'].work[com.port.castleAge]();
			}
		});
	} else {
		tools['Eliteguard'].done[com.port.castleAge]();
	}
};
tools['Eliteguard'].done[com.port.castleAge] = function () {
	com.send(com.task.fbButtonEnable, com.port.facebook, 'Eliteguard');
};
tools['Eliteguard'].init[com.port.facebook] = function () {
	tools['Eliteguard'].fbButton.add('Elite guard', function () {
		tools['Eliteguard'].fbButton.disable();
		com.send(com.task.eliteGuard, com.port.castleAge, null);
	});
};