new tool('Monster');

tools.Monster.runtime = {};

tools.Monster.start = function() {
	if(!tools.Monster.runtime.listFilled) {
		tools.Monster.runtime.listFilled = true;
		$('#cageMonsterContainer').empty().append($('<img id="cageMonsterClose" src="http://image4.castleagegame.com/graphics/popup_close_button.png">').click(tools.Monster.done));
		$('#cageMonsterContainer').append($('<span id="cageMonsterReload">Reload</span>').click(function() {
			tools.Monster.runtime.listFilled = false;
			tools.Monster.start();
		}));
		// monster
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
				_img.append($('<div class="cageMonsterButton">').append(_e.find('> div:eq(2) form')));
				_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/monster_button_yourmonster_on.jpg">');
				$('#cageMonsterContainer').append(_img);
				$('div.cageMonsterListItem:last').slideDown('slow');
			});
			//festival I
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
					_img.append($('<div class="cageMonsterButton">').append(_e.find('> div:eq(3) a')));
					_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/festival_monstertag_tower.gif">');
					$('#cageMonsterContainer').append(_img);
					$('div.cageMonsterListItem:last').slideDown('slow');
				});
				//festival II
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
						_img.append($('<div class="cageMonsterButton">').append(_e.find('> div:eq(3) a')));
						_img.append('<img class="cageMonsterTag" src="http://image4.castleagegame.com/graphics/festival_monstertag2_tower.gif">');
						$('#cageMonsterContainer').append(_img);
						$('div.cageMonsterListItem:last').slideDown('slow');
					});
					// raids
					get('raid.php', function(_raids) {
						$('table.layout span', _raids).parent().parent().parent().each(function(_i, _e) {
							var _e = $(_e);
							console.log(_e);
							console.log(_e.find('> div:eq(1) > div:first').css('backgroundImage'));
							var _img = $('<div class="cageMonsterListItem ui-corner-all">').hide().css('backgroundImage', _e.find('> div:eq(1) > div:first').css('backgroundImage'));
							_img.append('<div class="cageMonsterName">' + $(_e).find('span').text().split(' ')[0] + '</div>');
							_img.append($('<div class="cageMonsterButton">').append(_e.find('> div:eq(3) a')));
							$('#cageMonsterContainer').append(_img);
							$('div.cageMonsterListItem:last').slideDown('slow');
						});
					});
				});
			});
		});
	}
	$('#cageMonsterContainer').show().animate({
		'top' : 110
	}, 'slow');

};

tools.Monster.done = function() {
	console.log('done:', $('#cageMonsterContainer').height());
	$('#cageMonsterContainer').animate({
		'top' : -110 - $('#cageMonsterContainer').height() + 10,
	}, 'slow');
	tools.Monster.fbButton.enable();

};

tools.Monster.init = function() {
	tools.Monster.runtime.listFilled = false;
	$('#cageContainer').append('<div id="cageMonsterContainer" class="ui-corner-bottom ui-widget-content"></div>');
	tools.Monster.fbButton.add(language.MonsterButton, function() {
		tools.Monster.fbButton.disable();
		tools.Monster.start();
	});
};
