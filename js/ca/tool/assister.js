new tool('Assister');

tools['Assister'].settings = function() {

	tools['Assister'].runtimeUpdate();
	tools['Settings'].heading(language.assisterSetName);
	tools['Settings'].text(language.assisterSetReqPermDesc);
	tools['Settings'].button(language.assisterSetReqPermAction, tools['Assister'].requestPermisson);
	tools['Settings'].text(language.assisterSetMaxStamDesc);
	tools['Settings'].textbox(language.assisterSetMaxStamAction, tools['Assister'].runtime.Stamina, 'cageAssisterStamina');
	tools['Settings'].text(language.assisterSetMonMessDesc);
	tools['Settings'].textbox(language.assisterSetMonMessAction, tools['Assister'].runtime.monsterMessage, 'cageAssisterMonsterMessage');
	tools['Settings'].text(language.assisterSetFBMessDesc);
	tools['Settings'].textbox(language.assisterSetFBMessAction, tools['Assister'].runtime.facebookMessage, 'cageAssisterFacebookMessage');

};

tools['Assister'].requestPermisson = function() {

	addFunction(function() {
		FB.login(function(response) {
			console.log(response);
		}, {
			perms : 'publish_stream'
		});
	}, null, true, true);
};

tools['Assister'].runtimeUpdate = function() {

	tools['Assister'].runtime = {
		CTA : [],
		Stamina : item.get('cageAssisterStamina', 10),
		Used : 0,
		friends : [],
		Assisted : tools['Assister'].runtime == undefined ? [] : tools['Assister'].runtime.Assisted,
		monsterMessage : item.get('cageAssisterMonsterMessage', ''),
		facebookMessage : item.get('cageAssisterFacebookMessage', '')
	}

};

tools['Assister'].start = function() {

	tools['Assister'].runtimeUpdate();
	get('army_news_feed.php', function(_data) {
		$('#action_logs > a[href*="action=doObjective"]', _data).each(function(i, e) {
			tools['Assister'].runtime.CTA.push({
				link : $(e).attr('href').replace(/(https|http):\/\/apps.facebook.com\/castle_age\//, ''),
				uid : $('*[uid]:first', $(e)).attr('uid'),
				name : /(?:[You|Your] friend )(.*)(?: has requested your help)/.exec($(e).text())[1],
				image : $('img[src*="twitter"],[src*="cta"]', e).attr('src'),
				timer : '',
				values : []
			});
		});
		console.log('Assister - CTAs: ', tools['Assister'].runtime.CTA);
		tools['Assister'].getFriends();
	});
};

tools['Assister'].getFriends = function() {

	customEvent('GetFriends', function() {
		var _friends = $('#GetFriends').val();
		if(_friends !== 'false') {
			$.each(JSON.parse(_friends), function(_i, _e) {
				tools['Assister'].runtime.friends.push(_e['uid']);
			});
			tools['Assister'].assist();
		} else {
			tools['Assister'].runtime.friends = [];
			console.log('Assister - Can\'t get friends data, assisting all.');
			tools['Assister'].assist();
		}
	});
	addFunction(function() {
		FB.api({
			method : 'fql.query',
			query : 'SELECT uid FROM user WHERE is_app_user=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
		}, function(_response) {
			if(_response.length > 0) {
				console.log('Assister - got friends...');
				$('#GetFriends').val(JSON.stringify(_response));
			} else {
				console.log('Assister - no friends...');
				$('#GetFriends').val('false');
			}
			fireGetFriends();
		});
	}, null, true, true);
};

tools['Assister'].assist = function() {

	if(tools['Assister'].runtime.Used < tools['Assister'].runtime.Stamina && tools['Assister'].runtime.CTA.length > 0) {
		var _cta = tools['Assister'].runtime.CTA.pop();
		if(tools['Assister'].runtime.friends.indexOf(_cta.uid) !== -1) {
			console.log('Assister - Friend: ' + _cta.uid);
			get(_cta.link, function(_monsterdata) {
				var _num = $('span.result_body', _monsterdata).text();
				if(_num !== null && _cta.uid !== CastleAge.userId && _num.match(/\d+(?:st|nd|rd|th)/) !== null) {
					tools['Assister'].runtime.Used++;
					addFunction(function(data) {
						cageStat['stamina'] = data.stamina;
					}, JSON.stringify({
						stamina : parseInt($('#stamina_current_value').text(), 10) - 1
					}), true, true);
					// Collect data from assisted monster for assists list
					var _monstername, _monstervalues = [];
					if($('#app_body div[style*="nm_bars.jpg"], #app_body div[style*="nm_bars_cross.jpg"]', _monsterdata).length > 0) {
						$('img[src*="monster_health_background.jpg"], [src*="nm_red.jpg"], [src*="nm_orange.jpg"]', _monsterdata).each(function(_i, _e) {
							_monstername = $(_e).parent().parent().find('div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
							var _health = $(_e).parent()[0];
							if(_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
								var _percentage = _health.style.width.substr(0, 5);
								_monstervalues.push((_monstername.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)')).trim());
							}
						});
					} else {
						$('img[src*="monster_health_background.jpg"], [src*="nm_red.jpg"]', _monsterdata).each(function(_i, _e) {
							_monstername = $(_e).parent().parent().parent().parent().find('div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
							var _health = $(_e).parent()[0];
							if(_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
								var _percentage = _health.style.width.substr(0, 5);
								_monstervalues.push((_monstername.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)')).trim());
							}
						});
					}

					// add percentage to defense/forcefield/..
					var _defense = $('img[src*="bar_dispel.gif"],[src*="nm_green.jpg"],[src*="seamonster_ship_health.jpg"]', _monsterdata).parent()[0];
					var _defText = $('#app_body div:textEquals("Ragnarok\'s Glacial Armor "):first, div:contains("Party Health/Strength"):last, #app_body div:textEquals("Skaar\'s Mana Forcefield "):first, #app_body div:textEquals("Illvasa, Plateau City\'s Defense "):first, #app_body div:textEquals("Castle Defense"):first, #app_body div:textEquals("Your Ship\'s Defense"):first', _monsterdata);
					if(_defense && _defense.style && _defense.style.width !== "" && _defText && _defText.text()) {
						var _percentage = _defense.style.width.substr(0, 5);
						_monstervalues.push((_defText.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)')).trim());
					}
					_cta.values = _monstervalues;
					_cta.timer = $('#monsterTicker', _monsterdata).text();
					//
					console.log('Assister - Assisted for:', _cta);
					tools['Assister'].runtime.Assisted.push(_cta);
					_num = _num.match(/\d+(?:st|nd|rd|th)/)[0];
					post(_cta.link.replace('doObjective', 'commentDragon') + '&text=' + _num + ' for ' + _cta.name + ' ' + tools['Assister'].runtime.monsterMessage);
					get('party.php?casuser=' + _cta.uid, function(_guarddata) {
						var _postid = $('div.streamContainer:has(div.streamName > a[href*="' + _cta.link + '"]) input[name="like_recent_news_post_id"]:first', _guarddata).val();
						console.log('Assister - Like & Comment on FB post: ', _postid);
						var _fbpost = _postid.match(/\d+/g);
						console.log('Assister - Post Link: http://www.facebook.com/permalink.php?story_fbid=' + _fbpost[1] + '&id=' + _fbpost[0]);
						addFunction(function(_data) {
							FB.api("/" + _data.postid + "/likes", 'post', function(response) {
								console.log('Assister - FB Like done: ', response);
							});
						}, JSON.stringify({
							postid : _postid
						}), true, false);
						addFunction(function(_data) {
							FB.api("/" + _data.postid + "/comments", 'post', _data, function(response) {
								console.log('Assister - FB Comment done: ', response);
							});
						}, JSON.stringify({
							postid : _postid,
							message : _num + ' ' + tools['Assister'].runtime.facebookMessage
						}), true, false);
						tools['Assister'].assist();
					});
				} else {
					console.log('Assister - No assist, maybe already assisted')
					tools['Assister'].assist();
				}
			});
		} else {
			console.log('Assister - Not a friend, no CTA for: ' + _cta.uid);
			tools['Assister'].assist();
		}
	} else {
		console.log('Assister - Stamina out/No more CTAs');
		tools['Assister'].done();
	}

};

tools['Assister'].done = function() {

	tools['Assister'].runtime.Used = 0;
	tools['Assister'].fbButton.enable();

};

tools['Assister'].init = function() {

	tools['Assister'].runtimeUpdate();
	tools['Assister'].fbButton.add(language.assisterButton, function() {
		tools['Assister'].fbButton.disable();
		tools['Assister'].start();
	});
};
