new tool('Gifter');

tools.Gifter.settings = function() {
	tools.Gifter.runtimeUpdate();
	tools.Settings.heading(language.gifterSetName);
	tools.Settings.text(language.gifterSetFilterDesc);
	tools.Settings.textbox(language.giftersetFilterAction, tools.Gifter.runtime.userList, 'cageGifterUserList', tools.Gifter.newRequestForm);
};

tools.Gifter.runtimeUpdate = function() {
	tools.Gifter.runtime = {
		sendGiftTo : item.get('CAGEsendGiftTo', []),
		requests : tools.Gifter.runtime == undefined ? [] : tools.Gifter.runtime.requests,
		userList : item.get('cageGifterUserList', '')
	}
	if(tools.Gifter.runtime.sendGiftTo == null) {
		tools.Gifter.runtime.sendGiftTo = [];
	}
	console.log('tools.Gifter.runtime.userList:', tools.Gifter.runtime.userList);
};

tools.Gifter.update = function() {

	//prepare update event to receive userids and request ids
	customEvent('GiftRequests', function() {
		var _gifts = JSON.parse($('#GiftRequests').val());
		if(_gifts) {
			var _giftsCount = 0;
			$.each(_gifts.data, function(_i, _e) {
				if(_e.from !== null) {
					if($.inArray(_e.from.id, tools.Gifter.runtime.sendGiftTo) == -1) {
						tools.Gifter.runtime.sendGiftTo.push(_e.from.id);
					}
					tools.Gifter.runtime.requests.push(_e.id);
					_giftsCount = _i;
				}
			});
			if(_gifts > 0) {
				note('Gifter', 'You accepted ' + (_giftsCount + 1) + ' gift(s).');
			}
			item.set('CAGEsendGiftTo', tools.Gifter.runtime.sendGiftTo);
			tools.Gifter.runtimeUpdate();
		}
		tools.Gifter.work();
	});
	addFunction(function() {
		FB.api('/me/apprequests/', function(_response) {
			fireGiftRequests(JSON.stringify(_response));
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

	tools.Gifter.runtimeUpdate();
	addFunction(function(_giftData) {
		var cageGiftUserList = [];
		FB.api('me/friendlists', function(responseFriendlist) {
			console.log('Gifter - FBresponse: ', responseFriendlist);
			console.log('GIFTER - friendlists:', responseFriendlist.data);
			$.each(responseFriendlist.data, function(_i, _e) {
				if(_e.name == _giftData.userList) {
					FB.api('/' + _e.id + '/members', function(responseListID) {
						$.each(responseListID.data, function(_i, _e) {
							cageGiftUserList.push(_e.id);
						});
						console.log('GIFTER - userList:', cageGiftUserList);
					});
					return false;
				}
			});
		});
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
			if(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo'] !== undefined && JSON.parse(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo']).length !== 0) {
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
				// fixes infinite looping for popup window if u close it before it is done loading
				$('.fb_dialog_iframe').each(function() {
					$(this).remove();
				});
				if(result && result.request_ids) {
					$('#results_container').html('Sending gifts...<br>').show();
					$('#AjaxLoadIcon').show();
					var _resultContainer = $('#results_container');
					var request_id_string = String(result.request_ids);
					var request_id_array = request_id_string.split(',');
					var request_id_count = request_id_array.length;
					var _store = null;
					//_resultContainer.html('Sending gifts...<br>').show();
					// get all ids from sent gifts and remove them from the list
					console.log('GIFTER - check for RTFs');
					if(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo'] !== undefined) {
						console.log('GIFTER - found open RTF');
						var _store = JSON.parse(localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo']);
					}
					var ids = result.request_ids;
					var _batch = [];
					for(var i = 0; i < ids.length; i++) {
						_batch.push({
							"method" : "get",
							"relative_url" : ids[i]
						});
					}
					if(_batch.length > 0) {
						FB.api('/', 'POST', {
							batch : _batch
						}, function(res) {
							for(var j = 0; j < res.length; j++) {
								var myObject = JSON.parse(res[j].body);
								//eval('(' + body + ')');
								var _fr = '';
								if(_store !== null && _store.indexOf(myObject.to.id) > -1) {
									_store.splice(_store.indexOf(myObject.to.id), 1);
									_fr = '- <b>Favour returned</b>';
									if(_store.length > 0) {
										localStorage[FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo'] = JSON.stringify(_store);
									} else {
										console.log('GIFTER - clear RTF list');
										localStorage.removeItem(FB.getAuthResponse().userID + '_' + 'CAGEsendGiftTo');
									}
								}
								_resultContainer.html(_resultContainer.html() + '<br>Sent gift to: ' + myObject.to.name + ' (' + myObject.to.id + ') ' + _fr);
							}
						});
					}
					var params = 'ajax=1&signed_request=' + $('#signed_request').val();
					$.ajax({
						url : 'request_handler.php?' + request_params + '&request_ids=' + result.request_ids,
						context : document.body,
						data : params,
						type : 'POST',
						success : function(data) {
							$('#AjaxLoadIcon').hide();
							document.getElementById('results_container').innerHTML = document.getElementById('results_container').innerHTML + '<br><br>' + request_id_count + ' request' + (request_id_count == 1 ? '' : 's') + ' sent!';
							FB.XFBML.parse(document.getElementById('results_container'));
						}
					});
				}
			});
		}
	}, JSON.stringify({
		userList : tools.Gifter.runtime.userList
	}), true, true);
};
tools.Gifter.init = function() {
	tools.Gifter.newRequestForm();
	tools.Gifter.fbButton.add(language.gifterButton, function() {
		tools.Gifter.fbButton.disable();
		tools.Gifter.start();
	});
};
