new tool('Gifter');

tools.Gifter.settings = function() {
	//tools.Gifter.runtimeUpdate();
	tools.Settings.heading(language.gifterSetName);
	tools.Settings.text(language.gifterSetFilterDesc);
	tools.Settings.dropdown(language.giftersetFilterAction, tools.Gifter.runtime.userLists, tools.Gifter.runtime.userList, 'cageGifterUserList', function(_value) {
		tools.Gifter.runtime.userList = _value;
		tools.Gifter.newRequestForm();
	});
};

tools.Gifter.runtimeUpdate = function() {
	tools.Gifter.runtime = {
		sendGiftTo : item.get('CAGEsendGiftTo', []),
		requests : tools.Gifter.runtime == undefined ? [] : tools.Gifter.runtime.requests,
		userLists : {},
		userList : item.get('cageGifterUserList', '')
	}
	if(tools.Gifter.runtime.sendGiftTo == null) {
		tools.Gifter.runtime.sendGiftTo = [];
	}
	tools.Facebook.getFriendlists(function(_names) {
		$.each(_names, function(_i, _e) {
			tools.Gifter.runtime.userLists[_e] = _e;
		});
		//tools.Gifter.newRequestForm();
	});
};

tools.Gifter.update = function() {

	//prepare update event to receive userids and request ids
	customEvent('GiftRequests', function() {
		var _gifts = JSON.parse($('#GiftRequests').val());
		var _received = 0;
		if(_gifts) {
			$.each(_gifts.data, function(_i, _e) {
				if(_e.from !== null) {
					_received++;
					if($.inArray(_e.from.id, tools.Gifter.runtime.sendGiftTo) == -1) {
						tools.Gifter.runtime.sendGiftTo.push(_e.from.id);
					}
					tools.Gifter.runtime.requests.push(_e.id);
				}
			});
			if(_received == 0) {
				note('Gifter', 'No gifts to accept.');
			} else {
				note('Gifter', 'You accepted ' + tools.Gifter.runtime.requests.length + ' gift(s).');
			}

			item.set('CAGEsendGiftTo', tools.Gifter.runtime.sendGiftTo);
			tools.Gifter.runtimeUpdate();
		}
		tools.Gifter.work();
	});
	addFunction(function() {
		FB.api('/me/apprequests/', function(_response) {
			fireGiftRequests(JSON.stringify(_response));
			console.log('giftrewp:', _response);
		});
	}, null, true, true);
};
tools.Gifter.start = function() {
	tools.Gifter.runtimeUpdate();
	tools.Gifter.update();
};
tools.Gifter.work = function() {
	if(tools.Gifter.runtime.requests.length > 0) {
		$.get('index.php?request_ids=' + tools.Gifter.runtime.requests.join(',') + '&signed_request=' + $('#signed_request').val(), function(_data) {
			tools.Gifter.done();
		});
	} else {
		tools.Gifter.done();
	}
};
tools.Gifter.done = function() {
	tools.Gifter.fbButton.enable();
};
tools.Gifter.newRequestForm = function() {

	addFunction(function(_giftData) {

		var cageGiftUserList = [];

		function getCageFriendList() {
			FB.api(_giftData.flid + '/members', function(_members) {
				if(_members.error) {
					window.setTimeout(getCageFriendList, 100);
				} else {
					console.log('GIFTER - friendlists:', _members);
					$.each(_members.data, function(_i, _e) {
						cageGiftUserList.push(_e.id);
					});
					return false;
				}
			});
		}

		getCageFriendList();

		window['showRequestForm'] = function(tit, msg, track, request_params, filt_ids) {
			var _ui = {
				method : 'apprequests',
				message : msg,
				data : track,
				title : tit,
				filters : ['app_users', 'all', 'app_non_users']
			};

			if(cageGiftUserList.length > 0) {
				_ui.filters.unshift({
					name : _giftData.userList,
					user_ids : cageGiftUserList
				})
			}
			if(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo'] !== undefined && localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo'] !== null && JSON.parse(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo']).length !== 0) {
				console.log(JSON.parse(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo']).length);
				console.log('GIFTER - RTF list: ', JSON.parse(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo']));
				_ui.filters.unshift({
					name : 'Return the favour',
					user_ids : localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo']
				})
			} else {
				localStorage.removeItem(FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo');
			}

			FB.ui(_ui, function(result) {
				console.log('result:', result);
				$('#AjaxLoadIcon').show();
				// fixes infinite looping for popup window if u close it before it is done loading
				$('.fb_dialog_iframe').each(function() {
					$(this).remove();
				});
				if(result && result.to) {
					$('#results_container').html('Sending gifts...<br>').show();
					var _resultContainer = $('#results_container');
					var _store = null;
					_resultContainer.html('Sending to: ...<br>').show();
					// get all ids from sent gifts and remove them from the list
					console.log('GIFTER - check for RTFs');
					if(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo'] !== undefined) {
						console.log('GIFTER - found open RTF');
						var _store = JSON.parse(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo']);
						console.log('store:', _store);
					}
					FB.api('/me/friends', {
						fields : 'name'
					}, function(response) {
						var _friends = {};
						var _requestids = [];
						$.each(response.data, function(_i, _e) {
							_friends[_e.id] = _e.name;
						});
						$.each(result.to, function(_i, _e) {
							_requestids.push(result.request + '_' + _e);
							var _fr = '';
							if(_store !== null && _store.indexOf(_e) > -1) {
								_store.splice(_store.indexOf(_e), 1);
								_fr = ' - <b>Favour returned</b>';
								if(_store.length > 0) {
									localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo'] = JSON.stringify(_store);
								} else {
									console.log('GIFTER - clear RTF list');
									localStorage.removeItem(FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo');
								}
							}
							_resultContainer.append('<br>...' + _friends[_e] + ' (' + _e + ')' + _fr);
						});
						var params = 'ajax=1&signed_request=' + $('#signed_request').val();
						console.log(_requestids);
						$.ajax({
							url : 'request_handler.php?' + request_params + '&request_ids=' + _requestids,
							context : document.body,
							data : params,
							type : 'POST',
							success : function(data) {
								$('#results_container').html($('#results_container').html() + '<br><br>' + result.to.length + ' request' + (result.to.length == 1 ? '' : 's') + ' sent!');
								FB.XFBML.parse(document.getElementById('results_container'));
								$('#AjaxLoadIcon').hide();
							}
						});
					});
				} else {
					$('#AjaxLoadIcon').hide();
				}
			});
		}
	}, JSON.stringify({
		userList : tools.Gifter.runtime.userList,
		flid : tools.Facebook.runtime.friendlistId[tools.Gifter.runtime.userList]
	}), true, true);
};
tools.Gifter.init = function() {
	tools.Gifter.runtimeUpdate();
	tools.Gifter.fbButton.add(language.gifterButton, function() {
		tools.Gifter.fbButton.disable();
		tools.Gifter.start();
	});
};
