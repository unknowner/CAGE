// Festival duel
tools['Page'].runtime['player_monster_list.php'] = function() {

	console.log('Page: player_monster_list.php');

	var _background = 'background-image:url("http://image4.castleagegame.com/5068/graphics/monsterlist_container.gif"); background-repeat:no-repeat; height:90px; padding-bottom:15px;';
	var _monsterpic = 'float:left;padding: 15px 0 0 33px;overflow:hidden;';
	var _monstername = 'float: left; text-align: center; color: black; padding-left: 35px; width:240px; padding-top: 15px;';
	var _monsterbutton = 'float: left; width: 200px; text-align:center; padding-top:20px;';

	var $_list = $('div:contains("Engage in battle with monsters"):last').next();
	$_list.append('<img id="cageTempLoaderImg1" src="http://image4.castleagegame.com/graphics/shield_wait.gif" style="margin-left: 360px; height: 30px;margin-bottom: 10px;">');
	get('festival_tower.php?tab=monster', function(_festMonster) {
		$('#cageTempLoaderImg1').remove();
		//$_list.append($('#listDiv', _festMonster));
		$('#listDiv > div', _festMonster).not(':last').each(function(_i, _e) {
			$(_e).attr('style', _background);
			$(_e).find('> div:eq(1)').attr('style', _monsterpic).append('<div style="position: relative; top: -16px;  color: white; font-weight: bold; text-shadow: 0px 0px 2px black;">Festival Tower I</div>');
			$(_e).find('> div:eq(2)').attr('style', _monstername);
			$(_e).find('> div:eq(3)').attr('style', _monsterbutton);
			$_list.append(_e);
		});
		//$_list.find('div:last').remove();
	});
	$_list.append('<img id="cageTempLoaderImg2" src="http://image4.castleagegame.com/graphics/shield_wait.gif" style="margin-left: 360px; height: 30px;margin-bottom: 10px;">');
	get('festival_tower2.php?tab=monster', function(_festMonster) {
		$('#cageTempLoaderImg2').remove();
		//$_list.append($('#listDiv', _festMonster));
		$('#listDiv > div', _festMonster).not(':last').each(function(_i, _e) {
			$(_e).attr('style', _background);
			$(_e).find('> div:eq(1)').attr('style', _monsterpic).append('<span style="position: relative; top: -16px;  color: white; font-weight: bold; text-shadow: 0px 0px 2px black;">Festival Tower II</span>');
			$(_e).find('> div:eq(2)').attr('style', _monstername);
			$(_e).find('> div:eq(3)').attr('style', _monsterbutton);
			$_list.append(_e);
		});
		//$_list.find('div:last').remove();
	});
};
