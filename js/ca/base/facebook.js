tool('Facebook');

tools.Facebook.settings = function() {

	tools.Settings.heading('Facebook');
	tools.Settings.onoff('Hide Bluebar on start', tools.Facebook.runtime.hideBluebar, 'cage.Facebook.Bluebar', function() {
		tools.Facebook.runtime.hideBluebar != tools.Facebook.runtime.hideBluebar;
	});
};
tools.Facebook.runtimeUpdate = function() {

	tools.Facebook.runtime = {
		friendListWait : false,
		friendListCallbacks : [],
		friendlists : [],
		idWait : false,
		idCallbacks : [],
		id : [],
		friendlistId : {
		},
		listMembersWait : false,
		listMembersNext : [],
		hideBluebar : item.get('cage.Facebook.Bluebar', false)
	};
	$('#cageHideFBBluebar').data('hidden', tools.Facebook.runtime.hideBluebar);
	if(tools.Facebook.runtime.hideBluebar === true) {
		$('#cageHideFBBluebar').data('hidden', !tools.Facebook.runtime.hideBluebar).click();
	}
}
/*
 * Get friendlist members
 */
tools.Facebook.GetListMembers = function(_friendlist, _callback) {

	if(tools.Facebook.runtime.listMembersWait == false) {
		console.log('tools.Facebook.GetListMembers: Reading members of ', _friendlist);
		tools.Facebook.runtime.listMembersWait = true;
		var _listmembers = [];
		customEvent('GetFLMembers', function() {
			var _members = $('#GetFLMembers').val();
			if(_members !== 'false') {
				_members = JSON.parse(_members);
				$.each(_members, function(_i, _e) {
					_listmembers.push(_e.id);
				});
			}
			tools.Facebook.runtime.listMembersWait = false
			if(_callback) {
				_callback(_listmembers);
			}
			while( _call = tools.Facebook.runtime.listMembersNext.shift()) {
				console.log('unparked...');
				_call();
			}
			$('#GetFLMembers').val('');
		});
		addFunction(function(_list) {
			function cageGetFLM() {
				FB.api(_list.flid + '/members', function(_members) {
					if(_members.error) {
						window.setTimeout(function() {
							cageGetFLM(_list);
						}, 100);
					} else {
						$('#GetFLMembers').val(JSON.stringify(_members.data));
						fireGetFLMembers();
					}
				});
			}

			cageGetFLM(_list);
		}, JSON.stringify({
			flid : tools.Facebook.runtime.friendlistId[_friendlist]
		}), true, true);
	} else {
		console.log('parked...');
		tools.Facebook.runtime.listMembersNext.push(function() {
			tools.Facebook.GetListMembers(_friendlist, _callback);
		})
	}
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
						if(_e.installed == true) {
							tools.Facebook.runtime.id.push(_e.id);
						}
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

tools.Facebook.init = function() {
	$(document.body).append($('<img id="cageHideFBBluebar" src="http://www.facebook.com/favicon.ico" class="cageFBBluebar">').data('hidden', false).click(function() {
		if($(this).data('hidden') === false) {
			$(this).data('hidden', true).removeClass('cageFBBluebar').addClass('cageFBBluebarHidden');
			com.send(com.task.hideBluebar, com.port.facebook);
		} else {
			$(this).data('hidden', false).removeClass('cageFBBluebarHidden').addClass('cageFBBluebar');
			com.send(com.task.showBluebar, com.port.facebook);
		}
	}));
	tools.Facebook.runtimeUpdate();
};
