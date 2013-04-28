tool('ArmyCleaner');

tools.ArmyCleaner.settings = function() {
	tools.ArmyCleaner.runtimeUpdate();
	tools.Settings.heading('Army Cleaner');
	tools.Settings.text(language.armyCleanerSetDesc);
	tools.Settings.textbox(language.armyCleanerSetMinArmy, tools.ArmyCleaner.runtime.keepArmy, 'armyCleanerKeepArmy');
	tools.Settings.onoff(language.armyCleanerKeepiPhone, tools.ArmyCleaner.runtime.iPhone, 'armyCleanerKeepiPhone', tools.ArmyCleaner.runtimeUpdate);
};

tools.ArmyCleaner.runtimeUpdate = function() {
	if (!tools.ArmyCleaner.runtime) {
		tools.ArmyCleaner.runtime = {
			count : null,
			army : [],
			cafriends : [],
			busy : true,
			text : null,
			keepArmy : item.get('armyCleanerKeepArmy', 541),
			iPhone : item.get('armyCleanerKeepiPhone', true)
		};
	}
};

tools.ArmyCleaner.start = function() {

	console.log('ArmyCleaner - start');
	tools.ArmyCleaner.runtimeUpdate();
	tools.ArmyCleaner.runtime.count = parseInt($('div:contains("Current Army Size"):last').next().text(), 10);
	if (tools.ArmyCleaner.runtime.count > 0) {
		$('#AjaxLoadIcon').show();
		$('#app_body table.layout table:eq(1)').parent('div:first').css({
			'height' : 28,
			'overflow' : 'hidden',
			'display' : 'block'
		});
		tools.Facebook.CAPlayers(function(_ids) {
			tools.ArmyCleaner.runtime.cafriends = _ids;
			tools.ArmyCleaner.runtime.text = $('div:contains("The Following People Have Joined Your Army."):last');
			tools.ArmyCleaner.runtime.text.css('marginTop', 28).text(language.armyCleanerGetArmy);
			tools.ArmyCleaner.readCAArmy();
		});
	}
};

tools.ArmyCleaner.readCAArmy = function(_page) {
	_page = _page ? _page : 1;
	// console.log('ArmyCleaner - readCAArmy: ', _page);
	signedGet('army_member.php?page=' + _page, function(_armydata) {
		_armydata = $($.parseHTML(noSrc(_armydata)));
		$('#app_body table.layout table:eq(1)').html($('#app_body table.layout table:eq(1)', _armydata).html());
		$('#app_body table.layout table:eq(1) div:contains("Displaying"):last').css({
			'position' : 'absolute',
			'marginLeft' : 515,
			'width' : 250,
			'textAlign' : 'left'
		});
		var _last = /\d+/.exec($('a[href*="army_member.php?page="]:last', _armydata).text());
		if (_last == null) {
			tools.ArmyCleaner.readCAArmy(_page);
			return false;
		}
		_last = parseInt(_last[0], 10);
		$('#app_body_container img', _armydata).filter('[nosrc*="//graph.facebook.com/"]').each(function(_i, _e) {
			var _fbProfilePic = $(_e), _uid = /\/\/graph\.facebook\.com\/(\d+)\/picture/g.exec(_fbProfilePic.attr('nosrc'));
			if (_uid !== null) {
				if (tools.ArmyCleaner.runtime.iPhone === true && _uid[1].length === 15 && _uid[1].indexOf('4', 0) === 0) {
					console.log('iphone');
					return;
				}
				tools.ArmyCleaner.runtime.army.push(_uid[1]);
			}
		});

		if (_last == _page - 1) {
			tools.ArmyCleaner.runtime.text.text(language.armyFillerRemoveMissing);
			var _toAdd = [];
			$.each(tools.ArmyCleaner.runtime.army, function(_i, _e) {
				if (tools.ArmyCleaner.runtime.cafriends.indexOf(_e) == -1) {
					_toAdd.push(_e);
					;
				}
			});
			tools.ArmyCleaner.runtime.army = _toAdd;
			tools.ArmyCleaner.removeMember();
		} else {
			tools.ArmyCleaner.readCAArmy(_page + 1);
		}
	});
};

tools.ArmyCleaner.removeMember = function(_start) {

	var _count = tools.ArmyCleaner.runtime.cafriends.length + tools.ArmyCleaner.runtime.army.length - tools.ArmyCleaner.runtime.keepArmy - 1;
	if (tools.ArmyCleaner.runtime.army.length > 0 && _count > 0) {
		var _id = tools.ArmyCleaner.runtime.army.pop();
		tools.ArmyCleaner.runtime.text.text('Removing ' + _count + ' member(s)...');
		signedGet('army_member.php?action=delete&player_id=' + _id, function() {
			tools.ArmyCleaner.removeMember();
		});
	} else {
		tools.ArmyCleaner.done();
	}

};

tools.ArmyCleaner.done = function() {
	console.log('ArmyCleaner - done');
	tools.ArmyCleaner.runtime.text.text(language.armyCleanerReloading);
	tools.ArmyCleaner.runtime = null;
	tools.Page.loadPage('army_member.php');
};

tools.ArmyCleaner.init = function() {
	tools.ArmyCleaner.runtimeUpdate();
	customEvent('StartCleanArmy', function() {
		tools.ArmyCleaner.start();
	});
};
