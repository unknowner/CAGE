// arena battle
tools['Page'].runtime['arena_battle.php'] = function () {

	console.log('Page: arena_battle.php');

	// fix for timer
	addFunction(new Function($('#monsterTicker').next('script').html()), null, true, true);

};