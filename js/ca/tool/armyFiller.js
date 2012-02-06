new tool('ArmyFiller');

tools.ArmyFiller.start = function() {

	console.log('ArmyFiller - start');
	if(tools.ArmyFiller.runtime == null) {
		tools.ArmyFiller.runtime = {
			count : null,
			army : [],
			cafriends : [],
			busy : true,
			text : null
		};
		tools.ArmyFiller.runtime.count = /\d+/.exec($('#main_bntp a[href*="army.php"]').text());
		if(tools.ArmyFiller.runtime.count !== null) {
			$('#AjaxLoadIcon').show();
			$('#app_body table.layout table:eq(1)').parent('div:first').css({
				'height' : 28,
				'overflow' : 'hidden',
				'display' : 'block'
			});
			tools.ArmyFiller.runtime.count = tools.ArmyFiller.runtime.count[0];
			tools.Facebook.CAPlayers(function(_ids) {
				tools.ArmyFiller.runtime.cafriends = _ids;
				tools.ArmyFiller.runtime.text = $('div:contains("The Following People Have Joined Your Army."):last');
				tools.ArmyFiller.runtime.text.css('marginTop', 28).text(language.armyFillerGetArmy);
				tools.ArmyFiller.readCAArmy();
			});
		}
	}
};

tools.ArmyFiller.readCAArmy = function(_page) {
	_page = _page ? _page : 1;
	//console.log('ArmyFiller - readCAArmy: ', _page);
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
			tools.ArmyFiller.readCAArmy(_page);
			return false;
		}
		_last = parseInt(_last[0], 10);
		$('tr > td > a', _armydata).each(function(_i, _e) {
			tools.ArmyFiller.runtime.army.push($('*[uid]:first', _e).attr('uid'));
		});
		if(_last == _page - 1) {
			tools.ArmyFiller.runtime.text.text(language.armyFillerAddMissing);
			var _toAdd = [];
			$.each(tools.ArmyFiller.runtime.cafriends, function(_i, _e) {
				if(tools.ArmyFiller.runtime.army.indexOf(_e) == -1) {
					_toAdd.push(_e);
					;
				}
			});
			tools.ArmyFiller.runtime.cafriends = _toAdd;
			tools.ArmyFiller.addMissing();
		} else {
			tools.ArmyFiller.readCAArmy(_page + 1);
		}
	});
};

tools.ArmyFiller.addMissing = function(_start) {

	//console.log('ArmyFiller - addMissing');
	if(tools.ArmyFiller.runtime.cafriends.length > 0) {
		var _id = tools.ArmyFiller.runtime.cafriends.pop();
		tools.ArmyFiller.runtime.text.text('Adding ' + tools.ArmyFiller.runtime.cafriends.length + ' member(s)...');
		get('party.php?twt=jneg&jneg=true&user=' + _id + '&lka=' + _id + '&etw=9&ref=nf', function() {
			tools.ArmyFiller.addMissing();
		});
	} else {
		tools.ArmyFiller.done();
	}

};

tools.ArmyFiller.done = function() {
	console.log('ArmyFiller - done');
	tools.ArmyFiller.runtime.text.text(language.armyFillerReloading);
	tools.ArmyFiller.runtime = null;
	tools['Page'].loadPage('army_member.php');
};

tools.ArmyFiller.init = function() {
	customEvent('StartFillArmy', function() {
		tools.ArmyFiller.start();
	});
};
