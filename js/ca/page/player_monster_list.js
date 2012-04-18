// Festival duel
tools.Page.runtime['player_monster_list.php'] = function() {

	console.log('Page: player_monster_list.php');

	var $_list = $('div:contains("Engage in battle with monsters"):last').next();
	$_list.append('<div id="cageMonsterTower1"><img id="cageTempLoaderImg1" src="http://image4.castleagegame.com/graphics/shield_wait.gif" style="margin-left: 360px; height: 30px;margin-bottom: 10px;"></div>');
	$_list.append('<div id="cageMonsterTower2"><img id="cageTempLoaderImg2" src="http://image4.castleagegame.com/graphics/shield_wait.gif" style="margin-left: 360px; height: 30px;margin-bottom: 10px;"></div>');

	var _none = $('span:contains("Public Monster List")').parent().parent();
	_none.hide();

	get('festival_tower.php?tab=monster', function(_festMonster) {
		$('#cageTempLoaderImg1').remove();
		$('#listDiv > div', _festMonster).not(':last').each(function(_i, _e) {
			if(_i == 0) {
				$('#cageMonsterTower1').append('<div style="text-align:center;"><img src="http://image4.castleagegame.com/graphics/festival_monster_towerbutton.jpg" class="cageTowerImage"></div>');
			}
			$(_e).attr('style', '').addClass('MonsterListBackground');
			$(_e).find('> div:eq(1)').attr('style', '').addClass('MonsterListImage');
			$(_e).find('> div:eq(2)').attr('style', '').addClass('MonsterListName');
			$(_e).find('> div:eq(3)').attr('style', '').addClass('MonsterListButton');
			$('#cageMonsterTower1').append(_e);
		});
		get('festival_tower2.php?tab=monster', function(_festMonster) {
			$('#cageTempLoaderImg2').remove();
			$('#listDiv > div', _festMonster).not(':last').each(function(_i, _e) {
				console.log(_i);
				if(_i == 0) {
					$('#cageMonsterTower2').append('<div style="text-align:center;"><img src="http://image4.castleagegame.com/graphics/festival_monster2_towerbutton.jpg" class="cageTowerImage"></div>');
				}
				$(_e).attr('style', '').addClass('MonsterListBackground');
				$(_e).find('> div:eq(1)').attr('style', '').addClass('MonsterListImage');
				$(_e).find('> div:eq(2)').attr('style', '').addClass('MonsterListName');
				$(_e).find('> div:eq(3)').attr('style', '').addClass('MonsterListButton');
				$('#cageMonsterTower2').append(_e);
			});
			if($('img.cagetowerimage').length == 0) {
				_none.fadeIn('slow');
			}
		});
	});
};
