// monster stats
tools['Page'].runtime['battle_monster.php'] = function () {

	console.log('Page: battle_monster.php');

	// add health percentage to monster name
	var $_hook = $('img[src*="monster_health_background.jpg"],[src*="nm_red.jpg"]').parent();
	var _monstername = $('#app_body div:contains("\'s Life"):last, #app_body div:contains("\'s life"):last');
	_monstername.text(_monstername.text() + ' ' + $_hook[0].style.width.substr(0,5) + '%');

	// fix for monster timer
	addFunction(new Function($('#monsterTicker').next('script').html()), null, true, true);
	
};
