tool('Gifter');

tools.Gifter.init = function() {
	tools.Gifter.runtimeUpdate();
	tools.Gifter.newRequestForm();
	tools.Sidebar.button.add('cageGiftReceive', language.gifterButton, function() {
		tools.Sidebar.button.disable('cageGiftReceive');
		tools.Sidebar.button.disable('cageGiftReceiveAndReturn');
		tools.Gifter.start();
	});
	tools.Sidebar.button.add('cageGiftReceiveAndReturn', language.gifterReturn, function() {
		tools.Sidebar.button.disable('cageGiftReceive');
		tools.Sidebar.button.disable('cageGiftReceiveAndReturn');
		tools.Gifter.runtime.returnGift = true;
		tools.Gifter.start();
	});
	//prepare update event to receive userids and request ids
	customEvent('GiftRequests', function() {
		console.log('EVENT: GiftRequests');
		_gifts = JSON.parse(JSON.parse($('#GiftRequests').val()));
		console.log(_gifts);
		var _received = 0;
		if(_gifts) {
			$.each(_gifts.data, function(_i, _e) {
				if(_e.from !== null) {
					if($.inArray(_e.from.id, tools.Gifter.runtime.sendGiftTo) === -1) {
						tools.Gifter.runtime.sendGiftTo.push(_e.from.id);
						_received++;
					}
					tools.Gifter.runtime.requests.push(_e.id);
				}
			});
			if(_received === 0) {
				note('Gifter', 'No gifts to accept.');
			} else {
				note('Gifter', 'You accepted ' + _received + ' gift(s).');
			}
			item.set('CAGEsendGiftTo', tools.Gifter.runtime.sendGiftTo);
		}
		tools.Gifter.work();
	});
	customEvent('GifterDone', tools.Gifter.done);
};
tools.Gifter.settings = function() {
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
		requests : tools.Gifter.runtime === null ? [] : tools.Gifter.runtime.requests,
		userLists : {},
		userList : item.get('cageGifterUserList', ''),
		returnGift : false,
		returnGiftNum : 1,
		returnGiftName : null
	}
	if(tools.Gifter.runtime.sendGiftTo == null) {
		tools.Gifter.runtime.sendGiftTo = [];
	}
	tools.Facebook.getFriendlists(function(_names) {
		$.each(_names, function(_i, _e) {
			tools.Gifter.runtime.userLists[_e] = _e;
		});
	});
	console.log('tools.Gifter.runtime', tools.Gifter.runtime);
};
7
tools.Gifter.start = function() {
	addFunction(function() {
		FB.api('/me/apprequests/', function(_response) {
			console.log('giftrewp:', _response);
			fireGiftRequests(JSON.stringify(_response));
		});
	}, null, true, true);
};
tools.Gifter.work = function() {
	if(tools.Gifter.runtime.requests.length > 0) {
		signedGet('index.php?request_ids=' + tools.Gifter.runtime.requests.join(','), function(_data) {
			_data = $(noSrc(_data));
			$('#results_container').after(noNoSrc(_data.find('div[style*="graphics/newrequest_background.jpg"]:first')));
			$('#gift_requests span').css('fontSize', 12);
			tools.Gifter.done();
		});
	} else {
		tools.Gifter.done();
	}
};
tools.Gifter.done = function() {
	if(tools.Gifter.runtime.returnGift === true) {
		if(tools.Gifter.runtime.returnGiftName === null) {
			get('gift.php?request_ids=' + tools.Gifter.runtime.requests.join(','), function(_data) {
				tools.Gifter.runtime.returnGiftName = $(_data).find('div[id="gift' + tools.Gifter.runtime.returnGiftNum + '"]:first').text().trim().replace('!', '');
				tools.Gifter.done();
			});
		} else {
			console.log('RTF!');
			addFunction(function(_gift) {
				FB.api('/me', function(response) {
					showRequestForm('Castle Age', encodeURI(response.first_name) + ' ' + encodeURI(response.last_name) + ' has sent you a ' + _gift.name + ' in Castle Age! Click to accept gift.', 'abc=123', 'act=create&gift=' + _gift.num, null, true);
				});
			}, JSON.stringify({
				num : tools.Gifter.runtime.returnGiftNum,
				name : tools.Gifter.runtime.returnGiftName
			}), true, true);
			tools.Gifter.runtime.returnGift = false;
		}
	} else {
		tools.Gifter.runtime.returnGift = false;
		tools.Gifter.runtimeUpdate();
		tools.Sidebar.button.enable('cageGiftReceive');
		tools.Sidebar.button.enable('cageGiftReceiveAndReturn');
		$('#AjaxLoadIcon').hide();
	}
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

		if(_giftData.flid) {
			getCageFriendList();
		}

		window['showRequestForm'] = function(tit, msg, track, request_params, filt_ids, rtf) {
			var cageGifterVars = {
				result : null,
				userId : FB.getAuthResponse().userID,
				sendTo : undefined
			};
			console.log('0:', localStorage[cageGifterVars.userId + '_' + 'CAGEsendGiftTo']);
			cageGifterVars.sendTo = localStorage[cageGifterVars.userId + '_' + 'CAGEsendGiftTo'];
			var _ui = {
				method : 'apprequests',
				message : msg,
				data : track,
				title : tit,
				filters : ['app_users', 'all', 'app_non_users'],
			};
			console.log('_uid1', cageGifterVars.userId);
			console.log('localStorage[cageGifterVars.userId CAGEsendGiftTo]', cageGifterVars.sendTo);
			if(cageGiftUserList.length > 0) {
				_ui.filters.unshift({
					name : _giftData.userList,
					user_ids : cageGiftUserList
				});
			}
			if(cageGifterVars.sendTo !== undefined && cageGifterVars.sendTo !== null && JSON.parse(cageGifterVars.sendTo).length > 0) {
				console.log('GIFTER - RTF list: ', JSON.parse(cageGifterVars.sendTo));
				if(rtf === true) {
					_ui.to = cageGifterVars.sendTo;
				} else {
					_ui.filters.unshift({
						name : 'Return the favor',
						user_ids : cageGifterVars.sendTo
					});
				}
			} else {
				localStorage.removeItem(cageGifterVars.userId + '_' + 'CAGEsendGiftTo');
			}
			FB.ui(_ui, function(result) {
				cageGifterVars.result = result;
				console.log('.reuslt', cageGifterVars.result);
				$('#AjaxLoadIcon').show();
				// fixes infinite looping for popup window if u close it before it is done loading
				$('.fb_dialog_iframe').each(function() {
					$(this).remove();
				});
				if(cageGifterVars.result === null || cageGifterVars.result === undefined) {
					fireGifterDone();
				} else {
					getFriendsName(giftReturning);
				}
			});

			function getFriendsName(_callback) {
				FB.api('/me/friends', {
					fields : 'name'
				}, function(response) {
					if(response.error) {
						console.log('getFriendsName error:', response);
						getFriendsName(_callback);
					} else {
						_callback(response);
					}
				});
			}

			function giftReturning(_friendsnames) {
				var _friends = {}, _requestids = [], _store = null, _resultContainer = $('#results_container'), params = 'ajax=1&signed_request=' + $('#signed_request').val();
				// get all ids from sent gifts and remove them from the list
				console.log('_friendsnames', _friendsnames);
				console.log('GIFTER - check for RTFs');
				_resultContainer.html('Sending gifts...<br>').show();
				_resultContainer.css('borderRadius', 5).html('Sending to: ...<br>').show();
				if(cageGifterVars.sendTo !== undefined) {
					console.log('GIFTER - found open RTF');
					_store = JSON.parse(cageGifterVars.sendTo);
					console.log('store:', _store, 'cageGifterVars', cageGifterVars);
				}
				$.each(_friendsnames.data, function(_i, _e) {
					_friends[_e.id] = _e.name;
				});
				console.log('cageGifterVars.result.to', cageGifterVars.result.to);
				$.each(cageGifterVars.result.to, function(_i, _e) {
					var _fr = '';
					console.log(_i, _e);
					if(_store !== null && _store.indexOf(_e) > -1) {
						_store.splice(_store.indexOf(_e), 1);
						_fr = ' - <b>Favor returned</b>';
						if(_store.length > 0) {
							localStorage[cageGifterVars.userId + '_' + 'CAGEsendGiftTo'] = JSON.stringify(_store);
						} else {
							console.log('GIFTER - clear RTF list');
							localStorage.removeItem(cageGifterVars.userId + '_' + 'CAGEsendGiftTo');
							console.log('3:', localStorage[cageGifterVars.userId + '_' + 'CAGEsendGiftTo']);
						}
					}
					_resultContainer.append('<br>...' + _friends[_e] + ' (' + _e + ')' + _fr);
				});
				$.ajax({
					url : 'request_handler.php?' + request_params + '&request_ids=' + cageGifterVars.result.to.join(','),
					context : document.body,
					data : params,
					type : 'POST',
					success : function(data) {
						$('#results_container').html($('#results_container').html() + '<br><br>' + cageGifterVars.result.to.length + ' request' + (cageGifterVars.result.to.length === 1 ? '' : 's') + ' sent!');
						FB.XFBML.parse(document.getElementById('results_container'));
						cageGifterVars = null;
						console.log('cageGifterVars', cageGifterVars);
						fireGifterDone();
					}
				});
			}

		};
	}, JSON.stringify({
		userList : tools.Gifter.runtime.userList,
		flid : tools.Facebook.runtime.friendlistId[tools.Gifter.runtime.userList]
	}), true, true);
};
