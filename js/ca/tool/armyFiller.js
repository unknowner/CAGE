new tool('ArmyFiller');

tools.ArmyFiller.start = function() {

	console.log('ArmyFiller - start');
	if(tools.ArmyFiller.runtime == null) {
		tools.ArmyFiller.runtime = {
			count : null,
			army : [],
			cafriends : [],
			busy : true
		};

		$('div:contains("The Following People Have Joined Your Army."):last').text(language.armyFillerAddDone);
		$('div:contains("Current Army Size"):last').text('Army Filler: ').css('width', 104).next().attr('id', 'cageArmyFiller').text(language.armyFillerSearching);
		tools.ArmyFiller.runtime.count = /\d+/.exec($('#main_bntp a[href*="army.php"]').text());
		if(tools.ArmyFiller.runtime.count !== null) {
			tools.ArmyFiller.runtime.count = tools.ArmyFiller.runtime.count[0];
			customEvent('GetPlayers', function() {
				var _army = $('#GetPlayers').val();
				if(_army !== 'false') {
					$.each(JSON.parse(_army), function(_i, _e) {
						tools.ArmyFiller.runtime.cafriends.push(_e['uid']);
					});
					tools.ArmyFiller.readCAArmy();
				} else {
					tools.ArmyFiller.done();
				}
			});
			addFunction(function() {
				FB.api({
					method : 'fql.query',
					query : 'SELECT uid FROM user WHERE is_app_user=1 and uid IN (SELECT uid2 FROM friend WHERE uid1 = me())'
				}, function(_response) {
					if(_response.length > 0) {
						$('#GetPlayers').val(JSON.stringify(_response));
					} else {
						$('#GetPlayers').val('false');
					}
					fireGetPlayers();
				});
			}, null, true, true);
		}
	}
};

tools.ArmyFiller.readCAArmy = function(_page) {
	_page = _page ? _page : 1;
	console.log('ArmyFiller - readCAArmy: ', _page);
	$('#cageArmyFiller').text(language.armyFillerGetArmy + _page + ')...');
	get('army_member.php?page=' + _page, function(_armydata) {
		var _last = parseInt(/\d+/.exec($('a[href*="army_member.php?page="]:last', _armydata).text())[0], 10);
		$('tr > td > a', _armydata).each(function(_i, _e) {
			tools.ArmyFiller.runtime.army.push($('*[uid]:first', _e).attr('uid'));
		});
		if(_last == _page - 1) {
			tools.ArmyFiller.addMissing();
		} else {
			tools.ArmyFiller.readCAArmy(_page + 1);
		}

	})
};

tools.ArmyFiller.addMissing = function(_start) {

	console.log('ArmyFiller - addMissing');
	$('#cageArmyFiller').text(language.armyFillerAddMissing);
	if(tools.ArmyFiller.runtime.cafriends !== null) {
		var _length = tools.ArmyFiller.runtime.cafriends.length;
		_start = _start ? _start : 0;
		for(var i = _start; i < _length; i++) {
			if(tools.ArmyFiller.runtime.army.indexOf(tools.ArmyFiller.runtime.cafriends[i]) == -1) {
				console.log(tools.ArmyFiller.runtime.cafriends[i]);
				$('#cageArmyFiller').text('Adding member ' + tools.ArmyFiller.runtime.cafriends[i] + '...');
				get('party.php?twt=jneg&jneg=true&user=' + tools.ArmyFiller.runtime.cafriends[i] + '&lka=' + tools.ArmyFiller.runtime.cafriends[i] + '&etw=9&ref=nf', function() {
					tools.ArmyFiller.addMissing(i + 1);
				});
				return false;
			}
		}
		tools.ArmyFiller.done();
	} else {
		tools.ArmyFiller.done();
	}
};

tools.ArmyFiller.done = function() {
	console.log('ArmyFiller - done');
	$('#cageArmyFiller').text(language.armyFillerReloading);
	tools.ArmyFiller.runtime = null;
	tools['Page'].loadPage('army_member.php');
};

tools.ArmyFiller.init = function() {

	customEvent('StartFillArmy', function() {
		tools.ArmyFiller.start();
	});
};
