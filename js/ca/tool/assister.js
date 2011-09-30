new tool('Assister');

tools['Assister'].runtime = {};

tools['Assister'].start = function() {

	tools['Assister'].runtime.CTA = [];
	tools['Assister'].runtime.Stamina = 0;
	tools['Assister'].runtime.friends = [];
	if(tools['Assister'].runtime.Assisted == undefined) {
		tools['Assister'].runtime.Assisted = [];
	}

	get('army_news_feed.php', function(_data) {
		$('#action_logs > a[href*="action=doObjective"]', _data).each(function(i, e) {
			tools['Assister'].runtime.CTA.push({
				link : $(e).attr('href').replace(/(https|http):\/\/apps.facebook.com\/castle_age\//, ''),
				uid : $('*[uid]:first', $(e)).attr('uid'),
				name : /(?:[You|Your] friend )(.*)(?: has requested your help)/.exec($(e).text())[1]
			});
		});
		console.log(tools['Assister'].runtime.CTA);
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
			console.log('ERROR: No friend data');
			tools['Assister'].done();
		}
	});
	addFunction(function() {
		FB.api({
			method : 'fql.query',
			query : 'SELECT uid FROM user WHERE is_app_user=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
		}, function(_response) {
			if(_response.length > 0) {
				console.log('Assister: got friends...');
				$('#GetFriends').val(JSON.stringify(_response));
			} else {
				console.log('Assister: no friends...');
				$('#GetFriends').val('false');
			}
			fireGetFriends();
		});
	}, null, true, true);
};

tools['Assister'].assist = function() {

	if(tools['Assister'].runtime.Stamina < 11 && tools['Assister'].runtime.CTA.length > 0) {
		var _cta = tools['Assister'].runtime.CTA.pop();
		if(tools['Assister'].runtime.friends.indexOf(_cta.uid) !== -1) {
			console.log('ASSISTER: Friend: ' + _cta.uid);
			get(_cta.link, function(_monsterdata) {
				var _num = $('span.result_body', _monsterdata).text();
				if(_num !== null && _cta.uid !== CastleAge.userId && _num.match(/\d+(?:st|nd|rd|th)/) !== null) {
					tools['Assister'].runtime.Stamina += 1;
					$('#stamina_current_value').text($('#stamina_current_value').text() - 1);
					console.log('ASSISTER: Asssited for:');
					console.log(_cta);
					tools['Assister'].runtime.Assisted.push(_cta);
					_num = _num.match(/\d+(?:st|nd|rd|th)/)[0];
					console.log(_num);
					post(_cta.link.replace('doObjective', 'commentDragon') + '&text=' + _num + ' for ' + _cta.name);
					get('party.php?casuser=' + _cta.uid, function(_guarddata) {
						console.log('Like & Comment on FB');
						var _postid = $('div.streamContainer:has(div.streamName > a[href*="' + _cta.link + '"]) input[name="like_recent_news_post_id"]:first', _guarddata).val();
						console.log('ASSISTER: postid: ', _data.postid);
						addFunction(function(_data) {
							FB.api("/" + _data.postid + "/likes", 'post');
						}, JSON.stringify({
							postid : _postid
						}), true, false);
						addFunction(function(_data) {
							FB.api("/" + _data.postid + "/comments", 'post', _data);
						}, JSON.stringify({
							postid : _postid,
							message : _num
						}), true, false);
						tools['Assister'].assist();
					});
				} else {
					console.log('No CTA...')
					tools['Assister'].assist();
				}
			});
		} else {
			console.log('ASSISTER: Not a friend, no CTA: ' + _cta.uid);
			tools['Assister'].assist();
		}
	} else {
		console.log('ASSISTER: Stamina out/No more CTAs');
		tools['Assister'].done();
	}

};

tools['Assister'].done = function() {
	tools['Assister'].fbButton.enable();
};
tools['Assister'].init = function() {
	tools['Assister'].fbButton.add(chrome.i18n.getMessage("buttonAssister"), function() {
		tools['Assister'].fbButton.disable();
		tools['Assister'].start();
	});
};
