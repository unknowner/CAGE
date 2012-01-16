new tool('Facebook');

tools.Facebook.runtime = {
	friendListWait : false,
	friendListCallbacks : [],
	friendlists : [],
	idWait : false,
	idCallbacks : [],
	id : [],
	friendlistId : {}
};

/*
 * Get Friend list names from FB
 */
tools.Facebook.getFriendlists = function(_callback) {

	if(tools.Facebook.runtime.friendListWait == false) {
		if(tools.Facebook.runtime.friendlists.length !== 0) {
			_callback(tools.Facebook.runtime.friendlists);
		} else {
			console.log('tools.Facebook.getFriendlists: Get FB friend lists...');
			tools.Facebook.runtime.friendListWait = true;
			customEvent('GetFriendLists', function() {
				var _fl = $('#GetFriendLists').val();
				if(_fl !== 'false') {
					$.each(JSON.parse(_fl), function(_i, _e) {
						tools.Facebook.runtime.friendlistId[_e.name] = _e.id;
						tools.Facebook.runtime.friendlists.push(_e.name);
					})
				}
				tools.Facebook.runtime.friendListWait = false;
				if(_callback) {
					_callback(tools.Facebook.runtime.friendlists.sort());
				}
				while( _call = tools.Facebook.runtime.friendListCallbacks.shift()) {
					_call(tools.Facebook.runtime.friendlists);
				}
				$('#GetFriendLists').val('');
			});
			addFunction(function() {
				function getFriendlists() {
					FB.api('me/friendlists', {
						'list_type' : 'user_created'
					}, function(responseFriendlist) {
						if(responseFriendlist.error) {
							window.setTimeout(getFriendlists, 100);
						} else {
							var _lists = [];
							$.each(responseFriendlist.data, function(_i, _e) {
								if(_e.name) {
									_lists.push(_e);
								}
							});
							$('#GetFriendLists').val(JSON.stringify(_lists));
							fireGetFriendLists();
						}
					});
				};

				getFriendlists();
			}, null, true, true);
		}
	} else {
		tools.Facebook.runtime.friendListCallbacks.push(_callback);
	}
};
/*
 * Get CA Players from FB
 */
tools.Facebook.CAPlayers = function(_callback) {

	if(tools.Facebook.runtime.idWait == false) {
		if(tools.Facebook.runtime.id.length > 0) {
			_callback(tools.Facebook.runtime.id);
		} else {
			console.log('tools.Facebook.CAPlayers: Reading CA players...');
			tools.Facebook.runtime.idWait = true;
			tools.Facebook.runtime.id = [];
			customEvent('GetArmy', function() {
				var _army = $('#GetArmy').val();
				if(_army !== 'false') {
					_army = JSON.parse(_army);
					$.each(_army, function(_i, _e) {
						tools.Facebook.runtime.id.push(_e.id);
					});
				}
				tools.Facebook.runtime.idWait = false
				if(_callback) {
					_callback(tools.Facebook.runtime.id);
				}
				while( _call = tools.Facebook.runtime.idCallbacks.shift()) {
					_call(tools.Facebook.runtime.id);
				}
				$('#GetArmy').val('');
			});
			addFunction(function() {
				FB.api('/me/friends?fields=installed', function(_response) {
					console.log('tools.Facebook.CAPlayers: got army...');
					if(_response.data.length > 0) {
						$('#GetArmy').val(JSON.stringify(_response.data));
					} else {
						$('#GetArmy').val('false');
					}
					fireGetArmy();
				});
			}, null, true, true);
		}
	} else {
		tools.Facebook.runtime.idCallbacks.push(_callback);
	}
};
