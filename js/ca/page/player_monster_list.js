// Festival duel
tools['Page'].runtime['player_monster_list.php'] = function() {

	console.log('Page: player_monster_list.php');

	var $_list = $('div:contains("Engage in battle with monsters"):last').next();
	$_list.append('<img id="cageTempLoaderImg1" src="http://image4.castleagegame.com/graphics/shield_wait.gif" style="margin-left: 360px; height: 30px;margin-bottom: 10px;">');
	$_list.append('<img id="cageTempLoaderImg2" src="http://image4.castleagegame.com/graphics/shield_wait.gif" style="margin-left: 360px; height: 30px;margin-bottom: 10px;">');

	var _none = $('span:contains("Public Monster List")').parent().parent();
	_none.hide();

	get('festival_tower.php?tab=monster', function(_festMonster) {
		$('#cageTempLoaderImg1').remove();
		$('#listDiv > div', _festMonster).not(':last').each(function(_i, _e) {
			$(_e).attr('style', '').addClass('MonsterListBackground');
			$(_e).find('> div:eq(1)').attr('style', '').addClass('MonsterListImage').append('<span class="MonsterListText">Festival Tower I</div>');
			$(_e).find('> div:eq(2)').attr('style', '').addClass('MonsterListName');
			$(_e).find('> div:eq(3)').attr('style', '').addClass('MonsterListButton');
			$_list.append(_e);
		});
		get('festival_tower2.php?tab=monster', function(_festMonster) {
			$('#cageTempLoaderImg2').remove();
			$('#listDiv > div', _festMonster).not(':last').each(function(_i, _e) {
				$(_e).attr('style', '').addClass('MonsterListBackground');
				$(_e).find('> div:eq(1)').attr('style', '').addClass('MonsterListImage').append('<span class="MonsterListText">Festival Tower II</span>');
				$(_e).find('> div:eq(2)').attr('style', '').addClass('MonsterListName');
				$(_e).find('> div:eq(3)').attr('style', '').addClass('MonsterListButton');
				$_list.append(_e);
			});
			if($('span.MonsterListText').length == 0) {
				_none.fadeIn('slow');
			}
		});
	});
};
