// arena battle
tools.Page.pages['arena_battle.php'] = function () {

	console.log('Page: arena_battle.php');

	// fix for timer
	addFunction(new Function($('#monsterTicker').next('script').html()), null, true, true);

};