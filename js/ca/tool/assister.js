tool('Assister');

tools.Assister.settings = function() {

	//tools.Assister.runtimeUpdate();
	tools.Settings.heading(language.assisterSetName);
	tools.Settings.textbox(language.assisterSetMaxStamAction, tools.Assister.runtime.Stamina, 'cageAssisterStamina');
	tools.Settings.text(language.assisterSetMessDesc);
	tools.Settings.onoff(language.assisterCommentMonster, tools.Assister.runtime.assisterCommentMonster, 'assisterCommentMonster', tools.Assister.runtimeUpdate);
	tools.Settings.textbox(language.assisterSetMonMessAction, tools.Assister.runtime.monsterMessage, 'cageAssisterMonsterMessage');
	tools.Settings.onoff(language.assisterCommentFBPost, tools.Assister.runtime.assisterCommentFBPost, 'assisterCommentFBPost', tools.Assister.runtimeUpdate);
	tools.Settings.textbox(language.assisterSetFBMessAction, tools.Assister.runtime.facebookMessage, 'cageAssisterFacebookMessage');
	tools.Settings.onoff(language.assisterLikeFBPost, tools.Assister.runtime.assisterLikeFBPost, 'assisterLikeFBPost', tools.Assister.runtimeUpdate);
	tools.Settings.text(language.assisterSetFriendLstDesc);
	tools.Settings.dropdown(language.assisterSetFriendList, tools.Assister.runtime.assisterLists, tools.Assister.runtime.assisterList, 'cageAssisterList', function(_value) {
		console.log(_value);
		tools.Assister.runtime.assisterList = _value;
	});
	tools.Settings.onoff(language.assisterSetFriendsOnly, tools.Assister.runtime.friendsOnly, 'cageAssisterFriendsOnly', tools.Assister.runtimeUpdate);

};
tools.Assister.runtimeUpdate = function() {

	tools.Assister.runtime = {
		CTA : [],
		Stamina : item.get('cageAssisterStamina', 10),
		Used : 0,
		friends : [],
		Assisted : tools.Assister.runtime == undefined ? [] : tools.Assister.runtime.Assisted,
		monsterMessage : item.get('cageAssisterMonsterMessage', ''),
		facebookMessage : item.get('cageAssisterFacebookMessage', ''),
		friendsOnly : item.get('cageAssisterFriendsOnly', true),
		assisterList : item.get('cageAssisterList', 'Castle Age players'),
		assisterLists : {
			'Castle Age players' : 'Castle Age players'
		},
		assisterCommentMonster : item.get('assisterCommentMonster', true),
		assisterCommentFBPost : item.get('assisterCommentFBPost', true),
		assisterLikeFBPost : item.get('assisterLikeFBPost', true)
	}
	tools.Facebook.getFriendlists(function(_names) {
		$.each(_names, function(_i, _e) {
			tools.Assister.runtime.assisterLists[_e] = _e;
		});
	});
};
/*
 * Get CTAs from Livefeed
 */
tools.Assister.start = function() {
	console.log('Assister - CTAs: ', tools.Assister.runtime.CTA, tools.Assister.runtime.assisterList);
	if(tools.Assister.runtime.assisterList == 'Castle Age players') {
		tools.Facebook.CAPlayers(function(_ids) {
			tools.Assister.getCTA(_ids);
		});
	} else {
		tools.Facebook.GetListMembers(tools.Assister.runtime.assisterList, function(_ids) {
			tools.Assister.getCTA(_ids);
		})
	}
};

tools.Assister.getCTA = function(_ids) {
	signedGet('army_news_feed.php', function(_data) {
		_data = $(noSrc(_data));
		_data.find('#action_logs > a[href*="action=doObjective"]').each(function(_i, _e) {
			_e = $(_e);
			var _uid = _e.find('*[uid]:first').attr('uid'), _name = /(?:[You|Your] friend )(.*)(?: has requested your help)/.exec(_e.text());
			if(tools.Assister.runtime.friendsOnly == true && _ids.indexOf(_uid) == -1) {
				return true;
			}
			if(_uid && _name !== null) {
				tools.Assister.runtime.CTA.push({
					link : _e.attr('href').replace(/(https|http):\/\/apps.facebook.com\/castle_age\//, ''),
					uid : _uid,
					name : _name[1],
					image : _e.find('img[nosrc*="twitter"],[nosrc*="cta"]').attr('nosrc'),
					timer : '',
					values : []
				});
			}
		});
		tools.Assister.assist();
	});
};
/*
 * Assist/Comment/...
 */
tools.Assister.assist = function(_ids) {

	if(tools.Assister.runtime.Used < tools.Assister.runtime.Stamina && tools.Assister.runtime.CTA.length > 0) {
		var _cta = tools.Assister.runtime.CTA.pop(), _num = null;
		console.log('Assister - Friend: ' + _cta.uid);
		signedGet(_cta.link, function(_monsterdata) {
			console.log(_cta.link);
			_monsterdata = noSrc(_monsterdata);
			_monsterdata = $(_monsterdata);
			console.log(_monsterdata.find('.result_body').text().length);
			if(_monsterdata.find('.result_body').text().length < 92) {
				console.log(_monsterdata);
			}
			if(_monsterdata.find('.result_body').text().match(/You were the \d+(?:st|nd|rd|th) to help summon/) !== null && _cta.uid !== CastleAge.userId) {
				_num = /You were the (\d+(?:st|nd|rd|th)) to help summon/.exec(_monsterdata.find('span.result_body').text())[1];
				console.log(_num);
				note('Assister', 'You\'ve assisted ' + _cta.name + '.');
				tools.Assister.runtime.Used++;
				addFunction(function(data) {
					cageStat['stamina'] = data.stamina;
				}, JSON.stringify({
					stamina : parseInt($('#stamina_current_value').text(), 10) - 1
				}), true, true);
				// Collect data from assisted monster for assists list
				var _monstername, _monstervalues = [];
				if($('#app_body div[style*="nm_bars.jpg"], #app_body div[style*="nm_bars_cross.jpg"]', _monsterdata).length > 0) {
					$('img[nosrc*="monster_health_background.jpg"], [nosrc*="nm_red.jpg"], [nosrc*="nm_orange.jpg"]', _monsterdata).each(function(_i, _e) {
						_monstername = $(_e).parent().parent().find('div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
						var _health = $(_e).parent()[0];
						if(_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
							var _percentage = _health.style.width.substr(0, 5);
							_monstervalues.push((_monstername.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)')).trim());
						}
					});
				} else {
					$('img[nosrc*="monster_health_background.jpg"], [nosrc*="nm_red.jpg"]', _monsterdata).each(function(_i, _e) {
						_monstername = $(_e).parent().parent().parent().parent().find('div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
						var _health = $(_e).parent()[0];
						if(_health.style && _health.style.width !== "" && _monstername && _monstername.text()) {
							var _percentage = _health.style.width.substr(0, 5);
							_monstervalues.push((_monstername.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)')).trim());
						}
					});
				}

				// add percentage to defense/forcefield/..
				var _defense = $('img[nosrc*="bar_dispel.gif"],[nosrc*="nm_green.jpg"],[nosrc*="seamonster_ship_health.jpg"]', _monsterdata).parent()[0];
				var _defText = $('#app_body div:textEquals("Ragnarok\'s Glacial Armor "):first, div:contains("Party Health/Strength"):last, #app_body div:textEquals("Skaar\'s Mana Forcefield "):first, #app_body div:textEquals("Illvasa, Plateau City\'s Defense "):first, #app_body div:textEquals("Castle Defense"):first, #app_body div:textEquals("Your Ship\'s Defense"):first', _monsterdata);
				if(_defense && _defense.style && _defense.style.width !== "" && _defText && _defText.text()) {
					var _percentage = _defense.style.width.substr(0, 5);
					_monstervalues.push((_defText.text() + ' (' + _percentage + (_percentage.indexOf('%') > -1 ? ')' : '%)')).trim());
				}
				_cta.values = _monstervalues;
				_cta.timer = $('#monsterTicker', _monsterdata).text();
				//
				console.log('Assister - Assisted for:', _cta);
				tools.Assister.runtime.Assisted.push(_cta);
				if(tools.Assister.runtime.assisterCommentMonster === true) {
					post(_cta.link.replace('doObjective', 'commentDragon') + '&text=' + _num + ' for ' + _cta.name + ' ' + tools.Assister.runtime.monsterMessage + ' ');
				}
				if(tools.Assister.runtime.assisterCommentFBPost === true || tools.Assister.runtime.assisterLikeFBPost === true) {
					signedGet('party.php?casuser=' + _cta.uid, function(_guarddata) {
						_guarddata = $(noSrc(_guarddata));
						var _postid = _guarddata.find('div.streamContainer:has(div.streamName > a[href*="' + _cta.link + '"]) input[name="like_recent_news_post_id"]:first').val();
						console.log('Assister - Like & Comment on FB post: ', _postid);
						var _fbpost = _postid.match(/\d+/g);
						console.log('Assister - Post Link: http://www.facebook.com/permalink.php?story_fbid=' + _fbpost[1] + '&id=' + _fbpost[0]);
						if(tools.Assister.runtime.assisterLikeFBPost === true) {
							addFunction(function(_data) {
								FB.api("/" + _data.postid + "/likes", 'post', function(response) {
									console.log('Assister - FB Like done: ', response);
								});
							}, JSON.stringify({
								postid : _postid
							}), true, false);
						}
						if(tools.Assister.runtime.assisterCommentFBPost === true) {
							addFunction(function(_data) {
								FB.api("/" + _data.postid + "/comments", 'post', _data, function(response) {
									console.log('Assister - FB Comment done: ', response);
								});
							}, JSON.stringify({
								postid : _postid,
								message : _num + ' ' + tools.Assister.runtime.facebookMessage
							}), true, false);
						}
						tools.Assister.assist();
					});
				} else {
					tools.Assister.assist();
				}
			} else {
				console.log('Assister - No assist, maybe already assisted')
				tools.Assister.assist();
			}
		}, 'text');
	} else {
		console.log('Assister - Stamina out/No more CTAs');
		tools.Assister.done();
	}

};

tools.Assister.done = function() {
	note('Assister', 'You assisted ' + tools.Assister.runtime.Used + ' friends.');
	tools.Assister.runtime.Used = 0;
	tools.Sidebar.button.enable('cageAssisterStart');
};

tools.Assister.init = function() {
	tools.Assister.runtimeUpdate();
	tools.Sidebar.button.add('cageAssisterStart', language.assisterButton, function() {
		tools.Sidebar.button.disable('cageAssisterStart');
		tools.Assister.start();
	});
};
