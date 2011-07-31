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
				tools['Eliteguard'].start();
			} else {
				tools['Eliteguard'].start();
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
tools['Eliteguard'].start = function () {
	if (!tools['Eliteguard'].runtime['id']) {
		console.log('Eliteguard: Reading ids...');
		tools['Eliteguard'].runtime['id'] = [];
		tools['Eliteguard'].getUserIds();
	} else {
		console.log('Eliteguard: do it...');
		tools['Eliteguard'].work();
	}
};
tools['Eliteguard'].work = function () {

	if (tools['Eliteguard'].runtime['id'] .length > 0) {
		var _id = tools['Eliteguard'].runtime['id'].pop();
		$.get('party.php?twt=jneg&jneg=true&user=' + _id + '&lka=' + _id + '&etw=1&ref=nf&signed_request=' + CastleAge.signed_request, function(_guarddata) {
			if ($(_guarddata).text().match(/YOUR Elite Guard is FULL!/i)) {
				tools['Eliteguard'].done();
			} else {
				tools['Eliteguard'].work();
			}
		});
	} else {
		tools['Eliteguard'].done();
	}
};
tools['Eliteguard'].done = function () {
	tools['Eliteguard'].fbButton.enable();
};
tools['Eliteguard'].init = function () {
	tools['Eliteguard'].fbButton.add(chrome.i18n.getMessage("buttonEliteGuard"), function () {
		tools['Eliteguard'].fbButton.disable();
		tools['Eliteguard'].start();
	});
};