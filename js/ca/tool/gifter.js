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

	customEvent('GiftRequests', tools.Gifter.getGiftIDsFromFB);
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
		returnGiftName : null,

		// new gifting system
		sendToID : item.get('cage.Gifter.sendToID', []),
		sendToList : item.get('cage.Gifter.sendToList', {})

	};
	if (tools.Gifter.runtime.sendGiftTo == null) {
		tools.Gifter.runtime.sendGiftTo = [];
	}
	tools.Facebook.getFriendlists(function(_names) {
		$.each(_names, function(_i, _e) {
			tools.Gifter.runtime.userLists[_e] = _e;
		});
	});
	console.log('tools.Gifter.runtime', tools.Gifter.runtime);
};
tools.Gifter.getGiftIDsFromFB = function() {
	console.log('EVENT: GiftRequests');
	var _gifts = JSON.parse(JSON.parse($('#GiftRequests').val())), _received = 0;
	if (_gifts) {
		$.each(_gifts.data, function(_i, _e) {
			if (_e.from !== null) {
				tools.Gifter.runtime.sendToID.push(_e.from.id);
				_received++;
			}
		});
		if (_received === 0) {
			note('Gifter', 'No gifts to accept.');
		} else {
			note('Gifter', _received + ' gift(s) found...');
			item.set('cage.Gifter.sendToID', tools.Gifter.runtime.sendToID);
		}
	}
	tools.Gifter.work();
};

tools.Gifter.start = function() {
	addFunction(function() {
		FB.api('/me/apprequests/', function(_response) {
			fireGiftRequests(JSON.stringify(_response));
		});
	}, null, true, true);
};

// New gifting stuff
tools.Gifter.receiveGift = function() {
	// allgifts: http://apps.facebook.com/castle_age/index.php?feed=allies&news_feed_accept=0
	// prepare update event to receive userids and request ids
	/*
	 * feed: "allies" news_feed_accept: "1" request_id: "0" request_type: "1001" sender_id: "xxxx"
	 * 
	 * _gifts application: Object created_time: "2013-04-26T11:54:01+0000" data: "abc=123" from: Object >>id:
	 * "100000092298590" >>name: "Jeannette Kemp" __proto__: Object id: "176411245848062_1444886476" message: "Jeannette
	 * Kemp has sent you a Mystery Shield Gift in Castle Age! Click to accept gift."
	 * 
	 * 
	 */
	var _id = tools.Gifter.runtime.sendToID.pop();
	signedGet('index.php?feed=allies&news_feed_accept=1&sender_id=' + _id + '&request_id=0&request_type=1001', function(_data) {
		_data = $($.parseHTML(noSrc(_data)));
		item.set('cage.Gifter.sendToID', tools.Gifter.runtime.sendToID);
		console.log($('div[style*="/graphics/gift_background.jpg"] img:first', _data));
		var _img = /([^\/]+$)/.exec($('div[style*="/graphics/gift_background.jpg"] img:first', _data).attr('nosrc'))[0];
		if (_img) {
			if (!tools.Gifter.runtime.sendToList[_img]) {
				tools.Gifter.runtime.sendToList[_img] = [];
			}
			tools.Gifter.runtime.sendToList[_img].push(_id);
			item.set('cage.Gifter.sendToList', tools.Gifter.runtime.sendToList);
		}
		if (tools.Gifter.runtime.sendToID.length !== 0) {
			tools.Gifter.receiveGift();
		} else {
			tools.Gifter.work();
		}
	});
};

tools.Gifter.work = function() {
	if (tools.Gifter.runtime.sendToID.length !== 0) {
		tools.Gifter.receiveGift();
	} else {
		console.log(tools.Gifter.runtime.sendToList);
		tools.Gifter.done();
	}
};
tools.Gifter.workOLD = function() {
	if (tools.Gifter.runtime.requests.length > 0) {
		signedGet('index.php?request_ids=' + tools.Gifter.runtime.requests.join(','), function(_data) {
			_data = $($.parseHTML(noSrc(_data)));
			$('#results_container').after(noNoSrc(_data.find('div[style*="graphics/newrequest_background.jpg"]:first')));
			$('#gift_requests span').css('fontSize', 12);
			tools.Gifter.done();
		});
	} else {
		tools.Gifter.done();
	}
};
tools.Gifter.done = function() {
	if (tools.Gifter.runtime.returnGift === true) {
		if (tools.Gifter.runtime.returnGiftName === null) {
			get('gift.php?request_ids=' + tools.Gifter.runtime.requests.join(','), function(_data) {
				_data = $($.parseHTML(noSrc(_data)));
				$('body').append('<div id="cageLevelUp"><div></div><div><div id="cageLevelUpTop" style="padding:15px 0 0 50px !important;width:448px !important;"></div><div id="cageLevelUpMiddle"></div><div id="cageLevelUpBottom"></div></div></div>');
				var _cLU = $('#cageLevelUpMiddle');
				_cLU.append('<div id="cageRTFGift"></div>');
				console.log(tools.Gifter.runtime.returnGiftNum);
				$(_data).find('#giftContainer div[id^="gift"]').each(function() {
					var $this = $(this), _num = $this.attr('id').match(/\d+/)[0], _name = $this.text().trim().replace('!', '');
					$('#cageRTFGift').append($('<img src="' + $this.find('img').attr('nosrc') + '" >').data({
						num : _num,
						name : _name
					}).click(function() {
						tools.Gifter.runtime.returnGiftNum = $(this).data().num;
						tools.Gifter.runtime.returnGiftName = $(this).data().name;
						$('#cageLevelUpTop').text('Select a gift: ' + _name);
						$('#cageRTFGift > img').removeClass('cageRTFGiftSelected');
						$(this).addClass('cageRTFGiftSelected');
					}));
					if (tools.Gifter.runtime.returnGiftNum == _num) {
						$('#cageRTFGift').children('img:last').addClass('cageRTFGiftSelected');
						tools.Gifter.runtime.returnGiftNum = _num;
						tools.Gifter.runtime.returnGiftName = _name;
						$('#cageLevelUpTop').text('Select a gift: ' + _name);
					}
				});
				// send gift
				_cLU.append($('<img id="cageLevelUpSave" src="http://image4.castleagegame.com/graphics/guild_button_submit.gif">').click(function() {
					$('#cageLevelUp').fadeOut('fast', function() {
						$(this).remove();
						tools.Gifter.done();
					});
				}));
				// cancel gifting
				_cLU.append($('<img id="cageLevelUpCancel" src="http://image4.castleagegame.com/graphics/war_select_button_cancel.gif">').click(function() {
					$('#cageLevelUp').fadeOut('fast', function() {
						$(this).remove();
						tools.Gifter.runtime.returnGift = false;
						tools.Gifter.done();
					});
				}));
				$('#cageLevelUp').show();
				// tools.Gifter.runtime.returnGiftName = $(_data).find('div[id="gift' + tools.Gifter.runtime.returnGiftNum +
				// '"]:first').text().trim().replace('!', '');
				// tools.Gifter.done();
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
				if (_members.error) {
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

		if (_giftData.flid) {
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
				filters : [
						'app_users', 'all', 'app_non_users'
				],
			};
			console.log('_uid1', cageGifterVars.userId);
			console.log('localStorage[cageGifterVars.userId CAGEsendGiftTo]', cageGifterVars.sendTo);
			if (cageGiftUserList.length > 0) {
				_ui.filters.unshift({
					name : _giftData.userList,
					user_ids : cageGiftUserList
				});
			}
			if (cageGifterVars.sendTo !== undefined && cageGifterVars.sendTo !== null && JSON.parse(cageGifterVars.sendTo).length > 0) {
				console.log('GIFTER - RTF list: ', JSON.parse(cageGifterVars.sendTo));
				if (rtf === true) {
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
				if (cageGifterVars.result === null || cageGifterVars.result === undefined) {
					fireGifterDone();
				} else {
					getFriendsName(giftReturning);
				}
			});

			function getFriendsName(_callback) {
				FB.api('/me/friends', {
					fields : 'name'
				}, function(response) {
					if (response.error) {
						console.log('getFriendsName error:', response);
						getFriendsName(_callback);
					} else {
						_callback(response);
					}
				});
			}

			function giftReturning(_friendsnames) {
				var _friends = {}, _store = null, _resultContainer = $('#results_container'), params = 'ajax=1&signed_request=' + $('#signed_request').val();
				// get all ids from sent gifts and remove them from the list
				console.log('_friendsnames', _friendsnames);
				console.log('GIFTER - check for RTFs');
				_resultContainer.html('Sending gifts...<br>').show();
				_resultContainer.css('borderRadius', 5).html('Sending to: ...<br>').show();
				if (cageGifterVars.sendTo !== undefined) {
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
					if (_store !== null && _store.indexOf(_e) > -1) {
						_store.splice(_store.indexOf(_e), 1);
						_fr = ' - <b>Favor returned</b>';
						if (_store.length > 0) {
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
