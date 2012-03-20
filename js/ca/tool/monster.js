tool('Monster');

tools.Monster.settings = function() {

	tools.Assister.runtimeUpdate();
	tools.Settings.heading(language.monsterSetName);
	tools.Settings.text('');
	tools.Settings.onoff(language.monsterSetCloseInstant, tools.Monster.runtime.closeInstant, 'cageMonsterCloseInstant', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetTransparent, tools.Monster.runtime.transparent, 'cageMonsterTransparent', tools.Monster.runtimeUpdate);
	tools.Settings.text(language.monsterSetDescMonster);
	tools.Settings.onoff(language.monsterSetMonster, tools.Monster.runtime.toCheck.monster, 'cageMonsterMonster', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetFestival1, tools.Monster.runtime.toCheck.festival1, 'cageMonsterFestival1', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetFestival2, tools.Monster.runtime.toCheck.festival2, 'cageMonsterFestival2', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetRaid, tools.Monster.runtime.toCheck.raid, 'cageMonsterRaid', tools.Monster.runtimeUpdate);
	tools.Settings.onoff(language.monsterSetConquest, tools.Monster.runtime.toCheck.conquest, 'cageMonsterConquest', tools.Monster.runtimeUpdate);
};

tools.Monster.runtimeUpdate = function() {

	tools.Monster.runtime = {
		listFilled : tools.Monster.runtime ? tools.Monster.runtime.listFilled : false,
		closeInstant : item.get('cageMonsterCloseInstant', false),
		transparent : item.get('cageMonsterTransparent', false),
		toCheck : {
			festival1 : item.get('cageMonsterFestival1', true),
			festival2 : item.get('cageMonsterFestival2', true),
			monster : item.get('cageMonsterMonster', true),
			raid : item.get('cageMonsterRaid', true),
			conquest : item.get('cageMonsterConquest', true)
		},
		conquestLands : item.get('cageMonsterConquestLands', {})
	};
	$('#cageMonsterContainer').css('opacity', tools.Monster.runtime.transparent ? 0.7 : 1);
};

tools.Monster.start = function() {
	if(!tools.Monster.runtime.listFilled) {
		tools.Monster.runtime.listFilled = true;
		$('#cageMonsterContainer').empty().append('<span id="cageMonsterReload">Loading...</span>').append($('<img id="cageMonsterClose" src="http://image4.castleagegame.com/graphics/popup_close_button.png">').click(tools.Monster.done));
		tools.Monster.runtime.checkFor = [];
		$.each(tools.Monster.runtime.toCheck, function(_i, _e) {
			if(_e === true) {
				tools.Monster.runtime.checkFor.push(_i);
			}
		});
		tools.Monster.checkFor();
	}
	$('#cageMonsterContainer').show().animate({
		'top' : 119
	}, 'slow');

};
tools.Monster.checkFor = function() {
	if(tools.Monster.runtime.checkFor !== undefined && tools.Monster.runtime.checkFor.length > 0) {
		tools.Monster[tools.Monster.runtime.checkFor.shift()]();
	} else {
		$('#cageMonsterReload').text('Reload').click(function() {
			tools.Monster.runtime.listFilled = false;
			tools.Monster.start();
		});
	}
};
tools.Monster.monster = function() {
	get('player_monster_list.php', function(_monster) {
		$('table.layout:first div[style="padding:0 0 15px 0;"] > div', _monster).each(function(_i, _e) {
			var _e = $(_e);
			var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', 'url(' + _e.find('img:first').attr('src') + ')');
			var _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if(_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(1) > div:first > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(2) form')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/monster_button_yourmonster_on.jpg">');
			$('#cageMonsterContainer').append(_img);
			$('div.cageMonsterListItem:last').slideDown('slow');
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.festival1 = function() {
	get('festival_tower.php?tab=monster', function(_festMonster) {
		$('#listDiv > div:not(:last)', _festMonster).each(function(_i, _e) {
			var _e = $(_e);
			var _img = _e.find('> div:eq(1)').attr('style', '').find('div[style*="background-image"]:first').addClass('cageMonsterListItem ui-corner-all').hide().empty().unwrap();
			var _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if(_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(2) > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/festival_monstertag_tower.gif">');
			$('#cageMonsterContainer').append(_img);
			$('div.cageMonsterListItem:last').slideDown('slow');
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.festival2 = function() {
	get('festival_tower2.php?tab=monster', function(_festMonster) {
		$('#listDiv > div:not(:last)', _festMonster).each(function(_i, _e) {
			var _e = $(_e);
			var _img = _e.find('> div:eq(1)').attr('style', '').find('div[style*="background-image"]:first').addClass('cageMonsterListItem ui-corner-all').hide().empty().unwrap();
			var _complete = _e.find('div:contains(Completed!):last').css({
				'position' : 'absolute',
				'marginTop' : 14,
				'marginLeft' : 60,
				'fontSize' : 20,
				'top' : '',
				'left' : ''
			});
			if(_complete !== null) {
				_img.append(_complete);
			}
			_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(2) > div:first').text() + '</div>');
			_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
			_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/festival_monstertag2_tower.gif">');
			$('#cageMonsterContainer').append(_img);
			$('div.cageMonsterListItem:last').slideDown('slow');
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.raid = function() {
	get('raid.php', function(_raids) {
		$('table.layout span', _raids).parent().parent().parent().each(function(_i, _e) {
			var _e = $(_e);
			if(_e.text().trim() !== '[START THIS CAMPAIGN]') {
				console.log(_e.find('> div:eq(1) > div:first').css('backgroundImage'));
				var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', _e.find('> div:eq(1) > div:first').css('backgroundImage'));
				_img.append('<div class="cageMonsterName">' + $(_e).find('span').text().split(' ')[0] + '</div>');
				_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(3) a')));
				$('#cageMonsterContainer').append(_img);
				$('div.cageMonsterListItem:last').slideDown('slow');
			}
		});
		tools.Monster.checkFor();
	});
};
tools.Monster.conquest = function() {
	$.each(tools.Monster.runtime.conquestLands, function(_i, _e) {
		if(_e == true) {
			get(_i, function(_monster) {
				$('#guildv2_monster_list_body div[style="padding:10px 0 0 20px;"] > div', _monster).each(function(_i, _e) {
					var _e = $(_e);
					var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', 'url(' + _e.find('img:first').attr('src') + ')');
					//_img.append('<div class="cageMonsterName">' + _e.find('> div:eq(1) > div:first > div:first').text() + '</div>');
					_img.append('<div class="cageMonsterName">' + $('div[id="guildv2_monster_list_top"]:first', _monster).text() + '</div>');
					_img.append($('<div class="cageMonsterButton">').click(tools.Monster.closeInstant).append(_e.find('> div:eq(2) a')));
					_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/war_battle_guildbtllands_on.jpg">');
					$('#cageMonsterContainer').append(_img);
					$('div.cageMonsterListItem:last').slideDown('slow');
				});
			});
		}
	});
	tools.Monster.checkFor();
};
tools.Monster.closeInstant = function() {
	if(tools.Monster.runtime.closeInstant) {
		tools.Monster.done();
	}
};
tools.Monster.done = function() {
	console.log('done:', $('#cageMonsterContainer').height());
	$('#cageMonsterContainer').animate({
		'top' : -119 - $('#cageMonsterContainer').height() + 10,
	}, 'slow');
	tools.Monster.fbButton.enable();

};

tools.Monster.init = function() {
	$('#cageContainer').append('<div id="cageMonsterContainer" class="ui-corner-bottom ui-widget-content"></div>');
	tools.Monster.fbButton.add(language.monsterButton, function() {
		tools.Monster.fbButton.disable();
		tools.Monster.start();
	});
	tools.Monster.runtimeUpdate();
};
