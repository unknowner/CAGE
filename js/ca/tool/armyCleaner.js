new tool('ArmyCleaner');

tools.ArmyCleaner.settings = function() {
	tools.ArmyCleaner.runtimeUpdate();
	tools.Settings.heading('Army Cleaner');
	tools.Settings.text(language.armyCleanerSetDesc);
	tools.Settings.textbox(language.armyCleanerSetMinArmy, tools.ArmyCleaner.runtime.keepArmy, 'armyCleanerKeepArmy');
};

tools.ArmyCleaner.runtimeUpdate = function() {
	if(!tools.ArmyCleaner.runtime) {
		tools.ArmyCleaner.runtime = {
			count : null,
			army : [],
			cafriends : [],
			busy : true,
			text : null,
			keepArmy : item.get('armyCleanerKeepArmy', 541)
		};
	}
};

tools.ArmyCleaner.start = function() {

	console.log('ArmyCleaner - start');
	tools.ArmyCleaner.runtimeUpdate();
	tools.ArmyCleaner.runtime.count = /\d+/.exec($('#main_bntp a[href*="army.php"]').text());
	if(tools.ArmyCleaner.runtime.count !== null) {
		$('#AjaxLoadIcon').show();
		$('#app_body table.layout table:eq(1)').parent('div:first').css({
			'height' : 28,
			'overflow' : 'hidden',
			'display' : 'block'
		});
		tools.ArmyCleaner.runtime.count = tools.ArmyCleaner.runtime.count[0];
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
	//console.log('ArmyCleaner - readCAArmy: ', _page);
	get('army_member.php?page=' + _page, function(_armydata) {
		$('#app_body table.layout table:eq(1)').html($('#app_body table.layout table:eq(1)', _armydata).html());
		$('#app_body table.layout table:eq(1) div:contains("Displaying"):last').css({
			'position' : 'absolute',
			'marginLeft' : 515,
			'width' : 250,
			'textAlign' : 'left'
		})
		var _last = /\d+/.exec($('a[href*="army_member.php?page="]:last', _armydata).text());
		if(_last == null) {
			tools.ArmyCleaner.readCAArmy(_page);
			return false;
		}
		_last = parseInt(_last[0], 10);
		$('tr > td > a', _armydata).each(function(_i, _e) {
			tools.ArmyCleaner.runtime.army.push($('*[uid]:first', _e).attr('uid'));
		});
		if(_last == _page - 1) {
			tools.ArmyCleaner.runtime.text.text(language.armyFillerRemoveMissing);
			var _toAdd = [];
			$.each(tools.ArmyCleaner.runtime.army, function(_i, _e) {
				if(tools.ArmyCleaner.runtime.cafriends.indexOf(_e) == -1) {
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

	var _count = tools.ArmyCleaner.runtime.cafriends.length + tools.ArmyCleaner.runtime.army.length - tools.ArmyCleaner.runtime.keepArmy;
	if(tools.ArmyCleaner.runtime.army.length > 0 && _count > 0) {
		var _id = tools.ArmyCleaner.runtime.army.pop();
		tools.ArmyCleaner.runtime.text.text('Removing ' + _count + ' member(s)...');
		get('army_member.php?action=delete&player_id=' + _id, function() {
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
	tools['Page'].loadPage('army_member.php');
};

tools.ArmyCleaner.init = function() {
	tools.ArmyCleaner.runtimeUpdate();
	customEvent('StartCleanArmy', function() {
		tools.ArmyCleaner.start();
	});
};
