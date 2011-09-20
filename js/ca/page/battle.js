// Festival duel
tools['Page'].runtime['battle.php'] = function () {

	console.log('Page: battle.php');
	
	if($('#results_main_wrapper form input[name="action"][value="battle"]').length > 0){
		console.log('>>>>>>>battle.php');
	}
	
};