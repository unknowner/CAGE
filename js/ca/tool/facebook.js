new tool('Facebook');

tools.Facebook.runtime = {};

tools.Facebook.CAPlayers = function(_callback) {
	console.log('Eliteguard: Reading CA players...');

	if(tools.Facebook.runtime.id) {
		_callback(tools.Facebook.runtime.id);
	} else {
		tools.Facebook.runtime.id = [];
		customEvent('GetArmy', function() {
			var _army = $('#GetArmy').val();
			if(_army !== 'false') {
				$.each(JSON.parse(_army), function(_i, _e) {
					tools.Facebook.runtime.id.push(_e['uid']);
				});
			}
			if(_callback) {
				_callback(tools.Facebook.runtime.id);
			}
			$('#GetArmy').val('');
		});
		addFunction(function() {
			FB.api({
				method : 'fql.query',
				query : 'SELECT uid FROM user WHERE is_app_user=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
			}, function(_response) {
				console.log('CAPlayers: got army...');
				if(_response.length > 0) {
					$('#GetArmy').val(JSON.stringify(_response));
				} else {
					$('#GetArmy').val('false');
				}
				fireGetArmy();
			});
		}, null, true, true);
	}
};
